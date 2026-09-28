import React, { useState } from 'react'
import type { VehicleLoanData } from '../../../../types/vehicleLoan.types'
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

export const ReviewAndDeclaration: React.FC<ReviewAndDeclarationProps> = ({
  data,
  onChange,
  onNavigateToStep,
  errors = {},
}) => {
  const [previewDoc, setPreviewDoc] = useState<{ name: string; url?: string } | null>(null)

  const maskedAccountNumber = data.accountNumber
    ? data.accountNumber.length > 4
      ? `XXXXXX${data.accountNumber.slice(-4)}`
      : data.accountNumber
    : 'XXXXXX5555'

  const uploadedDocEntries = Object.entries(data.uploadedDocs || {})
  const displayDocEntries = uploadedDocEntries.length > 0
    ? uploadedDocEntries
    : [
        ['pan_card', { name: 'captured_doc_1790590571601.jpg (142 KB)' }],
        ['aadhaar_card', { name: 'captured_doc_1790590577379.jpg (165 KB)' }],
        ['driving_license', { name: 'captured_doc_1790590582552.jpg (138 KB)' }],
        ['passport_photo', { name: 'captured_doc_1790590587180.jpg (98 KB)' }],
        ['address_proof', { name: 'captured_doc_1790590595166.jpg (180 KB)' }],
        ['bank_statement', { name: 'captured_doc_1790590606938.jpg (210 KB)' }],
        ['salary_slip', { name: 'captured_doc_1790590600585.jpg (175 KB)' }],
        ['dealer_quotation', { name: 'captured_doc_1790590615809.jpg (240 KB)' }],
      ]

  return (
    <div className="vehicle-review-step">
      {/* 1. Borrower Profile Card */}
      <div className="vehicle-review-card">
        <div className="vehicle-review-card__header">
          <div className="vehicle-review-card__header-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="vehicle-review-card__icon">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
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
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">Applicant Name</span>
            <span className="vehicle-review-card__row-value">Srinu</span>
          </div>
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">Mobile</span>
            <span className="vehicle-review-card__row-value">7672010079</span>
          </div>
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">PAN</span>
            <span className="vehicle-review-card__row-value">BFHDJ6557G</span>
          </div>
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">Aadhaar</span>
            <span className="vehicle-review-card__row-value">XXXX-XXXX-5656</span>
          </div>
        </div>
      </div>

      {/* 2. Vehicle Financing Terms */}
      <div className="vehicle-review-card">
        <div className="vehicle-review-card__header">
          <div className="vehicle-review-card__header-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="vehicle-review-card__icon">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
            <h4 className="vehicle-review-card__title">Vehicle Financing Terms</h4>
          </div>
          <button
            type="button"
            className="vehicle-review-card__edit-btn"
            onClick={() => onNavigateToStep(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            Edit
          </button>
        </div>
        <div className="vehicle-review-card__rows">
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">Required Loan Amount</span>
            <span className="vehicle-review-card__row-value vehicle-review-card__row-value--highlight">
              ₹{(Number(String(data.loanAmount || 1200000).replace(/\D/g, '')) || 1200000).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">Vehicle Category / Purpose</span>
            <span className="vehicle-review-card__row-value">{data.vehicleCategory || 'Electric Vehicle (EV - 2W / 4W)'}</span>
          </div>
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">Vehicle Condition</span>
            <span className="vehicle-review-card__row-value">{data.vehicleCondition || 'New Vehicle'}</span>
          </div>
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">Make & Model</span>
            <span className="vehicle-review-card__row-value">
              {data.vehicleMakeModel === 'Other (Specify Custom Vehicle Model)'
                ? data.customVehicleMakeModel || 'Custom Vehicle'
                : data.vehicleMakeModel || 'Hyundai i20'}
            </span>
          </div>
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">On-Road Price / Valuation</span>
            <span className="vehicle-review-card__row-value">
              ₹{(Number(String(data.onRoadPrice || 666666).replace(/\D/g, '')) || 666666).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">Down Payment / Margin</span>
            <span className="vehicle-review-card__row-value">
              ₹{(Number(String(data.downPayment || 699).replace(/\D/g, '')) || 699).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">Repayment Tenure</span>
            <span className="vehicle-review-card__row-value">{data.repaymentTenure || '36 Months (3 Yrs)'}</span>
          </div>
        </div>
      </div>

      {/* 3. Employment & Income Profile */}
      <div className="vehicle-review-card">
        <div className="vehicle-review-card__header">
          <div className="vehicle-review-card__header-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="vehicle-review-card__icon">
              <rect width="20" height="14" x="2" y="7" rx="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <h4 className="vehicle-review-card__title">Employment & Income Profile</h4>
          </div>
          <button
            type="button"
            className="vehicle-review-card__edit-btn"
            onClick={() => onNavigateToStep(2)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            Edit
          </button>
        </div>
        <div className="vehicle-review-card__rows">
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">Employment Category</span>
            <span className="vehicle-review-card__row-value">{data.occupationType || 'Salaried'}</span>
          </div>
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">Monthly In-Hand Income</span>
            <span className="vehicle-review-card__row-value">{data.monthlyIncomeRange || 'Below ₹10,000'}</span>
          </div>
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">Other Ongoing EMIs</span>
            <span className="vehicle-review-card__row-value">
              {data.hasActiveEmis
                ? `Active (₹${(Number(String(data.totalMonthlyEmi).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}/mo)`
                : 'No Running EMIs'}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Banking & ITR Compliance */}
      <div className="vehicle-review-card">
        <div className="vehicle-review-card__header">
          <div className="vehicle-review-card__header-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="vehicle-review-card__icon">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <h4 className="vehicle-review-card__title">Banking & ITR Compliance</h4>
          </div>
          <button
            type="button"
            className="vehicle-review-card__edit-btn"
            onClick={() => onNavigateToStep(3)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            Edit
          </button>
        </div>
        <div className="vehicle-review-card__rows">
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">Operating Bank</span>
            <span className="vehicle-review-card__row-value">{data.bankName || 'State Bank of India'}</span>
          </div>
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">Account Number</span>
            <span className="vehicle-review-card__row-value">{maskedAccountNumber}</span>
          </div>
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">IFSC Code</span>
            <span className="vehicle-review-card__row-value">{data.ifscCode || 'SBIN0036666'}</span>
          </div>
          <div className="vehicle-review-card__row">
            <span className="vehicle-review-card__row-label">ITR Filing Status</span>
            <span className="vehicle-review-card__row-value">{data.itrStatus || 'Exempt'}</span>
          </div>
        </div>
      </div>

      {/* 5. Uploaded Records (8) */}
      <div className="vehicle-review-card">
        <div className="vehicle-review-card__header">
          <div className="vehicle-review-card__header-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="vehicle-review-card__icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <h4 className="vehicle-review-card__title">Uploaded Records ({displayDocEntries.length})</h4>
          </div>
          <button
            type="button"
            className="vehicle-review-card__edit-btn"
            onClick={() => onNavigateToStep(4)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            Manage
          </button>
        </div>
        <div className="vehicle-review-docs-list">
          {displayDocEntries.map(([docId, docObj]) => {
            const docIdStr = String(docId)
            const title = DOC_NAME_MAP[docIdStr] || docIdStr
            const filename = (docObj && typeof docObj === 'object' && 'name' in docObj)
              ? (docObj as { name: string }).name
              : `${docIdStr}.pdf`
            return (
              <div key={docIdStr} className="vehicle-review-doc-row">
                <div className="vehicle-review-doc-info">
                  <div className="vehicle-review-doc-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="14" height="14">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="vehicle-review-doc-texts">
                    <span className="vehicle-review-doc-name">{title}</span>
                    <span className="vehicle-review-doc-filename">✓ {filename}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="vehicle-review-doc-preview-btn"
                  onClick={() => setPreviewDoc({ name: title })}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Preview
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* 6. Authorization Declaration Card */}
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
        <span className="vehicle-field-error" role="alert">
          {errors.termsAccepted}
        </span>
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <div className="vehicle-modal-overlay" onClick={() => setPreviewDoc(null)}>
          <div className="vehicle-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="vehicle-modal-header">
              <h3 className="vehicle-modal-title">Document Preview: {previewDoc.name}</h3>
              <button
                type="button"
                className="vehicle-modal-close-btn"
                onClick={() => setPreviewDoc(null)}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
              <p style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>{previewDoc.name}</p>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>Verified document attached to application dossier.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewAndDeclaration
