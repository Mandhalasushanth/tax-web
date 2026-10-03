import React, { useMemo } from 'react'
import { FlowStepper } from '@shared/components'
import { LoanStepErrorBanner, LoanStepFlowFooter } from '@modules/loans/shared'
import { useLoanStepFlow } from '@modules/loans/hooks/useLoanStepFlow'
import type { FlowStepItem } from '@shared/components'
import { getApplicantIdentityDetails } from '@modules/loans/services/applicantDetailsService'
import { businessLoanValidation } from '@modules/loans/validation/businessLoanValidation'
import type { BusinessLoanFormData } from '@modules/loans/types/businessLoan.types'
import {
  LoanAndApplicant,
  BusinessDetails,
  Banking,
  DocumentVerification,
  ReviewAndSubmit,
} from './steps'
import './BusinessLoan.css'

const BUSINESS_LOAN_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'Loan & Applicant', shortLabel: 'Loan & Applicant' },
  { stepNumber: 2, title: 'Business', shortLabel: 'Business' },
  { stepNumber: 3, title: 'Banking', shortLabel: 'Banking' },
  { stepNumber: 4, title: 'Documents', shortLabel: 'Documents' },
  { stepNumber: 5, title: 'Review', shortLabel: 'Review' },
]

/**
 * Initial business loan form values matching Step 1 & Step 2 requirements
 */
const INITIAL_BUSINESS_LOAN_DATA: BusinessLoanFormData = {
  // Step 1: All fields unselected / unfilled
  employmentProfile: '',
  requiredLoanAmount: '',
  preferredTenureMonths: '',
  purposeOfLoan: '',
  revenueOrTurnover: '',
  existingLoans: '',

  // Step 2: All fields unselected / unfilled
  registeredBusinessName: '',
  businessConstitution: '',
  gstin: '',
  hasUdyam: '',
  udyamRegistrationNumber: '',
  businessVintage: '',
  annualTurnover: '',
  annualNetProfit: '',
  signatoryName: '',
  signatoryDesignation: '',
  signatoryEmail: '',

  // Step 3: Banking & Tax Records
  primaryOperatingBankName: '',
  currentAccountNumber: '',
  bankIfscCode: '',
  currentLenderBank: '',
  totalActiveLoanLimit: '',
  itrAcknowledgementNumber: '',
  grossTotalIncomeItr: '',

  // Step 4: Documents
  uploadedDocs: {},

  // Step 5: Terms & Review
  termsAccepted: false,
}

/** Clearing these fields also clears the dependent field's error */
const RELATED_ERROR_KEYS: Record<string, string[]> = {
  hasUdyam: ['udyamRegistrationNumber'],
}

export const BusinessLoan: React.FC = () => {
  const applicant = useMemo(() => getApplicantIdentityDetails(), [])
  const flow = useLoanStepFlow<BusinessLoanFormData>({
    loanType: 'business_loan',
    loanTitle: 'Business Loan',
    initialValues: INITIAL_BUSINESS_LOAN_DATA,
    application: {
      serviceTitle: 'Business Loan',
      totalSteps: 5,
      stepLabels: BUSINESS_LOAN_STEPS.map((s) => s.title ?? ''),
      resumeRoute: '/loans/business-loan',
    },
    validators: [
      businessLoanValidation.validateStep1,
      businessLoanValidation.validateStep2,
      businessLoanValidation.validateStep3,
      businessLoanValidation.validateStep4,
      businessLoanValidation.validateStep5,
    ],
    relatedErrorKeys: RELATED_ERROR_KEYS,
  })
  const { formData, currentStep, fieldErrors, handleFieldChange } = flow

  return (
    <div className="business-loan-page" data-testid="business-loan-page">
      <h1 className="business-loan-page__title">Business Loan</h1>

      <FlowStepper steps={BUSINESS_LOAN_STEPS} currentStep={currentStep} onStepClick={flow.handleStepClick} />

      <LoanStepErrorBanner message={flow.stepError} />

      {currentStep === 1 && (
        <LoanAndApplicant data={formData} applicant={applicant} onChange={handleFieldChange} errors={fieldErrors} />
      )}
      {currentStep === 2 && <BusinessDetails data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
      {currentStep === 3 && <Banking data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
      {currentStep === 4 && <DocumentVerification data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
      {currentStep === 5 && (
        <ReviewAndSubmit
          data={formData}
          applicant={applicant}
          onChange={handleFieldChange}
          onNavigateToStep={flow.navigateToStep}
          onSubmit={flow.handleNext}
          isSubmitting={flow.isSubmitting}
          errors={fieldErrors}
        />
      )}

      <LoanStepFlowFooter
        flow={flow}
        serviceTitle="Business Loan Application"
        successTitle="Business Loan Submitted"
        successMessage="Your Business Loan application has been successfully received. A TaxEdge Loan Advisor will review your business dossier and contact you shortly."
      />
    </div>
  )
}

export default BusinessLoan
