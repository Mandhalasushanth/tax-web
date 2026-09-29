import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepActionBar, DraftConfirmModal, FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'

import { useLoanApplication } from '../../hooks/useLoanApplication'
import { loanApplicationService } from '../../services/loanApplicationService'
import type { LoanApplicationBase } from '../../types/loanApplication.types'
import type { ProjectFinanceData } from '../../types/projectFinance.types'
import { projectFinanceValidation } from '../../validation/projectFinanceValidation'

import { ProjectDetails } from './steps/ProjectDetails/ProjectDetails'
import { PromoterAndCollateral } from './steps/PromoterAndCollateral/PromoterAndCollateral'
import { ProjectDocuments } from './steps/ProjectDocuments/ProjectDocuments'
import { ProjectReview } from './steps/ProjectReview/ProjectReview'
import { LoanSubmitSuccessModal } from '../../shared'

import './ProjectFinance.css'

const PROJECT_FINANCE_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'Project Details', shortLabel: 'Project' },
  { stepNumber: 2, title: 'Promoter & Collateral', shortLabel: 'Promoter' },
  { stepNumber: 3, title: 'Document Dossier', shortLabel: 'Documents' },
  { stepNumber: 4, title: 'Review & Submit', shortLabel: 'Review' },
]

const INITIAL_PROJECT_FINANCE_DATA: ProjectFinanceData = {
  projectName: '',
  projectSector: '',
  projectLocation: '',
  projectDescription: '',
  totalProjectCost: '',
  debtFundingRequired: '',
  equityContribution: '',
  preferredFinanceType: '',
  repaymentTenure: '',
  promoterEntityName: '',
  promoterConstitution: '',
  promoterPan: '',
  promoterCibilScore: '',
  promoterNetWorth: '',
  priorProjectExperience: '',
  collateralType: '',
  collateralDescription: '',
  disbursementBankName: '',
  disbursementAccountNumber: '',
  disbursementIfscCode: '',
  uploadedDocs: {},
  termsAccepted: false,
}

export const ProjectFinance: React.FC = () => {
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
  } = useLoanApplication<ProjectFinanceData>(
    'project_finance',
    INITIAL_PROJECT_FINANCE_DATA,
    {
      serviceTitle: 'Project Finance',
      totalSteps: 4,
      stepLabels: ['Project Details', 'Promoter & Collateral', 'Document Dossier', 'Review & Submit'],
      resumeRoute: '/loans/project-finance',
    }
  )

  const handleFieldChange = (fields: Partial<ProjectFinanceData>) => {
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
      () => projectFinanceValidation.validateStep1(formData),
      () => projectFinanceValidation.validateStep2(formData),
      () => projectFinanceValidation.validateStep3(formData),
      () => projectFinanceValidation.validateStep4(formData),
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
        const tenureMonths = Number(String(formData.repaymentTenure).replace(/\D/g, '')) || 60
        const app = await loanApplicationService.submitApplication('project_finance', {
          loanType: 'project_finance',
          title: 'Project Finance Application',
          category: 'Structured Project Finance',
          requestedAmount: Number(String(formData.debtFundingRequired).replace(/\D/g, '')) || 10000000,
          tenureMonths,
          details: formData,
        })
        setSubmittedRef(app.referenceNumber || 'TXE-LN-PF-001')
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
    <div className="project-finance-page" data-testid="project-finance-page">
      <h1 className="project-finance-page__title">Project Finance</h1>

      <FlowStepper
        steps={PROJECT_FINANCE_STEPS}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {stepError && (
        <div className="project-finance-page__error-banner" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{stepError}</span>
        </div>
      )}

      <div className="project-finance-page__card">
        {currentStep === 1 && (
          <ProjectDetails
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 2 && (
          <PromoterAndCollateral
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 3 && (
          <ProjectDocuments
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 4 && (
          <ProjectReview
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
        nextTestId={currentStep === 4 ? 'pf-submit-application-btn' : 'pf-step-continue-btn'}
      />

      <DraftConfirmModal
        isOpen={isDraftModalOpen}
        serviceTitle="Project Finance Application"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />

      <LoanSubmitSuccessModal
        isOpen={Boolean(submittedRef)}
        title="Project Finance Submitted"
        referenceNumber={submittedRef || ''}
        message="Your Project Finance application has been received. A Senior TaxEdge Finance Advisor will conduct a preliminary appraisal and reach out within 2–3 business days."
        onTrackStatus={() => {
          const ref = submittedRef || 'TXE-LN-PF-001'
          navigate(`/loans/status/${ref}`, {
            state: { application: submittedApp, formData, refNumber: ref, loanTitle: 'Project Finance' },
          })
        }}
      />
    </div>
  )
}

export default ProjectFinance
