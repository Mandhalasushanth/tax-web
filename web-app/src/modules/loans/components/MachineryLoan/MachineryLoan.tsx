import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepActionBar, DraftConfirmModal, FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'

import { useLoanApplication } from '../../hooks/useLoanApplication'
import { loanApplicationService } from '../../services/loanApplicationService'
import { safeNavigateTo } from '../../utils/loanMarketplace.utils'
import type { LoanApplicationBase } from '../../types/loanApplication.types'
import type { MachineryLoanData } from '../../types/machineryLoan.types'
import { machineryLoanValidation } from '../../validation/machineryLoanValidation'

import { LoanDetails } from './steps/LoanDetails/LoanDetails'
import { BusinessDetails } from './steps/BusinessDetails/BusinessDetails'
import { Banking } from './steps/Banking/Banking'
import { DocumentsAndReview } from './steps/DocumentsAndReview/DocumentsAndReview'
import { LoanSubmitSuccessModal } from '../../shared'

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
  } = useLoanApplication<MachineryLoanData>(
    'machinery_loan',
    INITIAL_MACHINERY_LOAN_DATA,
    {
      serviceTitle: 'Machinery Loan',
      totalSteps: 4,
      stepLabels: ['Loan Details', 'Business Details', 'Banking', 'Documents & Review'],
      resumeRoute: '/loans/machinery-loan',
    }
  )

  const handleFieldChange = (fields: Partial<MachineryLoanData>) => {
    updateFormData(fields)
    if (Object.keys(fieldErrors).length > 0) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        Object.keys(fields).forEach((key) => {
          delete next[key]
        })
        if (fields.uploadedDocs) {
          Object.keys(fields.uploadedDocs).forEach((docId) => {
            delete next[docId]
          })
        }
        return next
      })
    }
    if (stepError) {
      setStepError(null)
    }
  }

  const validateCurrentStep = (): boolean => {
    setStepError(null)
    setFieldErrors({})
    const validators = [
      () => machineryLoanValidation.validateStep1(formData),
      () => machineryLoanValidation.validateStep2(formData),
      () => machineryLoanValidation.validateStep3(formData),
      () => machineryLoanValidation.validateStep4(formData),
    ]
    const res = validators[currentStep - 1]?.()
    if (res && !res.isValid) {
      setStepError(res.error || (currentStep === 4 ? 'Please accept Terms & Conditions and upload required files.' : 'Please fill in all required fields.'))
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
        const tenureNumber = Number(String(formData.repaymentTenure).replace(/\D/g, '')) || 60
        const app = await loanApplicationService.submitApplication('machinery_loan', {
          loanType: 'machinery_loan',
          title: 'Machinery Loan Application',
          category: 'Capital & Financing',
          requestedAmount: Number(String(formData.loanAmount).replace(/\D/g, '')) || 5000000,
          tenureMonths: tenureNumber,
          details: formData,
        })
        markSubmitted()
        setSubmittedRef(app.referenceNumber || 'TXE-LN-76084608')
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
    } else if (targetStep === currentStep + 1) {
      if (validateCurrentStep()) {
        goToStep(targetStep)
      }
    }
  }

  return (
    <div className="machinery-loan-page" data-testid="machinery-loan-page">
      <h1 className="machinery-loan-page__title">Machinery Loan</h1>

      <FlowStepper
        steps={MACHINERY_LOAN_STEPS}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {stepError && (
        <div className="machinery-loan-page__error-banner" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{stepError}</span>
        </div>
      )}

      <div className="machinery-loan-page__card">
        {currentStep === 1 && (
          <LoanDetails
            data={formData}
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
          <DocumentsAndReview
            data={formData}
            onChange={handleFieldChange}
            onNavigateToStep={(stepNum) => {
              setStepError(null)
              setFieldErrors({})
              goToStep(stepNum)
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
        nextTestId={currentStep === 4 ? 'submit-application-btn' : 'step-continue-btn'}
      />

      <DraftConfirmModal
        isOpen={isDraftModalOpen}
        serviceTitle="Machinery Loan Application"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />

      <LoanSubmitSuccessModal
        isOpen={Boolean(submittedRef)}
        title="Machinery Loan Submitted"
        referenceNumber={submittedRef || ''}
        onDone={() => {
          markSubmitted()
          setSubmittedRef(null)
          safeNavigateTo(navigate, '/loans')
        }}
        onTrackStatus={() => {
          markSubmitted()
          const ref = submittedRef || 'TXE-LN-76084608'
          navigate(`/loans/status/${ref}`, {
            state: { application: submittedApp, formData, refNumber: ref, loanTitle: 'Machinery Loan' },
          })
        }}
      />
    </div>
  )
}

export default MachineryLoan

