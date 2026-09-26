import React from 'react'
import { LoanFormSection } from '../../../../components/LoanFormSection/LoanFormSection'
import type { HomeLoanData } from '../../types/homeLoan.types'
import { loanInputHelpers } from '../../validation/homeLoanValidation'
import './BankingAndITR.css'

export interface BankingAndITRProps {
  data: HomeLoanData
  onChange: (fields: Partial<HomeLoanData>) => void
  errors?: Record<string, string>
}

const POPULAR_BANKS = [
  'HDFC Bank',
  'State Bank of India',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'IndusInd Bank',
]

const ITR_STATUS_OPTIONS: { id: 'filed' | 'not-filed' | 'exempt'; label: string }[] = [
  { id: 'filed', label: 'Filed' },
  { id: 'not-filed', label: 'Not Filed' },
  { id: 'exempt', label: 'Exempt' },
]

export const BankingAndITR: React.FC<BankingAndITRProps> = ({ data, onChange, errors = {} }) => {
  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.digitsOnly(e.target.value, 18)
    onChange({ accountNumber: clean })
  }

  const handleIfscChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.cleanIfsc(e.target.value)
    onChange({ ifscCode: clean })
  }

  const handleItrAckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = loanInputHelpers.digitsOnly(e.target.value, 15)
    onChange({ itrAckNumber: clean })
  }

  const handleAnnualIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = loanInputHelpers.formatCurrencyString(e.target.value)
    onChange({ annualIncomeAsPerItr: formatted })
  }

  return (
    <div className="home-loan-bank">
      {/* 1. Primary Operating & Disbursement Bank */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        }
        title="Primary Operating &amp; Disbursement Bank"
        subtitle="Specify the account for loan disbursement and setting up auto-debit EMI repayments."
      >
        <div className="home-loan-form-group">
          <label htmlFor="home-bank-select" className="home-loan-label">
            Bank Name <span className="home-loan-label__req">*</span>
          </label>
          <select
            id="home-bank-select"
            className={`home-loan-select ${errors.bankName ? 'home-loan-select--error' : ''}`}
            value={data.bankName || ''}
            onChange={(e) => onChange({ bankName: e.target.value })}
          >
            <option value="" disabled>Select your primary salary / operating bank</option>
            {POPULAR_BANKS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {errors.bankName && (
            <span className="home-loan-field-error" role="alert">{errors.bankName}</span>
          )}
        </div>

        <div className="home-loan-grid-2">
          <div className="home-loan-form-group">
            <label htmlFor="home-bank-acc" className="home-loan-label">
              Bank Account Number <span className="home-loan-label__req">*</span>
            </label>
            <input
              id="home-bank-acc"
              type="text"
              inputMode="numeric"
              maxLength={18}
              className={`home-loan-input ${errors.accountNumber ? 'home-loan-input--error' : ''}`}
              placeholder="Enter 9 to 18-digit account number (e.g. 50100492817291)"
              value={data.accountNumber || ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={handleAccountNumberChange}
            />
            {errors.accountNumber && (
              <span className="home-loan-field-error" role="alert">{errors.accountNumber}</span>
            )}
          </div>

          <div className="home-loan-form-group">
            <label htmlFor="home-bank-ifsc" className="home-loan-label">
              Bank IFSC Code <span className="home-loan-label__req">*</span>
            </label>
            <input
              id="home-bank-ifsc"
              type="text"
              maxLength={11}
              className={`home-loan-input ${errors.ifscCode ? 'home-loan-input--error' : ''}`}
              placeholder="Enter 11-digit IFSC code (e.g. HDFC0001234)"
              value={data.ifscCode || ''}
              onKeyDown={loanInputHelpers.allowOnlyAlphanumericKeyDown}
              onChange={handleIfscChange}
            />
            {errors.ifscCode && (
              <span className="home-loan-field-error" role="alert">{errors.ifscCode}</span>
            )}
          </div>
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
          </svg>
        }
        title="Income Tax Return (ITR) Compliance"
        subtitle="Select your recent assessment year income tax filing status and declared income."
      >
        <div className="home-loan-form-group">
          <label className="home-loan-label">
            Last Assessment Year Filing Status <span className="home-loan-label__req">*</span>
          </label>
          <div className="home-loan-itr-status-grid">
            {ITR_STATUS_OPTIONS.map((opt) => {
              const isSelected = data.itrStatus === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`home-loan-itr-btn ${isSelected ? 'home-loan-itr-btn--active' : ''}`}
                  onClick={() => onChange({ itrStatus: opt.id })}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
          {errors.itrStatus && (
            <span className="home-loan-field-error" role="alert">{errors.itrStatus}</span>
          )}
        </div>

        {data.itrStatus === 'filed' && (
          <div className="home-loan-grid-2">
            <div className="home-loan-form-group">
              <label htmlFor="home-itr-ack" className="home-loan-label">
                ITR Acknowledgement Number (15 Digits) (Optional)
              </label>
              <input
                id="home-itr-ack"
                type="text"
                inputMode="numeric"
                maxLength={15}
                className={`home-loan-input ${errors.itrAckNumber ? 'home-loan-input--error' : ''}`}
                placeholder="Enter 15-digit acknowledgement number (e.g. 928471928471928)"
                value={data.itrAckNumber || ''}
                onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
                onChange={handleItrAckChange}
              />
              {errors.itrAckNumber && (
                <span className="home-loan-field-error" role="alert">{errors.itrAckNumber}</span>
              )}
            </div>

            <div className="home-loan-form-group">
              <label htmlFor="home-itr-income" className="home-loan-label">
                Gross Total Annual Income as per ITR (₹)
              </label>
              <input
                id="home-itr-income"
                type="text"
                inputMode="numeric"
                className={`home-loan-input ${errors.annualIncomeAsPerItr ? 'home-loan-input--error' : ''}`}
                placeholder="Enter gross total annual income in ₹ (e.g. 8,50,000)"
                value={data.annualIncomeAsPerItr || ''}
                onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
                onChange={handleAnnualIncomeChange}
              />
              {errors.annualIncomeAsPerItr && (
                <span className="home-loan-field-error" role="alert">{errors.annualIncomeAsPerItr}</span>
              )}
            </div>
          </div>
        )}
      </LoanFormSection>
    </div>
  )
}

export default BankingAndITR
