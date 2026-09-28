import type { UploadedLoanDocument } from './loanDocument.types'

export const loanDocumentService = {
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
