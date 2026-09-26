import React from 'react'
import { formatCurrency } from '@shared/utils'
import type { TaxComputationItem } from '../../../utils/gstReviewData'
import './GSTReviewComputation.css'

interface GSTReviewTaxComputationProps {
  items: TaxComputationItem[]
  netLiability: number
}

interface GSTReviewFilingFeeProps {
  items: TaxComputationItem[]
  totalFee: number
}

export const GSTReviewTaxComputationCard: React.FC<GSTReviewTaxComputationProps> = ({
  items,
  netLiability,
}) => {
  return (
    <div className="gst-comp-card">
      <div className="gst-comp-card__header">
        <div className="gst-comp-card__icon-wrap gst-comp-card__icon-wrap--yellow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        <h3 className="gst-comp-card__title">Tax Computation (Reconciled)</h3>
      </div>

      <table className="gst-comp-table">
        <thead>
          <tr>
            <th>Particulars</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, idx) => (
            <tr key={idx}>
              <td>{row.particulars}</td>
              <td>{formatCurrency(row.amount)}</td>
            </tr>
          ))}
          <tr className="gst-comp-table__highlight-row--blue">
            <td>Net Tax Liability (Govt)</td>
            <td>{formatCurrency(netLiability)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export const GSTReviewFilingFeeCard: React.FC<GSTReviewFilingFeeProps> = ({
  items,
  totalFee,
}) => {
  return (
    <div className="gst-comp-card">
      <div className="gst-comp-card__header">
        <div className="gst-comp-card__icon-wrap gst-comp-card__icon-wrap--purple">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        </div>
        <h3 className="gst-comp-card__title">Professional Filing Fee</h3>
      </div>

      <table className="gst-comp-table">
        <thead>
          <tr>
            <th>Particulars</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, idx) => (
            <tr key={idx}>
              <td>{row.particulars}</td>
              <td>{formatCurrency(row.amount)}</td>
            </tr>
          ))}
          <tr className="gst-comp-table__highlight-row--payable">
            <td>
              <div className="gst-comp-payable-label">Total Payable</div>
              <div className="gst-comp-payable-sub">Inclusive of 18% GST &amp; all reconciliation charges</div>
            </td>
            <td className="gst-comp-payable-amount">
              {formatCurrency(totalFee)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
