import React from 'react'
import { LoanFormSection } from '../../../../components/LoanFormSection/LoanFormSection'
import type { HomeLoanData, HomeLoanOccupation } from '../../types/homeLoan.types'
import { loanInputHelpers } from '../../validation/homeLoanValidation'
import './EmploymentAndIncome.css'

export interface EmploymentAndIncomeProps {
  data: HomeLoanData
  onChange: (fields: Partial<HomeLoanData>) => void
  errors?: Record<string, string>
}

const OCCUPATION_OPTIONS: { id: HomeLoanOccupation; label: string }[] = [
  { id: 'salaried', label: 'Salaried' },
  { id: 'self-employed', label: 'Self-Employed Pro' },
  { id: 'business-owner', label: 'Business Owner' },
]

const INCOME_RANGES = [
  '₹30,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,00,000',
  '₹2,00,000 - ₹5,00,000',
  '₹5,00,000+',
]

export const EmploymentAndIncome: React.FC<EmploymentAndIncomeProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleEmiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ existingEmiAmount: formatted })
  }

  return (
    <div className="home-loan-emp">
      {/* 1. Employment & Income Category */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="7" rx="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        }
        title="Employment &amp; Income Category"
        subtitle="Select your occupation type. Underwriting checks and required financial proofs adapt based on this selection."
      >
        <div className="home-loan-emp-categories">
          {OCCUPATION_OPTIONS.map((opt) => {
            const isSelected = data.occupation === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                className={`home-loan-emp-btn ${isSelected ? 'home-loan-emp-btn--active' : ''}`}
                onClick={() => onChange({ occupation: opt.id })}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
        {errors.occupation && (
          <span className="home-loan-field-error" role="alert">{errors.occupation}</span>
        )}
      </LoanFormSection>

      {/* 2. Monthly Household Income */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-1.8.3-.7.5-1.5.5-2.2 0-2.7-1.9-4-2.5-4.5V5z" />
            <path d="M6 12h8" />
            <circle cx="16" cy="11" r="1" />
          </svg>
        }
        title="Monthly Household Income"
        subtitle="Select monthly household income range or enter your exact net income."
      >
        <div className="home-loan-form-group">
          <label htmlFor="home-loan-monthly-income" className="home-loan-label">
            Monthly Net Income (₹) <span className="home-loan-label__req">*</span>
          </label>
          <select
            id="home-loan-monthly-income"
            className={`home-loan-select ${errors.monthlyIncomeRange ? 'home-loan-select--error' : ''}`}
            value={data.monthlyIncomeRange || ''}
            onChange={(e) => onChange({ monthlyIncomeRange: e.target.value })}
          >
            <option value="" disabled>Select monthly net take-home income range</option>
            {INCOME_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          {errors.monthlyIncomeRange && (
            <span className="home-loan-field-error" role="alert">{errors.monthlyIncomeRange}</span>
          )}
        </div>
      </LoanFormSection>

      {/* 3. Existing Loan Obligations */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        }
        title="Existing Loan Obligations"
        subtitle="Indicate if you have active ongoing loans or EMIs. Lenders use this to verify debt servicing capacity."
      >
        <div className="home-loan-emi-toggle">
          <button
            type="button"
            className={`home-loan-emi-btn ${!data.hasExistingEmis ? 'home-loan-emi-btn--active' : ''}`}
            onClick={() => onChange({ hasExistingEmis: false, existingEmiAmount: '' })}
          >
            <span>No Other EMIs</span>
          </button>
          <button
            type="button"
            className={`home-loan-emi-btn ${data.hasExistingEmis ? 'home-loan-emi-btn--active' : ''}`}
            onClick={() => onChange({ hasExistingEmis: true })}
          >
            <span>Yes, Paying EMIs</span>
          </button>
        </div>

        {data.hasExistingEmis && (
          <div className="home-loan-emi-input-wrap home-loan-form-group">
            <label htmlFor="home-loan-emi-val" className="home-loan-label">
              Total Ongoing Monthly EMI Amount (₹) <span className="home-loan-label__req">*</span>
            </label>
            <input
              id="home-loan-emi-val"
              type="text"
              inputMode="numeric"
              className={`home-loan-input ${errors.existingEmiAmount ? 'home-loan-input--error' : ''}`}
              placeholder="Enter total ongoing monthly EMI amount in ₹ (e.g. 15,000)"
              value={data.existingEmiAmount || ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={handleEmiChange}
            />
            {errors.existingEmiAmount && (
              <span className="home-loan-field-error" role="alert">{errors.existingEmiAmount}</span>
            )}
          </div>
        )}
      </LoanFormSection>
    </div>
  )
}

export default EmploymentAndIncome
