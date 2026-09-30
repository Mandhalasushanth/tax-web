import React from 'react'
import { DocumentSection, UploadDocument } from '@shared/components'
import type { PersonalLoanStepProps } from '../../../../types/personalLoan.types'
import { loanDocumentService } from '../../../../documents/loanDocumentService'
import './Documents.css'

interface DocDef {
  id: string
  title: string
  subtitle: string
  icon: string
  iconBg: string
  category: 'IDENTITY & ADDRESS' | 'INCOME & BANKING'
}

export const PERSONAL_DOCS_LIST: DocDef[] = [
  {
    id: 'pan_card',
    title: 'PAN Card',
    subtitle: 'Clear photo or PDF copy of applicant PAN',
    icon: '/assets/icons/loans/credit-card.svg',
    iconBg: '#e0f2fe',
    category: 'IDENTITY & ADDRESS',
  },
  {
    id: 'aadhaar_card',
    title: 'Aadhaar Card',
    subtitle: 'Front & back copy with readable QR code',
    icon: '/assets/icons/loans/fingerprint-purple.svg',
    iconBg: '#f3e8ff',
    category: 'IDENTITY & ADDRESS',
  },
  {
    id: 'address_proof',
    title: 'Address Proof',
    subtitle: 'Utility bill / Rent Agreement / Voter ID',
    icon: '/assets/icons/loans/home-blue.svg',
    iconBg: '#e0f2fe',
    category: 'IDENTITY & ADDRESS',
  },
  {
    id: 'passport_photo',
    title: 'Passport Size Photograph',
    subtitle: 'Recent colour photo of the applicant',
    icon: '/assets/icons/loans/camera-pink.svg',
    iconBg: '#fae8ff',
    category: 'IDENTITY & ADDRESS',
  },
  {
    id: 'bank_statements',
    title: 'Bank Statements',
    subtitle: 'Last 6 to 12 months salary/savings statement in PDF',
    icon: '/assets/icons/loans/doc-orange.svg',
    iconBg: '#fef3c7',
    category: 'INCOME & BANKING',
  },
  {
    id: 'salary_slips',
    title: 'Salary Slips',
    subtitle: 'Last 3 to 6 months payslips with company seal/header',
    icon: '/assets/icons/loans/doc-green.svg',
    iconBg: '#dcfce7',
    category: 'INCOME & BANKING',
  },
]

export const Documents: React.FC<PersonalLoanStepProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const uploadedDocs = data.uploadedDocs || {}
  const uploadedCount = Object.keys(uploadedDocs).length
  const totalCount = PERSONAL_DOCS_LIST.length
  const progressPercent = Math.round((uploadedCount / totalCount) * 100)

  const handleUpload = (docId: string, file: File) => {
    const entry = loanDocumentService.createDocumentEntry(docId, file)
    onChange({
      uploadedDocs: {
        ...uploadedDocs,
        [docId]: entry,
      },
    })
  }

  const handleRemove = (docId: string) => {
    const next = { ...uploadedDocs }
    delete next[docId]
    onChange({ uploadedDocs: next })
  }

  const identityDocs = PERSONAL_DOCS_LIST.filter((d) => d.category === 'IDENTITY & ADDRESS')
  const incomeDocs = PERSONAL_DOCS_LIST.filter((d) => d.category === 'INCOME & BANKING')

  const renderDocCard = (doc: DocDef) => {
    const uploaded = uploadedDocs[doc.id]
    const hasError = !uploaded && Boolean(errors[doc.id])

    return (
      <UploadDocument
        key={doc.id}
        id={doc.id}
        title={doc.title}
        subtitle={doc.subtitle}
        isRequired={true}
        badge={
          hasError ? (
            <span className="loan-doc-item__badge loan-doc-item__badge--error">
              Required Document Missing
            </span>
          ) : undefined
        }
        icon={<img src={doc.icon} alt="" width="20" height="20" aria-hidden="true" />}
        iconBg={doc.iconBg}
        isUploaded={Boolean(uploaded)}
        fileName={uploaded?.name}
        fileSize={uploaded?.size}
        file={uploaded?.file}
        className={hasError ? 'loan-doc-item--error' : ''}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />
    )
  }

  return (
    <div className="personal-documents-step" data-testid="step-personal-documents">
      <div className="personal-documents-header">
        <h2 className="personal-documents-header__title">Document Verification Dossier</h2>
        <p className="personal-documents-header__subtitle">
          Checklist for Personal Loan. Upload clear digital copies to expedite sanction.
        </p>
      </div>

      {/* Mandatory Document Progress Card */}
      <div className="personal-doc-progress-card">
        <div className="personal-doc-progress-card__top">
          <span className="personal-doc-progress-card__label">Mandatory Document Progress</span>
          <span className="personal-doc-progress-card__val">
            {uploadedCount} of {totalCount} ({progressPercent}%)
          </span>
        </div>
        <div className="personal-doc-progress-card__track">
          <div
            className="personal-doc-progress-card__bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Group 1: IDENTITY & ADDRESS */}
      <DocumentSection title="IDENTITY & ADDRESS">
        <div className="personal-doc-group__list">
          {identityDocs.map(renderDocCard)}
        </div>
      </DocumentSection>

      {/* Group 2: INCOME & BANKING */}
      <DocumentSection title="INCOME & BANKING">
        <div className="personal-doc-group__list">
          {incomeDocs.map(renderDocCard)}
        </div>
      </DocumentSection>
    </div>
  )
}

export default Documents
