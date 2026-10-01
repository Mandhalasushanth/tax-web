import { useState } from 'react'
import { gstProfileService } from '@modules/gst/services/gstProfileService'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'
import { useAppStore } from '@store/index'
import { useGstDraft, readGstDraft } from '@modules/gst/hooks/useGstDraft'
import { AMENDMENT_OPTIONS } from '@modules/gst/constants/gstAmendmentOptions'
import { getAmendmentConfig } from '@modules/gst/components/GSTAmendment/amendmentConfigs'
import { gstService } from '@modules/gst/services/gstService'
import type { GstAmendmentPayload, GstAmendmentRecord, GstAmendmentFieldKey } from '@modules/gst/types/gst.types'
import type { AmendmentCardItem, AddressDetailsItem } from '../components/GSTAmendment/index'

export interface GSTAmendmentFormData {
  newValue: string
  file: File | null
  addressDetails?: AddressDetailsItem
  bankDetails?: Record<string, string>
  signatoryDetails?: Record<string, string>
  contactDetails?: Record<string, string>
}

/** Draft keeps the GSTIN and the chosen amendment; the detail form and proof are entered again */
interface AmendmentDraft {
  gstin: string
  selectedOptionId?: string
}

const SERVICE_ID = 'gst-amendment'

export const useGSTAmendmentFlow = () => {
  const navigate = useNavigate()
  const pushToast = useAppStore((state) => state.pushToast)

  const [restored] = useState(() => readGstDraft<AmendmentDraft>(SERVICE_ID)?.formData)
  const [gstin, setGstin] = useState(restored?.gstin || '')
  const [selectedOption, setSelectedOption] = useState<AmendmentCardItem | null>(
    () => AMENDMENT_OPTIONS.find((option) => option.id === restored?.selectedOptionId) || null
  )
  const [formData, setFormData] = useState<GSTAmendmentFormData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedRecord, setSubmittedRecord] = useState<GstAmendmentRecord | null>(null)

  const draft = useGstDraft<AmendmentDraft>({
    serviceId: SERVICE_ID,
    serviceTitle: 'GST Amendment',
    totalSteps: 3,
    currentStep: formData ? 3 : selectedOption ? 2 : 1,
    stepLabel: selectedOption ? selectedOption.title : 'Amendment Details',
    resumeRoute: routePaths.gst.amendment,
    exitRoute: routePaths.gst.root,
    formData: { gstin, selectedOptionId: selectedOption?.id },
    hasEnteredData: Boolean(gstin.trim() || selectedOption),
    isComplete: Boolean(submittedRecord),
  })

  const handleDetailFormSubmit = (data: GSTAmendmentFormData) => {
    setFormData(data)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFinalSubmit = async () => {
    if (!selectedOption || !formData) return

    const config = getAmendmentConfig(selectedOption.id, selectedOption.title)

    const payload: GstAmendmentPayload = {
      gstin: gstin || gstProfileService.get().gstin,
      fieldBeingChanged: config.title,
      fieldKey: (selectedOption.id as GstAmendmentFieldKey) || 'business_name',
      oldValue: config.currentValue,
      newValue: formData.newValue,
      supportingDocumentName: formData.file?.name,
      supportingDocumentFile: formData.file || undefined,
    }

    try {
      setIsSubmitting(true)
      const record = await gstService.submitAmendment(payload)
      setSubmittedRecord(record)
      draft.clearDraft()
      pushToast(
        `Amendment request for ${config.title} submitted successfully (${record.reference})`,
        'success'
      )
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      pushToast('Failed to submit amendment application. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToDashboard = () => {
    navigate(routePaths.gst.root)
  }

  return {
    navigate,
    gstin,
    setGstin,
    selectedOption,
    setSelectedOption,
    formData,
    setFormData,
    isSubmitting,
    submittedRecord,
    isModalOpen: draft.isDraftModalOpen,
    openDraftModal: draft.openDraftModal,
    handleSaveAndExit: draft.handleSaveAndExit,
    handleDiscardAndExit: draft.handleDiscardAndExit,
    handleKeepEditing: draft.handleKeepEditing,
    handleDetailFormSubmit,
    handleFinalSubmit,
    handleBackToDashboard,
  }
}
