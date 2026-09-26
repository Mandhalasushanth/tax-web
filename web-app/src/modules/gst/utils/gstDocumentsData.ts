export type DocumentBadgeType = 'Required' | 'If applicable' | 'Recommended' | 'Optional'

export type DocumentIconType =
  | 'invoice'
  | 'credit-note'
  | 'debit-note'
  | 'irn'
  | 'eway'
  | 'purchase'
  | 'gstr2b'
  | 'expense'
  | 'bank'
  | 'prev-returns'
  | 'arn'
  | 'other'

export interface DocumentItemDef {
  id: string
  categoryId: string
  title: string
  subtitle: string
  badge: DocumentBadgeType
  isRequired?: boolean
  iconType: DocumentIconType
}

export interface DocumentCategoryDef {
  id: string
  title: string
}

export interface UploadedFileInfo {
  name: string
  sizeText: string
  uploadTime: string
  fileUrl?: string
  status?: 'verified' | 'pending' | 'rejected'
}


export const DOCUMENT_CATEGORIES: DocumentCategoryDef[] = [
  { id: 'sales', title: 'SALES & OUTWARD SUPPLIES' },
  { id: 'purchases', title: 'PURCHASES & INPUT TAX' },
  { id: 'banking', title: 'BANKING & RECONCILIATION' },
  { id: 'statutory', title: 'STATUTORY & COMPLIANCE' },
]

export const DEFAULT_DOCUMENT_ITEMS: DocumentItemDef[] = [
  // 1. Sales & Outward Supplies
  {
    id: 'sales-invoices',
    categoryId: 'sales',
    title: 'Sales Invoices / Register',
    subtitle: 'Outward supply bill book / tax invoices',
    badge: 'Required',
    isRequired: true,
    iconType: 'invoice',
  },
  {
    id: 'credit-notes',
    categoryId: 'sales',
    title: 'Credit Notes',
    subtitle: 'Issued during the period for sales returns',
    badge: 'If applicable',
    isRequired: false,
    iconType: 'credit-note',
  },
  {
    id: 'debit-notes',
    categoryId: 'sales',
    title: 'Debit Notes',
    subtitle: 'Issued for rate differences or adjustments',
    badge: 'If applicable',
    isRequired: false,
    iconType: 'debit-note',
  },
  {
    id: 'irn-data',
    categoryId: 'sales',
    title: 'E-Invoice Data (IRN)',
    subtitle: 'JSON / PDF files where applicable',
    badge: 'If applicable',
    isRequired: false,
    iconType: 'irn',
  },
  {
    id: 'eway-data',
    categoryId: 'sales',
    title: 'E-Way Bill Data',
    subtitle: 'Consolidated transit bills for goods movement',
    badge: 'If applicable',
    isRequired: false,
    iconType: 'eway',
  },

  // 2. Purchases & Input Tax
  {
    id: 'purchase-invoices',
    categoryId: 'purchases',
    title: 'Purchase Invoices / Register',
    subtitle: 'Inward supply tax invoices with GST details',
    badge: 'Required',
    isRequired: true,
    iconType: 'purchase',
  },
  {
    id: 'gstr2b-statement',
    categoryId: 'purchases',
    title: 'GSTR-2B ITC Statement',
    subtitle: 'Auto-drafted ITC statement from GST portal',
    badge: 'Required',
    isRequired: true,
    iconType: 'gstr2b',
  },
  {
    id: 'expense-invoices',
    categoryId: 'purchases',
    title: 'Expense Invoices & Vouchers',
    subtitle: 'Electricity, telephone, logistics, rent etc.',
    badge: 'Recommended',
    isRequired: false,
    iconType: 'expense',
  },

  // 3. Banking & Reconciliation
  {
    id: 'bank-statements',
    categoryId: 'banking',
    title: 'Bank Statements',
    subtitle: 'Bank statements for all active business accounts',
    badge: 'Recommended',
    isRequired: false,
    iconType: 'bank',
  },
  {
    id: 'prev-gst-returns',
    categoryId: 'banking',
    title: 'Previous GST Returns',
    subtitle: 'Copies of previous GSTR-1 & GSTR-3B',
    badge: 'Recommended',
    isRequired: false,
    iconType: 'prev-returns',
  },
  {
    id: 'prev-filing-ack',
    categoryId: 'banking',
    title: 'Previous Filing Acknowledgement',
    subtitle: 'ARN receipt copy for ITC balance and reconciliation',
    badge: 'Recommended',
    isRequired: false,
    iconType: 'arn',
  },

  // 4. Statutory & Compliance
  {
    id: 'other-supporting-docs',
    categoryId: 'statutory',
    title: 'Other Supporting Documents',
    subtitle: 'Challans, ledgers, or CA reconciliation files',
    badge: 'Optional',
    isRequired: false,
    iconType: 'other',
  },
]

export const DEFAULT_FILING_UPLOADED_FILES: Record<string, UploadedFileInfo> = {
  'sales-invoices': {
    name: 'Sales_Register_Dec2025.xlsx',
    sizeText: '2.4 MB',
    uploadTime: '10:30 AM',
    status: 'verified',
  },
  'credit-notes': {
    name: 'Credit_Notes_Dec2025.pdf',
    sizeText: '540 KB',
    uploadTime: '10:31 AM',
    status: 'verified',
  },
  'debit-notes': {
    name: 'Debit_Notes_Dec2025.pdf',
    sizeText: '320 KB',
    uploadTime: '10:31 AM',
    status: 'verified',
  },
  'irn-data': {
    name: 'E_Invoice_IRN_Dec2025.json',
    sizeText: '1.1 MB',
    uploadTime: '10:32 AM',
    status: 'verified',
  },
  'eway-data': {
    name: 'EWay_Bills_Dec2025.pdf',
    sizeText: '880 KB',
    uploadTime: '10:32 AM',
    status: 'verified',
  },
  'purchase-invoices': {
    name: 'Purchase_Register_Dec2025.xlsx',
    sizeText: '3.1 MB',
    uploadTime: '10:33 AM',
    status: 'verified',
  },
  'gstr2b-statement': {
    name: 'GSTR2B_Dec2025_Statement.pdf',
    sizeText: '1.5 MB',
    uploadTime: '10:34 AM',
    status: 'verified',
  },
  'expense-invoices': {
    name: 'Expense_Vouchers_Dec2025.pdf',
    sizeText: '1.8 MB',
    uploadTime: '10:35 AM',
    status: 'verified',
  },
  'bank-statements': {
    name: 'Bank_Statement_Dec2025.pdf',
    sizeText: '2.9 MB',
    uploadTime: '10:36 AM',
    status: 'verified',
  },
  'prev-gst-returns': {
    name: 'Previous_GSTR3B_Nov2025.pdf',
    sizeText: '620 KB',
    uploadTime: '10:37 AM',
    status: 'verified',
  },
  'prev-filing-ack': {
    name: 'ARN_Acknowledgement_Nov2025.pdf',
    sizeText: '410 KB',
    uploadTime: '10:38 AM',
    status: 'verified',
  },
}

export {
  calculateDocumentSummary,
  type DocumentSummaryType,
  type DocumentSummaryStatus,
  type CalculatedDocumentSummaryItem,
  type DocumentSummaryResult,
} from './gstDocumentsSummary'


