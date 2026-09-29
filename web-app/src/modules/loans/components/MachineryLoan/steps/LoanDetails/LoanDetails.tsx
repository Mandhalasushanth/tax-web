import React from 'react'
import { LoanFormSection } from '@modules/loans/shared'
import type {
  MachineryLoanData,
  MachineryEquipmentType,
  MachineryLoanRepaymentTenure,
} from '../../../../types/machineryLoan.types'
import { loanInputHelpers } from '../../../../validation/machineryLoanValidation'
import './LoanDetails.css'

export interface LoanDetailsProps {
  data: MachineryLoanData
  onChange: (fields: Partial<MachineryLoanData>) => void
  errors?: Record<string, string>
}

export const MACHINERY_EQUIPMENT_TYPES: MachineryEquipmentType[] = [
  'CNC / Automation Machinery',
  'Medical Equipment',
  'Printing / Packaging Machinery',
  'Construction Machinery',
  'Food Processing Machinery',
  'Textile Machinery',
  'Other',
]

export const REPAYMENT_TENURE_OPTIONS: MachineryLoanRepaymentTenure[] = [
  '12 Months',
  '24 Months',
  '36 Months',
  '48 Months',
  '57 Months',
  '60 Months',
  '63 Months',
  '66 Months',
  '69 Months',
  '72 Months',
  '75 Months',
  '78 Months',
  '81 Months',
  '84 Months',
]

const AMOUNT_PRESETS = [
  { label: '₹10 Lakhs', value: 1000000 },
  { label: '₹25 Lakhs', value: 2500000 },
  { label: '₹50 Lakhs', value: 5000000 },
  { label: '₹1 Crore', value: 10000000 },
  { label: '₹2 Crores', value: 20000000 },
]

export const LoanDetails: React.FC<LoanDetailsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ loanAmount: formatted })
  }

  return (
    <div className="machinery-loan-step">
      {/* 1. Required Loan Amount */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="12" x="2" y="6" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>
        }
        title="Required Machinery Loan Amount"
        subtitle="Specify required loan amount, machinery category, and repayment tenure."
      >
        <div className="machinery-loan-form-group">
          <label htmlFor="machinery-loan-amount" className="machinery-loan-label">
            Required Loan Amount (₹) <span className="machinery-loan-label__req">*</span>
          </label>
          <input
            id="machinery-loan-amount"
            type="text"
            inputMode="numeric"
            className={`machinery-loan-input ${errors.loanAmount ? 'machinery-loan-input--error' : ''}`}
            placeholder="Enter loan amount in ₹ (e.g. 50,00,000)"
            value={data.loanAmount ? loanInputHelpers.formatCurrencyString(String(data.loanAmount)) : ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handleLoanAmountChange}
          />
          <div className="machinery-loan-amount-presets">
            {AMOUNT_PRESETS.map((p) => {
              const currentNum = Number(String(data.loanAmount || '').replace(/\D/g, ''))
              const isSelected = currentNum === p.value
              return (
                <button
                  key={p.value}
                  type="button"
                  className={`machinery-loan-amount-pill ${isSelected ? 'machinery-loan-amount-pill--active' : ''}`}
                  onClick={() => onChange({ loanAmount: p.value })}
                >
                  {p.label}
                </button>
              )
            })}
          </div>
          {errors.loanAmount && (
            <span className="machinery-loan-field-error" role="alert">{errors.loanAmount}</span>
          )}
        </div>
      </LoanFormSection>

      {/* 2. Machinery / Equipment Type */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4" />
            <path d="m4.93 4.93 2.83 2.83" />
            <path d="M2 12h4" />
            <path d="m4.93 19.07 2.83-2.83" />
            <path d="M12 22v-4" />
            <path d="m19.07 19.07-2.83-2.83" />
            <path d="M22 12h-4" />
            <path d="m19.07 4.93-2.83 2.83" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        }
        title="Machinery / Equipment Type"
        subtitle="Select the classification or industry use case of machinery being financed."
      >
        <div className="machinery-loan-form-group">
          <label htmlFor="machinery-type-select" className="machinery-loan-label">
            Machinery / Equipment Type <span className="machinery-loan-label__req">*</span>
          </label>
          <select
            id="machinery-type-select"
            className={`machinery-loan-select ${errors.machineryType ? 'machinery-loan-select--error' : ''}`}
            value={data.machineryType || ''}
            onChange={(e) => onChange({ machineryType: e.target.value as MachineryEquipmentType })}
          >
            <option value="" disabled>Select machinery / equipment type</option>
            {MACHINERY_EQUIPMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.machineryType && (
            <span className="machinery-loan-field-error" role="alert">{errors.machineryType}</span>
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
        subtitle="Choose your preferred financing term from 12 to 84 months."
      >
        <div className="machinery-loan-form-group">
          <label htmlFor="machinery-tenure-select" className="machinery-loan-label">
            Repayment Tenure <span className="machinery-loan-label__req">*</span>
          </label>
          <select
            id="machinery-tenure-select"
            className={`machinery-loan-select ${errors.repaymentTenure ? 'machinery-loan-select--error' : ''}`}
            value={data.repaymentTenure || ''}
            onChange={(e) => onChange({ repaymentTenure: e.target.value as MachineryLoanRepaymentTenure })}
          >
            <option value="" disabled>Select repayment tenure</option>
            {REPAYMENT_TENURE_OPTIONS.map((tenure) => (
              <option key={tenure} value={tenure}>
                {tenure}
              </option>
            ))}
          </select>
          {errors.repaymentTenure && (
            <span className="machinery-loan-field-error" role="alert">{errors.repaymentTenure}</span>
          )}
        </div>
      </LoanFormSection>
    </div>
  )
}

export default LoanDetails
