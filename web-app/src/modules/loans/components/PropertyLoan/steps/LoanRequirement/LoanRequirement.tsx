import React from 'react'
import type { PropertyLoanStepProps } from '../../../../types/propertyLoan.types'
import './LoanRequirement.css'

export const LoanRequirement: React.FC<PropertyLoanStepProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  // Calculate indicative EMI dynamically: P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateEmi = (principalStr: string, tenureStr: string): number => {
    const p = parseFloat(String(principalStr || '').replace(/,/g, ''))
    if (!p || isNaN(p) || p <= 0) return 0
    const years = parseFloat(tenureStr) || 15
    const r = 0.095 / 12
    const n = years * 12
    if (r === 0 || n === 0) return 0
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    return Math.round(emi)
  }

  const emiAmount = calculateEmi(data.requiredAmount, data.tenureYears)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    if (!raw) {
      onChange({ requiredAmount: '' })
      return
    }
    const num = parseInt(raw, 10)
    // Format with Indian commas
    onChange({ requiredAmount: num.toLocaleString('en-IN') })
  }

  return (
    <div className="property-loan-step property-requirement-step" data-testid="step-loan-requirement">
      {/* 1. Property Title Holder / Applicant Card */}
      <div className="property-card property-applicant-card">
        <div className="property-card__header">
          <div className="property-card__title-group">
            <div className="property-card__icon-tile property-card__icon-tile--blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2 className="property-card__title">Property Title Holder / Applicant</h2>
          </div>
          <span className="property-verified-badge">
            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified Profile
          </span>
        </div>

        <div className="property-applicant-grid">
          <div className="property-meta-item">
            <span className="property-meta-item__label">Applicant / Title Holder</span>
            <span className="property-meta-item__value">{data.titleHolderName || 'Sagarika Jena'}</span>
          </div>

          <div className="property-meta-item">
            <span className="property-meta-item__label">Mobile</span>
            <span className="property-meta-item__value">{data.titleHolderMobile || '7008138785'}</span>
          </div>

          <div className="property-meta-item">
            <span className="property-meta-item__label">Email</span>
            <span className="property-meta-item__value">{data.titleHolderEmail || 'jenasagarika211@gmail.com'}</span>
          </div>

          <div className="property-meta-item">
            <span className="property-meta-item__label">PAN</span>
            <span className="property-meta-item__value">{data.titleHolderPan || 'CAXXXX5E'}</span>
          </div>

          <div className="property-meta-item">
            <span className="property-meta-item__label">Aadhaar</span>
            <span className="property-meta-item__value">{data.titleHolderAadhaar || 'XXXX-XXXX-4566'}</span>
          </div>

          <div className="property-meta-item">
            <span className="property-meta-item__label">Date of Birth</span>
            <span className="property-meta-item__value">{data.titleHolderDob || '02-02-2000'}</span>
          </div>

          <div className="property-meta-item property-meta-item--full">
            <span className="property-meta-item__label">Registered Address</span>
            <span className="property-meta-item__value">{data.titleHolderAddress || 'Hxbiujgk, Gdhiu, Telangana - 500018'}</span>
          </div>
        </div>
      </div>

      {/* 2. Loan Requirement Card */}
      <div className="property-card property-loan-req-card">
        <h2 className="property-card__heading">Loan Requirement</h2>
        <p className="property-card__subtext">
          Tell us how much you need and what it is for. You can review everything before you submit.
        </p>

        <div className="property-form-grid">
          {/* Loan Purpose */}
          <div className="property-form-field">
            <label className="property-form-label" htmlFor="lap-purpose">
              Loan Purpose <span className="property-required-star">*</span>
            </label>
            <div className="property-select-wrap">
              <select
                id="lap-purpose"
                className={`property-form-select ${errors.loanPurpose ? 'property-input--error' : ''}`}
                value={data.loanPurpose || ''}
                onChange={(e) => onChange({ loanPurpose: e.target.value })}
              >
                <option value="">Select purpose</option>
                <option value="Business Expansion">Business Expansion</option>
                <option value="Working Capital">Working Capital</option>
                <option value="Debt Consolidation">Debt Consolidation</option>
                <option value="Education">Education</option>
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Home Renovation">Home Renovation</option>
                <option value="Personal Needs">Personal Needs</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {errors.loanPurpose && <span className="property-error-text">{errors.loanPurpose}</span>}
          </div>

          {/* Required Loan Amount */}
          <div className="property-form-field">
            <label className="property-form-label" htmlFor="lap-amount">
              Required Loan Amount <span className="property-required-star">*</span>
            </label>
            <div className={`property-input-prefix-box ${errors.requiredAmount ? 'property-input--error' : ''}`}>
              <span className="property-input-prefix">₹</span>
              <input
                id="lap-amount"
                type="text"
                className="property-input-prefixed"
                placeholder="50,00,000"
                value={data.requiredAmount || ''}
                onChange={handleAmountChange}
              />
            </div>
            <span className="property-field-hint">Final amount depends on your property's value and eligibility.</span>
            {errors.requiredAmount && <span className="property-error-text">{errors.requiredAmount}</span>}
          </div>

          {/* Preferred Tenure */}
          <div className="property-form-field">
            <label className="property-form-label" htmlFor="lap-tenure">
              Preferred Tenure <span className="property-required-star">*</span>
            </label>
            <div className="property-select-wrap">
              <select
                id="lap-tenure"
                className={`property-form-select ${errors.tenureYears ? 'property-input--error' : ''}`}
                value={data.tenureYears || ''}
                onChange={(e) => onChange({ tenureYears: e.target.value })}
              >
                <option value="">Select tenure</option>
                <option value="5">5 Years</option>
                <option value="7">7 Years</option>
                <option value="10">10 Years</option>
                <option value="15">15 Years</option>
                <option value="20">20 Years</option>
              </select>
            </div>
            {errors.tenureYears && <span className="property-error-text">{errors.tenureYears}</span>}
          </div>

          {/* Applicant Type */}
          <div className="property-form-field">
            <label className="property-form-label" htmlFor="lap-applicant-type">
              Applicant Type <span className="property-required-star">*</span>
            </label>
            <div className="property-select-wrap">
              <select
                id="lap-applicant-type"
                className={`property-form-select ${errors.applicantType ? 'property-input--error' : ''}`}
                value={data.applicantType || ''}
                onChange={(e) => onChange({ applicantType: e.target.value })}
              >
                <option value="">Select applicant type</option>
                <option value="salaried">Salaried</option>
                <option value="self_employed_professional">Self Employed Professional</option>
                <option value="self_employed_business">Self Employed Non-Professional / Business</option>
              </select>
            </div>
            {errors.applicantType && <span className="property-error-text">{errors.applicantType}</span>}
          </div>

          {/* Existing customer with us? */}
          <div className="property-form-field property-form-field--full">
            <label className="property-form-label">
              Existing customer with us? <span className="property-required-star">*</span>
            </label>
            <div className="property-toggle-group">
              <button
                type="button"
                className={`property-toggle-btn ${data.isExistingCustomer === true ? 'property-toggle-btn--active' : ''}`}
                onClick={() => onChange({ isExistingCustomer: true })}
              >
                Yes
              </button>
              <button
                type="button"
                className={`property-toggle-btn ${data.isExistingCustomer === false ? 'property-toggle-btn--active' : ''}`}
                onClick={() => onChange({ isExistingCustomer: false })}
              >
                No
              </button>
            </div>
            {errors.isExistingCustomer && <span className="property-error-text">{errors.isExistingCustomer}</span>}
          </div>
        </div>

        {/* Indicative EMI tile */}
        <div className="property-emi-tile">
          <div className="property-emi-tile__left">
            <div className="property-emi-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="16" height="20" x="4" y="2" rx="2" />
                <line x1="8" y1="6" x2="16" y2="6" />
                <line x1="8" y1="10" x2="16" y2="10" />
                <line x1="8" y1="14" x2="16" y2="14" />
                <line x1="8" y1="18" x2="16" y2="18" />
              </svg>
            </div>
            <div className="property-emi-info">
              <span className="property-emi-label">Indicative EMI</span>
              <div className="property-emi-val">
                ₹{emiAmount.toLocaleString('en-IN')}{' '}
                <span className="property-emi-period">/ month</span>
              </div>
              <p className="property-emi-subtext">
                Calculated at 9.5% p.a. for {data.tenureYears || 15} years. The final rate is decided after credit and property assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanRequirement
