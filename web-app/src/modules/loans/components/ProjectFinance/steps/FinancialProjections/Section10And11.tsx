import React from 'react'

export interface Section10And11Props {
  isFinancialRatiosOpen: boolean
  onToggleFinancialRatios: () => void
  isSensitivityAnalysisOpen: boolean
  onToggleSensitivityAnalysis: () => void
}

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

const PieChartSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
)

const TrendingUpSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

export const Section10And11: React.FC<Section10And11Props> = ({
  isFinancialRatiosOpen,
  onToggleFinancialRatios,
  isSensitivityAnalysisOpen,
  onToggleSensitivityAnalysis,
}) => {
  return (
    <>
      {/* 10. Financial Ratios */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleFinancialRatios}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <PieChartSvg />
            </div>
            <h2 className="pf-collapsible-title">10. Financial Ratios</h2>
          </div>
          <ChevronSvg isOpen={isFinancialRatiosOpen} />
        </div>

        {isFinancialRatiosOpen && (
          <div className="pf-collapsible-body">
            <p className="pf-section-intro-desc">
              Key financial ratios (auto-calculated).
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
                    <td className="pf-table-cell-label">EBITDA Margin (%)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">PAT Margin (%)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Debt / Equity</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Interest Coverage</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Project IRR (%)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">ROE (%)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">ROCE (%)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Equity IRR (%)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Break-even (Years)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Payback Period (Years)</td>
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

      {/* 11. Sensitivity Analysis */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleSensitivityAnalysis}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <TrendingUpSvg />
            </div>
            <h2 className="pf-collapsible-title">11. Sensitivity Analysis</h2>
          </div>
          <ChevronSvg isOpen={isSensitivityAnalysisOpen} />
        </div>

        {isSensitivityAnalysisOpen && (
          <div className="pf-collapsible-body">
            <p className="pf-section-intro-desc">
              Analyse impact of key changes on project viability.
            </p>

            <div className="pf-table-scroll-container">
              <table className="pf-financial-table">
                <thead>
                  <tr>
                    <th className="pf-table-col-header">Scenario</th>
                    <th className="pf-table-col-header pf-text-center">DSCR</th>
                    <th className="pf-table-col-header pf-text-center">IRR (%)</th>
                    <th className="pf-table-col-header pf-text-center">Cash Flow</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pf-table-cell-label">Base Case</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Revenue +10%</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Revenue -10%</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Price +10%</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Cost +10%</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">DCCO Delay (6 Months)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pf-info-banner pf-mt-3">
              <span className="pf-info-banner__icon">ⓘ</span>
              <span>Sensitivity analysis is auto-calculated based on the projected financials.</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
