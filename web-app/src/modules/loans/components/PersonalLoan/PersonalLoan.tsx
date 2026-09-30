import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepActionBar, DraftConfirmModal, FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'

import { useLoanApplication } from '../../hooks/useLoanApplication'
import { loanApplicationService } from '../../services/loanApplicationService'
import type { LoanApplicationBase } from '../../types/loanApplication.types'
import type { PersonalLoanData } from '../../types/personalLoan.types'
import { personalLoanValidation } from '../../validation/personalLoanValidation'

import { Financials } from './steps/Financials/Financials'
import { Banking } from './steps/Banking/Banking'
import { Documents } from './steps/Documents/Documents'
import { Review } from './steps/Review/Review'
import { LoanSubmitSuccessModal } from '../../shared'

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
  const navigate = useNavigate()
  const [stepError, setStepError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [submittedRef, setSubmittedRef] = useState<string | null>(null)
  const [submittedApp, setSubmittedApp] = useState<LoanApplicationBase | null>(null)

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
  } = useLoanApplication<PersonalLoanData>(
    'personal_loan',
    INITIAL_PERSONAL_LOAN_DATA,
    {
      serviceTitle: 'Personal Loan',
      totalSteps: 4,
      stepLabels: ['Financials', 'Banking', 'Documents', 'Review'],
      resumeRoute: '/loans/personal-loan',
    }
  )

  const handleFieldChange = (fields: Partial<PersonalLoanData>) => {
    updateFormData(fields)
    if (Object.keys(fieldErrors).length > 0) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        Object.keys(fields).forEach((key) => { delete next[key] })
        if (fields.uploadedDocs) {
          Object.keys(fields.uploadedDocs).forEach((docId) => { delete next[docId] })
        }
        return next
      })
    }
    if (stepError) setStepError(null)
  }

  const validateCurrentStep = (): boolean => {
    setStepError(null)
    setFieldErrors({})
    const validators = [
      () => personalLoanValidation.validateStep1(formData),
      () => personalLoanValidation.validateStep2(formData),
      () => personalLoanValidation.validateStep3(formData),
      () => personalLoanValidation.validateStep4(formData),
    ]
    const res = validators[currentStep - 1]?.()
    if (res && !res.isValid) {
      setStepError(res.error || 'Please fill in all required fields.')
      setFieldErrors(res.errors)
      return false
    }
    return true
  }

  const handleNext = async () => {
    if (!validateCurrentStep()) return

    if (currentStep < 4) {
      nextStep()
    } else {
      setIsSubmitting(true)
      try {
        const tenureMonths = Number(String(formData.preferredTenure).match(/\d+/)?.[0]) || 0
        const app = await loanApplicationService.submitApplication('personal_loan', {
          loanType: 'personal_loan',
          title: 'Personal Loan Application',
          category: 'Retail & Personal Finance',
          requestedAmount: Number(String(formData.requiredLoanAmount || 0).replace(/\D/g, '')) || 0,
          tenureMonths,
          details: {
            ...formData,
            purposeOfLoan: formData.purposeOfLoan || '',
            disbursementBank: formData.primaryBankName || '',
          },
        })
        markSubmitted()
        setSubmittedRef(app.referenceNumber || app.id || '')
        setSubmittedApp(app)
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Submission failed. Please try again.'
        setStepError(errorMsg)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleStepClick = (targetStep: number) => {
    if (targetStep < currentStep) {
      goToStep(targetStep)
      setStepError(null)
      setFieldErrors({})
    } else if (targetStep === currentStep + 1) {
      if (validateCurrentStep()) goToStep(targetStep)
    }
  }

  return (
    <div className="personal-loan-page" data-testid="personal-loan-page">
      <h1 className="personal-loan-page__title">Personal Loan</h1>

      <FlowStepper
        steps={PERSONAL_LOAN_STEPS}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {stepError && (
        <div className="personal-loan-page__error-banner" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{stepError}</span>
        </div>
      )}

      <div className="personal-loan-page__card">
        {currentStep === 1 && (
          <Financials
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 2 && (
          <Banking
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 3 && (
          <Documents
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 4 && (
          <Review
            data={formData}
            onChange={handleFieldChange}
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
        nextLabel={currentStep === 4 ? (isSubmitting ? 'Submitting...' : 'Submit Application') : 'Continue'}
        nextDisabled={isSubmitting}
        nextTestId={currentStep === 4 ? 'personal-submit-application-btn' : 'personal-step-continue-btn'}
      />

      <DraftConfirmModal
        isOpen={isDraftModalOpen}
        serviceTitle="Personal Loan Application"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />

      <LoanSubmitSuccessModal
        isOpen={Boolean(submittedRef)}
        title="Personal Loan Submitted"
        referenceNumber={submittedRef || ''}
        message="Your Personal Loan application has been successfully received. A TaxEdge Loan Advisor will review your profile and contact you shortly for disbursement."
        onTrackStatus={() => {
          const ref = submittedRef || submittedApp?.referenceNumber || submittedApp?.id || ''
          navigate(`/loans/status/${ref}`, {
            state: { application: submittedApp, formData, refNumber: ref, loanTitle: 'Personal Loan' },
          })
        }}
      />
    </div>
  )
}

export default PersonalLoan
