import type { ReactNode } from 'react'
import type { GstBusinessFormData } from '../components/GSTRegistration/GSTStepBusiness/GSTStepBusiness'
import type { DocumentItem } from './gstDocuments.types'
import type { GstIconTone } from '@modules/gst/types/gstDocuments.types'

export interface ReviewField {
  label: string
  value: string | ReactNode
}

export interface ReviewSectionData {
  id: string
  title: string
  icon: ReactNode
  tone: GstIconTone
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
