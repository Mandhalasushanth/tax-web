import { formatCurrency } from '@shared/utils'
import type { PaymentResult } from '../../../types/gst.types'

interface GSTReceiptSummaryCardProps {
  details: PaymentResult
}

export const GSTReceiptSummaryCard = ({ details }: GSTReceiptSummaryCardProps) => {
  return (
    <div className="gst-txn-summary-card">
      <div className="gst-txn-summary-header">
        <div className="gst-txn-summary-icon-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gst-txn-summary-icon">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        </div>
        <h3 className="gst-txn-summary-title">Transaction Summary</h3>
      </div>

      <div className="gst-txn-summary-grid">
        <div className="gst-txn-summary-col">
          <span className="gst-txn-summary-label">Transaction ID</span>
          <span className="gst-txn-summary-val">{details.transactionId}</span>
        </div>

        <div className="gst-txn-summary-col">
          <span className="gst-txn-summary-label">Payment Method</span>
          <span className="gst-txn-summary-val">{details.method}</span>
          <span className="gst-txn-summary-sub">Verified Payment</span>
        </div>

        <div className="gst-txn-summary-col">
          <span className="gst-txn-summary-label">Amount Paid</span>
          <span className="gst-txn-summary-val gst-txn-summary-val--amount">
            {formatCurrency(details.amount)}
          </span>
        </div>

        <div className="gst-txn-summary-col">
          <span className="gst-txn-summary-label">Date &amp; Time</span>
          <span className="gst-txn-summary-val">{details.dateText}, 10:32 AM</span>
        </div>

        <div className="gst-txn-summary-col">
          <span className="gst-txn-summary-label">Status</span>
          <span className="gst-txn-summary-status">
            <svg viewBox="0 0 24 24" fill="currentColor" className="gst-txn-summary-status-icon">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.707 8.707-4.414 4.414a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L10.586 13l3.707-3.707a1 1 0 0 1 1.414 1.414z" clipRule="evenodd" />
            </svg>
            Successful
          </span>
        </div>
      </div>
    </div>
  )
}
