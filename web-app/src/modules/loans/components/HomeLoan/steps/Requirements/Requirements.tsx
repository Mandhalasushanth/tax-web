import React from 'react'
import { LoanFormSection } from '@modules/loans/shared'
import type { HomeLoanData } from '@modules/loans/types/homeLoan.types'
import { loanInputHelpers } from '@modules/loans/utils/loanInputFormatters'
import { PROPERTY_INTENTS } from './Requirements.constants'
import './Requirements.css'

export interface RequirementsProps {
  data: HomeLoanData
  onChange: (fields: Partial<HomeLoanData>) => void
  errors?: Record<string, string>
}

const AMOUNT_PRESETS = [
  { label: '₹25 Lakhs', value: 2500000 },
  { label: '₹50 Lakhs', value: 5000000 },
  { label: '₹75 Lakhs', value: 7500000 },
  { label: '₹1 Crore', value: 10000000 },
  { label: '₹2 Crores', value: 20000000 },
]

const TENURE_PRESETS = [
  { label: '10 Yrs (120 M)', value: 10 },
  { label: '15 Yrs (180 M)', value: 15 },
  { label: '20 Yrs (240 M)', value: 20 },
  { label: '25 Yrs (300 M)', value: 25 },
  { label: '30 Yrs (360 M)', value: 30 },
]

const CONSTRUCTION_STAGES = [
  'Ready to Move',
  'Under Construction',
  'Resale Property',
  'Plot + Construction',
  'Self Construction',
]

export const Requirements: React.FC<RequirementsProps> = ({ data, onChange, errors = {} }) => {
  const handlePropertyCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ estimatedPropertyCost: formatted })
  }

  const renderLoanAmountSection = () => (
    <LoanFormSection
      icon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="12" x="2" y="6" rx="2" />
          <circle cx="12" cy="12" r="2" />
          <path d="M6 12h.01M18 12h.01" />
        </svg>
      }
      title="Required Home Loan Amount"
      subtitle="Select your required loan amount from the dropdown below."
    >
      <div className="home-loan-form-group">
        <label htmlFor="req-amount-select" className="home-loan-label">
          Amount <span className="home-loan-label__req">*</span>
        </label>
        <select
          id="req-amount-select"
          className={`home-loan-select ${errors.loanAmount ? 'home-loan-select--error' : ''}`}
          value={Number(String(data.loanAmount || '').replace(/\D/g, '')) || ''}
          onChange={(e) => {
            const val = e.target.value
            onChange({ loanAmount: val ? Number(val) : '' as unknown as number })
          }}
        >
          <option value="">Select loan amount...</option>
          {AMOUNT_PRESETS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
        {errors.loanAmount && (
          <span className="home-loan-field-error" role="alert">{errors.loanAmount}</span>
        )}
      </div>
    </LoanFormSection>
  )

  const renderPropertyIntentSection = () => (
    <LoanFormSection
      icon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
        </svg>
      }
      title="Property Intent / Purpose"
      subtitle="Select the housing requirement. Select 'Others' if your specific property purpose is not listed."
    >
      <div className="home-loan-form-group">
        <label htmlFor="req-intent-select" className="home-loan-label">
          Select Intent / Purpose <span className="home-loan-label__req">*</span>
        </label>
        <select
          id="req-intent-select"
          className={`home-loan-select ${errors.propertyIntent ? 'home-loan-select--error' : ''}`}
          value={data.propertyIntent || ''}
          onChange={(e) => {
            const val = e.target.value
            onChange({
              propertyIntent: val,
              ...(val !== 'Others' ? { customPropertyIntent: '' } : {}),
            })
          }}
        >
          <option value="" disabled>Select property intent / purpose</option>
          {PROPERTY_INTENTS.map((intent) => (
            <option key={intent} value={intent}>
              {intent}
            </option>
          ))}
        </select>
        {errors.propertyIntent && (
          <span className="home-loan-field-error" role="alert">{errors.propertyIntent}</span>
        )}
      </div>
      {data.propertyIntent === 'Others' && (
        <div className="home-loan-form-group">
          <label htmlFor="req-custom-intent" className="home-loan-label">
            Specify Custom Property Intent <span className="home-loan-label__req">*</span>
          </label>
          <input
            id="req-custom-intent"
            type="text"
            className={`home-loan-input ${errors.customPropertyIntent ? 'home-loan-input--error' : ''}`}
            placeholder="Enter custom property intent"
            value={data.customPropertyIntent || ''}
            maxLength={100}
            onChange={(e) => onChange({ customPropertyIntent: e.target.value })}
          />
          {errors.customPropertyIntent && (
            <span className="home-loan-field-error" role="alert">{errors.customPropertyIntent}</span>
          )}
        </div>
      )}
    </LoanFormSection>
  )

  const renderRepaymentTenureSection = () => (
    <LoanFormSection
      icon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      }
      title="Repayment Tenure"
      subtitle="Select your intended loan tenure. Longer tenure lowers monthly EMI burden."
    >
      <div className="home-loan-form-group">
        <label htmlFor="req-tenure-select" className="home-loan-label">
          Select Tenure <span className="home-loan-label__req">*</span>
        </label>
        <select
          id="req-tenure-select"
          className={`home-loan-select ${errors.repaymentTenureYears ? 'home-loan-select--error' : ''}`}
          value={data.repaymentTenureYears || ''}
          onChange={(e) => onChange({ repaymentTenureYears: Number(e.target.value) })}
        >
          <option value="">Select repayment tenure...</option>
          {TENURE_PRESETS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        {errors.repaymentTenureYears && (
          <span className="home-loan-field-error" role="alert">{errors.repaymentTenureYears}</span>
        )}
      </div>
    </LoanFormSection>
  )

  const renderPropertyDetailsSection = () => (
    <LoanFormSection
      icon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      }
      title="Property Details & Valuation"
      subtitle="Current development stage and total agreement or estimated cost of the target property."
    >
      <div className="home-loan-form-group">
        <label htmlFor="req-property-stage-select" className="home-loan-label">
          Property Construction Stage <span className="home-loan-label__req">*</span>
        </label>
        <select
          id="req-property-stage-select"
          className={`home-loan-select ${errors.propertyStage ? 'home-loan-select--error' : ''}`}
          value={data.propertyStage || ''}
          onChange={(e) => onChange({ propertyStage: e.target.value })}
        >
          <option value="" disabled>Select property construction stage</option>
          {CONSTRUCTION_STAGES.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
        {errors.propertyStage && (
          <span className="home-loan-field-error" role="alert">{errors.propertyStage}</span>
        )}
      </div>

      <div className="home-loan-form-group">
        <label htmlFor="req-property-cost-input" className="home-loan-label">
          Estimated Total Property Cost / Agreement Value (₹) <span className="home-loan-label__req">*</span>
        </label>
        <input
          id="req-property-cost-input"
          type="text"
          inputMode="numeric"
          className={`home-loan-input ${errors.estimatedPropertyCost ? 'home-loan-input--error' : ''}`}
          placeholder="Enter estimated property or agreement value in ₹ (e.g. 75,00,000)"
          value={data.estimatedPropertyCost || ''}
          onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
          onChange={handlePropertyCostChange}
        />
        {errors.estimatedPropertyCost && (
          <span className="home-loan-field-error" role="alert">{errors.estimatedPropertyCost}</span>
        )}
      </div>
    </LoanFormSection>
  )

  return (
    <div className="home-loan-requirements">
      {renderLoanAmountSection()}
      {renderPropertyIntentSection()}
      {renderRepaymentTenureSection()}
      {renderPropertyDetailsSection()}
    </div>
  )
}

export default Requirements
