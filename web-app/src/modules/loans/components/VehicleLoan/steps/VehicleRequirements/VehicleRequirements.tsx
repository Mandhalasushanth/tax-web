import React, { useState } from 'react'
import { LoanFormSection } from '../../../../components/LoanFormSection/LoanFormSection'
import type {
  VehicleLoanData,
  VehicleCategory,
  VehicleRepaymentTenure,
  VehicleMakeModel,
} from '../../../../types/vehicleLoan.types'
import { loanInputHelpers } from '../../../../validation/vehicleLoanValidation'
import './VehicleRequirements.css'

export interface VehicleRequirementsProps {
  data: VehicleLoanData
  onChange: (fields: Partial<VehicleLoanData>) => void
  errors?: Record<string, string>
}

export const VEHICLE_CATEGORY_OPTIONS: VehicleCategory[] = [
  'New Car (Passenger)',
  'Pre-Owned / Used Car',
  'Electric Vehicle (EV - 2W / 4W)',
  'Two-Wheeler / Superbike',
  'Commercial Vehicle / Truck',
  'Fleet Purchase',
  'Balance Transfer & Top-Up',
  'Others',
]

export const SHORT_TERM_TENURE_OPTIONS: { label: string; value: VehicleRepaymentTenure }[] = [
  { label: '3 M', value: '3 M (3 Months)' },
  { label: '6 M', value: '6 M (6 Months)' },
  { label: '9 M', value: '9 M (9 Months)' },
]

export const LONG_TERM_TENURE_OPTIONS: { label: string; value: VehicleRepaymentTenure }[] = [
  { label: '1 Yr', value: '12 M (1 Yr)' },
  { label: '1.5 Yrs', value: '18 M (1.5 Yrs)' },
  { label: '2 Yrs', value: '24 M (2 Yrs)' },
  { label: '3 Yrs', value: '36 M (3 Yrs)' },
  { label: '4 Yrs', value: '48 M (4 Yrs)' },
  { label: '5 Yrs', value: '60 M (5 Yrs)' },
  { label: '6 Yrs', value: '72 M (6 Yrs)' },
  { label: '7 Yrs', value: '84 M (7 Yrs)' },
  { label: 'Custom', value: 'Other / Custom Tenure' },
]

export const QUICK_TENURE_PILLS: { label: string; value: VehicleRepaymentTenure }[] = [
  { label: '6 M', value: '6 M (6 Months)' },
  { label: '1 Yr', value: '12 M (1 Yr)' },
  { label: '2 Yrs', value: '24 M (2 Yrs)' },
  { label: '3 Yrs', value: '36 M (3 Yrs)' },
  { label: '5 Yrs', value: '60 M (5 Yrs)' },
  { label: '7 Yrs', value: '84 M (7 Yrs)' },
]

export const VEHICLE_MAKE_MODEL_OPTIONS: VehicleMakeModel[] = [
  'Maruti Suzuki Swift',
  'Maruti Suzuki Baleno',
  'Maruti Suzuki Brezza',
  'Maruti Suzuki Ertiga',
  'Hyundai Creta',
  'Hyundai Venue',
  'Hyundai i20',
  'Hyundai Verna',
  'Tata Nexon',
  'Tata Punch',
  'Tata Harrier / Safari',
  'Tata Nexon EV',
  'Mahindra Thar',
  'Mahindra Scorpio-N',
  'Mahindra XUV700',
  'Kia Seltos',
  'Kia Sonet',
  'Toyota Innova Crysta / Hycross',
  'Toyota Fortuner',
  'Honda City / Elevate',
  'Electric: MG ZS EV / Ola S1 / Ather 450X',
  'Two-Wheeler: Honda Activa / TVS Jupiter',
  'Two-Wheeler: Royal Enfield / Bajaj Pulsar',
  'Commercial: Tata Ace / Mahindra Bolero Pik-Up',
  'Other (Specify Custom Vehicle Model)',
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
  const [activeModal, setActiveModal] = useState<'category' | 'tenure' | 'makeModel' | null>(null)

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
          <label className="vehicle-loan-label">
            Select Category / Purpose <span className="vehicle-loan-label__req">*</span>
          </label>
          <button
            type="button"
            className={`vehicle-loan-custom-select ${!data.vehicleCategory ? 'vehicle-loan-custom-select--placeholder' : ''} ${errors.vehicleCategory ? 'vehicle-loan-custom-select--error' : ''}`}
            onClick={() => setActiveModal('category')}
          >
            <span>{data.vehicleCategory || 'Select Vehicle Category / Purpose...'}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="vehicle-loan-select-arrow">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
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
          <label className="vehicle-loan-label">
            Select Tenure <span className="vehicle-loan-label__req">*</span>
          </label>
          <button
            type="button"
            className={`vehicle-loan-custom-select ${!data.repaymentTenure ? 'vehicle-loan-custom-select--placeholder' : ''} ${errors.repaymentTenure ? 'vehicle-loan-custom-select--error' : ''}`}
            onClick={() => setActiveModal('tenure')}
          >
            <span>{data.repaymentTenure || 'Select Repayment Tenure...'}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="vehicle-loan-select-arrow">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className="vehicle-loan-pill-grid">
            {QUICK_TENURE_PILLS.map((t) => {
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

        {/* Vehicle Make & Model Dropdown */}
        <div className="vehicle-loan-form-group">
          <label className="vehicle-loan-label">
            Vehicle Make & Model <span className="vehicle-loan-label__req">*</span>
          </label>
          <button
            type="button"
            className={`vehicle-loan-custom-select ${!data.vehicleMakeModel ? 'vehicle-loan-custom-select--placeholder' : ''} ${errors.vehicleMakeModel ? 'vehicle-loan-custom-select--error' : ''}`}
            onClick={() => setActiveModal('makeModel')}
          >
            <span>{data.vehicleMakeModel || 'Select Vehicle Make & Model...'}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="vehicle-loan-select-arrow">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {errors.vehicleMakeModel && (
            <span className="vehicle-loan-field-error" role="alert">{errors.vehicleMakeModel}</span>
          )}
        </div>

        {/* If user selected custom vehicle model */}
        {data.vehicleMakeModel === 'Other (Specify Custom Vehicle Model)' && (
          <div className="vehicle-loan-form-group" style={{ marginTop: '0.5rem' }}>
            <label htmlFor="custom-vehicle-model" className="vehicle-loan-label">
              Specify Custom Vehicle Make & Model <span className="vehicle-loan-label__req">*</span>
            </label>
            <input
              id="custom-vehicle-model"
              type="text"
              className="vehicle-loan-input"
              placeholder="e.g. BMW 3 Series / Harley Davidson"
              value={data.customVehicleMakeModel || ''}
              onChange={(e) => onChange({ customVehicleMakeModel: e.target.value })}
            />
          </div>
        )}

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

      {/* MODAL BOTTOM SHEETS */}
      {/* 1. Category Modal */}
      {activeModal === 'category' && (
        <div className="vehicle-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="vehicle-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="vehicle-modal-header">
              <h3 className="vehicle-modal-title">Select Vehicle Category / Purpose</h3>
              <button
                type="button"
                className="vehicle-modal-close-btn"
                onClick={() => setActiveModal(null)}
              >
                ✕
              </button>
            </div>
            <div className="vehicle-modal-list">
              {VEHICLE_CATEGORY_OPTIONS.map((cat) => {
                const isSelected = data.vehicleCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`vehicle-modal-item ${isSelected ? 'vehicle-modal-item--selected' : ''}`}
                    onClick={() => {
                      onChange({ vehicleCategory: cat })
                      setActiveModal(null)
                    }}
                  >
                    <span>{cat}</span>
                    {isSelected && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="vehicle-modal-check-icon">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. Tenure Modal */}
      {activeModal === 'tenure' && (
        <div className="vehicle-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="vehicle-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="vehicle-modal-header">
              <h3 className="vehicle-modal-title">Select Repayment Tenure</h3>
              <button
                type="button"
                className="vehicle-modal-close-btn"
                onClick={() => setActiveModal(null)}
              >
                ✕
              </button>
            </div>
            <div className="vehicle-modal-list">
              <div className="vehicle-modal-group-label">BELOW 1 YEAR (SHORT-TERM)</div>
              {SHORT_TERM_TENURE_OPTIONS.map((t) => {
                const isSelected = data.repaymentTenure === t.value
                return (
                  <button
                    key={t.value}
                    type="button"
                    className={`vehicle-modal-item ${isSelected ? 'vehicle-modal-item--selected' : ''}`}
                    onClick={() => {
                      onChange({ repaymentTenure: t.value })
                      setActiveModal(null)
                    }}
                  >
                    <span>{t.value}</span>
                    {isSelected && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="vehicle-modal-check-icon">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                )
              })}

              <div className="vehicle-modal-group-label" style={{ marginTop: '0.75rem' }}>1 YEAR & ABOVE</div>
              {LONG_TERM_TENURE_OPTIONS.map((t) => {
                const isSelected = data.repaymentTenure === t.value
                return (
                  <button
                    key={t.value}
                    type="button"
                    className={`vehicle-modal-item ${isSelected ? 'vehicle-modal-item--selected' : ''}`}
                    onClick={() => {
                      onChange({ repaymentTenure: t.value })
                      setActiveModal(null)
                    }}
                  >
                    <span>{t.value}</span>
                    {isSelected && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="vehicle-modal-check-icon">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. Make & Model Modal */}
      {activeModal === 'makeModel' && (
        <div className="vehicle-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="vehicle-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="vehicle-modal-header">
              <h3 className="vehicle-modal-title">Select Vehicle Make & Model</h3>
              <button
                type="button"
                className="vehicle-modal-close-btn"
                onClick={() => setActiveModal(null)}
              >
                ✕
              </button>
            </div>
            <div className="vehicle-modal-list">
              {VEHICLE_MAKE_MODEL_OPTIONS.map((model) => {
                const isSelected = data.vehicleMakeModel === model
                return (
                  <button
                    key={model}
                    type="button"
                    className={`vehicle-modal-item ${isSelected ? 'vehicle-modal-item--selected' : ''}`}
                    onClick={() => {
                      onChange({ vehicleMakeModel: model })
                      setActiveModal(null)
                    }}
                  >
                    <span>{model}</span>
                    {isSelected && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="vehicle-modal-check-icon">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VehicleRequirements
