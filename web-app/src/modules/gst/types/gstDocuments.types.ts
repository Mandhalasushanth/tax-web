export type DocumentCategory = 'identity' | 'business' | 'financial'

export interface DocumentItem {
  id: string
  title: string
  subtitle: string
  category: DocumentCategory
  iconBg: string
  iconColor: string
  fileName?: string
  isUploaded: boolean
  addressProofType?: string
}

export type UploadedDoc = DocumentItem

export interface GSTStepDocumentsProps {
  initialDocuments?: DocumentItem[]
  onDocumentsChange?: (docs: DocumentItem[]) => void
  onBack: () => void
  onNext: () => void
  onSaveDraft?: () => void
}

export interface DocPreviewState {
  title: string
  fileName: string
}
