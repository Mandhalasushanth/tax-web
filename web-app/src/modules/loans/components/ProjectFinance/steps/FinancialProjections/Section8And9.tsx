import React from 'react'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'

export interface Section8And9Props {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  isWorkingCapitalOpen: boolean
  onToggleWorkingCapital: () => void
  isDebtServiceOpen: boolean
  onToggleDebtService: () => void
  errors?: Record<string, string>
}

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

const RefreshSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
)

const LandmarkSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </svg>
)

export const Section8And9: React.FC<Section8And9Props> = ({
  data,
  onChange,
  isWorkingCapitalOpen,
  onToggleWorkingCapital,
  isDebtServiceOpen,
  onToggleDebtService,
  errors = {},
}) => {
  const handleNumericInput = (field: keyof ProjectFinanceData, rawValue: string) => {
    try {
      const sanitized = rawValue.replace(/\D/g, '')
      const inv = field === 'inventoryDays' ? Number(sanitized || 0) : Number(data.inventoryDays || 0)
      const rec = field === 'receivableDays' ? Number(sanitized || 0) : Number(data.receivableDays || 0)
      const pay = field === 'payableDays' ? Number(sanitized || 0) : Number(data.payableDays || 0)
      const opCycle = Math.max(0, inv + rec - pay)

      onChange({
        [field]: sanitized,
        operatingCycleDays: opCycle > 0 ? String(opCycle) : '',
      })
    } catch (err) {
      console.error(`Error updating field ${String(field)}:`, err)
    }
  }

  return (
    <>
      {/* 8. Working Capital */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleWorkingCapital}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <RefreshSvg />
            </div>
            <h2 className="pf-collapsible-title">8. Working Capital</h2>
          </div>
          <ChevronSvg isOpen={isWorkingCapitalOpen} />
        </div>

        {isWorkingCapitalOpen && (
          <div className="pf-collapsible-body">
            <p className="pf-section-intro-desc">
              Enter working capital assumptions.
            </p>

            <div className="pf-grid-2col">
              <div className="pf-field-group">
                <label htmlFor="inventoryDays" className="pf-field-label">
                  Inventory Days <span className="pf-required-star">*</span>
                </label>
                <input
                  id="inventoryDays"
                  type="text"
                  className={`pf-custom-input ${errors.inventoryDays ? 'pf-custom-input--error' : ''}`}
                  placeholder="Enter days"
                  value={data.inventoryDays || ''}
                  onChange={(e) => handleNumericInput('inventoryDays', e.target.value)}
                />
              </div>

              <div className="pf-field-group">
                <label htmlFor="receivableDays" className="pf-field-label">
                  Receivable Days <span className="pf-required-star">*</span>
                </label>
                <input
                  id="receivableDays"
                  type="text"
                  className={`pf-custom-input ${errors.receivableDays ? 'pf-custom-input--error' : ''}`}
                  placeholder="Enter days"
                  value={data.receivableDays || ''}
                  onChange={(e) => handleNumericInput('receivableDays', e.target.value)}
                />
              </div>
            </div>

            <div className="pf-grid-2col">
              <div className="pf-field-group">
                <label htmlFor="payableDays" className="pf-field-label">
                  Payable Days <span className="pf-required-star">*</span>
                </label>
                <input
                  id="payableDays"
                  type="text"
                  className={`pf-custom-input ${errors.payableDays ? 'pf-custom-input--error' : ''}`}
                  placeholder="Enter days"
                  value={data.payableDays || ''}
                  onChange={(e) => handleNumericInput('payableDays', e.target.value)}
                />
              </div>

              <div className="pf-field-group">
                <label className="pf-field-label">Operating Cycle (Days)</label>
                <input
                  type="text"
                  className="pf-custom-input pf-custom-input--disabled"
                  placeholder="Auto calculated"
                  disabled
                  value={data.operatingCycleDays ? `${data.operatingCycleDays} Days` : ''}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 9. Debt Service & DSCR */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleDebtService}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <LandmarkSvg />
            </div>
            <h2 className="pf-collapsible-title">9. Debt Service & DSCR</h2>
          </div>
          <ChevronSvg isOpen={isDebtServiceOpen} />
        </div>

        {isDebtServiceOpen && (
          <div className="pf-collapsible-body">
            <p className="pf-section-intro-desc">
              Debt service coverage details (auto-calculated).
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
                    <td className="pf-table-cell-label">Opening Debt (₹)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Interest (₹)</td>
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
                    <td className="pf-table-cell-label">Closing Debt (₹)</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">DSCR</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Minimum DSCR</td>
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
