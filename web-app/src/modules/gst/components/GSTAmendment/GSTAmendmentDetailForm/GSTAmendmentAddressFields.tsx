import React, { type ChangeEvent } from 'react'
import { INDIAN_STATES_AND_UTS } from '@modules/gst/utils/gstBusinessDetails.constants'
import './GSTAmendmentAddressFields.css'

interface GSTAmendmentAddressFieldsProps {
  isAdditionalPlace?: boolean
  address: string
  city: string
  district: string
  stateUt: string
  pinCode: string
  natureOfPremises: string
  errors: Record<string, string>
  onAddressChange: (val: string) => void
  onCityChange: (val: string) => void
  onDistrictChange: (val: string) => void
  onStateUtChange: (val: string) => void
  onPinCodeChange: (e: ChangeEvent<HTMLInputElement>) => void
  onNatureOfPremisesChange: (val: string) => void
}

const PREMISES_NATURE_OPTIONS = [
  'Owned',
  'Leased',
  'Rented',
  'Consent',
  'Shared',
  'Others',
]

export const GSTAmendmentAddressFields: React.FC<GSTAmendmentAddressFieldsProps> = ({
  isAdditionalPlace = false,
  address,
  city,
  district,
  stateUt,
  pinCode,
  natureOfPremises,
  errors,
  onAddressChange,
  onCityChange,
  onDistrictChange,
  onStateUtChange,
  onPinCodeChange,
  onNatureOfPremisesChange,
}) => {
  return (
    <div className="gst-amend-card-box">
      <h3 className="gst-amend-card-box__title">New details</h3>

      {/* Field 1: New Business Address / New Additional Place Address */}
      <div className="gst-amend-field-group">
        <label htmlFor="new-address-input" className="gst-amend-field-label">
          {isAdditionalPlace ? 'New Additional Place Address' : 'New Business Address'} <span className="gst-amend-star">*</span>
        </label>
        <input
          id="new-address-input"
          type="text"
          placeholder="Building, street, locality"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          className={`gst-amend-text-input ${errors.address ? 'has-error' : ''}`}
        />
        {errors.address && <span className="gst-amend-error-msg">{errors.address}</span>}
      </div>

      {isAdditionalPlace ? (
        <>
          {/* Additional Place Layout: City & PIN Code in 2-column row */}
          <div className="gst-amend-form-row">
            <div className="gst-amend-field-group">
              <label htmlFor="city-input" className="gst-amend-field-label">
                City <span className="gst-amend-star">*</span>
              </label>
              <input
                id="city-input"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                className={`gst-amend-text-input ${errors.city ? 'has-error' : ''}`}
              />
              {errors.city && <span className="gst-amend-error-msg">{errors.city}</span>}
            </div>

            <div className="gst-amend-field-group">
              <label htmlFor="pincode-input" className="gst-amend-field-label">
                PIN Code <span className="gst-amend-star">*</span>
              </label>
              <input
                id="pincode-input"
                type="text"
                placeholder="Enter 6 digits"
                maxLength={6}
                value={pinCode}
                onChange={onPinCodeChange}
                className={`gst-amend-text-input ${errors.pinCode ? 'has-error' : ''}`}
              />
              <div className="gst-amend-subrow-hint">
                {errors.pinCode ? (
                  <span className="gst-amend-error-msg">{errors.pinCode}</span>
                ) : (
                  <span />
                )}
                <span className="gst-amend-counter-hint">{pinCode.length} / 6 digits</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Principal Place Layout: City & District */}
          <div className="gst-amend-form-row">
            <div className="gst-amend-field-group">
              <label htmlFor="city-input" className="gst-amend-field-label">
                City <span className="gst-amend-star">*</span>
              </label>
              <input
                id="city-input"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                className={`gst-amend-text-input ${errors.city ? 'has-error' : ''}`}
              />
              {errors.city && <span className="gst-amend-error-msg">{errors.city}</span>}
            </div>

            <div className="gst-amend-field-group">
              <label htmlFor="district-input" className="gst-amend-field-label">
                District <span className="gst-amend-star">*</span>
              </label>
              <input
                id="district-input"
                type="text"
                placeholder="District"
                value={district}
                onChange={(e) => onDistrictChange(e.target.value)}
                className={`gst-amend-text-input ${errors.district ? 'has-error' : ''}`}
              />
              {errors.district && <span className="gst-amend-error-msg">{errors.district}</span>}
            </div>
          </div>

          {/* Row 3: State / UT & PIN Code */}
          <div className="gst-amend-form-row">
            <div className="gst-amend-field-group">
              <label htmlFor="state-ut-select" className="gst-amend-field-label">
                State / UT <span className="gst-amend-star">*</span>
              </label>
              <div className="gst-amend-select-wrapper">
                <select
                  id="state-ut-select"
                  value={stateUt}
                  onChange={(e) => onStateUtChange(e.target.value)}
                  className={`gst-amend-select-input ${errors.stateUt ? 'has-error' : ''}`}
                >
                  <option value="">Select an option</option>
                  {INDIAN_STATES_AND_UTS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <span className="gst-amend-select-chevron" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>
              {errors.stateUt && <span className="gst-amend-error-msg">{errors.stateUt}</span>}
            </div>

            <div className="gst-amend-field-group">
              <label htmlFor="pincode-input" className="gst-amend-field-label">
                PIN Code <span className="gst-amend-star">*</span>
              </label>
              <input
                id="pincode-input"
                type="text"
                placeholder="560001"
                maxLength={6}
                value={pinCode}
                onChange={onPinCodeChange}
                className={`gst-amend-text-input ${errors.pinCode ? 'has-error' : ''}`}
              />
              <div className="gst-amend-subrow-hint">
                {errors.pinCode ? (
                  <span className="gst-amend-error-msg">{errors.pinCode}</span>
                ) : (
                  <span />
                )}
                <span className="gst-amend-counter-hint">{pinCode.length} / 6 digits</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Nature of Premises */}
      <div className="gst-amend-field-group">
        <label htmlFor="premises-nature-select" className="gst-amend-field-label">
          Nature of Premises <span className="gst-amend-star">*</span>
        </label>
        <div className="gst-amend-select-wrapper">
          <select
            id="premises-nature-select"
            value={natureOfPremises}
            onChange={(e) => onNatureOfPremisesChange(e.target.value)}
            className={`gst-amend-select-input ${errors.natureOfPremises ? 'has-error' : ''}`}
          >
            <option value="">Select an option</option>
            {PREMISES_NATURE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className="gst-amend-select-chevron" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
        {errors.natureOfPremises && (
          <span className="gst-amend-error-msg">{errors.natureOfPremises}</span>
        )}
      </div>
    </div>
  )
}

export default GSTAmendmentAddressFields
