import React from 'react'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'
import { PROJECT_FINANCE_DOCUMENT_CONFIGS } from '../../../../validation/projectFinanceValidation'
import './ProjectReview.css'

export interface ProjectReviewProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  onNavigateToStep: (stepNumber: number) => void
  errors?: Record<string, string>
}

export const ProjectReview: React.FC<ProjectReviewProps> = ({
  data,
  onChange,
  onNavigateToStep,
  errors = {},
}) => {
  const maskedAccount = data.disbursementAccountNumber
    ? data.disbursementAccountNumber.length > 4
      ? `XXXXXX${data.disbursementAccountNumber.slice(-4)}`
      : data.disbursementAccountNumber
    : 'Not specified'

  const uploadedDocKeys = Object.keys(data.uploadedDocs || {})
  const uploadedDocNames = uploadedDocKeys.map((id) => {
    const config = PROJECT_FINANCE_DOCUMENT_CONFIGS.find((d) => d.id === id)
    return config ? config.name : id
  })

  const EditBtn = ({ step }: { step: number }) => (
    <button
      type="button"
      className="pf-review-card__edit-btn"
      onClick={() => onNavigateToStep(step)}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      </svg>
      Edit
    </button>
  )

  return (
    <div className="pf-review-step">
      <div className="pf-review-heading">
        <h3 className="pf-review-heading__title">Project Finance Application Review</h3>
        <p className="pf-review-heading__desc">
          Verify project details, funding structure, promoter profile, and uploaded documents before submission.
        </p>
      </div>

      <div className="pf-review-group">
        {/* Step 1: Project Details */}
        <div className="pf-review-card">
          <div className="pf-review-card__header">
            <h4 className="pf-review-card__title">Project Details</h4>
            <EditBtn step={1} />
          </div>
          <div className="pf-review-card__grid">
            <div className="pf-review-card__item">
              <span className="pf-review-card__label">Project Name</span>
              <span className="pf-review-card__value">{data.projectName || '—'}</span>
            </div>
            <div className="pf-review-card__item">
              <span className="pf-review-card__label">Sector</span>
              <span className="pf-review-card__value">{data.projectSector || '—'}</span>
            </div>
            <div className="pf-review-card__item">
              <span className="pf-review-card__label">Location</span>
              <span className="pf-review-card__value">{data.projectLocation || '—'}</span>
            </div>
            <div className="pf-review-card__item">
              <span className="pf-review-card__label">Finance Type</span>
              <span className="pf-review-card__value">{data.preferredFinanceType || '—'}</span>
            </div>
            <div className="pf-review-card__item">
              <span className="pf-review-card__label">Total Project Cost</span>
              <span className="pf-review-card__value">
                {data.totalProjectCost
                  ? `₹${Number(String(data.totalProjectCost).replace(/\D/g, '')).toLocaleString('en-IN')}`
                  : '—'}
              </span>
            </div>
            <div className="pf-review-card__item">
              <span className="pf-review-card__label">Debt Required</span>
              <span className="pf-review-card__value">
                {data.debtFundingRequired
                  ? `₹${Number(String(data.debtFundingRequired).replace(/\D/g, '')).toLocaleString('en-IN')}`
                  : '—'}
              </span>
            </div>
            <div className="pf-review-card__item">
              <span className="pf-review-card__label">Tenure</span>
              <span className="pf-review-card__value">{data.repaymentTenure || '—'}</span>
            </div>
          </div>
        </div>

        {/* Step 2: Promoter & Collateral */}
        <div className="pf-review-card">
          <div className="pf-review-card__header">
            <h4 className="pf-review-card__title">Promoter & Collateral</h4>
            <EditBtn step={2} />
          </div>
          <div className="pf-review-card__grid">
            <div className="pf-review-card__item">
              <span className="pf-review-card__label">Promoter / Entity</span>
              <span className="pf-review-card__value">{data.promoterEntityName || '—'}</span>
            </div>
            <div className="pf-review-card__item">
              <span className="pf-review-card__label">Constitution</span>
              <span className="pf-review-card__value">{data.promoterConstitution || '—'}</span>
            </div>
            <div className="pf-review-card__item">
              <span className="pf-review-card__label">PAN</span>
              <span className="pf-review-card__value">{data.promoterPan || '—'}</span>
            </div>
            <div className="pf-review-card__item">
              <span className="pf-review-card__label">Collateral</span>
              <span className="pf-review-card__value">{data.collateralType || '—'}</span>
            </div>
            <div className="pf-review-card__item">
              <span className="pf-review-card__label">Disbursement Bank</span>
              <span className="pf-review-card__value">{data.disbursementBankName || '—'}</span>
            </div>
            <div className="pf-review-card__item">
              <span className="pf-review-card__label">Account Number</span>
              <span className="pf-review-card__value">{maskedAccount}</span>
            </div>
            <div className="pf-review-card__item">
              <span className="pf-review-card__label">IFSC</span>
              <span className="pf-review-card__value">{data.disbursementIfscCode || '—'}</span>
            </div>
          </div>
        </div>

        {/* Step 3: Documents */}
        <div className="pf-review-card">
          <div className="pf-review-card__header">
            <h4 className="pf-review-card__title">Uploaded Documents</h4>
            <EditBtn step={3} />
          </div>
          {uploadedDocNames.length > 0 ? (
            <ul className="pf-review-doc-list">
              {uploadedDocNames.map((name) => (
                <li key={name} className="pf-review-doc-item">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="pf-review-doc-check">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="pf-review-no-docs">No documents uploaded yet.</p>
          )}
        </div>
      </div>

      {/* Authorization Declaration */}
      <div className="pf-review-declaration">
        <label className="pf-review-declaration__label" htmlFor="pf-terms-checkbox">
          <input
            id="pf-terms-checkbox"
            type="checkbox"
            className="pf-review-declaration__checkbox"
            checked={Boolean(data.termsAccepted)}
            onChange={(e) => onChange({ termsAccepted: e.target.checked })}
          />
          <span className="pf-review-declaration__text">
            I/We hereby confirm that all information provided in this Project Finance application is
            accurate and complete. I/We authorize TaxEdge Fin Solutions to verify submitted details
            with relevant financial institutions, credit bureaus, and statutory bodies for the purpose
            of structured project finance appraisal and funding arrangement.
          </span>
        </label>
        {errors.termsAccepted && (
          <span className="pf-review-declaration__error" role="alert">
            {errors.termsAccepted}
          </span>
        )}
      </div>
    </div>
  )
}

export default ProjectReview
