import React from 'react'
import { FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'
import { LoanStepErrorBanner, LoanStepFlowFooter } from '@modules/loans/shared'
import { useLoanStepFlow } from '@modules/loans/hooks/useLoanStepFlow'
import { toAmount } from '@modules/loans/validation/commonLoanValidation'
import type { PersonalLoanData } from '@modules/loans/types/personalLoan.types'
import { personalLoanValidation } from '@modules/loans/validation/personalLoanValidation'

import { Financials } from './steps/Financials/Financials'
import { Banking } from './steps/Banking/Banking'
import { Documents } from './steps/Documents/Documents'
import { Review } from './steps/Review/Review'
import './PersonalLoan.css'

const PERSONAL_LOAN_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'Financials', shortLabel: 'Financials' },
  { stepNumber: 2, title: 'Banking Details', shortLabel: 'Banking' },
  { stepNumber: 3, title: 'Document Verification Dossier', shortLabel: 'Documents' },
  { stepNumber: 4, title: 'Review & Submit', shortLabel: 'Review' },
]

const INITIAL_PERSONAL_LOAN_DATA: PersonalLoanData = {
  requiredLoanAmount: '',
  purposeOfLoan: '',
  preferredTenure: '',
  monthlyNetSalary: '',
  hasExistingLoans: false,
  existingMonthlyEmi: '',
  primaryBankName: '',
  bankAccountNumber: '',
  bankIfscCode: '',
  branchName: '',
  uploadedDocs: {},
  confirmAccurate: false,
  authorizeCreditCheck: false,
}

export const PersonalLoan: React.FC = () => {
  const flow = useLoanStepFlow<PersonalLoanData>({
    loanType: 'personal_loan',
    loanTitle: 'Personal Loan',
    initialValues: INITIAL_PERSONAL_LOAN_DATA,
    application: {
      serviceTitle: 'Personal Loan',
      totalSteps: 4,
      stepLabels: PERSONAL_LOAN_STEPS.map((s) => s.title ?? ''),
      resumeRoute: '/loans/personal-loan',
    },
    validators: [
      personalLoanValidation.validateStep1,
      personalLoanValidation.validateStep2,
      personalLoanValidation.validateStep3,
      personalLoanValidation.validateStep4,
    ],
    buildSubmission: (data) => ({
      title: 'Personal Loan Application',
      category: 'Retail & Personal Finance',
      requestedAmount: toAmount(data.requiredLoanAmount),
      tenureMonths: Number(String(data.preferredTenure).match(/\d+/)?.[0]) || 0,
      details: {
        ...data,
        purposeOfLoan: data.purposeOfLoan || '',
        disbursementBank: data.primaryBankName || '',
      },
    }),
  })
  const { formData, currentStep, fieldErrors, handleFieldChange } = flow

  return (
    <div className="personal-loan-page" data-testid="personal-loan-page">
      <h1 className="personal-loan-page__title">Personal Loan</h1>

      <FlowStepper steps={PERSONAL_LOAN_STEPS} currentStep={currentStep} onStepClick={flow.handleStepClick} />

      <LoanStepErrorBanner message={flow.stepError} />

      <div className="personal-loan-page__card">
        {currentStep === 1 && <Financials data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 2 && <Banking data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 3 && <Documents data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 4 && (
          <Review
            data={formData}
            onChange={handleFieldChange}
            onNavigateToStep={flow.navigateToStep}
            errors={fieldErrors}
          />
        )}
      </div>

      <LoanStepFlowFooter
        flow={flow}
        serviceTitle="Personal Loan Application"
        successTitle="Personal Loan Submitted"
        successMessage="Your Personal Loan application has been successfully received. A TaxEdge Loan Advisor will review your profile and contact you shortly for disbursement."
        testIdPrefix="personal"
      />
    </div>
  )
}

export default PersonalLoan
