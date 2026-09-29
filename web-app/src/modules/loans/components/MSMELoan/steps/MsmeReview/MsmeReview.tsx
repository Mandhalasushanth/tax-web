import React from 'react'
import type { MsmeLoanData } from '../../../../types/msmeLoan.types'
import { MSME_DOCUMENT_CONFIGS } from '../../../../validation/msmeLoanValidation'
import './MsmeReview.css'

export interface MsmeReviewProps {
  data: MsmeLoanData
  onChange: (fields: Partial<MsmeLoanData>) => void
  onNavigateToStep: (stepNumber: number) => void
  errors?: Record<string, string>
}

export const MsmeReview: React.FC<MsmeReviewProps> = ({
  data,
  onChange,
  onNavigateToStep,
  errors = {},
}) => {
  const maskedAccount = data.currentAccountNumber
    ? data.currentAccountNumber.length > 4
      ? `XXXXXX${data.currentAccountNumber.slice(-4)}`
      : data.currentAccountNumber
    : 'Not specified'

  const uploadedDocKeys = Object.keys(data.uploadedDocs || {})
  const uploadedDocNames = uploadedDocKeys.map((id) => {
    const config = MSME_DOCUMENT_CONFIGS.find((d) => d.id === id)
    return config ? config.name : id
  })

  return (
    <div className="msme-review-step">
      <div className="msme-review-heading">
        <h3 className="msme-review-heading__title">MSME Loan Application Review</h3>
        <p className="msme-review-heading__desc">
          Verify all entered details. Accept the authorization declaration and submit.
        </p>
      </div>

      <div className="msme-review-group">
        {/* Step 1 Summary: Loan Requirements */}
        <div className="msme-review-card">
          <div className="msme-review-card__header">
            <h4 className="msme-review-card__title">Loan Requirements</h4>
            <button
              type="button"
              className="msme-review-card__edit-btn"
              onClick={() => onNavigateToStep(1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              Edit
            </button>
          </div>
          <div className="msme-review-card__grid">
            <div className="msme-review-card__item">
              <span className="msme-review-card__label">Loan Amount</span>
              <span className="msme-review-card__value">
                {data.requiredLoanAmount
                  ? `₹${Number(String(data.requiredLoanAmount).replace(/\D/g, '')).toLocaleString('en-IN')}`
                  : '—'}
              </span>
            </div>
            <div className="msme-review-card__item">
              <span className="msme-review-card__label">Purpose</span>
              <span className="msme-review-card__value">{data.loanPurpose || '—'}</span>
            </div>
            <div className="msme-review-card__item">
              <span className="msme-review-card__label">Tenure</span>
              <span className="msme-review-card__value">{data.repaymentTenure || '—'}</span>
            </div>
            <div className="msme-review-card__item">
              <span className="msme-review-card__label">Active Borrowings</span>
              <span className="msme-review-card__value">{data.hasActiveBorrowings ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        {/* Step 2 Summary: Business Details */}
        <div className="msme-review-card">
          <div className="msme-review-card__header">
            <h4 className="msme-review-card__title">Business Details</h4>
            <button
              type="button"
              className="msme-review-card__edit-btn"
              onClick={() => onNavigateToStep(2)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              Edit
            </button>
          </div>
          <div className="msme-review-card__grid">
            <div className="msme-review-card__item">
              <span className="msme-review-card__label">Business Name</span>
              <span className="msme-review-card__value">{data.registeredBusinessName || '—'}</span>
            </div>
            <div className="msme-review-card__item">
              <span className="msme-review-card__label">Constitution</span>
              <span className="msme-review-card__value">{data.businessConstitution || '—'}</span>
            </div>
            <div className="msme-review-card__item">
              <span className="msme-review-card__label">GSTIN</span>
              <span className="msme-review-card__value">{data.gstin || '—'}</span>
            </div>
            <div className="msme-review-card__item">
              <span className="msme-review-card__label">Business Vintage</span>
              <span className="msme-review-card__value">{data.businessVintage || '—'}</span>
            </div>
            <div className="msme-review-card__item">
              <span className="msme-review-card__label">Annual Turnover</span>
              <span className="msme-review-card__value">
                {data.annualTurnover
                  ? `₹${Number(String(data.annualTurnover).replace(/\D/g, '')).toLocaleString('en-IN')}`
                  : '—'}
              </span>
            </div>
            <div className="msme-review-card__item">
              <span className="msme-review-card__label">Bank</span>
              <span className="msme-review-card__value">{data.primaryBankName || '—'}</span>
            </div>
            <div className="msme-review-card__item">
              <span className="msme-review-card__label">Account Number</span>
              <span className="msme-review-card__value">{maskedAccount}</span>
            </div>
            <div className="msme-review-card__item">
              <span className="msme-review-card__label">IFSC</span>
              <span className="msme-review-card__value">{data.bankIfscCode || '—'}</span>
            </div>
          </div>
        </div>

        {/* Step 3 Summary: Documents */}
        <div className="msme-review-card">
          <div className="msme-review-card__header">
            <h4 className="msme-review-card__title">Uploaded Documents</h4>
            <button
              type="button"
              className="msme-review-card__edit-btn"
              onClick={() => onNavigateToStep(3)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              Edit
            </button>
          </div>
          {uploadedDocNames.length > 0 ? (
            <ul className="msme-review-doc-list">
              {uploadedDocNames.map((name) => (
                <li key={name} className="msme-review-doc-item">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="msme-review-doc-check">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="msme-review-no-docs">No documents uploaded yet.</p>
          )}
        </div>
      </div>

      {/* Authorization Declaration */}
      <div className="msme-review-declaration">
        <label className="msme-review-declaration__label" htmlFor="msme-terms-checkbox">
          <input
            id="msme-terms-checkbox"
            type="checkbox"
            className="msme-review-declaration__checkbox"
            checked={Boolean(data.termsAccepted)}
            onChange={(e) => onChange({ termsAccepted: e.target.checked })}
          />
          <span className="msme-review-declaration__text">
            I hereby declare that all information provided is accurate and complete. I authorize
            TaxEdge Fin Solutions to verify the submitted details with relevant financial institutions,
            credit bureaus, and statutory bodies for the purpose of MSME loan processing.
          </span>
        </label>
        {errors.termsAccepted && (
          <span className="msme-review-declaration__error" role="alert">
            {errors.termsAccepted}
          </span>
        )}
      </div>
    </div>
  )
}

export default MsmeReview
