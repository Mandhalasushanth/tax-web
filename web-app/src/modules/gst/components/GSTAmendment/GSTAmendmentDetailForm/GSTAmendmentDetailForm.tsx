import { GSTSaveDraftButton } from '@modules/gst/shared/GSTSaveDraftButton'
import { GST_FILE_MESSAGES, gstFileSizeError } from '@modules/gst/utils/gstFile'
import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import { detectGstFieldKind, gstRuleForField } from '@modules/gst/validation/gstFieldRules'
import { gstInputForKind } from '@modules/gst/utils/gstInputFormatters'
import GSTAmendmentProofsCard from './GSTAmendmentProofsCard'
import GSTAmendmentProofUpload from './GSTAmendmentProofUpload'
import './GSTAmendmentDetailForm.css'

interface GSTAmendmentDetailFormProps {
  title?: string
  currentValue?: string
  inputLabel?: string
  placeholder?: string
  proofs?: string[]
  isSubmitting?: boolean
  onBack: () => void
  onSaveDraft?: () => void
  onSubmit: (payload: { newValue: string; file: File | null }) => void
}

export const GSTAmendmentDetailForm: React.FC<GSTAmendmentDetailFormProps> = ({
  title,
  currentValue,
  inputLabel,
  placeholder,
  proofs,
  isSubmitting = false,
  onBack,
  onSubmit,
  onSaveDraft,
}) => {
  const [newValue, setNewValue] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<{ newValue?: string; file?: string }>({})

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const sizeError = gstFileSizeError(file)
      if (sizeError) {
        setErrors((prev) => ({ ...prev, file: sizeError }))
        return
      }
      setSelectedFile(file)
      setErrors((prev) => ({ ...prev, file: undefined }))
    }
  }

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedFile(null)
  }

  // Validation and input filtering chosen from what the field asks for (label first, then placeholder)
  const fieldKind = detectGstFieldKind(inputLabel, placeholder)
  const filterInput = gstInputForKind(fieldKind)
  const validateField = (value: string) => gstRuleForField(inputLabel, placeholder)(value)

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    const newErrors: { newValue?: string; file?: string } = {}

    const fieldError = validateField(newValue)
    if (fieldError) {
      newErrors.newValue = fieldError
    }

    if (!selectedFile) {
      newErrors.file = GST_FILE_MESSAGES.proofRequired
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    onSubmit({ newValue: newValue.trim(), file: selectedFile })
  }

  return (
    <div className="gst-amend-detail-container">
      {/* Main Page Title Header */}
      <div className="gst-amend-detail-header">
        <h1 className="gst-amend-detail-title">{title}</h1>
        <p className="gst-amend-detail-subtitle">Current details are read-only</p>
      </div>

      <form onSubmit={handleSubmitForm} noValidate>
        {/* Two Column Grid */}
        <div className="gst-amend-detail-grid">
          {/* Left Column: 3 Cards */}
          <main className="gst-amend-detail-main">
            {/* Card 1: Currently registered (read-only) */}
            <div className="gst-amend-card-box">
              <h3 className="gst-amend-card-box__title">Currently registered (read-only)</h3>
              <div className="gst-amend-readonly-box">
                <span className="gst-amend-readonly-label">{title}</span>
                <span className="gst-amend-readonly-value">{currentValue}</span>
              </div>
            </div>

            {/* Card 2: New details */}
            <div className="gst-amend-card-box">
              <h3 className="gst-amend-card-box__title">New details</h3>
              <div className="gst-amend-field-group">
                <label htmlFor="new-detail-input" className="gst-amend-field-label">
                  {inputLabel} <span className="gst-amend-star">*</span>
                </label>
                <input
                  id="new-detail-input"
                  type="text"
                  placeholder={placeholder}
                  value={newValue}
                  onChange={(e) => {
                    setNewValue(filterInput(e.target.value))
                    if (errors.newValue) setErrors((prev) => ({ ...prev, newValue: undefined }))
                  }}
                  className={`gst-amend-text-input ${errors.newValue ? 'has-error' : ''}`}
                />
                {errors.newValue && (
                  <span className="gst-amend-error-msg">{errors.newValue}</span>
                )}
              </div>
            </div>

            {/* Card 3: Supporting proof */}
            <GSTAmendmentProofUpload
              selectedFile={selectedFile}
              error={errors.file}
              onFileChange={handleFileChange}
              onRemoveFile={handleRemoveFile}
            />
          </main>

          {/* Right Column: Accepted Proofs Sidebar Card */}
          <GSTAmendmentProofsCard proofs={proofs} />
        </div>

        {/* Bottom Actions Row */}
        <div className="gst-amend-detail-actions-row">
          <button
            type="button"
            onClick={onBack}
            className="gst-amend-back-pill-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>

          <div className="gst-actions-group">
            {onSaveDraft && <GSTSaveDraftButton onClick={onSaveDraft} />}
            <button
              type="submit"
              disabled={isSubmitting}
              className="gst-amend-submit-orange-btn"
            >
              {isSubmitting ? 'Submitting...' : 'Review Changes'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default GSTAmendmentDetailForm
