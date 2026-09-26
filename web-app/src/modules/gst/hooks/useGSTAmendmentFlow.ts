import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'
import { useAppStore } from '@store/index'
import { useDraftBlocker } from '@shared/hooks'
import { userStorage } from '@core/storage/userStorage'
import { AMENDMENT_CONFIGS } from '../components/GSTAmendment/amendmentConfigs'
import { gstService } from '../services/gstService'
import type { GstAmendmentPayload, GstAmendmentRecord, GstAmendmentFieldKey } from '../types/gst.types'
import type { AmendmentCardItem, AddressDetailsItem } from '../components/GSTAmendment/index'

export interface GSTAmendmentFormData {
  newValue: string
  file: File | null
  addressDetails?: AddressDetailsItem
  bankDetails?: Record<string, string>
  signatoryDetails?: Record<string, string>
  contactDetails?: Record<string, string>
}

export const useGSTAmendmentFlow = () => {
  const navigate = useNavigate()
  const pushToast = useAppStore((state) => state.pushToast)

  const [gstin, setGstin] = useState('')
  const [selectedOption, setSelectedOption] = useState<AmendmentCardItem | null>(null)
  const [formData, setFormData] = useState<GSTAmendmentFormData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedRecord, setSubmittedRecord] = useState<GstAmendmentRecord | null>(null)

  const isDirty = Boolean(selectedOption) && !submittedRecord

  const {
    isModalOpen,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
  } = useDraftBlocker({
    shouldBlock: isDirty,
    onSaveDraft: () => {
      userStorage.saveDraft({
        serviceId: 'gst-amendment',
        serviceTitle: 'GST Amendment',
        currentStep: formData ? 2 : 1,
        totalSteps: 2,
        stepLabel: selectedOption ? selectedOption.title : 'Amendment Details',
        formData: {
          gstin,
          selectedOptionId: selectedOption?.id,
          formData,
        },
        savedAt: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
        savedTimestamp: Date.now(),
        resumeRoute: routePaths.gst.amendment,
      })
      pushToast('GST Amendment draft saved', 'success')
    },
    onDiscardDraft: () => {
      userStorage.deleteDraft('gst-amendment')
      pushToast('Draft discarded', 'info')
    },
    defaultExitRoute: routePaths.gst.root,
  })

  const handleDetailFormSubmit = (data: GSTAmendmentFormData) => {
    setFormData(data)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFinalSubmit = async () => {
    if (!selectedOption || !formData) return

    const config = AMENDMENT_CONFIGS[selectedOption.id] || {
      title: selectedOption.title,
      currentValue: 'Current details',
      inputLabel: 'New Value',
      placeholder: 'Enter new value',
      proofs: [],
    }

    const payload: GstAmendmentPayload = {
      gstin: gstin || '29AAAAA0000A1Z5',
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
      userStorage.deleteDraft('gst-amendment')
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
    isModalOpen,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
    handleDetailFormSubmit,
    handleFinalSubmit,
    handleBackToDashboard,
  }
}
