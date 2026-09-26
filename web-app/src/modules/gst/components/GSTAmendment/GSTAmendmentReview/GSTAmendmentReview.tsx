import React, { useState } from 'react'
import { getAddressRows, getBankRows, getContactRows, getSignatoryRows, type RowItem } from './getComparisonRows'
import './GSTAmendmentReview.css'

export interface AddressDetailsItem {
  address: string
  city: string
  district?: string
  state?: string
  pinCode: string
  natureOfPremises?: string
}

export interface BankDetailsItem {
  bankName: string
  accountNumber: string
  confirmAccountNumber?: string
  ifscCode: string
  accountType: string
}

export interface SignatoryDetailsItem {
  name: string
  designation: string
  pan: string
  mobile: string
  dob?: string
  email: string
}

export interface ContactDetailsItem {
  mobile: string
  email: string
}

interface GSTAmendmentReviewProps {
  gstin?: string
  sectionTitle?: string
  amendmentType?: 'core' | 'non_core'
  currentValue?: string
  requestedValue?: string
  currentAddressDetails?: AddressDetailsItem
  requestedAddressDetails?: AddressDetailsItem
  currentBankDetails?: BankDetailsItem
  requestedBankDetails?: BankDetailsItem
  currentSignatoryDetails?: SignatoryDetailsItem
  requestedSignatoryDetails?: SignatoryDetailsItem
  currentContactDetails?: ContactDetailsItem
  requestedContactDetails?: ContactDetailsItem
  fileName?: string
  fileSizeText?: string
  uploadDateText?: string
  isSubmitting?: boolean
  onBack: () => void
  onSubmit: () => void
}

export const GSTAmendmentReview: React.FC<GSTAmendmentReviewProps> = ({
  gstin = '29AAAAA0000A1Z6',
  sectionTitle = 'Additional Place of Business',
  amendmentType = 'core',
  currentValue = 'Peenya Industrial Area',
  requestedValue = 'Nellore',
  currentAddressDetails,
  requestedAddressDetails,
  currentBankDetails,
  requestedBankDetails,
  currentSignatoryDetails,
  requestedSignatoryDetails,
  currentContactDetails,
  requestedContactDetails,
  fileName = 'Screenshot_2026-09-16-09-49-45-99_f7.png',
  fileSizeText = '0.5 MB',
  isSubmitting = false,
  onBack,
  onSubmit,
}) => {
  const [isDeclared, setIsDeclared] = useState(false)
  const [declarationError, setDeclarationError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isDeclared) {
      setDeclarationError(true)
      return
    }
    setDeclarationError(false)
    onSubmit()
  }

  const typeLabel = amendmentType === 'core' ? 'Core (officer approval)' : 'Non-core (auto-approved)'
  const isAdditionalPlace = sectionTitle === 'Additional Place of Business'

  const currentRows: RowItem[] | null = currentContactDetails
    ? getContactRows(currentContactDetails)
    : currentSignatoryDetails
    ? getSignatoryRows(currentSignatoryDetails, false)
    : currentBankDetails
    ? getBankRows(currentBankDetails, false)
    : currentAddressDetails
    ? getAddressRows(currentAddressDetails, isAdditionalPlace, false)
    : null

  const requestedRows: RowItem[] | null = requestedContactDetails
    ? getContactRows(requestedContactDetails)
    : requestedSignatoryDetails
    ? getSignatoryRows(requestedSignatoryDetails, true)
    : requestedBankDetails
    ? getBankRows(requestedBankDetails, true)
    : requestedAddressDetails
    ? getAddressRows(requestedAddressDetails, isAdditionalPlace, true)
    : null


  const renderRows = (rows: RowItem[]) => (
    <div className="gst-amend-compare-rows">
      {rows.map((row) => (
        <div key={row.label} className="gst-amend-compare-row">
          <span className="gst-amend-compare-row-label">{row.label}</span>
          <span className="gst-amend-compare-row-val">{row.value}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="gst-amend-review-container">
      {/* Header */}
      <div className="gst-amend-review-header-flex">
        <div>
          <h1 className="gst-amend-review-title">Review Amendment</h1>
          <p className="gst-amend-review-subtitle">Current vs requested</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Section 1: Summary Table Card */}
        <div className="gst-amend-review-card gst-amend-meta-card">
          <div className="gst-amend-meta-col">
            <span className="gst-amend-meta-label">GSTIN</span>
            <span className="gst-amend-meta-value">{gstin}</span>
          </div>
          <div className="gst-amend-meta-col">
            <span className="gst-amend-meta-label">Section</span>
            <span className="gst-amend-meta-value">{sectionTitle}</span>
          </div>
          <div className="gst-amend-meta-col">
            <span className="gst-amend-meta-label">Type</span>
            <span className="gst-amend-meta-value gst-amend-meta-type">{typeLabel}</span>
          </div>
        </div>

        {/* Section 2: Current vs Requested Comparison Grid */}
        <div className="gst-amend-compare-grid">
          {/* Left Card: CURRENT */}
          <div className="gst-amend-compare-card gst-amend-compare-card--current">
            <span className="gst-amend-compare-badge gst-amend-compare-badge--current">CURRENT</span>
            {currentRows ? (
              renderRows(currentRows)
            ) : (
              <>
                <span className="gst-amend-compare-field-label">{sectionTitle}</span>
                <h3 className="gst-amend-compare-field-value">{currentValue}</h3>
              </>
            )}
          </div>

          {/* Right Card: REQUESTED */}
          <div className="gst-amend-compare-card gst-amend-compare-card--requested">
            <span className="gst-amend-compare-badge gst-amend-compare-badge--requested">REQUESTED</span>
            {requestedRows ? (
              renderRows(requestedRows)
            ) : (
              <>
                <span className="gst-amend-compare-field-label">{sectionTitle}</span>
                <h3 className="gst-amend-compare-field-value">{requestedValue}</h3>
              </>
            )}
          </div>
        </div>

        {/* Section 3: Supporting documents Card (WITHOUT DOWNLOAD OPTION) */}
        <div className="gst-amend-review-card">
          <h3 className="gst-amend-review-card-title">Supporting documents</h3>
          <div className="gst-amend-doc-box">
            <div className="gst-amend-doc-left flex-align-center">
              <div className="gst-amend-doc-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <span className="gst-amend-doc-name" title={fileName}>{fileName}</span>
            </div>
            <span className="gst-amend-doc-size-text">{fileSizeText}</span>
          </div>
        </div>

        {/* Section 4: Declaration Checkbox Card */}
        <div
          className={`gst-amend-declaration-card ${declarationError ? 'has-error' : ''}`}
          onClick={() => {
            setIsDeclared(!isDeclared)
            if (declarationError) setDeclarationError(false)
          }}
        >
          <div className="gst-amend-checkbox-wrap">
            <input
              type="checkbox"
              id="gst-declaration-check-review"
              checked={isDeclared}
              onChange={(e) => {
                setIsDeclared(e.target.checked)
                if (declarationError) setDeclarationError(false)
              }}
              className="gst-amend-custom-checkbox"
            />
          </div>
          <label
            htmlFor="gst-declaration-check-review"
            className="gst-amend-declaration-label"
            onClick={(e) => e.stopPropagation()}
          >
            I declare that the amendment details above are true and correct, and I authorise TaxEdge Fin Solutions to file this amendment on my behalf.
          </label>
        </div>

        {declarationError && (
          <span className="gst-amend-declaration-error">
            Please accept the declaration before submitting your request.
          </span>
        )}

        {/* Bottom Actions Row (Left: Back, Right: Submit Amendment Request) */}
        <div className="gst-amend-review-actions">
          <button type="button" onClick={onBack} className="gst-amend-review-back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>

          <button type="submit" disabled={isSubmitting} className="gst-amend-review-submit-btn">
            {isSubmitting ? 'Submitting...' : 'Submit Amendment Request'}
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

export default GSTAmendmentReview
