import React, { useState } from 'react'
import { useAuthStore } from '@store/index'
import type { VehicleLoanData } from '@modules/loans/types/vehicleLoan.types'
import './ReviewAndDeclaration.css'

export interface ReviewAndDeclarationProps {
  data: VehicleLoanData
  onChange: (fields: Partial<VehicleLoanData>) => void
  onNavigateToStep: (stepNumber: number) => void
  errors?: Record<string, string>
}

const DOC_NAME_MAP: Record<string, string> = {
  pan_card: 'PAN Card',
  aadhaar_card: 'Aadhaar Card',
  driving_license: 'Driving License',
  passport_photo: 'Passport Size Photograph',
  address_proof: 'Address Proof',
  bank_statement: 'Bank Statements (6-12 Months)',
  salary_slip: 'Salary Slips / Income Proof',
  dealer_quotation: 'Dealer Proforma Invoice / Quotation',
  form16_itr: 'Form 16 / ITR & Computation (2 Years)',
  vehicle_rc: 'Vehicle RC Copy (For Used Vehicle)',
  down_payment_receipt: 'Down Payment / Margin Money Receipt',
}

const EditBtn: React.FC<{ onClick: () => void; label?: string }> = ({ onClick, label = 'Edit' }) => (
  <button type="button" className="vehicle-review-card__edit-btn" onClick={onClick}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
    {label}
  </button>
)

const ReviewRow: React.FC<{ label: string; value: React.ReactNode; highlight?: boolean }> = ({ label, value, highlight }) => (
  <div className="vehicle-review-card__row">
    <span className="vehicle-review-card__row-label">{label}</span>
    <span className={`vehicle-review-card__row-value ${highlight ? 'vehicle-review-card__row-value--highlight' : ''}`}>{value}</span>
  </div>
)

export const ReviewAndDeclaration: React.FC<ReviewAndDeclarationProps> = ({
  data,
  onChange,
  onNavigateToStep,
  errors = {},
}) => {
  const [previewDoc, setPreviewDoc] = useState<{ name: string; url?: string } | null>(null)

  const user = useAuthStore.getState().user
  const maskedAccountNumber = data.accountNumber && data.accountNumber.length > 4
    ? `XXXXXX${data.accountNumber.slice(-4)}`
    : (data.accountNumber || '—')

  const uploadedDocEntries = Object.entries(data.uploadedDocs || {})
  const displayDocEntries = uploadedDocEntries

  const termsRows = [
    { label: 'Required Loan Amount', value: data.loanAmount ? `₹${(Number(String(data.loanAmount).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}` : '—', highlight: true },
    { label: 'Vehicle Category / Purpose', value: data.vehicleCategory || '—' },
    { label: 'Vehicle Condition', value: data.vehicleCondition || '—' },
    { label: 'Make & Model', value: data.vehicleMakeModel === 'Other (Specify Custom Vehicle Model)' ? (data.customVehicleMakeModel || 'Custom Vehicle') : (data.vehicleMakeModel || '—') },
    { label: 'On-Road Price / Valuation', value: data.onRoadPrice ? `₹${(Number(String(data.onRoadPrice).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}` : '—' },
    { label: 'Down Payment / Margin', value: data.downPayment ? `₹${(Number(String(data.downPayment).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}` : '—' },
    { label: 'Repayment Tenure', value: data.repaymentTenure || '—' },
  ]

  const employmentRows = [
    { label: 'Employment Category', value: data.occupationType || '—' },
    { label: 'Monthly In-Hand Income', value: data.monthlyIncomeRange || '—' },
    { label: 'Other Ongoing EMIs', value: data.hasActiveEmis ? `Active (₹${(Number(String(data.totalMonthlyEmi).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}/mo)` : 'No Running EMIs' },
  ]

  const bankingRows = [
    { label: 'Operating Bank', value: data.bankName || '—' },
    { label: 'Account Number', value: maskedAccountNumber },
    { label: 'IFSC Code', value: data.ifscCode || '—' },
    { label: 'ITR Filing Status', value: data.itrStatus || '—' },
  ]

  return (
    <div className="vehicle-review-step">
      {/* 1. Borrower Profile Card */}
      <div className="vehicle-review-card">
        <div className="vehicle-review-card__header">
          <div className="vehicle-review-card__header-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="vehicle-review-card__icon">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <h4 className="vehicle-review-card__title">Borrower Profile</h4>
          </div>
          <span className="vehicle-review-card__verified-badge">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>
            Verified Profile
          </span>
        </div>
        <div className="vehicle-review-card__rows">
          <ReviewRow label="Applicant Name" value={user?.fullName || data.legalBusinessName || '—'} />
          <ReviewRow label="Mobile" value={user?.mobile || '—'} />
          <ReviewRow label="PAN" value={user?.pan || '—'} />
          <ReviewRow label="Aadhaar" value={user?.aadhaar ? `XXXX-XXXX-${user.aadhaar.slice(-4)}` : '—'} />
        </div>
      </div>

      {/* 2. Vehicle Financing Terms */}
      <div className="vehicle-review-card">
        <div className="vehicle-review-card__header">
          <div className="vehicle-review-card__header-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="vehicle-review-card__icon">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" />
            </svg>
            <h4 className="vehicle-review-card__title">Vehicle Financing Terms</h4>
          </div>
          <EditBtn onClick={() => onNavigateToStep(1)} />
        </div>
        <div className="vehicle-review-card__rows">
          {termsRows.map((r, i) => (
            <ReviewRow key={i} label={r.label} value={r.value} highlight={r.highlight} />
          ))}
        </div>
      </div>

      {/* 3. Employment & Income Profile */}
      <div className="vehicle-review-card">
        <div className="vehicle-review-card__header">
          <div className="vehicle-review-card__header-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="vehicle-review-card__icon">
              <rect width="20" height="14" x="2" y="7" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <h4 className="vehicle-review-card__title">Employment & Income Profile</h4>
          </div>
          <EditBtn onClick={() => onNavigateToStep(2)} />
        </div>
        <div className="vehicle-review-card__rows">
          {employmentRows.map((r, i) => (
            <ReviewRow key={i} label={r.label} value={r.value} />
          ))}
        </div>
      </div>

      {/* 4. Banking & ITR Compliance */}
      <div className="vehicle-review-card">
        <div className="vehicle-review-card__header">
          <div className="vehicle-review-card__header-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="vehicle-review-card__icon">
              <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <h4 className="vehicle-review-card__title">Banking & ITR Compliance</h4>
          </div>
          <EditBtn onClick={() => onNavigateToStep(3)} />
        </div>
        <div className="vehicle-review-card__rows">
          {bankingRows.map((r, i) => (
            <ReviewRow key={i} label={r.label} value={r.value} />
          ))}
        </div>
      </div>

      {/* 5. Uploaded Records */}
      <div className="vehicle-review-card">
        <div className="vehicle-review-card__header">
          <div className="vehicle-review-card__header-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="vehicle-review-card__icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
            </svg>
            <h4 className="vehicle-review-card__title">Uploaded Records ({displayDocEntries.length})</h4>
          </div>
          <EditBtn onClick={() => onNavigateToStep(4)} label="Manage" />
        </div>
        <div className="vehicle-review-docs-list">
          {displayDocEntries.length === 0 ? (
            <p className="vehicle-review-no-docs">
              No documents uploaded yet. Click &quot;Manage&quot; to upload required documents.
            </p>
          ) : (
            displayDocEntries.map(([docId, docObj]) => {
              const docIdStr = String(docId)
              const title = DOC_NAME_MAP[docIdStr] || docIdStr
              const filename = (docObj && typeof docObj === 'object' && 'name' in docObj)
                ? (docObj as { name: string }).name
                : `${docIdStr}.pdf`
              return (
                <div key={docIdStr} className="vehicle-review-doc-row">
                  <div className="vehicle-review-doc-info">
                    <div className="vehicle-review-doc-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="14" height="14"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <div className="vehicle-review-doc-texts">
                      <span className="vehicle-review-doc-name">{title}</span>
                      <span className="vehicle-review-doc-filename">✓ {filename}</span>
                    </div>
                  </div>
                  <button type="button" className="vehicle-review-doc-preview-btn" onClick={() => setPreviewDoc({ name: title })}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    Preview
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* 6. Authorization Declaration */}
      <div className="vehicle-review__declaration">
        <input
          id="vehicle-loan-terms-checkbox"
          type="checkbox"
          className="vehicle-review__checkbox"
          checked={data.termsAccepted}
          onChange={(e) => onChange({ termsAccepted: e.target.checked })}
        />
        <label htmlFor="vehicle-loan-terms-checkbox" className="vehicle-review__label">
          I authorize TaxEdge to evaluate my credit report and share my vehicle purchase details, dealer quotation, and income verification records with partner banks and NBFC auto-financiers for hypothecation sanction.
        </label>
      </div>
      {errors.termsAccepted && (
        <span className="vehicle-field-error" role="alert">{errors.termsAccepted}</span>
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <div className="vehicle-modal-overlay" onClick={() => setPreviewDoc(null)}>
          <div className="vehicle-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="vehicle-modal-header">
              <h3 className="vehicle-modal-title">Document Preview: {previewDoc.name}</h3>
              <button type="button" className="vehicle-modal-close-btn" onClick={() => setPreviewDoc(null)}>✕</button>
            </div>
            <div className="vehicle-review-doc-preview">
              <div className="vehicle-review-doc-preview__icon">📄</div>
              <p className="vehicle-review-doc-preview__name">{previewDoc.name}</p>
              <p className="vehicle-review-doc-preview__desc">Verified document attached to application dossier.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewAndDeclaration
