import React from 'react'
import './LoanSummaryCard.css'

export interface LoanSummaryCardProps {
  refNumber: string
  loanType: string
  loanAmount: number
  primaryDetailLabel?: string
  primaryDetailValue?: string
  primaryDetailIcon?: React.ReactNode
  equipment?: string
  tenure: string
  disbursementBank: string
  loanAgent: string
  isCopied: boolean
  onCopyRef: () => void
}

/**
 * Loan Summary Card Component
 * Strictly zero inline styles, zero internal styles, and zero loops.
 */
export const LoanSummaryCard: React.FC<LoanSummaryCardProps> = ({
  refNumber,
  loanType,
  loanAmount,
  primaryDetailLabel,
  primaryDetailValue,
  primaryDetailIcon,
  equipment = '—',
  tenure,
  disbursementBank,
  loanAgent,
  isCopied,
  onCopyRef,
}) => {
  const formattedAmount = loanAmount > 0 ? `₹${loanAmount.toLocaleString('en-IN')}` : '—'
  const label = primaryDetailLabel || 'Detail'
  const value = primaryDetailValue || equipment

  return (
    <div className="loan-status-summary-card" data-testid="loan-summary-card">
      {/* Top Section */}
      <div className="loan-status-summary-card__top">
        <div className="loan-status-summary-card__left">
          <div className="loan-status-ref-row">
            <span className="loan-status-ref-text">Ref: {refNumber}</span>
            <button
              type="button"
              className="loan-status-copy-btn"
              onClick={onCopyRef}
              title={isCopied ? 'Copied!' : 'Copy Reference Number'}
              aria-label="Copy Reference Number"
            >
              <img
                src="/assets/icons/loans/copy-blue.svg"
                alt=""
                width="15"
                height="15"
                aria-hidden="true"
              />
              {isCopied && <span className="loan-status-copy-tooltip">Copied!</span>}
            </button>
          </div>

          <h2 className="loan-status-loan-type">{loanType}</h2>
          <div className="loan-status-amount">{formattedAmount}</div>
        </div>

        <div className="loan-status-summary-card__right">
          <div className="loan-status-doc-badge">
            <img
              src="/assets/icons/loans/doc-blue.svg"
              alt=""
              width="16"
              height="16"
              aria-hidden="true"
            />
            <span>Documents Received</span>
          </div>
        </div>
      </div>

      {/* Meta Grid Section */}
      <div className="loan-status-meta-grid">
        {/* Column 1: Primary Detail (Property / Vehicle / Equipment / Purpose) */}
        <div className="loan-status-meta-col">
          <div className="loan-status-meta-icon-tile">
            {primaryDetailIcon || (
              <img
                src="/assets/icons/loans/equipment-blue.svg"
                alt=""
                width="22"
                height="22"
                aria-hidden="true"
              />
            )}
          </div>
          <div className="loan-status-meta-info">
            <span className="loan-status-meta-label">{label}</span>
            <span className="loan-status-meta-value">{value}</span>
          </div>
        </div>

        {/* Column 2: Tenure */}
        <div className="loan-status-meta-col">
          <div className="loan-status-meta-icon-tile">
            <img
              src="/assets/icons/loans/clock-blue.svg"
              alt=""
              width="22"
              height="22"
              aria-hidden="true"
            />
          </div>
          <div className="loan-status-meta-info">
            <span className="loan-status-meta-label">Tenure</span>
            <span className="loan-status-meta-value">{tenure || '—'}</span>
          </div>
        </div>

        {/* Column 3: Disbursement Bank */}
        <div className="loan-status-meta-col">
          <div className="loan-status-meta-icon-tile">
            <img
              src="/assets/icons/loans/bank-blue.svg"
              alt=""
              width="22"
              height="22"
              aria-hidden="true"
            />
          </div>
          <div className="loan-status-meta-info">
            <span className="loan-status-meta-label">Disbursement Bank</span>
            <span className="loan-status-meta-value">{disbursementBank || '—'}</span>
          </div>
        </div>

        {/* Column 4: Loan Agent */}
        <div className="loan-status-meta-col">
          <div className="loan-status-meta-icon-tile">
            <img
              src="/assets/icons/loans/user-blue.svg"
              alt=""
              width="22"
              height="22"
              aria-hidden="true"
            />
          </div>
          <div className="loan-status-meta-info">
            <span className="loan-status-meta-label">Loan Agent</span>
            <span className="loan-status-meta-value">{loanAgent || 'Assigned on Verification'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanSummaryCard
