import React from 'react'
import type { SupportingDocumentItem } from '../../../types/taxNoticeAssistance.types'

export const getDocColor = (id: string) => {
  switch (id) {
    case 'tax-notice':
    case 'previous-itr':
      return 'blue'
    case 'itr-ack':
    case 'form-16':
      return 'purple'
    case 'ais':
    case 'tis':
      return 'indigo'
    case 'bank-statements':
      return 'blue'
    case 'supporting-income':
    case 'supporting-expense':
      return 'orange'
    default:
      return 'blue'
  }
}

export const getDocIcon = (id: string) => {
  switch (id) {
    case 'tax-notice':
    case 'form-16':
    case 'itr-ack':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    case 'ais':
    case 'supporting-income':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    case 'bank-statements':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18" />
          <path d="M15 3v18" />
        </svg>
      )
    case 'tis':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="16" y1="14" x2="16" y2="18" />
          <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
        </svg>
      )
    case 'supporting-expense':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    case 'previous-responses':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      )
  }
}

export interface SupportingDocRowProps {
  doc: SupportingDocumentItem
  isUploaded: boolean
  uploadInfo?: { fileName: string; fileSize: string }
  fileInputRef: (el: HTMLInputElement | null) => void
  onFileUpload: (file: File) => void
  onView: () => void
  onReplace: () => void
  onRemove: () => void
}

export const SupportingDocRow: React.FC<SupportingDocRowProps> = ({
  doc,
  isUploaded,
  uploadInfo,
  fileInputRef,
  onFileUpload,
  onView,
  onReplace,
  onRemove,
}) => {
  return (
    <div className={`supporting-doc-item ${isUploaded ? 'supporting-doc-item--uploaded' : ''}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx"
        className="supporting-file-input-hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFileUpload(file)
        }}
      />

      <div className="supporting-doc-item__main">
        <div className="supporting-doc-item__left">
          <div className={`supporting-doc-item__icon-box supporting-doc-item__icon-box--${getDocColor(doc.id)}`}>
            {getDocIcon(doc.id)}
          </div>

          <div className="supporting-doc-item__meta">
            <span className="supporting-doc-item__title">
              {doc.title} {doc.required && <span className="supporting-doc-item__required">*</span>}
            </span>
            <span className="supporting-doc-item__subtitle">{doc.subtitle}</span>
            {isUploaded && uploadInfo && (
              <span className="supporting-doc-item__filename">
                {uploadInfo.fileName} ({uploadInfo.fileSize})
              </span>
            )}
          </div>
        </div>

        {isUploaded ? (
          <div className="supporting-doc-item__uploaded-badge">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Uploaded</span>
          </div>
        ) : (
          <button
            type="button"
            className="supporting-doc-item__upload-btn"
            onClick={onReplace}
          >
            <svg className="supporting-doc-item__cloud-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              <polyline points="9 14 12 11 15 14" />
              <line x1="12" y1="11" x2="12" y2="17" />
            </svg>
            <span>Upload</span>
          </button>
        )}
      </div>

      {isUploaded && (
        <>
          <div className="supporting-doc-item__divider" />
          <div className="supporting-doc-item__bottom-bar">
            <button
              type="button"
              className="supporting-doc-item__action-link supporting-doc-item__action-link--view"
              onClick={onView}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>View Document</span>
            </button>

            <span className="supporting-doc-item__divider-vertical" aria-hidden="true" />

            <button
              type="button"
              className="supporting-doc-item__action-link supporting-doc-item__action-link--replace"
              onClick={onReplace}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              <span>Replace</span>
            </button>

            <span className="supporting-doc-item__divider-vertical" aria-hidden="true" />

            <button
              type="button"
              className="supporting-doc-item__trash-btn"
              onClick={onRemove}
              title="Delete document"
              aria-label="Delete document"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
