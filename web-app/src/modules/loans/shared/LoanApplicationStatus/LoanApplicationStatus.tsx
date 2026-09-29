import React, { useState, useCallback, useMemo } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { LoanSummaryCard } from './LoanSummaryCard'
import { LifecycleMilestonesCard } from './LifecycleMilestonesCard'
import { loanApplicationService } from '@modules/loans/services/loanApplicationService'
import { safeNavigateTo } from '@modules/loans/utils/loanMarketplace.utils'
import type { LoanApplicationBase } from '@modules/loans/types/loanApplication.types'
import './LoanApplicationStatus.css'

const LOAN_TYPE_DISPLAY_MAP: Record<string, string> = {
  home_loan: 'Home Loan',
  'Home Loan': 'Home Loan',
  vehicle_loan: 'Vehicle Loan',
  'Vehicle Loan': 'Vehicle Loan',
  machinery_loan: 'Machinery Loan',
  'Machinery Loan': 'Machinery Loan',
  business_loan: 'Business Loan',
  'Business Loan': 'Business Loan',
  working_capital_loan: 'Working Capital Loan',
  'Working Capital Loan': 'Working Capital Loan',
  working_capital: 'Working Capital Loan',
  project_finance: 'Project Finance',
  'Project Finance': 'Project Finance',
  msme_loan: 'MSME Loan',
  'MSME Loan': 'MSME Loan',
  personal_loan: 'Personal Loan',
  'Personal Loan': 'Personal Loan',
  property_loan: 'Property Loan',
  'Property Loan': 'Property Loan',
}

function formatLoanTitle(raw?: string): string {
  if (!raw) return 'Loan'
  return LOAN_TYPE_DISPLAY_MAP[raw] || raw.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function resolvePrimaryDetail(loanKey: string, rawForm: Record<string, unknown>, equipment?: string) {
  if (loanKey.includes('home')) {
    const intent = (rawForm.customPropertyIntent || rawForm.propertyIntent || equipment || 'Property Purchase') as string
    const stage = rawForm.propertyStage as string | undefined
    return {
      label: 'Property Purpose',
      value: stage && !intent.includes(stage) ? `${intent} • ${stage}` : intent,
      iconSrc: '/assets/icons/loans/home-blue.svg',
    }
  }
  if (loanKey.includes('vehicle')) {
    return {
      label: 'Vehicle / Model',
      value: (rawForm.vehicleModel || rawForm.vehicleCategory || equipment || 'Four Wheeler') as string,
      iconSrc: '/assets/icons/loans/vehicle-blue.svg',
    }
  }
  if (loanKey.includes('machin')) {
    return {
      label: 'Equipment',
      value: (rawForm.machineryName || rawForm.machineryType || equipment || 'CNC / Automation Machinery') as string,
      iconSrc: '/assets/icons/loans/equipment-blue.svg',
    }
  }
  if (loanKey.includes('working') || loanKey.includes('capital')) {
    return {
      label: 'Facility Purpose',
      value: (rawForm.creditPurpose || rawForm.preferredFacilityType || equipment || 'Working Capital') as string,
      iconSrc: '/assets/icons/loans/briefcase-blue.svg',
    }
  }
  if (loanKey.includes('project')) {
    return {
      label: 'Project / Sector',
      value: (rawForm.projectName || rawForm.projectSector || equipment || 'Infrastructure Project') as string,
      iconSrc: '/assets/icons/loans/project-blue.svg',
    }
  }
  if (loanKey.includes('msme')) {
    return {
      label: 'Enterprise Purpose',
      value: (rawForm.msmePurpose || rawForm.businessType || equipment || 'MSME Enterprise') as string,
      iconSrc: '/assets/icons/loans/briefcase-blue.svg',
    }
  }
  return {
    label: 'Business Purpose',
    value: (rawForm.purposeOfLoan || equipment || 'Business Expansion') as string,
    iconSrc: '/assets/icons/loans/briefcase-blue.svg',
  }
}

function resolveTenure(application: LoanApplicationBase, rawForm: Record<string, unknown>): string {
  const rawMonths = application.tenureMonths != null ? String(application.tenureMonths) : ''
  const years = Number(rawForm.repaymentTenureYears || application.tenureYears || 0)
  if (rawMonths && rawMonths !== 'Months' && rawMonths !== 'undefined Months' && /\d/.test(rawMonths)) {
    return rawMonths.includes('Month') || rawMonths.includes('Year') ? rawMonths : `${rawMonths} Months`
  }
  if (years > 0) return `${years} Years (${years * 12} Mos)`
  const match = String(rawForm.repaymentTenure || rawForm.preferredTenureMonths || '').match(/\d+/)
  return match ? `${match[0]} Months` : '20 Years'
}

function resolveDisbursementBank(rawForm: Record<string, unknown>, fallbackBank: string | undefined, isRetail: boolean): string {
  const rawBank = (rawForm.bankName || rawForm.operatingBank || rawForm.primaryOperatingBankName || rawForm.currentAccountBankName || fallbackBank) as string | undefined
  const cleanBank = rawBank && rawBank !== 'Primary Current Bank' ? rawBank : (isRetail ? 'Primary Bank Account' : 'Primary Current Bank')
  const accNo = String(rawForm.accountNumber || '')
  return accNo && accNo.length >= 4 && !cleanBank.includes('•••') ? `${cleanBank} (••• ${accNo.slice(-4)})` : cleanBank
}

export const LoanApplicationStatus: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()

  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const stateData = location.state as {
    application?: LoanApplicationBase
    refNumber?: string
    formData?: Record<string, unknown>
    loanTitle?: string
  } | null

  const application = useMemo<LoanApplicationBase>(() => {
    try {
      const stored =
        stateData?.application ||
        (id ? loanApplicationService.getApplication(id) : null) ||
        loanApplicationService.getApplication('')

      const formData = (stateData?.formData as Record<string, unknown>) || {}
      const isVehicle = location.pathname.includes('vehicle') || stateData?.loanTitle === 'Vehicle Loan' || Boolean(formData.vehicleCategory || formData.vehicleModel)
      const isWorking = location.pathname.includes('working-capital') || Boolean(formData.requiredCreditLimit) || stateData?.loanTitle === 'Working Capital'
      const isHome = location.pathname.includes('home') || stateData?.loanTitle === 'Home Loan' || Boolean(formData.propertyIntent || formData.estimatedPropertyCost)
      const isProject = location.pathname.includes('project') || Boolean(formData.projectSector)
      const isMsme = location.pathname.includes('msme') || Boolean(formData.msmePurpose)

      const loanTitle = stateData?.loanTitle || (isHome ? 'Home Loan' : isVehicle ? 'Vehicle Loan' : isWorking ? 'Working Capital Loan' : isProject ? 'Project Finance' : isMsme ? 'MSME Loan' : formData.machineryType ? 'Machinery Loan' : 'Business Loan')
      const loanAmountRaw = formData.loanAmount || formData.requiredLoanAmount || formData.requiredCreditLimit || 1500000
      const loanAmountNumber = typeof loanAmountRaw === 'number' ? loanAmountRaw : Number(String(loanAmountRaw).replace(/\D/g, '')) || 1500000

      const equipment = isHome ? (formData.customPropertyIntent as string) || (formData.propertyIntent as string) || 'Property Purchase'
        : isVehicle ? (formData.vehicleModel as string) || (formData.vehicleCategory as string) || 'Electric Vehicle (EV - 2W / 4W)'
        : isWorking ? (formData.creditPurpose as string) || (formData.preferredFacilityType as string) || 'Supplier Payments'
        : isProject ? (formData.projectName as string) || (formData.projectSector as string) || 'Infrastructure Project'
        : isMsme ? (formData.msmePurpose as string) || 'MSME Enterprise' : (formData.machineryType as string) || 'CNC / Automation Machinery'

      const yearsNum = Number(formData.repaymentTenureYears || 0)
      const tenure = yearsNum > 0 ? `${yearsNum} Years (${yearsNum * 12} Mos)` : (formData.repaymentTenure as string) || (formData.tenure as string) || '20 Years'
      const disbursementBank = (formData.bankName || formData.operatingBank || formData.currentAccountBankName || formData.primaryOperatingBankName || (isHome ? 'State Bank of India' : 'Primary Bank Account')) as string

      return stored || {
        id: id || stateData?.refNumber || 'TXE-LN-235646',
        refNumber: id || stateData?.refNumber || 'TXE-LN-235646',
        referenceNumber: id || stateData?.refNumber || 'TXE-LN-235646',
        loanType: loanTitle,
        loanCategory: isHome ? 'Housing Finance' : 'Capital & Financing',
        loanAmount: loanAmountNumber,
        tenureYears: yearsNum || 4,
        tenureMonths: tenure,
        equipment,
        disbursementBank,
        loanAgent: 'TaxEdge Loan Agent',
        status: 'submitted',
        statusLabel: 'Documents Received',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        milestones: [
          { id: 'm1', title: 'Application Submitted', timestamp: '28 Sep 2026  11:24 PM', status: 'completed' },
          { id: 'm2', title: 'Agent Review', timestamp: 'Documents Received', status: 'current' },
          { id: 'm3', title: 'Lender Review', timestamp: 'Pending', status: 'pending' },
          { id: 'm4', title: 'Sanctioned', timestamp: 'Pending', status: 'pending' },
          { id: 'm5', title: 'Disbursed', timestamp: 'Pending', status: 'pending' },
        ],
      }
    } catch (err) {
      console.error('[LoanApplicationStatus] Error resolving application:', err)
      return {
        id: id || 'TXE-LN-235646',
        refNumber: id || 'TXE-LN-235646',
        loanType: 'Home Loan',
        loanCategory: 'Housing Finance',
        loanAmount: 1500000,
        tenureYears: 20,
        status: 'submitted',
        statusLabel: 'Documents Received',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        milestones: [],
      }
    }
  }, [id, stateData, location.pathname])

  const rawForm = useMemo(() => ((application.applicationData || stateData?.formData || {}) as Record<string, unknown>), [application.applicationData, stateData?.formData])
  const refNumber = application.refNumber || id || 'TXE-LN-235646'
  const loanTypeRaw = application.loanType || stateData?.loanTitle || 'home_loan'
  const formattedLoanType = formatLoanTitle(loanTypeRaw)
  const loanAmount = application.loanAmount || 1500000
  const loanAgent = application.loanAgent || 'TaxEdge Loan Agent'

  const loanKey = loanTypeRaw.toLowerCase()
  const primaryDetail = resolvePrimaryDetail(loanKey, rawForm, application.equipment)
  const formattedTenure = resolveTenure(application, rawForm)
  const formattedBank = resolveDisbursementBank(rawForm, application.disbursementBank, loanKey.includes('home') || loanKey.includes('vehicle'))

  const handleCopyRef = useCallback(() => {
    try {
      navigator.clipboard?.writeText ? navigator.clipboard.writeText(refNumber) : undefined
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('[LoanApplicationStatus] Copy error:', err)
    }
  }, [refNumber])

  const handleTrackApplications = useCallback(() => safeNavigateTo(navigate, '/applications'), [navigate])
  const handleGoHome = useCallback(() => safeNavigateTo(navigate, '/'), [navigate])

  const handleDownload = useCallback(() => {
    try {
      const receiptContent = `
=====================================================
         TAXEDGE FIN SOLUTIONS - LOAN RECEIPT
=====================================================
Application Ref: ${refNumber}
Loan Type:       ${formattedLoanType}
Amount:          ₹${loanAmount.toLocaleString('en-IN')}
${primaryDetail.label}: ${primaryDetail.value}
Tenure:          ${formattedTenure}
Disbursement:    ${formattedBank}
Loan Agent:      ${loanAgent}
Status:          Documents Received (In Progress)
Generated At:    ${new Date().toLocaleString()}
=====================================================
Thank you for applying with TaxEdge Fin Solutions.
`.trim()

      const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `TaxEdge-${refNumber}-Receipt.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setToastMessage('Application receipt downloaded successfully.')
      setTimeout(() => setToastMessage(null), 3000)
    } catch (err) {
      console.error('[LoanApplicationStatus] Download error:', err)
      setToastMessage('Download error. Please try again.')
      setTimeout(() => setToastMessage(null), 3000)
    }
  }, [refNumber, formattedLoanType, loanAmount, primaryDetail, formattedTenure, formattedBank, loanAgent])

  return (
    <div className="loan-status-page" data-testid="loan-application-status-page">
      <div className="loan-status-header">
        <div className="loan-status-header__left">
          <h1 className="loan-status-header__title">Loan Application Status</h1>
        </div>
        <button type="button" className="loan-status-help-btn" aria-label="Help and Support" title="Need assistance? Contact support">
          <img src="/assets/icons/loans/help-circle.svg" alt="" width="24" height="24" aria-hidden="true" />
        </button>
      </div>

      <section className="loan-status-success-banner" role="status">
        <div className="loan-status-success-banner__icon" aria-hidden="true">
          <img src="/assets/icons/loans/check-circle-green-solid.svg" alt="" width="44" height="44" />
        </div>
        <div className="loan-status-success-banner__content">
          <h2 className="loan-status-success-banner__title">Application Submitted Successfully</h2>
          <p className="loan-status-success-banner__desc">
            Your {formattedLoanType} application has been lodged. Our Loan Agent and underwriting desk will initiate verification shortly.
          </p>
        </div>
      </section>

      <LoanSummaryCard
        refNumber={refNumber}
        loanType={formattedLoanType}
        loanAmount={loanAmount}
        primaryDetailLabel={primaryDetail.label}
        primaryDetailValue={primaryDetail.value}
        primaryDetailIcon={<img src={primaryDetail.iconSrc} alt="" width="22" height="22" aria-hidden="true" />}
        tenure={formattedTenure}
        disbursementBank={formattedBank}
        loanAgent={loanAgent}
        isCopied={isCopied}
        onCopyRef={handleCopyRef}
      />

      <LifecycleMilestonesCard milestones={application.milestones} />

      <div className="loan-status-actions-bar">
        <button type="button" className="loan-action-btn loan-action-btn--navy" onClick={handleTrackApplications} data-testid="track-my-applications-btn">
          <img src="/assets/icons/loans/list-white.svg" alt="" width="18" height="18" aria-hidden="true" />
          <span>Track My Applications</span>
        </button>

        <button type="button" className="loan-action-btn loan-action-btn--home" onClick={handleGoHome} data-testid="go-to-home-btn">
          <img src="/assets/icons/loans/home-navy.svg" alt="" width="18" height="18" aria-hidden="true" />
          <span>Go to Home</span>
        </button>

        <button type="button" className="loan-action-btn loan-action-btn--download" onClick={handleDownload} data-testid="download-receipt-btn">
          <img src="/assets/icons/loans/download-orange.svg" alt="" width="18" height="18" aria-hidden="true" />
          <span>Download Sanction Letter / Receipt</span>
        </button>
      </div>

      {toastMessage && <div className="loan-status-toast" role="status">{toastMessage}</div>}
    </div>
  )
}

export default LoanApplicationStatus
