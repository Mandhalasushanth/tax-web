import { useState, useCallback, useEffect } from 'react'
import { localStore } from '@core/storage/localStorage'
import { userStorage } from '@core/storage/userStorage'
import { useDraftBlocker } from '@shared/hooks'
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
  const stepStorageKey = `taxedge_loan_step_${loanType}`

  const [formData, setFormData] = useState<T>(() => {
    // 1. Check userStorage central draft first
    const centralDraft = userStorage.getDraft(loanType)
    if (centralDraft && centralDraft.formData) {
      return { ...initialValues, ...(centralDraft.formData as T) }
    }

    // 2. Fallback to loan application service storage
    const saved = loanApplicationService.getDraft<T>(loanType)
    return saved ? { ...initialValues, ...saved } : initialValues
  })

  const [currentStep, setCurrentStepState] = useState<number>(() => {
    const savedStep = localStore.get<number>(stepStorageKey)
    if (typeof savedStep === 'number' && savedStep >= 1) {
      return savedStep
    }
    const centralDraft = userStorage.getDraft(loanType)
    if (centralDraft && typeof centralDraft.currentStep === 'number' && centralDraft.currentStep >= 1) {
      return centralDraft.currentStep
    }
    return 1
  })

  const [isManualDraftModalOpen, setIsManualDraftModalOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const setCurrentStep = useCallback(
    (step: number | ((prev: number) => number)) => {
      setCurrentStepState((prev) => {
        const next = typeof step === 'function' ? step(prev) : step
        localStore.set(stepStorageKey, next)
        return next
      })
    },
    [stepStorageKey]
  )

  const updateFormData = useCallback(
    (fields: Partial<T>) => {
      setFormData((prev) => {
        const updated = { ...prev, ...fields }
        loanApplicationService.saveDraft(loanType, updated)
        return updated
      })
    },
    [loanType]
  )

  const goToStep = useCallback(
    (stepNumber: number) => {
      setCurrentStep(stepNumber)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [setCurrentStep]
  )

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => prev + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [setCurrentStep])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [setCurrentStep])

  // Automatically sync step position to storage whenever currentStep updates
  useEffect(() => {
    localStore.set(stepStorageKey, currentStep)
  }, [stepStorageKey, currentStep])

  const saveDraft = useCallback(() => {
    // 1. Save local service draft
    loanApplicationService.saveDraft(loanType, formData)

    // 2. Save central dashboard draft into userStorage
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })

    const totalSteps = options?.totalSteps || 4
    const stepLabel = options?.stepLabels?.[currentStep - 1] || `Step ${currentStep} of ${totalSteps}`
    const serviceTitle = options?.serviceTitle || 'Loan Application'
    const resumeRoute =
      options?.resumeRoute ||
      (loanType === 'vehicle_loan'
        ? '/loans/vehicle-loan'
        : loanType === 'working_capital_loan'
        ? '/loans/working-capital-loan'
        : loanType === 'machinery_loan'
        ? '/loans/machinery-loan'
        : '/loans/home-loan')

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

    localStore.set(stepStorageKey, currentStep)
    setIsManualDraftModalOpen(false)
    pushToast(`${serviceTitle} draft saved successfully`, 'success')
  }, [loanType, formData, currentStep, options, pushToast, stepStorageKey])

  const discardDraft = useCallback(() => {
    loanApplicationService.clearDraft(loanType)
    userStorage.deleteDraft(loanType)
    localStore.remove(stepStorageKey)
    setFormData(initialValues)
    setCurrentStepState(1)
    setIsManualDraftModalOpen(false)
    pushToast('Draft discarded', 'info')
  }, [loanType, initialValues, pushToast, stepStorageKey])

  // Block route navigation if unsubmitted and in progress
  const shouldBlock = (currentStep > 1 || Boolean(localStore.get(stepStorageKey))) && !isSubmitting

  const draftBlocker = useDraftBlocker({
    shouldBlock,
    onSaveDraft: () => {
      saveDraft()
    },
    onDiscardDraft: () => {
      discardDraft()
    },
    defaultExitRoute: '/loans',
  })

  const isDraftModalOpen = isManualDraftModalOpen || draftBlocker.isModalOpen

  const handleSaveAndExit = useCallback(() => {
    saveDraft()
    setIsManualDraftModalOpen(false)
    draftBlocker.handleSaveAndExit()
  }, [saveDraft, draftBlocker])

  const handleDiscardAndExit = useCallback(() => {
    discardDraft()
    setIsManualDraftModalOpen(false)
    draftBlocker.handleDiscardAndExit()
  }, [discardDraft, draftBlocker])

  const handleKeepEditing = useCallback(() => {
    setIsManualDraftModalOpen(false)
    draftBlocker.handleKeepEditing()
  }, [draftBlocker])

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
    setIsDraftModalOpen: setIsManualDraftModalOpen,
    isSubmitting,
    setIsSubmitting,
    saveDraft,
    discardDraft,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
  }
}

export default useLoanApplication


