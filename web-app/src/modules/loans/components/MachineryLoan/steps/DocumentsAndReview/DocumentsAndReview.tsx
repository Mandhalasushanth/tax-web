import React from 'react'
import { DocumentSection, UploadDocument } from '@shared/components'
import { LoanReviewSection } from '@modules/loans/shared'
import { loanDocumentService, createDocDef } from '@modules/loans/documents'
import type { LoanDocumentDefinition } from '@modules/loans/documents/loanDocument.types'
import type { MachineryLoanData } from '@modules/loans/types/machineryLoan.types'
import './DocumentsAndReview.css'

export interface DocumentsAndReviewProps {
  data: MachineryLoanData
  onChange: (fields: Partial<MachineryLoanData>) => void
  onNavigateToStep: (stepNumber: number) => void
  errors?: Record<string, string>
}

const SECTION_ICON_IDENTITY = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="machinery-loan-docs__section-icon">
    <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

const SECTION_ICON_BANKING = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="machinery-loan-docs__section-icon">
    <rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" />
  </svg>
)

const SECTION_ICON_BUSINESS = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="machinery-loan-docs__section-icon">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
  </svg>
)

const IDENTITY_DOCS: LoanDocumentDefinition[] = [
  createDocDef('pan_card', 'PAN Card', 'Entity or Primary Applicant PAN Card copy', 'identity', (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ), true, { iconBg: '#e0f2fe', iconColor: '#0284c7' }),
  createDocDef('aadhaar_card', 'Aadhaar / Accepted KYC', 'Aadhaar Card or accepted KYC document of proprietor/applicant', 'identity', (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ), true, { iconBg: '#f3e8ff', iconColor: '#9333ea' }),
]

const INCOME_BANKING_DOCS: LoanDocumentDefinition[] = [
  createDocDef('bank_statement', 'Bank Statement', 'Last 6 to 12 months primary business current account statement', 'income', (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" />
    </svg>
  ), true, { iconBg: '#fef3c7', iconColor: '#d97706' }),
]

const BUSINESS_TAX_DOCS: LoanDocumentDefinition[] = [
  createDocDef('machinery_quotation', 'Machinery Quotation', 'Proforma invoice or official quotation from OEM / Machinery supplier', 'property', (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
    </svg>
  ), true, { iconBg: '#dcfce7', iconColor: '#16a34a' }),
  createDocDef('gst_certificate', 'GST Certificate / Returns', 'GST REG-06 or GSTR-3B return copy (if GST registered)', 'property', (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ), false, { iconBg: '#e0f2fe', iconColor: '#0284c7' }),
  createDocDef('business_reg_proof', 'Business Registration Proof', 'Partnership Deed, MOA/COI, Trade License, or shop establishment proof', 'property', (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="7" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ), false, { iconBg: '#fae8ff', iconColor: '#c026d3' }),
  createDocDef('udyam_certificate', 'Udyam Certificate', 'MSME registration certificate (optional)', 'property', (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ), false, { iconBg: '#fef3c7', iconColor: '#d97706' }),
]

const ALL_REQUIRED_DOC_IDS = ['pan_card', 'aadhaar_card', 'bank_statement', 'machinery_quotation']

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
    const entry = loanDocumentService.createDocumentEntry(id, file)
    onChange({ uploadedDocs: { ...uploadedDocs, [id]: entry } })
  }

  const handleRemove = (id: string) => {
    const next = { ...uploadedDocs }
    delete next[id]
    onChange({ uploadedDocs: next })
  }

  const maskedAccountNumber = data.accountNumber
    ? data.accountNumber.length > 4
      ? `XXXXXX${data.accountNumber.slice(-4)}`
      : data.accountNumber
    : 'Not specified'

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
        iconBg={doc.iconBg || '#fff7ed'}
        iconColor={doc.iconColor || '#ea580c'}
        className={isMissingRequired ? 'loan-doc-item--error' : ''}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />
    )
  }

  const renderDocumentsSection = () => (
    <>
      <div className="machinery-loan-section-heading">
        <h3 className="machinery-loan-section-heading__title">Required Documents</h3>
        <p className="machinery-loan-section-heading__desc">
          Upload minimum KYC, bank statement and OEM quotation to process machinery loan.
        </p>
      </div>

      <div className="machinery-loan-docs__progress-card">
        <div className="machinery-loan-docs__progress-header">
          <span className="machinery-loan-docs__progress-title">Required documents</span>
          <span className="machinery-loan-docs__progress-count">
            {requiredUploadedCount} / {totalRequiredDocs} ({progressPercent}%)
          </span>
        </div>
        <div className="machinery-loan-docs__progress-track">
          <div className="machinery-loan-docs__progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <DocumentSection
        title="IDENTITY & ADDRESS"
        icon={SECTION_ICON_IDENTITY}
      >
        {IDENTITY_DOCS.map(renderDocCard)}
      </DocumentSection>

      <DocumentSection
        title="INCOME & BANKING"
        icon={SECTION_ICON_BANKING}
      >
        {INCOME_BANKING_DOCS.map(renderDocCard)}
      </DocumentSection>

      <DocumentSection
        title="BUSINESS & TAX"
        icon={SECTION_ICON_BUSINESS}
      >
        {BUSINESS_TAX_DOCS.map(renderDocCard)}
      </DocumentSection>
    </>
  )

  const renderReviewDossierSection = () => (
    <>
      <div className="machinery-loan-section-heading machinery-loan-section-heading--mt-lg">
        <h3 className="machinery-loan-section-heading__title">Machinery Loan Dossier Review</h3>
        <p className="machinery-loan-section-heading__desc">
          Review your machinery financing request, business profile, and banking details.
        </p>
      </div>

      <div className="machinery-loan-review-group">
        <LoanReviewSection
          title="Loan Details"
          onEdit={() => onNavigateToStep(1)}
          items={[
            {
              label: 'Loan Amount',
              value: data.loanAmount
                ? `₹${(Number(String(data.loanAmount).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}`
                : 'Not specified',
            },
            { label: 'Equipment Type', value: data.machineryType || 'Not specified' },
            { label: 'Tenure', value: data.repaymentTenure || 'Not specified' },
          ]}
        />

        <LoanReviewSection
          title="Business Details"
          onEdit={() => onNavigateToStep(2)}
          items={[
            { label: 'Business Name', value: data.businessName || 'Not specified' },
            { label: 'Business Type', value: data.businessType || 'Not specified' },
            { label: 'Business Vintage', value: data.businessVintage || 'Not specified' },
            {
              label: 'Annual Turnover',
              value: data.annualTurnover
                ? data.annualTurnover.startsWith('₹')
                  ? data.annualTurnover
                  : `₹${data.annualTurnover}`
                : 'Not specified',
            },
            {
              label: 'GST status',
              value: data.isGstRegistered ? (data.gstin ? `Registered (${data.gstin})` : 'Registered') : 'Not Registered',
            },
          ]}
        />

        <LoanReviewSection
          title="Banking"
          onEdit={() => onNavigateToStep(3)}
          items={[
            { label: 'Bank', value: data.bankName || 'Not specified' },
            { label: 'Masked Account Number', value: maskedAccountNumber },
            { label: 'IFSC', value: data.ifscCode || '—' },
          ]}
        />
      </div>
    </>
  )

  const renderDeclarationSection = () => (
    <>
      <div className="machinery-loan-review__declaration">
        <input
          id="machinery-loan-terms-checkbox"
          type="checkbox"
          className="machinery-loan-review__checkbox"
          checked={data.termsAccepted}
          onChange={(e) => onChange({ termsAccepted: e.target.checked })}
        />
        <label htmlFor="machinery-loan-terms-checkbox" className="machinery-loan-review__label">
          I authorize TaxEdge to transmit machinery quotes and business financial records to machinery finance partner NBFCs and commercial banks.
        </label>
      </div>
      {errors.termsAccepted && (
        <span className="machinery-loan-field-error" role="alert">
          {errors.termsAccepted}
        </span>
      )}
    </>
  )

  return (
    <div className="machinery-loan-docs-review">
      {renderDocumentsSection()}
      {renderReviewDossierSection()}
      {renderDeclarationSection()}
    </div>
  )
}

export default DocumentsAndReview
