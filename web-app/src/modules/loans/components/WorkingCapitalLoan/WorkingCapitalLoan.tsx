import React from 'react'
import { FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'
import { LoanStepErrorBanner, LoanStepFlowFooter } from '@modules/loans/shared'
import { useLoanStepFlow } from '@modules/loans/hooks/useLoanStepFlow'
import { toAmount } from '@modules/loans/validation/commonLoanValidation'
import type { WorkingCapitalLoanData } from '@modules/loans/types/workingCapitalLoan.types'
import { workingCapitalLoanValidation } from '@modules/loans/validation/workingCapitalLoanValidation'

import { Financials } from './steps/Financials/Financials'
import { BusinessAndBanking } from './steps/BusinessAndBanking/BusinessAndBanking'
import { Documents } from './steps/Documents/Documents'
import { ReviewAndSubmit } from './steps/ReviewAndSubmit/ReviewAndSubmit'
import './WorkingCapitalLoan.css'

const WORKING_CAPITAL_LOAN_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'Financials', shortLabel: 'Financials' },
  { stepNumber: 2, title: 'Business & Banking', shortLabel: 'Business & Banking' },
  { stepNumber: 3, title: 'Documents', shortLabel: 'Documents' },
  { stepNumber: 4, title: 'Review & Submit', shortLabel: 'Review & Submit' },
]

const INITIAL_WORKING_CAPITAL_LOAN_DATA: WorkingCapitalLoanData = {
  requiredCreditLimit: '',
  creditPurpose: '',
  preferredFacilityType: '',
  hasActiveBorrowings: false,
  monthlyEmiOutgo: '',
  registeredBusinessName: '',
  gstinNumber: '',
  udyamRegistrationNumber: '',
  operationalTrackRecord: '1 - 2 Years',
  annualAuditedTurnover: '',
  annualNetProfitBeforeTax: '',
  currentAccountBankName: '',
  currentAccountNumber: '',
  bankIfscCode: '',
  bankBranchName: '',
  itrFilingStatus: 'Not Filed',
  itrAcknowledgementNumber: '',
  uploadedDocs: {},
  termsAccepted: false,
}

export const WorkingCapitalLoan: React.FC = () => {
  const flow = useLoanStepFlow<WorkingCapitalLoanData>({
    loanType: 'working_capital_loan',
    loanTitle: 'Working Capital Loan',
    initialValues: INITIAL_WORKING_CAPITAL_LOAN_DATA,
    application: {
      serviceTitle: 'Working Capital Loan',
      totalSteps: 4,
      stepLabels: WORKING_CAPITAL_LOAN_STEPS.map((s) => s.title ?? ''),
      resumeRoute: '/loans/working-capital-loan',
    },
    validators: [
      workingCapitalLoanValidation.validateStep1,
      workingCapitalLoanValidation.validateStep2,
      workingCapitalLoanValidation.validateStep3,
      workingCapitalLoanValidation.validateStep4,
    ],
    buildSubmission: (data) => ({
      title: 'Working Capital Loan Application',
      category: 'Working Capital & Credit Lines',
      requestedAmount: toAmount(data.requiredCreditLimit),
      tenureMonths: 12,
      details: { ...data },
    }),
  })
  const { formData, currentStep, fieldErrors, handleFieldChange } = flow

  return (
    <div className="working-capital-page">
      <h1 className="working-capital-page__title">Working Capital Loan</h1>

      <div className="working-capital-stepper-container">
        <FlowStepper steps={WORKING_CAPITAL_LOAN_STEPS} currentStep={currentStep} onStepClick={flow.handleStepClick} />
      </div>

      <div className="working-capital-content">
        <LoanStepErrorBanner message={flow.stepError} />

        {currentStep === 1 && <Financials data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 2 && <BusinessAndBanking data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 3 && <Documents data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 4 && (
          <ReviewAndSubmit
            data={formData}
            onChange={handleFieldChange}
            onNavigateToStep={flow.navigateToStep}
            errors={fieldErrors}
          />
        )}
      </div>

      <LoanStepFlowFooter
        flow={flow}
        serviceTitle="Working Capital Loan Application"
        successTitle="Working Capital Loan Submitted"
        successMessage="Your Working Capital Loan application has been successfully received. A TaxEdge Loan Advisor will review your business records and contact you shortly."
      />
    </div>
  )
}

export default WorkingCapitalLoan
