import React, { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepActionBar, DraftConfirmModal, FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'
import { LoanSubmitSuccessModal } from '../../shared'
import {
  LoanAndApplicant,
  BusinessDetails,
  Banking,
  DocumentVerification,
  ReviewAndSubmit,
} from './steps'
import { getApplicantIdentityDetails } from '../../services/applicantDetailsService'
import {
  validateStep1LoanAndApplicant,
  validateStep2BusinessDetails,
  validateStep3Banking,
  validateStep4Documents,
  validateStep5Review,
} from '../../validation/businessLoanValidation'
import { loanApplicationService } from '../../services/loanApplicationService'
import { useLoanApplication } from '../../hooks/useLoanApplication'
import { safeNavigateTo } from '../../utils/loanMarketplace.utils'
import type { BusinessLoanFormData } from '../../types/businessLoan.types'
import type { LoanApplicationBase } from '../../types/loanApplication.types'
import './BusinessLoan.css'

const BUSINESS_LOAN_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'Loan & Applicant', shortLabel: 'Loan & Applicant' },
  { stepNumber: 2, title: 'Business', shortLabel: 'Business' },
  { stepNumber: 3, title: 'Banking', shortLabel: 'Banking' },
  { stepNumber: 4, title: 'Documents', shortLabel: 'Documents' },
  { stepNumber: 5, title: 'Review', shortLabel: 'Review' },
]

const BUSINESS_LOAN_STEP_VALIDATORS: Record<
  number,
  {
    validate: (data: BusinessLoanFormData) => { isValid: boolean; errors: Record<string, string>; generalError?: string }
    defaultMsg: string
  }
> = {
  1: { validate: validateStep1LoanAndApplicant, defaultMsg: 'Please fill in all mandatory fields.' },
  2: { validate: validateStep2BusinessDetails, defaultMsg: 'Please fill in all mandatory fields.' },
  3: { validate: validateStep3Banking, defaultMsg: 'Please fill in all mandatory fields.' },
  4: { validate: validateStep4Documents, defaultMsg: 'Please upload all mandatory documents marked with *.' },
  5: { validate: validateStep5Review, defaultMsg: 'Please check the authorization box before submitting.' },
}

/**
 * Pure helper to clear field errors explicitly without any loops
 */
function clearFieldErrors(
  errors: Record<string, string>,
  fields: Partial<BusinessLoanFormData>
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

/**
 * Business Loan Application flow orchestrator component.
 * Implements advanced modular monolithic architecture, pure functional components,
 * and zero loop constructs per architectural requirements.
 */
export const BusinessLoan: React.FC = () => {
  const navigate = useNavigate()
  const [stepError, setStepError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submittedRef, setSubmittedRef] = useState<string | null>(null)
  const [submittedApp, setSubmittedApp] = useState<LoanApplicationBase | null>(null)

  // Secured applicant profile dynamically retrieved from account session
  const applicant = useMemo(() => getApplicantIdentityDetails(), [])

  // Modular application state hook
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
    markSubmitted,
  } = useLoanApplication<BusinessLoanFormData>('business_loan', INITIAL_BUSINESS_LOAN_DATA)

  /**
   * Field update handler with real-time field error clearing
   */
  const handleFieldChange = useCallback(
    (fields: Partial<BusinessLoanFormData>) => {
      try {
        updateFormData(fields)
        setFieldErrors((prev) => clearFieldErrors(prev, fields))
        Boolean(stepError) && setStepError(null)
      } catch (err) {
        console.error('[BusinessLoan] Error updating form field:', err)
      }
    },
    [updateFormData, stepError]
  )

  /**
   * Safely handles back button navigation (pure functional)
   */
  const handleBack = useCallback(() => {
    try {
      const isPastFirstStep = currentStep > 1
      isPastFirstStep
        ? (setStepError(null), setFieldErrors({}), prevStep())
        : safeNavigateTo(navigate, '/loans')
    } catch (err) {
      console.error('[BusinessLoan] Navigation error:', err)
      navigate('/loans')
    }
  }, [currentStep, prevStep, navigate])

  /**
   * Application submission handler invoking loanApplicationService
   */
  const handleSubmit = useCallback(async () => {
    try {
      setStepError(null)
      const validation = validateStep5Review(formData)

      const executeSubmission = async () => {
        setIsSubmitting(true)
        const result = await loanApplicationService.submitApplication('business_loan', formData)
        setIsSubmitting(false)
        markSubmitted()
        setSubmittedApp(result)
        setSubmittedRef(result.referenceNumber || result.id || '')
      }

      const handleInvalid = () => {
        setFieldErrors(validation.errors)
        setStepError(validation.generalError || 'Please check the authorization box before submitting.')
      }

      validation.isValid ? executeSubmission() : handleInvalid()
    } catch (err) {
      console.error('[BusinessLoan] Application submission failed:', err)
      setIsSubmitting(false)
      setStepError('Application submission failed. Please try again.')
    }
  }, [formData, navigate])

  /**
   * Validates current step and advances to next step (pure functional, zero if/else)
   */
  const handleContinue = useCallback(() => {
    try {
      setStepError(null)
      const stepConfig = BUSINESS_LOAN_STEP_VALIDATORS[currentStep]
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
      console.error('[BusinessLoan] Step continuation error:', err)
      setStepError('An unexpected error occurred. Please verify your inputs.')
    }
  }, [currentStep, formData, nextStep, handleSubmit])

  /**
   * Step navigation with validation protection (pure functional, zero if/else)
   */
  const handleStepClick = useCallback(
    (targetStep: number) => {
      try {
        const canGoBack = targetStep < currentStep
        const isNextStep = targetStep === currentStep + 1
        const validator = BUSINESS_LOAN_STEP_VALIDATORS[currentStep]
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
        console.error('[BusinessLoan] Step click error:', err)
      }
    },
    [currentStep, formData, goToStep]
  )

  return (
    <div className="business-loan-page" data-testid="business-loan-page">
      {/* 1. Page Heading */}
      <h1 className="business-loan-page__title">Business Loan</h1>

      {/* 2. Five-Step Progress Indicator using global shared FlowStepper */}
      <FlowStepper
        steps={BUSINESS_LOAN_STEPS}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {/* 3. Error Banner */}
      {stepError && (
        <div className="business-loan-page__error-banner" role="alert">
          <img
            src="/assets/icons/loans/alert-error.svg"
            alt=""
            width="20"
            height="20"
            className="business-loan-page__error-icon"
            aria-hidden="true"
          />
          <span>{stepError}</span>
        </div>
      )}

      {/* 4. Active Step Content */}
      {currentStep === 1 && (
        <LoanAndApplicant
          data={formData}
          applicant={applicant}
          onChange={handleFieldChange}
          errors={fieldErrors}
        />
      )}

      {currentStep === 2 && (
        <BusinessDetails
          data={formData}
          onChange={handleFieldChange}
          errors={fieldErrors}
        />
      )}

      {currentStep === 3 && (
        <Banking
          data={formData}
          onChange={handleFieldChange}
          errors={fieldErrors}
        />
      )}

      {currentStep === 4 && (
        <DocumentVerification
          data={formData}
          onChange={handleFieldChange}
          errors={fieldErrors}
        />
      )}

      {currentStep === 5 && (
        <ReviewAndSubmit
          data={formData}
          applicant={applicant}
          onChange={handleFieldChange}
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
        nextTestId={currentStep === 5 ? 'submit-application-btn' : 'step-continue-btn'}
      />

      <DraftConfirmModal
        isOpen={isDraftModalOpen}
        serviceTitle="Business Loan Application"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />

      <LoanSubmitSuccessModal
        isOpen={Boolean(submittedRef)}
        title="Business Loan Submitted"
        referenceNumber={submittedRef || ''}
        message="Your Business Loan application has been successfully received. A TaxEdge Loan Advisor will review your business dossier and contact you shortly."
        onTrackStatus={() => {
          const ref = submittedRef || submittedApp?.referenceNumber || submittedApp?.id || ''
          navigate(`/loans/status/${ref}`, {
            state: { application: submittedApp, loanTitle: 'Business Loan', formData, refNumber: ref },
          })
        }}
      />
    </div>
  )
}

export default BusinessLoan
