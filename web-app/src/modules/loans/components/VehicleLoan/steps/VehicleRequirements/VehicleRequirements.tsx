import React from 'react'
import { LoanFormSection } from '../../../../components/LoanFormSection/LoanFormSection'
import type {
  VehicleLoanData,
  VehicleCategory,
  VehicleRepaymentTenure,
  VehicleCondition,
} from '../../../../types/vehicleLoan.types'
import { loanInputHelpers } from '../../../../validation/vehicleLoanValidation'
import './VehicleRequirements.css'

export interface VehicleRequirementsProps {
  data: VehicleLoanData
  onChange: (fields: Partial<VehicleLoanData>) => void
  errors?: Record<string, string>
}

export const VEHICLE_CATEGORY_OPTIONS: VehicleCategory[] = [
  'Two Wheeler',
  'Four Wheeler (Car / SUV)',
  'Commercial Vehicle (LCV / HCV)',
  'Electric Vehicle (EV)',
  'Tractor / Agri Vehicle',
  'Construction Equipment Vehicle',
  'Others',
]

export const VEHICLE_TENURE_OPTIONS: { label: string; value: VehicleRepaymentTenure }[] = [
  { label: '6 M', value: '6 Months' },
  { label: '1 Yr', value: '1 Year' },
  { label: '2 Yrs', value: '2 Years' },
  { label: '3 Yrs', value: '3 Years' },
  { label: '5 Yrs', value: '5 Years' },
  { label: '7 Yrs', value: '7 Years' },
]

export const AMOUNT_PRESETS = [
  { label: '₹3 Lakhs', value: 300000 },
  { label: '₹5 Lakhs', value: 500000 },
  { label: '₹8 Lakhs', value: 800000 },
  { label: '₹12 Lakhs', value: 1200000 },
  { label: '₹20 Lakhs', value: 2000000 },
]

export const VehicleRequirements: React.FC<VehicleRequirementsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ loanAmount: formatted })
  }

  const handleOnRoadPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ onRoadPrice: formatted })
  }

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ downPayment: formatted })
  }

  return (
    <div className="vehicle-loan-step">
      {/* 1. Required Vehicle Loan Amount */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="12" x="2" y="6" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>
        }
        title="Required Vehicle Loan Amount"
        subtitle="Enter your required loan amount or select one of the quick presets below."
      >
        <div className="vehicle-loan-form-group">
          <label htmlFor="vehicle-loan-amount" className="vehicle-loan-label">
            Amount (₹) <span className="vehicle-loan-label__req">*</span>
          </label>
          <input
            id="vehicle-loan-amount"
            type="text"
            inputMode="numeric"
            className={`vehicle-loan-input ${errors.loanAmount ? 'vehicle-loan-input--error' : ''}`}
            placeholder="Enter required loan amount (₹)"
            value={data.loanAmount ? loanInputHelpers.formatCurrencyString(String(data.loanAmount)) : ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handleAmountChange}
          />
          <div className="vehicle-loan-amount-presets">
            {AMOUNT_PRESETS.map((p) => {
              const currentNum = Number(String(data.loanAmount || '').replace(/\D/g, ''))
              const isSelected = currentNum === p.value
              return (
                <button
                  key={p.value}
                  type="button"
                  className={`vehicle-loan-pill-btn ${isSelected ? 'vehicle-loan-pill-btn--active' : ''}`}
                  onClick={() => onChange({ loanAmount: p.value })}
                >
                  {p.label}
                </button>
              )
            })}
          </div>
          {errors.loanAmount && (
            <span className="vehicle-loan-field-error" role="alert">{errors.loanAmount}</span>
          )}
        </div>
      </LoanFormSection>

      {/* 2. Vehicle Category & Usage */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </svg>
        }
        title="Vehicle Category & Usage"
        subtitle="Select your automobile category. Select 'Others' if your specific requirement is not listed."
      >
        <div className="vehicle-loan-form-group">
          <label htmlFor="vehicle-category-select" className="vehicle-loan-label">
            Select Category / Purpose <span className="vehicle-loan-label__req">*</span>
          </label>
          <select
            id="vehicle-category-select"
            className={`vehicle-loan-select ${errors.vehicleCategory ? 'vehicle-loan-select--error' : ''}`}
            value={data.vehicleCategory || ''}
            onChange={(e) => onChange({ vehicleCategory: e.target.value as VehicleCategory })}
          >
            <option value="" disabled>Select Vehicle Category / Purpose...</option>
            {VEHICLE_CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.vehicleCategory && (
            <span className="vehicle-loan-field-error" role="alert">{errors.vehicleCategory}</span>
          )}
        </div>
      </LoanFormSection>

      {/* 3. Repayment Tenure */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        }
        title="Repayment Tenure"
        subtitle="Select your intended loan tenure. Choose from short-term (below 1 year) to long-term (up to 7 years) or specify custom months."
      >
        <div className="vehicle-loan-form-group">
          <label htmlFor="vehicle-tenure-select" className="vehicle-loan-label">
            Select Tenure <span className="vehicle-loan-label__req">*</span>
          </label>
          <select
            id="vehicle-tenure-select"
            className={`vehicle-loan-select ${errors.repaymentTenure ? 'vehicle-loan-select--error' : ''}`}
            value={data.repaymentTenure || ''}
            onChange={(e) => onChange({ repaymentTenure: e.target.value as VehicleRepaymentTenure })}
          >
            <option value="" disabled>Select Repayment Tenure...</option>
            {VEHICLE_TENURE_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.value}
              </option>
            ))}
          </select>
          <div className="vehicle-loan-pill-grid">
            {VEHICLE_TENURE_OPTIONS.map((t) => {
              const isSelected = data.repaymentTenure === t.value
              return (
                <button
                  key={t.value}
                  type="button"
                  className={`vehicle-loan-pill-btn ${isSelected ? 'vehicle-loan-pill-btn--active' : ''}`}
                  onClick={() => onChange({ repaymentTenure: t.value })}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
          {errors.repaymentTenure && (
            <span className="vehicle-loan-field-error" role="alert">{errors.repaymentTenure}</span>
          )}
        </div>
      </LoanFormSection>

      {/* 4. Vehicle Details & Valuation */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
          </svg>
        }
        title="Vehicle Details & Valuation"
        subtitle="Vehicle condition, model selection, estimated on-road price, and margin contribution."
      >
        {/* Vehicle Condition */}
        <div className="vehicle-loan-form-group">
          <label className="vehicle-loan-label">
            Vehicle Condition <span className="vehicle-loan-label__req">*</span>
          </label>
          <div className="vehicle-loan-condition-toggle">
            <button
              type="button"
              className={`vehicle-loan-condition-btn ${data.vehicleCondition === 'New Vehicle' ? 'vehicle-loan-condition-btn--active' : ''}`}
              onClick={() => onChange({ vehicleCondition: 'New Vehicle' })}
            >
              New Vehicle
            </button>
            <button
              type="button"
              className={`vehicle-loan-condition-btn ${data.vehicleCondition === 'Pre-Owned / Used Vehicle' ? 'vehicle-loan-condition-btn--active' : ''}`}
              onClick={() => onChange({ vehicleCondition: 'Pre-Owned / Used Vehicle' })}
            >
              Pre-Owned / Used Vehicle
            </button>
          </div>
          {errors.vehicleCondition && (
            <span className="vehicle-loan-field-error" role="alert">{errors.vehicleCondition}</span>
          )}
        </div>

        {/* Vehicle Make & Model */}
        <div className="vehicle-loan-form-group">
          <label htmlFor="vehicle-make-model" className="vehicle-loan-label">
            Vehicle Make & Model <span className="vehicle-loan-label__req">*</span>
          </label>
          <input
            id="vehicle-make-model"
            type="text"
            className={`vehicle-loan-input ${errors.vehicleMakeModel ? 'vehicle-loan-input--error' : ''}`}
            placeholder="e.g. Hyundai Creta SX / Tata Nexon EV"
            value={data.vehicleMakeModel || ''}
            onChange={(e) => onChange({ vehicleMakeModel: e.target.value })}
          />
          {errors.vehicleMakeModel && (
            <span className="vehicle-loan-field-error" role="alert">{errors.vehicleMakeModel}</span>
          )}
        </div>

        {/* Estimated On-Road Price / Valuation */}
        <div className="vehicle-loan-form-group">
          <label htmlFor="vehicle-on-road-price" className="vehicle-loan-label">
            Estimated On-Road Price / Valuation (₹) <span className="vehicle-loan-label__req">*</span>
          </label>
          <input
            id="vehicle-on-road-price"
            type="text"
            inputMode="numeric"
            className={`vehicle-loan-input ${errors.onRoadPrice ? 'vehicle-loan-input--error' : ''}`}
            placeholder="Enter total on-road price / valuation (₹)"
            value={data.onRoadPrice ? loanInputHelpers.formatCurrencyString(String(data.onRoadPrice)) : ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handleOnRoadPriceChange}
          />
          {errors.onRoadPrice && (
            <span className="vehicle-loan-field-error" role="alert">{errors.onRoadPrice}</span>
          )}
        </div>

        {/* Expected Down Payment / Margin Money */}
        <div className="vehicle-loan-form-group">
          <label htmlFor="vehicle-down-payment" className="vehicle-loan-label">
            Expected Down Payment / Margin Money (₹) <span className="vehicle-loan-label__req">*</span>
          </label>
          <input
            id="vehicle-down-payment"
            type="text"
            inputMode="numeric"
            className={`vehicle-loan-input ${errors.downPayment ? 'vehicle-loan-input--error' : ''}`}
            placeholder="Enter expected down payment / margin amount (₹)"
            value={data.downPayment ? loanInputHelpers.formatCurrencyString(String(data.downPayment)) : ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handleDownPaymentChange}
          />
          {errors.downPayment && (
            <span className="vehicle-loan-field-error" role="alert">{errors.downPayment}</span>
          )}
        </div>
      </LoanFormSection>
    </div>
  )
}

export default VehicleRequirements
