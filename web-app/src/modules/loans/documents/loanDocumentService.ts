import { useAppStore } from '@store/index'
import type { UploadedLoanDocument } from './loanDocument.types'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
const ALLOWED_EXTENSIONS = /\.(pdf|jpe?g|png)$/i

export const loanDocumentService = {
  /** Checks type (PDF, JPG, PNG) and the 5 MB limit; returns an error message or undefined */
  validateFile: (file: File): string | undefined => {
    if (!ALLOWED_TYPES.includes(file.type) && !ALLOWED_EXTENSIONS.test(file.name)) {
      return 'Invalid file format. Only PDF, JPG, and PNG files are accepted.'
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds the 5 MB limit. Please upload a smaller file.'
    }
    return undefined
  },

  /** Returns true when the file is acceptable; otherwise shows the reason as an error toast */
  acceptFile: (file: File): boolean => {
    const error = loanDocumentService.validateFile(file)
    if (error) useAppStore.getState().pushToast(error, 'error')
    return !error
  },

  formatFileSize: (bytes: number): string => {
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(k)) : 0
    return bytes === 0 ? '0 B' : `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  },

  createDocumentEntry: (id: string, file: File): UploadedLoanDocument => {
    return {
      id,
      name: file.name,
      size: loanDocumentService.formatFileSize(file.size),
      file,
      uploadedAt: new Date().toISOString(),
    }
  },

  createUploadedDocument: (file: File, id?: string): UploadedLoanDocument => {
    return {
      id: id || file.name,
      name: file.name,
      size: loanDocumentService.formatFileSize(file.size),
      file,
      uploadedAt: new Date().toISOString(),
    }
  },
}
