import React from 'react'
import type { PersonalLoanData } from '../../../../types/personalLoan.types'
import { getApplicantIdentityDetails } from '../../../../services/applicantDetailsService'
import { PERSONAL_DOCS_LIST } from '../Documents/Documents'
import './Review.css'

export interface ReviewProps {
  data: PersonalLoanData
  onChange: (fields: Partial<PersonalLoanData>) => void
  onNavigateToStep: (step: number) => void
  errors?: Record<string, string>
}

export const Review: React.FC<ReviewProps> = ({
  data,
  onChange,
  onNavigateToStep,
  errors = {},
}) => {
  const applicant = getApplicantIdentityDetails()

  const displayName = applicant.name || '—'
  const displayMobile = applicant.mobile || '—'
  const displayEmail = applicant.email || '—'
  const displayPan = applicant.pan ? applicant.pan.replace(/^(.{2})(.*)(.{1})$/, '$1XXXX$3') : '—'
  const displayAadhaar = applicant.aadhaar ? `XXXX-XXXX-${applicant.aadhaar.slice(-4)}` : '—'
  const displayDob = applicant.dob || '—'
  const displayAddress = applicant.address || '—'

  const uploadedDocs = data.uploadedDocs || {}

  return (
    <div className="personal-review-step" data-testid="step-personal-review">
      <div className="personal-review-header">
        <h2 className="personal-review-header__title">Review & Submit</h2>
        <p className="personal-review-header__subtitle">
          Please verify your application details before final submission.
        </p>
      </div>

      <div className="personal-review-cards-container">
        {/* 1. Financial Requirements Card */}
        <div className="personal-review-card">
          <div className="personal-review-card__header">
            <div className="personal-review-card__title-group">
              <span className="personal-review-card__icon">💰</span>
              <h3 className="personal-review-card__title">Financial Requirements</h3>
            </div>
            <button
              type="button"
              className="personal-review-card__edit-btn"
              onClick={() => onNavigateToStep(1)}
            >
              Edit
            </button>
          </div>

          <div className="personal-review-grid">
            <div className="personal-review-item">
              <span className="personal-review-item__label">Required Loan Amount</span>
              <span className="personal-review-item__value">
                {data.requiredLoanAmount ? `₹${data.requiredLoanAmount}` : '—'}
              </span>
            </div>
            <div className="personal-review-item">
              <span className="personal-review-item__label">Purpose of Loan</span>
              <span className="personal-review-item__value">{data.purposeOfLoan || '—'}</span>
            </div>
            <div className="personal-review-item">
              <span className="personal-review-item__label">Preferred Tenure</span>
              <span className="personal-review-item__value">{data.preferredTenure || '—'}</span>
            </div>
            <div className="personal-review-item">
              <span className="personal-review-item__label">Monthly Net Salary</span>
              <span className="personal-review-item__value">
                {data.monthlyNetSalary ? `₹${data.monthlyNetSalary}` : '—'}
              </span>
            </div>
            <div className="personal-review-item">
              <span className="personal-review-item__label">Existing Loans</span>
              <span className="personal-review-item__value">
                {data.hasExistingLoans
                  ? `Active Loans (${data.existingMonthlyEmi ? `₹${data.existingMonthlyEmi}/mo` : 'EMI specified'})`
                  : 'No Existing Loans'}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Applicant Identity Card */}
        <div className="personal-review-card">
          <div className="personal-review-card__header">
            <div className="personal-review-card__title-group">
              <span className="personal-review-card__icon">👤</span>
              <h3 className="personal-review-card__title">Applicant Identity</h3>
            </div>
            <div className="personal-applicant-card__badge">Verified Profile</div>
          </div>

          <div className="personal-review-grid">
            <div className="personal-review-item">
              <span className="personal-review-item__label">Applicant Name</span>
              <span className="personal-review-item__value">{displayName}</span>
            </div>
            <div className="personal-review-item">
              <span className="personal-review-item__label">Mobile</span>
              <span className="personal-review-item__value">{displayMobile}</span>
            </div>
            <div className="personal-review-item">
              <span className="personal-review-item__label">Email</span>
              <span className="personal-review-item__value">{displayEmail}</span>
            </div>
            <div className="personal-review-item">
              <span className="personal-review-item__label">PAN</span>
              <span className="personal-review-item__value">{displayPan}</span>
            </div>
            <div className="personal-review-item">
              <span className="personal-review-item__label">Aadhaar</span>
              <span className="personal-review-item__value">{displayAadhaar}</span>
            </div>
            <div className="personal-review-item">
              <span className="personal-review-item__label">Date of Birth</span>
              <span className="personal-review-item__value">{displayDob}</span>
            </div>
            <div className="personal-review-item personal-review-item--full">
              <span className="personal-review-item__label">Address</span>
              <span className="personal-review-item__value">{displayAddress}</span>
            </div>
          </div>
        </div>

        {/* 3. Disbursement Banking Details Card */}
        <div className="personal-review-card">
          <div className="personal-review-card__header">
            <div className="personal-review-card__title-group">
              <span className="personal-review-card__icon">🏦</span>
              <h3 className="personal-review-card__title">Disbursement Banking Details</h3>
            </div>
            <button
              type="button"
              className="personal-review-card__edit-btn"
              onClick={() => onNavigateToStep(2)}
            >
              Edit
            </button>
          </div>

          <div className="personal-review-grid">
            <div className="personal-review-item">
              <span className="personal-review-item__label">Primary Operating Bank</span>
              <span className="personal-review-item__value">{data.primaryBankName || '—'}</span>
            </div>
            <div className="personal-review-item">
              <span className="personal-review-item__label">Bank Account Number</span>
              <span className="personal-review-item__value">
                {data.bankAccountNumber
                  ? `•••• •••• ${data.bankAccountNumber.slice(-4)}`
                  : '—'}
              </span>
            </div>
            <div className="personal-review-item">
              <span className="personal-review-item__label">IFSC Code</span>
              <span className="personal-review-item__value">{data.bankIfscCode || '—'}</span>
            </div>
            {data.branchName && (
              <div className="personal-review-item personal-review-item--full">
                <span className="personal-review-item__label">Branch</span>
                <span className="personal-review-item__value">{data.branchName}</span>
              </div>
            )}
          </div>
        </div>

        {/* 4. Uploaded Documents Dossier Card */}
        <div className="personal-review-card">
          <div className="personal-review-card__header">
            <div className="personal-review-card__title-group">
              <span className="personal-review-card__icon">📁</span>
              <h3 className="personal-review-card__title">Upload Records</h3>
            </div>
            <button
              type="button"
              className="personal-review-card__edit-btn"
              onClick={() => onNavigateToStep(3)}
            >
              Edit
            </button>
          </div>

          <div className="personal-review-docs-list">
            {PERSONAL_DOCS_LIST.map((doc) => {
              const uploaded = uploadedDocs[doc.id]
              return (
                <div key={doc.id} className="personal-review-doc-item">
                  <span className="personal-review-doc-item__title">{doc.title}</span>
                  {uploaded ? (
                    <span className="personal-review-doc-item__status personal-review-doc-item__status--ok">
                      ✓ Uploaded ({uploaded.size})
                    </span>
                  ) : (
                    <span className="personal-review-doc-item__status personal-review-doc-item__status--missing">
                      Missing
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 5. Declarations & Consents Card */}
      <div className="personal-review-card personal-review-card--consent">
        <h3 className="personal-review-card__title">Declarations & Consent</h3>

        <div className="personal-consent-list">
          <label className="personal-consent-item">
            <input
              type="checkbox"
              checked={data.confirmAccurate || false}
              onChange={(e) => onChange({ confirmAccurate: e.target.checked })}
              className="personal-consent-checkbox"
            />
            <span className="personal-consent-text">
              I hereby declare that all information and documents provided in this Personal Loan application are true, correct, and complete.
            </span>
          </label>
          {errors.confirmAccurate && (
            <span className="personal-field-error" role="alert">{errors.confirmAccurate}</span>
          )}

          <label className="personal-consent-item">
            <input
              type="checkbox"
              checked={data.authorizeCreditCheck || false}
              onChange={(e) => onChange({ authorizeCreditCheck: e.target.checked })}
              className="personal-consent-checkbox"
            />
            <span className="personal-consent-text">
              I authorize TaxEdge and its lending partners to pull my credit information (CIBIL/Experian), verify my KYC via official databases, and contact me via Phone, SMS, or WhatsApp regarding this loan.
            </span>
          </label>
          {errors.authorizeCreditCheck && (
            <span className="personal-field-error" role="alert">{errors.authorizeCreditCheck}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Review
