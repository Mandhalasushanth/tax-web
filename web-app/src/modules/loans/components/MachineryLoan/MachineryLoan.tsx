import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepActionBar, DraftConfirmModal, FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'

import { LoanPageNavigation } from '../LoanPageNavigation/LoanPageNavigation'
import { useLoanApplication } from '../../hooks/useLoanApplication'
import { loanApplicationService } from '../../services/loanApplicationService'
import type { MachineryLoanData } from '../../types/machineryLoan.types'
import { machineryLoanValidation } from '../../validation/machineryLoanValidation'

import { LoanDetails } from './steps/LoanDetails/LoanDetails'
import { BusinessDetails } from './steps/BusinessDetails/BusinessDetails'
import { Banking } from './steps/Banking/Banking'
import { DocumentsAndReview } from './steps/DocumentsAndReview/DocumentsAndReview'
import { LoanSubmitModal } from './steps/LoanSubmitModal/LoanSubmitModal'

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

    if (currentStep === 1) {
      const res = machineryLoanValidation.validateStep1(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 2) {
      const res = machineryLoanValidation.validateStep2(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 3) {
      const res = machineryLoanValidation.validateStep3(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 4) {
      const res = machineryLoanValidation.validateStep4(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please accept Terms & Conditions and upload required files.')
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
        const tenureNumber = Number(String(formData.repaymentTenure).replace(/\D/g, '')) || 60
        const app = await loanApplicationService.submitApplication('machinery_loan', {
          loanType: 'machinery_loan',
          title: 'Machinery Loan Application',
          category: 'Capital & Financing',
          requestedAmount: Number(String(formData.loanAmount).replace(/\D/g, '')) || 5000000,
          tenureMonths: tenureNumber,
          details: formData,
        })
        setSubmittedRef(app.referenceNumber || 'TXE-LN-76084608')
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
    <div className="machinery-loan-page">
      <LoanPageNavigation
        title="Machinery Loan"
        showBack={false}
      />

      <FlowStepper
        steps={MACHINERY_LOAN_STEPS}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {stepError && (
        <div className="machinery-loan-page__error-banner" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, flexShrink: 0 }}>
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
        showBack={false}
        onNext={handleNext}
        onSaveDraft={() => setIsDraftModalOpen(true)}
        saveDraftLabel="Save Draft"
        nextLabel={currentStep === 4 ? (isSubmitting ? 'Submitting...' : 'Submit Application') : 'Continue'}
        nextDisabled={isSubmitting}
      />

      <DraftConfirmModal
        isOpen={isDraftModalOpen}
        serviceTitle="Machinery Loan Application"
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

      <LoanSubmitModal
        isOpen={Boolean(submittedRef)}
        referenceNumber={submittedRef || ''}
        onTrackStatus={() => {
          const ref = submittedRef || 'TXE-LN-76084608'
          navigate(`/loans/status/${ref}`, {
            state: { formData, refNumber: ref },
          })
        }}
      />
    </div>
  )
}

export default MachineryLoan

