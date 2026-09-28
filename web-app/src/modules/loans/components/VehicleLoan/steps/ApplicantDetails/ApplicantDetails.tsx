import React from 'react'
import { LoanFormSection } from '../../../../components/LoanFormSection/LoanFormSection'
import type {
  VehicleLoanData,
  VehicleOccupationType,
  VehicleIncomeRange,
} from '../../../../types/vehicleLoan.types'
import { loanInputHelpers } from '../../../../validation/vehicleLoanValidation'
import './ApplicantDetails.css'

export interface ApplicantDetailsProps {
  data: VehicleLoanData
  onChange: (fields: Partial<VehicleLoanData>) => void
  errors?: Record<string, string>
}

export const OCCUPATION_OPTIONS: VehicleOccupationType[] = [
  'Salaried',
  'Self-Employed Pro',
  'Business Owner',
]

export const INCOME_RANGE_OPTIONS: VehicleIncomeRange[] = [
  'Below ₹25,000 / month',
  '₹25,000 – ₹50,000 / month',
  '₹50,000 – ₹1,00,000 / month',
  '₹1,00,000 – ₹2,50,000 / month',
  'Above ₹2,50,000 / month',
  'Specify Exact Amount',
]

export const ApplicantDetails: React.FC<ApplicantDetailsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleTurnoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ annualTurnover: formatted })
  }

  const handleEmiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ totalMonthlyEmi: formatted })
  }

  const handleExactIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ exactMonthlyIncome: formatted })
  }

  const handleGstinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.cleanGstin(e.target.value)
    onChange({ gstin: clean })
  }

  return (
    <div className="applicant-details-step">
      {/* 1. Occupation Selection */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        }
        title="Employment & Occupation"
        subtitle="Select your occupation type. Underwriting checks and required financial proofs adapt based on this selection."
      >
        <div className="applicant-form-group">
          <div className="applicant-occupation-grid">
            {OCCUPATION_OPTIONS.map((occ) => {
              const isSelected = data.occupationType === occ
              return (
                <button
                  key={occ}
                  type="button"
                  className={`applicant-occupation-btn ${isSelected ? 'applicant-occupation-btn--active' : ''}`}
                  onClick={() => onChange({ occupationType: occ })}
                >
                  {occ}
                </button>
              )
            })}
          </div>
          {errors.occupationType && (
            <span className="applicant-field-error" role="alert">{errors.occupationType}</span>
          )}
        </div>
      </LoanFormSection>

      {/* 2. Monthly In-Hand Income */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="12" x="2" y="6" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>
        }
        title="Monthly In-Hand Income"
        subtitle="Select monthly take-home income range or specify your exact net income."
      >
        <div className="applicant-form-group">
          <label htmlFor="vehicle-income-select" className="applicant-label">
            Monthly Net Income (₹) <span className="applicant-label__req">*</span>
          </label>
          <select
            id="vehicle-income-select"
            className={`applicant-select ${errors.monthlyIncomeRange ? 'applicant-select--error' : ''}`}
            value={data.monthlyIncomeRange || ''}
            onChange={(e) => onChange({ monthlyIncomeRange: e.target.value as VehicleIncomeRange })}
          >
            <option value="" disabled>Select Monthly Income Range...</option>
            {INCOME_RANGE_OPTIONS.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          {errors.monthlyIncomeRange && (
            <span className="applicant-field-error" role="alert">{errors.monthlyIncomeRange}</span>
          )}

          {data.monthlyIncomeRange === 'Specify Exact Amount' && (
            <div className="applicant-form-group" style={{ marginTop: '0.75rem' }}>
              <label htmlFor="vehicle-exact-income" className="applicant-label">
                Exact Monthly Net Income (₹) <span className="applicant-label__req">*</span>
              </label>
              <input
                id="vehicle-exact-income"
                type="text"
                inputMode="numeric"
                className={`applicant-input ${errors.exactMonthlyIncome ? 'applicant-input--error' : ''}`}
                placeholder="Enter exact monthly income in ₹"
                value={data.exactMonthlyIncome ? loanInputHelpers.formatCurrencyString(String(data.exactMonthlyIncome)) : ''}
                onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
                onChange={handleExactIncomeChange}
              />
              {errors.exactMonthlyIncome && (
                <span className="applicant-field-error" role="alert">{errors.exactMonthlyIncome}</span>
              )}
            </div>
          )}
        </div>
      </LoanFormSection>

      {/* 3. Business Profile & Compliance (Shown for Business Owner & Self-Employed Pro) */}
      {(data.occupationType === 'Business Owner' || data.occupationType === 'Self-Employed Pro') && (
        <LoanFormSection
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="16" height="20" x="4" y="2" rx="2" />
              <path d="M9 22v-4h6v4" />
              <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
            </svg>
          }
          title="Business Profile & Compliance"
          subtitle="Provide enterprise details for commercial/auto-credit underwriting."
        >
          {/* Legal Business / Firm Name */}
          <div className="applicant-form-group">
            <label htmlFor="vehicle-biz-name" className="applicant-label">
              Legal Business / Firm Name <span className="applicant-label__req">*</span>
            </label>
            <input
              id="vehicle-biz-name"
              type="text"
              className={`applicant-input ${errors.legalBusinessName ? 'applicant-input--error' : ''}`}
              placeholder="Enter legal business / firm name"
              value={data.legalBusinessName || ''}
              onChange={(e) => onChange({ legalBusinessName: e.target.value })}
            />
            {errors.legalBusinessName && (
              <span className="applicant-field-error" role="alert">{errors.legalBusinessName}</span>
            )}
          </div>

          {/* GSTIN (15 Digits) */}
          <div className="applicant-form-group">
            <label htmlFor="vehicle-biz-gstin" className="applicant-label">
              GSTIN (15 Digits)
            </label>
            <input
              id="vehicle-biz-gstin"
              type="text"
              maxLength={15}
              className={`applicant-input ${errors.gstin ? 'applicant-input--error' : ''}`}
              placeholder="Enter 15-digit GSTIN (e.g. 27ABCDE1234F1Z5)"
              value={data.gstin || ''}
              onKeyDown={loanInputHelpers.allowOnlyAlphanumericKeyDown}
              onChange={handleGstinChange}
              style={{ textTransform: 'uppercase' }}
            />
            {errors.gstin && (
              <span className="applicant-field-error" role="alert">{errors.gstin}</span>
            )}
          </div>

          {/* Udyam Registration Number */}
          <div className="applicant-form-group">
            <label htmlFor="vehicle-biz-udyam" className="applicant-label">
              Udyam Registration Number
            </label>
            <input
              id="vehicle-biz-udyam"
              type="text"
              className="applicant-input"
              placeholder="Enter Udyam number (e.g. UDYAM-MH-01-0012345)"
              value={data.udyamNumber || ''}
              onChange={(e) => onChange({ udyamNumber: e.target.value.toUpperCase() })}
              style={{ textTransform: 'uppercase' }}
            />
          </div>

          {/* Business Vintage (in Years) */}
          <div className="applicant-form-group">
            <label htmlFor="vehicle-biz-vintage" className="applicant-label">
              Business Vintage (in Years) <span className="applicant-label__req">*</span>
            </label>
            <input
              id="vehicle-biz-vintage"
              type="text"
              inputMode="numeric"
              className={`applicant-input ${errors.businessVintageYears ? 'applicant-input--error' : ''}`}
              placeholder="Enter business vintage in years"
              value={data.businessVintageYears || ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={(e) => onChange({ businessVintageYears: loanInputHelpers.digitsOnly(e.target.value, 2) })}
            />
            {errors.businessVintageYears && (
              <span className="applicant-field-error" role="alert">{errors.businessVintageYears}</span>
            )}
          </div>

          {/* Annual Turnover (₹) */}
          <div className="applicant-form-group">
            <label htmlFor="vehicle-biz-turnover" className="applicant-label">
              Annual Turnover (₹) <span className="applicant-label__req">*</span>
            </label>
            <input
              id="vehicle-biz-turnover"
              type="text"
              inputMode="numeric"
              className={`applicant-input ${errors.annualTurnover ? 'applicant-input--error' : ''}`}
              placeholder="Enter annual turnover (₹)"
              value={data.annualTurnover ? loanInputHelpers.formatCurrencyString(String(data.annualTurnover)) : ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={handleTurnoverChange}
            />
            {errors.annualTurnover && (
              <span className="applicant-field-error" role="alert">{errors.annualTurnover}</span>
            )}
          </div>
        </LoanFormSection>
      )}

      {/* 4. Existing Loan Obligations */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        }
        title="Existing Loan Obligations"
        subtitle="Indicate if you have active ongoing loans or EMIs. Lenders use this to verify debt servicing capacity."
      >
        <div className="applicant-form-group">
          <div className="applicant-toggle-grid">
            <button
              type="button"
              className={`applicant-toggle-btn ${!data.hasActiveEmis ? 'applicant-toggle-btn--active' : ''}`}
              onClick={() => onChange({ hasActiveEmis: false, totalMonthlyEmi: '' })}
            >
              No Other EMIs
            </button>
            <button
              type="button"
              className={`applicant-toggle-btn ${data.hasActiveEmis ? 'applicant-toggle-btn--active' : ''}`}
              onClick={() => onChange({ hasActiveEmis: true })}
            >
              Yes, Active EMIs
            </button>
          </div>
        </div>

        {data.hasActiveEmis && (
          <div className="applicant-form-group" style={{ marginTop: '1rem' }}>
            <label htmlFor="vehicle-total-emi" className="applicant-label">
              Total Ongoing Monthly EMI (₹) <span className="applicant-label__req">*</span>
            </label>
            <input
              id="vehicle-total-emi"
              type="text"
              inputMode="numeric"
              className={`applicant-input ${errors.totalMonthlyEmi ? 'applicant-input--error' : ''}`}
              placeholder="Enter total ongoing monthly EMI (₹)"
              value={data.totalMonthlyEmi ? loanInputHelpers.formatCurrencyString(String(data.totalMonthlyEmi)) : ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={handleEmiChange}
            />
            {errors.totalMonthlyEmi && (
              <span className="applicant-field-error" role="alert">{errors.totalMonthlyEmi}</span>
            )}
          </div>
        )}
      </LoanFormSection>
    </div>
  )
}

export default ApplicantDetails
