import React from 'react'
import { LoanDocumentSection } from '../../../../components/LoanDocumentSection/LoanDocumentSection'
import { loanDocumentService } from '../../../../documents/loanDocumentService'
import type { LoanDocumentDefinition } from '../../../../documents/loanDocument.types'
import type { HomeLoanData } from '../../types/homeLoan.types'
import './Documents.css'

export interface DocumentsProps {
  formData?: HomeLoanData
  updateFormData?: (fields: Partial<HomeLoanData>) => void
  data?: HomeLoanData
  onChange?: (fields: Partial<HomeLoanData>) => void
  errors?: Record<string, string>
}

const ID_SECTION_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="home-loan-docs__section-icon">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const WALLET_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="home-loan-docs__section-icon">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
)

const HOUSE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="home-loan-docs__section-icon">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const IDENTITY_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'pan_card',
    title: 'PAN Card',
    subtitle: 'Clear photo or PDF copy of PAN card.',
    isRequired: true,
    category: 'identity',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="7" y1="15" x2="7.01" y2="15" />
        <line x1="11" y1="15" x2="13" y2="15" />
      </svg>
    ),
  },
  {
    id: 'aadhaar_card',
    title: 'Aadhaar Card',
    subtitle: 'Front & Back copy with readable QR code.',
    isRequired: true,
    category: 'identity',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
  },
  {
    id: 'address_proof',
    title: 'Address Proof',
    subtitle: 'Utility bill / Rent Agreement (not older than 3 months).',
    isRequired: true,
    category: 'identity',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: 'passport_photo',
    title: 'Passport Size Photograph',
    subtitle: 'Recent color photo of the applicant.',
    isRequired: true,
    category: 'identity',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

const INCOME_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'bank_statements',
    title: 'Bank Statements (6-12 Months)',
    subtitle: 'Continuous bank statement of salary/primary account',
    isRequired: true,
    category: 'income',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'salary_slips',
    title: 'Salary Slips / Income Proof',
    subtitle: 'Last 3-6 months payslips or business income statement',
    isRequired: true,
    category: 'income',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="12" y2="14" />
        <path d="M8 18h8" />
      </svg>
    ),
  },
  {
    id: 'form_16_itr',
    title: 'Form 16 / ITR & Computation (2 Years)',
    subtitle: 'Latest 2 assessment years tax returns or Form 16 Part A & B',
    isRequired: true,
    category: 'income',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
]

const PROPERTY_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'agreement_to_sell',
    title: 'Agreement to Sell / Allotment Letter',
    subtitle: 'Executed BBA, Allotment Letter or Agreement to Sell copy',
    isRequired: true,
    category: 'property',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
  },
  {
    id: 'building_plan',
    title: 'Approved Building Plan & Sanction Map',
    subtitle: 'Municipal / RERA sanctioned building plan and NOC',
    isRequired: true,
    category: 'property',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    id: 'title_deed',
    title: 'Title Deed / Chain of Deeds',
    subtitle: 'Prior title documents, mother deed or link documents',
    isRequired: true,
    category: 'property',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7.5" cy="15.5" r="5.5" />
        <path d="m21 2-9.6 9.6" />
        <path d="m15.5 7.5 3 3L22 7l-3-3" />
      </svg>
    ),
  },
  {
    id: 'encumbrance_cert',
    title: 'Encumbrance Certificate & Tax Receipts',
    subtitle: 'Form 15/16 EC and latest property tax paid receipt',
    isRequired: false,
    category: 'property',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <circle cx="12" cy="14" r="3" />
        <path d="m14 16.5 1.5 2.5-2-.5-2 .5 1.5-2.5" />
      </svg>
    ),
  },
  {
    id: 'down_payment_proof',
    title: 'Own Contribution / Down Payment Proof',
    subtitle: 'Bank debits / Builder receipts of customer margin paid',
    isRequired: false,
    category: 'property',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="12" x="2" y="6" rx="2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M6 12h.01M18 12h.01" />
      </svg>
    ),
  },
]

const ALL_DOCS = [...IDENTITY_DOCS, ...INCOME_DOCS, ...PROPERTY_DOCS]

export const Documents: React.FC<DocumentsProps> = ({
  data,
  onChange,
  formData,
  updateFormData,
  errors = {},
}) => {
  const currentData = formData || data || ({ uploadedDocs: {} } as HomeLoanData)
  const updateData = updateFormData || onChange || (() => {})
  const uploadedCount = Object.keys(currentData.uploadedDocs || {}).length
  const totalDocs = ALL_DOCS.length
  const progressPercent = totalDocs > 0 ? Math.round((uploadedCount / totalDocs) * 100) : 0
  const hasDocErrors = Object.keys(errors).length > 0

  const handleUpload = (id: string, file: File) => {
    const entry = loanDocumentService.createDocumentEntry(id, file)
    updateData({
      uploadedDocs: {
        ...currentData.uploadedDocs,
        [id]: entry,
      },
    })
  }

  const handleRemove = (id: string) => {
    const next = { ...currentData.uploadedDocs }
    delete next[id]
    updateData({ uploadedDocs: next })
  }

  return (
    <div className="home-loan-docs">
      {hasDocErrors && (
        <div className="home-loan-docs__error-banner" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="home-loan-docs__error-icon">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <strong>Mandatory Documents Missing:</strong>
            <p className="home-loan-docs__error-desc">
              Please upload all required documents marked with red star (<span className="home-loan-docs__required-star">*</span>) before proceeding to review.
            </p>
          </div>
        </div>
      )}

      <div className="home-loan-docs__progress-card">
        <div className="home-loan-docs__progress-header">
          <span className="home-loan-docs__progress-title">Document Checklist Progress</span>
          <span className="home-loan-docs__progress-count">
            {uploadedCount} of {totalDocs} ({progressPercent}%)
          </span>
        </div>
        <div className="home-loan-docs__progress-track">
          <div
            className="home-loan-docs__progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="home-loan-docs__progress-subtitle">
          Supported formats: PDF, JPG, PNG, Word (.docx), Excel (.xlsx) · Max 10MB per file
        </p>
      </div>

      <LoanDocumentSection
        title="IDENTITY & ADDRESS"
        icon={ID_SECTION_ICON}
        documents={IDENTITY_DOCS}
        uploadedDocs={currentData.uploadedDocs || {}}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />

      <LoanDocumentSection
        title="INCOME & BANKING"
        icon={WALLET_ICON}
        documents={INCOME_DOCS}
        uploadedDocs={currentData.uploadedDocs || {}}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />

      <LoanDocumentSection
        title="PROPERTY & COLLATERAL"
        icon={HOUSE_ICON}
        documents={PROPERTY_DOCS}
        uploadedDocs={currentData.uploadedDocs || {}}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default Documents
