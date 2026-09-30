import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepActionBar, DraftConfirmModal, FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'

import { useLoanApplication } from '../../hooks/useLoanApplication'
import { loanApplicationService } from '../../services/loanApplicationService'
import type { HomeLoanData } from '../../types/homeLoan.types'
import { homeLoanValidation } from '../../validation/homeLoanValidation'

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

const HOME_LOAN_STEP_VALIDATORS: Record<
  number,
  {
    validate: (data: HomeLoanData) => { isValid: boolean; error?: string; errors: Record<string, string> }
    defaultMsg: string
  }
> = {
  1: { validate: homeLoanValidation.validateStep1, defaultMsg: 'Please fill in all required fields.' },
  2: { validate: homeLoanValidation.validateStep2, defaultMsg: 'Please fill in all required fields.' },
  3: { validate: homeLoanValidation.validateStep3, defaultMsg: 'Please fill in all required fields.' },
  4: { validate: homeLoanValidation.validateStep4, defaultMsg: 'Please upload all mandatory documents before continuing.' },
  5: { validate: homeLoanValidation.validateStep5, defaultMsg: 'Please accept the Terms & Conditions before submitting.' },
}

export const HomeLoan: React.FC = () => {
  const navigate = useNavigate()
  const [stepError, setStepError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const {
    formData,
    updateFormData,
    currentStep,
    goToStep,
    nextStep,
    prevStep,
    isDraftModalOpen,
    setIsDraftModalOpen,
    isSubmitting,
    setIsSubmitting,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
    markSubmitted,
  } = useLoanApplication<HomeLoanData>(
    'home_loan',
    INITIAL_HOME_LOAN_DATA,
    {
      serviceTitle: 'Home Loan',
      totalSteps: 5,
      stepLabels: ['Requirements', 'Employment & Income', 'Banking & ITR', 'Documents', 'Review & Submit'],
      resumeRoute: '/loans/home-loan',
    }
  )

  const handleFieldChange = (fields: Partial<HomeLoanData>) => {
    updateFormData(fields)
    if (Object.keys(fieldErrors).length > 0) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        Object.keys(fields).forEach((k) => delete next[k])
        return next
      })
    }
    Boolean(stepError) && setStepError(null)
  }

  const validateCurrentStep = (): boolean => {
    setStepError(null)
    setFieldErrors({})

    const validator = HOME_LOAN_STEP_VALIDATORS[currentStep]
    const res = validator ? validator.validate(formData) : { isValid: true, errors: {} }

    return res.isValid
      ? true
      : (
          setStepError(res.error || validator?.defaultMsg || 'Please complete required fields.'),
          setFieldErrors(res.errors),
          false
        )
  }

  const handleNext = async () => {
    if (currentStep === 5 && !formData.termsAccepted) {
      setStepError('Please authorize TaxEdge and accept the declaration to submit your application.')
      setFieldErrors({ termsAccepted: 'Please authorize TaxEdge and accept the declaration to submit your application.' })
      const declarationEl = document.getElementById('home-loan-terms-checkbox')
      if (declarationEl) {
        declarationEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        declarationEl.focus()
      }
      return
    }

    const isValid = validateCurrentStep()
    if (!isValid) return

    if (currentStep < 5) {
      nextStep()
    } else {
      setIsSubmitting(true)
      try {
        const app = await loanApplicationService.submitApplication('home_loan', {
          loanType: 'home_loan',
          title: 'Home Loan Application',
          category: 'Capital & Financing',
          requestedAmount: Number(String(formData.loanAmount).replace(/\D/g, '')),
          tenureMonths: Number(formData.repaymentTenureYears || 0) * 12,
          details: formData,
        })
        markSubmitted()
        navigate(`/loans/status/${app.referenceNumber}`, {
          state: { formData, refNumber: app.referenceNumber, application: app, loanTitle: 'Home Loan' },
        })
      } catch (err: unknown) {
        setStepError(err instanceof Error ? err.message : 'Submission failed. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleStepClick = (stepNumber: number) => {
    const canGoBack = stepNumber < currentStep
    const canGoNext = stepNumber === currentStep + 1 && validateCurrentStep()


    canGoBack || canGoNext
      ? (setStepError(null), setFieldErrors({}), goToStep(stepNumber))
      : undefined
  }

  return (
    <div className="home-loan-page" data-testid="home-loan-page">
      <h1 className="home-loan-page__title">Home Loan</h1>

      <FlowStepper
        steps={HOME_LOAN_STEPS}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {stepError && (
        <div className="home-loan-page__error-banner" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{stepError}</span>
        </div>
      )}

      <div className="home-loan-page__card">
        {currentStep === 1 && (
          <Requirements data={formData} onChange={handleFieldChange} errors={fieldErrors} />
        )}
        {currentStep === 2 && (
          <EmploymentAndIncome data={formData} onChange={handleFieldChange} errors={fieldErrors} />
        )}
        {currentStep === 3 && (
          <BankingAndITR data={formData} onChange={handleFieldChange} errors={fieldErrors} />
        )}
        {currentStep === 4 && (
          <Documents data={formData} onChange={handleFieldChange} errors={fieldErrors} />
        )}
        {currentStep === 5 && (
          <ReviewAndSubmit
            formData={formData}
            updateFormData={handleFieldChange}
            onNavigateToStep={(step) => {
              setStepError(null)
              setFieldErrors({})
              goToStep(step)
            }}
            errors={fieldErrors}
          />
        )}
      </div>

      <StepActionBar
        showBack={true}
        onBack={() => {
          setStepError(null)
          setFieldErrors({})
          currentStep > 1 ? prevStep() : navigate('/loans')
        }}
        onNext={handleNext}
        onSaveDraft={() => setIsDraftModalOpen(true)}
        saveDraftLabel="Save Draft & Exit"
        nextLabel={currentStep === 5 ? (isSubmitting ? 'Submitting...' : 'Submit Application') : 'Continue'}
        nextDisabled={isSubmitting || (currentStep === 5 && !formData.termsAccepted)}
        nextTestId={currentStep === 5 ? 'submit-application-btn' : 'step-continue-btn'}
      />

      <DraftConfirmModal
        isOpen={isDraftModalOpen}
        serviceTitle="Home Loan Application"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />
    </div>
  )
}

export default HomeLoan
