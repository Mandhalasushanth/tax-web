import { useState } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { routePaths } from '@core/config'
import { userStorage } from '@core/storage/userStorage'
import { useAppStore, useAuthStore } from '@store/index'
import { formatRupees, generateGstReference } from '@modules/gst/utils/gstFormat'
import { gstProfileService } from '@modules/gst/services/gstProfileService'
import { GST_FEES } from '@modules/gst/constants/gstBusiness.constants'
import { INITIAL_DOCUMENTS } from '@modules/gst/utils/gstDocuments.constants'
import { useGstDraft, readGstDraft, hasGstFormChanged } from '@modules/gst/hooks/useGstDraft'
import type { DocumentItem } from '@modules/gst/types/gstDocuments.types'
import type { GstBusinessFormData } from '@modules/gst/types/gstBusiness.types'
import type { PaymentResult } from '@modules/gst/types/gst.types'

type CurrentUser = ReturnType<typeof useAuthStore.getState>['user']

const SERVICE_ID = 'gst-registration'
const SERVICE_TITLE = 'GST Registration'
const TOTAL_STEPS = 4
const STEP_LABELS = ['Business', 'Documents', 'Review', 'Payment']
const STEP_NAMES: Record<number, string> = { 1: 'business', 2: 'documents', 3: 'review', 4: 'payment' }

interface RegistrationDraft {
  businessData: GstBusinessFormData
  documents: DocumentItem[]
}

/** Registration step named by the URL (?step=… or the route path), or null */
const registrationStepFromUrl = (stepParam: string | null, pathname: string): number | null => {
  const step = (stepParam || '').toLowerCase()
  if (step === 'documents' || step === '2' || pathname.includes('document')) return 2
  if (step === 'review' || step === '3' || pathname.includes('review')) return 3
  if (step === 'payment' || step === '4' || pathname.includes('payment')) return 4
  if (step === 'status' || step === '5' || step === 'success') return 5
  if (step === 'business' || step === '1') return 1
  return null
}

/** Empty registration form, prefilled from the signed-in user's profile */
const buildInitialBusinessData = (user: CurrentUser): GstBusinessFormData => ({
  legalName: user?.fullName || '',
  tradeName: '',
  constitution: '',
  natureOfBusiness: '',
  commencementDate: '',
  registrationReason: '',
  compositionScheme: '',
  placeOfBusiness: '',
  businessAddress: [user?.addressLine1, user?.addressLine2].filter(Boolean).join(', '),
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
})

const buildPaymentResult = (): PaymentResult => ({
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
  applicationRef: generateGstReference('GST'),
  amount: GST_FEES.registration,
})

export const useGstRegistrationState = () => {
  const navigate = useNavigate()
  const pushToast = useAppStore((state) => state.pushToast)
  const user = useAuthStore((state) => state.user)
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  const [savedDraft] = useState(() => readGstDraft<RegistrationDraft>(SERVICE_ID))
  const [initialBusinessData] = useState(() => buildInitialBusinessData(user))

  const [currentStep, setCurrentStep] = useState<number>(() => {
    const urlStep = registrationStepFromUrl(searchParams.get('step'), location.pathname)
    if (urlStep) return urlStep
    const draftStep = savedDraft?.currentStep ?? 1
    return draftStep >= 1 && draftStep <= TOTAL_STEPS ? draftStep : 1
  })

  const [businessData, setBusinessData] = useState<GstBusinessFormData>(() => ({
    ...initialBusinessData,
    ...savedDraft?.formData?.businessData,
  }))

  const [documents, setDocuments] = useState<DocumentItem[]>(
    () => savedDraft?.formData?.documents || INITIAL_DOCUMENTS
  )

  const [paymentResult, setPaymentResult] = useState<PaymentResult>(buildPaymentResult)

  const hasEnteredData =
    currentStep > 1 ||
    hasGstFormChanged(businessData, initialBusinessData) ||
    documents.some((doc) => doc.isUploaded)

  const draft = useGstDraft<RegistrationDraft>({
    serviceId: SERVICE_ID,
    serviceTitle: SERVICE_TITLE,
    totalSteps: TOTAL_STEPS,
    currentStep,
    stepLabel: STEP_LABELS[currentStep - 1] || 'Confirmation',
    resumeRoute: routePaths.gst.registration,
    exitRoute: routePaths.gst.root,
    formData: { businessData, documents },
    hasEnteredData,
    isComplete: currentStep > TOTAL_STEPS,
  })

  // Follow the step in the URL (applied during render when the URL changes, no extra effect pass)
  const urlKey = `${location.pathname}?${searchParams.get('step') || ''}`
  const [syncedUrlKey, setSyncedUrlKey] = useState(urlKey)
  if (syncedUrlKey !== urlKey) {
    setSyncedUrlKey(urlKey)
    const urlStep = registrationStepFromUrl(searchParams.get('step'), location.pathname)
    if (urlStep) setCurrentStep(urlStep)
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
    if (STEP_NAMES[step]) setSearchParams({ step: STEP_NAMES[step] }, { replace: true })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Leaving from step 1 asks to save when something was entered (same as the loans flows)
  const handleCancel = () => navigate(routePaths.gst.root)

  const handleBusinessChange = <K extends keyof GstBusinessFormData>(
    field: K,
    value: GstBusinessFormData[K]
  ) => {
    setBusinessData((prev) => ({ ...prev, [field]: value }))
  }

  const recordApplication = (appCode: string) => {
    const applicant = businessData.tradeName || businessData.legalName || businessData.signatoryName || 'GST Applicant'
    userStorage.saveUserApplication({
      id: `app-gst-${Date.now()}`,
      code: appCode,
      title: SERVICE_TITLE,
      meta: `${applicant} · ${businessData.state || 'India'}`,
      statusLabel: 'Submitted',
      statusTone: 'info',
      progress: 25,
      icon: '📄',
      to: `/applications/track/${appCode}`,
    })
  }

  const handlePaymentSuccess = (result: PaymentResult) => {
    setPaymentResult(result)
    setCurrentStep(5)
    setSearchParams({ step: 'status' }, { replace: true })
    pushToast(`Payment of ${formatRupees(result.amount ?? GST_FEES.registration)} successful`, 'success')
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Clear the draft and remember the business details for later GST services
    draft.clearDraft()
    gstProfileService.saveFromRegistration(businessData)
    recordApplication(result.applicationRef || generateGstReference('GST'))
  }

  return {
    currentStep,
    businessData,
    documents,
    paymentResult,
    isDraftModalOpen: draft.isDraftModalOpen,
    openDraftModal: draft.openDraftModal,
    handleCancel,
    handleSaveAndExit: draft.handleSaveAndExit,
    handleDiscardAndExit: draft.handleDiscardAndExit,
    handleKeepEditing: draft.handleKeepEditing,
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
