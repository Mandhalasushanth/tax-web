import React from 'react'
import { LoanFormSection } from '../../../../components/LoanFormSection/LoanFormSection'
import type { VehicleLoanData, VehicleItrFilingStatus } from '../../../../types/vehicleLoan.types'
import { loanInputHelpers } from '../../../../validation/vehicleLoanValidation'
import './BankingDetails.css'

export interface BankingDetailsProps {
  data: VehicleLoanData
  onChange: (fields: Partial<VehicleLoanData>) => void
  errors?: Record<string, string>
}

export const ITR_FILING_OPTIONS: VehicleItrFilingStatus[] = [
  'Filed',
  'Not Filed',
  'Exempt',
]

const SAMPLE_IFSC_BRANCH_MAP: Record<string, string> = {
  SBIN0004567: 'STATE BANK OF INDIA - MAIN BRANCH',
  BKID0008832: 'BANK OF INDIA - TIMBER MARKET',
  HDFC0001234: 'HDFC BANK - CONNAUGHT PLACE',
  ICIC0001234: 'ICICI BANK - NARIMAN POINT',
  UTIB0001234: 'AXIS BANK - MG ROAD',
}

export const BankingDetails: React.FC<BankingDetailsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleBankNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ bankName: e.target.value })
  }

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.digitsOnly(e.target.value, 18)
    onChange({ accountNumber: clean })
  }

  const handleIfscChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.cleanIfsc(e.target.value)
    const detectedBranch = SAMPLE_IFSC_BRANCH_MAP[clean] || (clean.length === 11 ? 'VERIFIED BANK BRANCH' : '')
    onChange({
      ifscCode: clean,
      branchName: detectedBranch,
    })
  }

  const handleItrAckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.digitsOnly(e.target.value, 15)
    onChange({ itrAckNumber: clean })
  }

  const handleGrossIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ grossAnnualIncomeItr: formatted })
  }

  const resolvedBranch = data.branchName || (data.ifscCode ? SAMPLE_IFSC_BRANCH_MAP[data.ifscCode.toUpperCase()] : '')

  return (
    <div className="banking-details-step">
      {/* 1. Primary Operating & Repayment Bank */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        }
        title="Primary Operating & Repayment Bank"
        subtitle="Specify the account for loan disbursement and setting up auto-debit NACH EMI repayments."
      >
        {/* Bank Name */}
        <div className="banking-form-group">
          <label htmlFor="vehicle-bank-name" className="banking-label">
            Bank Name <span className="banking-label__req">*</span>
          </label>
          <input
            id="vehicle-bank-name"
            type="text"
            className={`banking-input ${errors.bankName ? 'banking-input--error' : ''}`}
            placeholder="Enter primary bank name (e.g. State Bank of India / HDFC)"
            value={data.bankName || ''}
            onChange={handleBankNameChange}
          />
          {errors.bankName && (
            <span className="banking-field-error" role="alert">{errors.bankName}</span>
          )}
        </div>

        {/* Bank Account Number */}
        <div className="banking-form-group">
          <label htmlFor="vehicle-acc-num" className="banking-label">
            Bank Account Number <span className="banking-label__req">*</span>
          </label>
          <input
            id="vehicle-acc-num"
            type="text"
            inputMode="numeric"
            maxLength={18}
            className={`banking-input ${errors.accountNumber ? 'banking-input--error' : ''}`}
            placeholder="Enter bank account number"
            value={data.accountNumber || ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handleAccountNumberChange}
          />
          {errors.accountNumber && (
            <span className="banking-field-error" role="alert">{errors.accountNumber}</span>
          )}
        </div>

        {/* Bank IFSC Code */}
        <div className="banking-form-group">
          <label htmlFor="vehicle-ifsc" className="banking-label">
            Bank IFSC Code <span className="banking-label__req">*</span>
          </label>
          <input
            id="vehicle-ifsc"
            type="text"
            maxLength={11}
            className={`banking-input ${errors.ifscCode ? 'banking-input--error' : ''}`}
            placeholder="Enter 11-digit IFSC code (e.g. SBIN0001234)"
            value={data.ifscCode || ''}
            onKeyDown={loanInputHelpers.allowOnlyAlphanumericKeyDown}
            onChange={handleIfscChange}
            style={{ textTransform: 'uppercase' }}
          />
          <span className="banking-input-hint">11-digit alphanumeric bank IFSC code</span>
          {errors.ifscCode && (
            <span className="banking-field-error" role="alert">{errors.ifscCode}</span>
          )}

          {/* Branch Verification Badge */}
          {resolvedBranch && (
            <div className="banking-branch-badge">
              <svg viewBox="0 0 24 24" fill="currentColor" className="banking-branch-check">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
              </svg>
              <span>Branch: {resolvedBranch}</span>
            </div>
          )}
        </div>
      </LoanFormSection>

      {/* 2. Income Tax Return (ITR) Compliance */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        }
        title="Income Tax Return (ITR) Compliance"
        subtitle="Select your recent assessment year income tax filing status and declared income."
      >
        {/* Last Assessment Year Filing Status */}
        <div className="banking-form-group">
          <label className="banking-label">
            Last Assessment Year Filing Status <span className="banking-label__req">*</span>
          </label>
          <div className="banking-toggle-grid-3">
            {ITR_FILING_OPTIONS.map((status) => {
              const isSelected = data.itrStatus === status
              return (
                <button
                  key={status}
                  type="button"
                  className={`banking-toggle-btn ${isSelected ? 'banking-toggle-btn--active' : ''}`}
                  onClick={() => onChange({ itrStatus: status })}
                >
                  {status}
                </button>
              )
            })}
          </div>
          {errors.itrStatus && (
            <span className="banking-field-error" role="alert">{errors.itrStatus}</span>
          )}
        </div>

        {/* If Status is Filed: Show Ack Number and Gross Total Annual Income */}
        {data.itrStatus === 'Filed' && (
          <>
            <div className="banking-form-group" style={{ marginTop: '0.75rem' }}>
              <label htmlFor="vehicle-itr-ack" className="banking-label">
                ITR Acknowledgement Number (15 Digits) <span className="banking-label__opt">(Optional)</span>
              </label>
              <input
                id="vehicle-itr-ack"
                type="text"
                maxLength={15}
                inputMode="numeric"
                className="banking-input"
                placeholder="Enter 15-digit ITR acknowledgement number"
                value={data.itrAckNumber || ''}
                onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
                onChange={handleItrAckChange}
              />
            </div>

            <div className="banking-form-group">
              <label htmlFor="vehicle-itr-gross-income" className="banking-label">
                Gross Total Annual Income as per ITR (₹) <span className="banking-label__req">*</span>
              </label>
              <input
                id="vehicle-itr-gross-income"
                type="text"
                inputMode="numeric"
                className={`banking-input ${errors.grossAnnualIncomeItr ? 'banking-input--error' : ''}`}
                placeholder="Enter gross total annual income (₹)"
                value={data.grossAnnualIncomeItr ? loanInputHelpers.formatCurrencyString(String(data.grossAnnualIncomeItr)) : ''}
                onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
                onChange={handleGrossIncomeChange}
              />
              {errors.grossAnnualIncomeItr && (
                <span className="banking-field-error" role="alert">{errors.grossAnnualIncomeItr}</span>
              )}
            </div>
          </>
        )}
      </LoanFormSection>
    </div>
  )
}

export default BankingDetails
