import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepActionBar, DraftConfirmModal, FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'
import { useLoanApplication } from '../../hooks/useLoanApplication'
import { loanApplicationService } from '../../services/loanApplicationService'
import { validatePropertyLoanStep } from '../../validation/propertyLoanValidation'
import { LoanSubmitSuccessModal } from '../../shared'
import type { LoanApplicationBase } from '../../types/loanApplication.types'
import type { PropertyLoanData } from '../../types/propertyLoan.types'
import {
  LoanRequirement,
  ApplicantIncome,
  PropertyDetails,
  Ownership,
  Documents,
  Review,
} from './steps'
import './PropertyLoan.css'

const INITIAL_PROPERTY_LOAN_DATA: PropertyLoanData = {
  // Step 1: Loan Requirement
  titleHolderName: '',
  titleHolderMobile: '',
  titleHolderEmail: '',
  titleHolderPan: '',
  titleHolderAadhaar: '',
  titleHolderDob: '',
  titleHolderAddress: '',

  loanPurpose: '',
  requiredAmount: '',
  tenureYears: '',
  applicantType: '',
  isExistingCustomer: null,

  // Step 2: Applicant & Income
  personalFullName: '',
  personalPan: '',
  personalMobile: '',
  personalDob: '',
  personalAddress: '',

  gender: '',
  maritalStatus: '',
  residenceType: '',
  yearsAtCurrentAddress: '',

  employerCategory: '',
  employerName: '',
  totalExperience: '',
  yearsInCurrentJob: '',
  annualIncome: '',

  hasExistingLoans: null,
  bankName: '',
  accountNumber: '',
  ifscCode: '',

  // Step 3: Property Details
  propertyPincode: '',
  propertyCity: '',
  propertyDistrict: '',
  propertyState: '',
  propertyAddress: '',
  propertyLandmark: '',

  propertyType: '',
  propertySubType: '',
  constructionStatus: '',
  currentUsage: '',
  areaType: '',
  propertyArea: '',
  propertyAge: '',
  approvingAuthority: '',
  estimatedMarketValue: '',

  // Step 4: Ownership
  ownershipType: 'sole',
  coOwnerFullName: '',
  coOwnerRelationship: '',
  coOwnerPan: '',
  coOwnerMobile: '',

  currentLender: '',
  existingLoanType: '',
  outstandingLoanAmount: '',
  ownershipConfirmed: false,

  // Step 5: Documents
  uploadedDocs: {},

  // Step 6: Review & Declaration
  declarationAgreed: false,
  inspectionAgreed: false,
  cibilConsentAgreed: false,
}

const PROPERTY_LOAN_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'Loan Requirement', shortLabel: 'Loan Requirement' },
  { stepNumber: 2, title: 'Applicant & Income', shortLabel: 'Applicant & Income' },
  { stepNumber: 3, title: 'Property Details', shortLabel: 'Property Details' },
  { stepNumber: 4, title: 'Ownership', shortLabel: 'Ownership' },
  { stepNumber: 5, title: 'Documents', shortLabel: 'Documents' },
  { stepNumber: 6, title: 'Review', shortLabel: 'Review' },
]

export const PropertyLoan: React.FC = () => {
  const navigate = useNavigate()
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [stepError, setStepError] = useState<string | null>(null)
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
  } = useLoanApplication<PropertyLoanData>(
    'property_loan',
    INITIAL_PROPERTY_LOAN_DATA,
    {
      serviceTitle: 'Loan Against Property',
      totalSteps: 6,
      stepLabels: PROPERTY_LOAN_STEPS.map((s) => s.title || ''),
      resumeRoute: '/loans/property-loan',
    }
  )

  const handleFieldChange = (fields: Partial<PropertyLoanData>) => {
    updateFormData(fields)
    try {
      const hasErrors = Object.keys(fieldErrors).length > 0
      hasErrors && setFieldErrors((prev) => {
        const next = { ...prev }
        Object.keys(fields).forEach((key) => {
          delete next[key]
        })
        const uploaded = fields.uploadedDocs
        uploaded && Object.keys(uploaded).forEach((docId) => {
          delete next[docId]
        })
        return next
      })
      const hasStepError = Boolean(stepError)
      hasStepError && setStepError(null)
    } catch {
      // safe fallback
    }
  }

  const validateCurrentStep = (): boolean => {
    setStepError(null)
    setFieldErrors({})
    try {
      const errs = validatePropertyLoanStep(currentStep, formData)
      const hasErrors = Object.keys(errs).length > 0
      hasErrors && (() => {
        const stepMessages: Record<number, string> = {
          5: 'Please upload all required documents before proceeding.',
          6: 'Please accept the authorization declaration before submitting.',
        }
        const error = new Error(stepMessages[currentStep] || 'Please complete all required fields correctly before proceeding.')
        Object.assign(error, { validationErrors: errs })
        throw error
      })()
      return true
    } catch (err: unknown) {
      try {
        const customErr = err as Error & { validationErrors?: Record<string, string> }
        customErr.validationErrors && setFieldErrors(customErr.validationErrors)
        setStepError(customErr.message || 'Please complete all required fields correctly before proceeding.')
      } catch {
        setStepError('Validation error occurred.')
      }
      return false
    }
  }

  const handleNext = async () => {
    try {
      const isValid = validateCurrentStep()
      isValid || (() => { throw new Error('VALIDATION_FAILED') })()

      const actions: Record<string, () => Promise<void> | void> = {
        proceed: () => nextStep(),
        submit: async () => {
          setIsSubmitting(true)
          try {
            const tenureMonths = (parseInt(formData.tenureYears, 10) || 0) * 12
            const rawAmount = parseFloat(String(formData.requiredAmount || '').replace(/,/g, '')) || 0
            const app = await loanApplicationService.submitApplication('property_loan', {
              loanType: 'property_loan',
              category: 'Mortgage & Secured Finance',
              requestedAmount: rawAmount,
              tenureMonths,
              details: {
                ...formData,
                purposeOfLoan: formData.loanPurpose || 'Loan Against Property',
                propertyAddress: formData.propertyAddress,
                propertyEstimatedValue: formData.estimatedMarketValue,
              },
            })
            markSubmitted()
            setSubmittedApp(app)
            setSubmittedRef(app.referenceNumber || app.id || '')
          } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : 'Submission failed. Please try again.'
            setStepError(errorMsg)
          } finally {
            setIsSubmitting(false)
          }
        },
      }

      const actionKey = currentStep < 6 ? 'proceed' : 'submit'
      await actions[actionKey]()
    } catch (err: unknown) {
      // Controlled via exception handling
    }
  }

  const handlePrev = () => {
    try {
      currentStep <= 1 && (() => { throw new Error('SHOW_DRAFT_MODAL') })()
      prevStep()
      setStepError(null)
      setFieldErrors({})
    } catch {
      setIsDraftModalOpen(true)
    }
  }

  const handleStepClick = (targetStep: number) => {
    try {
      targetStep < currentStep && (() => {
        goToStep(targetStep)
        setStepError(null)
        setFieldErrors({})
        throw new Error('NAVIGATED_BACK')
      })()

      targetStep === currentStep + 1 && (() => {
        const isValid = validateCurrentStep()
        isValid && goToStep(targetStep)
      })()
    } catch {
      // Controlled via exception handling
    }
  }

  return (
    <div className="property-loan-page" data-testid="property-loan-page">
      <h1 className="property-loan-page__title">Loan Against Property</h1>

      {/* FlowStepper for full desktop progress */}
      <FlowStepper
        steps={PROPERTY_LOAN_STEPS}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {stepError && (
        <div className="property-loan-page__error-banner" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{stepError}</span>
        </div>
      )}

      {/* Active Step Content */}
      <div className="property-loan-page__card">
        {currentStep === 1 && (
          <LoanRequirement
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 2 && (
          <ApplicantIncome
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 3 && (
          <PropertyDetails
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 4 && (
          <Ownership
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 5 && (
          <Documents
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 6 && (
          <Review
            data={formData}
            onChange={handleFieldChange}
            onNavigateToStep={goToStep}
            errors={fieldErrors}
          />
        )}
      </div>

      {/* Sticky Step Navigation Action Bar */}
      <StepActionBar
        onBack={handlePrev}
        onNext={handleNext}
        onSaveDraft={() => setIsDraftModalOpen(true)}
        saveDraftLabel="Save Draft & Exit"
        nextLabel={currentStep === 6 ? (isSubmitting ? 'Submitting...' : 'Submit Application') : 'Continue'}
        nextDisabled={isSubmitting}
        nextTestId={currentStep === 6 ? 'property-submit-application-btn' : 'property-step-continue-btn'}
      />

      {/* Draft Save Confirmation Modal */}
      <DraftConfirmModal
        isOpen={isDraftModalOpen}
        serviceTitle="Loan Against Property Application"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />

      {/* Loan Submit Success Modal */}
      <LoanSubmitSuccessModal
        isOpen={Boolean(submittedRef)}
        title="Loan Against Property Submitted"
        referenceNumber={submittedRef || ''}
        message="Your Loan Against Property application has been successfully received. A TaxEdge Loan Advisor will review your property dossier and contact you shortly."
        onTrackStatus={() => {
          const ref = submittedRef || submittedApp?.referenceNumber || submittedApp?.id || ''
          navigate(`/loans/status/${ref}`, {
            state: { application: submittedApp, formData, refNumber: ref, loanTitle: 'Loan Against Property' },
          })
        }}
      />
    </div>
  )
}

export default PropertyLoan
