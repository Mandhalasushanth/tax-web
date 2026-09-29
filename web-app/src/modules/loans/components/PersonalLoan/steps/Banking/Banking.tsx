import React from 'react'
import type { PersonalLoanStepProps } from '../../../../types/personalLoan.types'
import { loanInputHelpers } from '../../../../validation/commonLoanValidation'
import { resolveIfscBranch } from '../../../../utils/loanInputFormatters'
import './Banking.css'

export const Banking: React.FC<PersonalLoanStepProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleBankNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ primaryBankName: e.target.value })
  }

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.digitsOnly(e.target.value, 18)
    onChange({ bankAccountNumber: clean })
  }

  const handleIfscChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.cleanIfsc(e.target.value)
    const branch = resolveIfscBranch(clean)
    onChange({
      bankIfscCode: clean,
      branchName: branch,
    })
  }

  const resolvedBranch = data.branchName || resolveIfscBranch(data.bankIfscCode)

  return (
    <div className="personal-banking-step" data-testid="step-personal-banking">
      <div className="personal-banking-card">
        <h2 className="personal-banking-card__title">Banking Details</h2>
        <p className="personal-banking-card__subtitle">
          Provide the account where the approved loan should be disbursed.
        </p>

        <div className="personal-banking-grid">
          {/* Primary Operating Bank Name */}
          <div className="personal-form-group">
            <label htmlFor="personal-bank-name" className="personal-label">
              Primary Operating Bank Name <span className="personal-label__req">*</span>
            </label>
            <input
              id="personal-bank-name"
              type="text"
              className={`personal-input ${errors.primaryBankName ? 'personal-input--error' : ''}`}
              placeholder="e.g. HDFC Bank"
              value={data.primaryBankName || ''}
              onChange={handleBankNameChange}
            />
            {errors.primaryBankName && (
              <span className="personal-field-error" role="alert">{errors.primaryBankName}</span>
            )}
          </div>

          {/* Bank Account Number */}
          <div className="personal-form-group">
            <label htmlFor="personal-acc-num" className="personal-label">
              Bank Account Number <span className="personal-label__req">*</span>
            </label>
            <input
              id="personal-acc-num"
              type="text"
              inputMode="numeric"
              maxLength={18}
              className={`personal-input ${errors.bankAccountNumber ? 'personal-input--error' : ''}`}
              placeholder="e.g. 606835068982"
              value={data.bankAccountNumber || ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={handleAccountNumberChange}
            />
            {errors.bankAccountNumber && (
              <span className="personal-field-error" role="alert">{errors.bankAccountNumber}</span>
            )}
          </div>

          {/* Bank IFSC Code */}
          <div className="personal-form-group personal-banking-grid__full">
            <label htmlFor="personal-ifsc-code" className="personal-label">
              Bank IFSC Code <span className="personal-label__req">*</span>
            </label>
            <input
              id="personal-ifsc-code"
              type="text"
              maxLength={11}
              className={`personal-input personal-input--uppercase ${errors.bankIfscCode ? 'personal-input--error' : ''}`}
              placeholder="e.g. HDFC0000123"
              value={data.bankIfscCode || ''}
              onKeyDown={loanInputHelpers.allowOnlyAlphanumericKeyDown}
              onChange={handleIfscChange}
            />
            {errors.bankIfscCode && (
              <span className="personal-field-error" role="alert">{errors.bankIfscCode}</span>
            )}

            {/* Green Branch Verification Pill */}
            {resolvedBranch && (
              <div className="personal-branch-pill" role="status">
                <span>{resolvedBranch}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banking
