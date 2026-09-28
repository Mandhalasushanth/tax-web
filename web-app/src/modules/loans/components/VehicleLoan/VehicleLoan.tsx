import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepActionBar, DraftConfirmModal, FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'

import { LoanPageNavigation } from '../LoanPageNavigation/LoanPageNavigation'
import { useLoanApplication } from '../../hooks/useLoanApplication'
import { loanApplicationService } from '../../services/loanApplicationService'
import type { VehicleLoanData } from '../../types/vehicleLoan.types'
import { vehicleLoanValidation } from '../../validation/vehicleLoanValidation'

import { VehicleRequirements } from './steps/VehicleRequirements/VehicleRequirements'
import { ApplicantDetails } from './steps/ApplicantDetails/ApplicantDetails'
import { BankingDetails } from './steps/BankingDetails/BankingDetails'
import { DocumentsAndReview } from './steps/DocumentsAndReview/DocumentsAndReview'
import { LoanSubmitModal } from '../MachineryLoan/steps/LoanSubmitModal/LoanSubmitModal'

import './VehicleLoan.css'

const VEHICLE_LOAN_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'Vehicle & Loan Requirements', shortLabel: 'Requirements' },
  { stepNumber: 2, title: 'Employment & Income', shortLabel: 'Employment' },
  { stepNumber: 3, title: 'Banking Details', shortLabel: 'Banking' },
  { stepNumber: 4, title: 'Documents & Review', shortLabel: 'Documents & Review' },
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
  exactMonthlyIncome: '',
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
  uploadedDocs: {},
  termsAccepted: false,
}

export const VehicleLoan: React.FC = () => {
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
  } = useLoanApplication<VehicleLoanData>(
    'vehicle_loan',
    INITIAL_VEHICLE_LOAN_DATA,
    {
      serviceTitle: 'Vehicle Loan',
      totalSteps: 4,
      stepLabels: ['Vehicle & Loan Requirements', 'Applicant & Employment', 'Banking Details', 'Documents & Review'],
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

    if (currentStep === 1) {
      const res = vehicleLoanValidation.validateStep1(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required vehicle and loan fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 2) {
      const res = vehicleLoanValidation.validateStep2(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all required applicant details.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 3) {
      const res = vehicleLoanValidation.validateStep3(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please fill in all banking fields.')
        setFieldErrors(res.errors)
        return false
      }
    } else if (currentStep === 4) {
      const res = vehicleLoanValidation.validateStep4(formData)
      if (!res.isValid) {
        setStepError(res.error || 'Please accept the declaration and upload required documents.')
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
        const tenureMatch = String(formData.repaymentTenure).match(/\d+/)
        const tenureMonths = tenureMatch ? Number(tenureMatch[0]) * (String(formData.repaymentTenure).includes('Year') ? 12 : 1) : 60
        const app = await loanApplicationService.submitApplication('vehicle_loan', {
          loanType: 'vehicle_loan',
          title: 'Vehicle Loan Application',
          category: 'Vehicle & Auto Finance',
          requestedAmount: Number(String(formData.loanAmount).replace(/\D/g, '')) || 1000000,
          tenureMonths,
          details: formData,
        })
        setSubmittedRef(app.referenceNumber || 'TXE-LN-93820124')
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
    <div className="vehicle-loan-page">
      <LoanPageNavigation
        title="Vehicle Loan"
        showBack={true}
        onBack={() => setIsDraftModalOpen(true)}
      />

      <FlowStepper
        steps={VEHICLE_LOAN_STEPS}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {stepError && (
        <div className="vehicle-loan-page__error-banner" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, flexShrink: 0 }}>
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
        serviceTitle="Vehicle Loan Application"
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
          const ref = submittedRef || 'TXE-LN-93820124'
          navigate(`/loans/status/${ref}`, {
            state: { formData, refNumber: ref, loanTitle: 'Vehicle Loan' },
          })
        }}
      />
    </div>
  )
}

export default VehicleLoan
