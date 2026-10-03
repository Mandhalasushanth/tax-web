import React, { useMemo } from 'react'
import { FlowStepper } from '@shared/components'
import { LoanStepErrorBanner, LoanStepFlowFooter } from '@modules/loans/shared'
import { useLoanStepFlow } from '@modules/loans/hooks/useLoanStepFlow'
import type { FlowStepItem } from '@shared/components'
import { getApplicantIdentityDetails } from '@modules/loans/services/applicantDetailsService'
import { msmeLoanValidation } from '@modules/loans/validation/msmeLoanValidation'
import type { MsmeLoanFormData } from '@modules/loans/types/msmeLoan.types'
import type { BusinessLoanFormData } from '@modules/loans/types/businessLoan.types'
import {
  LoanAndApplicant,
  BusinessDetails,
  Banking,
  DocumentVerification,
  ReviewAndSubmit,
} from '../BusinessLoan/steps'
import './MSMELoan.css'

const MSME_LOAN_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'Loan & Applicant', shortLabel: 'Loan & Applicant' },
  { stepNumber: 2, title: 'Business', shortLabel: 'Business' },
  { stepNumber: 3, title: 'Banking', shortLabel: 'Banking' },
  { stepNumber: 4, title: 'Documents', shortLabel: 'Documents' },
  { stepNumber: 5, title: 'Review', shortLabel: 'Review' },
]

const INITIAL_MSME_LOAN_DATA: MsmeLoanFormData = {
  employmentProfile: '',
  requiredLoanAmount: '',
  preferredTenureMonths: '',
  purposeOfLoan: '',
  revenueOrTurnover: '',
  existingLoans: '',

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

  primaryOperatingBankName: '',
  currentAccountNumber: '',
  bankIfscCode: '',
  currentLenderBank: '',
  totalActiveLoanLimit: '',
  itrAcknowledgementNumber: '',
  grossTotalIncomeItr: '',

  uploadedDocs: {},
  termsAccepted: false,
}

/** Clearing these fields also clears the dependent field's error */
const RELATED_ERROR_KEYS: Record<string, string[]> = {
  hasUdyam: ['udyamRegistrationNumber'],
}

export const MSMELoan: React.FC = () => {
  const applicant = useMemo(() => getApplicantIdentityDetails(), [])
  const flow = useLoanStepFlow<MsmeLoanFormData>({
    loanType: 'msme_loan',
    loanTitle: 'MSME Loan',
    initialValues: INITIAL_MSME_LOAN_DATA,
    application: {
      serviceTitle: 'MSME Loan',
      totalSteps: 5,
      stepLabels: MSME_LOAN_STEPS.map((s) => s.title ?? ''),
      resumeRoute: '/loans/msme-loan',
    },
    validators: [
      msmeLoanValidation.validateStep1,
      msmeLoanValidation.validateStep2,
      msmeLoanValidation.validateStep3,
      msmeLoanValidation.validateStep4,
      msmeLoanValidation.validateStep5,
    ],
    relatedErrorKeys: RELATED_ERROR_KEYS,
  })
  const { formData, currentStep, fieldErrors, handleFieldChange } = flow

  // MSME shares the Business Loan step components; both form types have the same fields
  const businessShapeData = formData as unknown as BusinessLoanFormData
  const handleBusinessShapeChange = handleFieldChange as unknown as (fields: Partial<BusinessLoanFormData>) => void

  return (
    <div className="msme-loan-page" data-testid="msme-loan-page">
      <h1 className="msme-loan-page__title">MSME Loan</h1>

      <FlowStepper steps={MSME_LOAN_STEPS} currentStep={currentStep} onStepClick={flow.handleStepClick} />

      <LoanStepErrorBanner message={flow.stepError} />

      {currentStep === 1 && (
        <LoanAndApplicant data={businessShapeData} applicant={applicant} onChange={handleBusinessShapeChange} errors={fieldErrors} />
      )}
      {currentStep === 2 && <BusinessDetails data={businessShapeData} onChange={handleBusinessShapeChange} errors={fieldErrors} />}
      {currentStep === 3 && <Banking data={businessShapeData} onChange={handleBusinessShapeChange} errors={fieldErrors} />}
      {currentStep === 4 && <DocumentVerification data={businessShapeData} onChange={handleBusinessShapeChange} errors={fieldErrors} />}
      {currentStep === 5 && (
        <ReviewAndSubmit
          data={businessShapeData}
          applicant={applicant}
          onChange={handleBusinessShapeChange}
          onNavigateToStep={flow.navigateToStep}
          onSubmit={flow.handleNext}
          isSubmitting={flow.isSubmitting}
          errors={fieldErrors}
        />
      )}

      <LoanStepFlowFooter
        flow={flow}
        serviceTitle="MSME Loan Application"
        successTitle="MSME Loan Submitted"
        successMessage="Your MSME Loan application has been successfully received. A TaxEdge Loan Advisor will review your business dossier and contact you shortly."
        testIdPrefix="msme"
      />
    </div>
  )
}

export default MSMELoan
