import React from 'react'
import { LoanFormSection } from '@modules/loans/shared'
import type {
  MsmeLoanData,
  MsmeLoanPurpose,
  MsmeLoanTenure,
} from '../../../../types/msmeLoan.types'
import { loanInputHelpers } from '../../../../validation/msmeLoanValidation'
import './MsmeProfile.css'

export interface MsmeProfileProps {
  data: MsmeLoanData
  onChange: (fields: Partial<MsmeLoanData>) => void
  errors?: Record<string, string>
}

const LOAN_PURPOSE_OPTIONS: MsmeLoanPurpose[] = [
  'Working Capital',
  'Capital Expenditure',
  'Machinery Purchase',
  'Expansion / Diversification',
  'Export Finance',
  'Technology Upgrade',
  'Other',
]

const LOAN_TENURE_OPTIONS: MsmeLoanTenure[] = [
  '12 Months',
  '24 Months',
  '36 Months',
  '48 Months',
  '60 Months',
  '72 Months',
  '84 Months',
]

const AMOUNT_PRESETS = [
  { label: '₹5 Lakhs', value: 500000 },
  { label: '₹10 Lakhs', value: 1000000 },
  { label: '₹25 Lakhs', value: 2500000 },
  { label: '₹50 Lakhs', value: 5000000 },
  { label: '₹1 Crore', value: 10000000 },
]

export const MsmeProfile: React.FC<MsmeProfileProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ requiredLoanAmount: formatted })
  }

  const handleEmiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ totalExistingEmiOutgo: formatted })
  }

  return (
    <div className="msme-loan-step">
      {/* 1. Loan Amount */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="12" x="2" y="6" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>
        }
        title="MSME Loan Requirement"
        subtitle="Specify the loan amount, purpose, and desired repayment tenure for your MSME."
      >
        <div className="msme-loan-form-group">
          <label htmlFor="msme-loan-amount" className="msme-loan-label">
            Required Loan Amount (₹) <span className="msme-loan-label__req">*</span>
          </label>
          <input
            id="msme-loan-amount"
            type="text"
            inputMode="numeric"
            className={`msme-loan-input ${errors.requiredLoanAmount ? 'msme-loan-input--error' : ''}`}
            placeholder="Enter required loan amount in ₹ (e.g. 25,00,000)"
            value={data.requiredLoanAmount ? loanInputHelpers.formatCurrencyString(String(data.requiredLoanAmount)) : ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handleAmountChange}
          />
          <div className="msme-loan-amount-presets">
            {AMOUNT_PRESETS.map((p) => {
              const currentNum = Number(String(data.requiredLoanAmount || '').replace(/\D/g, ''))
              const isSelected = currentNum === p.value
              return (
                <button
                  key={p.value}
                  type="button"
                  className={`msme-loan-amount-pill ${isSelected ? 'msme-loan-amount-pill--active' : ''}`}
                  onClick={() => onChange({ requiredLoanAmount: String(p.value) })}
                >
                  {p.label}
                </button>
              )
            })}
          </div>
          {errors.requiredLoanAmount && (
            <span className="msme-loan-field-error" role="alert">{errors.requiredLoanAmount}</span>
          )}
        </div>

        <div className="msme-loan-form-group">
          <label htmlFor="msme-loan-purpose" className="msme-loan-label">
            Purpose of Loan <span className="msme-loan-label__req">*</span>
          </label>
          <select
            id="msme-loan-purpose"
            className={`msme-loan-select ${errors.loanPurpose ? 'msme-loan-select--error' : ''}`}
            value={data.loanPurpose || ''}
            onChange={(e) => onChange({ loanPurpose: e.target.value as MsmeLoanPurpose })}
          >
            <option value="" disabled>Select purpose of loan</option>
            {LOAN_PURPOSE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.loanPurpose && (
            <span className="msme-loan-field-error" role="alert">{errors.loanPurpose}</span>
          )}
        </div>

        <div className="msme-loan-form-group">
          <label htmlFor="msme-repayment-tenure" className="msme-loan-label">
            Repayment Tenure <span className="msme-loan-label__req">*</span>
          </label>
          <select
            id="msme-repayment-tenure"
            className={`msme-loan-select ${errors.repaymentTenure ? 'msme-loan-select--error' : ''}`}
            value={data.repaymentTenure || ''}
            onChange={(e) => onChange({ repaymentTenure: e.target.value as MsmeLoanTenure })}
          >
            <option value="" disabled>Select repayment tenure</option>
            {LOAN_TENURE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.repaymentTenure && (
            <span className="msme-loan-field-error" role="alert">{errors.repaymentTenure}</span>
          )}
        </div>
      </LoanFormSection>

      {/* 2. Existing Borrowings */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        }
        title="Existing Borrowings"
        subtitle="Declare any active loan accounts or credit facilities currently serviced."
      >
        <div className="msme-loan-form-group">
          <label className="msme-loan-label">Any Active Loan / EMI Obligations?</label>
          <div className="msme-loan-toggle-grid">
            <button
              type="button"
              className={`msme-loan-toggle-btn ${data.hasActiveBorrowings ? 'msme-loan-toggle-btn--active' : ''}`}
              onClick={() => onChange({ hasActiveBorrowings: true })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`msme-loan-toggle-btn ${!data.hasActiveBorrowings ? 'msme-loan-toggle-btn--active' : ''}`}
              onClick={() => onChange({ hasActiveBorrowings: false, totalExistingEmiOutgo: '' })}
            >
              No
            </button>
          </div>
        </div>

        {data.hasActiveBorrowings && (
          <div className="msme-loan-form-group">
            <label htmlFor="msme-emi-outgo" className="msme-loan-label">
              Total Monthly EMI Outgo (₹) <span className="msme-loan-label__req">*</span>
            </label>
            <input
              id="msme-emi-outgo"
              type="text"
              inputMode="numeric"
              className={`msme-loan-input ${errors.totalExistingEmiOutgo ? 'msme-loan-input--error' : ''}`}
              placeholder="Enter total monthly EMI across all active loans"
              value={data.totalExistingEmiOutgo ? loanInputHelpers.formatCurrencyString(String(data.totalExistingEmiOutgo)) : ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={handleEmiChange}
            />
            {errors.totalExistingEmiOutgo && (
              <span className="msme-loan-field-error" role="alert">{errors.totalExistingEmiOutgo}</span>
            )}
          </div>
        )}
      </LoanFormSection>
    </div>
  )
}

export default MsmeProfile
