import React, { useRef, type ChangeEvent } from 'react'
import './LoanProofUpload.css'

interface LoanProofUploadProps {
  title?: string
  subtitle?: string
  selectedFile: File | null
  error?: string
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (e: React.MouseEvent) => void
}

export const LoanProofUpload: React.FC<LoanProofUploadProps> = ({
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
    <div className="loan-upload-card">
      <h3 className="loan-upload-title">{title}</h3>
      <p className="loan-upload-subtitle">{subtitle}</p>

      <input
        ref={fileInputRef}
        type="file"
        className="loan-file-input-hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onFileChange}
      />

      <div
        className={`loan-dropzone ${error ? 'has-error' : ''}`}
        onClick={handleBrowseClick}
        role="button"
        tabIndex={0}
      >
        {selectedFile ? (
          <div className="loan-selected-file-row">
            <span className="file-name">{selectedFile.name}</span>
            <span className="file-size">
              {(selectedFile.size / 1024).toFixed(0)} KB
            </span>
            <button type="button" className="loan-remove-btn" onClick={onRemoveFile}>
              Remove
            </button>
          </div>
        ) : (
          <div className="loan-browse-btn-wrap">
            <button
              type="button"
              className="loan-upload-btn"
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
      {error && <span className="loan-error-msg">{error}</span>}
    </div>
  )
}

export default LoanProofUpload
