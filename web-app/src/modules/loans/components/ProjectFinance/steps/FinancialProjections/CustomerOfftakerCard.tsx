import React from 'react'
import type { CustomerOfftakerItem } from '../../../../types/projectFinance.types'

export interface CustomerOfftakerCardProps {
  item: CustomerOfftakerItem
  index: number
  totalCount: number
  onChange: (updated: CustomerOfftakerItem) => void
  onRemove: () => void
  onOpenPicker: (field: 'customerType' | 'unit' | 'agreementStatus') => void
  errors?: Record<string, string>
}

export const CustomerOfftakerCard: React.FC<CustomerOfftakerCardProps> = ({
  item,
  index,
  totalCount,
  onChange,
  onRemove,
  onOpenPicker,
  errors = {},
}) => {
  const prefix = `customer_${index}`

  const handleTextInput = (field: keyof CustomerOfftakerItem, value: string) => {
    try {
      onChange({ ...item, [field]: value })
    } catch (err) {
      console.error(`Error updating customer field ${field}:`, err)
    }
  }

  const handleNumericInput = (field: keyof CustomerOfftakerItem, value: string) => {
    try {
      const sanitized = value.replace(/\D/g, '')
      onChange({ ...item, [field]: sanitized })
    } catch (err) {
      console.error(`Error updating customer numeric field ${field}:`, err)
    }
  }

  const handleContractChange = (val: boolean) => {
    try {
      onChange({ ...item, isContractAvailable: val })
    } catch (err) {
      console.error('Error changing contract status:', err)
    }
  }

  return (
    <div className="pf-inner-item-card">
      <div className="pf-inner-item-card__header">
        <h3 className="pf-inner-item-card__title">Customer {index + 1}</h3>
        {totalCount > 1 && (
          <button
            type="button"
            className="pf-inner-remove-btn"
            onClick={onRemove}
            aria-label={`Remove customer ${index + 1}`}
          >
            Remove
          </button>
        )}
      </div>

      <div className="pf-field-group">
        <label htmlFor={`${prefix}_customerName`} className="pf-field-label">
          Customer / Offtaker Name <span className="pf-required-star">*</span>
        </label>
        <input
          id={`${prefix}_customerName`}
          type="text"
          className={`pf-custom-input ${errors[`${prefix}_customerName`] ? 'pf-custom-input--error' : ''}`}
          placeholder="Enter customer name"
          value={item.customerName || ''}
          onChange={(e) => handleTextInput('customerName', e.target.value)}
        />
        {errors[`${prefix}_customerName`] && (
          <span className="pf-field-error-msg">{errors[`${prefix}_customerName`]}</span>
        )}
      </div>

      <div className="pf-field-group">
        <label htmlFor={`${prefix}_customerType`} className="pf-field-label">
          Customer Type <span className="pf-required-star">*</span>
        </label>
        <button
          id={`${prefix}_customerType`}
          type="button"
          className={`pf-custom-select-btn ${errors[`${prefix}_customerType`] ? 'pf-custom-select-btn--error' : ''}`}
          onClick={() => onOpenPicker('customerType')}
        >
          <span className={item.customerType ? 'pf-select-value' : 'pf-select-placeholder'}>
            {item.customerType || 'Select customer type'}
          </span>
          <span className="pf-select-chevron">
            <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
          </span>
        </button>
        {errors[`${prefix}_customerType`] && (
          <span className="pf-field-error-msg">{errors[`${prefix}_customerType`]}</span>
        )}
      </div>

      <div className="pf-grid-2">
        <div className="pf-field-group">
          <label htmlFor={`${prefix}_expectedPurchaseQuantity`} className="pf-field-label">
            Expected Purchase Quantity <span className="pf-required-star">*</span>
          </label>
          <input
            id={`${prefix}_expectedPurchaseQuantity`}
            type="text"
            className={`pf-custom-input ${errors[`${prefix}_expectedPurchaseQuantity`] ? 'pf-custom-input--error' : ''}`}
            placeholder="Enter quantity"
            value={item.expectedPurchaseQuantity || ''}
            onChange={(e) => handleNumericInput('expectedPurchaseQuantity', e.target.value)}
          />
          {errors[`${prefix}_expectedPurchaseQuantity`] && (
            <span className="pf-field-error-msg">{errors[`${prefix}_expectedPurchaseQuantity`]}</span>
          )}
        </div>

        <div className="pf-field-group">
          <label htmlFor={`${prefix}_unit`} className="pf-field-label">
            Unit <span className="pf-required-star">*</span>
          </label>
          <button
            id={`${prefix}_unit`}
            type="button"
            className={`pf-custom-select-btn ${errors[`${prefix}_unit`] ? 'pf-custom-select-btn--error' : ''}`}
            onClick={() => onOpenPicker('unit')}
          >
            <span className={item.unit ? 'pf-select-value' : 'pf-select-placeholder'}>
              {item.unit || 'Select unit'}
            </span>
            <span className="pf-select-chevron">
              <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
            </span>
          </button>
          {errors[`${prefix}_unit`] && (
            <span className="pf-field-error-msg">{errors[`${prefix}_unit`]}</span>
          )}
        </div>
      </div>

      <div className="pf-grid-2">
        <div className="pf-field-group">
          <label htmlFor={`${prefix}_expectedRevenue`} className="pf-field-label">
            Expected Revenue (₹) <span className="pf-required-star">*</span>
          </label>
          <input
            id={`${prefix}_expectedRevenue`}
            type="text"
            className={`pf-custom-input ${errors[`${prefix}_expectedRevenue`] ? 'pf-custom-input--error' : ''}`}
            placeholder="Enter amount"
            value={item.expectedRevenue || ''}
            onChange={(e) => handleNumericInput('expectedRevenue', e.target.value)}
          />
          {errors[`${prefix}_expectedRevenue`] && (
            <span className="pf-field-error-msg">{errors[`${prefix}_expectedRevenue`]}</span>
          )}
        </div>

        <div className="pf-field-group">
          <label className="pf-field-label">
            Contract Available? <span className="pf-required-star">*</span>
          </label>
          <div className="pf-radio-group">
            <label className="pf-radio-label">
              <input
                type="radio"
                name={`contract_${item.id}`}
                className="pf-radio-input"
                checked={item.isContractAvailable === true}
                onChange={() => handleContractChange(true)}
              />
              <span className="pf-radio-custom">
                <span className="pf-radio-custom-dot" />
              </span>
              <span>Yes</span>
            </label>

            <label className="pf-radio-label">
              <input
                type="radio"
                name={`contract_${item.id}`}
                className="pf-radio-input"
                checked={item.isContractAvailable === false}
                onChange={() => handleContractChange(false)}
              />
              <span className="pf-radio-custom">
                <span className="pf-radio-custom-dot" />
              </span>
              <span>No</span>
            </label>
          </div>
        </div>
      </div>

      <div className="pf-grid-2">
        <div className="pf-field-group">
          <label htmlFor={`${prefix}_contractPeriodYears`} className="pf-field-label">
            Contract Period (Years)
          </label>
          <input
            id={`${prefix}_contractPeriodYears`}
            type="text"
            className="pf-custom-input"
            placeholder="Enter years"
            value={item.contractPeriodYears || ''}
            onChange={(e) => handleNumericInput('contractPeriodYears', e.target.value)}
          />
        </div>

        <div className="pf-field-group">
          <label htmlFor={`${prefix}_contractedPrice`} className="pf-field-label">
            Contracted Price (₹)
          </label>
          <input
            id={`${prefix}_contractedPrice`}
            type="text"
            className="pf-custom-input"
            placeholder="Enter price"
            value={item.contractedPrice || ''}
            onChange={(e) => handleNumericInput('contractedPrice', e.target.value)}
          />
        </div>
      </div>

      <div className="pf-grid-2">
        <div className="pf-field-group">
          <label htmlFor={`${prefix}_minimumOfftake`} className="pf-field-label">
            Minimum Offtake
          </label>
          <input
            id={`${prefix}_minimumOfftake`}
            type="text"
            className="pf-custom-input"
            placeholder="Enter quantity"
            value={item.minimumOfftake || ''}
            onChange={(e) => handleTextInput('minimumOfftake', e.target.value)}
          />
        </div>

        <div className="pf-field-group">
          <label htmlFor={`${prefix}_agreementStatus`} className="pf-field-label">
            Agreement Status
          </label>
          <button
            id={`${prefix}_agreementStatus`}
            type="button"
            className="pf-custom-select-btn"
            onClick={() => onOpenPicker('agreementStatus')}
          >
            <span className={item.agreementStatus ? 'pf-select-value' : 'pf-select-placeholder'}>
              {item.agreementStatus || 'Select status'}
            </span>
            <span className="pf-select-chevron">
              <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
