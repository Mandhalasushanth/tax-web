import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepActionBar, DraftConfirmModal, FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'

import { LoanPageNavigation } from '../LoanPageNavigation/LoanPageNavigation'
import { useLoanApplication } from '../../hooks/useLoanApplication'
import { loanApplicationService } from '../../services/loanApplicationService'
import type { WorkingCapitalLoanData } from '../../types/workingCapitalLoan.types'
import { workingCapitalLoanValidation } from '../../validation/workingCapitalLoanValidation'

import { Financials } from './steps/Financials/Financials'
import { BusinessAndBanking } from './steps/BusinessAndBanking/BusinessAndBanking'
import { Documents } from './steps/Documents/Documents'
import { ReviewAndSubmit } from './steps/ReviewAndSubmit/ReviewAndSubmit'
import { LoanSubmitModal } from './steps/LoanSubmitModal/LoanSubmitModal'

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
  const navigate = useNavigate()
  const [stepError, setStepError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [submittedRef, setSubmittedRef] = useState<string | null>(null)

  const {
    formData,
    updateFormData,
    currentStep,
    goToStep,
    nextStep,
    isDraftModalOpen,
    setIsDraftModalOpen,
    isSubmitting,
    setIsSubmitting,
    saveDraft,
    discardDraft,
  } = useLoanApplication<WorkingCapitalLoanData>(
    'working_capital_loan',
    INITIAL_WORKING_CAPITAL_LOAN_DATA,
    {
      serviceTitle: 'Working Capital Loan',
      totalSteps: 4,
      stepLabels: ['Financials', 'Business & Banking', 'Documents', 'Review & Submit'],
      resumeRoute: '/loans/working-capital-loan',
    }
  )

  const handleFieldChange = (fields: Partial<WorkingCapitalLoanData>) => {
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
      const res = workingCapitalLoanValidation.validateStep1(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 2) {
      const res = workingCapitalLoanValidation.validateStep2(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 3) {
      const res = workingCapitalLoanValidation.validateStep3(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please upload all mandatory documents.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 4) {
      const res = workingCapitalLoanValidation.validateStep4(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please accept the authorization declaration.')
        setFieldErrors(res.errors)
        return false
      }
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
        const app = await loanApplicationService.submitApplication('working_capital_loan', {
          loanType: 'working_capital_loan',
          title: 'Working Capital Loan Application',
          category: 'Working Capital & Credit Lines',
          requestedAmount: Number(String(formData.requiredCreditLimit).replace(/\D/g, '')) || 2500000,
          tenureMonths: 12,
          details: formData,
        })
        setSubmittedRef(app.referenceNumber || 'TXE-LN-84920184')
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
    } else if (targetStep > currentStep) {
      if (validateCurrentStep()) {
        goToStep(targetStep)
      }
    }
  }

  const handleTrackStatus = () => {
    const ref = submittedRef || 'TXE-LN-499927'
    setSubmittedRef(null)
    navigate(`/loans/status/${ref}`, {
      state: {
        refNumber: ref,
        formData,
        loanTitle: 'Working Capital',
      },
    })
  }

  return (
    <div className="working-capital-page">
      {/* 1. Header Navigation */}
      <LoanPageNavigation
        title="Working Capital"
        showBack={false}
      />

      {/* 2. Stepper Header */}
      <div className="working-capital-stepper-container">
        <FlowStepper
          steps={WORKING_CAPITAL_LOAN_STEPS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </div>

      {/* 3. Main Form Canvas */}
      <div className="working-capital-content">
        {stepError && (
          <div className="working-capital-step-error-banner" role="alert">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="working-capital-step-error-banner__icon">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="working-capital-step-error-banner__text">{stepError}</span>
          </div>
        )}

        {currentStep === 1 && (
          <Financials
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}

        {currentStep === 2 && (
          <BusinessAndBanking
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
          <ReviewAndSubmit
            data={formData}
            onChange={handleFieldChange}
            onNavigateToStep={(step) => goToStep(step)}
            errors={fieldErrors}
          />
        )}
      </div>

      {/* 4. Action Bar */}
      <StepActionBar
        showBack={false}
        onNext={handleNext}
        onSaveDraft={() => setIsDraftModalOpen(true)}
        saveDraftLabel="Save Draft"
        nextLabel={currentStep === 4 ? (isSubmitting ? 'Submitting...' : 'Submit Application') : 'Continue'}
        nextDisabled={isSubmitting}
      />

      {/* 5. Draft Confirmation Modal */}
      <DraftConfirmModal
        isOpen={isDraftModalOpen}
        serviceTitle="Working Capital Loan Application"
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

      {/* 6. Submit Success Modal */}
      <LoanSubmitModal
        isOpen={Boolean(submittedRef)}
        referenceNumber={submittedRef || ''}
        onTrackStatus={handleTrackStatus}
      />
    </div>
  )
}

export default WorkingCapitalLoan
