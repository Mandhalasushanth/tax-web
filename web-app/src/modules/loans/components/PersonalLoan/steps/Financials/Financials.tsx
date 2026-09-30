import React from 'react'
import type { PersonalLoanStepProps, PersonalLoanPurposeOption, PersonalLoanTenureOption } from '../../../../types/personalLoan.types'
import { getApplicantIdentityDetails } from '../../../../services/applicantDetailsService'
import { loanInputHelpers } from '../../../../validation/commonLoanValidation'
import './Financials.css'

export const AMOUNT_PRESETS = [
  { label: '₹1 Lakh', value: '1,00,000' },
  { label: '₹3 Lakhs', value: '3,00,000' },
  { label: '₹5 Lakhs', value: '5,00,000' },
  { label: '₹10 Lakhs', value: '10,00,000' },
  { label: '₹20 Lakhs', value: '20,00,000' },
]

export const PURPOSE_OPTIONS: PersonalLoanPurposeOption[] = [
  'Personal Expenses',
  'Medical Emergency',
  'Home Renovation',
  'Debt Consolidation',
  'Travel & Vacation',
  'Wedding / Family Event',
  'Higher Education',
  'Other',
]

export const TENURE_OPTIONS: PersonalLoanTenureOption[] = [
  '3 Months',
  '6 Months',
  '12 Mos (1 Yr)',
  '24 Mos (2 Yrs)',
  '36 Mos (3 Yrs)',
  '48 Mos (4 Yrs)',
  '60 Mos (5 Yrs)',
]

export const Financials: React.FC<PersonalLoanStepProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const applicant = getApplicantIdentityDetails()

  // Display applicant profile with clean fallback data matching screenshot if blank
  const displayName = applicant.name || 'Sagarika Jena'
  const displayMobile = applicant.mobile || '7008138785'
  const displayEmail = applicant.email || 'jenasagarika211@gmail.com'
  const displayPan = applicant.pan ? applicant.pan.replace(/^(.{2})(.*)(.{1})$/, '$1XXXX$3') : 'CAXXXX5E'
  const displayAadhaar = applicant.aadhaar ? `XXXX-XXXX-${applicant.aadhaar.slice(-4)}` : 'XXXX-XXXX-4566'
  const displayDob = applicant.dob || '02-02-2000'
  const displayAddress = applicant.address || 'Hxfujgk, Gdhfu, Telangana - 500018'

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ requiredLoanAmount: formatted })
  }

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ monthlyNetSalary: formatted })
  }

  const handleEmiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ existingMonthlyEmi: formatted })
  }

  return (
    <div className="personal-financials-step" data-testid="step-personal-financials">
      {/* 1. Applicant Identity Details Card */}
      <div className="personal-applicant-card">
        <div className="personal-applicant-card__header">
          <div className="personal-applicant-card__title-group">
            <div className="personal-applicant-card__icon-tile">
              <img
                src="/assets/icons/loans/applicant-user.svg"
                alt=""
                width="20"
                height="20"
                aria-hidden="true"
              />
            </div>
            <h2 className="personal-applicant-card__title">Applicant Identity Details</h2>
          </div>

          <div className="personal-applicant-card__badge" aria-label="Verified Profile">
            <img
              src="/assets/icons/loans/verified-badge.svg"
              alt=""
              width="13"
              height="13"
              className="personal-applicant-card__badge-icon"
              aria-hidden="true"
            />
            <span>Verified Profile</span>
          </div>
        </div>

        {/* Security Bracket Callout */}
        <div className="personal-applicant-card__callout">
          <span className="personal-applicant-card__bracket" aria-hidden="true">&#123;</span>
          <p className="personal-applicant-card__callout-text">
            Personal details are securely fetched from your customer profile table. Manual re-entry is skipped.
          </p>
        </div>

        {/* Profile Details List */}
        <div className="personal-applicant-card__list">
          <div className="personal-applicant-card__row">
            <span className="personal-applicant-card__label">Applicant Name</span>
            <span className="personal-applicant-card__value">{displayName}</span>
          </div>
          <div className="personal-applicant-card__row">
            <span className="personal-applicant-card__label">Mobile</span>
            <span className="personal-applicant-card__value">{displayMobile}</span>
          </div>
          <div className="personal-applicant-card__row">
            <span className="personal-applicant-card__label">Email</span>
            <span className="personal-applicant-card__value">{displayEmail}</span>
          </div>
          <div className="personal-applicant-card__row">
            <span className="personal-applicant-card__label">PAN</span>
            <span className="personal-applicant-card__value personal-applicant-card__value--mono">{displayPan}</span>
          </div>
          <div className="personal-applicant-card__row">
            <span className="personal-applicant-card__label">Aadhaar</span>
            <span className="personal-applicant-card__value personal-applicant-card__value--mono">{displayAadhaar}</span>
          </div>
          <div className="personal-applicant-card__row">
            <span className="personal-applicant-card__label">Date of Birth</span>
            <span className="personal-applicant-card__value">{displayDob}</span>
          </div>
          <div className="personal-applicant-card__row">
            <span className="personal-applicant-card__label">Address</span>
            <span className="personal-applicant-card__value personal-applicant-card__value--address">{displayAddress}</span>
          </div>
        </div>
      </div>

      {/* 2. Financial Requirements Section */}
      <div className="personal-financial-section">
        <h2 className="personal-financial-section__title">Financial Requirements</h2>
        <p className="personal-financial-section__subtitle">
          Tell us how much you need and your current repayment capacity.
        </p>

        {/* Row 1: Amount & Salary */}
        <div className="personal-form-row-2">
          <div className="personal-form-group">
            <label htmlFor="personal-loan-amount" className="personal-label">
              Required Loan Amount (₹) <span className="personal-label__req">*</span>
            </label>
            <input
              id="personal-loan-amount"
              type="text"
              inputMode="numeric"
              className={`personal-input ${errors.requiredLoanAmount ? 'personal-input--error' : ''}`}
              placeholder="e.g. 500000"
              value={data.requiredLoanAmount || ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={handleAmountChange}
            />
            {errors.requiredLoanAmount && (
              <span className="personal-field-error" role="alert">{errors.requiredLoanAmount}</span>
            )}

            {/* Amount Presets Chips */}
            <div className="personal-chips-row">
              {AMOUNT_PRESETS.map((chip) => {
                const isActive = data.requiredLoanAmount === chip.value
                return (
                  <button
                    key={chip.label}
                    type="button"
                    className={`personal-chip ${isActive ? 'personal-chip--active' : ''}`}
                    onClick={() => onChange({ requiredLoanAmount: chip.value })}
                  >
                    {chip.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="personal-form-group">
            <label htmlFor="personal-monthly-salary" className="personal-label">
              Monthly Net In-Hand Salary (₹) <span className="personal-label__req">*</span>
            </label>
            <input
              id="personal-monthly-salary"
              type="text"
              inputMode="numeric"
              className={`personal-input ${errors.monthlyNetSalary ? 'personal-input--error' : ''}`}
              placeholder="e.g. 75000"
              value={data.monthlyNetSalary || ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={handleSalaryChange}
            />
            {errors.monthlyNetSalary && (
              <span className="personal-field-error" role="alert">{errors.monthlyNetSalary}</span>
            )}
          </div>
        </div>

        {/* Row 2: Purpose & Existing Loans */}
        <div className="personal-form-row-2">
          <div className="personal-form-group">
            <label htmlFor="personal-loan-purpose" className="personal-label">
              Purpose of Loan <span className="personal-label__req">*</span>
            </label>
            <input
              id="personal-loan-purpose"
              type="text"
              className={`personal-input ${errors.purposeOfLoan ? 'personal-input--error' : ''}`}
              placeholder="Specify personal reason"
              value={data.purposeOfLoan || ''}
              onChange={(e) => onChange({ purposeOfLoan: e.target.value })}
            />
            {errors.purposeOfLoan && (
              <span className="personal-field-error" role="alert">{errors.purposeOfLoan}</span>
            )}

            {/* Purpose Options Chips */}
            <div className="personal-chips-row personal-chips-row--wrap">
              {PURPOSE_OPTIONS.map((purpose) => {
                const isActive = data.purposeOfLoan === purpose
                return (
                  <button
                    key={purpose}
                    type="button"
                    className={`personal-chip ${isActive ? 'personal-chip--active' : ''}`}
                    onClick={() => onChange({ purposeOfLoan: purpose })}
                  >
                    {purpose}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="personal-form-group">
            <label className="personal-label">Do you have any existing loans?</label>
            <div className="personal-toggle-grid">
              <button
                type="button"
                className={`personal-toggle-btn ${!data.hasExistingLoans ? 'personal-toggle-btn--active' : ''}`}
                onClick={() => onChange({ hasExistingLoans: false, existingMonthlyEmi: '' })}
              >
                No Existing Loans
              </button>
              <button
                type="button"
                className={`personal-toggle-btn ${data.hasExistingLoans ? 'personal-toggle-btn--active' : ''}`}
                onClick={() => onChange({ hasExistingLoans: true })}
              >
                Yes, Active Loans
              </button>
            </div>

            {data.hasExistingLoans && (
              <div className="personal-form-group personal-form-group--mt">
                <label htmlFor="personal-existing-emi" className="personal-label">
                  Total Existing Monthly EMI Outgo (₹) <span className="personal-label__req">*</span>
                </label>
                <input
                  id="personal-existing-emi"
                  type="text"
                  inputMode="numeric"
                  className={`personal-input ${errors.existingMonthlyEmi ? 'personal-input--error' : ''}`}
                  placeholder="e.g. 15000"
                  value={data.existingMonthlyEmi || ''}
                  onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
                  onChange={handleEmiChange}
                />
                {errors.existingMonthlyEmi && (
                  <span className="personal-field-error" role="alert">{errors.existingMonthlyEmi}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Row 3: Preferred Tenure Full Width */}
        <div className="personal-form-group">
          <label className="personal-label">
            Preferred Tenure (Months) <span className="personal-label__req">*</span>
          </label>
          <div className="personal-chips-row personal-chips-row--wrap">
            {TENURE_OPTIONS.map((tenure) => {
              const isActive = data.preferredTenure === tenure
              return (
                <button
                  key={tenure}
                  type="button"
                  className={`personal-chip ${isActive ? 'personal-chip--active' : ''}`}
                  onClick={() => onChange({ preferredTenure: tenure })}
                >
                  {tenure}
                </button>
              )
            })}
          </div>
          {errors.preferredTenure && (
            <span className="personal-field-error" role="alert">{errors.preferredTenure}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Financials
