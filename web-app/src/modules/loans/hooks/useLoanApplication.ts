import { useState, useCallback } from 'react'
import { userStorage } from '@core/storage/userStorage'
import { useAppStore } from '@store/index'
import { loanApplicationService } from '../services/loanApplicationService'

export interface UseLoanApplicationOptions {
  serviceTitle?: string
  totalSteps?: number
  stepLabels?: string[]
  resumeRoute?: string
}

export function useLoanApplication<T extends object>(
  loanType: string,
  initialValues: T,
  options?: UseLoanApplicationOptions
) {
  const pushToast = useAppStore((state) => state.pushToast)

  const [formData, setFormData] = useState<T>(() => {
    // 1. Check userStorage central draft first
    const centralDraft = userStorage.getDraft(loanType)
    if (centralDraft && centralDraft.formData) {
      return { ...initialValues, ...(centralDraft.formData as T) }
    }

    // 2. Fallback to legacy loan application storage
    const saved = loanApplicationService.getDraft<T>(loanType)
    return saved ? { ...initialValues, ...saved } : initialValues
  })

  const [currentStep, setCurrentStep] = useState<number>(() => {
    const centralDraft = userStorage.getDraft(loanType)
    if (centralDraft && typeof centralDraft.currentStep === 'number') {
      return centralDraft.currentStep
    }
    return 1
  })

  const [isDraftModalOpen, setIsDraftModalOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const updateFormData = useCallback((fields: Partial<T>) => {
    setFormData((prev) => {
      const updated = { ...prev, ...fields }
      loanApplicationService.saveDraft(loanType, updated)
      return updated
    })
  }, [loanType])

  const goToStep = useCallback((stepNumber: number) => {
    setCurrentStep(stepNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => prev + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const saveDraft = useCallback(() => {
    // 1. Save local service draft
    loanApplicationService.saveDraft(loanType, formData)

    // 2. Save central dashboard draft into userStorage
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })

    const totalSteps = options?.totalSteps || 4
    const stepLabel = options?.stepLabels?.[currentStep - 1] || `Step ${currentStep} of ${totalSteps}`
    const serviceTitle = options?.serviceTitle || 'Loan Application'
    const resumeRoute = options?.resumeRoute || (
      loanType === 'vehicle_loan'
        ? '/loans/vehicle-loan'
        : loanType === 'working_capital_loan'
        ? '/loans/working-capital-loan'
        : loanType === 'machinery_loan'
        ? '/loans/machinery-loan'
        : '/loans/home-loan'
    )

    userStorage.saveDraft({
      serviceId: loanType,
      serviceTitle,
      currentStep,
      totalSteps,
      stepLabel,
      formData: formData as Record<string, unknown>,
      savedAt: timeStr,
      savedTimestamp: Date.now(),
      resumeRoute,
    })

    setIsDraftModalOpen(false)
    pushToast(`${serviceTitle} draft saved successfully`, 'success')
  }, [loanType, formData, currentStep, options, pushToast])

  const discardDraft = useCallback(() => {
    loanApplicationService.clearDraft(loanType)
    userStorage.deleteDraft(loanType)
    setFormData(initialValues)
    setCurrentStep(1)
    setIsDraftModalOpen(false)
    pushToast('Draft discarded', 'info')
  }, [loanType, initialValues, pushToast])

  return {
    formData,
    setFormData,
    updateFormData,
    currentStep,
    setCurrentStep,
    goToStep,
    nextStep,
    prevStep,
    isDraftModalOpen,
    setIsDraftModalOpen,
    isSubmitting,
    setIsSubmitting,
    saveDraft,
    discardDraft,
  }
}

export default useLoanApplication
