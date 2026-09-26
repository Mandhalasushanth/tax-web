import { useCallback, useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { routePaths } from '@core/config'
import { useAppStore, useAuthStore } from '@store/index'
import { userStorage } from '@core/storage/userStorage'
import { useDraftBlocker } from '@shared/hooks'
import { INITIAL_DOCUMENTS } from '../utils/gstDocuments.constants'
import type { DocumentItem } from '../types/gstDocuments.types'
import type { GstBusinessFormData } from '../types/gstBusiness.types'
import type { PaymentResult } from '../types/gst.types'

export const useGstRegistrationState = () => {
  const navigate = useNavigate()
  const pushToast = useAppStore((state) => state.pushToast)
  const user = useAuthStore((state) => state.user)

  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  // Retrieve saved draft if available
  const [existingDraft] = useState(() => userStorage.getDraft('gst-registration'))

  const [currentStep, setCurrentStep] = useState<number>(() => {
    const stepParam = new URLSearchParams(window.location.search).get('step')?.toLowerCase()
    if (stepParam === 'documents' || stepParam === '2' || window.location.pathname.includes('document')) {
      return 2
    }
    if (stepParam === 'review' || stepParam === '3' || window.location.pathname.includes('review')) {
      return 3
    }
    if (stepParam === 'payment' || stepParam === '4' || window.location.pathname.includes('payment')) {
      return 4
    }
    if (stepParam === 'status' || stepParam === '5' || stepParam === 'success') {
      return 5
    }
    if (existingDraft && existingDraft.currentStep <= 4) {
      return existingDraft.currentStep
    }
    return 1
  })

  const [businessData, setBusinessData] = useState<GstBusinessFormData>(() => {
    if (existingDraft?.formData?.businessData) {
      return existingDraft.formData.businessData as GstBusinessFormData
    }
    const fullAddress = [user?.addressLine1, user?.addressLine2].filter(Boolean).join(', ')
    return {
      legalName: user?.fullName || '',
      tradeName: '',
      constitution: '',
      natureOfBusiness: '',
      commencementDate: '',
      registrationReason: '',
      compositionScheme: '',
      placeOfBusiness: '',
      businessAddress: fullAddress || '',
      city: user?.city || '',
      district: '',
      state: user?.state || '',
      pinCode: user?.pincode || '',
      hsnSacCode: '',

      accountHolderName: user?.fullName || '',
      accountNumber: '',
      confirmAccountNumber: '',
      ifscCode: '',
      bankName: '',
      branch: '',
      accountType: '',

      signatoryName: user?.fullName || '',
      signatoryPan: user?.pan || '',
      dob: '',
      designation: '',
      signatoryMobile: user?.mobile || '',
      signatoryEmail: user?.email || '',

      aadhaarConsent: false,
    }
  })

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    if (existingDraft?.formData?.documents) {
      return existingDraft.formData.documents as DocumentItem[]
    }
    return INITIAL_DOCUMENTS
  })

  const [paymentResult, setPaymentResult] = useState<PaymentResult>(() => ({
    transactionId: `TXN${Date.now()}`,
    receiptNumber: `TE/${new Date().getFullYear()}/R-${Math.floor(Math.random() * 9000 + 1000)}`,
    method: 'UPI',
    dateText: new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date()),
    applicationRef: `GST-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000 + 10000))}`,
    amount: 1499,
  }))

  const getStepLabel = (step: number) => {
    if (step === 1) return 'Business'
    if (step === 2) return 'Documents'
    if (step === 3) return 'Review'
    if (step === 4) return 'Payment'
    return 'Confirmation'
  }

  const saveCurrentDraft = useCallback(() => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
    userStorage.saveDraft({
      serviceId: 'gst-registration',
      serviceTitle: 'GST Registration',
      currentStep,
      totalSteps: 4,
      stepLabel: getStepLabel(currentStep),
      formData: {
        businessData,
        documents,
      },
      savedAt: timeStr,
      savedTimestamp: Date.now(),
      resumeRoute: routePaths.gst.registration,
    })
  }, [currentStep, businessData, documents])

  // Automatically keep draft updated on any input change once user has completed at least Step 1
  useEffect(() => {
    if (currentStep > 1 && currentStep <= 4) {
      saveCurrentDraft()
    }
  }, [currentStep, businessData, documents, saveCurrentDraft])


  const isBackButtonClickedRef = useRef(false)

  const handleCancel = useCallback(() => {
    isBackButtonClickedRef.current = true
    navigate(routePaths.gst.root)
  }, [navigate])

  const isNavigationAllowed = useCallback(() => {
    if (isBackButtonClickedRef.current) {
      isBackButtonClickedRef.current = false
      return true
    }
    return false
  }, [])

  // Hook to block route navigation away from the application
  const {
    isModalOpen: isDraftModalOpen,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
  } = useDraftBlocker({
    shouldBlock: currentStep > 1 && currentStep <= 4,
    onSaveDraft: () => {
      saveCurrentDraft()
      pushToast('Application saved as draft', 'success')
    },
    onDiscardDraft: () => {
      userStorage.deleteDraft('gst-registration')
      pushToast('Draft discarded', 'info')
    },
    defaultExitRoute: routePaths.dashboard,
    isNavigationAllowed,
  })

  const handleBusinessChange = <K extends keyof GstBusinessFormData>(
    field: K,
    value: GstBusinessFormData[K]
  ) => {
    setBusinessData((prev) => ({ ...prev, [field]: value }))
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
    const stepNames: Record<number, string> = { 1: 'business', 2: 'documents', 3: 'review', 4: 'payment' }
    if (stepNames[step]) {
      setSearchParams({ step: stepNames[step] }, { replace: true })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Synchronize when URL searchParams change
  useEffect(() => {
    const stepParam = searchParams.get('step')?.toLowerCase()
    if (stepParam === 'documents' || stepParam === '2' || location.pathname.includes('document')) {
      setCurrentStep(2)
    } else if (stepParam === 'review' || stepParam === '3' || location.pathname.includes('review')) {
      setCurrentStep(3)
    } else if (stepParam === 'payment' || stepParam === '4' || location.pathname.includes('payment')) {
      setCurrentStep(4)
    } else if (stepParam === 'status' || stepParam === '5' || stepParam === 'success') {
      setCurrentStep(5)
    } else if (stepParam === 'business' || stepParam === '1') {
      setCurrentStep(1)
    }
  }, [searchParams, location.pathname])

  const handlePaymentSuccess = (result: PaymentResult) => {
    setPaymentResult(result)
    setCurrentStep(5)
    setSearchParams({ step: 'status' }, { replace: true })
    pushToast('Payment of ₹1,499 successful', 'success')
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Clear draft on submission
    userStorage.deleteDraft('gst-registration')

    const appCode = result.applicationRef || `GST-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000 + 10000))}`
    const applicant = businessData.tradeName || businessData.legalName || businessData.signatoryName || 'GST Applicant'
    const stateName = businessData.state || 'India'

    userStorage.saveUserApplication({
      id: `app-gst-${Date.now()}`,
      code: appCode,
      title: 'GST Registration',
      meta: `${applicant} · ${stateName}`,
      statusLabel: 'Submitted',
      statusTone: 'info',
      progress: 25,
      icon: '📄',
      to: `/applications/track/${appCode}`,
    })
  }

  return {
    currentStep,
    businessData,
    documents,
    paymentResult,
    isDraftModalOpen,
    handleCancel,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
    handleBusinessChange,
    setDocuments,
    goToStep,
    handleStep1Next: () => goToStep(2),
    handleStep2Back: () => goToStep(1),
    handleStep2Next: () => goToStep(3),
    handleStep3Back: () => goToStep(2),
    handleStep3Proceed: () => goToStep(4),
    handleStep4Back: () => goToStep(3),
    handlePaymentSuccess,
    navigate,
  }
}
