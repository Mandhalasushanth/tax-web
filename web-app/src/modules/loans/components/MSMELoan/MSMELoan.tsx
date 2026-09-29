import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepActionBar, DraftConfirmModal, FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'

import { useLoanApplication } from '../../hooks/useLoanApplication'
import { loanApplicationService } from '../../services/loanApplicationService'
import type { LoanApplicationBase } from '../../types/loanApplication.types'
import type { MsmeLoanData } from '../../types/msmeLoan.types'
import { msmeLoanValidation } from '../../validation/msmeLoanValidation'

import { MsmeProfile } from './steps/MsmeProfile/MsmeProfile'
import { BusinessAndBanking } from './steps/BusinessAndBanking/BusinessAndBanking'
import { MsmeDocuments } from './steps/MsmeDocuments/MsmeDocuments'
import { MsmeReview } from './steps/MsmeReview/MsmeReview'
import { LoanSubmitSuccessModal } from '../../shared'

import './MSMELoan.css'

const MSME_LOAN_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'MSME Profile & Loan', shortLabel: 'MSME Profile' },
  { stepNumber: 2, title: 'Business & Banking', shortLabel: 'Business' },
  { stepNumber: 3, title: 'Document Dossier', shortLabel: 'Documents' },
  { stepNumber: 4, title: 'Review & Submit', shortLabel: 'Review' },
]

const INITIAL_MSME_LOAN_DATA: MsmeLoanData = {
  requiredLoanAmount: '',
  loanPurpose: '',
  repaymentTenure: '',
  hasActiveBorrowings: false,
  totalExistingEmiOutgo: '',
  registeredBusinessName: '',
  businessConstitution: '',
  gstin: '',
  hasUdyam: '',
  udyamRegistrationNumber: '',
  businessVintage: '',
  annualTurnover: '',
  annualNetProfit: '',
  primaryBankName: '',
  currentAccountNumber: '',
  bankIfscCode: '',
  itrFilingStatus: '',
  itrAcknowledgementNumber: '',
  uploadedDocs: {},
  termsAccepted: false,
}

export const MSMELoan: React.FC = () => {
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
  } = useLoanApplication<MsmeLoanData>(
    'msme_loan',
    INITIAL_MSME_LOAN_DATA,
    {
      serviceTitle: 'MSME Loan',
      totalSteps: 4,
      stepLabels: ['MSME Profile & Loan', 'Business & Banking', 'Document Dossier', 'Review & Submit'],
      resumeRoute: '/loans/msme-loan',
    }
  )

  const handleFieldChange = (fields: Partial<MsmeLoanData>) => {
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
      () => msmeLoanValidation.validateStep1(formData),
      () => msmeLoanValidation.validateStep2(formData),
      () => msmeLoanValidation.validateStep3(formData),
      () => msmeLoanValidation.validateStep4(formData),
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
        const tenureMonths = Number(String(formData.repaymentTenure).replace(/\D/g, '')) || 36
        const app = await loanApplicationService.submitApplication('msme_loan', {
          loanType: 'msme_loan',
          title: 'MSME Loan Application',
          category: 'MSME & SME Finance',
          requestedAmount: Number(String(formData.requiredLoanAmount).replace(/\D/g, '')) || 2500000,
          tenureMonths,
          details: formData,
        })
        setSubmittedRef(app.referenceNumber || 'TXE-LN-MSME-001')
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
    <div className="msme-loan-page" data-testid="msme-loan-page">
      <h1 className="msme-loan-page__title">MSME Loan</h1>

      <FlowStepper
        steps={MSME_LOAN_STEPS}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {stepError && (
        <div className="msme-loan-page__error-banner" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{stepError}</span>
        </div>
      )}

      <div className="msme-loan-page__card">
        {currentStep === 1 && (
          <MsmeProfile
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
          <MsmeDocuments
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 4 && (
          <MsmeReview
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
        nextTestId={currentStep === 4 ? 'msme-submit-application-btn' : 'msme-step-continue-btn'}
      />

      <DraftConfirmModal
        isOpen={isDraftModalOpen}
        serviceTitle="MSME Loan Application"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />

      <LoanSubmitSuccessModal
        isOpen={Boolean(submittedRef)}
        title="MSME Loan Submitted"
        referenceNumber={submittedRef || ''}
        message="Your MSME Loan application has been successfully received. A TaxEdge MSME Finance Advisor will review your dossier and contact you shortly."
        onTrackStatus={() => {
          const ref = submittedRef || 'TXE-LN-MSME-001'
          navigate(`/loans/status/${ref}`, {
            state: { application: submittedApp, formData, refNumber: ref, loanTitle: 'MSME Loan' },
          })
        }}
      />
    </div>
  )
}

export default MSMELoan
