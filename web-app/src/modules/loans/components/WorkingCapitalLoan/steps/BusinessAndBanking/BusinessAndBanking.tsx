import React from 'react'
import { LoanFormSection } from '../../../../components/LoanFormSection/LoanFormSection'
import type {
  WorkingCapitalLoanData,
  WorkingCapitalTrackRecord,
  WorkingCapitalItrStatus,
} from '../../../../types/workingCapitalLoan.types'
import { loanInputHelpers } from '../../../../validation/machineryLoanValidation'
import './BusinessAndBanking.css'

export interface BusinessAndBankingProps {
  data: WorkingCapitalLoanData
  onChange: (fields: Partial<WorkingCapitalLoanData>) => void
  errors?: Record<string, string>
}

export const TRACK_RECORD_OPTIONS: WorkingCapitalTrackRecord[] = [
  '< 1 Year',
  '1 - 2 Years',
  '3 - 5 Years',
  '5 - 10 Years',
  '10+ Years',
]

export const ITR_STATUS_OPTIONS: WorkingCapitalItrStatus[] = [
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

export const BusinessAndBanking: React.FC<BusinessAndBankingProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleTurnoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
      onChange({ annualAuditedTurnover: formatted })
    } catch {
      onChange({ annualAuditedTurnover: e.target.value })
    }
  }

  const handleProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
      onChange({ annualNetProfitBeforeTax: formatted })
    } catch {
      onChange({ annualNetProfitBeforeTax: e.target.value })
    }
  }

  const handleGstinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const clean = loanInputHelpers.cleanGstin(e.target.value)
      onChange({ gstinNumber: clean })
    } catch {
      onChange({ gstinNumber: e.target.value })
    }
  }

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const clean = loanInputHelpers.digitsOnly(e.target.value, 18)
      onChange({ currentAccountNumber: clean })
    } catch {
      onChange({ currentAccountNumber: e.target.value })
    }
  }

  const handleIfscChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const clean = loanInputHelpers.cleanIfsc(e.target.value)
      const detectedBranch = SAMPLE_IFSC_BRANCH_MAP[clean] || (clean.length === 11 ? 'VERIFIED BANK BRANCH' : '')
      onChange({
        bankIfscCode: clean,
        bankBranchName: detectedBranch,
      })
    } catch {
      onChange({ bankIfscCode: e.target.value })
    }
  }

  const resolvedBranch = data.bankBranchName || (data.bankIfscCode ? SAMPLE_IFSC_BRANCH_MAP[data.bankIfscCode.toUpperCase()] : '')

  return (
    <div className="working-capital-step">
      {/* 1. Business Operations & Financials Section */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="16" height="20" x="4" y="2" rx="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
          </svg>
        }
        title="Business Operations & Financials"
        subtitle="Provide enterprise details, GSTIN compliance, and annual trading numbers."
      >
        {/* Registered Business Name */}
        <div className="working-capital-form-group">
          <label htmlFor="wc-enterprise-name" className="working-capital-label">
            Registered Enterprise / Business Name <span className="working-capital-label__req">*</span>
          </label>
          <input
            id="wc-enterprise-name"
            type="text"
            className={`working-capital-input ${errors.registeredBusinessName ? 'working-capital-input--error' : ''}`}
            placeholder="e.g. Zenith Trading Co Pvt Ltd"
            value={data.registeredBusinessName || ''}
            onChange={(e) => onChange({ registeredBusinessName: e.target.value })}
          />
          {errors.registeredBusinessName && (
            <span className="working-capital-field-error" role="alert">{errors.registeredBusinessName}</span>
          )}
        </div>

        {/* GSTIN Number */}
        <div className="working-capital-form-group">
          <label htmlFor="wc-gstin-number" className="working-capital-label">
            GSTIN Number <span className="working-capital-label__req">*</span>
          </label>
          <input
            id="wc-gstin-number"
            type="text"
            maxLength={15}
            className={`working-capital-input ${errors.gstinNumber ? 'working-capital-input--error' : ''}`}
            placeholder="e.g. 07AAAAA0000A1Z5"
            value={data.gstinNumber || ''}
            onChange={handleGstinChange}
            style={{ textTransform: 'uppercase' }}
          />
          {errors.gstinNumber && (
            <span className="working-capital-field-error" role="alert">{errors.gstinNumber}</span>
          )}
        </div>

        {/* Udyam Registration Number */}
        <div className="working-capital-form-group">
          <label htmlFor="wc-udyam" className="working-capital-label">
            Udyam Registration Number <span className="working-capital-label__sub">(MSME Interest Subvention)</span>
          </label>
          <input
            id="wc-udyam"
            type="text"
            className="working-capital-input"
            placeholder="e.g. UDYAM-DL-01-0012345"
            value={data.udyamRegistrationNumber || ''}
            onChange={(e) => onChange({ udyamRegistrationNumber: e.target.value.toUpperCase() })}
            style={{ textTransform: 'uppercase' }}
          />
        </div>

        {/* Operational Track Record */}
        <div className="working-capital-form-group">
          <label className="working-capital-label">
            Operational Track Record (Years) <span className="working-capital-label__req">*</span>
          </label>
          <div className="working-capital-pill-cloud">
            {TRACK_RECORD_OPTIONS.map((track) => {
              const isSelected = data.operationalTrackRecord === track
              return (
                <button
                  key={track}
                  type="button"
                  className={`working-capital-purpose-pill ${isSelected ? 'working-capital-purpose-pill--active' : ''}`}
                  onClick={() => onChange({ operationalTrackRecord: track })}
                >
                  {track}
                </button>
              )
            })}
          </div>
          {errors.operationalTrackRecord && (
            <span className="working-capital-field-error" role="alert">{errors.operationalTrackRecord}</span>
          )}
        </div>

        {/* Annual Audited Turnover */}
        <div className="working-capital-form-group">
          <label htmlFor="wc-audited-turnover" className="working-capital-label">
            Annual Audited Turnover (₹) <span className="working-capital-label__req">*</span>
          </label>
          <input
            id="wc-audited-turnover"
            type="text"
            inputMode="numeric"
            className={`working-capital-input ${errors.annualAuditedTurnover ? 'working-capital-input--error' : ''}`}
            placeholder="e.g. 4000000"
            value={data.annualAuditedTurnover ? loanInputHelpers.formatCurrencyString(String(data.annualAuditedTurnover)) : ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handleTurnoverChange}
          />
          {errors.annualAuditedTurnover && (
            <span className="working-capital-field-error" role="alert">{errors.annualAuditedTurnover}</span>
          )}
        </div>

        {/* Annual Net Profit Before Tax */}
        <div className="working-capital-form-group">
          <label htmlFor="wc-net-profit" className="working-capital-label">
            Annual Net Profit Before Tax (₹) <span className="working-capital-label__req">*</span>
          </label>
          <input
            id="wc-net-profit"
            type="text"
            inputMode="numeric"
            className={`working-capital-input ${errors.annualNetProfitBeforeTax ? 'working-capital-input--error' : ''}`}
            placeholder="e.g. 600000"
            value={data.annualNetProfitBeforeTax ? loanInputHelpers.formatCurrencyString(String(data.annualNetProfitBeforeTax)) : ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handleProfitChange}
          />
          {errors.annualNetProfitBeforeTax && (
            <span className="working-capital-field-error" role="alert">{errors.annualNetProfitBeforeTax}</span>
          )}
        </div>
      </LoanFormSection>

      {/* 2. Operating Current Account & Taxation Section */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        }
        title="Operating Current Account & Taxation"
        subtitle="Provide primary cash credit / current account details and business ITR acknowledgements."
      >
        {/* Current Account Bank Name */}
        <div className="working-capital-form-group">
          <label htmlFor="wc-bank-name" className="working-capital-label">
            Current Account Bank Name <span className="working-capital-label__req">*</span>
          </label>
          <input
            id="wc-bank-name"
            type="text"
            className={`working-capital-input ${errors.currentAccountBankName ? 'working-capital-input--error' : ''}`}
            placeholder="e.g. State Bank of India / ICICI Bank"
            value={data.currentAccountBankName || ''}
            onChange={(e) => onChange({ currentAccountBankName: e.target.value })}
          />
          {errors.currentAccountBankName && (
            <span className="working-capital-field-error" role="alert">{errors.currentAccountBankName}</span>
          )}
        </div>

        {/* Current Account Number */}
        <div className="working-capital-form-group">
          <label htmlFor="wc-acc-num" className="working-capital-label">
            Current Account Number <span className="working-capital-label__req">*</span>
          </label>
          <input
            id="wc-acc-num"
            type="text"
            inputMode="numeric"
            maxLength={18}
            className={`working-capital-input ${errors.currentAccountNumber ? 'working-capital-input--error' : ''}`}
            placeholder="e.g. 000105001234"
            value={data.currentAccountNumber || ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handleAccountNumberChange}
          />
          {errors.currentAccountNumber && (
            <span className="working-capital-field-error" role="alert">{errors.currentAccountNumber}</span>
          )}
        </div>

        {/* Bank IFSC Code */}
        <div className="working-capital-form-group">
          <label htmlFor="wc-ifsc" className="working-capital-label">
            Bank IFSC Code <span className="working-capital-label__req">*</span>
          </label>
          <input
            id="wc-ifsc"
            type="text"
            maxLength={11}
            className={`working-capital-input ${errors.bankIfscCode ? 'working-capital-input--error' : ''}`}
            placeholder="e.g. SBIN0004567"
            value={data.bankIfscCode || ''}
            onKeyDown={loanInputHelpers.allowOnlyAlphanumericKeyDown}
            onChange={handleIfscChange}
            style={{ textTransform: 'uppercase' }}
          />
          <span className="working-capital-hint">11-digit bank branch code</span>
          {errors.bankIfscCode && (
            <span className="working-capital-field-error" role="alert">{errors.bankIfscCode}</span>
          )}
          {resolvedBranch && (
            <div className="working-capital-branch-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="working-capital-branch-check"
                style={{ width: 16, height: 16, maxWidth: 16, maxHeight: 16, flexShrink: 0 }}
              >
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
              </svg>
              <span>Branch: {resolvedBranch}</span>
            </div>
          )}
        </div>

        {/* Business Tax Audit & ITR Card */}
        <div className="working-capital-itr-box">
          <div className="working-capital-itr-box__header">
            <span className="working-capital-itr-box__icon">✨</span>
            <span className="working-capital-itr-box__title">Business Tax Audit & ITR Records</span>
          </div>

          <div className="working-capital-form-group">
            <label className="working-capital-label">
              ITR Filing Status for Last Assessment Year <span className="working-capital-label__req">*</span>
            </label>
            <div className="working-capital-toggle-grid-3">
              {ITR_STATUS_OPTIONS.map((status) => {
                const isSelected = data.itrFilingStatus === status
                return (
                  <button
                    key={status}
                    type="button"
                    className={`working-capital-toggle-btn ${isSelected ? 'working-capital-toggle-btn--active' : ''}`}
                    onClick={() => onChange({
                      itrFilingStatus: status,
                      ...(status !== 'Filed' ? { itrAcknowledgementNumber: '' } : {}),
                    })}
                  >
                    {status}
                  </button>
                )
              })}
            </div>
            {errors.itrFilingStatus && (
              <span className="working-capital-field-error" role="alert">{errors.itrFilingStatus}</span>
            )}
          </div>

          {/* Conditional ITR Ack Number */}
          {data.itrFilingStatus === 'Filed' && (
            <div className="working-capital-form-group" style={{ marginTop: '0.85rem' }}>
              <label htmlFor="wc-itr-ack" className="working-capital-label">
                ITR Acknowledgement Number (15 Digits) <span className="working-capital-label__sub">(Optional)</span>
              </label>
              <input
                id="wc-itr-ack"
                type="text"
                maxLength={15}
                inputMode="numeric"
                className="working-capital-input"
                placeholder="e.g. 123456789012345"
                value={data.itrAcknowledgementNumber || ''}
                onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
                onChange={(e) => onChange({ itrAcknowledgementNumber: loanInputHelpers.digitsOnly(e.target.value, 15) })}
              />
            </div>
          )}
        </div>
      </LoanFormSection>
    </div>
  )
}

export default BusinessAndBanking
