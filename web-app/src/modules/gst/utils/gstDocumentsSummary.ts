import {
  DEFAULT_DOCUMENT_ITEMS,
  type DocumentItemDef,
  type UploadedFileInfo,
} from './gstDocumentsData'

export type DocumentSummaryType = 'required' | 'if_applicable' | 'recommended' | 'optional'
export type DocumentSummaryStatus = 'verified' | 'not_added' | 'not_applicable' | 'pending'

export interface CalculatedDocumentSummaryItem {
  id: string
  label: string
  completed: number
  total: number
  type: DocumentSummaryType
  status: DocumentSummaryStatus
  statusText: string
  applicableCount: number
  notApplicableCount: number
}

export interface DocumentSummaryResult {
  items: CalculatedDocumentSummaryItem[]
  totalVerified: number
  totalRequiredOrApplicable: number
  totalDocs: number
  allRequiredVerified: boolean
}

export const calculateDocumentSummary = (
  items: DocumentItemDef[] = DEFAULT_DOCUMENT_ITEMS,
  uploadedFiles: Record<string, UploadedFileInfo> = {},
  notApplicableMap: Record<string, boolean> = {}
): DocumentSummaryResult => {
  // 1. Required Documents (total = 3)
  const reqItems = items.filter((item) => item.badge === 'Required')
  const reqCompleted = reqItems.filter(
    (item) => uploadedFiles[item.id] && uploadedFiles[item.id].status !== 'rejected'
  ).length
  const reqStatus: DocumentSummaryStatus =
    reqCompleted === reqItems.length
      ? 'verified'
      : reqCompleted === 0
      ? 'not_added'
      : 'pending'
  const reqStatusText =
    reqStatus === 'verified'
      ? 'Verified'
      : reqStatus === 'not_added'
      ? 'Not Added'
      : 'Pending Verification'

  // 2. If Applicable Documents (total = 4)
  const ifAppItems = items.filter((item) => item.badge === 'If applicable')
  const ifAppNotApplicableCount = ifAppItems.filter((item) => notApplicableMap[item.id]).length
  const ifAppApplicableItems = ifAppItems.filter((item) => !notApplicableMap[item.id])
  const ifAppCompleted = ifAppApplicableItems.filter(
    (item) => uploadedFiles[item.id] && uploadedFiles[item.id].status !== 'rejected'
  ).length

  let ifAppStatus: DocumentSummaryStatus = 'verified'
  let ifAppStatusText = 'Verified'

  if (ifAppNotApplicableCount === ifAppItems.length) {
    ifAppStatus = 'not_applicable'
    ifAppStatusText = 'Not Applicable'
  } else if (ifAppCompleted === ifAppApplicableItems.length && ifAppApplicableItems.length > 0) {
    ifAppStatus = 'verified'
    ifAppStatusText = 'Verified'
  } else if (ifAppCompleted === 0) {
    ifAppStatus = 'not_added'
    ifAppStatusText = 'Not Added'
  } else {
    ifAppStatus = 'pending'
    ifAppStatusText = 'Pending Verification'
  }

  // 3. Recommended Documents (total = 4)
  const recItems = items.filter((item) => item.badge === 'Recommended')
  const recCompleted = recItems.filter(
    (item) => uploadedFiles[item.id] && uploadedFiles[item.id].status !== 'rejected'
  ).length
  const recStatus: DocumentSummaryStatus =
    recCompleted === recItems.length
      ? 'verified'
      : recCompleted === 0
      ? 'not_added'
      : 'pending'
  const recStatusText =
    recStatus === 'verified'
      ? 'Verified'
      : recStatus === 'not_added'
      ? 'Not Added'
      : 'Pending Verification'

  // 4. Optional Documents (total = 1)
  const optItems = items.filter((item) => item.badge === 'Optional')
  const optCompleted = optItems.filter(
    (item) => uploadedFiles[item.id] && uploadedFiles[item.id].status !== 'rejected'
  ).length
  const optStatus: DocumentSummaryStatus =
    optCompleted === optItems.length ? 'verified' : 'not_added'
  const optStatusText = optCompleted === optItems.length ? 'Verified' : 'Not Added'

  const summaryItems: CalculatedDocumentSummaryItem[] = [
    {
      id: '1',
      label: 'Required Documents',
      completed: reqCompleted,
      total: reqItems.length,
      type: 'required',
      status: reqStatus,
      statusText: reqStatusText,
      applicableCount: reqItems.length,
      notApplicableCount: 0,
    },
    {
      id: '2',
      label: 'If Applicable Documents',
      completed: ifAppCompleted,
      total: ifAppItems.length,
      type: 'if_applicable',
      status: ifAppStatus,
      statusText: ifAppStatusText,
      applicableCount: ifAppApplicableItems.length,
      notApplicableCount: ifAppNotApplicableCount,
    },
    {
      id: '3',
      label: 'Recommended Documents',
      completed: recCompleted,
      total: recItems.length,
      type: 'recommended',
      status: recStatus,
      statusText: recStatusText,
      applicableCount: recItems.length,
      notApplicableCount: 0,
    },
    {
      id: '4',
      label: 'Optional Documents',
      completed: optCompleted,
      total: optItems.length,
      type: 'optional',
      status: optStatus,
      statusText: optStatusText,
      applicableCount: optItems.length,
      notApplicableCount: 0,
    },
  ]

  const totalVerified = reqCompleted + ifAppCompleted + recCompleted + optCompleted
  const totalDocs = items.length
  const allRequiredVerified = reqCompleted === reqItems.length

  return {
    items: summaryItems,
    totalVerified,
    totalRequiredOrApplicable: reqItems.length + ifAppApplicableItems.length,
    totalDocs,
    allRequiredVerified,
  }
}
