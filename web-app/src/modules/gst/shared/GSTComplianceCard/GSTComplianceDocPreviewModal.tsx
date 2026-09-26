import React, { useState, useEffect } from 'react'

export interface ComplianceDocPreviewModalProps {
  file: File
  title: string
  onClose: () => void
}

export const ComplianceDocPreviewModal: React.FC<ComplianceDocPreviewModalProps> = ({
  file,
  title,
  onClose,
}) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null)

  useEffect(() => {
    const u = URL.createObjectURL(file)
    setFileUrl(u)
    return () => URL.revokeObjectURL(u)
  }, [file])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const isImg =
    file.type.startsWith('image/') ||
    /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name)
  const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name)
  const isSheet =
    /\.(xlsx|xls|csv)$/i.test(file.name) ||
    file.type.includes('spreadsheet') ||
    file.type.includes('csv')
  const sizeMb = (file.size / (1024 * 1024)).toFixed(2)

  return (
    <div
      className="compliance-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compliance-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="compliance-modal-container">
        <div className="compliance-modal-header">
          <div className="compliance-modal-header__left">
            <span className="compliance-modal-badge">
              <span className="compliance-modal-badge-dot" aria-hidden="true">
                ●
              </span>
              {title}
            </span>
            <h3 id="compliance-modal-title" className="compliance-modal-title">
              {file.name}
            </h3>
            <p className="compliance-modal-meta">
              <span>{sizeMb} MB</span>
              <span>·</span>
              <span>{file.type || 'Document'}</span>
              <span>·</span>
              <span className="compliance-modal-meta-status">
                ✓ Uploaded & verified
              </span>
            </p>
          </div>
          <button
            type="button"
            className="compliance-modal-close-btn"
            onClick={onClose}
            aria-label="Close document preview"
          >
            ✕
          </button>
        </div>
        <div className="compliance-modal-body">
          {fileUrl && isImg && (
            <div className="compliance-modal-image-wrap">
              <img
                src={fileUrl}
                alt={file.name}
                className="compliance-modal-image"
              />
            </div>
          )}
          {fileUrl && isPdf && (
            <div className="compliance-modal-pdf-wrap">
              <object
                data={fileUrl}
                type="application/pdf"
                className="compliance-modal-pdf-object"
              >
                <iframe
                  src={fileUrl}
                  title={file.name}
                  className="compliance-modal-pdf-iframe"
                />
              </object>
            </div>
          )}
          {isSheet ? (
            <div className="compliance-modal-sheet-wrap">
              <div className="compliance-modal-sheet-icon" aria-hidden="true">
                📊
              </div>
              <h4 className="compliance-modal-sheet-title">{file.name}</h4>
              <p className="compliance-modal-sheet-desc">
                Spreadsheet statement parsed and attached. Your GST executive
                will parse and reconcile this record against GSTR-2B.
              </p>
              <div className="compliance-modal-sheet-tags">
                <span className="compliance-modal-pill">
                  Excel / CSV Format
                </span>
                <span className="compliance-modal-pill">{sizeMb} MB</span>
                <span className="compliance-modal-pill">TaxEdge Verified</span>
              </div>
            </div>
          ) : (
            !isImg &&
            !isPdf && (
              <div className="compliance-modal-file-wrap">
                <div className="compliance-modal-file-icon" aria-hidden="true">
                  📄
                </div>
                <h4 className="compliance-modal-sheet-title">{file.name}</h4>
                <p className="compliance-modal-sheet-desc">
                  Document attached and ready for compliance verification.
                </p>
                <div className="compliance-modal-sheet-tags">
                  <span className="compliance-modal-pill">{sizeMb} MB</span>
                </div>
              </div>
            )
          )}
        </div>
        <div className="compliance-modal-footer">
          <div className="compliance-modal-footer__left">
            {fileUrl && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="compliance-modal-btn-open"
                title="Open file in a full-sized tab"
              >
                Open in new tab ↗
              </a>
            )}
            {fileUrl && (
              <a
                href={fileUrl}
                download={file.name}
                className="compliance-modal-btn-download"
                title="Download file"
              >
                Download
              </a>
            )}
          </div>
          <button
            type="button"
            className="compliance-modal-btn-done"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
