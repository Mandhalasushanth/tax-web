import React from 'react'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'

export interface ApplicantDetailsSectionProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  isOpen: boolean
  onToggle: () => void
  onOpenPicker: (picker: 'entityType' | 'bankingRelationship' | 'primaryBusinessActivity') => void
  errors?: Record<string, string>
}

export const ApplicantDetailsSection: React.FC<ApplicantDetailsSectionProps> = ({
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
            <img src="/assets/icons/loans/users-green.svg" alt="" width="20" height="20" />
          </div>
          <h3 className="pf-collapsible-title">Applicant / Borrower Details</h3>
        </div>
        <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
          <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
        </span>
      </div>

      {isOpen && (
        <div className="pf-collapsible-body">
          {/* Applicant Name */}
          <div className="pf-field-group">
            <label htmlFor="applicantName" className="pf-field-label">
              Applicant / Borrower Name <span className="pf-req">*</span>
            </label>
            <input
              id="applicantName"
              type="text"
              className={`pf-custom-input ${errors.applicantName ? 'pf-custom-input--error' : ''}`}
              placeholder="Enter applicant name"
              value={data.applicantName || ''}
              onChange={(e) => onChange({ applicantName: e.target.value })}
            />
            {errors.applicantName && <span className="pf-field-error">{errors.applicantName}</span>}
          </div>

          {/* Constitution / Entity Type */}
          <div className="pf-field-group">
            <label className="pf-field-label">
              Constitution / Entity Type <span className="pf-req">*</span>
            </label>
            <button
              type="button"
              className={`pf-custom-select-btn ${errors.entityType ? 'pf-custom-select-btn--error' : ''}`}
              onClick={() => onOpenPicker('entityType')}
            >
              <span className={data.entityType ? 'pf-select-value' : 'pf-select-placeholder'}>
                {data.entityType || 'Select entity type'}
              </span>
              <span className="pf-select-chevron">
                <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
              </span>
            </button>
            {errors.entityType && <span className="pf-field-error">{errors.entityType}</span>}
          </div>

          {/* PAN */}
          <div className="pf-field-group">
            <label htmlFor="pan" className="pf-field-label">
              PAN <span className="pf-req">*</span>
            </label>
            <input
              id="pan"
              type="text"
              maxLength={10}
              className={`pf-custom-input ${errors.pan ? 'pf-custom-input--error' : ''}`}
              placeholder="Enter PAN"
              value={data.pan || ''}
              onChange={(e) => onChange({ pan: e.target.value.toUpperCase() })}
            />
            {errors.pan && <span className="pf-field-error">{errors.pan}</span>}
          </div>

          {/* CIN / LLPIN */}
          <div className="pf-field-group">
            <label htmlFor="cinLlpin" className="pf-field-label">
              CIN / LLPIN
            </label>
            <input
              id="cinLlpin"
              type="text"
              className="pf-custom-input"
              placeholder="Enter CIN / LLPIN"
              value={data.cinLlpin || ''}
              onChange={(e) => onChange({ cinLlpin: e.target.value.toUpperCase() })}
            />
          </div>

          {/* Date of Incorporation */}
          <div className="pf-field-group">
            <label htmlFor="dateOfIncorporation" className="pf-field-label">
              Date of Incorporation <span className="pf-req">*</span>
            </label>
            <input
              id="dateOfIncorporation"
              type="date"
              className={`pf-custom-input ${errors.dateOfIncorporation ? 'pf-custom-input--error' : ''}`}
              value={data.dateOfIncorporation || ''}
              onChange={(e) => onChange({ dateOfIncorporation: e.target.value })}
            />
            {errors.dateOfIncorporation && (
              <span className="pf-field-error">{errors.dateOfIncorporation}</span>
            )}
          </div>

          {/* Existing Customer? */}
          <div className="pf-field-group">
            <label className="pf-field-label">
              Existing Customer? <span className="pf-req">*</span>
            </label>
            <div className="pf-radio-group">
              <label className="pf-radio-label">
                <input
                  type="radio"
                  name="isExistingCustomer"
                  className="pf-radio-input"
                  checked={data.isExistingCustomer === true || data.isExistingBankCustomer === true}
                  onChange={() => onChange({ isExistingCustomer: true, isExistingBankCustomer: true })}
                />
                <div className="pf-radio-custom">
                  <div className="pf-radio-custom-dot" />
                </div>
                <span>Yes</span>
              </label>
              <label className="pf-radio-label">
                <input
                  type="radio"
                  name="isExistingCustomer"
                  className="pf-radio-input"
                  checked={data.isExistingCustomer === false && data.isExistingBankCustomer === false}
                  onChange={() => onChange({ isExistingCustomer: false, isExistingBankCustomer: false })}
                />
                <div className="pf-radio-custom">
                  <div className="pf-radio-custom-dot" />
                </div>
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Banking Relationship */}
          <div className="pf-field-group">
            <label className="pf-field-label">Banking Relationship</label>
            <button
              type="button"
              className="pf-custom-select-btn"
              onClick={() => onOpenPicker('bankingRelationship')}
            >
              <span className={data.bankingRelationship ? 'pf-select-value' : 'pf-select-placeholder'}>
                {data.bankingRelationship || 'Select relationship'}
              </span>
              <span className="pf-select-chevron">
                <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
              </span>
            </button>
          </div>

          {/* Primary Business Activity */}
          <div className="pf-field-group">
            <label className="pf-field-label">
              Primary Business Activity <span className="pf-req">*</span>
            </label>
            <button
              type="button"
              className={`pf-custom-select-btn ${errors.primaryBusinessActivity ? 'pf-custom-select-btn--error' : ''}`}
              onClick={() => onOpenPicker('primaryBusinessActivity')}
            >
              <span className={data.primaryBusinessActivity ? 'pf-select-value' : 'pf-select-placeholder'}>
                {data.primaryBusinessActivity || 'Select primary business activity'}
              </span>
              <span className="pf-select-chevron">
                <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
              </span>
            </button>
            {errors.primaryBusinessActivity && (
              <span className="pf-field-error">{errors.primaryBusinessActivity}</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
