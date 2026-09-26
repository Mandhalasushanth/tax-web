import { useState, useRef, useMemo, useEffect, type ChangeEvent } from 'react'
import type { DocumentItem, DocumentCategory, DocPreviewState } from '../types/gstDocuments.types'
import { INITIAL_DOCUMENTS } from '../utils/gstDocuments.constants'

export const useGstDocuments = (
  initialDocs?: DocumentItem[],
  onDocsChange?: (docs: DocumentItem[]) => void
) => {
  const [documents, setDocuments] = useState<DocumentItem[]>(() => initialDocs || INITIAL_DOCUMENTS)
  const [activeUploadTargetId, setActiveUploadTargetId] = useState<string | null>(null)
  const [replacingDocId, setReplacingDocId] = useState<string | null>(null)
  const [previewDoc, setPreviewDoc] = useState<DocPreviewState | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    if (initialDocs && initialDocs.length > 0) {
      setDocuments(initialDocs)
    }
  }, [initialDocs])

  const updateDocuments = (updater: (prev: DocumentItem[]) => DocumentItem[]) => {
    setDocuments((prev) => {
      const next = updater(prev)
      onDocsChange?.(next)
      return next
    })
  }

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const completedCount = useMemo(() => documents.filter((d) => d.isUploaded).length, [documents])
  const totalCount = documents.length
  const progressPercent = Math.round((completedCount / totalCount) * 100)

  const groupedDocs = useMemo<Record<DocumentCategory, DocumentItem[]>>(
    () => ({
      identity: documents.filter((d) => d.category === 'identity'),
      business: documents.filter((d) => d.category === 'business'),
      financial: documents.filter((d) => d.category === 'financial'),
    }),
    [documents]
  )

  const handleTriggerUpload = (id: string) => {
    setActiveUploadTargetId(id)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
      fileInputRef.current.click()
    }
  }

  const handleTriggerCamera = (id: string) => {
    setActiveUploadTargetId(id)
    if (cameraInputRef.current) {
      cameraInputRef.current.value = ''
      cameraInputRef.current.click()
    }
  }

  const handleFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !activeUploadTargetId) return
    const file = e.target.files[0]
    const fileName = file.name

    updateDocuments((prev) =>
      prev.map((doc) =>
        doc.id === activeUploadTargetId ? { ...doc, isUploaded: true, fileName } : doc
      )
    )
    setActiveUploadTargetId(null)
    setReplacingDocId(null)
    setValidationError(null)
  }

  const handleDelete = (id: string) => {
    updateDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, isUploaded: false, fileName: undefined } : doc))
    )
  }

  const handleStartReplace = (id: string) => setReplacingDocId(id)
  const handleCancelReplace = () => setReplacingDocId(null)

  const handleView = (doc: DocumentItem) => {
    setPreviewDoc({
      title: doc.title,
      fileName: doc.fileName || `${doc.title}.pdf`,
    })
  }

  const handleClosePreview = () => setPreviewDoc(null)

  const handleAddressProofTypeChange = (value: string) => {
    updateDocuments((prev) =>
      prev.map((doc) => (doc.id === 'address_proof' ? { ...doc, addressProofType: value } : doc))
    )
    setValidationError(null)
  }

  const handleProceed = (onNext: () => void) => {
    const addressDoc = documents.find((d) => d.id === 'address_proof')
    if (addressDoc && !addressDoc.addressProofType) {
      setValidationError('Please choose address type for Principal Place Address Proof.')
      return
    }

    const unuploaded = documents.filter((d) => !d.isUploaded)
    if (unuploaded.length > 0) {
      setValidationError(
        `Please upload all required documents (${unuploaded.map((d) => d.title).join(', ')}) before proceeding.`
      )
      return
    }
    setValidationError(null)
    onNext()
  }

  return {
    groupedDocs,
    completedCount,
    totalCount,
    progressPercent,
    replacingDocId,
    previewDoc,
    validationError,
    fileInputRef,
    cameraInputRef,
    handleTriggerUpload,
    handleTriggerCamera,
    handleFileSelected,
    handleDelete,
    handleStartReplace,
    handleCancelReplace,
    handleView,
    handleClosePreview,
    handleAddressProofTypeChange,
    handleProceed,
  }
}
