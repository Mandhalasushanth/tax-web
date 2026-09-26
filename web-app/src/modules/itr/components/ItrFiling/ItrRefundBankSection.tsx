import React, { useState } from 'react'
import {
  BankCardIcon,
  PlusCircleIcon,
  type FilingBankAccount,
} from './itrFiling.constants'
import './ItrRefundBankSection.css'

export interface ItrRefundBankSectionProps {
  bankAccounts: FilingBankAccount[]
  onBankAccountsChange: (accounts: FilingBankAccount[]) => void
  selectedBankId: string
  onSelectedBankIdChange: (id: string) => void
}

export const ItrRefundBankSection: React.FC<ItrRefundBankSectionProps> = ({
  bankAccounts,
  onBankAccountsChange,
  selectedBankId,
  onSelectedBankIdChange,
}) => {
  const [isAddingBank, setIsAddingBank] = useState(false)
  const [newBankName, setNewBankName] = useState('')
  const [newAccountNumber, setNewAccountNumber] = useState('')
  const [newConfirmAccountNumber, setNewConfirmAccountNumber] = useState('')
  const [newIfsc, setNewIfsc] = useState('')
  const [newAccountType, setNewAccountType] = useState<'savings' | 'current'>('savings')
  const [bankFormError, setBankFormError] = useState<string | null>(null)

  const handleBankSelect = (id: string) => {
    onSelectedBankIdChange(id)
  }

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBankName.trim()) {
      setBankFormError('Please enter the bank name.')
      return
    }
    if (!newAccountNumber.trim()) {
      setBankFormError('Please enter the bank account number.')
      return
    }
    if (newAccountNumber.length < 10 || newAccountNumber.length > 15) {
      setBankFormError('Bank account number must be between 10 and 15 digits only.')
      return
    }
    if (!newConfirmAccountNumber.trim()) {
      setBankFormError('Please confirm your bank account number.')
      return
    }
    if (newAccountNumber !== newConfirmAccountNumber) {
      setBankFormError('Account numbers do not match. Please verify.')
      return
    }
    if (!newIfsc.trim() || newIfsc.length !== 11) {
      setBankFormError('Please enter a valid 11-character IFSC code.')
      return
    }

    const maskedAcc = `•••• •••• ${newAccountNumber.slice(-4)}`
    const createdBank: FilingBankAccount = {
      id: `bank-${Date.now()}`,
      bankName: newBankName.trim(),
      accountNumber: maskedAcc,
      ifsc: newIfsc.trim().toUpperCase(),
      accountType: newAccountType,
      isPrimary: bankAccounts.length === 0,
      isPreValidated: true,
    }

    const updatedList = [...bankAccounts, createdBank]
    onBankAccountsChange(updatedList)
    onSelectedBankIdChange(createdBank.id)

    // Reset form
    setNewBankName('')
    setNewAccountNumber('')
    setNewConfirmAccountNumber('')
    setNewIfsc('')
    setBankFormError(null)
    setIsAddingBank(false)
  }

  return (
    <section className="itr-info-card" aria-labelledby="bank-account-heading">
      <div className="itr-info-card__title-row">
        <div className="itr-info-card__icon-wrap">
          <BankCardIcon size={20} />
        </div>
        <h2 id="bank-account-heading" className="itr-info-card__title">
          Refund Bank Account
        </h2>
      </div>

      <p className="itr-info-card__desc">
        Select the bank account to receive direct tax refund credit from the Income Tax Department.
      </p>

      {bankAccounts.length === 0 ? (
        <div className="itr-bank-empty-box">
          No bank accounts added yet. Please add a bank account for refund credit.
        </div>
      ) : (
        <div className="itr-bank-accounts-grid">
          {bankAccounts.map((acc) => {
            const isChecked = selectedBankId === acc.id
            return (
              <label
                key={acc.id}
                className={`itr-bank-account-card ${isChecked ? 'itr-bank-account-card--selected' : ''}`}
              >
                <div className="itr-bank-card-top">
                  <div className="itr-bank-card-header">
                    <span className={`itr-custom-radio ${isChecked ? 'itr-custom-radio--checked' : ''}`} />
                    <div className="itr-bank-title-box">
                      <strong className="itr-bank-name">{acc.bankName}</strong>
                      <span className="itr-bank-type">{acc.accountType.toUpperCase()} ACCOUNT</span>
                    </div>
                  </div>
                  {acc.isPreValidated && (
                    <span className="itr-bank-badge-validated">✓ Pre-Validated for Refund</span>
                  )}
                </div>

                <div className="itr-bank-card-details">
                  <div className="itr-bank-field">
                    <span className="itr-bank-field-label">Account Number</span>
                    <strong className="itr-bank-field-val itr-mono">{acc.accountNumber}</strong>
                  </div>
                  <div className="itr-bank-field">
                    <span className="itr-bank-field-label">IFSC Code</span>
                    <strong className="itr-bank-field-val itr-mono">{acc.ifsc}</strong>
                  </div>
                </div>

                <input
                  type="radio"
                  name="selectedBank"
                  value={acc.id}
                  checked={isChecked}
                  onChange={() => handleBankSelect(acc.id)}
                  className="itr-sr-only"
                />
              </label>
            )
          })}
        </div>
      )}

      {/* Add Bank Account Accordion / Form */}
      {!isAddingBank ? (
        <div className="itr-add-bank-row">
          <button
            type="button"
            className="itr-btn-add-bank"
            onClick={() => setIsAddingBank(true)}
          >
            <PlusCircleIcon size={18} />
            <span>Add Another Bank Account</span>
          </button>
        </div>
      ) : (
        <form className="itr-add-bank-form" onSubmit={handleSaveBank}>
          <h3 className="itr-add-bank-title">Refund Bank Account</h3>

          {bankFormError && (
            <div className="itr-bank-form-error" role="alert">
              {bankFormError}
            </div>
          )}

          <div className="itr-bank-inputs-grid">
            <div className="itr-input-group">
              <label htmlFor="new-bank-name" className="itr-input-label">
                Bank Name *
              </label>
              <input
                id="new-bank-name"
                type="text"
                className="itr-text-input"
                placeholder="e.g. State Bank of India, ICICI Bank"
                value={newBankName}
                onChange={(e) => setNewBankName(e.target.value)}
              />
            </div>

            <div className="itr-input-group">
              <label htmlFor="new-account-type" className="itr-input-label">
                Account Type *
              </label>
              <select
                id="new-account-type"
                className="itr-select-input"
                value={newAccountType}
                onChange={(e) => setNewAccountType(e.target.value as 'savings' | 'current')}
              >
                <option value="savings">Savings Account</option>
                <option value="current">Current Account</option>
              </select>
            </div>

            <div className="itr-input-group">
              <label htmlFor="new-account-number" className="itr-input-label">
                Account Number *
              </label>
              <input
                id="new-account-number"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={15}
                className="itr-text-input itr-mono"
                placeholder="Enter 10 to 15 digit account number"
                value={newAccountNumber}
                onChange={(e) => setNewAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 15))}
              />
            </div>

            <div className="itr-input-group">
              <label htmlFor="new-confirm-account" className="itr-input-label">
                Confirm Account Number *
              </label>
              <input
                id="new-confirm-account"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={15}
                className="itr-text-input itr-mono"
                placeholder="Re-enter 10 to 15 digit account number"
                value={newConfirmAccountNumber}
                onChange={(e) => setNewConfirmAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 15))}
              />
            </div>

            <div className="itr-input-group itr-input-group--full">
              <label htmlFor="new-ifsc" className="itr-input-label">
                IFSC Code *
              </label>
              <input
                id="new-ifsc"
                type="text"
                className="itr-text-input itr-mono"
                placeholder="11-character IFSC (e.g. SBIN0000412)"
                maxLength={11}
                value={newIfsc}
                onChange={(e) => setNewIfsc(e.target.value.toUpperCase())}
              />
            </div>
          </div>

          <div className="itr-add-bank-actions">
            <button type="submit" className="itr-btn-save-bank">
              Save Bank Account
            </button>
            <button
              type="button"
              className="itr-btn-cancel-bank"
              onClick={() => {
                setIsAddingBank(false)
                setBankFormError(null)
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  )
}
