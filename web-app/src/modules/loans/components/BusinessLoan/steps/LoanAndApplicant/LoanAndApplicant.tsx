import React, { useCallback } from 'react'
import { ApplicantIdentityCard } from './ApplicantIdentityCard'
import { EmploymentProfileSelector } from './EmploymentProfileSelector'
import { LoanRequirementsSection } from './LoanRequirementsSection'
import { ExistingLoansSelector } from './ExistingLoansSelector'
import type {
  LoanAndApplicantProps,
  EmploymentProfileType,
  ExistingLoansType,
} from '@modules/loans/types/businessLoan.types'
import './LoanAndApplicant.css'

/**
 * Step 1: Loan & Applicant page component.
 * Assembles the applicant verification card and loan requirement form sections.
 * (Strictly loop-free per architectural requirements)
 */
export const LoanAndApplicant: React.FC<LoanAndApplicantProps> = ({
  data,
  applicant,
  onChange,
  errors = {},
}) => {
  const handleEmploymentChange = useCallback(
    (val: EmploymentProfileType) => {
      onChange({ employmentProfile: val })
    },
    [onChange]
  )

  const handleExistingLoansChange = useCallback(
    (val: ExistingLoansType) => {
      onChange({ existingLoans: val })
    },
    [onChange]
  )

  const handleRequirementsChange = useCallback(
    (fields: {
      requiredLoanAmount?: string
      preferredTenureMonths?: string
      purposeOfLoan?: string
      revenueOrTurnover?: string
    }) => {
      onChange(fields)
    },
    [onChange]
  )

  return (
    <div className="loan-and-applicant-step" data-testid="step-loan-and-applicant">
      {/* 1. Applicant Identity Details Card */}
      <ApplicantIdentityCard applicant={applicant} />

      {/* 2. Employment / Business Profile */}
      <EmploymentProfileSelector
        value={data.employmentProfile}
        onChange={handleEmploymentChange}
        error={errors.employmentProfile}
      />

      {/* 3. Two-Column Loan Requirements Inputs */}
      <LoanRequirementsSection
        requiredLoanAmount={data.requiredLoanAmount}
        preferredTenureMonths={data.preferredTenureMonths}
        purposeOfLoan={data.purposeOfLoan}
        revenueOrTurnover={data.revenueOrTurnover}
        onChange={handleRequirementsChange}
        errors={errors}
      />

      {/* 4. Existing Loans Verification */}
      <ExistingLoansSelector
        value={data.existingLoans}
        onChange={handleExistingLoansChange}
        error={errors.existingLoans}
      />
    </div>
  )
}

export default LoanAndApplicant
