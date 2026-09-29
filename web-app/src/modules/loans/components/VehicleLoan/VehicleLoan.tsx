import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepActionBar, DraftConfirmModal, FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'

import { useLoanApplication } from '../../hooks/useLoanApplication'
import { loanApplicationService } from '../../services/loanApplicationService'
import type { LoanApplicationBase } from '../../types/loanApplication.types'
import type { VehicleLoanData } from '../../types/vehicleLoan.types'
import { vehicleLoanValidation } from '../../validation/vehicleLoanValidation'

import { VehicleRequirements } from './steps/VehicleRequirements/VehicleRequirements'
import { ApplicantDetails } from './steps/ApplicantDetails/ApplicantDetails'
import { BankingDetails } from './steps/BankingDetails/BankingDetails'
import { DocumentDossier } from './steps/DocumentDossier/DocumentDossier'
import { ReviewAndDeclaration } from './steps/ReviewAndDeclaration/ReviewAndDeclaration'
import { LoanSubmitSuccessModal } from '../../shared'

import './VehicleLoan.css'

const VEHICLE_LOAN_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'Vehicle & Loan Requirements', shortLabel: 'Requirements' },
  { stepNumber: 2, title: 'Employment & Income', shortLabel: 'Employment' },
  { stepNumber: 3, title: 'Banking & ITR', shortLabel: 'Banking & ITR' },
  { stepNumber: 4, title: 'Document Dossier', shortLabel: 'Documents' },
  { stepNumber: 5, title: 'Review & Submit', shortLabel: 'Review & Submit' },
]

const INITIAL_VEHICLE_LOAN_DATA: VehicleLoanData = {
  loanAmount: '',
  vehicleCategory: '',
  repaymentTenure: '',
  vehicleCondition: 'New Vehicle',
  vehicleMakeModel: '',
  customVehicleMakeModel: '',
  onRoadPrice: '',
  downPayment: '',
  occupationType: 'Business Owner',
  monthlyIncomeRange: '',
  legalBusinessName: '',
  gstin: '',
  udyamNumber: '',
  businessVintageYears: '',
  annualTurnover: '',
  hasActiveEmis: false,
  totalMonthlyEmi: '',
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  branchName: '',
  itrStatus: 'Filed',
  itrAckNumber: '',
  grossAnnualIncomeItr: '',
  uploadedDocs: {},
  termsAccepted: false,
}

export const VehicleLoan: React.FC = () => {
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
  } = useLoanApplication<VehicleLoanData>(
    'vehicle_loan',
    INITIAL_VEHICLE_LOAN_DATA,
    {
      serviceTitle: 'Vehicle Loan',
      totalSteps: 5,
      stepLabels: [
        'Vehicle & Loan Requirements',
        'Employment & Income',
        'Banking & ITR',
        'Document Dossier',
        'Review & Submit',
      ],
      resumeRoute: '/loans/vehicle-loan',
    }
  )

  const handleFieldChange = (fields: Partial<VehicleLoanData>) => {
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
      () => vehicleLoanValidation.validateStep1(formData),
      () => vehicleLoanValidation.validateStep2(formData),
      () => vehicleLoanValidation.validateStep3(formData),
      () => vehicleLoanValidation.validateStep4(formData),
      () => vehicleLoanValidation.validateStep5(formData),
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

    if (currentStep < 5) {
      nextStep()
    } else {
      setIsSubmitting(true)
      try {
        const tenureMatch = String(formData.repaymentTenure).match(/\d+/)
        const tenureMonths = tenureMatch ? Number(tenureMatch[0]) * (String(formData.repaymentTenure).includes('Year') || String(formData.repaymentTenure).includes('Yr') ? 12 : 1) : 60
        const app = await loanApplicationService.submitApplication('vehicle_loan', {
          loanType: 'vehicle_loan',
          title: 'Vehicle Loan Application',
          category: 'Vehicle & Auto Finance',
          requestedAmount: Number(String(formData.loanAmount).replace(/\D/g, '')) || 1000000,
          tenureMonths,
          details: formData,
        })
        setSubmittedRef(app.referenceNumber || 'TXE-LN-93820124')
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
      if (validateCurrentStep()) {
        goToStep(targetStep)
      }
    }
  }

  return (
    <div className="vehicle-loan-page" data-testid="vehicle-loan-page">
      <h1 className="vehicle-loan-page__title">Vehicle Loan</h1>

      <FlowStepper
        steps={VEHICLE_LOAN_STEPS}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {stepError && (
        <div className="vehicle-loan-page__error-banner" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{stepError}</span>
        </div>
      )}

      <div className="vehicle-loan-page__card">
        {currentStep === 1 && (
          <VehicleRequirements
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 2 && (
          <ApplicantDetails
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 3 && (
          <BankingDetails
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 4 && (
          <DocumentDossier
            data={formData}
            onChange={handleFieldChange}
            errors={fieldErrors}
          />
        )}
        {currentStep === 5 && (
          <ReviewAndDeclaration
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
        nextLabel={currentStep === 5 ? (isSubmitting ? 'Submitting...' : 'Submit Application') : 'Continue'}
        nextDisabled={isSubmitting}
        nextTestId={currentStep === 5 ? 'submit-application-btn' : 'step-continue-btn'}
      />

      <DraftConfirmModal
        isOpen={isDraftModalOpen}
        serviceTitle="Vehicle Loan Application"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />

      <LoanSubmitSuccessModal
        isOpen={Boolean(submittedRef)}
        title="Vehicle Loan Submitted"
        referenceNumber={submittedRef || ''}
        onTrackStatus={() => {
          const ref = submittedRef || 'TXE-LN-93820124'
          navigate(`/loans/status/${ref}`, {
            state: { application: submittedApp, formData, refNumber: ref, loanTitle: 'Vehicle Loan' },
          })
        }}
      />
    </div>
  )
}

export default VehicleLoan
