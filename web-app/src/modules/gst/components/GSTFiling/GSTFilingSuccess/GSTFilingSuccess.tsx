import { formatCurrency } from '@shared/utils'
import { GSTFilingStepper } from '../../../shared/GSTFilingStepper/GSTFilingStepper'
import type { PaymentResult } from '../../../types/gst.types'
import './GSTFilingSuccess.css'

interface GSTFilingSuccessProps {
  details: PaymentResult
  onBack?: () => void
  onViewReceipt: () => void
  onTrackApplication: () => void
  onBackToDashboard: () => void
}

export const GSTFilingSuccess = ({
  details,
  onBack,
  onViewReceipt,
  onTrackApplication,
  onBackToDashboard,
}: GSTFilingSuccessProps) => {
  return (
    <div className="gst-success-wrapper">
      <div className="gst-filing-success-stepper-wrap">
        <GSTFilingStepper currentStep={5} />
      </div>

      <div className="gst-success-card">
        <div className="gst-success-ring">
          <svg viewBox="0 0 24 24" className="gst-success-check-svg">
            <path d="M20 6.5 9.5 17.5 4 12" />
          </svg>
        </div>

        <h1 className="gst-success-title">Payment successful</h1>
        <p className="gst-success-subtitle">
          {formatCurrency(details.amount)} received. Your GST Filing application is now active and in process.
        </p>

        <div className="gst-success-action-buttons">
          <button type="button" className="gst-success-btn-primary" onClick={onViewReceipt}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="gst-success-btn-icon">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>View receipt</span>
          </button>
          <button type="button" className="gst-success-btn-secondary" onClick={onTrackApplication}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="gst-success-btn-icon">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Track application</span>
          </button>
        </div>

        <div className="gst-success-details-table">
          <div className="gst-success-row">
            <span className="gst-success-label">Transaction ID</span>
            <span className="gst-success-value">{details.transactionId}</span>
          </div>
          <div className="gst-success-row">
            <span className="gst-success-label">Receipt number</span>
            <span className="gst-success-value">{details.receiptNumber}</span>
          </div>
          <div className="gst-success-row">
            <span className="gst-success-label">Payment Method</span>
            <span className="gst-success-value">{details.method}</span>
          </div>
          <div className="gst-success-row">
            <span className="gst-success-label">Date &amp; Time</span>
            <span className="gst-success-value">{details.dateText}</span>
          </div>
          <div className="gst-success-row">
            <span className="gst-success-label">Application Reference</span>
            <span className="gst-success-value">{details.applicationRef}</span>
          </div>
          <div className="gst-success-row gst-success-row--total">
            <span className="gst-success-total-label">Amount paid</span>
            <span className="gst-success-total-val">{formatCurrency(details.amount)}</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Back button Left, Back to Dashboard button Right */}
      <div className="gst-success-bottom-bar">
        <button
          type="button"
          className="gst-success-btn-back"
          onClick={() => {
            if (onBack) {
              onBack()
            } else {
              window.history.back()
            }
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="gst-success-nav-icon">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back</span>
        </button>

        <button type="button" className="gst-success-btn-back-dash" onClick={onBackToDashboard}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="gst-success-nav-icon">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Back to dashboard</span>
        </button>
      </div>
    </div>
  )
}

export default GSTFilingSuccess
