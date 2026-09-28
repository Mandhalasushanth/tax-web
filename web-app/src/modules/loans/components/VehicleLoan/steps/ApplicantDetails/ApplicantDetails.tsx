import React from 'react'
import { LoanFormSection } from '../../../../components/LoanFormSection/LoanFormSection'
import type {
  VehicleLoanData,
  VehicleEmploymentType,
} from '../../../../types/vehicleLoan.types'
import { loanInputHelpers } from '../../../../validation/vehicleLoanValidation'
import './ApplicantDetails.css'

export interface ApplicantDetailsProps {
  data: VehicleLoanData
  onChange: (fields: Partial<VehicleLoanData>) => void
  errors?: Record<string, string>
}

export const EMPLOYMENT_TYPE_OPTIONS: VehicleEmploymentType[] = [
  'Salaried',
  'Self Employed Professional',
  'Self Employed Business',
]

export const ApplicantDetails: React.FC<ApplicantDetailsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ monthlyNetIncome: formatted })
  }

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.cleanPan(e.target.value)
    onChange({ panNumber: clean })
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.digitsOnly(e.target.value, 10)
    onChange({ mobileNumber: clean })
  }

  return (
    <div className="vehicle-loan-step">
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        }
        title="Applicant & Employment Profile"
        subtitle="Provide primary borrower KYC details, employment type, and monthly net income."
      >
        {/* Full Name */}
        <div className="vehicle-loan-form-group">
          <label htmlFor="vehicle-applicant-name" className="vehicle-loan-label">
            Full Name (As per PAN) <span className="vehicle-loan-label__req">*</span>
          </label>
          <input
            id="vehicle-applicant-name"
            type="text"
            className={`vehicle-loan-input ${errors.fullName ? 'vehicle-loan-input--error' : ''}`}
            placeholder="Enter full legal name"
            value={data.fullName || ''}
            onChange={(e) => onChange({ fullName: e.target.value })}
          />
          {errors.fullName && (
            <span className="vehicle-loan-field-error" role="alert">{errors.fullName}</span>
          )}
        </div>

        {/* Mobile Number */}
        <div className="vehicle-loan-form-group">
          <label htmlFor="vehicle-mobile" className="vehicle-loan-label">
            Mobile Number <span className="vehicle-loan-label__req">*</span>
          </label>
          <input
            id="vehicle-mobile"
            type="text"
            inputMode="numeric"
            maxLength={10}
            className={`vehicle-loan-input ${errors.mobileNumber ? 'vehicle-loan-input--error' : ''}`}
            placeholder="Enter 10-digit mobile number"
            value={data.mobileNumber || ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handlePhoneChange}
          />
          {errors.mobileNumber && (
            <span className="vehicle-loan-field-error" role="alert">{errors.mobileNumber}</span>
          )}
        </div>

        {/* PAN Card */}
        <div className="vehicle-loan-form-group">
          <label htmlFor="vehicle-pan" className="vehicle-loan-label">
            PAN Number <span className="vehicle-loan-label__req">*</span>
          </label>
          <input
            id="vehicle-pan"
            type="text"
            maxLength={10}
            className={`vehicle-loan-input ${errors.panNumber ? 'vehicle-loan-input--error' : ''}`}
            placeholder="e.g. ABCDE1234F"
            value={data.panNumber || ''}
            onKeyDown={loanInputHelpers.allowOnlyAlphanumericKeyDown}
            onChange={handlePanChange}
          />
          {errors.panNumber && (
            <span className="vehicle-loan-field-error" role="alert">{errors.panNumber}</span>
          )}
        </div>

        {/* Employment Type */}
        <div className="vehicle-loan-form-group">
          <label className="vehicle-loan-label">
            Employment Type <span className="vehicle-loan-label__req">*</span>
          </label>
          <div className="vehicle-loan-pill-grid">
            {EMPLOYMENT_TYPE_OPTIONS.map((emp) => {
              const isSelected = data.employmentType === emp
              return (
                <button
                  key={emp}
                  type="button"
                  className={`vehicle-loan-pill-btn ${isSelected ? 'vehicle-loan-pill-btn--active' : ''}`}
                  onClick={() => onChange({ employmentType: emp })}
                >
                  {emp}
                </button>
              )
            })}
          </div>
          {errors.employmentType && (
            <span className="vehicle-loan-field-error" role="alert">{errors.employmentType}</span>
          )}
        </div>

        {/* Monthly Net Income */}
        <div className="vehicle-loan-form-group">
          <label htmlFor="vehicle-monthly-income" className="vehicle-loan-label">
            Monthly Net Income (₹) <span className="vehicle-loan-label__req">*</span>
          </label>
          <input
            id="vehicle-monthly-income"
            type="text"
            inputMode="numeric"
            className={`vehicle-loan-input ${errors.monthlyNetIncome ? 'vehicle-loan-input--error' : ''}`}
            placeholder="Enter monthly take-home salary or net income"
            value={data.monthlyNetIncome ? loanInputHelpers.formatCurrencyString(String(data.monthlyNetIncome)) : ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handleIncomeChange}
          />
          {errors.monthlyNetIncome && (
            <span className="vehicle-loan-field-error" role="alert">{errors.monthlyNetIncome}</span>
          )}
        </div>

        {/* City */}
        <div className="vehicle-loan-form-group">
          <label htmlFor="vehicle-city" className="vehicle-loan-label">
            Current City <span className="vehicle-loan-label__req">*</span>
          </label>
          <input
            id="vehicle-city"
            type="text"
            className={`vehicle-loan-input ${errors.city ? 'vehicle-loan-input--error' : ''}`}
            placeholder="e.g. Hyderabad / Mumbai"
            value={data.city || ''}
            onChange={(e) => onChange({ city: e.target.value })}
          />
          {errors.city && (
            <span className="vehicle-loan-field-error" role="alert">{errors.city}</span>
          )}
        </div>
      </LoanFormSection>
    </div>
  )
}

export default ApplicantDetails
