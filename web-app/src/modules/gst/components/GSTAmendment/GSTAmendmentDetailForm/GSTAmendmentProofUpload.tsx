import React, { useRef, type ChangeEvent } from 'react'
import './GSTAmendmentProofUpload.css'

interface GSTAmendmentProofUploadProps {
  selectedFile: File | null
  error?: string
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (e: React.MouseEvent) => void
}

export const GSTAmendmentProofUpload: React.FC<GSTAmendmentProofUploadProps> = ({
  selectedFile,
  error,
  onFileChange,
  onRemoveFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="gst-amend-card-box">
      <h3 className="gst-amend-card-box__title">Supporting proof</h3>
      <p className="gst-amend-card-box__subtitle">
        Attach the document that evidences this change (PDF, JPG, PNG - max 10 MB).
      </p>

      <input
        ref={fileInputRef}
        type="file"
        className="gst-amend-file-input-hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onFileChange}
      />

      <div
        className={`gst-amend-dropzone ${error ? 'has-error' : ''}`}
        onClick={handleBrowseClick}
        role="button"
        tabIndex={0}
      >
        {selectedFile ? (
          <div className="gst-amend-selected-file-row">
            <div className="gst-amend-selected-file-info">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gst-amend-file-icon">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="file-name">{selectedFile.name}</span>
              <span className="file-size">
                ({(selectedFile.size / 1024).toFixed(0)} KB)
              </span>
            </div>
            <button
              type="button"
              className="gst-amend-remove-file-btn"
              onClick={onRemoveFile}
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="gst-amend-browse-btn-wrap">
            <button
              type="button"
              className="gst-amend-upload-orange-btn"
              onClick={(e) => {
                e.stopPropagation()
                handleBrowseClick()
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="gst-amend-upload-cloud-icon">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m16 16-4-4-4 4" />
              </svg>
              <span>Upload File</span>
            </button>
          </div>
        )}
      </div>

      <div className="gst-amend-proof-hint">
        Supported formats: PDF, JPG, PNG | Maximum file size: 10 MB
      </div>

      {error && (
        <span className="gst-amend-error-msg">
          {error}
        </span>
      )}
    </div>
  )
}

export default GSTAmendmentProofUpload
