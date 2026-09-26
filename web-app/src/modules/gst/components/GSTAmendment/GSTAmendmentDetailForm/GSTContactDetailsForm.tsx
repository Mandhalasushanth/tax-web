import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import GSTAmendmentProofUpload from './GSTAmendmentProofUpload'
import './GSTContactDetailsForm.css'

interface GSTContactDetailsFormProps {
  currentDetails?: {
    mobile: string
    email: string
  }
  isSubmitting?: boolean
  onBack: () => void
  onSubmit: (payload: {
    newValue: string
    file: File | null
    contactDetails?: Record<string, string>
  }) => void
}

const DEFAULT_CONTACT_DETAILS = {
  mobile: '+91 98765 43210',
  email: 'akhil@business.com',
}

const ACCEPTED_PROOFS = [
  'Official government/business registration document showing the updated contact details',
  'Official government correspondence showing the updated contact details',
  'Other supporting document showing the contact detail change',
  'Board Resolution / Authorization for contact update',
  'Utility Bill in the name of the entity / authorized person',
  'Other official document evidencing the contact detail change',
]

export const GSTContactDetailsForm: React.FC<GSTContactDetailsFormProps> = ({
  currentDetails = DEFAULT_CONTACT_DETAILS,
  isSubmitting = false,
  onBack,
  onSubmit,
}) => {
  const [mobileNumber, setMobileNumber] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: 'File size must be under 10 MB.' }))
        return
      }
      setSelectedFile(file)
      setErrors((prev) => ({ ...prev, file: '' }))
    }
  }

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Please enter new mobile number.'
    } else if (!/^\d{10}$/.test(mobileNumber.trim())) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.'
    }

    if (!emailAddress.trim()) {
      newErrors.emailAddress = 'Please enter new email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.trim())) {
      newErrors.emailAddress = 'Please enter a valid email address.'
    }

    if (!selectedFile) {
      newErrors.file = 'Please upload a supporting proof document.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const formattedMobile = `+91 ${mobileNumber.trim()}`
    const formattedEmail = emailAddress.trim()
    const formattedNewValue = `${formattedMobile} · ${formattedEmail}`

    setErrors({})
    onSubmit({
      newValue: formattedNewValue,
      file: selectedFile,
      contactDetails: {
        mobile: formattedMobile,
        email: formattedEmail,
      },
    })
  }

  return (
    <div className="gst-amend-detail-container gst-amend-contact-container">
      {/* Header */}
      <div className="gst-amend-detail-header">
        <h1 className="gst-amend-detail-title">Contact Details</h1>
        <p className="gst-amend-detail-subtitle">Current details are read-only</p>
      </div>

      <form onSubmit={handleSubmitForm} noValidate>
        {/* Card 1: Currently registered (read-only) */}
        <div className="gst-amend-contact-readonly-card">
          <h3 className="gst-amend-contact-readonly-title">Currently registered (read-only)</h3>
          <div className="gst-amend-contact-readonly-grid">
            <div className="gst-amend-contact-readonly-item">
              <div className="gst-amend-contact-readonly-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="gst-amend-contact-readonly-text">
                <span className="gst-amend-contact-readonly-label">Mobile</span>
                <span className="gst-amend-contact-readonly-val">{currentDetails.mobile}</span>
              </div>
            </div>

            <div className="gst-amend-contact-readonly-item">
              <div className="gst-amend-contact-readonly-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="gst-amend-contact-readonly-text">
                <span className="gst-amend-contact-readonly-label">Email</span>
                <span className="gst-amend-contact-readonly-val">{currentDetails.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: New details */}
        <div className="gst-amend-card-box">
          <h3 className="gst-amend-card-box__title">New details</h3>
          <div className="gst-amend-form-row">
            {/* New Mobile Number */}
            <div className="gst-amend-field-group">
              <label htmlFor="new-mobile-input" className="gst-amend-field-label">
                New Mobile Number <span className="gst-amend-star">*</span>
              </label>
              <div className="gst-amend-contact-input-wrapper">
                <span className="gst-amend-contact-prefix">+91</span>
                <input
                  id="new-mobile-input"
                  type="text"
                  placeholder="Enter mobile number"
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
                    if (errors.mobileNumber) setErrors((prev) => ({ ...prev, mobileNumber: '' }))
                  }}
                  className={`gst-amend-contact-input ${errors.mobileNumber ? 'has-error' : ''}`}
                />
              </div>
              {errors.mobileNumber && <span className="gst-amend-error-msg">{errors.mobileNumber}</span>}
            </div>

            {/* New Email Address */}
            <div className="gst-amend-field-group">
              <label htmlFor="new-email-input" className="gst-amend-field-label">
                New Email Address <span className="gst-amend-star">*</span>
              </label>
              <div className="gst-amend-contact-input-wrapper">
                <div className="gst-amend-contact-email-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <input
                  id="new-email-input"
                  type="email"
                  placeholder="Enter email address"
                  value={emailAddress}
                  onChange={(e) => {
                    setEmailAddress(e.target.value)
                    if (errors.emailAddress) setErrors((prev) => ({ ...prev, emailAddress: '' }))
                  }}
                  className={`gst-amend-contact-input gst-amend-contact-input--email ${errors.emailAddress ? 'has-error' : ''}`}
                />
              </div>
              {errors.emailAddress && <span className="gst-amend-error-msg">{errors.emailAddress}</span>}
            </div>
          </div>
        </div>

        {/* Section 3: Supporting proof & Accepted proofs (2-column layout) */}
        <div className="gst-amend-contact-proof-grid">
          {/* Left Side: Supporting proof upload */}
          <div className="gst-amend-contact-proof-left">
            <GSTAmendmentProofUpload
              selectedFile={selectedFile}
              error={errors.file}
              onFileChange={handleFileChange}
              onRemoveFile={(e) => {
                e.stopPropagation()
                setSelectedFile(null)
              }}
            />
          </div>

          {/* Right Side: Accepted proofs card */}
          <div className="gst-amend-contact-accepted-card">
            <div className="gst-amend-contact-accepted-header">
              <div className="gst-amend-contact-accepted-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <h4 className="gst-amend-contact-accepted-title">Accepted proofs</h4>
            </div>

            <ul className="gst-amend-contact-accepted-list">
              {ACCEPTED_PROOFS.map((proofText) => (
                <li key={proofText} className="gst-amend-contact-accepted-item">
                  <span className="gst-amend-contact-check-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                  <span className="gst-amend-contact-item-text">{proofText}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Actions Row (Left: Back, Right: Review Changes) */}
        <div className="gst-amend-detail-actions-row">
          <button type="button" onClick={onBack} className="gst-amend-back-pill-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>

          <button type="submit" disabled={isSubmitting} className="gst-amend-submit-orange-btn">
            {isSubmitting ? 'Submitting...' : 'Review Changes'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default GSTContactDetailsForm
