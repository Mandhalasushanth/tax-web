import React from 'react'
import { LoanFormSection } from '@modules/loans/shared'
import type {
  ProjectFinanceData,
  PromoterConstitution,
  CollateralType,
} from '../../../../types/projectFinance.types'
import { loanInputHelpers } from '../../../../validation/projectFinanceValidation'
import { resolveIfscBranch } from '../../../../utils/loanInputFormatters'
import './PromoterAndCollateral.css'

export interface PromoterAndCollateralProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  errors?: Record<string, string>
}

const CONSTITUTION_OPTIONS: PromoterConstitution[] = [
  'Individual / Proprietorship',
  'Partnership Firm',
  'LLP',
  'Private Limited Company',
  'Public Limited Company',
  'Trust / NGO',
  'SPV / Project Company',
]

const COLLATERAL_OPTIONS: CollateralType[] = [
  'Land & Building',
  'Plant & Machinery',
  'Fixed Deposits (FD)',
  'Government Securities',
  'Personal Guarantee',
  'Corporate Guarantee',
  'None / Clean',
]

export const PromoterAndCollateral: React.FC<PromoterAndCollateralProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleCreditScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = loanInputHelpers.digitsOnly(e.target.value, 3)
    onChange({ promoterCibilScore: val })
  }

  const handleNetWorthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ promoterNetWorth: loanInputHelpers.formatCurrencyString(e.target.value) })
  }

  const handleIfscChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.cleanIfsc(e.target.value)
    const branch = resolveIfscBranch(clean)
    onChange({ disbursementIfscCode: clean, disbursementBankName: data.disbursementBankName || branch })
  }

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ disbursementAccountNumber: loanInputHelpers.digitsOnly(e.target.value, 18) })
  }

  const resolvedBranch = resolveIfscBranch(data.disbursementIfscCode)

  return (
    <div className="pf-promoter-step">
      {/* Section 1: Promoter Profile */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        }
        title="Promoter / Borrower Profile"
        subtitle="Provide details of the primary promoter or borrowing entity sponsoring the project."
      >
        <div className="pf-loan-form-group">
          <label htmlFor="pf-entity-name" className="pf-loan-label">
            Promoter / Entity Name <span className="pf-loan-label__req">*</span>
          </label>
          <input
            id="pf-entity-name"
            type="text"
            className={`pf-loan-input ${errors.promoterEntityName ? 'pf-loan-input--error' : ''}`}
            placeholder="Enter registered name of promoter or borrowing entity"
            value={data.promoterEntityName || ''}
            onChange={(e) => onChange({ promoterEntityName: e.target.value })}
          />
          {errors.promoterEntityName && (
            <span className="pf-loan-field-error" role="alert">{errors.promoterEntityName}</span>
          )}
        </div>

        <div className="pf-loan-form-group">
          <label htmlFor="pf-constitution" className="pf-loan-label">
            Entity Constitution <span className="pf-loan-label__req">*</span>
          </label>
          <select
            id="pf-constitution"
            className={`pf-loan-select ${errors.promoterConstitution ? 'pf-loan-select--error' : ''}`}
            value={data.promoterConstitution || ''}
            onChange={(e) => onChange({ promoterConstitution: e.target.value as PromoterConstitution })}
          >
            <option value="" disabled>Select entity constitution</option>
            {CONSTITUTION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.promoterConstitution && (
            <span className="pf-loan-field-error" role="alert">{errors.promoterConstitution}</span>
          )}
        </div>

        <div className="pf-loan-form-group">
          <label htmlFor="pf-pan" className="pf-loan-label">
            PAN of Entity / Promoter <span className="pf-loan-label__req">*</span>
          </label>
          <input
            id="pf-pan"
            type="text"
            maxLength={10}
            className={`pf-loan-input ${errors.promoterPan ? 'pf-loan-input--error' : ''}`}
            placeholder="Enter 10-digit PAN (e.g. ABCDE1234F)"
            value={data.promoterPan || ''}
            onKeyDown={loanInputHelpers.allowOnlyAlphanumericKeyDown}
            onChange={(e) => onChange({ promoterPan: e.target.value.toUpperCase() })}
          />
          {errors.promoterPan && (
            <span className="pf-loan-field-error" role="alert">{errors.promoterPan}</span>
          )}
        </div>

        <div className="pf-loan-grid-2">
          <div className="pf-loan-form-group">
            <label htmlFor="pf-cibil-score" className="pf-loan-label">Promoter CIBIL Score</label>
            <input
              id="pf-cibil-score"
              type="text"
              inputMode="numeric"
              maxLength={3}
              className="pf-loan-input"
              placeholder="e.g. 750"
              value={data.promoterCibilScore || ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={handleCreditScoreChange}
            />
          </div>
          <div className="pf-loan-form-group">
            <label htmlFor="pf-net-worth" className="pf-loan-label">Promoter Net Worth (₹)</label>
            <input
              id="pf-net-worth"
              type="text"
              inputMode="numeric"
              className="pf-loan-input"
              placeholder="e.g. 5,00,00,000"
              value={data.promoterNetWorth ? loanInputHelpers.formatCurrencyString(String(data.promoterNetWorth)) : ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={handleNetWorthChange}
            />
          </div>
        </div>

        <div className="pf-loan-form-group">
          <label className="pf-loan-label">Prior Project Finance Experience?</label>
          <div className="pf-loan-toggle-grid">
            <button
              type="button"
              className={`pf-loan-toggle-btn ${data.priorProjectExperience === 'yes' ? 'pf-loan-toggle-btn--active' : ''}`}
              onClick={() => onChange({ priorProjectExperience: 'yes' })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`pf-loan-toggle-btn ${!data.priorProjectExperience || data.priorProjectExperience === 'no' ? 'pf-loan-toggle-btn--active' : ''}`}
              onClick={() => onChange({ priorProjectExperience: 'no' })}
            >
              No
            </button>
          </div>
        </div>
      </LoanFormSection>

      {/* Section 2: Collateral & Disbursement */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        }
        title="Collateral & Disbursement Bank"
        subtitle="Specify collateral offered and the bank account for project fund disbursement."
      >
        <div className="pf-loan-form-group">
          <label htmlFor="pf-collateral-type" className="pf-loan-label">
            Collateral Type <span className="pf-loan-label__req">*</span>
          </label>
          <select
            id="pf-collateral-type"
            className={`pf-loan-select ${errors.collateralType ? 'pf-loan-select--error' : ''}`}
            value={data.collateralType || ''}
            onChange={(e) => onChange({ collateralType: e.target.value as CollateralType })}
          >
            <option value="" disabled>Select collateral type</option>
            {COLLATERAL_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.collateralType && (
            <span className="pf-loan-field-error" role="alert">{errors.collateralType}</span>
          )}
        </div>

        {data.collateralType && data.collateralType !== 'None / Clean' && (
          <div className="pf-loan-form-group">
            <label htmlFor="pf-collateral-desc" className="pf-loan-label">Collateral Description</label>
            <input
              id="pf-collateral-desc"
              type="text"
              className="pf-loan-input"
              placeholder="Describe the collateral asset (e.g. 2 acres land in Hyderabad)"
              value={data.collateralDescription || ''}
              onChange={(e) => onChange({ collateralDescription: e.target.value })}
            />
          </div>
        )}

        <div className="pf-loan-form-group">
          <label htmlFor="pf-bank-name" className="pf-loan-label">
            Disbursement Bank Name <span className="pf-loan-label__req">*</span>
          </label>
          <input
            id="pf-bank-name"
            type="text"
            className={`pf-loan-input ${errors.disbursementBankName ? 'pf-loan-input--error' : ''}`}
            placeholder="e.g. HDFC Bank"
            value={data.disbursementBankName || ''}
            onChange={(e) => onChange({ disbursementBankName: e.target.value })}
          />
          {errors.disbursementBankName && (
            <span className="pf-loan-field-error" role="alert">{errors.disbursementBankName}</span>
          )}
        </div>

        <div className="pf-loan-form-group">
          <label htmlFor="pf-acc-num" className="pf-loan-label">
            Account Number <span className="pf-loan-label__req">*</span>
          </label>
          <input
            id="pf-acc-num"
            type="text"
            inputMode="numeric"
            maxLength={18}
            className={`pf-loan-input ${errors.disbursementAccountNumber ? 'pf-loan-input--error' : ''}`}
            placeholder="Enter disbursement account number"
            value={data.disbursementAccountNumber || ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handleAccountChange}
          />
          {errors.disbursementAccountNumber && (
            <span className="pf-loan-field-error" role="alert">{errors.disbursementAccountNumber}</span>
          )}
        </div>

        <div className="pf-loan-form-group">
          <label htmlFor="pf-ifsc" className="pf-loan-label">
            IFSC Code <span className="pf-loan-label__req">*</span>
          </label>
          <input
            id="pf-ifsc"
            type="text"
            maxLength={11}
            className={`pf-loan-input ${errors.disbursementIfscCode ? 'pf-loan-input--error' : ''}`}
            placeholder="Enter 11-character IFSC code"
            value={data.disbursementIfscCode || ''}
            onKeyDown={loanInputHelpers.allowOnlyAlphanumericKeyDown}
            onChange={handleIfscChange}
          />
          {errors.disbursementIfscCode && (
            <span className="pf-loan-field-error" role="alert">{errors.disbursementIfscCode}</span>
          )}
          {resolvedBranch && (
            <div className="pf-loan-branch-badge">
              <svg viewBox="0 0 24 24" fill="currentColor" className="pf-loan-branch-check">
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

export default PromoterAndCollateral
