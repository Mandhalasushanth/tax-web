import React from 'react'
import { LoanDocumentGrid } from '@modules/loans/shared'
import { DocumentSection, UploadDocument } from '@shared/components'
import type { PropertyLoanStepProps } from '@modules/loans/types/propertyLoan.types'
import { loanDocumentService, createDocDef } from '@modules/loans/documents'
import type { LoanDocumentDefinition } from '@modules/loans/documents/loanDocument.types'
import './Documents.css'

const doc = (
  id: string,
  title: string,
  subtitle: string,
  category: string,
  icon: React.ReactNode,
  isRequired = true,
  options?: { iconBg?: string; iconColor?: string }
) =>
  createDocDef(id, title, subtitle, category, icon, isRequired, options)

const CreditCardIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

const FingerprintIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const UsersIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const BankStatementIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="16" y2="14" />
  </svg>
)

const FileIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

const CertificateIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

const ChartTrendIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

const BriefcaseIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

const FolderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
  </svg>
)

const IDENTITY_DOCS: LoanDocumentDefinition[] = [
  doc('pan_card', 'PAN Card', 'Entity PAN card & Promoter/Director PAN card', 'identity', CreditCardIcon, true, { iconBg: '#e0f2fe', iconColor: '#0284c7' }),
  doc('aadhaar_card', 'Aadhaar Card', 'Aadhaar of all Primary Directors / Partners / Proprietor', 'identity', FingerprintIcon, true, { iconBg: '#f3e8ff', iconColor: '#9333ea' }),
  doc('kyc_directors', 'KYC of Directors / Partners', 'PAN, Aadhaar, DIN and Passport photo of all partners', 'identity', UsersIcon, true, { iconBg: '#eff6ff', iconColor: '#2563eb' }),
]

const INCOME_DOCS: LoanDocumentDefinition[] = [
  doc('bank_statement', 'Current Account Bank Statements', 'Last 12 months continuous bank statements in PDF', 'income', BankStatementIcon, true, { iconBg: '#fef3c7', iconColor: '#d97706' }),
]

const BUSINESS_TAX_DOCS: LoanDocumentDefinition[] = [
  doc('gst_certificate', 'GST Certificate (REG-06)', 'GST registration certificate with all annexures', 'business', CertificateIcon, true, { iconBg: '#dcfce7', iconColor: '#16a34a' }),
  doc('gst_returns', 'GST Returns (12 Months)', 'Filed GSTR-3B & GSTR-1 returns for last 12 months', 'business', ChartTrendIcon, true, { iconBg: '#fef3c7', iconColor: '#d97706' }),
  doc('business_itr', 'Business ITR (Last 2-3 Years)', 'ITR-V and computation for the last 3 assessment years', 'business', FileIcon, true, { iconBg: '#eff6ff', iconColor: '#2563eb' }),
  doc('audited_balance_sheet', 'Audited Balance Sheet', 'CA audited balance sheet for last 2-3 financial years', 'business', FileIcon, true, { iconBg: '#fee2e2', iconColor: '#dc2626' }),
  doc('profit_loss_statement', 'Profit & Loss Statement', 'CA certified / audited P&L statement with schedules', 'business', ChartTrendIcon, true, { iconBg: '#dcfce7', iconColor: '#16a34a' }),
  doc('udyam_certificate', 'Udyam Registration Certificate', 'MSME registration certificate (for MSME priority)', 'business', CertificateIcon, false, { iconBg: '#e0f2fe', iconColor: '#0284c7' }),
  doc('business_reg_proof', 'Business Registration Proof', 'COI, MOA/AOA, Partnership Deed, or Trade License', 'business', BriefcaseIcon, true, { iconBg: '#f3e8ff', iconColor: '#9333ea' }),
]

const COLLATERAL_DOCS: LoanDocumentDefinition[] = [
  doc('existing_loan_sanction', 'Existing Loan Sanction Letters', 'Sanction letters and latest 6-month repayment track', 'collateral', FolderIcon, false, { iconBg: '#f1f5f9', iconColor: '#475569' }),
]

const MANDATORY_DOCS = [
  ...IDENTITY_DOCS.filter(d => d.isRequired),
  ...INCOME_DOCS.filter(d => d.isRequired),
  ...BUSINESS_TAX_DOCS.filter(d => d.isRequired),
  ...COLLATERAL_DOCS.filter(d => d.isRequired),
]

export const Documents: React.FC<PropertyLoanStepProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const uploadedDocs = data.uploadedDocs || {}
  const totalMandatory = MANDATORY_DOCS.length // 10
  const uploadedMandatoryCount = MANDATORY_DOCS.filter(d => Boolean(uploadedDocs[d.id])).length
  const progressPercent = Math.round((uploadedMandatoryCount / totalMandatory) * 100)

  const handleUpload = (id: string, file: File) => {
    if (!loanDocumentService.acceptFile(file)) return
    const entry = loanDocumentService.createDocumentEntry(id, file)
    onChange({ uploadedDocs: { ...uploadedDocs, [id]: entry } })
  }

  const handleRemove = (id: string) => {
    const next = { ...uploadedDocs }
    delete next[id]
    onChange({ uploadedDocs: next })
  }

  const renderDocCard = (docDef: LoanDocumentDefinition) => {
    const uploaded = uploadedDocs[docDef.id]
    const isMissingRequired = !uploaded && Boolean(errors[docDef.id])
    const badge = isMissingRequired ? (
      <span className="loan-doc-item__badge loan-doc-item__badge--error">
        Required Document Missing
      </span>
    ) : undefined

    return (
      <UploadDocument
        key={docDef.id}
        id={docDef.id}
        title={docDef.title}
        subtitle={docDef.subtitle}
        isRequired={docDef.isRequired}
        badge={badge}
        isUploaded={Boolean(uploaded)}
        fileName={uploaded?.name}
        fileSize={uploaded?.size}
        file={uploaded?.file}
        icon={docDef.icon}
        iconBg={docDef.iconBg}
        iconColor={docDef.iconColor}
        className={isMissingRequired ? 'loan-doc-item--error' : ''}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />
    )
  }

  return (
    <div className="property-loan-step property-documents-step" data-testid="step-property-documents">
      {/* Header Banner */}
      <div className="property-docs-header">
        <h2 className="property-docs-header__title">Property Title & Financial Dossier</h2>
        <p className="property-docs-header__subtitle">
          Checklist for Loan Against Property. Upload title deeds, sanctioned plan, and tax returns.
        </p>
      </div>

      {/* Mandatory Document Progress Card */}
      <div className="property-progress-card">
        <div className="property-progress-card__top">
          <span className="property-progress-card__label">Mandatory Document Progress</span>
          <span className="property-progress-card__val">
            {uploadedMandatoryCount} of {totalMandatory} ({progressPercent}%)
          </span>
        </div>
        <div className="property-progress-card__track">
          <div
            className="property-progress-card__fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 1. IDENTITY & ADDRESS */}
      <DocumentSection title="IDENTITY & ADDRESS">
        <LoanDocumentGrid>
          {IDENTITY_DOCS.map(renderDocCard)}
        </LoanDocumentGrid>
      </DocumentSection>

      {/* 2. INCOME & BANKING */}
      <DocumentSection title="INCOME & BANKING">
        <LoanDocumentGrid>
          {INCOME_DOCS.map(renderDocCard)}
        </LoanDocumentGrid>
      </DocumentSection>

      {/* 3. BUSINESS & TAX */}
      <DocumentSection title="BUSINESS & TAX">
        <LoanDocumentGrid>
          {BUSINESS_TAX_DOCS.map(renderDocCard)}
        </LoanDocumentGrid>
      </DocumentSection>

      {/* 4. COLLATERAL & OTHERS */}
      <DocumentSection title="COLLATERAL & OTHERS">
        <LoanDocumentGrid>
          {COLLATERAL_DOCS.map(renderDocCard)}
        </LoanDocumentGrid>
      </DocumentSection>
    </div>
  )
}

export default Documents
