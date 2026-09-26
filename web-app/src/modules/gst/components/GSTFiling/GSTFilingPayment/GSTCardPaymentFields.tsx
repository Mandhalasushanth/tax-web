import React from 'react'

interface GSTCardPaymentFieldsProps {
  cardNumber: string
  expiry: string
  cvv: string
  cardHolder: string
  errors: Record<string, string>
  onCardNumberChange: (val: string) => void
  onExpiryChange: (val: string) => void
  onCvvChange: (val: string) => void
  onCardHolderChange: (val: string) => void
}

const preventEnter = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
  }
}

export const GSTCardPaymentFields: React.FC<GSTCardPaymentFieldsProps> = ({
  cardNumber,
  expiry,
  cvv,
  cardHolder,
  errors,
  onCardNumberChange,
  onExpiryChange,
  onCvvChange,
  onCardHolderChange,
}) => {
  const [showCvv, setShowCvv] = React.useState(false)

  return (
    <div className="gst-pay-card-details-body" onClick={(e) => e.stopPropagation()}>
      {/* Card number */}
      <div className="gst-pay-field">
        <label className="gst-pay-field-label">Card number</label>
        <div className={`gst-pay-card-num-wrap ${errors.cardNumber ? 'gst-pay-inp--error' : ''}`}>
          <input
            className="gst-pay-card-num-inp"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            inputMode="numeric"
            value={cardNumber}
            onKeyDown={preventEnter}
            onChange={(e) => onCardNumberChange(e.target.value)}
          />
          <div className="gst-pay-card-brand-logos" aria-hidden="true">
            <svg viewBox="0 0 36 12" className="gst-card-logo-visa">
              <text x="0" y="10" fill="#1434CB" fontWeight="900" fontStyle="italic" fontSize="11" letterSpacing="-0.5">VISA</text>
            </svg>
            <svg viewBox="0 0 24 16" className="gst-card-logo-mastercard">
              <circle cx="7" cy="8" r="6" fill="#EB001B" />
              <circle cx="15" cy="8" r="6" fill="#F79E1B" fillOpacity="0.9" />
            </svg>
            <svg viewBox="0 0 45 12" className="gst-card-logo-rupay">
              <text x="0" y="10" fill="#002E6E" fontWeight="900" fontStyle="italic" fontSize="11">Ru<tspan fill="#00BAF2">Pay</tspan><tspan fill="#008744">›</tspan></text>
            </svg>
          </div>
        </div>
        {errors.cardNumber && <p className="gst-pay-field-err">⚠️ {errors.cardNumber}</p>}
      </div>

      {/* 2-Column Grid: Expiry date & CVV */}
      <div className="gst-pay-card-grid-2">
        <div className="gst-pay-field">
          <label className="gst-pay-field-label">Expiry date</label>
          <input
            className={`gst-pay-inp ${errors.expiry ? 'gst-pay-inp--error' : ''}`}
            placeholder="MM / YY"
            maxLength={7}
            inputMode="numeric"
            value={expiry}
            onKeyDown={preventEnter}
            onChange={(e) => onExpiryChange(e.target.value)}
          />
          {errors.expiry && <p className="gst-pay-field-err">⚠️ {errors.expiry}</p>}
        </div>

        <div className="gst-pay-field">
          <label className="gst-pay-field-label">CVV</label>
          <div className={`gst-pay-cvv-wrap ${errors.cvv ? 'gst-pay-inp--error' : ''}`}>
            <input
              type={showCvv ? 'text' : 'password'}
              maxLength={3}
              inputMode="numeric"
              className="gst-pay-cvv-inp"
              placeholder="•••"
              value={cvv}
              onKeyDown={preventEnter}
              onChange={(e) => onCvvChange(e.target.value)}
            />
            <button
              type="button"
              className="gst-pay-cvv-eye-btn"
              onClick={() => setShowCvv((prev) => !prev)}
              title={showCvv ? 'Hide CVV' : 'Show CVV'}
              aria-label={showCvv ? 'Hide CVV' : 'Show CVV'}
            >
              {showCvv ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {errors.cvv && <p className="gst-pay-field-err">⚠️ {errors.cvv}</p>}
        </div>
      </div>

      {/* Name on card */}
      <div className="gst-pay-field">
        <label className="gst-pay-field-label">Name on card</label>
        <input
          className={`gst-pay-inp ${errors.cardHolder ? 'gst-pay-inp--error' : ''}`}
          placeholder="As printed on the card"
          value={cardHolder}
          onKeyDown={preventEnter}
          onChange={(e) => onCardHolderChange(e.target.value)}
        />
        {errors.cardHolder && <p className="gst-pay-field-err">⚠️ {errors.cardHolder}</p>}
      </div>
    </div>
  )
}
