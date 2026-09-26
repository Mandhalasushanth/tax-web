import { formatCurrency } from '@shared/utils'

interface GSTFilingPaymentSidebarProps {
  serviceTitle: string
  baseFee: number
  gstAmount: number
  totalPayable: number
  discount?: number
}

export const GSTFilingPaymentSidebar = ({
  serviceTitle,
  baseFee,
  gstAmount,
  totalPayable,
  discount = 0,
}: GSTFilingPaymentSidebarProps) => {
  return (
    <aside className="gst-pay-sidebar">
      {/* 1. Order summary Card */}
      <div className="gst-pay-order-card">
        <div className="gst-pay-card-header">
          <div className="gst-pay-card-icon-box gst-pay-card-icon-box--blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h3 className="gst-pay-order-card__title">Order summary</h3>
        </div>

        <div className="gst-pay-order-card__table">
          <div className="gst-pay-order-card__row">
            <span className="gst-pay-order-card__label">{serviceTitle}</span>
            <span className="gst-pay-order-card__value">{formatCurrency(baseFee)}</span>
          </div>
          <div className="gst-pay-order-card__row">
            <span className="gst-pay-order-card__label">GST (18%)</span>
            <span className="gst-pay-order-card__value">{formatCurrency(gstAmount)}</span>
          </div>
          {discount > 0 && (
            <div className="gst-pay-order-card__row gst-pay-order-card__row--discount">
              <span className="gst-pay-order-card__label">Discount</span>
              <span className="gst-pay-order-card__value">−{formatCurrency(discount)}</span>
            </div>
          )}
          <div className="gst-pay-order-card__divider" />
          <div className="gst-pay-order-card__row gst-pay-order-card__row--total">
            <span className="gst-pay-order-card__total-label">Total payable</span>
            <span className="gst-pay-order-card__total-amount">{formatCurrency(totalPayable)}</span>
          </div>
        </div>
      </div>

      {/* 2. What happens after payment? Card */}
      <div className="gst-pay-note-card">
        <div className="gst-pay-card-header">
          <div className="gst-pay-card-icon-box gst-pay-card-icon-box--blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h4 className="gst-pay-note-card__title">What happens after payment?</h4>
        </div>
        <ul className="gst-pay-benefits-list">
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="#00b074" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            <span>Your payment receipt will be generated instantly.</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="#00b074" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            <span>Your GST filing application will move to Active.</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="#00b074" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            <span>Your assigned executive will be notified.</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="#00b074" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            <span>You will receive an email and SMS confirmation.</span>
          </li>
        </ul>
      </div>

      {/* 3. 100% Secure Payment Green Card */}
      <div className="gst-pay-secure-card">
        <div className="gst-pay-card-icon-box gst-pay-card-icon-box--green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        </div>
        <div className="gst-pay-secure-card__content">
          <h4 className="gst-pay-secure-card__title">100% Secure Payment</h4>
          <p className="gst-pay-secure-card__desc">
            We use PCI-DSS compliant payment gateway. Your card/UPI details are never stored by TaxEdge.
          </p>
        </div>
      </div>
    </aside>
  )
}
