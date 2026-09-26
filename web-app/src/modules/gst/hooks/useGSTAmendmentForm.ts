import { useState, useRef, type ChangeEvent, type FormEvent } from 'react'
import {
  GST_AMENDMENT_CUSTOMER_RECORD,
  GST_AMENDMENT_FIELD_OPTIONS,
  type AmendmentFieldOption,
} from '../data/gstAmendmentData'
import type { GstAmendmentPayload } from '../types/gst.types'

interface UseGSTAmendmentFormParams {
  initialGstin?: string
  initialFieldKey?: string
  onSubmit: (payload: GstAmendmentPayload) => void
}

export const useGSTAmendmentForm = ({
  initialGstin,
  initialFieldKey,
  onSubmit,
}: UseGSTAmendmentFormParams) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFieldKey, setSelectedFieldKey] = useState<string>(
    initialFieldKey || GST_AMENDMENT_FIELD_OPTIONS[0].key
  )
  const [newValue, setNewValue] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<{ newValue?: string; document?: string }>({})

  const displayGstin = initialGstin || GST_AMENDMENT_CUSTOMER_RECORD.gstin

  const activeOption: AmendmentFieldOption =
    GST_AMENDMENT_FIELD_OPTIONS.find((opt) => opt.key === selectedFieldKey) ||
    GST_AMENDMENT_FIELD_OPTIONS[0]

  const handleFieldSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFieldKey(e.target.value)
    setNewValue('')
    setErrors({})
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, document: 'File size must be under 10 MB.' }))
        return
      }
      setSelectedFile(file)
      setErrors((prev) => ({ ...prev, document: undefined }))
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newErrors: { newValue?: string; document?: string } = {}
    if (!newValue.trim()) newErrors.newValue = 'Please enter the updated new value.'
    if (!selectedFile) newErrors.document = 'Please upload a supporting document.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    onSubmit({
      gstin: displayGstin,
      fieldBeingChanged: activeOption.label,
      fieldKey: activeOption.key,
      oldValue: activeOption.oldValue,
      newValue: newValue.trim(),
      supportingDocumentName: selectedFile?.name,
      supportingDocumentFile: selectedFile,
    })
  }

  return {
    fileInputRef,
    selectedFieldKey,
    newValue,
    setNewValue,
    selectedFile,
    errors,
    setErrors,
    displayGstin,
    activeOption,
    handleFieldSelectChange,
    handleFileChange,
    handleBrowseClick,
    handleRemoveFile,
    handleSubmit,
  }
}
