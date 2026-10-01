import React from 'react'
import type { ProjectFinanceData } from '@modules/loans/types/projectFinance.types'
import {
  TARGET_MARKET_OPTIONS,
  MARKET_TYPE_OPTIONS,
  CUSTOMER_SEGMENT_OPTIONS,
} from './financialProjectionsConstants'

export interface MarketDetailsSectionProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  isOpen: boolean
  onToggle: () => void
  onOpenPicker?: (field: 'targetMarket' | 'marketType' | 'customerSegment') => void
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
  errors = {},
}) => {
  const handleTextInput = (field: keyof ProjectFinanceData, rawValue: string) => {
    onChange({ [field]: rawValue })
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
            <select
              id="targetMarket"
              className={`pf-custom-select ${errors.targetMarket ? 'pf-custom-select--error' : ''}`}
              value={data.targetMarket || ''}
              onChange={(e) => onChange({ targetMarket: e.target.value })}
            >
              <option value="" disabled>Select option</option>
              {TARGET_MARKET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.targetMarket && (
              <span className="pf-field-error-msg">{errors.targetMarket}</span>
            )}
          </div>

          <div className="pf-field-group">
            <label htmlFor="marketType" className="pf-field-label">
              Market Type <span className="pf-required-star">*</span>
            </label>
            <select
              id="marketType"
              className={`pf-custom-select ${errors.marketType ? 'pf-custom-select--error' : ''}`}
              value={data.marketType || ''}
              onChange={(e) => onChange({ marketType: e.target.value })}
            >
              <option value="" disabled>Select type</option>
              {MARKET_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
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
            <select
              id="customerSegment"
              className={`pf-custom-select ${errors.customerSegment ? 'pf-custom-select--error' : ''}`}
              value={data.customerSegment || ''}
              onChange={(e) => onChange({ customerSegment: e.target.value })}
            >
              <option value="" disabled>Select segment</option>
              {CUSTOMER_SEGMENT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.customerSegment && (
              <span className="pf-field-error-msg">{errors.customerSegment}</span>
            )}
          </div>

          <div className="pf-field-group">
            <label htmlFor="majorCompetitors" className="pf-field-label">
              Major Competitors <span className="pf-required-star">*</span>
            </label>
            <input
              id="majorCompetitors"
              type="text"
              className={`pf-custom-input ${errors.majorCompetitors ? 'pf-custom-input--error' : ''}`}
              placeholder="Enter competitors"
              value={data.majorCompetitors || ''}
              onChange={(e) => handleTextInput('majorCompetitors', e.target.value)}
            />
            {errors.majorCompetitors && (
              <span className="pf-field-error-msg">{errors.majorCompetitors}</span>
            )}
          </div>

          <div className="pf-field-group">
            <label htmlFor="competitiveAdvantage" className="pf-field-label">
              Competitive Advantage <span className="pf-required-star">*</span>
            </label>
            <textarea
              id="competitiveAdvantage"
              rows={3}
              className={`pf-custom-textarea ${errors.competitiveAdvantage ? 'pf-custom-textarea--error' : ''}`}
              placeholder="Describe your competitive edge"
              value={data.competitiveAdvantage || ''}
              onChange={(e) => handleTextInput('competitiveAdvantage', e.target.value)}
            />
            {errors.competitiveAdvantage && (
              <span className="pf-field-error-msg">{errors.competitiveAdvantage}</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
