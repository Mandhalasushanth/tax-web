import React from 'react'
import type { SecurityItem } from '@modules/loans/types/projectFinance.types'
import {
  TYPE_OF_SECURITY_OPTIONS,
  OWNERSHIP_TYPE_OPTIONS,
} from './securityComplianceConstants'

export interface SecurityCollateralCardProps {
  item: SecurityItem
  index: number
  totalCount: number
  onChange: (updated: SecurityItem) => void
  onRemove: () => void
  onOpenPicker?: (field: 'typeOfSecurity' | 'ownershipType') => void
  errors?: Record<string, string>
}

export const SecurityCollateralCard: React.FC<SecurityCollateralCardProps> = ({
  item,
  index,
  totalCount,
  onChange,
  onRemove,
  errors = {},
}) => {
  const prefix = `security_${index}`

  const handleFieldChange = (field: keyof SecurityItem, val: string | boolean) => {
    onChange({ ...item, [field]: val })
  }

  const handleNumericInput = (field: keyof SecurityItem, rawValue: string) => {
    const sanitized = rawValue.replace(/\D/g, '')
    onChange({ ...item, [field]: sanitized })
  }

  return (
    <div className="pf-item-box" data-testid={`security-item-${index}`}>
      <div className="pf-item-box__header">
        <span className="pf-item-box__badge">Security #{index + 1}</span>
        {totalCount > 1 && (
          <button
            type="button"
            className="pf-item-box__remove-btn"
            onClick={onRemove}
            title="Remove Security"
          >
            &times;
          </button>
        )}
      </div>

      {/* Type of Security */}
      <div className="pf-field-group">
        <label htmlFor={`${prefix}_typeOfSecurity`} className="pf-field-label">
          Type of Security <span className="pf-required-star">*</span>
        </label>
        <select
          id={`${prefix}_typeOfSecurity`}
          className={`pf-custom-select ${errors[`${prefix}_typeOfSecurity`] ? 'pf-custom-select--error' : ''}`}
          value={item.typeOfSecurity || ''}
          onChange={(e) => handleFieldChange('typeOfSecurity', e.target.value)}
        >
          <option value="" disabled>Select security type</option>
          {TYPE_OF_SECURITY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors[`${prefix}_typeOfSecurity`] && (
          <span className="pf-field-error-msg">{errors[`${prefix}_typeOfSecurity`]}</span>
        )}
      </div>

      {/* Asset Description */}
      <div className="pf-field-group">
        <label htmlFor={`${prefix}_assetDescription`} className="pf-field-label">
          Asset Description <span className="pf-required-star">*</span>
        </label>
        <input
          id={`${prefix}_assetDescription`}
          type="text"
          className={`pf-custom-input ${errors[`${prefix}_assetDescription`] ? 'pf-custom-input--error' : ''}`}
          placeholder="Enter asset description"
          value={item.assetDescription || ''}
          onChange={(e) => handleFieldChange('assetDescription', e.target.value)}
        />
        {errors[`${prefix}_assetDescription`] && (
          <span className="pf-field-error-msg">{errors[`${prefix}_assetDescription`]}</span>
        )}
      </div>

      {/* Estimated Value */}
      <div className="pf-field-group">
        <label htmlFor={`${prefix}_estimatedValue`} className="pf-field-label">
          Estimated Value (₹) <span className="pf-required-star">*</span>
        </label>
        <input
          id={`${prefix}_estimatedValue`}
          type="text"
          className={`pf-custom-input ${errors[`${prefix}_estimatedValue`] ? 'pf-custom-input--error' : ''}`}
          placeholder="Enter amount"
          value={item.estimatedValue || ''}
          onChange={(e) => handleNumericInput('estimatedValue', e.target.value)}
        />
        {errors[`${prefix}_estimatedValue`] && (
          <span className="pf-field-error-msg">{errors[`${prefix}_estimatedValue`]}</span>
        )}
      </div>

      {/* Ownership Type */}
      <div className="pf-field-group">
        <label htmlFor={`${prefix}_ownershipType`} className="pf-field-label">
          Ownership Type <span className="pf-required-star">*</span>
        </label>
        <select
          id={`${prefix}_ownershipType`}
          className={`pf-custom-select ${errors[`${prefix}_ownershipType`] ? 'pf-custom-select--error' : ''}`}
          value={item.ownershipType || ''}
          onChange={(e) => handleFieldChange('ownershipType', e.target.value)}
        >
          <option value="" disabled>Select ownership type</option>
          {OWNERSHIP_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors[`${prefix}_ownershipType`] && (
          <span className="pf-field-error-msg">{errors[`${prefix}_ownershipType`]}</span>
        )}
      </div>

      {/* Location of Asset */}
      <div className="pf-field-group">
        <label htmlFor={`${prefix}_locationOfAsset`} className="pf-field-label">
          Location of Asset <span className="pf-required-star">*</span>
        </label>
        <input
          id={`${prefix}_locationOfAsset`}
          type="text"
          className={`pf-custom-input ${errors[`${prefix}_locationOfAsset`] ? 'pf-custom-input--error' : ''}`}
          placeholder="Enter location"
          value={item.locationOfAsset || ''}
          onChange={(e) => handleFieldChange('locationOfAsset', e.target.value)}
        />
        {errors[`${prefix}_locationOfAsset`] && (
          <span className="pf-field-error-msg">{errors[`${prefix}_locationOfAsset`]}</span>
        )}
      </div>

      {/* Valuation Report Available? */}
      <div className="pf-field-group">
        <label className="pf-field-label">
          Valuation Report Available? <span className="pf-required-star">*</span>
        </label>
        <div className="pf-radio-group">
          <label className="pf-radio-label">
            <input
              type="radio"
              name={`valuationReport_${index}`}
              className="pf-radio-input"
              checked={item.valuationReportAvailable === true}
              onChange={() => handleFieldChange('valuationReportAvailable', true)}
            />
            <span className="pf-radio-custom">
              <span className="pf-radio-custom-dot" />
            </span>
            <span>Yes</span>
          </label>
          <label className="pf-radio-label">
            <input
              type="radio"
              name={`valuationReport_${index}`}
              className="pf-radio-input"
              checked={item.valuationReportAvailable === false}
              onChange={() => handleFieldChange('valuationReportAvailable', false)}
            />
            <span className="pf-radio-custom">
              <span className="pf-radio-custom-dot" />
            </span>
            <span>No</span>
          </label>
        </div>
      </div>

      {/* Existing Charge? */}
      <div className="pf-field-group">
        <label className="pf-field-label">
          Existing Charge? <span className="pf-required-star">*</span>
        </label>
        <div className="pf-radio-group">
          <label className="pf-radio-label">
            <input
              type="radio"
              name={`existingCharge_${index}`}
              className="pf-radio-input"
              checked={item.existingCharge === true}
              onChange={() => handleFieldChange('existingCharge', true)}
            />
            <span className="pf-radio-custom">
              <span className="pf-radio-custom-dot" />
            </span>
            <span>Yes</span>
          </label>
          <label className="pf-radio-label">
            <input
              type="radio"
              name={`existingCharge_${index}`}
              className="pf-radio-input"
              checked={item.existingCharge === false}
              onChange={() => handleFieldChange('existingCharge', false)}
            />
            <span className="pf-radio-custom">
              <span className="pf-radio-custom-dot" />
            </span>
            <span>No</span>
          </label>
        </div>
      </div>

      {/* Existing Charge Details (conditional) */}
      {item.existingCharge && (
        <div className="pf-field-group">
          <label htmlFor={`${prefix}_existingChargeDetails`} className="pf-field-label">
            Existing Charge Details
          </label>
          <textarea
            id={`${prefix}_existingChargeDetails`}
            rows={3}
            className="pf-custom-textarea"
            placeholder="Describe the existing charge"
            value={item.existingChargeDetails || ''}
            onChange={(e) => handleFieldChange('existingChargeDetails', e.target.value)}
          />
        </div>
      )}
    </div>
  )
}
