import { GSTSaveDraftButton } from '@modules/gst/shared/GSTSaveDraftButton'
import { GST_FILE_MESSAGES, gstFileSizeError } from '@modules/gst/utils/gstFile'
import { collectGstErrors } from '@modules/gst/validation/gstFieldRules'
import React, { useState, useRef, type ChangeEvent, type FormEvent, useMemo } from 'react'
import { gstInput } from '@modules/gst/utils/gstInputFormatters'
import { gstFieldRules as rules } from '@modules/gst/validation/gstFieldRules'
import { getCurrentSignatoryDetails } from '@modules/gst/services/gstProfileDetails'
import GSTAmendmentProofUpload from './GSTAmendmentProofUpload'
import GSTSignatoriesSidebar from './GSTSignatoriesSidebar'
import GSTSignatoriesReadonly from './GSTSignatoriesReadonly'
import './GSTSignatoriesForm.css'

interface GSTSignatoriesFormProps {
  currentDetails?: {
    name: string
    pan: string
    designation: string
    mobile: string
    email: string
  }
  isSubmitting?: boolean
  onBack: () => void
  onSaveDraft?: () => void
  onSubmit: (payload: { newValue: string; file: File | null; signatoryDetails?: Record<string, string> }) => void
}

export const GSTSignatoriesForm: React.FC<GSTSignatoriesFormProps> = ({
  currentDetails: currentDetailsProp,
  isSubmitting = false,
  onBack,
  onSubmit,
  onSaveDraft,
}) => {
  const currentDetails = useMemo(() => currentDetailsProp ?? getCurrentSignatoryDetails(), [currentDetailsProp])
  const [name, setName] = useState('')
  const [designation, setDesignation] = useState('')
  const [pan, setPan] = useState('')
  const [mobile, setMobile] = useState('')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const dateRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const sizeError = gstFileSizeError(file)
      if (sizeError) {
        setErrors((prev) => ({ ...prev, file: sizeError }))
        return
      }
      setSelectedFile(file)
      setErrors((prev) => ({ ...prev, file: '' }))
    }
  }

  const handleCalendarClick = () => {
    if (dateRef.current) {
      if (typeof dateRef.current.showPicker === 'function') dateRef.current.showPicker()
      else dateRef.current.focus()
    }
  }

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    const newErrors = collectGstErrors({
      name: rules.personName('Signatory name')(name),
      designation: rules.designation(designation),
      pan: rules.pan(pan),
      mobile: rules.mobile(mobile),
      dob: rules.signatoryDob(dob),
      email: rules.email(email),
    })
    if (!selectedFile) newErrors.file = GST_FILE_MESSAGES.proofRequired

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const formattedNewValue = `${name.trim()} (${designation.trim()}) · PAN: ${pan.toUpperCase().trim()}`
    const sigData = {
      name: name.trim(),
      designation: designation.trim(),
      pan: pan.toUpperCase().trim(),
      mobile: mobile.trim(),
      dob: dob.trim(),
      email: email.trim(),
    }
    setErrors({})
    onSubmit({ newValue: formattedNewValue, file: selectedFile, signatoryDetails: sigData })
  }

  return (
    <div className="gst-amend-detail-container">
      {/* Header */}
      <div className="gst-amend-detail-header">
        <h1 className="gst-amend-detail-title">Authorised Signatories</h1>
        <p className="gst-amend-detail-subtitle">
          Current details are read-only. Update the new details below.
        </p>
      </div>

      <form onSubmit={handleSubmitForm} noValidate>
        <div className="gst-amend-detail-grid">
          {/* Main Left Column */}
          <div className="gst-amend-detail-main-col">
            {/* Card 1: Currently registered (read-only) */}
            <GSTSignatoriesReadonly currentDetails={currentDetails} />

            {/* Card 2: New details */}
            <div className="gst-amend-card-box">
              <h3 className="gst-amend-card-box__title">New details</h3>

              {/* Row 1: New Signatory Name & Designation */}
              <div className="gst-amend-form-row">
                <div className="gst-amend-field-group">
                  <label htmlFor="sig-name-input" className="gst-amend-field-label">
                    New Signatory Name <span className="gst-amend-star">*</span>
                  </label>
                  <input
                    id="sig-name-input"
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => {
                      setName(gstInput.letters(e.target.value))
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
                    }}
                    className={`gst-amend-text-input ${errors.name ? 'has-error' : ''}`}
                  />
                  {errors.name && <span className="gst-amend-error-msg">{errors.name}</span>}
                </div>

                <div className="gst-amend-field-group">
                  <label htmlFor="sig-designation-input" className="gst-amend-field-label">
                    Designation <span className="gst-amend-star">*</span>
                  </label>
                  <input
                    id="sig-designation-input"
                    type="text"
                    placeholder="Enter designation"
                    value={designation}
                    onChange={(e) => {
                      setDesignation(gstInput.designation(e.target.value))
                      if (errors.designation) setErrors((prev) => ({ ...prev, designation: '' }))
                    }}
                    className={`gst-amend-text-input ${errors.designation ? 'has-error' : ''}`}
                  />
                  {errors.designation && <span className="gst-amend-error-msg">{errors.designation}</span>}
                </div>
              </div>

              {/* Row 2: Signatory PAN & Signatory Mobile */}
              <div className="gst-amend-form-row">
                <div className="gst-amend-field-group">
                  <label htmlFor="sig-pan-input" className="gst-amend-field-label">
                    Signatory PAN <span className="gst-amend-star">*</span>
                  </label>
                  <input
                    id="sig-pan-input"
                    type="text"
                    placeholder="ABCDE1234F"
                    value={pan}
                    onChange={(e) => {
                      setPan(gstInput.pan(e.target.value))
                      if (errors.pan) setErrors((prev) => ({ ...prev, pan: '' }))
                    }}
                    className={`gst-amend-text-input ${errors.pan ? 'has-error' : ''}`}
                  />
                  {errors.pan && <span className="gst-amend-error-msg">{errors.pan}</span>}
                </div>

                <div className="gst-amend-field-group">
                  <label htmlFor="sig-mobile-input" className="gst-amend-field-label">
                    Signatory Mobile <span className="gst-amend-star">*</span>
                  </label>
                  <input
                    id="sig-mobile-input"
                    type="text"
                    placeholder="8749594844"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(gstInput.mobile(e.target.value))
                      if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }))
                    }}
                    className={`gst-amend-text-input ${errors.mobile ? 'has-error' : ''}`}
                  />
                  {errors.mobile && <span className="gst-amend-error-msg">{errors.mobile}</span>}
                </div>
              </div>

              {/* Row 3: Date of Birth & Signatory Email */}
              <div className="gst-amend-form-row">
                <div className="gst-amend-field-group">
                  <label htmlFor="sig-dob-input" className="gst-amend-field-label">
                    Date of Birth <span className="gst-amend-star">*</span>
                  </label>
                  <div className="gst-sig-dob-wrapper">
                    <input
                      ref={dateRef}
                      id="sig-dob-input"
                      type="date"
                      value={dob}
                      onChange={(e) => {
                        setDob(e.target.value)
                        if (errors.dob) setErrors((prev) => ({ ...prev, dob: '' }))
                      }}
                      className={`gst-amend-text-input gst-sig-date-input ${errors.dob ? 'has-error' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={handleCalendarClick}
                      className="gst-sig-calendar-btn"
                      aria-label="Open calendar"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </button>
                  </div>
                  {errors.dob && <span className="gst-amend-error-msg">{errors.dob}</span>}
                </div>

                <div className="gst-amend-field-group">
                  <label htmlFor="sig-email-input" className="gst-amend-field-label">
                    Signatory Email <span className="gst-amend-star">*</span>
                  </label>
                  <input
                    id="sig-email-input"
                    type="email"
                    placeholder="name@business.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(gstInput.email(e.target.value))
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
                    }}
                    className={`gst-amend-text-input ${errors.email ? 'has-error' : ''}`}
                  />
                  {errors.email && <span className="gst-amend-error-msg">{errors.email}</span>}
                </div>
              </div>
            </div>

            {/* Card 3: Supporting proof */}
            <GSTAmendmentProofUpload
              selectedFile={selectedFile}
              error={errors.file}
              onFileChange={handleFileChange}
              onRemoveFile={(e) => {
                e.stopPropagation()
                setSelectedFile(null)
              }}
            />

            {/* Bottom Actions Row (Left: Back, Right: Review Changes) */}
            <div className="gst-amend-detail-actions-row">
              <button type="button" onClick={onBack} className="gst-amend-back-pill-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
              </button>
              <div className="gst-actions-group">
                {onSaveDraft && <GSTSaveDraftButton onClick={onSaveDraft} />}
                <button type="submit" disabled={isSubmitting} className="gst-amend-submit-orange-btn">
                  {isSubmitting ? 'Submitting...' : 'Review Changes'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <GSTSignatoriesSidebar />
        </div>
      </form>
    </div>
  )
}

export default GSTSignatoriesForm
