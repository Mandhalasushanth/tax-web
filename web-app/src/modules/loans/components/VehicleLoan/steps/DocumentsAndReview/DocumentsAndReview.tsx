import React from 'react'
import { LoanDocumentSection } from '../../../../components/LoanDocumentSection/LoanDocumentSection'
import { LoanReviewSection } from '../../../../components/LoanReviewSection/LoanReviewSection'
import { loanDocumentService } from '../../../../documents/loanDocumentService'
import type { LoanDocumentDefinition } from '../../../../documents/loanDocument.types'
import type { VehicleLoanData } from '../../../../types/vehicleLoan.types'
import './DocumentsAndReview.css'

export interface DocumentsAndReviewProps {
  data: VehicleLoanData
  onChange: (fields: Partial<VehicleLoanData>) => void
  onNavigateToStep: (stepNumber: number) => void
  errors?: Record<string, string>
}

const SECTION_ICON_IDENTITY = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

const SECTION_ICON_INCOME = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const SECTION_ICON_VEHICLE = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
)

const IDENTITY_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'pan_card',
    title: 'PAN Card',
    subtitle: 'Clear front photo / copy of PAN card',
    isRequired: true,
    category: 'identity',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    id: 'aadhaar_card',
    title: 'Aadhaar / Address Proof',
    subtitle: 'Aadhaar Card (front & back) / Voter ID / Passport',
    isRequired: true,
    category: 'identity',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

const INCOME_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'bank_statement',
    title: 'Bank Statement (Last 6 Months)',
    subtitle: 'Primary salary or business banking account statement',
    isRequired: true,
    category: 'income',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="12" x="2" y="6" rx="2" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: 'salary_slip',
    title: 'Salary Slips / Income Proof',
    subtitle: 'Latest 3 months salary slips or Form 16 / ITR copy',
    isRequired: false,
    category: 'income',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
]

const VEHICLE_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'vehicle_quotation',
    title: 'Vehicle Proforma / Quotation',
    subtitle: 'Dealer proforma invoice or RC copy (for used vehicle)',
    isRequired: false,
    category: 'property',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
]

const ALL_REQUIRED_DOC_IDS = ['pan_card', 'aadhaar_card', 'bank_statement']

export const DocumentsAndReview: React.FC<DocumentsAndReviewProps> = ({
  data,
  onChange,
  onNavigateToStep,
  errors = {},
}) => {
  const uploadedDocs = data.uploadedDocs || {}
  const requiredUploadedCount = ALL_REQUIRED_DOC_IDS.filter((id) => Boolean(uploadedDocs[id])).length
  const totalRequiredDocs = ALL_REQUIRED_DOC_IDS.length
  const progressPercent = Math.round((requiredUploadedCount / totalRequiredDocs) * 100)

  const handleUpload = (id: string, file: File) => {
    try {
      const entry = loanDocumentService.createDocumentEntry(id, file)
      onChange({
        uploadedDocs: {
          ...uploadedDocs,
          [id]: entry,
        },
      })
    } catch {
      // Fallback
    }
  }

  const handleRemove = (id: string) => {
    try {
      const next = { ...uploadedDocs }
      delete next[id]
      onChange({ uploadedDocs: next })
    } catch {
      // Fallback
    }
  }

  const maskedAccountNumber = data.accountNumber
    ? data.accountNumber.length > 4
      ? `XXXXXX${data.accountNumber.slice(-4)}`
      : data.accountNumber
    : 'Not specified'

  return (
    <div className="vehicle-loan-docs-review">
      {/* 1. Required Documents Header */}
      <div className="vehicle-loan-section-heading">
        <h3 className="vehicle-loan-section-heading__title">Required Documents</h3>
        <p className="vehicle-loan-section-heading__desc">
          Upload KYC, banking statements, and dealer vehicle quotations to expedite sanction.
        </p>
      </div>

      {/* Progress Card */}
      <div className="vehicle-loan-docs__progress-card">
        <div className="vehicle-loan-docs__progress-header">
          <span className="vehicle-loan-docs__progress-title">Required documents</span>
          <span className="vehicle-loan-docs__progress-count">
            {requiredUploadedCount} / {totalRequiredDocs} ({progressPercent}%)
          </span>
        </div>
        <div className="vehicle-loan-docs__progress-track">
          <div
            className="vehicle-loan-docs__progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Document Sections */}
      <LoanDocumentSection
        title="IDENTITY & ADDRESS"
        icon={SECTION_ICON_IDENTITY}
        documents={IDENTITY_DOCS}
        uploadedDocs={uploadedDocs}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />

      <LoanDocumentSection
        title="INCOME & BANKING"
        icon={SECTION_ICON_INCOME}
        documents={INCOME_DOCS}
        uploadedDocs={uploadedDocs}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />

      <LoanDocumentSection
        title="VEHICLE & DEALER RECORDS"
        icon={SECTION_ICON_VEHICLE}
        documents={VEHICLE_DOCS}
        uploadedDocs={uploadedDocs}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />

      {/* 2. Vehicle Loan Dossier Review */}
      <div className="vehicle-loan-section-heading" style={{ marginTop: '1.5rem' }}>
        <h3 className="vehicle-loan-section-heading__title">Vehicle Loan Dossier Review</h3>
        <p className="vehicle-loan-section-heading__desc">
          Review vehicle requirements, applicant details, and banking disbursement profile.
        </p>
      </div>

      <div className="vehicle-loan-review-group">
        {/* Vehicle & Loan Requirements Review */}
        <LoanReviewSection
          title="Vehicle & Loan Requirements"
          onEdit={() => onNavigateToStep(1)}
          items={[
            {
              label: 'Loan Amount',
              value: data.loanAmount
                ? `₹${(Number(String(data.loanAmount).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}`
                : 'Not specified',
            },
            { label: 'Category', value: data.vehicleCategory || 'Not specified' },
            { label: 'Condition', value: data.vehicleCondition || 'Not specified' },
            { label: 'Make & Model', value: data.vehicleMakeModel || 'Not specified' },
            {
              label: 'On-Road Price',
              value: data.onRoadPrice
                ? `₹${(Number(String(data.onRoadPrice).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}`
                : 'Not specified',
            },
            {
              label: 'Down Payment',
              value: data.downPayment
                ? `₹${(Number(String(data.downPayment).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}`
                : 'Not specified',
            },
            { label: 'Tenure', value: data.repaymentTenure || 'Not specified' },
          ]}
        />

        {/* Applicant Profile Review */}
        <LoanReviewSection
          title="Applicant & Employment"
          onEdit={() => onNavigateToStep(2)}
          items={[
            { label: 'Full Name', value: data.fullName || 'Not specified' },
            { label: 'Mobile', value: data.mobileNumber || 'Not specified' },
            { label: 'PAN', value: data.panNumber || 'Not specified' },
            { label: 'Employment', value: data.employmentType || 'Not specified' },
            {
              label: 'Net Monthly Income',
              value: data.monthlyNetIncome
                ? `₹${(Number(String(data.monthlyNetIncome).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}`
                : 'Not specified',
            },
            { label: 'City', value: data.city || 'Not specified' },
          ]}
        />

        {/* Banking Review */}
        <LoanReviewSection
          title="Disbursement Banking"
          onEdit={() => onNavigateToStep(3)}
          items={[
            { label: 'Bank Name', value: data.bankName || 'Not specified' },
            { label: 'Account Number', value: maskedAccountNumber },
            { label: 'IFSC Code', value: data.ifscCode || '—' },
          ]}
        />
      </div>

      {/* 3. Authorization Declaration */}
      <div className="vehicle-loan-review__declaration">
        <input
          id="vehicle-loan-terms-checkbox"
          type="checkbox"
          className="vehicle-loan-review__checkbox"
          checked={data.termsAccepted}
          onChange={(e) => onChange({ termsAccepted: e.target.checked })}
        />
        <label htmlFor="vehicle-loan-terms-checkbox" className="vehicle-loan-review__label">
          I authorize TaxEdge and its lending partners to check credit bureau scores (CIBIL/Experian), verify my vehicle documentation, and process this Vehicle Loan application.
        </label>
      </div>
      {errors.termsAccepted && (
        <span className="vehicle-loan-field-error" role="alert">
          {errors.termsAccepted}
        </span>
      )}
    </div>
  )
}

export default DocumentsAndReview
