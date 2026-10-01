import React from 'react'
import type { ProjectFinanceData } from '@modules/loans/types/projectFinance.types'

export interface CapexBreakupSectionProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  isOpen: boolean
  onToggle: () => void
  errors?: Record<string, string>
}

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

const BanknoteSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
)

export const CapexBreakupSection: React.FC<CapexBreakupSectionProps> = ({
  data,
  onChange,
  isOpen,
  onToggle,
  errors = {},
}) => {
  const handleNumericInput = (field: keyof ProjectFinanceData, rawValue: string) => {
    const sanitized = rawValue.replace(/\D/g, '')
    onChange({ [field]: sanitized })
  }

  return (
    <div className="pf-collapsible-card">
      <div className="pf-collapsible-header" onClick={onToggle}>
        <div className="pf-collapsible-header__left">
          <div className="pf-section-icon-tile">
            <BanknoteSvg />
          </div>
          <h2 className="pf-collapsible-title">1. Total Project Cost (Capex Breakup)</h2>
        </div>
        <ChevronSvg isOpen={isOpen} />
      </div>

      {isOpen && (
        <div className="pf-collapsible-body">
          <div className="pf-field-group">
            <label htmlFor="landSiteDevCost" className="pf-field-label">
              Land & Site Development Cost (₹) <span className="pf-required-star">*</span>
            </label>
            <input
              id="landSiteDevCost"
              type="text"
              className={`pf-custom-input ${errors.landSiteDevCost ? 'pf-custom-input--error' : ''}`}
              placeholder="e.g. 15000000"
              value={data.landSiteDevCost || ''}
              onChange={(e) => handleNumericInput('landSiteDevCost', e.target.value)}
            />
            {errors.landSiteDevCost && (
              <span className="pf-field-error-msg">{errors.landSiteDevCost}</span>
            )}
          </div>

          <div className="pf-field-group">
            <label htmlFor="civilWorksCost" className="pf-field-label">
              Civil Works & Building Construction (₹) <span className="pf-required-star">*</span>
            </label>
            <input
              id="civilWorksCost"
              type="text"
              className={`pf-custom-input ${errors.civilWorksCost ? 'pf-custom-input--error' : ''}`}
              placeholder="e.g. 25000000"
              value={data.civilWorksCost || ''}
              onChange={(e) => handleNumericInput('civilWorksCost', e.target.value)}
            />
            {errors.civilWorksCost && (
              <span className="pf-field-error-msg">{errors.civilWorksCost}</span>
            )}
          </div>

          <div className="pf-field-group">
            <label htmlFor="plantMachineryCost" className="pf-field-label">
              Plant & Machinery / Equipment Cost (₹) <span className="pf-required-star">*</span>
            </label>
            <input
              id="plantMachineryCost"
              type="text"
              className={`pf-custom-input ${errors.plantMachineryCost ? 'pf-custom-input--error' : ''}`}
              placeholder="e.g. 40000000"
              value={data.plantMachineryCost || ''}
              onChange={(e) => handleNumericInput('plantMachineryCost', e.target.value)}
            />
            {errors.plantMachineryCost && (
              <span className="pf-field-error-msg">{errors.plantMachineryCost}</span>
            )}
          </div>

          <div className="pf-field-group">
            <label htmlFor="engineeringTechnicalCost" className="pf-field-label">
              Engineering & Technical Knowhow Cost (₹) <span className="pf-required-star">*</span>
            </label>
            <input
              id="engineeringTechnicalCost"
              type="text"
              className={`pf-custom-input ${errors.engineeringTechnicalCost ? 'pf-custom-input--error' : ''}`}
              placeholder="e.g. 5000000"
              value={data.engineeringTechnicalCost || ''}
              onChange={(e) => handleNumericInput('engineeringTechnicalCost', e.target.value)}
            />
            {errors.engineeringTechnicalCost && (
              <span className="pf-field-error-msg">{errors.engineeringTechnicalCost}</span>
            )}
          </div>

          <div className="pf-field-group">
            <label htmlFor="preliminaryPreOperativeCost" className="pf-field-label">
              Preliminary & Pre-operative Expenses (₹) <span className="pf-required-star">*</span>
            </label>
            <input
              id="preliminaryPreOperativeCost"
              type="text"
              className={`pf-custom-input ${errors.preliminaryPreOperativeCost ? 'pf-custom-input--error' : ''}`}
              placeholder="e.g. 3000000"
              value={data.preliminaryPreOperativeCost || ''}
              onChange={(e) => handleNumericInput('preliminaryPreOperativeCost', e.target.value)}
            />
            {errors.preliminaryPreOperativeCost && (
              <span className="pf-field-error-msg">{errors.preliminaryPreOperativeCost}</span>
            )}
          </div>

          <div className="pf-field-group">
            <label htmlFor="marginMoneyWorkingCapitalCost" className="pf-field-label">
              Margin Money for Working Capital (₹) <span className="pf-required-star">*</span>
            </label>
            <input
              id="marginMoneyWorkingCapitalCost"
              type="text"
              className={`pf-custom-input ${errors.marginMoneyWorkingCapitalCost ? 'pf-custom-input--error' : ''}`}
              placeholder="e.g. 2000000"
              value={data.marginMoneyWorkingCapitalCost || ''}
              onChange={(e) => handleNumericInput('marginMoneyWorkingCapitalCost', e.target.value)}
            />
            {errors.marginMoneyWorkingCapitalCost && (
              <span className="pf-field-error-msg">{errors.marginMoneyWorkingCapitalCost}</span>
            )}
          </div>

          <div className="pf-field-group">
            <label htmlFor="contingencyProvisionCost" className="pf-field-label">
              Contingency Provision (₹)
            </label>
            <input
              id="contingencyProvisionCost"
              type="text"
              className="pf-custom-input"
              placeholder="e.g. 2500000"
              value={data.contingencyProvisionCost || ''}
              onChange={(e) => handleNumericInput('contingencyProvisionCost', e.target.value)}
            />
          </div>

          <div className="pf-field-group">
            <label htmlFor="totalEstimatedProjectCost" className="pf-field-label">
              Total Estimated Project Cost (₹) <span className="pf-required-star">*</span>
            </label>
            <input
              id="totalEstimatedProjectCost"
              type="text"
              className={`pf-custom-input ${errors.totalEstimatedProjectCost ? 'pf-custom-input--error' : ''}`}
              placeholder="e.g. 92500000"
              value={data.totalEstimatedProjectCost || ''}
              onChange={(e) => handleNumericInput('totalEstimatedProjectCost', e.target.value)}
            />
            {errors.totalEstimatedProjectCost && (
              <span className="pf-field-error-msg">{errors.totalEstimatedProjectCost}</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
