import React from 'react'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'

export interface Section6And7Props {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  isProjectedFinancialsOpen: boolean
  onToggleProjectedFinancials: () => void
  isCashFlowOpen: boolean
  onToggleCashFlow: () => void
}

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

const TrendingUpSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const WalletSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
    <path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
    <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
  </svg>
)

export const Section6And7: React.FC<Section6And7Props> = ({
  isProjectedFinancialsOpen,
  onToggleProjectedFinancials,
  isCashFlowOpen,
  onToggleCashFlow,
}) => {
  return (
    <>
      {/* 6. Projected Financials */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleProjectedFinancials}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <TrendingUpSvg />
            </div>
            <h2 className="pf-collapsible-title">6. Projected Financials</h2>
          </div>
          <ChevronSvg isOpen={isProjectedFinancialsOpen} />
        </div>

        {isProjectedFinancialsOpen && (
          <div className="pf-collapsible-body">
            <p className="pf-section-intro-desc">
              Projected financials for next 5 years (auto-calculated based on inputs).
            </p>

            <div className="pf-table-scroll-container">
              <table className="pf-financial-table">
                <thead>
                  <tr>
                    <th className="pf-table-col-header">Particulars</th>
                    <th className="pf-table-col-header pf-text-center">Year 1</th>
                    <th className="pf-table-col-header pf-text-center">Year 2</th>
                    <th className="pf-table-col-header pf-text-center">Year 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pf-table-cell-label">Revenue (₹)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">EBITDA (₹)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">EBITDA Margin (%)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">PAT (₹)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 7. Cash Flow */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleCashFlow}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <WalletSvg />
            </div>
            <h2 className="pf-collapsible-title">7. Cash Flow</h2>
          </div>
          <ChevronSvg isOpen={isCashFlowOpen} />
        </div>

        {isCashFlowOpen && (
          <div className="pf-collapsible-body">
            <p className="pf-section-intro-desc">
              Projected cash flow for next 5 years (auto-calculated).
            </p>

            <div className="pf-table-scroll-container">
              <table className="pf-financial-table">
                <thead>
                  <tr>
                    <th className="pf-table-col-header">Particulars</th>
                    <th className="pf-table-col-header pf-text-center">Year 1</th>
                    <th className="pf-table-col-header pf-text-center">Year 2</th>
                    <th className="pf-table-col-header pf-text-center">Year 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pf-table-cell-label">Operating Cash Flow (₹)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Capex (₹)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Principal Repayment (₹)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Closing Cash Balance (₹)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
