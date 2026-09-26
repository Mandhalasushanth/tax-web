import React, { useRef } from 'react'
import type { DocumentItemDef, UploadedFileInfo } from '../../../utils/gstDocumentsData'
import './GSTDocumentRow.css'

interface GSTDocumentRowProps {
  item: DocumentItemDef
  uploadedFile?: UploadedFileInfo
  isNotApplicable?: boolean
  onFileUpload: (id: string, file: File) => void
  onFileRemove: (id: string) => void
  onToggleNotApplicable?: (id: string) => void
}

const DocumentIcon: React.FC<{ type: DocumentItemDef['iconType'] }> = ({ type }) => {
  switch (type) {
    case 'invoice':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    case 'credit-note':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 14 4 9 9 4" />
          <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
        </svg>
      )
    case 'debit-note':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 10 20 15 15 20" />
          <path d="M4 4v7a4 4 0 0 0 4 4h12" />
        </svg>
      )
    case 'irn':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    case 'eway':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    case 'purchase':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    case 'gstr2b':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      )
    case 'expense':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    case 'bank':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="21" x2="21" y2="21" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <polyline points="5 6 12 3 19 6" />
          <line x1="4" y1="10" x2="4" y2="21" />
          <line x1="20" y1="10" x2="20" y2="21" />
          <line x1="8" y1="14" x2="8" y2="17" />
          <line x1="12" y1="14" x2="12" y2="17" />
          <line x1="16" y1="14" x2="16" y2="17" />
        </svg>
      )
    case 'prev-returns':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      )
    case 'arn':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
      )
  }
}

export const GSTDocumentRow: React.FC<GSTDocumentRowProps> = ({
  item,
  uploadedFile,
  isNotApplicable,
  onFileUpload,
  onFileRemove,
  onToggleNotApplicable,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(item.id, file)
      e.target.value = ''
    }
  }

  const handleViewDocument = () => {
    if (uploadedFile?.fileUrl) {
      window.open(uploadedFile.fileUrl, '_blank')
    } else {
      alert(`Viewing ${uploadedFile?.name || 'document'}`)
    }
  }

  return (
    <div className={`gst-doc-row ${uploadedFile ? 'gst-doc-row--uploaded' : ''}`}>
      <input
        ref={fileInputRef}
        type="file"
        className="gst-doc-row__hidden-input"
        onChange={handleInputChange}
        accept=".pdf,.xlsx,.xls,.csv,.json,.zip,.jpg,.jpeg,.png"
      />

      {/* Main Row: Icon, Titles, and Tag / Badge */}
      <div className="gst-doc-row__main">
        <div className="gst-doc-row__left">
          <div className={`gst-doc-row__icon-wrap gst-doc-row__icon-wrap--${item.iconType}`}>
            <DocumentIcon type={item.iconType} />
          </div>
          <div className="gst-doc-row__details">
            <h4 className="gst-doc-row__title">
              {item.title}
              {item.isRequired && <span className="gst-doc-row__asterisk"> *</span>}
            </h4>
            {uploadedFile ? (
              <p className="gst-doc-row__filename">{uploadedFile.name}</p>
            ) : (
              <p className="gst-doc-row__subtitle">{item.subtitle}</p>
            )}
          </div>
        </div>

        <div className="gst-doc-row__right">
          {uploadedFile ? (
            <div className="gst-doc-row__uploaded-badge">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Uploaded</span>
            </div>
          ) : isNotApplicable ? (
            <>
              <div className="gst-doc-row__na-badge">
                <span>Not Applicable</span>
              </div>
              <button
                type="button"
                className="gst-doc-row__na-undo"
                onClick={() => onToggleNotApplicable?.(item.id)}
              >
                Change
              </button>
            </>
          ) : (
            <button
              type="button"
              className="gst-doc-row__upload-btn"
              onClick={handleUploadClick}
            >
              <svg className="gst-doc-row__cloud-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                <polyline points="9 14 12 11 15 14" />
                <line x1="12" y1="11" x2="12" y2="17" />
              </svg>
              <span>Upload File</span>
            </button>
          )}
        </div>
      </div>


      {/* Uploaded Actions Footer Bar: View Document | Replace | Trash */}
      {uploadedFile && (
        <>
          <div className="gst-doc-row__divider" />
          <div className="gst-doc-row__bottom-bar">
            <div className="gst-doc-row__actions">
              <button
                type="button"
                className="gst-doc-row__action-link"
                onClick={handleViewDocument}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>View Document</span>
              </button>

              <span className="gst-doc-row__action-sep">|</span>

              <button
                type="button"
                className="gst-doc-row__action-link gst-doc-row__action-link--replace"
                onClick={handleUploadClick}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                <span>Replace</span>
              </button>

              <span className="gst-doc-row__action-sep">|</span>

              <button
                type="button"
                className="gst-doc-row__trash-btn"
                onClick={() => onFileRemove(item.id)}
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
          </div>
        </>
      )}
    </div>
  )
}
