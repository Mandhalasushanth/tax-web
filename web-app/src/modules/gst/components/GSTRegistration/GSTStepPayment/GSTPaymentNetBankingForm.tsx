import type { FC } from 'react'
import { POPULAR_BANKS, ALL_BANKS } from '../../../types/gstPayment.types'

interface GSTPaymentNetBankingFormProps {
  selectedBank: string
  error?: string
  onSelectBank: (bank: string) => void
}

export const GSTPaymentNetBankingForm: FC<GSTPaymentNetBankingFormProps> = ({
  selectedBank,
  error,
  onSelectBank,
}) => {
  return (
    <div className="gst-payment-details-card">
      <div className="gst-netbanking-popular">
        <span className="gst-payment-form-sublabel">Popular Indian Banks:</span>
        <div className="gst-netbanking-banks-grid">
          {POPULAR_BANKS.map((bank) => {
            const isSelected = selectedBank === bank

            return (
              <button
                key={bank}
                type="button"
                className={`gst-netbanking-bank-pill ${
                  isSelected ? 'gst-netbanking-bank-pill--selected' : ''
                }`}
                onClick={() => onSelectBank(bank)}
                aria-pressed={isSelected}
              >
                {bank}
              </button>
            )
          })}
        </div>
      </div>

      <div className="gst-payment-form-group">
        <label className="gst-payment-form-label" htmlFor="allBanksSelect">
          Or Select Other Indian Bank
        </label>
        <div className="gst-payment-select-wrap">
          <select
            id="allBanksSelect"
            className={`gst-payment-select ${error ? 'gst-payment-select--error' : ''}`}
            value={selectedBank}
            onChange={(e) => onSelectBank(e.target.value)}
            aria-invalid={!!error}
          >
            <option value="">— Select your bank —</option>
            {ALL_BANKS.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <div className="gst-payment-field-error" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
