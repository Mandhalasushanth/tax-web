import React from 'react'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'

export interface RegulatoryComplianceSectionProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  isOpen: boolean
  onToggle: () => void
  onOpenPicker: () => void
  errors?: Record<string, string>
}

const FileTextSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

export const RegulatoryComplianceSection: React.FC<RegulatoryComplianceSectionProps> = ({
  data,
  onChange,
  isOpen,
  onToggle,
  onOpenPicker,
  errors = {},
}) => {
  return (
    <div className="pf-collapsible-card">
      <div className="pf-collapsible-header" onClick={onToggle}>
        <div className="pf-collapsible-header__left">
          <div className="pf-section-icon-tile pf-section-icon-tile--orange">
            <FileTextSvg />
          </div>
          <h2 className="pf-collapsible-title">3. Regulatory Compliance</h2>
        </div>
        <ChevronSvg isOpen={isOpen} />
      </div>

      {isOpen && (
        <div className="pf-collapsible-body">
          <p className="pf-section-intro-desc">
            Provide details of applicable registrations and compliances.
          </p>

          {/* Business Registration Type */}
          <div className="pf-field-group">
            <label className="pf-field-label">
              Business Registration Type <span className="pf-required-star">*</span>
            </label>
            <button
              type="button"
              className={`pf-custom-select-btn ${errors.businessRegistrationType ? 'pf-custom-select-btn--error' : ''}`}
              onClick={onOpenPicker}
            >
              <span className={data.businessRegistrationType ? 'pf-select-value' : 'pf-select-placeholder'}>
                {data.businessRegistrationType || 'Select registration type'}
              </span>
              <span className="pf-select-chevron">
                <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
              </span>
            </button>
            {errors.businessRegistrationType && (
              <span className="pf-field-error-msg">{errors.businessRegistrationType}</span>
            )}
          </div>

          {/* Registration Number */}
          <div className="pf-field-group">
            <label htmlFor="complianceRegistrationNumber" className="pf-field-label">
              Registration Number <span className="pf-required-star">*</span>
            </label>
            <input
              id="complianceRegistrationNumber"
              type="text"
              className={`pf-custom-input ${errors.complianceRegistrationNumber ? 'pf-custom-input--error' : ''}`}
              placeholder="Enter registration number"
              value={data.complianceRegistrationNumber || ''}
              onChange={(e) => onChange({ complianceRegistrationNumber: e.target.value })}
            />
            {errors.complianceRegistrationNumber && (
              <span className="pf-field-error-msg">{errors.complianceRegistrationNumber}</span>
            )}
          </div>

          {/* GST Applicable? */}
          <div className="pf-field-group">
            <label className="pf-field-label">
              GST Applicable? <span className="pf-required-star">*</span>
            </label>
            <div className="pf-radio-group">
              <label className="pf-radio-label">
                <input
                  type="radio"
                  name="gstApplicable"
                  className="pf-radio-input"
                  checked={data.gstApplicable === true}
                  onChange={() => onChange({ gstApplicable: true })}
                />
                <span className="pf-radio-custom">
                  <span className="pf-radio-custom-dot" />
                </span>
                <span>Yes</span>
              </label>
              <label className="pf-radio-label">
                <input
                  type="radio"
                  name="gstApplicable"
                  className="pf-radio-input"
                  checked={data.gstApplicable === false}
                  onChange={() => onChange({ gstApplicable: false })}
                />
                <span className="pf-radio-custom">
                  <span className="pf-radio-custom-dot" />
                </span>
                <span>No</span>
              </label>
            </div>
          </div>

          {/* GST Number */}
          {data.gstApplicable && (
            <div className="pf-field-group">
              <label htmlFor="complianceGstNumber" className="pf-field-label">
                GST Number <span className="pf-required-star">*</span>
              </label>
              <input
                id="complianceGstNumber"
                type="text"
                className={`pf-custom-input ${errors.complianceGstNumber ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter GST number"
                value={data.complianceGstNumber || ''}
                onChange={(e) => onChange({ complianceGstNumber: e.target.value.toUpperCase() })}
              />
              {errors.complianceGstNumber && (
                <span className="pf-field-error-msg">{errors.complianceGstNumber}</span>
              )}
            </div>
          )}

          {/* Income Tax PAN */}
          <div className="pf-field-group">
            <label htmlFor="complianceIncomeTaxPan" className="pf-field-label">
              Income Tax PAN <span className="pf-required-star">*</span>
            </label>
            <input
              id="complianceIncomeTaxPan"
              type="text"
              className={`pf-custom-input ${errors.complianceIncomeTaxPan ? 'pf-custom-input--error' : ''}`}
              placeholder="Enter PAN number"
              value={data.complianceIncomeTaxPan || ''}
              onChange={(e) => onChange({ complianceIncomeTaxPan: e.target.value.toUpperCase() })}
            />
            {errors.complianceIncomeTaxPan && (
              <span className="pf-field-error-msg">{errors.complianceIncomeTaxPan}</span>
            )}
          </div>

          {/* TAN (if applicable) */}
          <div className="pf-field-group">
            <label htmlFor="complianceTan" className="pf-field-label">
              TAN (if applicable)
            </label>
            <input
              id="complianceTan"
              type="text"
              className="pf-custom-input"
              placeholder="Enter TAN number"
              value={data.complianceTan || ''}
              onChange={(e) => onChange({ complianceTan: e.target.value.toUpperCase() })}
            />
          </div>
        </div>
      )}
    </div>
  )
}
