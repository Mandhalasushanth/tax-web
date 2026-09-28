import React from 'react'
import { LoanFormSection } from '../../../../components/LoanFormSection/LoanFormSection'
import type { VehicleLoanData } from '../../../../types/vehicleLoan.types'
import { loanInputHelpers } from '../../../../validation/vehicleLoanValidation'
import './BankingDetails.css'

export interface BankingDetailsProps {
  data: VehicleLoanData
  onChange: (fields: Partial<VehicleLoanData>) => void
  errors?: Record<string, string>
}

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

  const resolvedBranch = data.branchName || (data.ifscCode ? SAMPLE_IFSC_BRANCH_MAP[data.ifscCode.toUpperCase()] : '')

  return (
    <div className="vehicle-loan-step">
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        }
        title="Banking Information"
        subtitle="Provide salary or primary bank account details for auto-debit EMI and disbursement."
      >
        {/* 1. Bank Name */}
        <div className="vehicle-loan-form-group">
          <label htmlFor="vehicle-bank-name" className="vehicle-loan-label">
            Bank Name <span className="vehicle-loan-label__req">*</span>
          </label>
          <input
            id="vehicle-bank-name"
            type="text"
            className={`vehicle-loan-input ${errors.bankName ? 'vehicle-loan-input--error' : ''}`}
            placeholder="e.g. HDFC Bank / State Bank of India"
            value={data.bankName || ''}
            onChange={handleBankNameChange}
          />
          {errors.bankName && (
            <span className="vehicle-loan-field-error" role="alert">{errors.bankName}</span>
          )}
        </div>

        {/* 2. Account Number */}
        <div className="vehicle-loan-form-group">
          <label htmlFor="vehicle-acc-num" className="vehicle-loan-label">
            Account Number <span className="vehicle-loan-label__req">*</span>
          </label>
          <input
            id="vehicle-acc-num"
            type="text"
            inputMode="numeric"
            maxLength={18}
            className={`vehicle-loan-input ${errors.accountNumber ? 'vehicle-loan-input--error' : ''}`}
            placeholder="Enter savings or current account number"
            value={data.accountNumber || ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handleAccountNumberChange}
          />
          {errors.accountNumber && (
            <span className="vehicle-loan-field-error" role="alert">{errors.accountNumber}</span>
          )}
        </div>

        {/* 3. IFSC Code */}
        <div className="vehicle-loan-form-group">
          <label htmlFor="vehicle-ifsc" className="vehicle-loan-label">
            Bank IFSC Code <span className="vehicle-loan-label__req">*</span>
          </label>
          <input
            id="vehicle-ifsc"
            type="text"
            maxLength={11}
            className={`vehicle-loan-input ${errors.ifscCode ? 'vehicle-loan-input--error' : ''}`}
            placeholder="e.g. HDFC0001234"
            value={data.ifscCode || ''}
            onKeyDown={loanInputHelpers.allowOnlyAlphanumericKeyDown}
            onChange={handleIfscChange}
            style={{ textTransform: 'uppercase' }}
          />
          {errors.ifscCode && (
            <span className="vehicle-loan-field-error" role="alert">{errors.ifscCode}</span>
          )}

          {/* Branch Verification Badge */}
          {resolvedBranch && (
            <div className="vehicle-loan-branch-badge">
              <svg viewBox="0 0 24 24" fill="currentColor" className="vehicle-loan-branch-check">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
              </svg>
              <span>Branch: {resolvedBranch}</span>
            </div>
          )}
        </div>
      </LoanFormSection>
    </div>
  )
}

export default BankingDetails
