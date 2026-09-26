import type { FC } from 'react'
import { UPI_APPS } from '../../../types/gstPayment.types'
import { PhonePeIcon, GPayIcon, PaytmIcon, BhimIcon } from '../../../shared/GSTPaymentIcons/GSTPaymentIcons'
import './GSTPaymentForms.css'

interface GSTPaymentUpiFormProps {
  upiId: string
  selectedUpiApp: string
  error?: string
  onUpiIdChange: (val: string) => void
  onSelectUpiApp: (appId: string) => void
}

const renderUpiIcon = (id: string) => {
  switch (id) {
    case 'phonepe':
      return <PhonePeIcon />
    case 'gpay':
      return <GPayIcon />
    case 'paytm':
      return <PaytmIcon />
    case 'bhim':
      return <BhimIcon />
    default:
      return null
  }
}

export const GSTPaymentUpiForm: FC<GSTPaymentUpiFormProps> = ({
  upiId,
  selectedUpiApp,
  error,
  onUpiIdChange,
  onSelectUpiApp,
}) => {
  return (
    <div className="gst-payment-details-card">
      <div className="gst-upi-form-group">
        <label className="gst-payment-form-label" htmlFor="upiIdInput">
          Enter UPI ID / VPA
        </label>
        <div className="gst-payment-input-wrap">
          <input
            id="upiIdInput"
            type="text"
            className={`gst-payment-input ${error ? 'gst-payment-input--error' : ''}`}
            placeholder="taxedge@okaxis"
            value={upiId}
            onChange={(e) => onUpiIdChange(e.target.value)}
            aria-invalid={!!error}
          />
        </div>
        {error && (
          <div className="gst-payment-field-error" role="alert">
            {error}
          </div>
        )}
      </div>

      <div className="gst-upi-apps-group">
        <span className="gst-payment-form-sublabel">Quick Select UPI App:</span>
        <div className="gst-upi-apps-grid" role="group" aria-label="UPI Apps">
          {UPI_APPS.map((app) => {
            const isAppSelected = selectedUpiApp === app.id

            return (
              <button
                key={app.id}
                type="button"
                className={`gst-upi-app-tile ${
                  isAppSelected ? 'gst-upi-app-tile--selected' : ''
                }`}
                onClick={() => onSelectUpiApp(app.id)}
                aria-pressed={isAppSelected}
              >
                <div className="gst-upi-app-tile__icon-wrap">
                  {renderUpiIcon(app.id) || (
                    <img src={app.iconSrc} width={28} height={28} alt={app.name} />
                  )}
                </div>
                <span className="gst-upi-app-tile__name">{app.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
