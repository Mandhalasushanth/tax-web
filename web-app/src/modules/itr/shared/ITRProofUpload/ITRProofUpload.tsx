import React, { useRef, type ChangeEvent } from 'react'
import './ITRProofUpload.css'

interface ITRProofUploadProps {
  title?: string
  subtitle?: string
  selectedFile: File | null
  error?: string
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (e: React.MouseEvent) => void
}

export const ITRProofUpload: React.FC<ITRProofUploadProps> = ({
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
    <div className="itr-upload-card">
      <h3 className="itr-upload-title">{title}</h3>
      <p className="itr-upload-subtitle">{subtitle}</p>

      <input
        ref={fileInputRef}
        type="file"
        className="itr-file-input-hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onFileChange}
      />

      <div
        className={`itr-dropzone ${error ? 'has-error' : ''}`}
        onClick={handleBrowseClick}
        role="button"
        tabIndex={0}
      >
        {selectedFile ? (
          <div className="itr-selected-file-row">
            <span className="file-name">{selectedFile.name}</span>
            <span className="file-size">
              {(selectedFile.size / 1024).toFixed(0)} KB
            </span>
            <button type="button" className="itr-remove-btn" onClick={onRemoveFile}>
              Remove
            </button>
          </div>
        ) : (
          <div className="itr-browse-btn-wrap">
            <button
              type="button"
              className="itr-upload-btn"
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
      {error && <span className="itr-error-msg">{error}</span>}
    </div>
  )
}

export default ITRProofUpload
