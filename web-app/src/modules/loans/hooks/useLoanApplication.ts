import { useState, useCallback } from 'react'
import { loanApplicationService } from '../services/loanApplicationService'

export function useLoanApplication<T extends object>(loanType: string, initialValues: T) {
  const [formData, setFormData] = useState<T>(() => {
    const saved = loanApplicationService.getDraft<T>(loanType)
    return saved ? { ...initialValues, ...saved } : initialValues
  })

  const [currentStep, setCurrentStep] = useState<number>(1)
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
    loanApplicationService.saveDraft(loanType, formData)
    setIsDraftModalOpen(false)
  }, [loanType, formData])

  const discardDraft = useCallback(() => {
    loanApplicationService.clearDraft(loanType)
    setFormData(initialValues)
    setIsDraftModalOpen(false)
  }, [loanType, initialValues])

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
