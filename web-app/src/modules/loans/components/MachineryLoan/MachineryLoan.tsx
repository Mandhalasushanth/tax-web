import React from 'react'
import { FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'
import { LoanStepErrorBanner, LoanStepFlowFooter } from '@modules/loans/shared'
import { useLoanStepFlow } from '@modules/loans/hooks/useLoanStepFlow'
import { toAmount } from '@modules/loans/validation/commonLoanValidation'
import type { MachineryLoanData } from '@modules/loans/types/machineryLoan.types'
import { machineryLoanValidation } from '@modules/loans/validation/machineryLoanValidation'

import { LoanDetails } from './steps/LoanDetails/LoanDetails'
import { BusinessDetails } from './steps/BusinessDetails/BusinessDetails'
import { Banking } from './steps/Banking/Banking'
import { DocumentsAndReview } from './steps/DocumentsAndReview/DocumentsAndReview'
import './MachineryLoan.css'

const MACHINERY_LOAN_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'Loan Details', shortLabel: 'Loan Details' },
  { stepNumber: 2, title: 'Business Details', shortLabel: 'Business Details' },
  { stepNumber: 3, title: 'Banking', shortLabel: 'Banking' },
  { stepNumber: 4, title: 'Documents & Review', shortLabel: 'Documents & Review' },
]

const INITIAL_MACHINERY_LOAN_DATA: MachineryLoanData = {
  loanAmount: '',
  machineryType: '',
  repaymentTenure: '',
  businessName: '',
  businessType: 'Proprietorship',
  businessVintage: '1–3 years',
  annualTurnover: '',
  isGstRegistered: true,
  gstin: '',
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  branchName: '',
  uploadedDocs: {},
  termsAccepted: false,
}

export const MachineryLoan: React.FC = () => {
  const flow = useLoanStepFlow<MachineryLoanData>({
    loanType: 'machinery_loan',
    loanTitle: 'Machinery Loan',
    initialValues: INITIAL_MACHINERY_LOAN_DATA,
    application: {
      serviceTitle: 'Machinery Loan',
      totalSteps: 4,
      stepLabels: MACHINERY_LOAN_STEPS.map((s) => s.title ?? ''),
      resumeRoute: '/loans/machinery-loan',
    },
    validators: [
      machineryLoanValidation.validateStep1,
      machineryLoanValidation.validateStep2,
      machineryLoanValidation.validateStep3,
      machineryLoanValidation.validateStep4,
    ],
    buildSubmission: (data) => ({
      title: 'Machinery Loan Application',
      category: 'Capital & Financing',
      requestedAmount: toAmount(data.loanAmount),
      tenureMonths: toAmount(data.repaymentTenure),
      details: { ...data },
    }),
  })
  const { formData, currentStep, fieldErrors, handleFieldChange } = flow

  return (
    <div className="machinery-loan-page" data-testid="machinery-loan-page">
      <h1 className="machinery-loan-page__title">Machinery Loan</h1>

      <FlowStepper steps={MACHINERY_LOAN_STEPS} currentStep={currentStep} onStepClick={flow.handleStepClick} />

      <LoanStepErrorBanner message={flow.stepError} />

      <div className="machinery-loan-page__card">
        {currentStep === 1 && <LoanDetails data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 2 && <BusinessDetails data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 3 && <Banking data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 4 && (
          <DocumentsAndReview
            data={formData}
            onChange={handleFieldChange}
            onNavigateToStep={flow.navigateToStep}
            errors={fieldErrors}
          />
        )}
      </div>

      <LoanStepFlowFooter
        flow={flow}
        serviceTitle="Machinery Loan Application"
        successTitle="Machinery Loan Submitted"
        successMessage="Your Machinery Loan application has been successfully received. A TaxEdge Loan Advisor will review your equipment quotation and financial records and contact you shortly."
      />
    </div>
  )
}

export default MachineryLoan
