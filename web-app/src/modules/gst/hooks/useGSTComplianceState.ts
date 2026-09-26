import { useState } from 'react'
import { useAppStore } from '@store/index'

export type ComplianceRequestOption = 'Reconciliation Support' | 'Notice Response'

export const useGSTComplianceState = () => {
  const pushToast = useAppStore((state) => state.pushToast)

  const [gstin, setGstin] = useState('')
  const [financialYear, setFinancialYear] = useState('')
  const [requestType, setRequestType] = useState<ComplianceRequestOption | ''>('')

  // Reconciliation fields state
  const [purchaseFile, setPurchaseFile] = useState<File | null>(null)
  const [salesFile, setSalesFile] = useState<File | null>(null)
  const [gstr2bRef, setGstr2bRef] = useState('')
  const [notes, setNotes] = useState('')

  // Document preview & confirmation modal state
  const [previewDoc, setPreviewDoc] = useState<{ file: File; title: string } | null>(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState('')

  const handleGstinChange = (value: string) => {
    const uppercaseVal = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 15)
    setGstin(uppercaseVal)
    if (errors.gstin) {
      setErrors((prev) => ({ ...prev, gstin: undefined }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    const cleanGstin = gstin.trim()

    if (!cleanGstin) {
      newErrors.gstin = 'GSTIN is required'
    } else if (cleanGstin.length !== 15 && cleanGstin.length !== 10) {
      newErrors.gstin = 'Must be a 15-character GSTIN or 10-character PAN'
    }

    if (!financialYear) {
      newErrors.financialYear = 'Financial Year is required'
    }

    if (!requestType) {
      newErrors.requestType = 'Request Type is required'
    }

    if (requestType === 'Reconciliation Support') {
      if (!purchaseFile) newErrors.purchaseFile = 'Purchase Register file is required'
      if (!salesFile) newErrors.salesFile = 'Sales Register file is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsConfirmModalOpen(true)
  }

  const handleConfirmSubmit = () => {
    setIsConfirmModalOpen(false)
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      const generatedId = `GST-${Math.floor(100000 + Math.random() * 900000)}`
      setApplicationId(generatedId)
      setIsSubmitted(true)
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      } catch {
        // window fallback
      }
      pushToast(`GST Compliance request (${requestType}) submitted successfully!`, 'success')
    }, 600)
  }

  const handleReset = () => {
    setGstin('')
    setFinancialYear('')
    setRequestType('')
    setPurchaseFile(null)
    setSalesFile(null)
    setGstr2bRef('')
    setNotes('')
    setErrors({})
    setIsSubmitted(false)
  }

  return {
    pushToast,
    gstin,
    setGstin,
    handleGstinChange,
    financialYear,
    setFinancialYear,
    requestType,
    setRequestType,
    purchaseFile,
    setPurchaseFile,
    salesFile,
    setSalesFile,
    gstr2bRef,
    setGstr2bRef,
    notes,
    setNotes,
    previewDoc,
    setPreviewDoc,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    errors,
    setErrors,
    isSubmitting,
    isSubmitted,
    applicationId,
    handleSubmit,
    handleConfirmSubmit,
    handleReset,
  }
}
