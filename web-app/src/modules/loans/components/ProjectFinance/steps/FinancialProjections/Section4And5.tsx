import React from 'react'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'

export interface Section4And5Props {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  isProjectionSetupOpen: boolean
  onToggleProjectionSetup: () => void
  isHistoricalFinancialsOpen: boolean
  onToggleHistoricalFinancials: () => void
  onOpenPicker: (field: 'projectionPeriodYears' | 'historicalYears' | 'projectedYears' | 'stabilisationYear') => void
  errors?: Record<string, string>
}

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

const SettingsSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const DocSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

export const Section4And5: React.FC<Section4And5Props> = ({
  data,
  onChange,
  isProjectionSetupOpen,
  onToggleProjectionSetup,
  isHistoricalFinancialsOpen,
  onToggleHistoricalFinancials,
  onOpenPicker,
  errors = {},
}) => {
  const handleNumericInput = (field: keyof ProjectFinanceData, rawValue: string) => {
    try {
      const sanitized = rawValue.replace(/[^\d.]/g, '')
      onChange({ [field]: sanitized })
    } catch (err) {
      console.error(`Error updating field ${String(field)}:`, err)
    }
  }

  return (
    <>
      {/* 4. Projection Setup */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleProjectionSetup}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <SettingsSvg />
            </div>
            <h2 className="pf-collapsible-title">4. Projection Setup</h2>
          </div>
          <ChevronSvg isOpen={isProjectionSetupOpen} />
        </div>

        {isProjectionSetupOpen && (
          <div className="pf-collapsible-body">
            <p className="pf-section-intro-desc">
              Set the period and key assumptions for financial projections.
            </p>

            <div className="pf-grid-2col">
              <div className="pf-field-group">
                <label className="pf-field-label">
                  Projection Period (Years) <span className="pf-required-star">*</span>
                </label>
                <button
                  type="button"
                  className="pf-custom-select-btn"
                  onClick={() => onOpenPicker('projectionPeriodYears')}
                >
                  <span className={data.projectionPeriodYears ? 'pf-select-value' : 'pf-select-placeholder'}>
                    {data.projectionPeriodYears ? `${data.projectionPeriodYears} Years` : 'Select years'}
                  </span>
                  <span className="pf-select-chevron">
                    <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                  </span>
                </button>
              </div>

              <div className="pf-field-group">
                <label className="pf-field-label">
                  Historical Years <span className="pf-required-star">*</span>
                </label>
                <button
                  type="button"
                  className="pf-custom-select-btn"
                  onClick={() => onOpenPicker('historicalYears')}
                >
                  <span className={data.historicalYears ? 'pf-select-value' : 'pf-select-placeholder'}>
                    {data.historicalYears ? `${data.historicalYears} Years` : 'Select years'}
                  </span>
                  <span className="pf-select-chevron">
                    <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                  </span>
                </button>
              </div>
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">
                Projected Years <span className="pf-required-star">*</span>
              </label>
              <button
                type="button"
                className="pf-custom-select-btn"
                onClick={() => onOpenPicker('projectedYears')}
              >
                <span className={data.projectedYears ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.projectedYears ? `${data.projectedYears} Years` : 'Select years'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
            </div>

            <div className="pf-field-group">
              <label htmlFor="commercialOperationDate" className="pf-field-label">
                Commercial Operation Date <span className="pf-required-star">*</span>
              </label>
              <div className="pf-input-with-icon">
                <input
                  id="commercialOperationDate"
                  type="date"
                  className={`pf-custom-input ${errors.commercialOperationDate ? 'pf-custom-input--error' : ''}`}
                  placeholder="DD MMM YYYY"
                  value={data.commercialOperationDate || ''}
                  onChange={(e) => onChange({ commercialOperationDate: e.target.value })}
                />
              </div>
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">Stabilisation Year</label>
              <button
                type="button"
                className="pf-custom-select-btn"
                onClick={() => onOpenPicker('stabilisationYear')}
              >
                <span className={data.stabilisationYear ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.stabilisationYear || 'Select year'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5. Historical Financials */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleHistoricalFinancials}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <DocSvg />
            </div>
            <h2 className="pf-collapsible-title">5. Historical Financials</h2>
          </div>
          <ChevronSvg isOpen={isHistoricalFinancialsOpen} />
        </div>

        {isHistoricalFinancialsOpen && (
          <div className="pf-collapsible-body">
            <p className="pf-section-intro-desc">
              Provide last 3 years financials (Applicable for existing / expansion projects).
            </p>

            <div className="pf-info-banner">
              <span className="pf-info-banner__icon">ⓘ</span>
              <span>For Greenfield projects, this section is Not Applicable.</span>
            </div>

            <div className="pf-table-scroll-container">
              <table className="pf-financial-table">
                <thead>
                  <tr>
                    <th className="pf-table-col-header">Particulars</th>
                    <th className="pf-table-col-header pf-text-center">FY-3</th>
                    <th className="pf-table-col-header pf-text-center">FY-2</th>
                    <th className="pf-table-col-header pf-text-center">FY-1</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pf-table-cell-label">Revenue (₹)</td>
                    <td>
                      <input
                        type="text"
                        className="pf-table-cell-input"
                        placeholder="Enter"
                        value={data.historicalRevenueFy3 || ''}
                        onChange={(e) => handleNumericInput('historicalRevenueFy3', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="pf-table-cell-input"
                        placeholder="Enter"
                        value={data.historicalRevenueFy2 || ''}
                        onChange={(e) => handleNumericInput('historicalRevenueFy2', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="pf-table-cell-input"
                        placeholder="Enter"
                        value={data.historicalRevenueFy1 || ''}
                        onChange={(e) => handleNumericInput('historicalRevenueFy1', e.target.value)}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="pf-table-cell-label">EBITDA (₹)</td>
                    <td>
                      <input
                        type="text"
                        className="pf-table-cell-input"
                        placeholder="Enter"
                        value={data.historicalEbitdaFy3 || ''}
                        onChange={(e) => handleNumericInput('historicalEbitdaFy3', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="pf-table-cell-input"
                        placeholder="Enter"
                        value={data.historicalEbitdaFy2 || ''}
                        onChange={(e) => handleNumericInput('historicalEbitdaFy2', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="pf-table-cell-input"
                        placeholder="Enter"
                        value={data.historicalEbitdaFy1 || ''}
                        onChange={(e) => handleNumericInput('historicalEbitdaFy1', e.target.value)}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="pf-table-cell-label">PAT (₹)</td>
                    <td>
                      <input
                        type="text"
                        className="pf-table-cell-input"
                        placeholder="Enter"
                        value={data.historicalPatFy3 || ''}
                        onChange={(e) => handleNumericInput('historicalPatFy3', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="pf-table-cell-input"
                        placeholder="Enter"
                        value={data.historicalPatFy2 || ''}
                        onChange={(e) => handleNumericInput('historicalPatFy2', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="pf-table-cell-input"
                        placeholder="Enter"
                        value={data.historicalPatFy1 || ''}
                        onChange={(e) => handleNumericInput('historicalPatFy1', e.target.value)}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="pf-table-cell-label">Existing Debt (₹)</td>
                    <td>
                      <input
                        type="text"
                        className="pf-table-cell-input"
                        placeholder="Enter"
                        value={data.historicalDebtFy3 || ''}
                        onChange={(e) => handleNumericInput('historicalDebtFy3', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="pf-table-cell-input"
                        placeholder="Enter"
                        value={data.historicalDebtFy2 || ''}
                        onChange={(e) => handleNumericInput('historicalDebtFy2', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="pf-table-cell-input"
                        placeholder="Enter"
                        value={data.historicalDebtFy1 || ''}
                        onChange={(e) => handleNumericInput('historicalDebtFy1', e.target.value)}
                      />
                    </td>
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
