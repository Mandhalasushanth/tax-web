import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepActionBar, DraftConfirmModal, FlowStepper } from '@shared/components'

import { useLoanApplication } from '../../hooks/useLoanApplication'
import { loanApplicationService } from '../../services/loanApplicationService'
import { safeNavigateTo } from '../../utils/loanMarketplace.utils'
import type { ProjectFinanceData } from '../../types/projectFinance.types'
import { projectFinanceValidation } from '../../validation/projectFinanceValidation'
import { PROJECT_FINANCE_STEPS, INITIAL_PROJECT_FINANCE_DATA } from './projectFinance.constants'

import {
  ApplicantAndProject,
  LocationLandTechnical,
  CostAndFinancing,
  FinancialProjections,
  PromoterAndManagement,
  DocumentDossier,
  ReviewAndSubmit,
} from './steps'
import { ProjectFinanceSubmitModal } from './steps/ReviewAndSubmit/ProjectFinanceSubmitModal'

import './ProjectFinance.css'

export { PROJECT_FINANCE_STEPS, INITIAL_PROJECT_FINANCE_DATA }

export const ProjectFinance: React.FC = () => {
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
    prevStep,
    isDraftModalOpen,
    setIsDraftModalOpen,
    isSubmitting,
    setIsSubmitting,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
    markSubmitted,
  } = useLoanApplication<ProjectFinanceData>(
    'project_finance',
    INITIAL_PROJECT_FINANCE_DATA,
    {
      serviceTitle: 'Project Finance',
      totalSteps: 7,
      stepLabels: [
        'Applicant & Project',
        'Location, Land & Technical',
        'Cost & Financing',
        'Market & Financials',
        'Promoter & Management',
        'Document Dossier',
        'Review & Submit',
      ],
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
    if (currentStep === 1) {
      const res = projectFinanceValidation.validateStep1(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 2) {
      const res = projectFinanceValidation.validateStep2(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 3) {
      const res = projectFinanceValidation.validateStep3(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 4) {
      const res = projectFinanceValidation.validateStep4(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 5) {
      const res = projectFinanceValidation.validateStep5(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 6) {
      const res = projectFinanceValidation.validateStep6(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 7) {
      const res = projectFinanceValidation.validateStep7(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please accept the declaration before submitting.')
        setFieldErrors(res.errors)
        return false
      }
    }
    return true
  }

  const handleNext = async () => {
    if (!validateCurrentStep()) return

    if (currentStep < 7) {
      setStepError(null)
      setFieldErrors({})
      nextStep()
    } else {
      setIsSubmitting(true)
      try {
        const app = await loanApplicationService.submitApplication('project_finance', {
          loanType: 'project_finance',
          title: 'Project Finance Application',
          category: 'Structured Project Finance',
          requestedAmount: Number(String(formData.debtFundingRequired || formData.debtTermLoanRequested || formData.loanRequiredAmount).replace(/\D/g, '')) || 10000000,
          tenureMonths: 60,
          details: formData,
        })
        markSubmitted()
        setSubmittedRef(app.referenceNumber || 'PF-2026-9842')
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

      <div className="project-finance-page__content">
        {currentStep === 1 && (
          <ApplicantAndProject
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 2 && (
          <LocationLandTechnical
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 3 && (
          <CostAndFinancing
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 4 && (
          <FinancialProjections
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 5 && (
          <PromoterAndManagement
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 6 && (
          <DocumentDossier
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 7 && (
          <ReviewAndSubmit
            data={formData}
            onChange={handleFieldChange}
            onNavigateToStep={(step: number) => {
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
        nextLabel={currentStep === 7 ? (isSubmitting ? 'Submitting...' : 'Submit Application') : 'Save & Continue'}
        nextDisabled={isSubmitting}
        nextTestId={currentStep === 7 ? 'pf-submit-application-btn' : 'pf-step-continue-btn'}
      />

      <DraftConfirmModal
        isOpen={isDraftModalOpen}
        serviceTitle="Project Finance Application"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />

      <ProjectFinanceSubmitModal
        isOpen={Boolean(submittedRef)}
        applicationId={submittedRef || 'PF-2026-9842'}
        onDone={() => {
          markSubmitted()
          setSubmittedRef(null)
          safeNavigateTo(navigate, '/loans')
        }}
      />
    </div>
  )
}

export default ProjectFinance
