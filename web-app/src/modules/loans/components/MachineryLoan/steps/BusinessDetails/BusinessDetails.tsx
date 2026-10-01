import React from 'react'
import { LoanFormSection } from '@modules/loans/shared'
import type { MachineryLoanData, MachineryBusinessType, MachineryBusinessVintage } from '@modules/loans/types/machineryLoan.types'
import { loanInputHelpers } from '@modules/loans/utils/loanInputFormatters'
import { BUSINESS_TYPE_OPTIONS, BUSINESS_VINTAGE_OPTIONS } from './BusinessDetails.constants'
import './BusinessDetails.css'

export interface BusinessDetailsProps {
  data: MachineryLoanData
  onChange: (fields: Partial<MachineryLoanData>) => void
  errors?: Record<string, string>
}

export const BusinessDetails: React.FC<BusinessDetailsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleTurnoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ annualTurnover: formatted })
  }

  const handleGstinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.cleanGstin(e.target.value)
    onChange({ gstin: clean })
  }

  const handleGstToggle = (isRegistered: boolean) => {
    onChange({
      isGstRegistered: isRegistered,
      ...(isRegistered ? {} : { gstin: '' }),
    })
  }

  const renderEnterpriseDetailsSection = () => (
    <>
      {/* 1. Business / Plant Name */}
      <div className="machinery-loan-form-group">
        <label htmlFor="machinery-business-name" className="machinery-loan-label">
          Business / Plant Name <span className="machinery-loan-label__req">*</span>
        </label>
        <input
          id="machinery-business-name"
          type="text"
          className={`machinery-loan-input ${errors.businessName ? 'machinery-loan-input--error' : ''}`}
          placeholder="Enter business name"
          value={data.businessName || ''}
          onChange={(e) => onChange({ businessName: e.target.value })}
        />
        {errors.businessName && (
          <span className="machinery-loan-field-error" role="alert">{errors.businessName}</span>
        )}
      </div>

      {/* 2. Business Type */}
      <div className="machinery-loan-form-group">
        <label htmlFor="machinery-business-type-select" className="machinery-loan-label">
          Business Type <span className="machinery-loan-label__req">*</span>
        </label>
        <select
          id="machinery-business-type-select"
          className={`machinery-loan-select ${errors.businessType ? 'machinery-loan-select--error' : ''}`}
          value={data.businessType || ''}
          onChange={(e) => onChange({ businessType: e.target.value as MachineryBusinessType })}
        >
          <option value="" disabled>Select business type</option>
          {BUSINESS_TYPE_OPTIONS.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.businessType && (
          <span className="machinery-loan-field-error" role="alert">{errors.businessType}</span>
        )}
      </div>

      {/* 3. Business Vintage */}
      <div className="machinery-loan-form-group">
        <label htmlFor="machinery-business-vintage-select" className="machinery-loan-label">
          Business Vintage <span className="machinery-loan-label__req">*</span>
        </label>
        <select
          id="machinery-business-vintage-select"
          className={`machinery-loan-select ${errors.businessVintage ? 'machinery-loan-select--error' : ''}`}
          value={data.businessVintage || ''}
          onChange={(e) => onChange({ businessVintage: e.target.value as MachineryBusinessVintage })}
        >
          <option value="" disabled>Select business vintage</option>
          {BUSINESS_VINTAGE_OPTIONS.map((vintage) => (
            <option key={vintage} value={vintage}>
              {vintage}
            </option>
          ))}
        </select>
        {errors.businessVintage && (
          <span className="machinery-loan-field-error" role="alert">{errors.businessVintage}</span>
        )}
      </div>

      {/* 4. Annual Turnover */}
      <div className="machinery-loan-form-group">
        <label htmlFor="machinery-turnover-input" className="machinery-loan-label">
          Annual Turnover <span className="machinery-loan-label__req">*</span>
        </label>
        <input
          id="machinery-turnover-input"
          type="text"
          inputMode="numeric"
          className={`machinery-loan-input ${errors.annualTurnover ? 'machinery-loan-input--error' : ''}`}
          placeholder="Enter annual turnover (₹)"
          value={data.annualTurnover ? loanInputHelpers.formatCurrencyString(String(data.annualTurnover)) : ''}
          onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
          onChange={handleTurnoverChange}
        />
        {errors.annualTurnover && (
          <span className="machinery-loan-field-error" role="alert">{errors.annualTurnover}</span>
        )}
      </div>
    </>
  )

  const renderGstDetailsSection = () => (
    <>
      {/* 5. GST Registered? Toggle */}
      <div className="machinery-loan-form-group">
        <label className="machinery-loan-label">GST Registered?</label>
        <div className="machinery-loan-toggle-grid">
          <button
            type="button"
            className={`machinery-loan-toggle-btn ${data.isGstRegistered ? 'machinery-loan-toggle-btn--active' : ''}`}
            onClick={() => handleGstToggle(true)}
          >
            Yes
          </button>
          <button
            type="button"
            className={`machinery-loan-toggle-btn ${!data.isGstRegistered ? 'machinery-loan-toggle-btn--active' : ''}`}
            onClick={() => handleGstToggle(false)}
          >
            No
          </button>
        </div>
      </div>

      {/* 6. GSTIN (Visible when Yes) */}
      {data.isGstRegistered && (
        <div className="machinery-loan-form-group">
          <label htmlFor="machinery-gstin-input" className="machinery-loan-label">
            GSTIN <span className="machinery-loan-label__req">*</span>
          </label>
          <input
            id="machinery-gstin-input"
            type="text"
            maxLength={15}
            className={`machinery-loan-input ${errors.gstin ? 'machinery-loan-input--error' : ''}`}
            placeholder="Enter GSTIN (e.g. 24AABCP1234F1Z9)"
            value={data.gstin || ''}
            onKeyDown={loanInputHelpers.allowOnlyAlphanumericKeyDown}
            onChange={handleGstinChange}
          />
          {errors.gstin && (
            <span className="machinery-loan-field-error" role="alert">{errors.gstin}</span>
          )}
        </div>
      )}
    </>
  )

  return (
    <div className="machinery-loan-business">
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="7" rx="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        }
        title="Business Details"
        subtitle="Provide essential business information and enterprise identity."
      >
        {renderEnterpriseDetailsSection()}
        {renderGstDetailsSection()}
      </LoanFormSection>
    </div>
  )
}

export default BusinessDetails
