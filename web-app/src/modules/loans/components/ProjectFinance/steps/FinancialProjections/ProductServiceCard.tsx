import React from 'react'
import type { ProductServiceItem } from '../../../../types/projectFinance.types'

export interface ProductServiceCardProps {
  item: ProductServiceItem
  index: number
  totalCount: number
  onChange: (updated: ProductServiceItem) => void
  onRemove: () => void
  onOpenPicker: (field: 'category' | 'unit' | 'domesticExport') => void
  errors?: Record<string, string>
}

export const ProductServiceCard: React.FC<ProductServiceCardProps> = ({
  item,
  index,
  totalCount,
  onChange,
  onRemove,
  onOpenPicker,
  errors = {},
}) => {
  const prefix = `product_${index}`

  const handleFieldChange = (field: keyof ProductServiceItem, value: string) => {
    try {
      onChange({ ...item, [field]: value })
    } catch (err) {
      console.error(`Error updating product service field ${field}:`, err)
    }
  }

  const handleNumericFieldChange = (field: keyof ProductServiceItem, value: string) => {
    try {
      const sanitized = value.replace(/\D/g, '')
      onChange({ ...item, [field]: sanitized })
    } catch (err) {
      console.error(`Error updating product service numeric field ${field}:`, err)
    }
  }

  return (
    <div className="pf-inner-item-card">
      <div className="pf-inner-item-card__header">
        <h3 className="pf-inner-item-card__title">Product / Service {index + 1}</h3>
        {totalCount > 1 && (
          <button
            type="button"
            className="pf-inner-remove-btn"
            onClick={onRemove}
            aria-label={`Remove product service ${index + 1}`}
          >
            Remove
          </button>
        )}
      </div>

      <div className="pf-field-group">
        <label htmlFor={`${prefix}_name`} className="pf-field-label">
          Product / Service Name <span className="pf-required-star">*</span>
        </label>
        <input
          id={`${prefix}_name`}
          type="text"
          className={`pf-custom-input ${errors[`${prefix}_name`] ? 'pf-custom-input--error' : ''}`}
          placeholder="Enter product name"
          value={item.name || ''}
          onChange={(e) => handleFieldChange('name', e.target.value)}
        />
        {errors[`${prefix}_name`] && (
          <span className="pf-field-error-msg">{errors[`${prefix}_name`]}</span>
        )}
      </div>

      <div className="pf-field-group">
        <label htmlFor={`${prefix}_category`} className="pf-field-label">
          Category <span className="pf-required-star">*</span>
        </label>
        <button
          id={`${prefix}_category`}
          type="button"
          className={`pf-custom-select-btn ${errors[`${prefix}_category`] ? 'pf-custom-select-btn--error' : ''}`}
          onClick={() => onOpenPicker('category')}
        >
          <span className={item.category ? 'pf-select-value' : 'pf-select-placeholder'}>
            {item.category || 'Select category'}
          </span>
          <span className="pf-select-chevron">
            <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
          </span>
        </button>
        {errors[`${prefix}_category`] && (
          <span className="pf-field-error-msg">{errors[`${prefix}_category`]}</span>
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

      <div className="pf-grid-2">
        <div className="pf-field-group">
          <label htmlFor={`${prefix}_installedCapacity`} className="pf-field-label">
            Installed Capacity <span className="pf-required-star">*</span>
          </label>
          <input
            id={`${prefix}_installedCapacity`}
            type="text"
            className={`pf-custom-input ${errors[`${prefix}_installedCapacity`] ? 'pf-custom-input--error' : ''}`}
            placeholder="Enter capacity"
            value={item.installedCapacity || ''}
            onChange={(e) => handleNumericFieldChange('installedCapacity', e.target.value)}
          />
          {errors[`${prefix}_installedCapacity`] && (
            <span className="pf-field-error-msg">{errors[`${prefix}_installedCapacity`]}</span>
          )}
        </div>

        <div className="pf-field-group">
          <label htmlFor={`${prefix}_expectedProductionAnnual`} className="pf-field-label">
            Expected Production (Annual) <span className="pf-required-star">*</span>
          </label>
          <input
            id={`${prefix}_expectedProductionAnnual`}
            type="text"
            className={`pf-custom-input ${errors[`${prefix}_expectedProductionAnnual`] ? 'pf-custom-input--error' : ''}`}
            placeholder="Enter production"
            value={item.expectedProductionAnnual || ''}
            onChange={(e) => handleNumericFieldChange('expectedProductionAnnual', e.target.value)}
          />
          {errors[`${prefix}_expectedProductionAnnual`] && (
            <span className="pf-field-error-msg">{errors[`${prefix}_expectedProductionAnnual`]}</span>
          )}
        </div>
      </div>

      <div className="pf-grid-2">
        <div className="pf-field-group">
          <label htmlFor={`${prefix}_capacityUtilisationPercent`} className="pf-field-label">
            Capacity Utilisation (%) <span className="pf-required-star">*</span>
          </label>
          <input
            id={`${prefix}_capacityUtilisationPercent`}
            type="text"
            className={`pf-custom-input ${errors[`${prefix}_capacityUtilisationPercent`] ? 'pf-custom-input--error' : ''}`}
            placeholder="Enter percentage"
            value={item.capacityUtilisationPercent || ''}
            onChange={(e) => handleNumericFieldChange('capacityUtilisationPercent', e.target.value)}
          />
          {errors[`${prefix}_capacityUtilisationPercent`] && (
            <span className="pf-field-error-msg">{errors[`${prefix}_capacityUtilisationPercent`]}</span>
          )}
        </div>

        <div className="pf-field-group">
          <label htmlFor={`${prefix}_sellingPrice`} className="pf-field-label">
            Selling Price (₹) <span className="pf-required-star">*</span>
          </label>
          <input
            id={`${prefix}_sellingPrice`}
            type="text"
            className={`pf-custom-input ${errors[`${prefix}_sellingPrice`] ? 'pf-custom-input--error' : ''}`}
            placeholder="Enter price"
            value={item.sellingPrice || ''}
            onChange={(e) => handleNumericFieldChange('sellingPrice', e.target.value)}
          />
          {errors[`${prefix}_sellingPrice`] && (
            <span className="pf-field-error-msg">{errors[`${prefix}_sellingPrice`]}</span>
          )}
        </div>
      </div>

      <div className="pf-grid-2">
        <div className="pf-field-group">
          <label htmlFor={`${prefix}_domesticExport`} className="pf-field-label">
            Domestic / Export <span className="pf-required-star">*</span>
          </label>
          <button
            id={`${prefix}_domesticExport`}
            type="button"
            className={`pf-custom-select-btn ${errors[`${prefix}_domesticExport`] ? 'pf-custom-select-btn--error' : ''}`}
            onClick={() => onOpenPicker('domesticExport')}
          >
            <span className={item.domesticExport ? 'pf-select-value' : 'pf-select-placeholder'}>
              {item.domesticExport || 'Select option'}
            </span>
            <span className="pf-select-chevron">
              <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
            </span>
          </button>
          {errors[`${prefix}_domesticExport`] && (
            <span className="pf-field-error-msg">{errors[`${prefix}_domesticExport`]}</span>
          )}
        </div>

        <div className="pf-field-group">
          <label htmlFor={`${prefix}_productMixPercent`} className="pf-field-label">
            Product Mix (%) <span className="pf-required-star">*</span>
          </label>
          <input
            id={`${prefix}_productMixPercent`}
            type="text"
            className={`pf-custom-input ${errors[`${prefix}_productMixPercent`] ? 'pf-custom-input--error' : ''}`}
            placeholder="Enter percentage"
            value={item.productMixPercent || ''}
            onChange={(e) => handleNumericFieldChange('productMixPercent', e.target.value)}
          />
          {errors[`${prefix}_productMixPercent`] && (
            <span className="pf-field-error-msg">{errors[`${prefix}_productMixPercent`]}</span>
          )}
        </div>
      </div>
    </div>
  )
}
