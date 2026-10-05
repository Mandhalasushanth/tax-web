import { useState, useRef, useMemo, type ChangeEvent } from 'react'
import type { DocumentItem, DocumentCategory, DocPreviewState } from '@modules/gst/types/gstDocuments.types'
import { validateUploadFile } from '@shared/utils'
import { INITIAL_DOCUMENTS, getGstDocUploadRule } from '@modules/gst/utils/gstDocuments.constants'
import { getDocumentsStepError } from '@modules/gst/utils/gstRegistrationGuard'
import { gstUploadedFiles } from '@modules/gst/services/gstUploadedFiles'

export const useGstDocuments = (
  initialDocs?: DocumentItem[],
  onDocsChange?: (docs: DocumentItem[]) => void
) => {
  const [documents, setDocuments] = useState<DocumentItem[]>(() => initialDocs || INITIAL_DOCUMENTS)
  const [activeUploadTargetId, setActiveUploadTargetId] = useState<string | null>(null)
  const [replacingDocId, setReplacingDocId] = useState<string | null>(null)
  const [previewDoc, setPreviewDoc] = useState<DocPreviewState | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  /** Per-document upload errors (wrong type, too large, fake content) */
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({})

  // Adopt a new initialDocs list from the parent (during render, no extra effect pass)
  const [syncedInitialDocs, setSyncedInitialDocs] = useState(initialDocs)
  if (syncedInitialDocs !== initialDocs) {
    setSyncedInitialDocs(initialDocs)
    if (initialDocs && initialDocs.length > 0) setDocuments(initialDocs)
  }

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

  /**
   * Accepts a file for a document slot only after it passes the slot's rule
   * (allowed type, max size, genuine file signature). Rejected files leave the slot unchanged.
   */
  const acceptFile = async (docId: string, file: File) => {
    const error = await validateUploadFile(file, getGstDocUploadRule(docId))
    if (error) {
      setUploadErrors((prev) => ({ ...prev, [docId]: error }))
      return
    }
    setUploadErrors(({ [docId]: _removed, ...rest }) => rest)
    gstUploadedFiles.set(docId, file)
    updateDocuments((prev) =>
      prev.map((doc) => (doc.id === docId ? { ...doc, isUploaded: true, fileName: file.name } : doc))
    )
    setReplacingDocId(null)
    setValidationError(null)
  }

  const handleFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const targetId = activeUploadTargetId
    if (!file || !targetId) return
    setActiveUploadTargetId(null)
    await acceptFile(targetId, file)
  }

  const handleDelete = (id: string) => {
    setUploadErrors(({ [id]: _removed, ...rest }) => rest)
    gstUploadedFiles.remove(id)
    updateDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, isUploaded: false, fileName: undefined } : doc))
    )
  }

  const handleStartReplace = (id: string) => setReplacingDocId(id)
  const handleCancelReplace = () => setReplacingDocId(null)

  const handleView = (doc: DocumentItem) => {
    setPreviewDoc({
      title: doc.title,
      fileName: doc.fileName || doc.title,
      file: gstUploadedFiles.get(doc.id),
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
    const stepError = getDocumentsStepError(documents)
    setValidationError(stepError)
    if (!stepError) onNext()
  }

  const handleDirectUpload = async (id: string, file: File) => {
    setActiveUploadTargetId(null)
    await acceptFile(id, file)
  }

  return {
    groupedDocs,
    completedCount,
    totalCount,
    progressPercent,
    replacingDocId,
    previewDoc,
    validationError,
    uploadErrors,
    fileInputRef,
    cameraInputRef,
    handleTriggerUpload,
    handleTriggerCamera,
    handleFileSelected,
    handleDirectUpload,
    handleDelete,
    handleStartReplace,
    handleCancelReplace,
    handleView,
    handleClosePreview,
    handleAddressProofTypeChange,
    handleProceed,
  }
}
