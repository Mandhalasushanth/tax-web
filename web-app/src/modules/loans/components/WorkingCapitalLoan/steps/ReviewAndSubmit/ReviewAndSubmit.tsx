import React from 'react'
import type { WorkingCapitalLoanData } from '../../../../types/workingCapitalLoan.types'
import { WORKING_CAPITAL_DOCUMENT_CONFIGS } from '../../../../validation/workingCapitalLoanValidation'
import './ReviewAndSubmit.css'

export interface ReviewAndSubmitProps {
  data: WorkingCapitalLoanData
  onChange: (fields: Partial<WorkingCapitalLoanData>) => void
  onNavigateToStep: (stepNumber: number) => void
  errors?: Record<string, string>
}

export const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({
  data,
  onChange,
  onNavigateToStep,
  errors = {},
}) => {
  const maskedAccountNumber = data.currentAccountNumber
    ? data.currentAccountNumber.length > 4
      ? `XXXXXX${data.currentAccountNumber.slice(-4)}`
      : data.currentAccountNumber
    : 'Not specified'

  const uploadedDocEntries = Object.keys(data.uploadedDocs || {})

  return (
    <div className="working-capital-review-step">
      <div className="working-capital-section-heading">
        <h3 className="working-capital-section-heading__title">Credit Facility Dossier Review</h3>
        <p className="working-capital-section-heading__desc">
          Review requested facility limit, enterprise profile, and financial audit files.
        </p>
      </div>

      <div className="working-capital-review-group">
        {/* 1. Promoter Information */}
        <div className="working-capital-review-card">
          <div className="working-capital-review-card__header">
            <h4 className="working-capital-review-card__title">Promoter Information</h4>
            <span className="working-capital-review-card__verified">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
              </svg>
              Verified Profile
            </span>
          </div>
          <div className="working-capital-review-card__grid">
            <div className="working-capital-review-card__item">
              <span className="working-capital-review-card__label">Applicant Name</span>
              <span className="working-capital-review-card__value">Sushanth Mandhala</span>
            </div>
            <div className="working-capital-review-card__item">
              <span className="working-capital-review-card__label">Mobile</span>
              <span className="working-capital-review-card__value">9030045048</span>
            </div>
            <div className="working-capital-review-card__item">
              <span className="working-capital-review-card__label">PAN</span>
              <span className="working-capital-review-card__value">PFMPS0972B</span>
            </div>
          </div>
        </div>

        {/* 2. Credit Facility Terms */}
        <div className="working-capital-review-card">
          <div className="working-capital-review-card__header">
            <h4 className="working-capital-review-card__title">Credit Facility Terms</h4>
            <button
              type="button"
              className="working-capital-review-card__edit-btn"
              onClick={() => onNavigateToStep(1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              Edit
            </button>
          </div>
          <div className="working-capital-review-card__grid">
            <div className="working-capital-review-card__item">
              <span className="working-capital-review-card__label">Requested Limit</span>
              <span className="working-capital-review-card__value working-capital-review-card__value--highlight">
                ₹{(Number(String(data.requiredCreditLimit || 5000000).replace(/\D/g, '')) || 5000000).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="working-capital-review-card__item">
              <span className="working-capital-review-card__label">Facility Type</span>
              <span className="working-capital-review-card__value">
                {data.creditPurpose || data.preferredFacilityType || 'Supplier Payments'}
              </span>
            </div>
            <div className="working-capital-review-card__item">
              <span className="working-capital-review-card__label">Sanction Period</span>
              <span className="working-capital-review-card__value">12 Months</span>
            </div>
          </div>
        </div>

        {/* 3. Enterprise Profile */}
        <div className="working-capital-review-card">
          <div className="working-capital-review-card__header">
            <h4 className="working-capital-review-card__title">Enterprise Profile</h4>
            <button
              type="button"
              className="working-capital-review-card__edit-btn"
              onClick={() => onNavigateToStep(2)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              Edit
            </button>
          </div>
          <div className="working-capital-review-card__grid">
            <div className="working-capital-review-card__item">
              <span className="working-capital-review-card__label">Enterprise Name</span>
              <span className="working-capital-review-card__value">{data.registeredBusinessName || 'Zenith Trading Co'}</span>
            </div>
            <div className="working-capital-review-card__item">
              <span className="working-capital-review-card__label">GSTIN</span>
              <span className="working-capital-review-card__value">{data.gstinNumber || '29AAAAA0000A1Z5'}</span>
            </div>
            <div className="working-capital-review-card__item">
              <span className="working-capital-review-card__label">Vintage</span>
              <span className="working-capital-review-card__value">{data.operationalTrackRecord || '2 Years'}</span>
            </div>
            <div className="working-capital-review-card__item">
              <span className="working-capital-review-card__label">Turnover</span>
              <span className="working-capital-review-card__value">
                {data.annualAuditedTurnover ? `₹${data.annualAuditedTurnover}` : '₹6,86,995'}
              </span>
            </div>
            <div className="working-capital-review-card__item">
              <span className="working-capital-review-card__label">Net Profit</span>
              <span className="working-capital-review-card__value">
                {data.annualNetProfitBeforeTax ? `₹${data.annualNetProfitBeforeTax}` : '₹6,599'}
              </span>
            </div>
          </div>
        </div>

        {/* 4. Disbursement Current Account */}
        <div className="working-capital-review-card">
          <div className="working-capital-review-card__header">
            <h4 className="working-capital-review-card__title">Disbursement Current Account</h4>
            <button
              type="button"
              className="working-capital-review-card__edit-btn"
              onClick={() => onNavigateToStep(2)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              Edit
            </button>
          </div>
          <div className="working-capital-review-card__grid">
            <div className="working-capital-review-card__item">
              <span className="working-capital-review-card__label">Bank</span>
              <span className="working-capital-review-card__value">{data.currentAccountBankName || 'State Bank of India'}</span>
            </div>
            <div className="working-capital-review-card__item">
              <span className="working-capital-review-card__label">Account Number</span>
              <span className="working-capital-review-card__value">{maskedAccountNumber !== 'Not specified' ? maskedAccountNumber : 'XXXXXX5568'}</span>
            </div>
            <div className="working-capital-review-card__item">
              <span className="working-capital-review-card__label">IFSC Code</span>
              <span className="working-capital-review-card__value">{data.bankIfscCode || 'SBIN0008887'}</span>
            </div>
          </div>
        </div>

        {/* 5. Uploaded Records Pill Cloud */}
        <div className="working-capital-review-card">
          <div className="working-capital-review-card__header">
            <h4 className="working-capital-review-card__title">Uploaded Records</h4>
            <button
              type="button"
              className="working-capital-review-card__edit-btn"
              onClick={() => onNavigateToStep(3)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              Manage
            </button>
          </div>
          <div className="working-capital-doc-chips">
            {WORKING_CAPITAL_DOCUMENT_CONFIGS.map((doc) => {
              const isUploaded = uploadedDocEntries.includes(doc.id) || !uploadedDocEntries.length
              return (
                <div
                  key={doc.id}
                  className={`working-capital-doc-chip ${isUploaded ? 'working-capital-doc-chip--active' : ''}`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="working-capital-doc-chip__icon">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>{doc.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 6. Authorization Declaration Checkbox */}
      <div className="working-capital-review__declaration">
        <input
          id="working-capital-terms-checkbox"
          type="checkbox"
          className="working-capital-review__checkbox"
          checked={data.termsAccepted}
          onChange={(e) => onChange({ termsAccepted: e.target.checked })}
        />
        <label htmlFor="working-capital-terms-checkbox" className="working-capital-review__label">
          I authorize TaxEdge to share our audited balance sheets, GSTR filings, and operating bank statements with consortium banking partners to structure this Working Capital line.
        </label>
      </div>
      {errors.termsAccepted && (
        <span className="working-capital-field-error" role="alert">
          {errors.termsAccepted}
        </span>
      )}
    </div>
  )
}

export default ReviewAndSubmit
