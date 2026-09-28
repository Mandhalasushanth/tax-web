import React from 'react'
import { LoanFormSection } from '../../../../components/LoanFormSection/LoanFormSection'
import type {
  WorkingCapitalLoanData,
  WorkingCapitalCreditPurpose,
  WorkingCapitalFacilityType,
} from '../../../../types/workingCapitalLoan.types'
import { loanInputHelpers } from '../../../../validation/machineryLoanValidation'
import './Financials.css'

export interface FinancialsProps {
  data: WorkingCapitalLoanData
  onChange: (fields: Partial<WorkingCapitalLoanData>) => void
  errors?: Record<string, string>
}

export const CREDIT_PURPOSE_OPTIONS: WorkingCapitalCreditPurpose[] = [
  'Working Capital',
  'Inventory / Stock',
  'Raw Material Purchase',
  'Supplier Payments',
  'Business Operating Expenses',
  'Receivables / Cash Flow Gap',
  'Other',
]

export const FACILITY_TYPE_OPTIONS: WorkingCapitalFacilityType[] = [
  'Cash Credit (CC) Facility',
  'Overdraft (OD) Line',
  'Invoice / Bill Discounting',
]

const AMOUNT_PRESETS = [
  { label: '₹10 Lakhs', value: 1000000 },
  { label: '₹25 Lakhs', value: 2500000 },
  { label: '₹50 Lakhs', value: 5000000 },
  { label: '₹1 Crore', value: 10000000 },
  { label: '₹2.5 Crores', value: 25000000 },
]

export const Financials: React.FC<FinancialsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
      onChange({ requiredCreditLimit: formatted })
    } catch {
      onChange({ requiredCreditLimit: e.target.value })
    }
  }

  const handleEmiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
      onChange({ monthlyEmiOutgo: formatted })
    } catch {
      onChange({ monthlyEmiOutgo: e.target.value })
    }
  }

  const handleBorrowingsToggle = (hasBorrowings: boolean) => {
    try {
      onChange({
        hasActiveBorrowings: hasBorrowings,
        ...(hasBorrowings ? {} : { monthlyEmiOutgo: '' }),
      })
    } catch {
      // Fallback
    }
  }

  return (
    <div className="working-capital-step">
      {/* 1. Required Credit Limit */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="12" x="2" y="6" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>
        }
        title="Required Credit Limit"
        subtitle="Specify required working capital credit limit or choose a quick preset."
      >
        <div className="working-capital-form-group">
          <label htmlFor="wc-credit-limit" className="working-capital-label">
            Required Credit Limit / Loan Amount (₹) <span className="working-capital-label__req">*</span>
          </label>
          <input
            id="wc-credit-limit"
            type="text"
            inputMode="numeric"
            className={`working-capital-input ${errors.requiredCreditLimit ? 'working-capital-input--error' : ''}`}
            placeholder="Enter required credit limit (₹)"
            value={data.requiredCreditLimit ? loanInputHelpers.formatCurrencyString(String(data.requiredCreditLimit)) : ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handleAmountChange}
          />
          <div className="working-capital-amount-presets">
            {AMOUNT_PRESETS.map((p) => {
              const currentNum = Number(String(data.requiredCreditLimit || '').replace(/\D/g, ''))
              const isSelected = currentNum === p.value
              return (
                <button
                  key={p.value}
                  type="button"
                  className={`working-capital-amount-pill ${isSelected ? 'working-capital-amount-pill--active' : ''}`}
                  onClick={() => onChange({ requiredCreditLimit: p.value })}
                >
                  {p.label}
                </button>
              )
            })}
          </div>
          {errors.requiredCreditLimit && (
            <span className="working-capital-field-error" role="alert">{errors.requiredCreditLimit}</span>
          )}
        </div>
      </LoanFormSection>

      {/* 2. Working Capital Purpose */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        }
        title="Working Capital Purpose"
        subtitle="Select the primary operational use case for credit utilization."
      >
        <div className="working-capital-form-group">
          <label className="working-capital-label">
            Credit Purpose <span className="working-capital-label__req">*</span>
          </label>
          <div className="working-capital-pill-cloud">
            {CREDIT_PURPOSE_OPTIONS.map((purpose) => {
              const isSelected = data.creditPurpose === purpose
              return (
                <button
                  key={purpose}
                  type="button"
                  className={`working-capital-purpose-pill ${isSelected ? 'working-capital-purpose-pill--active' : ''}`}
                  onClick={() => onChange({ creditPurpose: purpose })}
                >
                  {purpose}
                </button>
              )
            })}
          </div>
          {errors.creditPurpose && (
            <span className="working-capital-field-error" role="alert">{errors.creditPurpose}</span>
          )}
        </div>
      </LoanFormSection>

      {/* 3. Facility Type */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        }
        title="Facility Type"
        subtitle="Choose your preferred financing structure based on operational cash flow."
      >
        <div className="working-capital-form-group">
          <label className="working-capital-label">
            Preferred Facility Type <span className="working-capital-label__req">*</span>
          </label>
          <div className="working-capital-pill-cloud">
            {FACILITY_TYPE_OPTIONS.map((fac) => {
              const isSelected = data.preferredFacilityType === fac
              return (
                <button
                  key={fac}
                  type="button"
                  className={`working-capital-purpose-pill ${isSelected ? 'working-capital-purpose-pill--active' : ''}`}
                  onClick={() => onChange({ preferredFacilityType: fac })}
                >
                  {fac}
                </button>
              )
            })}
          </div>
          {errors.preferredFacilityType && (
            <span className="working-capital-field-error" role="alert">{errors.preferredFacilityType}</span>
          )}
        </div>
      </LoanFormSection>

      {/* 4. Existing Active Bank Borrowings */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        }
        title="Existing Active Bank Borrowings?"
        subtitle="Declare existing active CC/OD limits, term loans, or business debts."
      >
        <div className="working-capital-form-group">
          <div className="working-capital-toggle-grid">
            <button
              type="button"
              className={`working-capital-toggle-btn ${!data.hasActiveBorrowings ? 'working-capital-toggle-btn--active' : ''}`}
              onClick={() => handleBorrowingsToggle(false)}
            >
              No Existing Lines
            </button>
            <button
              type="button"
              className={`working-capital-toggle-btn ${data.hasActiveBorrowings ? 'working-capital-toggle-btn--active' : ''}`}
              onClick={() => handleBorrowingsToggle(true)}
            >
              Yes, Active Debts
            </button>
          </div>
        </div>

        {data.hasActiveBorrowings && (
          <div className="working-capital-form-group" style={{ marginTop: '1rem' }}>
            <label htmlFor="wc-monthly-emi" className="working-capital-label">
              Total Monthly Interest / EMI Outgo (₹) <span className="working-capital-label__req">*</span>
            </label>
            <input
              id="wc-monthly-emi"
              type="text"
              inputMode="numeric"
              className={`working-capital-input ${errors.monthlyEmiOutgo ? 'working-capital-input--error' : ''}`}
              placeholder="e.g. 25000"
              value={data.monthlyEmiOutgo ? loanInputHelpers.formatCurrencyString(String(data.monthlyEmiOutgo)) : ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={handleEmiChange}
            />
            {errors.monthlyEmiOutgo && (
              <span className="working-capital-field-error" role="alert">{errors.monthlyEmiOutgo}</span>
            )}
          </div>
        )}
      </LoanFormSection>
    </div>
  )
}

export default Financials
