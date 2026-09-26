import { useState } from 'react'
import { authStorage } from '@core/auth'
import {
  INITIAL_COMPUTATION_DATA,
  type FullComputationModel,
} from '../../utils/taxComputationCalculations'
import { BarChartIcon } from '../../components/ItrIcons'
import './TaxComputation.css'

export interface TaxComputationProps {
  onApprove?: () => void
}

export const TaxComputation = ({ onApprove }: TaxComputationProps) => {
  const [data] = useState<FullComputationModel>(INITIAL_COMPUTATION_DATA)
  const [isApproved, setIsApproved] = useState(false)
  const user = authStorage.getUser()

  const displayName = user?.fullName || data.taxpayerName || 'Assessee'
  const displayPan = user?.pan || data.pan || '—'

  const handleApprove = () => {
    setIsApproved(true)
    if (onApprove) {
      onApprove()
    }
  }

  return (
    <div className="tax-comp-container">
      <div className="tax-comp-hero">
        <div className="tax-comp-hero__badge">
          <span className="tax-comp-hero__badge-content">
            <BarChartIcon size={14} strokeWidth={2.2} /> Reconciled CA Computation
          </span>
          <span>•</span>
          <span>AIS & TIS Matched</span>
        </div>
        <h1 className="tax-comp-hero__title">Tax Computation & AIS Reconciliation</h1>
        <p className="tax-comp-hero__subtitle">
          View your audited computation statement prepared by your assigned TaxEdge Chartered Accountant before final electronic
          filing with the Income Tax Department.
        </p>
      </div>

      <div className="tax-comp-card">
        <div className="tax-comp-header-row">
          <div>
            <h3 className="tax-comp-statement-title">
              Statement of Total Income — {data.assessmentYear}
            </h3>
            <span className="tax-comp-statement-subtitle">
              PAN: {displayPan} · Assessee: {displayName} · Status: {data.filingStatus}
            </span>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="tax-comp-print-btn"
          >
            🖨️ Print / Download PDF
          </button>
        </div>

        <div className="tax-comp-table-wrapper">
          <table className="tax-comp-table">
            <thead>
              <tr>
                <th>Head of Income</th>
                <th>Gross (₹)</th>
                <th>Exemptions / Deductions (₹)</th>
                <th>Net Taxable (₹)</th>
                <th>AIS Verification</th>
              </tr>
            </thead>
            <tbody>
              {data.heads.map((head, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{head.headName}</strong>
                  </td>
                  <td>₹{head.grossAmount.toLocaleString('en-IN')}</td>
                  <td>₹{head.exemptions.toLocaleString('en-IN')}</td>
                  <td className="tax-comp-table__taxable-cell">
                    ₹{head.netTaxable.toLocaleString('en-IN')}
                  </td>
                  <td>
                    {head.aisVerified && (
                      <span className="tax-comp-ais-badge">
                        ✓ AIS / Form 26AS Matched
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="tax-comp-summary-grid">
          <div className="tax-comp-stat-box">
            <div className="tax-comp-stat-label">Gross Total Taxable</div>
            <div className="tax-comp-stat-val">
              ₹{data.totalTaxableIncome.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="tax-comp-stat-box">
            <div className="tax-comp-stat-label">Total Tax Payable (incl. Cess)</div>
            <div className="tax-comp-stat-val">
              ₹{data.totalTaxPayable.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="tax-comp-stat-box">
            <div className="tax-comp-stat-label">TDS / Advance Tax Credits</div>
            <div className="tax-comp-stat-val tax-comp-stat-val--blue">
              ₹{(data.advanceTaxPaid + data.tdsCreditsClaimed).toLocaleString('en-IN')}
            </div>
          </div>

          <div className="tax-comp-stat-box tax-comp-stat-box--orange">
            <div className="tax-comp-stat-label tax-comp-stat-label--orange">
              Net Eligible Refund
            </div>
            <div className="tax-comp-stat-val tax-comp-stat-val--orange">
              ₹{data.netRefundOrPayable.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <div className="tax-comp-footer-row">
          <div className="tax-comp-action-group">
            {isApproved ? (
              <span className="tax-comp-approved-badge">
                ✓ Computation Approved for E-Filing
              </span>
            ) : (
              <button
                type="button"
                className="tax-comp-action-btn"
                onClick={handleApprove}
              >
                Approve CA Computation & Authorize Filing →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaxComputation
