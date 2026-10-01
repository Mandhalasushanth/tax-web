import React, { type ChangeEvent } from 'react'
import { gstInput } from '@modules/gst/utils/gstInputFormatters'
import type { GstBusinessFormData } from '../GSTStepBusiness/GSTStepBusiness'
import {
  CONSTITUTION_OF_BUSINESS_OPTIONS,
  NATURE_OF_BUSINESS_OPTIONS,
  REASON_FOR_REGISTRATION_OPTIONS,
  COMPOSITION_SCHEME_OPTIONS,
  PLACE_OF_BUSINESS_OPTIONS,
} from '@modules/gst/utils/gstBusinessDetails.constants'

export interface GSTBusinessGeneralSectionProps {
  data: Pick<
    GstBusinessFormData,
    | 'legalName'
    | 'tradeName'
    | 'constitution'
    | 'natureOfBusiness'
    | 'commencementDate'
    | 'registrationReason'
    | 'compositionScheme'
    | 'placeOfBusiness'
  >
  onChange: <K extends keyof GstBusinessFormData>(field: K, value: GstBusinessFormData[K]) => void
  errors?: Record<string, string>
  onClearError?: (field: string) => void
}

export const GSTBusinessGeneralSection: React.FC<GSTBusinessGeneralSectionProps> = ({
  data,
  onChange,
  errors = {},
  onClearError,
}) => {
  const handleLegalNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange('legalName', gstInput.businessName(e.target.value))
    onClearError?.('legalName')
  }

  const handleTradeNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange('tradeName', gstInput.businessName(e.target.value))
    onClearError?.('tradeName')
  }

  const handleConstitutionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange('constitution', e.target.value)
    onClearError?.('constitution')
  }

  const handleNatureOfBusinessChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange('natureOfBusiness', e.target.value)
    onClearError?.('natureOfBusiness')
  }

  const handleCommencementDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange('commencementDate', e.target.value)
    onClearError?.('commencementDate')
  }

  const handleRegistrationReasonChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange('registrationReason', e.target.value)
    onClearError?.('registrationReason')
  }

  const handleCompositionSchemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange('compositionScheme', e.target.value)
    onClearError?.('compositionScheme')
  }

  const handlePlaceOfBusinessChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange('placeOfBusiness', e.target.value)
    onClearError?.('placeOfBusiness')
  }

  return (
    <>
      {/* Row 1: Legal Name & Trade Name */}
      <div className="gst-form-grid gst-form-grid--2col">
        <div className="gst-form-group">
          <label htmlFor="legalName" className="gst-form-label">
            Legal Name of Business (as per PAN) <span className="gst-required-star">*</span>
          </label>
          <input
            id="legalName"
            type="text"
            className={`gst-form-input ${errors.legalName ? 'gst-input--error' : ''}`}
            placeholder="Exactly as on the PAN card"
            value={data.legalName}
            onChange={handleLegalNameChange}
            onBlur={() => onChange('legalName', data.legalName.trim())}
          />
          {errors.legalName && <span className="gst-field-error">{errors.legalName}</span>}
        </div>

        <div className="gst-form-group">
          <label htmlFor="tradeName" className="gst-form-label">
            Trade Name <span className="gst-required-star">*</span>
          </label>
          <input
            id="tradeName"
            type="text"
            className={`gst-form-input ${errors.tradeName ? 'gst-input--error' : ''}`}
            placeholder="Enter your business / trade name"
            value={data.tradeName}
            onChange={handleTradeNameChange}
            onBlur={() => onChange('tradeName', data.tradeName.trim())}
          />
          {errors.tradeName && <span className="gst-field-error">{errors.tradeName}</span>}
        </div>
      </div>

      {/* Row 2: Constitution of Business & Nature of Business */}
      <div className="gst-form-grid gst-form-grid--2col">
        <div className="gst-form-group">
          <label htmlFor="constitution" className="gst-form-label">
            Constitution of Business <span className="gst-required-star">*</span>
          </label>
          <div className="gst-select-wrapper">
            <select
              id="constitution"
              className={`gst-form-select ${errors.constitution ? 'gst-input--error' : ''}`}
              value={data.constitution}
              onChange={handleConstitutionChange}
            >
              <option value="">Select business type</option>
              {CONSTITUTION_OF_BUSINESS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="gst-select-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
          {errors.constitution && <span className="gst-field-error">{errors.constitution}</span>}
        </div>

        <div className="gst-form-group">
          <label htmlFor="natureOfBusiness" className="gst-form-label">
            Nature of Business <span className="gst-required-star">*</span>
          </label>
          <div className="gst-select-wrapper">
            <select
              id="natureOfBusiness"
              className={`gst-form-select ${errors.natureOfBusiness ? 'gst-input--error' : ''}`}
              value={data.natureOfBusiness}
              onChange={handleNatureOfBusinessChange}
            >
              <option value="">Select nature of business</option>
              {NATURE_OF_BUSINESS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="gst-select-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
          {errors.natureOfBusiness && <span className="gst-field-error">{errors.natureOfBusiness}</span>}
        </div>
      </div>

      {/* Row 3: Date of Commencement & Reason for Registration */}
      <div className="gst-form-grid gst-form-grid--2col">
        <div className="gst-form-group">
          <label htmlFor="commencementDate" className="gst-form-label">
            Date of Commencement of Business <span className="gst-required-star">*</span>
          </label>
          <div className="gst-date-input-wrapper">
            <input
              id="commencementDate"
              type="date"
              className={`gst-form-input gst-form-input--date ${errors.commencementDate ? 'gst-input--error' : ''}`}
              placeholder="DD-MM-YYYY"
              value={data.commencementDate}
              onChange={handleCommencementDateChange}
            />
          </div>
          {errors.commencementDate && <span className="gst-field-error">{errors.commencementDate}</span>}
        </div>

        <div className="gst-form-group">
          <label htmlFor="registrationReason" className="gst-form-label">
            Reason for Registration <span className="gst-required-star">*</span>
          </label>
          <div className="gst-select-wrapper">
            <select
              id="registrationReason"
              className={`gst-form-select ${errors.registrationReason ? 'gst-input--error' : ''}`}
              value={data.registrationReason}
              onChange={handleRegistrationReasonChange}
            >
              <option value="">Select a reason</option>
              {REASON_FOR_REGISTRATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="gst-select-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
          {errors.registrationReason && <span className="gst-field-error">{errors.registrationReason}</span>}
        </div>
      </div>

      {/* Row 4: Opting for Composition Scheme? & Place of Business */}
      <div className="gst-form-grid gst-form-grid--2col">
        <div className="gst-form-group">
          <label htmlFor="compositionScheme" className="gst-form-label">
            Opting for Composition Scheme? <span className="gst-required-star">*</span>
          </label>
          <div className="gst-select-wrapper">
            <select
              id="compositionScheme"
              className={`gst-form-select ${errors.compositionScheme ? 'gst-input--error' : ''}`}
              value={data.compositionScheme}
              onChange={handleCompositionSchemeChange}
            >
              <option value="">Select yes or no</option>
              {COMPOSITION_SCHEME_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="gst-select-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
          {errors.compositionScheme && <span className="gst-field-error">{errors.compositionScheme}</span>}
        </div>

        <div className="gst-form-group">
          <label htmlFor="placeOfBusiness" className="gst-form-label">
            Place of Business <span className="gst-required-star">*</span>
          </label>
          <div className="gst-select-wrapper">
            <select
              id="placeOfBusiness"
              className={`gst-form-select ${errors.placeOfBusiness ? 'gst-input--error' : ''}`}
              value={data.placeOfBusiness}
              onChange={handlePlaceOfBusinessChange}
            >
              <option value="">Select place type</option>
              {PLACE_OF_BUSINESS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="gst-select-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
          {errors.placeOfBusiness && <span className="gst-field-error">{errors.placeOfBusiness}</span>}
        </div>
      </div>
    </>
  )
}
