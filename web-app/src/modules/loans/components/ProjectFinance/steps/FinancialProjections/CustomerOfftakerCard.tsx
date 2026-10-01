import React from 'react'
import { formatCurrencyString } from '@modules/loans/utils/loanInputFormatters'
import type { CustomerOfftakerItem } from '@modules/loans/types/projectFinance.types'
import {
  CUSTOMER_TYPE_OPTIONS,
  UNIT_OPTIONS,
  AGREEMENT_STATUS_OPTIONS,
} from './financialProjectionsConstants'

export interface CustomerOfftakerCardProps {
  item: CustomerOfftakerItem
  index: number
  totalCount: number
  onChange: (updated: CustomerOfftakerItem) => void
  onRemove: () => void
  onOpenPicker?: (field: 'customerType' | 'unit' | 'agreementStatus') => void
  errors?: Record<string, string>
}

export const CustomerOfftakerCard: React.FC<CustomerOfftakerCardProps> = ({
  item,
  index,
  totalCount,
  onChange,
  onRemove,
  errors = {},
}) => {
  const prefix = `customer_${index}`

  const handleTextInput = (field: keyof CustomerOfftakerItem, value: string) => {
    onChange({ ...item, [field]: value })
  }

  const handleAmountInput = (field: keyof CustomerOfftakerItem, rawValue: string) => {
    onChange({ ...item, [field]: formatCurrencyString(rawValue) })
  }

  const handleNumericInput = (field: keyof CustomerOfftakerItem, value: string) => {
    const sanitized = value.replace(/\D/g, '')
    onChange({ ...item, [field]: sanitized })
  }

  const handleContractChange = (val: boolean) => {
    onChange({ ...item, isContractAvailable: val })
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
        <select
          id={`${prefix}_customerType`}
          className={`pf-custom-select ${errors[`${prefix}_customerType`] ? 'pf-custom-select--error' : ''}`}
          value={item.customerType || ''}
          onChange={(e) => handleTextInput('customerType', e.target.value)}
        >
          <option value="" disabled>Select customer type</option>
          {CUSTOMER_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
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
          <select
            id={`${prefix}_unit`}
            className={`pf-custom-select ${errors[`${prefix}_unit`] ? 'pf-custom-select--error' : ''}`}
            value={item.unit || ''}
            onChange={(e) => handleTextInput('unit', e.target.value)}
          >
            <option value="" disabled>Select unit</option>
            {UNIT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
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
            onChange={(e) => handleAmountInput('expectedRevenue', e.target.value)}
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
            onChange={(e) => handleAmountInput('contractedPrice', e.target.value)}
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
          <select
            id={`${prefix}_agreementStatus`}
            className="pf-custom-select"
            value={item.agreementStatus || ''}
            onChange={(e) => handleTextInput('agreementStatus', e.target.value)}
          >
            <option value="" disabled>Select status</option>
            {AGREEMENT_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
