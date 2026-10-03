import React from 'react'
import type { ProjectFinanceData } from '@modules/loans/types/projectFinance.types'

export interface LegalApprovalsSectionProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  isOpen: boolean
  onToggle: () => void
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

const APPROVALS_LIST = [
  { id: 'approvalEnvironmentalClearance', label: 'Environmental Clearance (EC)' },
  { id: 'approvalLandUseConversion', label: 'Land Use Conversion (if required)' },
  { id: 'approvalBuildingPlan', label: 'Building Plan Approval' },
  { id: 'approvalPowerConnection', label: 'Power Connection Approval' },
  { id: 'approvalFactoryLicense', label: 'Factory License (if applicable)' },
  { id: 'approvalWaterSupply', label: 'Water Supply Approval' },
  { id: 'approvalPollutionControlBoard', label: 'Pollution Control Board (PCB)' },
  { id: 'approvalOther', label: 'Other (Please specify)' },
] as const

export const LegalApprovalsSection: React.FC<LegalApprovalsSectionProps> = ({
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
            <FileTextSvg />
          </div>
          <h2 className="pf-collapsible-title">2. Legal & Statutory Approvals</h2>
        </div>
        <ChevronSvg isOpen={isOpen} />
      </div>

      {isOpen && (
        <div className="pf-collapsible-body">
          <p className="pf-section-intro-desc">
            Select the approvals and licenses applicable for your project.
          </p>

          <div className="pf-approvals-grid">
            {APPROVALS_LIST.map((approval) => {
              const checked = !!data[approval.id as keyof ProjectFinanceData]
              return (
                <label key={approval.id} className="pf-checkbox-label">
                  <input
                    type="checkbox"
                    className="pf-checkbox-input"
                    checked={checked}
                    onChange={(e) => onChange({ [approval.id]: e.target.checked })}
                  />
                  <span className="pf-checkbox-custom" />
                  <span className="pf-checkbox-text">{approval.label}</span>
                </label>
              )
            })}
          </div>

          {data.approvalOther && (
            <div className="pf-field-group">
              <label htmlFor="approvalOtherSpecify" className="pf-field-label">
                Specify Other Approvals <span className="pf-required-star">*</span>
              </label>
              <input
                id="approvalOtherSpecify"
                type="text"
                className={`pf-custom-input ${errors.approvalOtherSpecify ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter details of other statutory approvals"
                value={data.approvalOtherSpecify || ''}
                onChange={(e) => onChange({ approvalOtherSpecify: e.target.value })}
              />
              {errors.approvalOtherSpecify && (
                <span className="pf-field-error-msg">{errors.approvalOtherSpecify}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
