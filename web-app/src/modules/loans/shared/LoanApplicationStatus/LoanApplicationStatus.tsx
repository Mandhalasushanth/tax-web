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
  'Loan Against Property': 'Property Loan',
}

function formatLoanTitle(raw?: string): string {
  if (!raw) return 'Loan'
  return LOAN_TYPE_DISPLAY_MAP[raw] || raw.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function resolvePrimaryDetail(loanKey: string, rawForm: Record<string, unknown>, equipment?: string) {
  if (loanKey.includes('property')) {
    const pType = (rawForm.propertyType as string) || ''
    const purpose = (rawForm.loanPurpose as string) || (equipment !== '—' ? equipment : '') || ''
    const val = [pType, purpose].filter(Boolean).join(' · ') || '—'
    return {
      label: 'Property Type & Purpose',
      value: val,
      iconSrc: '/assets/icons/loans/home-blue.svg',
    }
  }
  if (loanKey.includes('home')) {
    const intent = (rawForm.customPropertyIntent || rawForm.propertyIntent || (equipment !== '—' ? equipment : '') || '—') as string
    const stage = rawForm.propertyStage as string | undefined
    return {
      label: 'Property Purpose',
      value: stage && intent !== '—' && !intent.includes(stage) ? `${intent} • ${stage}` : intent,
      iconSrc: '/assets/icons/loans/home-blue.svg',
    }
  }
  if (loanKey.includes('vehicle')) {
    return {
      label: 'Vehicle / Model',
      value: (rawForm.vehicleMakeModel || rawForm.vehicleModel || rawForm.vehicleCategory || (equipment !== '—' ? equipment : '') || '—') as string,
      iconSrc: '/assets/icons/loans/vehicle-blue.svg',
    }
  }
  if (loanKey.includes('machinery')) {
    return {
      label: 'Equipment',
      value: (rawForm.machineryName || rawForm.machineryType || (equipment !== '—' ? equipment : '') || '—') as string,
      iconSrc: '/assets/icons/loans/equipment-blue.svg',
    }
  }
  if (loanKey.includes('working') || loanKey.includes('capital')) {
    return {
      label: 'Facility Purpose',
      value: (rawForm.creditPurpose || rawForm.preferredFacilityType || (equipment !== '—' ? equipment : '') || '—') as string,
      iconSrc: '/assets/icons/loans/briefcase-blue.svg',
    }
  }
  if (loanKey.includes('project')) {
    return {
      label: 'Project / Sector',
      value: (rawForm.projectName || rawForm.projectSector || (equipment !== '—' ? equipment : '') || '—') as string,
      iconSrc: '/assets/icons/loans/project-blue.svg',
    }
  }
  if (loanKey.includes('msme')) {
    return {
      label: 'Enterprise Purpose',
      value: (rawForm.msmePurpose || rawForm.businessType || (equipment !== '—' ? equipment : '') || '—') as string,
      iconSrc: '/assets/icons/loans/briefcase-blue.svg',
    }
  }
  if (loanKey.includes('personal')) {
    return {
      label: 'Loan Purpose',
      value: (rawForm.purposeOfLoan || rawForm.loanPurpose || (equipment !== '—' ? equipment : '') || '—') as string,
      iconSrc: '/assets/icons/loans/purpose.svg',
    }
  }
  return {
    label: 'Business Purpose',
    value: (rawForm.purposeOfLoan || rawForm.businessType || (equipment !== '—' ? equipment : '') || '—') as string,
    iconSrc: '/assets/icons/loans/briefcase-blue.svg',
  }
}

function resolveTenure(application: LoanApplicationBase, rawForm: Record<string, unknown>): string {
  const rawMonths = application.tenureMonths != null ? String(application.tenureMonths) : ''
  const years = Number(rawForm.repaymentTenureYears || rawForm.tenureYears || application.tenureYears || 0)
  if (rawMonths && rawMonths !== 'Months' && rawMonths !== 'undefined Months' && /\d/.test(rawMonths)) {
    return rawMonths.includes('Month') || rawMonths.includes('Year') ? rawMonths : `${rawMonths} Months`
  }
  if (years > 0) return `${years} Years (${years * 12} Mos)`
  const match = String(rawForm.repaymentTenure || rawForm.preferredTenureMonths || '').match(/\d+/)
  return match ? `${match[0]} Months` : '—'
}

function resolveDisbursementBank(rawForm: Record<string, unknown>, fallbackBank: string | undefined): string {
  const rawBank = (rawForm.bankName || rawForm.operatingBank || rawForm.primaryOperatingBankName || rawForm.currentAccountBankName || rawForm.primaryBankName || fallbackBank) as string | undefined
  const cleanBank = rawBank && rawBank !== '—' ? rawBank : '—'
  const accNo = String(rawForm.accountNumber || rawForm.bankAccountNumber || rawForm.currentAccountNumber || '')
  return accNo && accNo.length >= 4 && cleanBank !== '—' ? `${cleanBank} (••• ${accNo.slice(-4)})` : cleanBank
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
      const isProperty = location.pathname.includes('property') || stateData?.loanTitle === 'Loan Against Property' || Boolean(formData.propertyPincode || formData.propertySubType || formData.propertyAddress)
      const isVehicle = location.pathname.includes('vehicle') || stateData?.loanTitle === 'Vehicle Loan' || Boolean(formData.vehicleCategory || formData.vehicleModel || formData.vehicleMakeModel)
      const isWorking = location.pathname.includes('working-capital') || Boolean(formData.requiredCreditLimit) || stateData?.loanTitle === 'Working Capital'
      const isHome = location.pathname.includes('home') || stateData?.loanTitle === 'Home Loan' || Boolean(formData.propertyIntent || formData.estimatedPropertyCost)
      const isProject = location.pathname.includes('project') || Boolean(formData.projectSector)
      const isMsme = location.pathname.includes('msme') || Boolean(formData.msmePurpose)
      const isPersonal = location.pathname.includes('personal') || stateData?.loanTitle === 'Personal Loan' || Boolean(formData.monthlyNetSalary)

      const loanTitle = stateData?.loanTitle || (isProperty ? 'Loan Against Property' : isPersonal ? 'Personal Loan' : isHome ? 'Home Loan' : isVehicle ? 'Vehicle Loan' : isWorking ? 'Working Capital Loan' : isProject ? 'Project Finance' : isMsme ? 'MSME Loan' : formData.machineryType ? 'Machinery Loan' : 'Business Loan')
      const loanAmountRaw = formData.loanAmount || formData.requiredLoanAmount || formData.requiredAmount || formData.requiredCreditLimit || 0
      const loanAmountNumber = typeof loanAmountRaw === 'number' ? loanAmountRaw : Number(String(loanAmountRaw).replace(/\D/g, '')) || 0

      const equipment = isProperty ? `${(formData.propertyType as string) || ''} ${(formData.loanPurpose as string) || ''}`.trim() || '—'
        : isPersonal ? (formData.purposeOfLoan as string) || (formData.loanPurpose as string) || '—'
        : isHome ? (formData.customPropertyIntent as string) || (formData.propertyIntent as string) || '—'
        : isVehicle ? (formData.vehicleMakeModel as string) || (formData.vehicleModel as string) || (formData.vehicleCategory as string) || '—'
        : isWorking ? (formData.creditPurpose as string) || (formData.preferredFacilityType as string) || '—'
        : isProject ? (formData.projectName as string) || (formData.projectSector as string) || '—'
        : isMsme ? (formData.msmePurpose as string) || (formData.businessType as string) || '—' : (formData.machineryName as string) || (formData.machineryType as string) || '—'

      const yearsNum = Number(formData.repaymentTenureYears || formData.tenureYears || 0)
      const tenure = yearsNum > 0 ? `${yearsNum} Years (${yearsNum * 12} Mos)` : (formData.repaymentTenure as string) || (formData.preferredTenureMonths ? `${formData.preferredTenureMonths} Months` : '—')
      const disbursementBank = (formData.bankName || formData.operatingBank || formData.currentAccountBankName || formData.primaryOperatingBankName || formData.primaryBankName || '—') as string

      const now = new Date()
      const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

      return stored || {
        id: id || stateData?.refNumber || 'Pending',
        refNumber: id || stateData?.refNumber || 'Pending',
        referenceNumber: id || stateData?.refNumber || 'Pending',
        loanType: loanTitle,
        loanCategory: isProperty ? 'Mortgage & Secured Finance' : isHome ? 'Housing Finance' : 'Capital & Financing',
        loanAmount: loanAmountNumber,
        tenureYears: yearsNum,
        tenureMonths: tenure,
        equipment,
        disbursementBank,
        loanAgent: 'TaxEdge Loan Agent',
        status: 'submitted',
        statusLabel: 'Documents Received',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        milestones: [
          { id: 'm1', title: 'Application Submitted', timestamp: `${formattedDate}  ${formattedTime}`, status: 'completed' },
          { id: 'm2', title: 'Agent Review', timestamp: 'Documents Received', status: 'current' },
          { id: 'm3', title: 'Lender Review', timestamp: 'Pending', status: 'pending' },
          { id: 'm4', title: 'Sanctioned', timestamp: 'Pending', status: 'pending' },
          { id: 'm5', title: 'Disbursed', timestamp: 'Pending', status: 'pending' },
        ],
      }
    } catch {
      return {
        id: id || 'Pending',
        refNumber: id || 'Pending',
        loanType: stateData?.loanTitle || 'Loan Application',
        loanCategory: 'Capital & Financing',
        loanAmount: 0,
        tenureYears: 0,
        status: 'submitted',
        statusLabel: 'Documents Received',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        milestones: [],
      }
    }
  }, [id, stateData, location.pathname])

  const rawForm = useMemo(() => ((application.applicationData || stateData?.formData || {}) as Record<string, unknown>), [application.applicationData, stateData?.formData])
  const refNumber = application.refNumber || id || 'Pending'
  const loanTypeRaw = application.loanType || stateData?.loanTitle || 'loan'
  const formattedLoanType = formatLoanTitle(loanTypeRaw)
  const loanAmount = application.loanAmount || 0
  const loanAgent = application.loanAgent || 'TaxEdge Loan Agent'

  const loanKey = loanTypeRaw.toLowerCase()
  const primaryDetail = resolvePrimaryDetail(loanKey, rawForm, application.equipment)
  const formattedTenure = resolveTenure(application, rawForm)
  const formattedBank = resolveDisbursementBank(rawForm, application.disbursementBank)

  const handleCopyRef = useCallback(() => {
    navigator.clipboard?.writeText?.(refNumber)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
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
    } catch {
      setToastMessage('Download error. Please try again.')
      setTimeout(() => setToastMessage(null), 3000)
    }
  }, [refNumber, formattedLoanType, loanAmount, primaryDetail, formattedTenure, formattedBank, loanAgent])

  return (
    <div className="loan-status-page" data-testid="loan-application-status-page">
      <div className="loan-status-header">
        <div className="loan-status-header__left">
          <button
            type="button"
            className="loan-status-back-btn"
            onClick={() => navigate('/loans')}
            aria-label="Back to Loans"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
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
