import { useState, useCallback } from 'react'
import { loanDocumentService } from '../../../../documents/loanDocumentService'
import { validateDocumentFile } from '../../../../validation/businessLoanValidation'
import type { UploadedLoanDocument } from '../../../../documents/loanDocument.types'

export interface UseDocumentVerificationProps {
  uploadedDocs?: Record<string, UploadedLoanDocument>
  onChange: (fields: { uploadedDocs: Record<string, UploadedLoanDocument> }) => void
}

/**
 * Custom hook for Step 4 Document Verification operations
 * Encapsulates file validation, upload, removal, preview, and error states with robust exception handling.
 */
export function useDocumentVerification({
  uploadedDocs = {},
  onChange,
}: UseDocumentVerificationProps) {
  const [fileError, setFileError] = useState<string | null>(null)

  const handleUpload = useCallback(
    (id: string, file: File) => {
      try {
        setFileError(null)
        const validation = validateDocumentFile(file)
        !validation.isValid
          ? setFileError(validation.error || 'Invalid file uploaded.')
          : onChange({
              uploadedDocs: {
                ...uploadedDocs,
                [id]: loanDocumentService.createDocumentEntry(id, file),
              },
            })
      } catch (err) {
        console.error(`[useDocumentVerification] Error uploading document ${id}:`, err)
        setFileError('Failed to process uploaded file. Please try again.')
      }
    },
    [uploadedDocs, onChange]
  )

  const handleRemove = useCallback(
    (id: string) => {
      try {
        setFileError(null)
        const nextUploaded = { ...uploadedDocs }
        delete nextUploaded[id]
        onChange({ uploadedDocs: nextUploaded })
      } catch (err) {
        console.error(`[useDocumentVerification] Error removing document ${id}:`, err)
        setFileError('Failed to remove document. Please try again.')
      }
    },
    [uploadedDocs, onChange]
  )

  const handleView = useCallback(
    (doc: { id: string; title: string; fileName?: string; file?: File }) => {
      try {
        doc.file
          ? window.open(URL.createObjectURL(doc.file), '_blank')
          : alert(`Viewing ${doc.fileName || doc.title}`)
      } catch (err) {
        console.error(`[useDocumentVerification] Error viewing document ${doc.id}:`, err)
      }
    },
    []
  )

  return {
    fileError,
    setFileError,
    handleUpload,
    handleRemove,
    handleView,
  }
}
