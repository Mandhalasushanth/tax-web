import React from 'react'
import { DocumentSection, UploadDocument } from '@shared/components'
import { loanDocumentService, createDocDef } from '@modules/loans/documents'
import type { LoanDocumentDefinition } from '@modules/loans/documents/loanDocument.types'
import type { WorkingCapitalLoanData } from '@modules/loans/types/workingCapitalLoan.types'
import './Documents.css'

export interface DocumentsProps {
  data: WorkingCapitalLoanData
  onChange: (fields: Partial<WorkingCapitalLoanData>) => void
  errors?: Record<string, string>
}

const CardIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

const FileIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

const StatementIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="16" y2="14" />
  </svg>
)

const doc = (id: string, title: string, subtitle: string, category: string, icon: React.ReactNode, isRequired = true) =>
  createDocDef(id, title, subtitle, category, icon, isRequired, { iconBg: '#eff6ff', iconColor: '#2563eb' })

const IDENTITY_DOCS: LoanDocumentDefinition[] = [
  doc('pan_card', 'PAN Card', 'Entity PAN card & Promoter/Director PAN card', 'identity', CardIcon),
  doc('aadhaar_card', 'Aadhaar Card', 'Aadhaar of all Primary Directors / Partners', 'identity', CardIcon),
  doc('kyc_directors', 'KYC of Directors / Partners', 'PAN, Aadhaar, DIN and Passport photo of all Directors / Partners', 'identity', FileIcon),
]

const INCOME_BANKING_DOCS: LoanDocumentDefinition[] = [
  doc('bank_statement', 'Current Account Bank Statements', 'Last 12 months continuous bank statements', 'income', StatementIcon),
]

const BUSINESS_TAX_DOCS: LoanDocumentDefinition[] = [
  doc('gst_certificate', 'GST Certificate (REG-06)', 'GST registration certificate with all annexures', 'business', FileIcon),
  doc('gst_returns', 'GST Returns (12 Months)', 'Filed GSTR-3B & GSTR-1 returns for last 12 months', 'business', FileIcon),
  doc('business_itr', 'Business ITR (Last 2-3 Years)', 'ITR-V and computation for the last 3 assessment years', 'business', FileIcon),
  doc('audited_balance_sheet', 'Audited Balance Sheet', 'CA audited balance sheet for last 2-3 financial years', 'business', FileIcon),
  doc('profit_loss_statement', 'Profit & Loss Statement', 'CA certified / audited P&L statement with schedules', 'business', FileIcon),
  doc('udyam_certificate', 'Udyam Registration Certificate', 'MSME registration certificate (for MSME priority lending benefits)', 'business', FileIcon, false),
  doc('business_reg_proof', 'Business Registration Proof', 'COI, MOA/AOA, Partnership Deed, or Trade License', 'business', FileIcon),
]

const COLLATERAL_DOCS: LoanDocumentDefinition[] = [
  doc('existing_loan_sanction', 'Existing Loan Sanction Letters', 'Sanction letters and latest 6-month repayment track record', 'collateral', FileIcon, false),
]

export const Documents: React.FC<DocumentsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const uploadedDocs = data.uploadedDocs || {}

  const handleUpload = (id: string, file: File) => {
    const entry = loanDocumentService.createDocumentEntry(id, file)
    onChange({ uploadedDocs: { ...uploadedDocs, [id]: entry } })
  }

  const handleRemove = (id: string) => {
    const next = { ...uploadedDocs }
    delete next[id]
    onChange({ uploadedDocs: next })
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
    <div className="working-capital-documents-step">
      <DocumentSection title="IDENTITY & ADDRESS">
        {IDENTITY_DOCS.map(renderDocCard)}
      </DocumentSection>
      <DocumentSection title="INCOME & BANKING">
        {INCOME_BANKING_DOCS.map(renderDocCard)}
      </DocumentSection>
      <DocumentSection title="BUSINESS & TAX">
        {BUSINESS_TAX_DOCS.map(renderDocCard)}
      </DocumentSection>
      <DocumentSection title="COLLATERAL & OTHERS">
        {COLLATERAL_DOCS.map(renderDocCard)}
      </DocumentSection>
    </div>
  )
}

export default Documents
