import React from 'react'
import { useAuthStore } from '@store/index'
import type { WorkingCapitalLoanData } from '@modules/loans/types/workingCapitalLoan.types'
import { WORKING_CAPITAL_DOCUMENT_CONFIGS } from '@modules/loans/validation/workingCapitalLoanValidation'
import './ReviewAndSubmit.css'

export interface ReviewAndSubmitProps {
  data: WorkingCapitalLoanData
  onChange: (fields: Partial<WorkingCapitalLoanData>) => void
  onNavigateToStep: (stepNumber: number) => void
  errors?: Record<string, string>
}

const EditButton: React.FC<{ onClick: () => void; label?: string }> = ({ onClick, label = 'Edit' }) => (
  <button type="button" className="working-capital-review-card__edit-btn" onClick={onClick}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
    {label}
  </button>
)

const ReviewItem: React.FC<{ label: string; value: React.ReactNode; highlight?: boolean }> = ({ label, value, highlight }) => (
  <div className="working-capital-review-card__item">
    <span className="working-capital-review-card__label">{label}</span>
    <span className={`working-capital-review-card__value ${highlight ? 'working-capital-review-card__value--highlight' : ''}`}>{value}</span>
  </div>
)

export const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({
  data,
  onChange,
  onNavigateToStep,
  errors = {},
}) => {
  const user = useAuthStore.getState().user
  const maskedAccountNumber = data.currentAccountNumber && data.currentAccountNumber.length > 4
    ? `XXXXXX${data.currentAccountNumber.slice(-4)}`
    : (data.currentAccountNumber || '—')

  const uploadedDocEntries = Object.keys(data.uploadedDocs || {})

  const promoterItems = [
    { label: 'Applicant Name', value: user?.fullName || '—' },
    { label: 'Mobile', value: user?.mobile || '—' },
    { label: 'PAN', value: user?.pan || '—' },
  ]

  const termsItems = [
    { label: 'Requested Limit', value: data.requiredCreditLimit ? `₹${(Number(String(data.requiredCreditLimit).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}` : '—', highlight: true },
    { label: 'Facility Type', value: data.creditPurpose || data.preferredFacilityType || '—' },
    { label: 'Sanction Period', value: '12 Months' },
  ]

  const enterpriseItems = [
    { label: 'Enterprise Name', value: data.registeredBusinessName || '—' },
    { label: 'GSTIN', value: data.gstinNumber || '—' },
    { label: 'Vintage', value: data.operationalTrackRecord || '—' },
    { label: 'Turnover', value: data.annualAuditedTurnover ? `₹${data.annualAuditedTurnover}` : '—' },
    { label: 'Net Profit', value: data.annualNetProfitBeforeTax ? `₹${data.annualNetProfitBeforeTax}` : '—' },
  ]

  const accountItems = [
    { label: 'Bank', value: data.currentAccountBankName || '—' },
    { label: 'Account Number', value: maskedAccountNumber },
    { label: 'IFSC Code', value: data.bankIfscCode || '—' },
  ]

  const renderPromoterInfo = () => (
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
        {promoterItems.map((item, idx) => (
          <ReviewItem key={idx} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  )

  const renderCreditFacilityTerms = () => (
    <div className="working-capital-review-card">
      <div className="working-capital-review-card__header">
        <h4 className="working-capital-review-card__title">Credit Facility Terms</h4>
        <EditButton onClick={() => onNavigateToStep(1)} />
      </div>
      <div className="working-capital-review-card__grid">
        {termsItems.map((item, idx) => (
          <ReviewItem key={idx} label={item.label} value={item.value} highlight={item.highlight} />
        ))}
      </div>
    </div>
  )

  const renderEnterpriseProfile = () => (
    <div className="working-capital-review-card">
      <div className="working-capital-review-card__header">
        <h4 className="working-capital-review-card__title">Enterprise Profile</h4>
        <EditButton onClick={() => onNavigateToStep(2)} />
      </div>
      <div className="working-capital-review-card__grid">
        {enterpriseItems.map((item, idx) => (
          <ReviewItem key={idx} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  )

  const renderDisbursementAccount = () => (
    <div className="working-capital-review-card">
      <div className="working-capital-review-card__header">
        <h4 className="working-capital-review-card__title">Disbursement Current Account</h4>
        <EditButton onClick={() => onNavigateToStep(2)} />
      </div>
      <div className="working-capital-review-card__grid">
        {accountItems.map((item, idx) => (
          <ReviewItem key={idx} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  )

  const renderUploadedRecords = () => (
    <div className="working-capital-review-card">
      <div className="working-capital-review-card__header">
        <h4 className="working-capital-review-card__title">Uploaded Records</h4>
        <EditButton onClick={() => onNavigateToStep(3)} label="Manage" />
      </div>
      <div className="working-capital-doc-chips">
        {WORKING_CAPITAL_DOCUMENT_CONFIGS.map((doc) => {
          const isUploaded = uploadedDocEntries.includes(doc.id) || !uploadedDocEntries.length
          return (
            <div key={doc.id} className={`working-capital-doc-chip ${isUploaded ? 'working-capital-doc-chip--active' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="working-capital-doc-chip__icon">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              <span>{doc.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderAuthorization = () => (
    <>
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
        <span className="working-capital-field-error" role="alert">{errors.termsAccepted}</span>
      )}
    </>
  )

  return (
    <div className="working-capital-review-step">
      <div className="working-capital-section-heading">
        <h3 className="working-capital-section-heading__title">Credit Facility Dossier Review</h3>
        <p className="working-capital-section-heading__desc">
          Review requested facility limit, enterprise profile, and financial audit files.
        </p>
      </div>

      <div className="working-capital-review-group">
        {renderPromoterInfo()}
        {renderCreditFacilityTerms()}
        {renderEnterpriseProfile()}
        {renderDisbursementAccount()}
        {renderUploadedRecords()}
      </div>

      {renderAuthorization()}
    </div>
  )
}

export default ReviewAndSubmit
