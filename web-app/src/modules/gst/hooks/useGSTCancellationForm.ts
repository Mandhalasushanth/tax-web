import { useState, type ChangeEvent, type FormEvent } from 'react'
import { routePaths } from '@core/config'
import { useDraftBlocker } from '@shared/hooks'
import { userStorage } from '@core/storage/userStorage'
import { useAppStore } from '@store/index'

export interface CancellationFormData {
  gstin: string
  reason: string
  cancellationDate: string
  pendingLiabilities?: string
  lastGstr3bFiled?: string
  closingStockDetails: string
  file?: File | null
  finalReturnDeclaration: boolean
}

export interface UseGSTCancellationFormProps {
  onSubmit?: (data: CancellationFormData) => void
}

export const useGSTCancellationForm = ({ onSubmit }: UseGSTCancellationFormProps) => {
  const [gstin, setGstin] = useState('')
  const [reason, setReason] = useState('')
  const [cancellationDate, setCancellationDate] = useState('')
  const [pendingLiabilities, setPendingLiabilities] = useState('')
  const [lastGstr3bFiled, setLastGstr3bFiled] = useState('')
  const [closingStockDetails, setClosingStockDetails] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [finalReturnDeclaration, setFinalReturnDeclaration] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isReviewing, setIsReviewing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const pushToast = useAppStore((state) => state.pushToast)

  const isDirty = !isSubmitted && (gstin.trim() !== '' || reason !== '' || isReviewing)

  const {
    isModalOpen,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
  } = useDraftBlocker({
    shouldBlock: isDirty,
    onSaveDraft: () => {
      userStorage.saveDraft({
        serviceId: 'gst-cancellation',
        serviceTitle: 'GST Cancellation',
        currentStep: isReviewing ? 2 : 1,
        totalSteps: 2,
        stepLabel: isReviewing ? 'Review Application' : 'Cancellation Details',
        formData: {
          gstin,
          reason,
          cancellationDate,
          pendingLiabilities,
          lastGstr3bFiled,
          closingStockDetails,
          finalReturnDeclaration,
        },
        savedAt: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
        savedTimestamp: Date.now(),
        resumeRoute: routePaths.gst.cancellation,
      })
      pushToast('GST Cancellation draft saved', 'success')
    },
    onDiscardDraft: () => {
      userStorage.deleteDraft('gst-cancellation')
      pushToast('Draft discarded', 'info')
    },
    defaultExitRoute: routePaths.gst.root,
  })

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[field]
        return copy
      })
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: 'File size must be under 10 MB.' }))
        return
      }
      setSelectedFile(file)
      clearError('file')
    }
  }

  const handleReviewProceed = (e: FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    const cleanGstin = gstin.trim().toUpperCase()

    if (!cleanGstin) {
      newErrors.gstin = 'Please enter GSTIN.'
    } else if (cleanGstin.length !== 15) {
      newErrors.gstin = 'GSTIN must be 15 characters.'
    }

    if (!reason) newErrors.reason = 'Please select reason for cancellation.'
    if (!cancellationDate) newErrors.cancellationDate = 'Please select cancellation date.'
    if (!lastGstr3bFiled.trim()) newErrors.lastGstr3bFiled = 'Please enter last GSTR-3B filed ARN/Period.'
    if (!closingStockDetails.trim()) newErrors.closingStockDetails = 'Please enter closing stock details.'
    if (!finalReturnDeclaration) {
      newErrors.finalReturnDeclaration = 'You must confirm the final return declaration before proceeding.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsReviewing(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFinalSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      userStorage.deleteDraft('gst-cancellation')
      onSubmit?.({
        gstin: gstin.trim().toUpperCase(),
        reason,
        cancellationDate,
        pendingLiabilities: pendingLiabilities.trim(),
        lastGstr3bFiled: lastGstr3bFiled.trim(),
        closingStockDetails: closingStockDetails.trim(),
        file: selectedFile,
        finalReturnDeclaration,
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 600)
  }

  return {
    gstin,
    setGstin,
    reason,
    setReason,
    cancellationDate,
    setCancellationDate,
    pendingLiabilities,
    setPendingLiabilities,
    lastGstr3bFiled,
    setLastGstr3bFiled,
    closingStockDetails,
    setClosingStockDetails,
    selectedFile,
    setSelectedFile,
    finalReturnDeclaration,
    setFinalReturnDeclaration,
    errors,
    clearError,
    handleFileChange,
    handleReviewProceed,
    handleFinalSubmit,
    isReviewing,
    setIsReviewing,
    isSubmitting,
    isSubmitted,
    setIsSubmitted,
    isModalOpen,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
  }
}
