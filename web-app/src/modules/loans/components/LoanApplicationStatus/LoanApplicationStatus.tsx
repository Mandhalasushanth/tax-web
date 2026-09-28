 
import React, { useState, useCallback, useMemo } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { LoanSummaryCard } from './LoanSummaryCard'
import { LifecycleMilestonesCard } from './LifecycleMilestonesCard'
import { loanApplicationService } from '../../services/loanApplicationService'
import { safeNavigateTo } from '../../utils/loanMarketplace.utils'
import type { LoanApplicationBase } from '../../types/loanApplication.types'
import './LoanApplicationStatus.css'

/**
 * Business Loan - Application Status Page Component
 * Faithfully matches the provided design screenshot with dynamic data integration.
 * Strictly zero inline styles, zero internal styles, and zero loops.
 */
export const LoanApplicationStatus: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()

  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Retrieve stored application or location state
  const stateData = location.state as {
    application?: LoanApplicationBase
    refNumber?: string
    formData?: Record<string, unknown>
  } | null

  // Resolve application data dynamically
  const application = useMemo<LoanApplicationBase>(() => {
    try {
      const stored =
        stateData?.application ||
        (id ? loanApplicationService.getApplication(id) : null) ||
        loanApplicationService.getApplication('')

      return (
        stored || {
        id: id || 'TXE-LN-235646',
        refNumber: id || 'TXE-LN-235646',
        referenceNumber: id || 'TXE-LN-235646',
        loanType: 'Business Loan',
        loanCategory: 'Capital & Financing',
        loanAmount: 1500000,
        tenureYears: 4,
        tenureMonths: '48 Months',
        equipment: 'CNC / Automation Machinery',
        disbursementBank: 'Primary Current Bank',
        loanAgent: 'TaxEdge Loan Agent',
        status: 'submitted',
        statusLabel: 'Documents Received',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        milestones: [
          {
            id: 'm1',
            title: 'Application Submitted',
            timestamp: '25 Sep 2026  10:30 AM',
            status: 'completed',
          },
          {
            id: 'm2',
            title: 'Agent Review',
            timestamp: 'Documents Received',
            status: 'current',
          },
          {
            id: 'm3',
            title: 'Lender Review',
            timestamp: 'Pending',
            status: 'pending',
          },
          {
            id: 'm4',
            title: 'Sanctioned',
            timestamp: 'Pending',
            status: 'pending',
          },
          {
            id: 'm5',
            title: 'Disbursed',
            timestamp: 'Pending',
            status: 'pending',
          },
        ],
      })
    } catch (err) {
      console.error('[LoanApplicationStatus] Error resolving application:', err)
      return {
        id: 'TXE-LN-235646',
        refNumber: 'TXE-LN-235646',
        loanType: 'Business Loan',
        loanCategory: 'Capital & Financing',
        loanAmount: 1500000,
        tenureYears: 4,
        status: 'submitted',
        statusLabel: 'Documents Received',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        milestones: [],
      }
    }
  }, [id, stateData])

  // Extract display values with fallback
  const refNumber = application.refNumber || id || 'TXE-LN-235646'
  const loanType = application.loanType === 'business_loan' ? 'Business Loan' : application.loanType || 'Business Loan'
  const loanAmount = application.loanAmount || 1500000
  const equipment = application.equipment || 'CNC / Automation Machinery'
  const tenure = String(application.tenureMonths || `${application.tenureYears * 12 || 48} Months`)
  const disbursementBank = application.disbursementBank || 'Primary Current Bank'
  const loanAgent = application.loanAgent || 'TaxEdge Loan Agent'

  /**
   * Copy reference number to clipboard with feedback
   */
  const handleCopyRef = useCallback(() => {
    try {
      navigator.clipboard?.writeText
        ? navigator.clipboard.writeText(refNumber)
        : undefined
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('[LoanApplicationStatus] Copy error:', err)
    }
  }, [refNumber])

  /**
   * Navigation Handlers
   */

  const handleTrackApplications = useCallback(() => {
    safeNavigateTo(navigate, '/applications')
  }, [navigate])

  const handleGoHome = useCallback(() => {
    safeNavigateTo(navigate, '/')
  }, [navigate])

  /**
   * Download Sanction Letter / Application Receipt
   */
  const handleDownload = useCallback(() => {
    try {
      const receiptContent = `
 
Application Ref: ${refNumber}
Loan Type:       ${loanType}
Amount:          ₹${loanAmount.toLocaleString('en-IN')}
Equipment:       ${equipment}
Tenure:          ${tenure}
Disbursement:    ${disbursementBank}
Loan Agent:      ${loanAgent}
Status:          Documents Received (In Progress)
Generated At:    ${new Date().toLocaleString()}
 
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
  }, [refNumber, loanType, loanAmount, equipment, tenure, disbursementBank, loanAgent])

  return (
    <div className="loan-status-page" data-testid="loan-application-status-page">
      {/* 1. Page Header */}
      <div className="loan-status-header">
        <div className="loan-status-header__left">
          <h1 className="loan-status-header__title">Loan Application Status</h1>
 
import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import './LoanApplicationStatus.css'

export const LoanApplicationStatus: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const stateData = location.state as {
    refNumber?: string
    formData?: Record<string, unknown>
    loanTitle?: string
  } | null

  const refNumber = id || stateData?.refNumber || 'TXE-LN-499927'
  const formData = stateData?.formData || {}

  // Determine loan type & title
  const isVehicleLoan = location.pathname.includes('vehicle') || stateData?.loanTitle === 'Vehicle Loan' || Boolean(formData.vehicleCategory || formData.vehicleModel)
  const isWorkingCapital = location.pathname.includes('working-capital') || Boolean(formData.requiredCreditLimit) || stateData?.loanTitle === 'Working Capital'
  const loanTitle = stateData?.loanTitle || (isVehicleLoan ? 'Vehicle Loan' : isWorkingCapital ? 'Working Capital' : formData.machineryType ? 'Machinery Loan' : 'Loan Application')

  // Extract dynamic details
  const loanAmountRaw = formData.requiredCreditLimit || formData.loanAmount || formData.requiredLoanAmount || 1500000
  const loanAmountNumber = typeof loanAmountRaw === 'number'
    ? loanAmountRaw
    : Number(String(loanAmountRaw).replace(/\D/g, '')) || 1500000

  const equipmentOrPurpose = isVehicleLoan
    ? (formData.vehicleModel as string) || (formData.vehicleCategory as string) || 'Electric Vehicle (EV - 2W / 4W)'
    : isWorkingCapital
    ? (formData.creditPurpose as string) || (formData.preferredFacilityType as string) || 'Supplier Payments'
    : (formData.machineryType as string) || 'CNC / Automation Machinery'

  const tenure = (formData.repaymentTenure as string) || (formData.tenure as string) || '36 Months (3 Yrs)'
  const disbursementBank = (formData.operatingBank as string) || (formData.currentAccountBankName as string) || (formData.bankName as string)
    ? `${formData.operatingBank || formData.currentAccountBankName || formData.bankName} (-)`
    : 'Primary Current Bank (-)'
  const loanAgent = 'TaxEdge Loan Desk'

  return (
    <div className="loan-status-page">
      {/* 1. Green Success Banner */}
      <section className="loan-success-banner">
        <div className="loan-success-banner__icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: 32, height: 32, maxWidth: 32, maxHeight: 32, flexShrink: 0 }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="loan-success-banner__title">Application Submitted Successfully</h1>
        <p className="loan-success-banner__desc">
          Your {loanTitle} application has been lodged. Our Loan Agent and underwriting desk will initiate verification shortly.
        </p>
      </section>

      {/* 2. Application Summary Card */}
      <div className="loan-status-card">
        <div className="loan-status-card__top">
          <span className="loan-status-card__ref">Ref: {refNumber}</span>
          <span className="loan-status-card__badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Documents Received
          </span>
        </div>

        <div className="loan-status-card__main">
          <div>
            <p className="loan-status-card__loan-type">{loanTitle}</p>
            <h2 className="loan-status-card__amount" style={{ color: '#16a34a' }}>
              ₹{loanAmountNumber.toLocaleString('en-IN')}
            </h2>
          </div>
        </div>

        <div className="loan-status-card__meta-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}>
          <div className="loan-status-card__meta-item">
            <span className="loan-status-card__meta-label">{isVehicleLoan ? 'Vehicle / Model' : isWorkingCapital ? 'Facility' : 'Equipment'}</span>
            <span className="loan-status-card__meta-value">{equipmentOrPurpose}</span>
          </div>
          <div className="loan-status-card__meta-item">
            <span className="loan-status-card__meta-label">Tenure</span>
            <span className="loan-status-card__meta-value">{tenure}</span>
          </div>
          <div className="loan-status-card__meta-item">
            <span className="loan-status-card__meta-label">Disbursement Bank</span>
            <span className="loan-status-card__meta-value">{disbursementBank}</span>
          </div>
          <div className="loan-status-card__meta-item">
            <span className="loan-status-card__meta-label">Loan Agent</span>
            <span className="loan-status-card__meta-value">{loanAgent}</span>
          </div>
 
        </div>

        <button
          type="button"
          className="loan-status-help-btn"
          aria-label="Help and Support"
          title="Need assistance? Contact support"
        >
          <img
            src="/assets/icons/loans/help-circle.svg"
            alt=""
            width="24"
            height="24"
            aria-hidden="true"
          />
        </button>
      </div>

 
      {/* 2. Success Banner */}
      <section className="loan-status-success-banner" role="status">
        <div className="loan-status-success-banner__icon" aria-hidden="true">
          <img
            src="/assets/icons/loans/check-circle-green-solid.svg"
            alt=""
            width="44"
            height="44"
          />
 
      {/* 3. Application Lifecycle Milestones */}
      <div className="loan-timeline-card">
        <h3 className="loan-timeline-card__title">Application Lifecycle Milestones</h3>

        <div className="loan-timeline">
          <div className="loan-timeline-item loan-timeline-item--completed">
            <div className="loan-timeline-node">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="loan-timeline-content">
              <span className="loan-timeline-name">Application Submitted</span>
              <span className="loan-timeline-date" style={{ color: '#10b981', fontWeight: 600 }}>Completed</span>
            </div>
          </div>

          <div className="loan-timeline-item loan-timeline-item--current">
            <div className="loan-timeline-node">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="6" />
              </svg>
            </div>
            <div className="loan-timeline-content">
              <span className="loan-timeline-name">Agent Review</span>
              <span className="loan-timeline-date">Documents Received</span>
            </div>
          </div>

          <div className="loan-timeline-item loan-timeline-item--pending">
            <div className="loan-timeline-node" />
            <div className="loan-timeline-content">
              <span className="loan-timeline-name">Lender Review</span>
              <span className="loan-timeline-date">Pending</span>
            </div>
          </div>

          <div className="loan-timeline-item loan-timeline-item--pending">
            <div className="loan-timeline-node" />
            <div className="loan-timeline-content">
              <span className="loan-timeline-name">Sanctioned</span>
              <span className="loan-timeline-date">Pending</span>
            </div>
          </div>

          <div className="loan-timeline-item loan-timeline-item--pending">
            <div className="loan-timeline-node" />
            <div className="loan-timeline-content">
              <span className="loan-timeline-name">Disbursed</span>
              <span className="loan-timeline-date">Pending</span>
            </div>
          </div>
 
        </div>
        <div className="loan-status-success-banner__content">
          <h2 className="loan-status-success-banner__title">
            Application Submitted Successfully
          </h2>
          <p className="loan-status-success-banner__desc">
            Your Business Loan application has been lodged. Our Loan Agent and underwriting desk will initiate verification shortly.
          </p>
        </div>
      </section>

 
      {/* 3. Loan Summary Card */}
      <LoanSummaryCard
        refNumber={refNumber}
        loanType={loanType}
        loanAmount={loanAmount}
        equipment={equipment}
        tenure={tenure}
        disbursementBank={disbursementBank}
        loanAgent={loanAgent}
        isCopied={isCopied}
        onCopyRef={handleCopyRef}
      />

      {/* 4. Application Lifecycle Milestones Card */}
      <LifecycleMilestonesCard milestones={application.milestones} />

      {/* 5. Bottom Action Bar */}
      <div className="loan-status-actions-bar">
        <button
          type="button"
          className="loan-action-btn loan-action-btn--navy"
          onClick={handleTrackApplications}
          data-testid="track-my-applications-btn"
        >
          <img
            src="/assets/icons/loans/list-white.svg"
            alt=""
            width="18"
            height="18"
            aria-hidden="true"
          />
          <span>Track My Applications</span>
        </button>

        <button
          type="button"
          className="loan-action-btn loan-action-btn--home"
          onClick={handleGoHome}
          data-testid="go-to-home-btn"
        >
          <img
            src="/assets/icons/loans/home-navy.svg"
            alt=""
            width="18"
            height="18"
            aria-hidden="true"
          />
          <span>Go to Home</span>
        </button>

        <button
          type="button"
          className="loan-action-btn loan-action-btn--download"
          onClick={handleDownload}
          data-testid="download-receipt-btn"
        >
          <img
            src="/assets/icons/loans/download-orange.svg"
            alt=""
            width="18"
            height="18"
            aria-hidden="true"
 
      {/* 4. Action Buttons */}
      <div className="loan-status-actions">
        <Link
          to="/applications"
          className="loan-status-btn loan-status-btn--primary"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          <span>Track My Applications</span>
        </Link>
        <Link
          to="/dashboard"
          className="loan-status-btn loan-status-btn--secondary"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Go to Home</span>
        </Link>

        <button
          type="button"
          className="loan-status-download-btn"
          onClick={() => {
            alert(`Downloading acknowledgement receipt for ${refNumber}...`)
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
 
          <span>Download Sanction Letter / Receipt</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="loan-status-toast" role="status">
          {toastMessage}
        </div>
      )}
    </div>
  )
}

export default LoanApplicationStatus
