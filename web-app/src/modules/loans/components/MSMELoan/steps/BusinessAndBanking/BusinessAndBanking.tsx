import React from 'react'
import { LoanFormSection } from '@modules/loans/shared'
import type {
  MsmeLoanData,
  MsmeLoanConstitution,
  MsmeBusinessVintage,
  MsmeItrStatus,
} from '../../../../types/msmeLoan.types'
import { loanInputHelpers } from '../../../../validation/msmeLoanValidation'
import { resolveIfscBranch } from '../../../../utils/loanInputFormatters'
import './BusinessAndBanking.css'

export interface BusinessAndBankingProps {
  data: MsmeLoanData
  onChange: (fields: Partial<MsmeLoanData>) => void
  errors?: Record<string, string>
}

const CONSTITUTION_OPTIONS: MsmeLoanConstitution[] = [
  'Proprietorship',
  'Partnership',
  'LLP',
  'Private Limited',
  'Public Limited',
  'Others',
]

const VINTAGE_OPTIONS: MsmeBusinessVintage[] = [
  '< 1 Year',
  '1–2 Years',
  '3–5 Years',
  '5–10 Years',
  '10+ Years',
]

const ITR_STATUS_OPTIONS: MsmeItrStatus[] = ['Filed', 'Not Filed', 'Exempt']

export const BusinessAndBanking: React.FC<BusinessAndBankingProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleIfscChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.cleanIfsc(e.target.value)
    const branch = resolveIfscBranch(clean)
    onChange({ bankIfscCode: clean, primaryBankName: data.primaryBankName || branch })
  }

  const resolvedBranch = resolveIfscBranch(data.bankIfscCode)

  return (
    <div className="msme-biz-banking-step">
      {/* Section 1: MSME Business Information */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="7" rx="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        }
        title="MSME Business Information"
        subtitle="Provide your enterprise's registration, constitution, and financial details."
      >
        <div className="msme-loan-form-group">
          <label htmlFor="msme-biz-name" className="msme-loan-label">
            Registered Business Name <span className="msme-loan-label__req">*</span>
          </label>
          <input
            id="msme-biz-name"
            type="text"
            className={`msme-loan-input ${errors.registeredBusinessName ? 'msme-loan-input--error' : ''}`}
            placeholder="Enter registered business / MSME name"
            value={data.registeredBusinessName || ''}
            onChange={(e) => onChange({ registeredBusinessName: e.target.value })}
          />
          {errors.registeredBusinessName && (
            <span className="msme-loan-field-error" role="alert">{errors.registeredBusinessName}</span>
          )}
        </div>

        <div className="msme-loan-form-group">
          <label htmlFor="msme-constitution" className="msme-loan-label">
            Business Constitution <span className="msme-loan-label__req">*</span>
          </label>
          <select
            id="msme-constitution"
            className={`msme-loan-select ${errors.businessConstitution ? 'msme-loan-select--error' : ''}`}
            value={data.businessConstitution || ''}
            onChange={(e) => onChange({ businessConstitution: e.target.value as MsmeLoanConstitution })}
          >
            <option value="" disabled>Select business constitution</option>
            {CONSTITUTION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.businessConstitution && (
            <span className="msme-loan-field-error" role="alert">{errors.businessConstitution}</span>
          )}
        </div>

        <div className="msme-loan-form-group">
          <label htmlFor="msme-gstin" className="msme-loan-label">
            GSTIN <span className="msme-loan-label__req">*</span>
          </label>
          <input
            id="msme-gstin"
            type="text"
            maxLength={15}
            className={`msme-loan-input ${errors.gstin ? 'msme-loan-input--error' : ''}`}
            placeholder="Enter 15-digit GSTIN (e.g. 24AABCP1234F1Z9)"
            value={data.gstin || ''}
            onKeyDown={loanInputHelpers.allowOnlyAlphanumericKeyDown}
            onChange={(e) => onChange({ gstin: loanInputHelpers.cleanGstin(e.target.value) })}
          />
          {errors.gstin && (
            <span className="msme-loan-field-error" role="alert">{errors.gstin}</span>
          )}
        </div>

        <div className="msme-loan-form-group">
          <label className="msme-loan-label">Udyam Registration?</label>
          <div className="msme-loan-toggle-grid">
            <button
              type="button"
              className={`msme-loan-toggle-btn ${data.hasUdyam === 'yes' ? 'msme-loan-toggle-btn--active' : ''}`}
              onClick={() => onChange({ hasUdyam: 'yes' })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`msme-loan-toggle-btn ${data.hasUdyam === 'no' || !data.hasUdyam ? 'msme-loan-toggle-btn--active' : ''}`}
              onClick={() => onChange({ hasUdyam: 'no', udyamRegistrationNumber: '' })}
            >
              No
            </button>
          </div>
          {data.hasUdyam === 'yes' && (
            <input
              id="msme-udyam-number"
              type="text"
              className="msme-loan-input"
              placeholder="Enter Udyam Registration Number (e.g. UDYAM-DL-01-0000001)"
              value={data.udyamRegistrationNumber || ''}
              onChange={(e) => onChange({ udyamRegistrationNumber: e.target.value })}
            />
          )}
        </div>

        <div className="msme-loan-form-group">
          <label htmlFor="msme-vintage" className="msme-loan-label">
            Business Vintage <span className="msme-loan-label__req">*</span>
          </label>
          <select
            id="msme-vintage"
            className={`msme-loan-select ${errors.businessVintage ? 'msme-loan-select--error' : ''}`}
            value={data.businessVintage || ''}
            onChange={(e) => onChange({ businessVintage: e.target.value as MsmeBusinessVintage })}
          >
            <option value="" disabled>Select years in operation</option>
            {VINTAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.businessVintage && (
            <span className="msme-loan-field-error" role="alert">{errors.businessVintage}</span>
          )}
        </div>

        <div className="msme-loan-grid-2">
          <div className="msme-loan-form-group">
            <label htmlFor="msme-turnover" className="msme-loan-label">
              Annual Turnover (₹) <span className="msme-loan-label__req">*</span>
            </label>
            <input
              id="msme-turnover"
              type="text"
              inputMode="numeric"
              className={`msme-loan-input ${errors.annualTurnover ? 'msme-loan-input--error' : ''}`}
              placeholder="e.g. 50,00,000"
              value={data.annualTurnover ? loanInputHelpers.formatCurrencyString(String(data.annualTurnover)) : ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={(e) => onChange({ annualTurnover: loanInputHelpers.formatCurrencyString(e.target.value) })}
            />
            {errors.annualTurnover && (
              <span className="msme-loan-field-error" role="alert">{errors.annualTurnover}</span>
            )}
          </div>
          <div className="msme-loan-form-group">
            <label htmlFor="msme-net-profit" className="msme-loan-label">
              Annual Net Profit (₹) <span className="msme-loan-label__req">*</span>
            </label>
            <input
              id="msme-net-profit"
              type="text"
              inputMode="numeric"
              className={`msme-loan-input ${errors.annualNetProfit ? 'msme-loan-input--error' : ''}`}
              placeholder="e.g. 8,00,000"
              value={data.annualNetProfit ? loanInputHelpers.formatCurrencyString(String(data.annualNetProfit)) : ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={(e) => onChange({ annualNetProfit: loanInputHelpers.formatCurrencyString(e.target.value) })}
            />
            {errors.annualNetProfit && (
              <span className="msme-loan-field-error" role="alert">{errors.annualNetProfit}</span>
            )}
          </div>
        </div>
      </LoanFormSection>

      {/* Section 2: Banking & Taxation */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        }
        title="Banking & Tax Records"
        subtitle="Provide operating current account and ITR filing details."
      >
        <div className="msme-loan-form-group">
          <label htmlFor="msme-bank-name" className="msme-loan-label">
            Primary Bank Name <span className="msme-loan-label__req">*</span>
          </label>
          <input
            id="msme-bank-name"
            type="text"
            className={`msme-loan-input ${errors.primaryBankName ? 'msme-loan-input--error' : ''}`}
            placeholder="e.g. State Bank of India"
            value={data.primaryBankName || ''}
            onChange={(e) => onChange({ primaryBankName: e.target.value })}
          />
          {errors.primaryBankName && (
            <span className="msme-loan-field-error" role="alert">{errors.primaryBankName}</span>
          )}
        </div>

        <div className="msme-loan-form-group">
          <label htmlFor="msme-acc-num" className="msme-loan-label">
            Current Account Number <span className="msme-loan-label__req">*</span>
          </label>
          <input
            id="msme-acc-num"
            type="text"
            inputMode="numeric"
            maxLength={18}
            className={`msme-loan-input ${errors.currentAccountNumber ? 'msme-loan-input--error' : ''}`}
            placeholder="Enter current account number"
            value={data.currentAccountNumber || ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={(e) => onChange({ currentAccountNumber: loanInputHelpers.digitsOnly(e.target.value, 18) })}
          />
          {errors.currentAccountNumber && (
            <span className="msme-loan-field-error" role="alert">{errors.currentAccountNumber}</span>
          )}
        </div>

        <div className="msme-loan-form-group">
          <label htmlFor="msme-ifsc" className="msme-loan-label">
            Bank IFSC Code <span className="msme-loan-label__req">*</span>
          </label>
          <input
            id="msme-ifsc"
            type="text"
            maxLength={11}
            className={`msme-loan-input ${errors.bankIfscCode ? 'msme-loan-input--error' : ''}`}
            placeholder="Enter 11-character IFSC code"
            value={data.bankIfscCode || ''}
            onKeyDown={loanInputHelpers.allowOnlyAlphanumericKeyDown}
            onChange={handleIfscChange}
          />
          {errors.bankIfscCode && (
            <span className="msme-loan-field-error" role="alert">{errors.bankIfscCode}</span>
          )}
          {resolvedBranch && (
            <div className="msme-loan-branch-badge">
              <svg viewBox="0 0 24 24" fill="currentColor" className="msme-loan-branch-check">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
              </svg>
              <span>Branch: {resolvedBranch}</span>
            </div>
          )}
        </div>

        <div className="msme-loan-form-group">
          <label htmlFor="msme-itr-status" className="msme-loan-label">ITR Filing Status</label>
          <select
            id="msme-itr-status"
            className="msme-loan-select"
            value={data.itrFilingStatus || ''}
            onChange={(e) => onChange({ itrFilingStatus: e.target.value as MsmeItrStatus })}
          >
            <option value="" disabled>Select ITR status</option>
            {ITR_STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {data.itrFilingStatus === 'Filed' && (
          <div className="msme-loan-form-group">
            <label htmlFor="msme-itr-ack" className="msme-loan-label">ITR Acknowledgement Number</label>
            <input
              id="msme-itr-ack"
              type="text"
              className="msme-loan-input"
              placeholder="Enter ITR acknowledgement number"
              value={data.itrAcknowledgementNumber || ''}
              onChange={(e) => onChange({ itrAcknowledgementNumber: e.target.value })}
            />
          </div>
        )}
      </LoanFormSection>
    </div>
  )
}

export default BusinessAndBanking
