import type { FC } from 'react'
import type { PaymentMethodId } from '../../../types/gstPayment.types'
import { UpiIcon, CardIcon, BankIcon } from '../../../shared/GSTPaymentIcons/GSTPaymentIcons'
import './GSTPaymentMethodSelector.css'

interface GSTPaymentMethodSelectorProps {
  selectedMethod: PaymentMethodId
  onSelectMethod: (method: PaymentMethodId) => void
  hasError: boolean
}

interface MethodOption {
  id: PaymentMethodId
  title: string
  subtitle: string
  tag?: string
  iconColor: string
  iconBg: string
  Icon: FC<{ className?: string }>
}

const METHODS: MethodOption[] = [
  {
    id: 'upi',
    title: 'UPI',
    subtitle: 'Google Pay, PhonePe, Paytm, BHIM',
    tag: 'Instant',
    iconColor: '#059669',
    iconBg: '#ecfdf5',
    Icon: UpiIcon,
  },
  {
    id: 'card',
    title: 'Debit / Credit Card',
    subtitle: 'Visa, Mastercard, RuPay, Corporate',
    iconColor: '#2563eb',
    iconBg: '#eff6ff',
    Icon: CardIcon,
  },
  {
    id: 'netbanking',
    title: 'Net Banking',
    subtitle: 'All major Indian commercial banks',
    iconColor: '#7c3aed',
    iconBg: '#f5f3ff',
    Icon: BankIcon,
  },
]

export const GSTPaymentMethodSelector: FC<GSTPaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelectMethod,
  hasError,
}) => {
  return (
    <section className="gst-payment-methods-section">
      <div className="gst-payment-methods-header">
        <h3 className="gst-payment-section-heading">Choose Payment Method</h3>
        <span className="gst-payment-section-sub">100% Safe &amp; Encrypted</span>
      </div>

      {hasError && !selectedMethod && (
        <div className="gst-payment-error-alert" role="alert">
          * Please select a payment method to proceed.
        </div>
      )}

      <div className="gst-payment-methods-grid" role="radiogroup" aria-label="Payment methods">
        {METHODS.map((method) => {
          const isSelected = selectedMethod === method.id
          const { Icon } = method

          return (
            <div
              key={method.id}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              className={`gst-payment-method-card ${
                isSelected ? 'gst-payment-method-card--selected' : ''
              }`}
              onClick={() => onSelectMethod(method.id)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault()
                  onSelectMethod(method.id)
                }
              }}
            >
              <div className="gst-payment-method-card__top-bar">
                <div
                  className="gst-payment-method-card__icon-badge"
                  style={{ backgroundColor: method.iconBg, color: method.iconColor }}
                >
                  <Icon className="gst-payment-method-card__svg" />
                </div>

                <div className="gst-payment-method-card__radio-wrap">
                  <div
                    className={`gst-payment-radio-circle ${
                      isSelected ? 'gst-payment-radio-circle--checked' : ''
                    }`}
                  >
                    {isSelected && <span className="gst-payment-radio-circle__dot" />}
                  </div>
                </div>
              </div>

              <div className="gst-payment-method-card__content">
                <div className="gst-payment-method-card__title-row">
                  <h4 className="gst-payment-method-card__title">{method.title}</h4>
                  {method.tag && <span className="gst-payment-method-card__tag">{method.tag}</span>}
                </div>
                <p className="gst-payment-method-card__subtitle">{method.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default GSTPaymentMethodSelector
