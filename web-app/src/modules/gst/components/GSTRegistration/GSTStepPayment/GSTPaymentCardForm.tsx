import type { FC, ChangeEvent } from 'react'
import type { CardFormData, PaymentErrors } from '../../../types/gstPayment.types'

interface GSTPaymentCardFormProps {
  cardData: CardFormData
  errors: PaymentErrors
  onChange: (field: keyof CardFormData, value: string) => void
}

export const GSTPaymentCardForm: FC<GSTPaymentCardFormProps> = ({
  cardData,
  errors,
  onChange,
}) => {
  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16)
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ')
    onChange('cardNumber', formatted)
  }

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`
    }
    onChange('expiryDate', val)
  }

  const handleCvvChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4)
    onChange('cvv', val)
  }

  return (
    <div className="gst-payment-details-card">
      <div className="gst-card-form-grid">
        <div className="gst-payment-form-group gst-card-form-full">
          <label className="gst-payment-form-label" htmlFor="cardNumberInput">
            Card Number
          </label>
          <input
            id="cardNumberInput"
            type="text"
            className={`gst-payment-input ${errors.cardNumber ? 'gst-payment-input--error' : ''}`}
            placeholder="0000 0000 0000 0000"
            value={cardData.cardNumber}
            onChange={handleCardNumberChange}
            maxLength={19}
            aria-invalid={!!errors.cardNumber}
          />
          {errors.cardNumber && (
            <div className="gst-payment-field-error" role="alert">
              {errors.cardNumber}
            </div>
          )}
        </div>

        <div className="gst-payment-form-group gst-card-form-full">
          <label className="gst-payment-form-label" htmlFor="cardHolderInput">
            Cardholder Name
          </label>
          <input
            id="cardHolderInput"
            type="text"
            className={`gst-payment-input ${errors.cardHolder ? 'gst-payment-input--error' : ''}`}
            placeholder="Name on card"
            value={cardData.cardHolder}
            onChange={(e) => onChange('cardHolder', e.target.value)}
            aria-invalid={!!errors.cardHolder}
          />
          {errors.cardHolder && (
            <div className="gst-payment-field-error" role="alert">
              {errors.cardHolder}
            </div>
          )}
        </div>

        <div className="gst-payment-form-group">
          <label className="gst-payment-form-label" htmlFor="expiryInput">
            Valid Thru (MM/YY)
          </label>
          <input
            id="expiryInput"
            type="text"
            className={`gst-payment-input ${errors.expiryDate ? 'gst-payment-input--error' : ''}`}
            placeholder="MM/YY"
            value={cardData.expiryDate}
            onChange={handleExpiryChange}
            maxLength={5}
            aria-invalid={!!errors.expiryDate}
          />
          {errors.expiryDate && (
            <div className="gst-payment-field-error" role="alert">
              {errors.expiryDate}
            </div>
          )}
        </div>

        <div className="gst-payment-form-group">
          <label className="gst-payment-form-label" htmlFor="cvvInput">
            CVV / CVC
          </label>
          <input
            id="cvvInput"
            type="password"
            className={`gst-payment-input ${errors.cvv ? 'gst-payment-input--error' : ''}`}
            placeholder="3 or 4 digits"
            value={cardData.cvv}
            onChange={handleCvvChange}
            maxLength={4}
            aria-invalid={!!errors.cvv}
          />
          {errors.cvv && (
            <div className="gst-payment-field-error" role="alert">
              {errors.cvv}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
