import React from 'react'
import { DocumentCard } from '@shared/components'
import type { UploadedLoanDocument } from '../../../../documents/loanDocument.types'

export type DocumentThemeColor = 'blue' | 'purple' | 'green' | 'pink' | 'orange'

export interface BusinessDocumentItemProps {
  id: string
  title: string
  subtitle: string
  iconSrc: string
  themeColor?: DocumentThemeColor
  isRequired?: boolean
  isOptional?: boolean
  uploadedDoc?: UploadedLoanDocument
  error?: string
  onUpload: (id: string, file: File) => void
  onRemove: (id: string) => void
  onView: (doc: { id: string; title: string; fileName?: string; file?: File }) => void
}

const CLOUD_UPLOAD_ICON = (
  <img
    src="/assets/icons/loans/cloud-upload-orange.svg"
    alt=""
    width="17"
    height="17"
    aria-hidden="true"
  />
)

/**
 * Reusable Document Item Component wrapping shared DocumentCard
 * Standardizes layout, icons, status badges, and error handling without repeating boilerplate.
 * Strictly uses external CSS classes only - zero inline styles.
 */
export const BusinessDocumentItem: React.FC<BusinessDocumentItemProps> = ({
  id,
  title,
  subtitle,
  iconSrc,
  themeColor = 'blue',
  isRequired = true,
  isOptional = false,
  uploadedDoc,
  error,
  onUpload,
  onRemove,
  onView,
}) => {
  const isUploaded = Boolean(uploadedDoc)

  const optionalBadge = isOptional ? (
    <span className="business-doc-badge--optional">Optional</span>
  ) : undefined

  const cardIcon = (
    <img
      src={iconSrc}
      alt=""
      width="20"
      height="20"
      aria-hidden="true"
    />
  )

  const cardClassName = `business-loan-doc-card business-loan-doc-card--${themeColor} ${
    error ? 'business-doc-card--error' : ''
  }`

  return (
    <DocumentCard
      id={id}
      title={title}
      subtitle={subtitle}
      isRequired={isRequired && !isOptional}
      badge={optionalBadge}
      uploadIcon={CLOUD_UPLOAD_ICON}
      icon={cardIcon}
      accept=".pdf,.jpg,.jpeg,.png"
      isUploaded={isUploaded}
      fileName={uploadedDoc?.name}
      fileSize={uploadedDoc?.size}
      file={uploadedDoc?.file}
      className={cardClassName}
      onUpload={onUpload}
      onRemove={onRemove}
      onView={onView}
    >
      {error && <span className="business-doc-card-error-text">{error}</span>}
    </DocumentCard>
  )
}

export default BusinessDocumentItem
