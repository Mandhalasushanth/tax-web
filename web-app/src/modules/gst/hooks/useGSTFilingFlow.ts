import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { routePaths } from '@core/config'
import { userStorage } from '@core/storage/userStorage'
import { useDraftBlocker } from '@shared/hooks'
import { useAppStore } from '@store/index'
import type { FilingPeriodData } from '../components/GSTFiling'
import type { PaymentResult } from '../types/gst.types'
import { type UploadedFileInfo } from '../utils/gstDocumentsData'
import { DEFAULT_FILING_DATA, STEP_LABELS } from '../utils/gstFiling.constants'

export const useGSTFilingFlow = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const pushToast = useAppStore((state) => state.pushToast)
  const [existingDraft] = useState(() => userStorage.getDraft('gst-filing'))

  const [filingRef] = useState(
    () => `GST-FIL-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
  )

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(() => {
    if (location.pathname === routePaths.gst.fileUpload) return 2
    if (location.pathname === routePaths.gst.fileReview) return 3
    if (location.pathname === routePaths.gst.filePayment) return 4
    if (location.pathname === routePaths.gst.fileSuccess) return 5
    if (location.pathname === routePaths.gst.fileReceipt) return 6
    if (existingDraft && existingDraft.currentStep >= 1 && existingDraft.currentStep <= 4) {
      return existingDraft.currentStep as 1 | 2 | 3 | 4
    }
    return 1
  })

  const [filingData, setFilingData] = useState<FilingPeriodData>(() => {
    if (existingDraft?.formData?.filingData) {
      return existingDraft.formData.filingData as FilingPeriodData
    }
    return DEFAULT_FILING_DATA
  })

  const [paymentResult, setPaymentResult] = useState<PaymentResult>(() => ({
    transactionId: `TXN${Date.now()}`,
    receiptNumber: `TE/${new Date().getFullYear()}/R-${Math.floor(1000 + Math.random() * 9000)}`,
    method: 'UPI',
    dateText: new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date()),
    applicationRef: filingRef,
    amount: 2950,
  }))

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFileInfo>>(() => {
    if (existingDraft?.formData?.uploadedFiles) {
      return existingDraft.formData.uploadedFiles as Record<string, UploadedFileInfo>
    }
    return {}
  })

  const [notApplicableDocs, setNotApplicableDocs] = useState<Record<string, boolean>>(() => {
    if (existingDraft?.formData?.notApplicableDocs) {
      return existingDraft.formData.notApplicableDocs as Record<string, boolean>
    }
    return {}
  })

  const handleFileUpload = (id: string, file: File) => {
    const mb = file.size / (1024 * 1024)
    const sizeText = mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`
    const fileUrl = URL.createObjectURL(file)
    const fileInfo: UploadedFileInfo = {
      name: file.name,
      sizeText,
      uploadTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fileUrl,
      status: 'verified',
    }
    setUploadedFiles((prev) => ({
      ...prev,
      [id]: fileInfo,
    }))
    setNotApplicableDocs((prev) => {
      if (!prev[id]) return prev
      const copy = { ...prev }
      delete copy[id]
      return copy
    })
  }

  const handleFileRemove = (id: string) => {
    setUploadedFiles((prev) => {
      const copy = { ...prev }
      delete copy[id]
      return copy
    })
  }

  const handleToggleNotApplicable = (id: string) => {
    setNotApplicableDocs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const saveCurrentDraft = useCallback(() => {
    if (currentStep >= 5) return
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
    userStorage.saveDraft({
      serviceId: 'gst-filing',
      serviceTitle: 'GST Filing',
      currentStep,
      totalSteps: 4,
      stepLabel: STEP_LABELS[currentStep] || 'Return Filing',
      formData: {
        filingData,
        uploadedFiles,
        notApplicableDocs,
      },
      savedAt: timeStr,
      savedTimestamp: Date.now(),
      resumeRoute: routePaths.gst.filing,
    })
  }, [currentStep, filingData, uploadedFiles, notApplicableDocs])

  useEffect(() => {
    if (currentStep > 1 && currentStep <= 4) {
      saveCurrentDraft()
    }
  }, [currentStep, filingData, uploadedFiles, notApplicableDocs, saveCurrentDraft])

  const isBackButtonClickedRef = useRef(false)

  const filingRoutes = useMemo(
    () => [
      routePaths.gst.filing,
      routePaths.gst.filePeriod,
      routePaths.gst.fileUpload,
      routePaths.gst.fileReview,
      routePaths.gst.filePayment,
      routePaths.gst.fileSuccess,
      routePaths.gst.fileReceipt,
    ],
    []
  )

  const isNavigationAllowed = useCallback(
    (nextLocation: { pathname: string }) => {
      if (isBackButtonClickedRef.current) {
        isBackButtonClickedRef.current = false
        return true
      }
      return (filingRoutes as readonly string[]).includes(nextLocation.pathname)
    },
    [filingRoutes]
  )

  const handleStep1Back = useCallback(() => {
    isBackButtonClickedRef.current = true
    navigate(routePaths.gst.root)
  }, [navigate])

  const shouldBlock = currentStep > 1 && currentStep <= 4
  const {
    isModalOpen,
    openModal,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
  } = useDraftBlocker({
    shouldBlock,
    onSaveDraft: () => {
      saveCurrentDraft()
      pushToast('GST Filing draft saved', 'success')
    },
    onDiscardDraft: () => {
      userStorage.deleteDraft('gst-filing')
      pushToast('Draft discarded', 'info')
    },
    defaultExitRoute: routePaths.gst.root,
    isNavigationAllowed,
  })

  useEffect(() => {
    if (location.pathname === routePaths.gst.fileUpload) setCurrentStep(2)
    else if (location.pathname === routePaths.gst.fileReview) setCurrentStep(3)
    else if (location.pathname === routePaths.gst.filePayment) setCurrentStep(4)
    else if (location.pathname === routePaths.gst.fileSuccess) setCurrentStep(5)
    else if (location.pathname === routePaths.gst.fileReceipt) setCurrentStep(6)
    else if (location.pathname === routePaths.gst.filing || location.pathname === routePaths.gst.filePeriod) setCurrentStep(1)
  }, [location.pathname])

  const handleStepClick = (stepId: number) => {
    if (stepId === 1) {
      setCurrentStep(1)
      navigate(routePaths.gst.filePeriod)
    } else if (stepId === 2) {
      setCurrentStep(2)
      navigate(routePaths.gst.fileUpload)
    } else if (stepId === 3) {
      setCurrentStep(3)
      navigate(routePaths.gst.fileReview)
    } else if (stepId === 4) {
      setCurrentStep(4)
      navigate(routePaths.gst.filePayment)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep1Continue = (data: FilingPeriodData) => {
    setFilingData(data)
    setCurrentStep(2)
    navigate(routePaths.gst.fileUpload)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep2Next = () => {
    setCurrentStep(3)
    navigate(routePaths.gst.fileReview)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep3Approve = () => {
    setCurrentStep(4)
    navigate(routePaths.gst.filePayment)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep4Success = (res: PaymentResult) => {
    setPaymentResult(res)
    const finalRef = res.applicationRef || filingRef
    userStorage.deleteDraft('gst-filing')
    userStorage.saveUserApplication({
      id: `app-gst-filing-${Date.now()}`,
      code: finalRef,
      title: `GST Filing — ${filingData.selectedMonth || 'Return'}`,
      meta: `${filingData.businessName || 'Business'} · ${filingData.returnType || 'GSTR-3B'}`,
      statusLabel: 'Submitted',
      statusTone: 'info',
      progress: 25,
      icon: '📄',
      to: routePaths.gst.detail(finalRef),
    })
    setCurrentStep(5)
    navigate(routePaths.gst.fileSuccess)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    navigate,
    currentStep,
    setCurrentStep,
    filingData,
    filingRef,
    paymentResult,
    uploadedFiles,
    notApplicableDocs,
    isModalOpen,
    openModal,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
    handleStepClick,
    handleStep1Continue,
    handleStep1Back,
    handleStep2Next,
    handleStep3Approve,
    handleStep4Success,
    handleFileUpload,
    handleFileRemove,
    handleToggleNotApplicable,
  }
}
