import React, { useState } from 'react'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'
import { LocationBottomSheet } from '../LocationLandTechnical/LocationBottomSheet'
import { RepaymentDetailsSection } from './RepaymentDetailsSection'
import {
  LOAN_TYPE_OPTIONS,
  SCHEME_PRODUCT_OPTIONS,
  PREFERRED_LENDER_OPTIONS,
  REPAYMENT_PERIOD_OPTIONS,
  MORATORIUM_PERIOD_OPTIONS,
  REPAYMENT_FREQUENCY_OPTIONS,
  PRIMARY_REPAYMENT_SOURCE_OPTIONS,
  SECONDARY_REPAYMENT_SOURCE_OPTIONS,
} from './loanRequirementConstants'
import './PromoterAndManagement.css'

export interface PromoterAndManagementProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  errors?: Record<string, string>
}

const LayersSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

export const PromoterAndManagement: React.FC<PromoterAndManagementProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const [isRequirementOpen, setIsRequirementOpen] = useState<boolean>(true)
  const [isRepaymentOpen, setIsRepaymentOpen] = useState<boolean>(true)
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(true)
  const [isSourcesOpen, setIsSourcesOpen] = useState<boolean>(true)
  const [activePicker, setActivePicker] = useState<
    | 'loanType'
    | 'schemeProduct'
    | 'preferredLender'
    | 'repaymentPeriodYears'
    | 'moratoriumPeriodMonths'
    | 'repaymentFrequency'
    | 'primaryRepaymentSource'
    | 'secondaryRepaymentSource'
    | null
  >(null)

  // Auto-filled values from Screen 3 (Total Project Cost & Promoters Equity)
  const totalCost = data.totalEstimatedProjectCost || data.loanRequirementTotalCost || ''
  const ownContribution = data.promotersEquityContribution || data.loanRequirementOwnContribution || ''

  const handleNumericInput = (field: keyof ProjectFinanceData, rawValue: string) => {
    try {
      const sanitized = rawValue.replace(/\D/g, '')
      onChange({ [field]: sanitized })
    } catch (err) {
      console.error(`Error updating field ${String(field)}:`, err)
    }
  }

  return (
    <div className="loan-requirement-step" data-testid="loan-requirement-step">
      {/* 1. Loan Requirement */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={() => setIsRequirementOpen((prev) => !prev)}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <LayersSvg />
            </div>
            <h2 className="pf-collapsible-title">1. Loan Requirement</h2>
          </div>
          <ChevronSvg isOpen={isRequirementOpen} />
        </div>

        {isRequirementOpen && (
          <div className="pf-collapsible-body">
            {/* Total Project Cost */}
            <div className="pf-field-group">
              <label className="pf-field-label">Total Project Cost (₹)</label>
              <input
                type="text"
                className="pf-custom-input pf-custom-input--readonly"
                readOnly
                placeholder="Auto-filled"
                value={totalCost}
              />
              <span className="pf-helper-text">Auto-filled from Screen 3 (Total Project Cost)</span>
            </div>

            {/* Own Contribution */}
            <div className="pf-field-group">
              <label className="pf-field-label">Own Contribution (₹)</label>
              <input
                type="text"
                className="pf-custom-input pf-custom-input--readonly"
                readOnly
                placeholder="Auto-filled"
                value={ownContribution}
              />
              <span className="pf-helper-text">Auto-filled from Screen 3 (Promoters Equity)</span>
            </div>

            {/* Loan Required */}
            <div className="pf-field-group">
              <label htmlFor="loanRequiredAmount" className="pf-field-label">
                Loan Required (₹) <span className="pf-required-star">*</span>
              </label>
              <input
                id="loanRequiredAmount"
                type="text"
                className={`pf-custom-input ${errors.loanRequiredAmount ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter amount"
                value={data.loanRequiredAmount || ''}
                onChange={(e) => handleNumericInput('loanRequiredAmount', e.target.value)}
              />
              {errors.loanRequiredAmount && (
                <span className="pf-field-error-msg">{errors.loanRequiredAmount}</span>
              )}
            </div>

            {/* Type of Loan */}
            <div className="pf-field-group">
              <label className="pf-field-label">
                Type of Loan <span className="pf-required-star">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.loanType ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => setActivePicker('loanType')}
              >
                <span className={data.loanType ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.loanType || 'Select loan type'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.loanType && (
                <span className="pf-field-error-msg">{errors.loanType}</span>
              )}
            </div>

            {/* Scheme / Product */}
            <div className="pf-field-group">
              <label className="pf-field-label">
                Scheme / Product <span className="pf-required-star">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.schemeProduct ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => setActivePicker('schemeProduct')}
              >
                <span className={data.schemeProduct ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.schemeProduct || 'Select scheme'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.schemeProduct && (
                <span className="pf-field-error-msg">{errors.schemeProduct}</span>
              )}
            </div>

            {/* Preferred Lender */}
            <div className="pf-field-group">
              <label className="pf-field-label">Preferred Lender (Optional)</label>
              <button
                type="button"
                className="pf-custom-select-btn"
                onClick={() => setActivePicker('preferredLender')}
              >
                <span className={data.preferredLender ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.preferredLender || 'Select lender'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
            </div>

            {/* Proposed Disbursement Date */}
            <div className="pf-field-group">
              <label htmlFor="proposedDisbursementDate" className="pf-field-label">
                Proposed Disbursement Date <span className="pf-required-star">*</span>
              </label>
              <input
                id="proposedDisbursementDate"
                type="date"
                className={`pf-custom-input ${errors.proposedDisbursementDate ? 'pf-custom-input--error' : ''}`}
                placeholder="DD MMM YYYY"
                value={data.proposedDisbursementDate || ''}
                onChange={(e) => onChange({ proposedDisbursementDate: e.target.value })}
              />
              {errors.proposedDisbursementDate && (
                <span className="pf-field-error-msg">{errors.proposedDisbursementDate}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Repayment Details, 3. Indicative Schedule & 4. Repayment Sources */}
      <RepaymentDetailsSection
        data={data}
        onChange={onChange}
        isRepaymentOpen={isRepaymentOpen}
        onToggleRepayment={() => setIsRepaymentOpen((prev) => !prev)}
        isScheduleOpen={isScheduleOpen}
        onToggleSchedule={() => setIsScheduleOpen((prev) => !prev)}
        isSourcesOpen={isSourcesOpen}
        onToggleSources={() => setIsSourcesOpen((prev) => !prev)}
        onOpenPicker={(picker) => setActivePicker(picker)}
        errors={errors}
      />

      {/* Bottom Sheet Pickers */}
      <LocationBottomSheet
        isOpen={activePicker === 'loanType'}
        title="Select Loan Type"
        options={LOAN_TYPE_OPTIONS}
        selectedValue={data.loanType || ''}
        onSelect={(val) => {
          onChange({ loanType: val })
          setActivePicker(null)
        }}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'schemeProduct'}
        title="Select Scheme / Product"
        options={SCHEME_PRODUCT_OPTIONS}
        selectedValue={data.schemeProduct || ''}
        onSelect={(val) => {
          onChange({ schemeProduct: val })
          setActivePicker(null)
        }}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'preferredLender'}
        title="Select Preferred Lender"
        options={PREFERRED_LENDER_OPTIONS}
        selectedValue={data.preferredLender || ''}
        onSelect={(val) => {
          onChange({ preferredLender: val })
          setActivePicker(null)
        }}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'repaymentPeriodYears'}
        title="Select Repayment Period"
        options={REPAYMENT_PERIOD_OPTIONS}
        selectedValue={data.repaymentPeriodYears || ''}
        onSelect={(val) => {
          onChange({ repaymentPeriodYears: val })
          setActivePicker(null)
        }}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'moratoriumPeriodMonths'}
        title="Select Moratorium Period"
        options={MORATORIUM_PERIOD_OPTIONS}
        selectedValue={data.moratoriumPeriodMonths || ''}
        onSelect={(val) => {
          onChange({ moratoriumPeriodMonths: val })
          setActivePicker(null)
        }}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'repaymentFrequency'}
        title="Select Frequency"
        options={REPAYMENT_FREQUENCY_OPTIONS}
        selectedValue={data.repaymentFrequency || ''}
        onSelect={(val) => {
          onChange({ repaymentFrequency: val })
          setActivePicker(null)
        }}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'primaryRepaymentSource'}
        title="Select Primary Source"
        options={PRIMARY_REPAYMENT_SOURCE_OPTIONS}
        selectedValue={data.primaryRepaymentSource || ''}
        onSelect={(val) => {
          onChange({ primaryRepaymentSource: val })
          setActivePicker(null)
        }}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'secondaryRepaymentSource'}
        title="Select Secondary Source"
        options={SECONDARY_REPAYMENT_SOURCE_OPTIONS}
        selectedValue={data.secondaryRepaymentSource || ''}
        onSelect={(val) => {
          onChange({ secondaryRepaymentSource: val })
          setActivePicker(null)
        }}
        onClose={() => setActivePicker(null)}
      />
    </div>
  )
}

export default PromoterAndManagement
