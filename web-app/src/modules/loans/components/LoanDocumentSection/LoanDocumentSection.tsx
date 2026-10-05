import React from 'react'
import { DocumentCard } from '@shared/components'
import type { LoanDocumentDefinition, UploadedLoanDocument } from '../../documents/loanDocument.types'
import './LoanDocumentSection.css'

export interface LoanDocumentSectionProps {
  title: string
  icon?: React.ReactNode
  badgeLabel?: string
  isRequiredBadge?: boolean
  documents: LoanDocumentDefinition[]
  uploadedDocs: Record<string, UploadedLoanDocument>
  errors?: Record<string, string>
  onUpload: (id: string, file: File) => void
  onRemove: (id: string) => void
  className?: string
}

export const LoanDocumentSection: React.FC<LoanDocumentSectionProps> = ({
  title,
  icon,
  badgeLabel,
  isRequiredBadge = false,
  documents,
  uploadedDocs,
  errors = {},
  onUpload,
  onRemove,
  className = '',
}) => {
  return (
    <div className={`loan-doc-section ${className}`.trim()}>
      <div className="loan-doc-section__header">
        {icon && <span className="loan-doc-section__header-icon">{icon}</span>}
        <h3 className="loan-doc-section__title">{title}</h3>
        {badgeLabel && (
          <span
            className={`loan-doc-section__badge ${
              isRequiredBadge ? 'loan-doc-section__badge--required' : ''
            }`}
          >
            {badgeLabel}
          </span>
        )}
      </div>

      <div className="loan-doc-section__list">
        {documents.map((doc) => {
          const uploaded = uploadedDocs[doc.id]
          const isMissingRequired = !uploaded && Boolean(errors[doc.id])
          const badge = !doc.isRequired ? (
            <span className="loan-doc-item__badge loan-doc-item__badge--optional">
              {doc.badgeLabel || 'Optional'}
            </span>
          ) : isMissingRequired ? (
            <span className="loan-doc-item__badge loan-doc-item__badge--error">
              Required Document Missing
            </span>
          ) : undefined

          return (
            <DocumentCard
              key={doc.id}
              id={doc.id}
              title={doc.title}
              subtitle={doc.subtitle}
              isRequired={doc.isRequired}
              badge={badge}
              isUploaded={Boolean(uploaded)}
              fileName={uploaded?.name}
              fileSize={uploaded?.size}
              icon={doc.icon}
              iconBg={doc.iconBg || '#fff7ed'}
              iconColor={doc.iconColor || '#ea580c'}
              className={isMissingRequired ? 'loan-doc-item--error' : ''}
              onUpload={onUpload}
              onRemove={onRemove}
            />
          )
        })}
      </div>
    </div>
  )
}

export default LoanDocumentSection
