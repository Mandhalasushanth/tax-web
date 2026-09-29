import React from 'react'
import { DocumentSection, UploadDocument } from '@shared/components'
import { loanDocumentService } from '../../../../documents/loanDocumentService'
import type { LoanDocumentDefinition } from '../../../../documents/loanDocument.types'
import type { MsmeLoanData } from '../../../../types/msmeLoan.types'
import './MsmeDocuments.css'

export interface MsmeDocumentsProps {
  data: MsmeLoanData
  onChange: (fields: Partial<MsmeLoanData>) => void
  errors?: Record<string, string>
}

const IDENTITY_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'pan_card',
    title: 'PAN Card',
    subtitle: 'Entity PAN card and Proprietor / Director PAN card copy',
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
    title: 'Aadhaar / KYC Document',
    subtitle: 'Aadhaar of proprietor, partners, or all primary directors',
    isRequired: true,
    category: 'identity',
    iconBg: '#f3e8ff',
    iconColor: '#9333ea',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

const INCOME_BANKING_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'bank_statement',
    title: 'Bank Statement (12 months)',
    subtitle: 'Last 12 months primary operating current account statement',
    isRequired: true,
    category: 'income',
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="16" y2="14" />
      </svg>
    ),
  },
  {
    id: 'itr_acknowledgement',
    title: 'ITR Acknowledgement',
    subtitle: 'Last 2 years ITR acknowledgement with computation (optional)',
    isRequired: false,
    category: 'income',
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
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
    id: 'balance_sheet',
    title: 'Balance Sheet / P&L',
    subtitle: 'Audited or CA-certified balance sheet (optional, enhances creditworthiness)',
    isRequired: false,
    category: 'income',
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
]

const BUSINESS_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'gst_returns',
    title: 'GST Returns (3 months)',
    subtitle: 'Last 3 months GSTR-3B summary or GST portal print',
    isRequired: true,
    category: 'business',
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    id: 'udyam_certificate',
    title: 'Udyam Registration Certificate',
    subtitle: 'If registered under Udyam portal — greatly improves eligibility',
    isRequired: false,
    category: 'business',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 'business_reg_proof',
    title: 'Business Registration Proof',
    subtitle: 'MOA/AOA, Partnership Deed, or Proprietorship Registration (optional)',
    isRequired: false,
    category: 'business',
    iconBg: '#f1f5f9',
    iconColor: '#475569',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
]

export const MsmeDocuments: React.FC<MsmeDocumentsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const uploadedDocs = data.uploadedDocs || {}

  const handleUpload = (id: string, file: File) => {
    try {
      const entry = loanDocumentService.createDocumentEntry(id, file)
      onChange({ uploadedDocs: { ...uploadedDocs, [id]: entry } })
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

  const renderDocCard = (doc: LoanDocumentDefinition) => {
    const uploaded = uploadedDocs[doc.id]
    const isMissingRequired = !uploaded && Boolean(errors[doc.id])
    const showOptionalBadge = !doc.isRequired && !doc.hideOptionalBadge && doc.badgeLabel !== ''
    const badge = showOptionalBadge ? (
      <span className="loan-doc-item__badge loan-doc-item__badge--optional">
        {doc.badgeLabel || 'Optional'}
      </span>
    ) : isMissingRequired ? (
      <span className="loan-doc-item__badge loan-doc-item__badge--error">
        Required Document Missing
      </span>
    ) : undefined

    return (
      <UploadDocument
        key={doc.id}
        id={doc.id}
        title={doc.title}
        subtitle={doc.subtitle}
        isRequired={doc.isRequired}
        badge={badge}
        isUploaded={Boolean(uploaded)}
        fileName={uploaded?.name}
        fileSize={uploaded?.size}
        file={uploaded?.file}
        icon={doc.icon}
        iconBg={doc.iconBg || '#eff6ff'}
        iconColor={doc.iconColor || '#2563eb'}
        className={isMissingRequired ? 'loan-doc-item--error' : ''}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />
    )
  }

  return (
    <div className="msme-documents-step">
      <DocumentSection title="IDENTITY & KYC">
        {IDENTITY_DOCS.map(renderDocCard)}
      </DocumentSection>
      <DocumentSection title="INCOME & BANKING">
        {INCOME_BANKING_DOCS.map(renderDocCard)}
      </DocumentSection>
      <DocumentSection title="BUSINESS & TAX">
        {BUSINESS_DOCS.map(renderDocCard)}
      </DocumentSection>
    </div>
  )
}

export default MsmeDocuments
