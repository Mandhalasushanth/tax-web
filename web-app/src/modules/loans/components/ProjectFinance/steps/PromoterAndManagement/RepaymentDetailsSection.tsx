import React from 'react'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'

export interface RepaymentDetailsSectionProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  isRepaymentOpen: boolean
  onToggleRepayment: () => void
  isScheduleOpen: boolean
  onToggleSchedule: () => void
  isSourcesOpen: boolean
  onToggleSources: () => void
  onOpenPicker: (
    picker:
      | 'repaymentPeriodYears'
      | 'moratoriumPeriodMonths'
      | 'repaymentFrequency'
      | 'primaryRepaymentSource'
      | 'secondaryRepaymentSource'
  ) => void
  errors?: Record<string, string>
}

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

const CalendarSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const BarChartSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

const TrendingUpSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

export const RepaymentDetailsSection: React.FC<RepaymentDetailsSectionProps> = ({
  data,
  onChange,
  isRepaymentOpen,
  onToggleRepayment,
  isScheduleOpen,
  onToggleSchedule,
  isSourcesOpen,
  onToggleSources,
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
      {/* 2. Repayment Details */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleRepayment}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <CalendarSvg />
            </div>
            <h2 className="pf-collapsible-title">2. Repayment Details</h2>
          </div>
          <ChevronSvg isOpen={isRepaymentOpen} />
        </div>

        {isRepaymentOpen && (
          <div className="pf-collapsible-body">
            {/* Repayment Period */}
            <div className="pf-field-group">
              <label className="pf-field-label">
                Repayment Period (Years) <span className="pf-required-star">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.repaymentPeriodYears ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => onOpenPicker('repaymentPeriodYears')}
              >
                <span className={data.repaymentPeriodYears ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.repaymentPeriodYears || 'Select years'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.repaymentPeriodYears && (
                <span className="pf-field-error-msg">{errors.repaymentPeriodYears}</span>
              )}
            </div>

            {/* Moratorium Period */}
            <div className="pf-field-group">
              <label className="pf-field-label">Moratorium Period (Months)</label>
              <button
                type="button"
                className="pf-custom-select-btn"
                onClick={() => onOpenPicker('moratoriumPeriodMonths')}
              >
                <span className={data.moratoriumPeriodMonths ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.moratoriumPeriodMonths || 'Select months'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
            </div>

            {/* Repayment Frequency */}
            <div className="pf-field-group">
              <label className="pf-field-label">
                Repayment Frequency <span className="pf-required-star">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.repaymentFrequency ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => onOpenPicker('repaymentFrequency')}
              >
                <span className={data.repaymentFrequency ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.repaymentFrequency || 'Select frequency'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.repaymentFrequency && (
                <span className="pf-field-error-msg">{errors.repaymentFrequency}</span>
              )}
            </div>

            {/* Expected Interest Rate */}
            <div className="pf-field-group">
              <label htmlFor="expectedInterestRatePercent" className="pf-field-label">
                Expected Interest Rate (%) <span className="pf-required-star">*</span>
              </label>
              <div className="pf-input-with-suffix">
                <input
                  id="expectedInterestRatePercent"
                  type="text"
                  className={`pf-custom-input ${errors.expectedInterestRatePercent ? 'pf-custom-input--error' : ''}`}
                  placeholder="Enter interest rate"
                  value={data.expectedInterestRatePercent || ''}
                  onChange={(e) => handleNumericInput('expectedInterestRatePercent', e.target.value)}
                />
                <span className="pf-input-suffix">%</span>
              </div>
              {errors.expectedInterestRatePercent && (
                <span className="pf-field-error-msg">{errors.expectedInterestRatePercent}</span>
              )}
            </div>

            {/* Repayment Start Date */}
            <div className="pf-field-group">
              <label htmlFor="repaymentStartDate" className="pf-field-label">
                Repayment Start Date <span className="pf-required-star">*</span>
              </label>
              <input
                id="repaymentStartDate"
                type="date"
                className={`pf-custom-input ${errors.repaymentStartDate ? 'pf-custom-input--error' : ''}`}
                placeholder="DD MMM YYYY"
                value={data.repaymentStartDate || ''}
                onChange={(e) => onChange({ repaymentStartDate: e.target.value })}
              />
              {errors.repaymentStartDate && (
                <span className="pf-field-error-msg">{errors.repaymentStartDate}</span>
              )}
            </div>

            {/* Preferred EMI / Instalment */}
            <div className="pf-field-group">
              <label htmlFor="preferredEmiInstalment" className="pf-field-label">
                Preferred EMI / Instalment (₹) (Optional)
              </label>
              <input
                id="preferredEmiInstalment"
                type="text"
                className="pf-custom-input"
                placeholder="Enter amount"
                value={data.preferredEmiInstalment || ''}
                onChange={(e) => handleNumericInput('preferredEmiInstalment', e.target.value)}
              />
              <span className="pf-helper-text">
                Optional. If left blank, the auto-calculated EMI will be applied.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Repayment Schedule (Indicative) */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleSchedule}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <BarChartSvg />
            </div>
            <h2 className="pf-collapsible-title">3. Repayment Schedule (Indicative)</h2>
          </div>
          <ChevronSvg isOpen={isScheduleOpen} />
        </div>

        {isScheduleOpen && (
          <div className="pf-collapsible-body">
            <p className="pf-section-intro-desc">
              Preview of estimated repayment schedule based on above details.
            </p>

            <div className="pf-table-scroll-container">
              <table className="pf-financial-table">
                <thead>
                  <tr>
                    <th className="pf-table-col-header">Year</th>
                    <th className="pf-table-col-header pf-text-center">Opening Debt (₹)</th>
                    <th className="pf-table-col-header pf-text-center">Principal (₹)</th>
                    <th className="pf-table-col-header pf-text-center">Interest (₹)</th>
                    <th className="pf-table-col-header pf-text-center">Closing Debt (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pf-table-cell-label">Year 1</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Year 2</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                    <td className="pf-text-center pf-text-muted">-</td>
                  </tr>
                  <tr>
                    <td className="pf-table-cell-label">Year 3</td>
                    <td className="pf-text-center pf-text-muted">-</td>
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

      {/* 4. Repayment Sources */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleSources}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <TrendingUpSvg />
            </div>
            <h2 className="pf-collapsible-title">4. Repayment Sources</h2>
          </div>
          <ChevronSvg isOpen={isSourcesOpen} />
        </div>

        {isSourcesOpen && (
          <div className="pf-collapsible-body">
            <p className="pf-section-intro-desc">
              Specify the expected sources of repayment.
            </p>

            {/* Primary Source of Repayment */}
            <div className="pf-field-group">
              <label className="pf-field-label">
                Primary Source of Repayment <span className="pf-required-star">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.primaryRepaymentSource ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => onOpenPicker('primaryRepaymentSource')}
              >
                <span className={data.primaryRepaymentSource ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.primaryRepaymentSource || 'Select source'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.primaryRepaymentSource && (
                <span className="pf-field-error-msg">{errors.primaryRepaymentSource}</span>
              )}
            </div>

            {/* Secondary Source (Optional) */}
            <div className="pf-field-group">
              <label className="pf-field-label">Secondary Source (Optional)</label>
              <button
                type="button"
                className="pf-custom-select-btn"
                onClick={() => onOpenPicker('secondaryRepaymentSource')}
              >
                <span className={data.secondaryRepaymentSource ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.secondaryRepaymentSource || 'Select source'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
            </div>

            {/* DSCR (Projected) */}
            <div className="pf-field-group">
              <label htmlFor="dscrProjected" className="pf-field-label">
                DSCR (Projected) <span className="pf-required-star">*</span>
              </label>
              <input
                id="dscrProjected"
                type="text"
                className={`pf-custom-input ${errors.dscrProjected ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter DSCR"
                value={data.dscrProjected || ''}
                onChange={(e) => handleNumericInput('dscrProjected', e.target.value)}
              />
              <span className="pf-helper-text">
                Auto-calculated based on projected financials. Editable.
              </span>
              {errors.dscrProjected && (
                <span className="pf-field-error-msg">{errors.dscrProjected}</span>
              )}
            </div>

            {/* Explain Repayment Sources */}
            <div className="pf-field-group">
              <label htmlFor="explainRepaymentSources" className="pf-field-label">
                Explain Repayment Sources <span className="pf-required-star">*</span>
              </label>
              <textarea
                id="explainRepaymentSources"
                rows={4}
                className={`pf-custom-textarea ${errors.explainRepaymentSources ? 'pf-custom-textarea--error' : ''}`}
                placeholder="Enter details about expected cash flows and repayment"
                value={data.explainRepaymentSources || ''}
                onChange={(e) => onChange({ explainRepaymentSources: e.target.value })}
              />
              {errors.explainRepaymentSources && (
                <span className="pf-field-error-msg">{errors.explainRepaymentSources}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
