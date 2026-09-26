import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepActionBar, DraftConfirmModal, FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'

import { LoanPageNavigation } from '../../components/LoanPageNavigation/LoanPageNavigation'
import { useLoanApplication } from '../../hooks/useLoanApplication'
import { loanApplicationService } from '../../services/loanApplicationService'
import type { HomeLoanData } from './types/homeLoan.types'
import { homeLoanValidation } from './validation/homeLoanValidation'

import { Requirements } from './steps/Requirements/Requirements'
import { EmploymentAndIncome } from './steps/EmploymentAndIncome/EmploymentAndIncome'
import { BankingAndITR } from './steps/BankingAndITR/BankingAndITR'
import { Documents } from './steps/Documents/Documents'
import { ReviewAndSubmit } from './steps/ReviewAndSubmit/ReviewAndSubmit'

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
    saveDraft,
    discardDraft,
  } = useLoanApplication<HomeLoanData>('home_loan', INITIAL_HOME_LOAN_DATA)

  const handleFieldChange = (fields: Partial<HomeLoanData>) => {
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

    if (currentStep === 1) {
      const res = homeLoanValidation.validateStep1(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 2) {
      const res = homeLoanValidation.validateStep2(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 3) {
      const res = homeLoanValidation.validateStep3(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 4) {
      const res = homeLoanValidation.validateStep4(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please upload all mandatory documents before continuing.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 5) {
      const res = homeLoanValidation.validateStep5(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please accept the Terms & Conditions before submitting.')
        setFieldErrors(res.errors)
        return false
      }
    }
    return true
  }

  const handleNext = async () => {
    if (!validateCurrentStep()) return

    if (currentStep < 5) {
      nextStep()
    } else {
      setIsSubmitting(true)
      try {
        const app = await loanApplicationService.submitApplication('home_loan', {
          loanType: 'home_loan',
          title: 'Home Loan Application',
          category: 'Capital & Financing',
          requestedAmount: Number(String(formData.loanAmount).replace(/\D/g, '')) || 5000000,
          tenureMonths: (formData.repaymentTenureYears || 20) * 12,
          details: formData,
        })
        navigate(`/loans/status/${app.referenceNumber}`, {
          state: { formData, refNumber: app.referenceNumber },
        })
      } catch (err: unknown) {
        setStepError(err instanceof Error ? err.message : 'Submission failed. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      setStepError(null)
      setFieldErrors({})
      goToStep(stepNumber)
    } else if (stepNumber === currentStep + 1 && validateCurrentStep()) {
      setStepError(null)
      setFieldErrors({})
      goToStep(stepNumber)
    }
  }

  return (
    <div className="home-loan-page">
      <LoanPageNavigation title="Home Loan" />

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
        showBack={currentStep > 1}
        onBack={() => {
          setStepError(null)
          setFieldErrors({})
          prevStep()
        }}
        onNext={handleNext}
        onSaveDraft={() => setIsDraftModalOpen(true)}
        saveDraftLabel="Save Draft"
        nextLabel={currentStep === 5 ? (isSubmitting ? 'Submitting...' : 'Submit Application') : 'Continue'}
        nextDisabled={isSubmitting}
      />

      <DraftConfirmModal
        isOpen={isDraftModalOpen}
        serviceTitle="Home Loan Application"
        onSaveAndExit={() => {
          saveDraft()
          navigate('/loans')
        }}
        onDiscardAndExit={() => {
          discardDraft()
          navigate('/loans')
        }}
        onKeepEditing={() => setIsDraftModalOpen(false)}
      />
    </div>
  )
}

export default HomeLoan
