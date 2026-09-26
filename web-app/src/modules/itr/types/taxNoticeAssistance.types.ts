export interface NoticeFormData {
  pan: string
  assessmentYear: string
  noticeType: string
  noticeDate: string
  noticeReference: string
  responseDueDate: string
  explanation: string
  documentFile: File | null
  documentFileName: string
  documentFileSize: string
  supportingDocuments?: Record<string, { fileName: string; fileSize: string; fileUrl?: string }>
  remarks?: string
  responseConfirmed?: boolean
  applicationCode?: string
  acknowledgementNo?: string
  assignedExecutive?: string
  submittedAt?: string
}

export const ASSESSMENT_YEAR_OPTIONS = [
  'AY 2026-27',
  'AY 2025-26',
  'AY 2024-25',
  'AY 2023-24',
  'AY 2022-23',
]

export const NOTICE_TYPE_OPTIONS = [
  'Section 143(1)(a) - Proposed Adjustment',
  'Section 139(9) - Defective Return',
  'Section 142(1) - Inquiry Before Assessment',
  'Section 148 - Income Escaping Assessment',
  'Section 156 - Notice of Demand',
  'Section 245 - Intimation for Adjustment of Refund',
  'Section 143(2) - Scrutiny Assessment',
  'Other Notice / IT Communication',
]

export interface SupportingDocumentItem {
  id: string
  title: string
  subtitle: string
  required: boolean
}

export const SUPPORTING_DOCUMENT_LIST: SupportingDocumentItem[] = [
  {
    id: 'tax-notice',
    title: 'Tax Notice',
    subtitle: 'Uploaded tax notice copy from IT department',
    required: true,
  },
  {
    id: 'previous-itr',
    title: 'Previous ITR',
    subtitle: 'Filed return form for the relevant or preceding year',
    required: true,
  },
  {
    id: 'itr-ack',
    title: 'ITR Acknowledgement',
    subtitle: 'ITR-V acknowledgement receipt of return',
    required: true,
  },
  {
    id: 'form-16',
    title: 'Form 16 / 16A',
    subtitle: 'TDS certificates issued by employer or deductors',
    required: true,
  },
  {
    id: 'ais',
    title: 'AIS (AY 2025–26)',
    subtitle: 'Comprehensive statement from the Income Tax portal',
    required: true,
  },
  {
    id: 'tis',
    title: 'TIS (Taxpayer Information Summary) (Optional)',
    subtitle: 'Summary statement of taxable financial transactions',
    required: false,
  },
  {
    id: 'bank-statements',
    title: 'Bank Statements',
    subtitle: 'Full financial year statement of all bank accounts',
    required: true,
  },
  {
    id: 'supporting-income',
    title: 'Supporting Income Documents (Optional)',
    subtitle: 'Interest certificates, dividend statements, capital gains',
    required: false,
  },
  {
    id: 'supporting-expense',
    title: 'Supporting Expense Documents (Optional)',
    subtitle: '80C/80D proofs, medical bills, donation receipts',
    required: false,
  },
  {
    id: 'previous-responses',
    title: 'Previous Tax Responses (Optional)',
    subtitle: 'Any past submissions, letters, or rectification requests',
    required: false,
  },
  {
    id: 'other-documents',
    title: 'Other Notice-Specific Documents (Optional)',
    subtitle: 'Property registry deeds, gift deeds, agreements',
    required: false,
  },
]
