import React from 'react'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'

export interface OtherComplianceSectionProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  isOpen: boolean
  onToggle: () => void
  errors?: Record<string, string>
}

const ReceiptSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="12" y2="14" />
  </svg>
)

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

const ToggleSwitch: React.FC<{
  id: string
  checked: boolean
  onChange: (val: boolean) => void
}> = ({ id, checked, onChange }) => (
  <label htmlFor={id} className="pf-toggle-switch-wrapper">
    <input
      id={id}
      type="checkbox"
      className="pf-toggle-switch-input"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className="pf-toggle-switch-track">
      <span className="pf-toggle-switch-thumb" />
    </span>
    <span className="pf-toggle-switch-label">{checked ? 'Yes' : 'No'}</span>
  </label>
)

export const OtherComplianceSection: React.FC<OtherComplianceSectionProps> = ({
  data,
  onChange,
  isOpen,
  onToggle,
  errors = {},
}) => {
  return (
    <div className="pf-collapsible-card">
      <div className="pf-collapsible-header" onClick={onToggle}>
        <div className="pf-collapsible-header__left">
          <div className="pf-section-icon-tile pf-section-icon-tile--orange">
            <ReceiptSvg />
          </div>
          <h2 className="pf-collapsible-title">5. Other Compliance</h2>
        </div>
        <ChevronSvg isOpen={isOpen} />
      </div>

      {isOpen && (
        <div className="pf-collapsible-body">
          <p className="pf-section-intro-desc">
            Confirm compliance with other applicable regulations.
          </p>

          <div className="pf-compliance-toggles-list">
            {/* Labour Law Compliance */}
            <div className="pf-compliance-toggle-row">
              <span className="pf-compliance-toggle-title">Labour Law Compliance</span>
              <ToggleSwitch
                id="labourLawCompliance"
                checked={data.labourLawCompliance ?? true}
                onChange={(val) => onChange({ labourLawCompliance: val })}
              />
            </div>

            {/* Local Authority Approvals */}
            <div className="pf-compliance-toggle-row">
              <span className="pf-compliance-toggle-title">Local Authority Approvals</span>
              <ToggleSwitch
                id="localAuthorityApprovals"
                checked={data.localAuthorityApprovals ?? true}
                onChange={(val) => onChange({ localAuthorityApprovals: val })}
              />
            </div>

            {/* Health & Safety Compliance */}
            <div className="pf-compliance-toggle-row">
              <span className="pf-compliance-toggle-title">Health & Safety Compliance</span>
              <ToggleSwitch
                id="healthSafetyCompliance"
                checked={data.healthSafetyCompliance ?? true}
                onChange={(val) => onChange({ healthSafetyCompliance: val })}
              />
            </div>

            {/* Industry Specific Compliance */}
            <div className="pf-compliance-toggle-row">
              <span className="pf-compliance-toggle-title">Industry Specific Compliance</span>
              <ToggleSwitch
                id="industrySpecificCompliance"
                checked={data.industrySpecificCompliance ?? true}
                onChange={(val) => onChange({ industrySpecificCompliance: val })}
              />
            </div>

            {/* Any Pending Litigation? */}
            <div className="pf-compliance-toggle-row">
              <span className="pf-compliance-toggle-title">
                Any Pending Litigation? <span className="pf-required-star">*</span>
              </span>
              <ToggleSwitch
                id="anyPendingLitigation"
                checked={data.anyPendingLitigation ?? false}
                onChange={(val) => onChange({ anyPendingLitigation: val })}
              />
            </div>
          </div>

          {/* If Yes, Details */}
          {data.anyPendingLitigation && (
            <div className="pf-field-group">
              <label htmlFor="pendingLitigationDetails" className="pf-field-label">
                If Yes, Details <span className="pf-required-star">*</span>
              </label>
              <textarea
                id="pendingLitigationDetails"
                rows={3}
                className={`pf-custom-textarea ${errors.pendingLitigationDetails ? 'pf-custom-textarea--error' : ''}`}
                placeholder="Enter details"
                value={data.pendingLitigationDetails || ''}
                onChange={(e) => onChange({ pendingLitigationDetails: e.target.value })}
              />
              {errors.pendingLitigationDetails && (
                <span className="pf-field-error-msg">{errors.pendingLitigationDetails}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
