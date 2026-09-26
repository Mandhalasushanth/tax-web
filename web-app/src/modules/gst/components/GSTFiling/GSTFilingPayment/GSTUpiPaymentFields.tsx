import React from 'react'

interface GSTUpiPaymentFieldsProps {
  upiId: string
  mobile: string
  upiError?: string
  mobileError?: string
  onUpiIdChange: (val: string) => void
  onMobileChange: (val: string) => void
  onSelectApp: (appName: string) => void
}

const UPI_APPS = [
  {
    id: 'gpay',
    name: 'Google Pay',
    icon: (
      <svg viewBox="0 0 48 48" className="gst-upi-app-logo">
        <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.66 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.74H24v9h12.5c-.54 2.9-2.18 5.36-4.65 7.02l7.52 5.83c4.4-4.05 6.93-10.01 6.93-17.11z" />
        <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.98-6.19z" />
        <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.52-5.83c-2.15 1.45-4.92 2.3-8.37 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.66 48 24 48z" />
      </svg>
    ),
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    icon: (
      <svg viewBox="0 0 48 48" className="gst-upi-app-logo">
        <circle cx="24" cy="24" r="22" fill="#5F259F" />
        <text x="24" y="32" fontSize="22" fontWeight="800" fill="#FFFFFF" textAnchor="middle" fontFamily="system-ui, -apple-system, Arial, sans-serif">पे</text>
      </svg>
    ),
  },
  {
    id: 'paytm',
    name: 'Paytm',
    icon: (
      <svg viewBox="0 0 80 28" className="gst-upi-app-logo gst-upi-app-logo--wide">
        <text x="0" y="21" fill="#002E6E" fontSize="22" fontWeight="900" fontFamily="system-ui, -apple-system, Arial, sans-serif" letterSpacing="-0.5px">Pay</text>
        <text x="44" y="21" fill="#00BAF2" fontSize="22" fontWeight="900" fontFamily="system-ui, -apple-system, Arial, sans-serif" letterSpacing="-0.5px">tm</text>
      </svg>
    ),
  },
  {
    id: 'bhim',
    name: 'BHIM',
    icon: (
      <svg viewBox="0 0 48 48" className="gst-upi-app-logo">
        <path fill="#008744" d="M10 6l16 16L10 38V6z" />
        <path fill="#F37021" d="M38 42L22 26l16-16v32z" />
      </svg>
    ),
  },
]

const preventEnter = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
  }
}

export const GSTUpiPaymentFields: React.FC<GSTUpiPaymentFieldsProps> = ({
  upiId,
  mobile,
  upiError,
  mobileError,
  onUpiIdChange,
  onMobileChange,
  onSelectApp,
}) => {
  return (
    <div className="gst-pay-details-block" onClick={(e) => e.stopPropagation()}>
      <h4 className="gst-pay-subheading">Pay with UPI app</h4>
      
      {/* 4 App Selectors */}
      <div className="gst-pay-upi-grid">
        {UPI_APPS.map((app) => (
          <button
            key={app.id}
            type="button"
            className="gst-pay-upi-btn"
            onClick={(e) => {
              e.stopPropagation()
              onSelectApp(app.id)
            }}
          >
            <div className="gst-pay-upi-icon-wrap">{app.icon}</div>
            <span className="gst-pay-upi-app-label">{app.name}</span>
          </button>
        ))}
      </div>

      {/* OR Divider Line */}
      <div className="gst-pay-or-divider">
        <span>OR</span>
      </div>

      {/* 2-Column Inputs Grid */}
      <div className="gst-pay-input-grid">
        {/* UPI ID Field */}
        <div className="gst-pay-field">
          <label htmlFor="upi-id-inp" className="gst-pay-field-label">
            Enter your UPI ID
          </label>
          <div className={`gst-pay-prefix-inp-wrap ${upiError ? 'gst-pay-prefix-inp-wrap--error' : ''}`}>
            <span className="gst-pay-prefix-badge">@</span>
            <input
              id="upi-id-inp"
              type="text"
              className="gst-pay-prefix-inp"
              placeholder="example@upi"
              value={upiId}
              onKeyDown={preventEnter}
              onChange={(e) => onUpiIdChange(e.target.value)}
            />
          </div>
          {upiError && <p className="gst-pay-field-err">⚠️ {upiError}</p>}
        </div>

        {/* Mobile Number Field */}
        <div className="gst-pay-field">
          <label htmlFor="pay-mobile-inp" className="gst-pay-field-label">
            Mobile number (for filing updates &amp; SMS receipt) <span className="gst-pay-required-star">*</span>
          </label>
          <div className={`gst-pay-prefix-inp-wrap ${mobileError ? 'gst-pay-prefix-inp-wrap--error' : ''}`}>
            <span className="gst-pay-prefix-badge">+91</span>
            <input
              id="pay-mobile-inp"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              className="gst-pay-prefix-inp"
              placeholder="10-digit mobile number"
              value={mobile}
              onKeyDown={preventEnter}
              onChange={(e) => onMobileChange(e.target.value)}
            />
          </div>
          {mobileError && <p className="gst-pay-field-err">⚠️ {mobileError}</p>}
        </div>
      </div>
    </div>
  )
}
