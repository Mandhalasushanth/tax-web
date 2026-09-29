import React from 'react'
import { LoanFormSection } from '@modules/loans/shared'
import type {
  ProjectFinanceData,
  ProjectSectorType,
  ProjectFinanceTenure,
  ProjectFinanceType,
} from '../../../../types/projectFinance.types'
import { loanInputHelpers } from '../../../../validation/projectFinanceValidation'
import './ProjectDetails.css'

export interface ProjectDetailsProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  errors?: Record<string, string>
}

const SECTOR_OPTIONS: ProjectSectorType[] = [
  'Infrastructure',
  'Renewable Energy',
  'Real Estate',
  'Manufacturing',
  'Healthcare',
  'Hospitality & Tourism',
  'Logistics & Warehousing',
  'Education',
  'Agro & Food Processing',
  'Other',
]

const FINANCE_TYPE_OPTIONS: ProjectFinanceType[] = [
  'Term Loan',
  'Structured Finance',
  'Syndicated Loan',
  'Mezzanine Finance',
  'Equity + Debt Mix',
]

const TENURE_OPTIONS: ProjectFinanceTenure[] = [
  '12 Months',
  '24 Months',
  '36 Months',
  '48 Months',
  '60 Months',
  '84 Months',
  '96 Months',
  '120 Months',
]

const COST_PRESETS = [
  { label: '₹25 Lakhs', value: 2500000 },
  { label: '₹1 Crore', value: 10000000 },
  { label: '₹5 Crores', value: 50000000 },
  { label: '₹10 Crores', value: 100000000 },
  { label: '₹50 Crores', value: 500000000 },
]

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ totalProjectCost: loanInputHelpers.formatCurrencyString(e.target.value) })
  }

  const handleDebtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ debtFundingRequired: loanInputHelpers.formatCurrencyString(e.target.value) })
  }

  const handleEquityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ equityContribution: loanInputHelpers.formatCurrencyString(e.target.value) })
  }

  return (
    <div className="pf-loan-step">
      {/* Section 1: Project Identity */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        }
        title="Project Identity & Sector"
        subtitle="Define the project name, sector classification, and location."
      >
        <div className="pf-loan-form-group">
          <label htmlFor="pf-project-name" className="pf-loan-label">
            Project Name <span className="pf-loan-label__req">*</span>
          </label>
          <input
            id="pf-project-name"
            type="text"
            className={`pf-loan-input ${errors.projectName ? 'pf-loan-input--error' : ''}`}
            placeholder="Enter the name of the project (e.g. Solar Power Plant Phase II)"
            value={data.projectName || ''}
            onChange={(e) => onChange({ projectName: e.target.value })}
          />
          {errors.projectName && (
            <span className="pf-loan-field-error" role="alert">{errors.projectName}</span>
          )}
        </div>

        <div className="pf-loan-form-group">
          <label htmlFor="pf-sector" className="pf-loan-label">
            Project Sector <span className="pf-loan-label__req">*</span>
          </label>
          <select
            id="pf-sector"
            className={`pf-loan-select ${errors.projectSector ? 'pf-loan-select--error' : ''}`}
            value={data.projectSector || ''}
            onChange={(e) => onChange({ projectSector: e.target.value as ProjectSectorType })}
          >
            <option value="" disabled>Select project sector</option>
            {SECTOR_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.projectSector && (
            <span className="pf-loan-field-error" role="alert">{errors.projectSector}</span>
          )}
        </div>

        <div className="pf-loan-form-group">
          <label htmlFor="pf-location" className="pf-loan-label">
            Project Location / State <span className="pf-loan-label__req">*</span>
          </label>
          <input
            id="pf-location"
            type="text"
            className={`pf-loan-input ${errors.projectLocation ? 'pf-loan-input--error' : ''}`}
            placeholder="Enter state, city, or district of project site"
            value={data.projectLocation || ''}
            onChange={(e) => onChange({ projectLocation: e.target.value })}
          />
          {errors.projectLocation && (
            <span className="pf-loan-field-error" role="alert">{errors.projectLocation}</span>
          )}
        </div>

        <div className="pf-loan-form-group">
          <label htmlFor="pf-description" className="pf-loan-label">Project Description (Optional)</label>
          <textarea
            id="pf-description"
            className="pf-loan-textarea"
            rows={3}
            placeholder="Brief overview of project scope, objectives, and key milestones..."
            value={data.projectDescription || ''}
            onChange={(e) => onChange({ projectDescription: e.target.value })}
          />
        </div>
      </LoanFormSection>

      {/* Section 2: Funding Structure */}
      <LoanFormSection
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="12" x="2" y="6" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>
        }
        title="Funding Structure"
        subtitle="Specify total project cost, debt requirement, equity, and repayment terms."
      >
        <div className="pf-loan-form-group">
          <label htmlFor="pf-total-cost" className="pf-loan-label">
            Total Project Cost (₹) <span className="pf-loan-label__req">*</span>
          </label>
          <input
            id="pf-total-cost"
            type="text"
            inputMode="numeric"
            className={`pf-loan-input ${errors.totalProjectCost ? 'pf-loan-input--error' : ''}`}
            placeholder="Enter total project cost in ₹"
            value={data.totalProjectCost ? loanInputHelpers.formatCurrencyString(String(data.totalProjectCost)) : ''}
            onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
            onChange={handleCostChange}
          />
          <div className="pf-loan-amount-presets">
            {COST_PRESETS.map((p) => {
              const currentNum = Number(String(data.totalProjectCost || '').replace(/\D/g, ''))
              const isSelected = currentNum === p.value
              return (
                <button
                  key={p.value}
                  type="button"
                  className={`pf-loan-amount-pill ${isSelected ? 'pf-loan-amount-pill--active' : ''}`}
                  onClick={() => onChange({ totalProjectCost: String(p.value) })}
                >
                  {p.label}
                </button>
              )
            })}
          </div>
          {errors.totalProjectCost && (
            <span className="pf-loan-field-error" role="alert">{errors.totalProjectCost}</span>
          )}
        </div>

        <div className="pf-loan-grid-2">
          <div className="pf-loan-form-group">
            <label htmlFor="pf-debt-funding" className="pf-loan-label">
              Debt Funding Required (₹) <span className="pf-loan-label__req">*</span>
            </label>
            <input
              id="pf-debt-funding"
              type="text"
              inputMode="numeric"
              className={`pf-loan-input ${errors.debtFundingRequired ? 'pf-loan-input--error' : ''}`}
              placeholder="e.g. 7,00,00,000"
              value={data.debtFundingRequired ? loanInputHelpers.formatCurrencyString(String(data.debtFundingRequired)) : ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={handleDebtChange}
            />
            {errors.debtFundingRequired && (
              <span className="pf-loan-field-error" role="alert">{errors.debtFundingRequired}</span>
            )}
          </div>

          <div className="pf-loan-form-group">
            <label htmlFor="pf-equity" className="pf-loan-label">Equity Contribution (₹)</label>
            <input
              id="pf-equity"
              type="text"
              inputMode="numeric"
              className="pf-loan-input"
              placeholder="e.g. 3,00,00,000"
              value={data.equityContribution ? loanInputHelpers.formatCurrencyString(String(data.equityContribution)) : ''}
              onKeyDown={loanInputHelpers.allowOnlyNumbersKeyDown}
              onChange={handleEquityChange}
            />
          </div>
        </div>

        <div className="pf-loan-grid-2">
          <div className="pf-loan-form-group">
            <label htmlFor="pf-finance-type" className="pf-loan-label">
              Preferred Finance Type <span className="pf-loan-label__req">*</span>
            </label>
            <select
              id="pf-finance-type"
              className={`pf-loan-select ${errors.preferredFinanceType ? 'pf-loan-select--error' : ''}`}
              value={data.preferredFinanceType || ''}
              onChange={(e) => onChange({ preferredFinanceType: e.target.value as ProjectFinanceType })}
            >
              <option value="" disabled>Select finance type</option>
              {FINANCE_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.preferredFinanceType && (
              <span className="pf-loan-field-error" role="alert">{errors.preferredFinanceType}</span>
            )}
          </div>

          <div className="pf-loan-form-group">
            <label htmlFor="pf-tenure" className="pf-loan-label">
              Repayment Tenure <span className="pf-loan-label__req">*</span>
            </label>
            <select
              id="pf-tenure"
              className={`pf-loan-select ${errors.repaymentTenure ? 'pf-loan-select--error' : ''}`}
              value={data.repaymentTenure || ''}
              onChange={(e) => onChange({ repaymentTenure: e.target.value as ProjectFinanceTenure })}
            >
              <option value="" disabled>Select tenure</option>
              {TENURE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.repaymentTenure && (
              <span className="pf-loan-field-error" role="alert">{errors.repaymentTenure}</span>
            )}
          </div>
        </div>
      </LoanFormSection>
    </div>
  )
}

export default ProjectDetails
