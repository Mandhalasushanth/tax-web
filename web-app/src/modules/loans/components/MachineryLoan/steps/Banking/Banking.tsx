import React from 'react'
import { LoanFormSection } from '@modules/loans/shared'
import type { MachineryLoanData } from '@modules/loans/types/machineryLoan.types'
import { loanInputHelpers, resolveIfscBranch } from '@modules/loans/utils/loanInputFormatters'
import './Banking.css'

export interface BankingProps {
  data: MachineryLoanData
  onChange: (fields: Partial<MachineryLoanData>) => void
  errors?: Record<string, string>
}

export const Banking: React.FC<BankingProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleBankNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ bankName: loanInputHelpers.lettersOnly(e.target.value) })
  }

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.digitsOnly(e.target.value, 18)
    onChange({ accountNumber: clean })
  }

  const handleIfscChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.cleanIfsc(e.target.value)
    onChange({
      ifscCode: clean,
      branchName: resolveIfscBranch(clean),
    })
  }

  const resolvedBranch = data.branchName || resolveIfscBranch(data.ifscCode)

  const renderBankingFields = () => (
    <>
      {/* 1. Bank Name */}
      <div className="machinery-loan-form-group">
        <label htmlFor="machinery-bank-name" className="machinery-loan-label">
          Bank Name <span className="machinery-loan-label__req">*</span>
        </label>
        <input
          id="machinery-bank-name"
          type="text"
          className={`machinery-loan-input ${errors.bankName ? 'machinery-loan-input--error' : ''}`}
          placeholder="e.g. Bank of India"
          value={data.bankName || ''}
          onChange={handleBankNameChange}
        />
        {errors.bankName && (
          <span className="machinery-loan-field-error" role="alert">{errors.bankName}</span>
        )}
      </div>

      {/* 2. Current Account Number */}
      <div className="machinery-loan-form-group">
        <label htmlFor="machinery-acc-num" className="machinery-loan-label">
          Current Account Number <span className="machinery-loan-label__req">*</span>
        </label>
        <input
          id="machinery-acc-num"
          type="text"
          inputMode="numeric"
          maxLength={18}
          className={`machinery-loan-input ${errors.accountNumber ? 'machinery-loan-input--error' : ''}`}
          placeholder="Enter current account number"
          value={data.accountNumber || ''}
          onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
          onChange={handleAccountNumberChange}
        />
        {errors.accountNumber && (
          <span className="machinery-loan-field-error" role="alert">{errors.accountNumber}</span>
        )}
      </div>

      {/* 3. Bank IFSC Code */}
      <div className="machinery-loan-form-group">
        <label htmlFor="machinery-ifsc" className="machinery-loan-label">
          Bank IFSC Code <span className="machinery-loan-label__req">*</span>
        </label>
        <input
          id="machinery-ifsc"
          type="text"
          maxLength={11}
          className={`machinery-loan-input ${errors.ifscCode ? 'machinery-loan-input--error' : ''}`}
          placeholder="Enter 11-digit IFSC code"
          value={data.ifscCode || ''}
          onKeyDown={loanInputHelpers.allowOnlyAlphanumericKeyDown}
          onChange={handleIfscChange}
        />
        {errors.ifscCode && (
          <span className="machinery-loan-field-error" role="alert">{errors.ifscCode}</span>
        )}

        {/* Branch Verification Badge */}
        {resolvedBranch && (
          <div className="machinery-loan-branch-badge">
            <svg viewBox="0 0 24 24" fill="currentColor" className="machinery-loan-branch-check">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>
            <span>Branch: {resolvedBranch}</span>
          </div>
        )}
      </div>
    </>
  )

  return (
    <div className="machinery-loan-banking">
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        }
        title="Banking Information"
        subtitle="Provide primary business current account details for machinery loan disbursement."
      >
        {renderBankingFields()}
      </LoanFormSection>
    </div>
  )
}

export default Banking
