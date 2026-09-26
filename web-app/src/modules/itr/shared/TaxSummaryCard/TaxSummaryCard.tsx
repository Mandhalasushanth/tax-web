import React from 'react'
import './TaxSummaryCard.css'

export interface TaxSummaryCardProps {
  title?: string
  grossIncome: number
  totalDeductions: number
  taxableIncome: number
  totalTax: number
  taxPaid: number
  refundOrPayable: number
  isRefund: boolean
}

export const TaxSummaryCard: React.FC<TaxSummaryCardProps> = ({
  title = "Tax Computation Summary",
  grossIncome,
  totalDeductions,
  taxableIncome,
  totalTax,
  taxPaid,
  refundOrPayable,
  isRefund
}) => {
  return (
    <div className="itr-tax-summary-card">
      <h3 className="itr-tax-summary-title">{title}</h3>
      
      <div className="itr-tax-summary-list">
        <div className="itr-tax-summary-item">
          <span className="itr-tax-summary-label">Gross Total Income</span>
          <span className="itr-tax-summary-value">₹{grossIncome.toLocaleString('en-IN')}</span>
        </div>
        
        <div className="itr-tax-summary-item">
          <span className="itr-tax-summary-label">Total Deductions</span>
          <span className="itr-tax-summary-value minus">- ₹{totalDeductions.toLocaleString('en-IN')}</span>
        </div>
        
        <div className="itr-tax-summary-divider" />
        
        <div className="itr-tax-summary-item highlight">
          <span className="itr-tax-summary-label">Net Taxable Income</span>
          <span className="itr-tax-summary-value">₹{taxableIncome.toLocaleString('en-IN')}</span>
        </div>
        
        <div className="itr-tax-summary-divider" />

        <div className="itr-tax-summary-item">
          <span className="itr-tax-summary-label">Total Tax Computed</span>
          <span className="itr-tax-summary-value">₹{totalTax.toLocaleString('en-IN')}</span>
        </div>
        
        <div className="itr-tax-summary-item">
          <span className="itr-tax-summary-label">Taxes Paid (TDS/TCS/Advance)</span>
          <span className="itr-tax-summary-value">₹{taxPaid.toLocaleString('en-IN')}</span>
        </div>

        <div className="itr-tax-summary-divider" />

        <div className={`itr-tax-summary-final ${isRefund ? 'refund' : 'payable'}`}>
          <div className="itr-tax-summary-final-label">
            {isRefund ? 'Estimated Refund' : 'Tax Payable'}
          </div>
          <div className="itr-tax-summary-final-value">
            ₹{Math.abs(refundOrPayable).toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaxSummaryCard
