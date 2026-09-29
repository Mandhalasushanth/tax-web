import React, { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepActionBar, DraftConfirmModal, FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'
import {
  LoanAndApplicant,
  BusinessDetails,
  Banking,
  DocumentVerification,
  ReviewAndSubmit,
} from '../BusinessLoan/steps'
import { getApplicantIdentityDetails } from '../../services/applicantDetailsService'
import {
  validateStep1LoanAndApplicant,
  validateStep2BusinessDetails,
  validateStep3Banking,
  validateStep4Documents,
  validateStep5Review,
} from '../../validation/msmeLoanValidation'
import { loanApplicationService } from '../../services/loanApplicationService'
import { useLoanApplication } from '../../hooks/useLoanApplication'
import { safeNavigateTo } from '../../utils/loanMarketplace.utils'
import type { MsmeLoanFormData } from '../../types/msmeLoan.types'
import type { BusinessLoanFormData } from '../../types/businessLoan.types'
import './MSMELoan.css'

const MSME_LOAN_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'Loan & Applicant', shortLabel: 'Loan & Applicant' },
  { stepNumber: 2, title: 'Business', shortLabel: 'Business' },
  { stepNumber: 3, title: 'Banking', shortLabel: 'Banking' },
  { stepNumber: 4, title: 'Documents', shortLabel: 'Documents' },
  { stepNumber: 5, title: 'Review', shortLabel: 'Review' },
]

const MSME_LOAN_STEP_VALIDATORS: Record<
  number,
  {
    validate: (data: MsmeLoanFormData) => { isValid: boolean; errors: Record<string, string>; generalError?: string }
    defaultMsg: string
  }
> = {
  1: { validate: validateStep1LoanAndApplicant, defaultMsg: 'Please fill in all mandatory fields.' },
  2: { validate: validateStep2BusinessDetails, defaultMsg: 'Please fill in all mandatory fields.' },
  3: { validate: validateStep3Banking, defaultMsg: 'Please fill in all mandatory fields.' },
  4: { validate: validateStep4Documents, defaultMsg: 'Please upload all mandatory documents marked with *.' },
  5: { validate: validateStep5Review, defaultMsg: 'Please check the authorization box before submitting.' },
}

function clearFieldErrors(
  errors: Record<string, string>,
  fields: Partial<MsmeLoanFormData>
): Record<string, string> {
  const next = { ...errors }
  Object.keys(fields).forEach((key) => {
    delete next[key]
  })
  if ('hasUdyam' in fields) delete next.udyamRegistrationNumber
  if ('uploadedDocs' in fields) {
    const docFields = [
      'panCard', 'aadhaarCard', 'directorsKyc', 'businessAddressProof',
      'bankStatements', 'gstCertificate', 'gstReturns', 'businessItr',
      'auditedBalanceSheet', 'profitAndLossStatement', 'cashFlowStatement',
      'businessExpansionDoc', 'businessRegistrationProof',
    ]
    docFields.forEach((d) => { delete next[d] })
  }
  return next
}

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

/**
 * MSME Loan Application flow orchestrator component.
 * Implements advanced modular architecture, pure functional components,
 * and zero loop constructs matching the Business Loan standard.
 */
export const MSMELoan: React.FC = () => {
  const navigate = useNavigate()
  const [stepError, setStepError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const applicant = useMemo(() => getApplicantIdentityDetails(), [])

  const {
    formData,
    updateFormData,
    currentStep,
    goToStep,
    nextStep,
    prevStep,
    isDraftModalOpen,
    setIsDraftModalOpen,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
  } = useLoanApplication<MsmeLoanFormData>('msme_loan', INITIAL_MSME_LOAN_DATA, {
    serviceTitle: 'MSME Loan',
    totalSteps: 5,
    stepLabels: ['Loan & Applicant', 'Business', 'Banking', 'Documents', 'Review'],
    resumeRoute: '/loans/msme-loan',
  })

  const handleFieldChange = useCallback(
    (fields: Partial<MsmeLoanFormData>) => {
      try {
        updateFormData(fields)
        setFieldErrors((prev) => clearFieldErrors(prev, fields))
        Boolean(stepError) && setStepError(null)
      } catch (err) {
        console.error('[MSMELoan] Error updating form field:', err)
      }
    },
    [updateFormData, stepError]
  )

  const handleBack = useCallback(() => {
    try {
      const isPastFirstStep = currentStep > 1
      isPastFirstStep
        ? (setStepError(null), setFieldErrors({}), prevStep())
        : safeNavigateTo(navigate, '/loans')
    } catch (err) {
      console.error('[MSMELoan] Navigation error:', err)
      navigate('/loans')
    }
  }, [currentStep, prevStep, navigate])

  const handleSubmit = useCallback(async () => {
    try {
      setStepError(null)
      const validation = validateStep5Review(formData)

      const executeSubmission = async () => {
        setIsSubmitting(true)
        const result = await loanApplicationService.submitApplication('msme_loan', formData)
        setIsSubmitting(false)
        navigate(`/loans/status/${result.id || result.refNumber}`, {
          state: { application: result, loanTitle: 'MSME Loan', formData },
        })
      }

      const handleInvalid = () => {
        setFieldErrors(validation.errors)
        setStepError(validation.generalError || 'Please check the authorization box before submitting.')
      }

      validation.isValid ? executeSubmission() : handleInvalid()
    } catch (err) {
      console.error('[MSMELoan] Application submission failed:', err)
      setIsSubmitting(false)
      setStepError('Application submission failed. Please try again.')
    }
  }, [formData, navigate])

  const handleContinue = useCallback(() => {
    try {
      setStepError(null)
      const stepConfig = MSME_LOAN_STEP_VALIDATORS[currentStep]
      const validation = stepConfig ? stepConfig.validate(formData) : { isValid: true, errors: {} }

      const handleInvalid = () => {
        setFieldErrors(validation?.errors ?? {})
        setStepError(validation?.generalError || stepConfig?.defaultMsg || 'Please fill in all mandatory fields.')
      }

      const handleValid = () => {
        setFieldErrors({})
        currentStep === 5 ? handleSubmit() : nextStep()
      }

      !stepConfig
        ? nextStep()
        : validation.isValid
          ? handleValid()
          : handleInvalid()
    } catch (err) {
      console.error('[MSMELoan] Step continuation error:', err)
      setStepError('An unexpected error occurred. Please verify your inputs.')
    }
  }, [currentStep, formData, nextStep, handleSubmit])

  const handleStepClick = useCallback(
    (targetStep: number) => {
      try {
        const canGoBack = targetStep < currentStep
        const isNextStep = targetStep === currentStep + 1
        const validator = MSME_LOAN_STEP_VALIDATORS[currentStep]
        const validation = validator ? validator.validate(formData) : { isValid: true, errors: {} }

        const navigateDirect = () => {
          setStepError(null)
          setFieldErrors({})
          goToStep(targetStep)
        }

        const handleStepValidation = () => {
          validation.isValid
            ? navigateDirect()
            : (
                setFieldErrors(validation.errors),
                setStepError(validation.generalError || validator?.defaultMsg || 'Please complete the current step.')
              )
        }

        canGoBack
          ? navigateDirect()
          : isNextStep
            ? handleStepValidation()
            : undefined
      } catch (err) {
        console.error('[MSMELoan] Step click error:', err)
      }
    },
    [currentStep, formData, goToStep]
  )

  // Safe cast to business loan shape as both types share identical structure
  const businessShapeData = formData as unknown as BusinessLoanFormData
  const handleBusinessShapeChange = handleFieldChange as unknown as (fields: Partial<BusinessLoanFormData>) => void

  return (
    <div className="msme-loan-page" data-testid="msme-loan-page">
      {/* 1. Page Heading */}
      <h1 className="msme-loan-page__title">MSME Loan</h1>

      {/* 2. Five-Step Progress Indicator using global shared FlowStepper */}
      <FlowStepper
        steps={MSME_LOAN_STEPS}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {/* 3. Error Banner */}
      {stepError && (
        <div className="msme-loan-page__error-banner" role="alert">
          <img
            src="/assets/icons/loans/alert-error.svg"
            alt=""
            width="20"
            height="20"
            className="msme-loan-page__error-icon"
            aria-hidden="true"
          />
          <span>{stepError}</span>
        </div>
      )}

      {/* 4. Active Step Content */}
      {currentStep === 1 && (
        <LoanAndApplicant
          data={businessShapeData}
          applicant={applicant}
          onChange={handleBusinessShapeChange}
          errors={fieldErrors}
        />
      )}

      {currentStep === 2 && (
        <BusinessDetails
          data={businessShapeData}
          onChange={handleBusinessShapeChange}
          errors={fieldErrors}
        />
      )}

      {currentStep === 3 && (
        <Banking
          data={businessShapeData}
          onChange={handleBusinessShapeChange}
          errors={fieldErrors}
        />
      )}

      {currentStep === 4 && (
        <DocumentVerification
          data={businessShapeData}
          onChange={handleBusinessShapeChange}
          errors={fieldErrors}
        />
      )}

      {currentStep === 5 && (
        <ReviewAndSubmit
          data={businessShapeData}
          applicant={applicant}
          onChange={handleBusinessShapeChange}
          onNavigateToStep={goToStep}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errors={fieldErrors}
        />
      )}

      {/* 5. Bottom Action Bar */}
      <StepActionBar
        showBack={true}
        onBack={handleBack}
        onNext={currentStep === 5 ? handleSubmit : handleContinue}
        onSaveDraft={() => setIsDraftModalOpen(true)}
        saveDraftLabel="Save Draft & Exit"
        nextLabel={currentStep === 5 ? (isSubmitting ? 'Submitting...' : 'Submit Application') : 'Continue'}
        nextDisabled={isSubmitting}
        nextTestId={currentStep === 5 ? 'msme-submit-application-btn' : 'msme-step-continue-btn'}
      />

      <DraftConfirmModal
        isOpen={isDraftModalOpen}
        serviceTitle="MSME Loan Application"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />
    </div>
  )
}

export default MSMELoan
