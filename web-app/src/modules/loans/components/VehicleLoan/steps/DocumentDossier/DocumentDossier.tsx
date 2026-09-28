import React from 'react'
import { LoanDocumentSection } from '../../../../components/LoanDocumentSection/LoanDocumentSection'
import { loanDocumentService } from '../../../../documents/loanDocumentService'
import type { LoanDocumentDefinition } from '../../../../documents/loanDocument.types'
import type { VehicleLoanData } from '../../../../types/vehicleLoan.types'
import './DocumentDossier.css'

export interface DocumentDossierProps {
  data: VehicleLoanData
  onChange: (fields: Partial<VehicleLoanData>) => void
  errors?: Record<string, string>
}

const SECTION_ICON_IDENTITY = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vehicle-docs__section-icon">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const SECTION_ICON_INCOME = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vehicle-docs__section-icon">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

const SECTION_ICON_VEHICLE = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vehicle-docs__section-icon">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
)

// 1. IDENTITY & ADDRESS (5 items)
const IDENTITY_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'pan_card',
    title: 'PAN Card',
    subtitle: 'Clear photo or PDF copy of applicant PAN',
    isRequired: true,
    category: 'identity',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    id: 'aadhaar_card',
    title: 'Aadhaar Card',
    subtitle: 'Front & back copy with readable QR code',
    isRequired: true,
    category: 'identity',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'driving_license',
    title: 'Driving License',
    subtitle: 'Valid driver license (mandatory auto loan KYC)',
    isRequired: true,
    category: 'identity',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <circle cx="7" cy="12" r="2" />
        <path d="M13 10h4M13 14h4" />
      </svg>
    ),
  },
  {
    id: 'passport_photo',
    title: 'Passport Size Photograph',
    subtitle: 'Recent passport photo of applicant',
    isRequired: true,
    category: 'identity',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    id: 'address_proof',
    title: 'Address Proof',
    subtitle: 'Utility bill / Rent Agreement / Voter ID',
    isRequired: true,
    category: 'identity',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
]

// 2. INCOME & BANKING (3 items)
const INCOME_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'bank_statement',
    title: 'Bank Statements (6-12 Months)',
    subtitle: 'Continuous bank statement of salary / primary account in PDF',
    isRequired: true,
    category: 'income',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    id: 'salary_slip',
    title: 'Salary Slips / Income Proof',
    subtitle: 'Last 3-6 months payslips or business income statement',
    isRequired: true,
    category: 'income',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    id: 'form16_itr',
    title: 'Form 16 / ITR & Computation (2 Years)',
    subtitle: 'Latest 2 assessment years tax returns or Form 16 Part A & B',
    isRequired: false,
    category: 'income',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
]

// 3. VEHICLE QUOTATION & COLLATERAL (3 items)
const VEHICLE_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'dealer_quotation',
    title: 'Dealer Proforma Invoice / Quotation',
    subtitle: 'Official quotation with on-road price breakup from dealer',
    isRequired: true,
    category: 'property',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    id: 'vehicle_rc',
    title: 'Vehicle RC Copy (For Used Vehicle)',
    subtitle: 'Registration Certificate (front & back) if pre-owned vehicle',
    isRequired: false,
    category: 'property',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'down_payment_receipt',
    title: 'Down Payment / Margin Money Receipt',
    subtitle: 'Booking receipt or token advance paid to dealer',
    isRequired: false,
    category: 'property',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="12" x="2" y="6" rx="2" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
]

// 8 total countable required docs
const REQUIRED_DOC_IDS = [
  'pan_card',
  'aadhaar_card',
  'driving_license',
  'passport_photo',
  'address_proof',
  'bank_statement',
  'salary_slip',
  'dealer_quotation',
]

export const DocumentDossier: React.FC<DocumentDossierProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const uploadedDocs = data.uploadedDocs || {}
  const requiredUploadedCount = REQUIRED_DOC_IDS.filter((id) => Boolean(uploadedDocs[id])).length
  const totalRequiredDocs = REQUIRED_DOC_IDS.length
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

  return (
    <div className="vehicle-doc-dossier-step">
      {/* 1. Document Checklist Progress */}
      <div className="vehicle-docs__progress-card">
        <div className="vehicle-docs__progress-header">
          <span className="vehicle-docs__progress-title">Document Checklist Progress</span>
          <span className="vehicle-docs__progress-count">
            {requiredUploadedCount} of {totalRequiredDocs} ({progressPercent}%)
          </span>
        </div>
        <div className="vehicle-docs__progress-track">
          <div
            className="vehicle-docs__progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="vehicle-docs__supported-formats">
          Supported formats: PDF, JPG, PNG, Word (.docx), Excel (.xlsx) • Max 10MB per file
        </span>
      </div>

      {/* 2. IDENTITY & ADDRESS Section */}
      <LoanDocumentSection
        title="IDENTITY & ADDRESS"
        icon={SECTION_ICON_IDENTITY}
        documents={IDENTITY_DOCS}
        uploadedDocs={uploadedDocs}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />

      {/* 3. INCOME & BANKING Section */}
      <LoanDocumentSection
        title="INCOME & BANKING"
        icon={SECTION_ICON_INCOME}
        documents={INCOME_DOCS}
        uploadedDocs={uploadedDocs}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />

      {/* 4. VEHICLE QUOTATION & COLLATERAL Section */}
      <LoanDocumentSection
        title="VEHICLE QUOTATION & COLLATERAL"
        icon={SECTION_ICON_VEHICLE}
        documents={VEHICLE_DOCS}
        uploadedDocs={uploadedDocs}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default DocumentDossier
