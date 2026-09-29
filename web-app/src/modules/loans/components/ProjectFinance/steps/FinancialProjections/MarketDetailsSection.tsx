import React from 'react'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'

export interface MarketDetailsSectionProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  isOpen: boolean
  onToggle: () => void
  onOpenPicker: (field: 'targetMarket' | 'marketType' | 'customerSegment') => void
  errors?: Record<string, string>
}

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

const BarChartSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

export const MarketDetailsSection: React.FC<MarketDetailsSectionProps> = ({
  data,
  onChange,
  isOpen,
  onToggle,
  onOpenPicker,
  errors = {},
}) => {
  const handleTextInput = (field: keyof ProjectFinanceData, rawValue: string) => {
    try {
      onChange({ [field]: rawValue })
    } catch (err) {
      console.error(`Error updating field ${String(field)}:`, err)
    }
  }

  const handleNumericInput = (field: keyof ProjectFinanceData, rawValue: string) => {
    try {
      const sanitized = rawValue.replace(/\D/g, '')
      onChange({ [field]: sanitized })
    } catch (err) {
      console.error(`Error updating field ${String(field)}:`, err)
    }
  }

  return (
    <div className="pf-collapsible-card">
      <div className="pf-collapsible-header" onClick={onToggle}>
        <div className="pf-collapsible-header__left">
          <div className="pf-section-icon-tile">
            <BarChartSvg />
          </div>
          <h2 className="pf-collapsible-title">2. Market Details</h2>
        </div>
        <ChevronSvg isOpen={isOpen} />
      </div>

      {isOpen && (
        <div className="pf-collapsible-body">
          <p className="pf-section-intro-desc">
            Tell us about your target market and competition.
          </p>

          <div className="pf-field-group">
            <label htmlFor="targetMarket" className="pf-field-label">
              Target Market <span className="pf-required-star">*</span>
            </label>
            <button
              id="targetMarket"
              type="button"
              className={`pf-custom-select-btn ${errors.targetMarket ? 'pf-custom-select-btn--error' : ''}`}
              onClick={() => onOpenPicker('targetMarket')}
            >
              <span className={data.targetMarket ? 'pf-select-value' : 'pf-select-placeholder'}>
                {data.targetMarket || 'Select option'}
              </span>
              <span className="pf-select-chevron">
                <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
              </span>
            </button>
            {errors.targetMarket && (
              <span className="pf-field-error-msg">{errors.targetMarket}</span>
            )}
          </div>

          <div className="pf-field-group">
            <label htmlFor="marketType" className="pf-field-label">
              Market Type <span className="pf-required-star">*</span>
            </label>
            <button
              id="marketType"
              type="button"
              className={`pf-custom-select-btn ${errors.marketType ? 'pf-custom-select-btn--error' : ''}`}
              onClick={() => onOpenPicker('marketType')}
            >
              <span className={data.marketType ? 'pf-select-value' : 'pf-select-placeholder'}>
                {data.marketType || 'Select type'}
              </span>
              <span className="pf-select-chevron">
                <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
              </span>
            </button>
            {errors.marketType && (
              <span className="pf-field-error-msg">{errors.marketType}</span>
            )}
          </div>

          <div className="pf-field-group">
            <label htmlFor="targetGeography" className="pf-field-label">
              Target Geography <span className="pf-required-star">*</span>
            </label>
            <input
              id="targetGeography"
              type="text"
              className={`pf-custom-input ${errors.targetGeography ? 'pf-custom-input--error' : ''}`}
              placeholder="Enter target geography"
              value={data.targetGeography || ''}
              onChange={(e) => handleTextInput('targetGeography', e.target.value)}
            />
            {errors.targetGeography && (
              <span className="pf-field-error-msg">{errors.targetGeography}</span>
            )}
          </div>

          <div className="pf-field-group">
            <label htmlFor="customerSegment" className="pf-field-label">
              Customer Segment <span className="pf-required-star">*</span>
            </label>
            <button
              id="customerSegment"
              type="button"
              className={`pf-custom-select-btn ${errors.customerSegment ? 'pf-custom-select-btn--error' : ''}`}
              onClick={() => onOpenPicker('customerSegment')}
            >
              <span className={data.customerSegment ? 'pf-select-value' : 'pf-select-placeholder'}>
                {data.customerSegment || 'Select segment'}
              </span>
              <span className="pf-select-chevron">
                <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
              </span>
            </button>
            {errors.customerSegment && (
              <span className="pf-field-error-msg">{errors.customerSegment}</span>
            )}
          </div>

          <div className="pf-field-group">
            <label htmlFor="expectedMarketSharePercent" className="pf-field-label">
              Expected Market Share (%)
            </label>
            <input
              id="expectedMarketSharePercent"
              type="text"
              className="pf-custom-input"
              placeholder="Enter percentage"
              value={data.expectedMarketSharePercent || ''}
              onChange={(e) => handleNumericInput('expectedMarketSharePercent', e.target.value)}
            />
          </div>

          <div className="pf-field-group">
            <label htmlFor="majorCompetitors" className="pf-field-label">
              Major Competitors
            </label>
            <input
              id="majorCompetitors"
              type="text"
              className="pf-custom-input"
              placeholder="Enter competitors"
              value={data.majorCompetitors || ''}
              onChange={(e) => handleTextInput('majorCompetitors', e.target.value)}
            />
          </div>

          <div className="pf-field-group">
            <label htmlFor="competitiveAdvantage" className="pf-field-label">
              Competitive Advantage
            </label>
            <input
              id="competitiveAdvantage"
              type="text"
              className="pf-custom-input"
              placeholder="Enter competitive advantage"
              value={data.competitiveAdvantage || ''}
              onChange={(e) => handleTextInput('competitiveAdvantage', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
