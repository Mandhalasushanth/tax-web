import type { FilingPeriodData } from '../components/GSTFiling/GSTFilingPeriod/GSTFilingPeriod'

export interface TaxComputationItem {
  particulars: string
  amount: number | null
}

export interface DocumentSummaryItem {
  id: string
  label: string
  completed: number
  total: number
  type: 'required' | 'if_applicable' | 'recommended' | 'optional'
  status?: 'verified' | 'not_added' | 'not_applicable' | 'pending'
  statusText?: string
}

export interface ReviewDetailsData {
  gstin: string
  businessName: string
  financialYear: string
  filingPeriod: string
  scheme: string
  frequency: string
  filingType: string
  returnForm: string
  attachedDocsCount: number
}

const DEFAULT_REVIEW_DETAILS = {
  scheme: 'Regular Scheme',
  frequency: 'Monthly',
  filingType: 'Regular Return',
  returnForm: 'combo',
}

const TAX_COMPUTATION_LABELS = ['Gross Taxable Turnover', 'Output GST', 'Eligible ITC (GSTR-2B)']

/**
 * Tax figures are computed by the TaxEdge CA from the uploaded documents, so they are
 * shown as pending (null) until then. A nil return has no liability.
 */
export const getTaxComputationRows = (isNilReturn: boolean): { items: TaxComputationItem[]; netLiability: number | null } => ({
  items: TAX_COMPUTATION_LABELS.map((particulars) => ({ particulars, amount: isNilReturn ? 0 : null })),
  netLiability: isNilReturn ? 0 : null,
})

export const DEFAULT_DOC_SUMMARY: DocumentSummaryItem[] = [
  { id: '1', label: 'Required Documents', completed: 3, total: 3, type: 'required', status: 'verified', statusText: 'Verified' },
  { id: '2', label: 'If Applicable Documents', completed: 4, total: 4, type: 'if_applicable', status: 'verified', statusText: 'Verified' },
  { id: '3', label: 'Recommended Documents', completed: 4, total: 4, type: 'recommended', status: 'verified', statusText: 'Verified' },
  { id: '4', label: 'Optional Documents', completed: 0, total: 1, type: 'optional', status: 'not_added', statusText: 'Not Added' },
]

export const WHAT_HAPPENS_NEXT_STEPS = [
  { step: 1, text: 'Review your details and tax computation' },
  { step: 2, text: 'Approve and proceed to payment' },
  { step: 3, text: 'We will file your GST return with the government' },
  { step: 4, text: 'You will receive a confirmation and ARN' },
]

export const getResolvedReviewDetails = (
  filingData?: Partial<FilingPeriodData>,
  attachedDocsCount?: number
): ReviewDetailsData => {
  return {
    gstin: filingData?.gstin?.trim() || '',
    businessName: filingData?.businessName?.trim() || '',
    financialYear: filingData?.financialYear?.trim() || '',
    filingPeriod: filingData?.selectedMonth?.trim() || '',
    scheme: DEFAULT_REVIEW_DETAILS.scheme,
    frequency: filingData?.frequency?.trim() || DEFAULT_REVIEW_DETAILS.frequency,
    filingType: filingData?.filingType === 'nil' ? 'Nil Return' : DEFAULT_REVIEW_DETAILS.filingType,
    returnForm: filingData?.returnType?.trim() || DEFAULT_REVIEW_DETAILS.returnForm,
    attachedDocsCount: attachedDocsCount ?? 0,
  }
}

