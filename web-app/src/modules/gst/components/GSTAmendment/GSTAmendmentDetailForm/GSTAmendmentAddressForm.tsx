import { GSTSaveDraftButton } from '@modules/gst/shared/GSTSaveDraftButton'
import { GST_FILE_MESSAGES, gstFileSizeError } from '@modules/gst/utils/gstFile'
import { collectGstErrors } from '@modules/gst/validation/gstFieldRules'
import React, { useState, type ChangeEvent, type FormEvent, useMemo } from 'react'
import { gstInput } from '@modules/gst/utils/gstInputFormatters'
import { gstFieldRules as rules } from '@modules/gst/validation/gstFieldRules'
import { getCurrentAddressDetails } from '@modules/gst/services/gstProfileDetails'
import GSTAmendmentProofsCard from './GSTAmendmentProofsCard'
import GSTAmendmentAddressFields from './GSTAmendmentAddressFields'
import GSTAmendmentProofUpload from './GSTAmendmentProofUpload'
import './GSTAmendmentDetailForm.css'

export interface AddressDetails {
  address: string
  city: string
  district?: string
  state?: string
  pinCode: string
  natureOfPremises?: string
}

interface GSTAmendmentAddressFormProps {
  title?: string
  currentDetails?: AddressDetails
  isSubmitting?: boolean
  onBack: () => void
  onSaveDraft?: () => void
  onSubmit: (payload: { newValue: string; file: File | null; addressDetails?: AddressDetails }) => void
}

import {
  ADDITIONAL_PROOFS,
  PRINCIPAL_PROOFS,
} from './gstAmendmentAddress.constants'

export const GSTAmendmentAddressForm: React.FC<GSTAmendmentAddressFormProps> = ({
  title = 'Principal Place of Business',
  currentDetails,
  isSubmitting = false,
  onBack,
  onSubmit,
  onSaveDraft,
}) => {
  const isAdditionalPlace = title === 'Additional Place of Business'
  const activeDetails = useMemo(
    () => currentDetails || getCurrentAddressDetails(isAdditionalPlace),
    [currentDetails, isAdditionalPlace]
  )

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [stateUt, setStateUt] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [natureOfPremises, setNatureOfPremises] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handlePinCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '')
    if (val.length <= 6) {
      setPinCode(val)
      if (errors.pinCode) setErrors((prev) => ({ ...prev, pinCode: '' }))
    }
  }

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

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    const newErrors = collectGstErrors({
      address: rules.address('Business address')(address),
      city: rules.placeName('City')(city),
      district: isAdditionalPlace ? undefined : rules.placeName('District')(district),
      stateUt: isAdditionalPlace || stateUt ? undefined : 'Please select state / UT.',
      pinCode: rules.pinCode(pinCode),
    })
    if (!natureOfPremises) newErrors.natureOfPremises = 'Please select nature of premises.'
    if (!selectedFile) newErrors.file = GST_FILE_MESSAGES.proofRequired

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const formattedNewValue = isAdditionalPlace
      ? `${address.trim()}, ${city.trim()} - ${pinCode} (${natureOfPremises})`
      : `${address.trim()}, ${city.trim()}, ${district.trim()}, ${stateUt} - ${pinCode} (${natureOfPremises})`

    const addressDetailsData: AddressDetails = {
      address: address.trim(),
      city: city.trim(),
      district: district.trim(),
      state: stateUt,
      pinCode: pinCode.trim(),
      natureOfPremises,
    }

    setErrors({})
    onSubmit({
      newValue: formattedNewValue,
      file: selectedFile,
      addressDetails: addressDetailsData,
    })
  }

  return (
    <div className="gst-amend-detail-container">
      {/* Header Row */}
      <div className="gst-amend-detail-header-row">
        <div className="gst-amend-detail-header">
          <div className="gst-amend-title-with-icon">
            {isAdditionalPlace && (
              <div className="gst-amend-title-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
            )}
            <div>
              <h1 className="gst-amend-detail-title">{title}</h1>
              <p className="gst-amend-detail-subtitle">
                Current details are read-only. Update the new details below.
              </p>
            </div>
          </div>
        </div>

        {isAdditionalPlace && (
          <div className="gst-amend-additional-notice-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gst-amend-notice-icon">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>
              You are updating an additional place of business. This is an extra business location apart from your principal place of business.
            </span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmitForm} noValidate>
        <div className="gst-amend-detail-grid">
          <main className="gst-amend-detail-main">
            {/* Card 1: Read-only */}
            <div className="gst-amend-card-box">
              <div className="gst-amend-card-box__header-flex">
                {isAdditionalPlace && (
                  <div className="gst-amend-card-header-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                )}
                <h3 className="gst-amend-card-box__title">Currently registered (read-only)</h3>
              </div>

              {isAdditionalPlace ? (
                <div className="gst-amend-readonly-2col-grid">
                  <div className="gst-amend-readonly-col-item">
                    <span className="gst-amend-readonly-label">Address</span>
                    <span className="gst-amend-readonly-value">{activeDetails.address}</span>
                  </div>
                  <div className="gst-amend-readonly-col-item">
                    <span className="gst-amend-readonly-label">PIN Code</span>
                    <span className="gst-amend-readonly-value">{activeDetails.pinCode}</span>
                  </div>
                  <div className="gst-amend-readonly-col-item">
                    <span className="gst-amend-readonly-label">City</span>
                    <span className="gst-amend-readonly-value">{activeDetails.city}</span>
                  </div>
                  <div className="gst-amend-readonly-col-item">
                    <span className="gst-amend-readonly-label">Nature of Premises</span>
                    <span className="gst-amend-readonly-value">{activeDetails.natureOfPremises || 'Warehouse'}</span>
                  </div>
                </div>
              ) : (
                <div className="gst-amend-readonly-multiline-list">
                  <div className="gst-amend-readonly-row">
                    <span className="gst-amend-readonly-label">Address</span>
                    <span className="gst-amend-readonly-value">{activeDetails.address}</span>
                  </div>
                  <div className="gst-amend-readonly-row">
                    <span className="gst-amend-readonly-label">City</span>
                    <span className="gst-amend-readonly-value">{activeDetails.city}</span>
                  </div>
                  <div className="gst-amend-readonly-row">
                    <span className="gst-amend-readonly-label">District</span>
                    <span className="gst-amend-readonly-value">{activeDetails.district || '—'}</span>
                  </div>
                  <div className="gst-amend-readonly-row">
                    <span className="gst-amend-readonly-label">State</span>
                    <span className="gst-amend-readonly-value">{activeDetails.state || '—'}</span>
                  </div>
                  <div className="gst-amend-readonly-row">
                    <span className="gst-amend-readonly-label">PIN Code</span>
                    <span className="gst-amend-readonly-value">{activeDetails.pinCode}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Card 2: New details */}
            <GSTAmendmentAddressFields
              isAdditionalPlace={isAdditionalPlace}
              address={address}
              city={city}
              district={district}
              stateUt={stateUt}
              pinCode={pinCode}
              natureOfPremises={natureOfPremises}
              errors={errors}
              onAddressChange={(val) => {
                setAddress(gstInput.address(val))
                if (errors.address) setErrors((prev) => ({ ...prev, address: '' }))
              }}
              onCityChange={(val) => {
                setCity(gstInput.letters(val, 50))
                if (errors.city) setErrors((prev) => ({ ...prev, city: '' }))
              }}
              onDistrictChange={(val) => {
                setDistrict(gstInput.letters(val, 50))
                if (errors.district) setErrors((prev) => ({ ...prev, district: '' }))
              }}
              onStateUtChange={(val) => {
                setStateUt(val)
                if (errors.stateUt) setErrors((prev) => ({ ...prev, stateUt: '' }))
              }}
              onPinCodeChange={handlePinCodeChange}
              onNatureOfPremisesChange={(val) => {
                setNatureOfPremises(val)
                if (errors.natureOfPremises) setErrors((prev) => ({ ...prev, natureOfPremises: '' }))
              }}
            />

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
          </main>

          {/* Right Column */}
          <GSTAmendmentProofsCard
            showImportantInfo={true}
            proofs={isAdditionalPlace ? ADDITIONAL_PROOFS : PRINCIPAL_PROOFS}
          />
        </div>

        {/* Bottom Actions Row */}
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
      </form>
    </div>
  )
}

export default GSTAmendmentAddressForm
