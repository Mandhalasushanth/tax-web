import type { ReactNode } from 'react'
import type { GstBusinessFormData } from '../components/GSTRegistration/GSTStepBusiness/GSTStepBusiness'
import type { DocumentItem } from './gstDocuments.types'

export interface ReviewField {
  label: string
  value: string | ReactNode
}

export interface ReviewSectionData {
  id: string
  title: string
  icon: ReactNode
  iconBg: string
  fields: ReviewField[]
  onEdit?: () => void
}

export interface GSTStepReviewProps {
  businessData: GstBusinessFormData
  documents?: DocumentItem[]
  onEdit: (section?: string) => void
  onBack: () => void
  onProceed: () => void
  onSaveDraft?: () => void
}
