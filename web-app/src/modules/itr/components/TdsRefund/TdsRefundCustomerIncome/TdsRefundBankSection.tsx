import React, { useState } from 'react'
import { Landmark } from 'lucide-react'
import { TdsIcons } from '../../../utils/tdsRefund.constants'
import { fetchIfscDetails } from '../../../utils/ifscLookup'
import { ConfirmAccountNumberInput } from '@shared/components'
import './TdsRefundBankSection.css'

export interface TdsBankDetails {
  accountHolder: string
  accountNumber: string
  confirmAccountNumber: string
  ifsc: string
  ifscCode?: string
  bankName: string
  branch: string
  accountType?: 'savings' | 'current' | null
}

export interface TdsRefundBankSectionProps {
  bankDetails: TdsBankDetails
  onChange: (updated: Partial<TdsBankDetails>) => void
  error?: string | null
}

export const TdsRefundBankSection: React.FC<TdsRefundBankSectionProps> = ({
  bankDetails,
  onChange,
  error,
}) => {
  const [isFetchingIfsc, setIsFetchingIfsc] = useState(false)

  const handleIfscChange = async (rawVal: string) => {
    const formatted = rawVal.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11)
    onChange({ ifsc: formatted })

    if (formatted.length === 11) {
      setIsFetchingIfsc(true)
      try {
        const match = await fetchIfscDetails(formatted)
        if (match) {
          onChange({
            ifsc: formatted,
            bankName: match.bankName,
            branch: match.branch,
          })
        }
      } finally {
        setIsFetchingIfsc(false)
      }
    } else if (formatted === '') {
      onChange({ ifsc: '', bankName: '', branch: '' })
    }
  }

  const isValidated = Boolean(bankDetails.accountNumber && bankDetails.ifsc && bankDetails.bankName)

  return (
    <div className="tds-card" data-testid="tds-card-bank">
      <div className="tds-card-header">
        <div className="tds-card-title-wrap">
          <div className="tds-card-icon-box tds-card-icon-box--bank" aria-hidden="true">
            <Landmark size={20} strokeWidth={2.2} />
          </div>
          <div>
            <h2 className="tds-card-title">Refund Bank Account</h2>
            <span className="tds-card-subtitle">Excess TDS will be credited directly to this account</span>
          </div>
        </div>
        {isValidated && <span className="tds-pill-verified"><TdsIcons.Checkmark /> Validated</span>}
      </div>

      {error && <div className="tds-form-error" role="alert">{error}</div>}

      <div className="tds-bank-form">
        <div className="tds-form-group">
          <label htmlFor="tds-account-holder" className="tds-label">
            Account Holder Name <span className="tds-required">*</span>
          </label>
          <input
            id="tds-account-holder"
            type="text"
            className="tds-input"
            value={bankDetails.accountHolder}
            onChange={(e) => onChange({ accountHolder: e.target.value })}
            placeholder="Enter account holder name"
            required
          />
        </div>

        <div className="tds-form-grid-2">
          <div className="tds-form-group">
            <label htmlFor="tds-account-number" className="tds-label">
              Bank Account Number <span className="tds-required">*</span>
            </label>
            <input
              id="tds-account-number"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={18}
              className="tds-input"
              value={bankDetails.accountNumber}
              onChange={(e) => onChange({ accountNumber: e.target.value.replace(/\D/g, '').slice(0, 18) })}
              placeholder="Enter your bank account number"
              required
            />
          </div>
          <div className="tds-form-group">
            <label htmlFor="tds-confirm-account" className="tds-label">
              Confirm Account Number <span className="tds-required">*</span>
            </label>
            <ConfirmAccountNumberInput
              id="tds-confirm-account"
              name="confirmAccountNumber"
              maxLength={18}
              className="tds-input"
              value={bankDetails.confirmAccountNumber}
              onChange={(val) => onChange({ confirmAccountNumber: val })}
              placeholder="Enter your bank account number"
              required
            />
          </div>
        </div>

        <div className="tds-form-group">
          <label htmlFor="tds-ifsc" className="tds-label">
            IFSC Code <span className="tds-required">*</span>
          </label>
          <input
            id="tds-ifsc"
            type="text"
            className="tds-input tds-input--upper"
            value={bankDetails.ifsc}
            onChange={(e) => handleIfscChange(e.target.value)}
            placeholder="Enter your IFSC code"
            maxLength={11}
            required
          />
          {isFetchingIfsc && (
            <span className="tds-field-hint tds-field-hint--warning">
              Fetching bank details...
            </span>
          )}
        </div>

        {/* Auto-detected Bank status pill */}
        {bankDetails.bankName && bankDetails.branch && (
          <div className="tds-bank-status-pill" data-testid="tds-bank-verified-pill">
            <span className="tds-bank-status-icon"><TdsIcons.Checkmark /></span>
            <span className="tds-bank-status-text">{bankDetails.bankName} • {bankDetails.branch}</span>
          </div>
        )}

        <div className="tds-form-grid-2">
          <div className="tds-form-group">
            <label htmlFor="tds-bank-name" className="tds-label">Bank Name</label>
            <input
              id="tds-bank-name"
              type="text"
              className="tds-input"
              value={bankDetails.bankName}
              onChange={(e) => onChange({ bankName: e.target.value })}
              placeholder="Bank name"
            />
          </div>
          <div className="tds-form-group">
            <label htmlFor="tds-bank-branch" className="tds-label">Branch</label>
            <input
              id="tds-bank-branch"
              type="text"
              className="tds-input"
              value={bankDetails.branch}
              onChange={(e) => onChange({ branch: e.target.value })}
              placeholder="Branch"
            />
          </div>
        </div>

        <div className="tds-form-group">
          <span className="tds-label">Account Type</span>
          <div className="tds-type-pills">
            <button
              type="button"
              className={`tds-type-pill ${bankDetails.accountType === 'savings' ? 'tds-type-pill--active' : ''}`}
              onClick={() => onChange({ accountType: 'savings' })}
            >
              Savings Account
            </button>
            <button
              type="button"
              className={`tds-type-pill ${bankDetails.accountType === 'current' ? 'tds-type-pill--active' : ''}`}
              onClick={() => onChange({ accountType: 'current' })}
            >
              Current Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
