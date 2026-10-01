import React from 'react'
import { FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'
import { LoanStepErrorBanner, LoanStepFlowFooter } from '@modules/loans/shared'
import { useLoanStepFlow } from '@modules/loans/hooks/useLoanStepFlow'
import { toAmount } from '@modules/loans/validation/commonLoanValidation'
import type { HomeLoanData } from '@modules/loans/types/homeLoan.types'
import { homeLoanValidation } from '@modules/loans/validation/homeLoanValidation'

import {
  Requirements,
  EmploymentAndIncome,
  BankingAndITR,
  Documents,
  ReviewAndSubmit,
} from './steps'

import './HomeLoan.css'

const HOME_LOAN_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'Requirements', shortLabel: 'Requirements' },
  { stepNumber: 2, title: 'Employment & Income', shortLabel: 'Employment' },
  { stepNumber: 3, title: 'Banking & ITR', shortLabel: 'Banking' },
  { stepNumber: 4, title: 'Documents', shortLabel: 'Documents' },
  { stepNumber: 5, title: 'Review & Submit', shortLabel: 'Review' },
]

const INITIAL_HOME_LOAN_DATA: HomeLoanData = {
  loanAmount: '',
  propertyIntent: '',
  customPropertyIntent: '',
  repaymentTenureYears: 0,
  propertyStage: '',
  estimatedPropertyCost: '',
  occupation: '',
  monthlyIncomeRange: '',
  hasExistingEmis: false,
  existingEmiAmount: '',
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  itrStatus: '',
  itrAckNumber: '',
  annualIncomeAsPerItr: '',
  uploadedDocs: {},
  termsAccepted: false,
}

export const HomeLoan: React.FC = () => {
  const flow = useLoanStepFlow<HomeLoanData>({
    loanType: 'home_loan',
    loanTitle: 'Home Loan',
    initialValues: INITIAL_HOME_LOAN_DATA,
    application: {
      serviceTitle: 'Home Loan',
      totalSteps: 5,
      stepLabels: HOME_LOAN_STEPS.map((s) => s.title ?? ''),
      resumeRoute: '/loans/home-loan',
    },
    validators: [
      homeLoanValidation.validateStep1,
      homeLoanValidation.validateStep2,
      homeLoanValidation.validateStep3,
      homeLoanValidation.validateStep4,
      homeLoanValidation.validateStep5,
    ],
    buildSubmission: (data) => ({
      title: 'Home Loan Application',
      category: 'Capital & Financing',
      requestedAmount: toAmount(data.loanAmount),
      tenureMonths: Number(data.repaymentTenureYears || 0) * 12,
      details: { ...data },
    }),
  })
  const { formData, currentStep, fieldErrors, handleFieldChange } = flow

  return (
    <div className="home-loan-page" data-testid="home-loan-page">
      <h1 className="home-loan-page__title">Home Loan</h1>

      <FlowStepper steps={HOME_LOAN_STEPS} currentStep={currentStep} onStepClick={flow.handleStepClick} />

      <LoanStepErrorBanner message={flow.stepError} />

      <div className="home-loan-page__card">
        {currentStep === 1 && <Requirements data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 2 && <EmploymentAndIncome data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 3 && <BankingAndITR data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 4 && <Documents data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 5 && (
          <ReviewAndSubmit
            formData={formData}
            updateFormData={handleFieldChange}
            onNavigateToStep={flow.navigateToStep}
            errors={fieldErrors}
          />
        )}
      </div>

      <LoanStepFlowFooter
        flow={flow}
        serviceTitle="Home Loan Application"
        successTitle="Home Loan Submitted"
        successMessage="Your Home Loan application has been successfully received. A TaxEdge Loan Advisor will review your documents and contact you shortly."
        nextDisabled={flow.isLastStep && !formData.termsAccepted}
      />
    </div>
  )
}

export default HomeLoan
