import React, { useRef, type ChangeEvent } from 'react'
import './IncProofUpload.css'

interface IncProofUploadProps {
  title?: string
  subtitle?: string
  selectedFile: File | null
  error?: string
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (e: React.MouseEvent) => void
}

export const IncProofUpload: React.FC<IncProofUploadProps> = ({
  title = "Upload Document",
  subtitle = "Attach the required document (PDF, JPG, PNG - max 10 MB).",
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
    <div className="inc-upload-card">
      <h3 className="inc-upload-title">{title}</h3>
      <p className="inc-upload-subtitle">{subtitle}</p>

      <input
        ref={fileInputRef}
        type="file"
        className="inc-file-input-hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onFileChange}
      />

      <div
        className={`inc-dropzone ${error ? 'has-error' : ''}`}
        onClick={handleBrowseClick}
        role="button"
        tabIndex={0}
      >
        {selectedFile ? (
          <div className="inc-selected-file-row">
            <span className="file-name">{selectedFile.name}</span>
            <span className="file-size">
              {(selectedFile.size / 1024).toFixed(0)} KB
            </span>
            <button type="button" className="inc-remove-btn" onClick={onRemoveFile}>
              Remove
            </button>
          </div>
        ) : (
          <div className="inc-browse-btn-wrap">
            <button
              type="button"
              className="inc-upload-btn"
              onClick={(e) => {
                e.stopPropagation()
                handleBrowseClick()
              }}
            >
              Upload File
            </button>
          </div>
        )}
      </div>
      {error && <span className="inc-error-msg">{error}</span>}
    </div>
  )
}

export default IncProofUpload
