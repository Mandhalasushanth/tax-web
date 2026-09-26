import type { FilingPeriodData } from '../components/GSTFiling/GSTFilingPeriod/GSTFilingPeriod'

export interface TaxComputationItem {
  particulars: string
  amount: number
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

export const DEFAULT_REVIEW_DETAILS: ReviewDetailsData = {
  gstin: '29AAAAA0000A1Z4',
  businessName: 'Shree Deshmukh Traders',
  financialYear: 'FY 2024–25',
  filingPeriod: 'December 2025',
  scheme: 'Regular Scheme',
  frequency: 'Monthly',
  filingType: 'Regular Return',
  returnForm: 'gstr1_3b_monthly',
  attachedDocsCount: 11,
}

export const DEFAULT_TAX_COMPUTATION: TaxComputationItem[] = [
  { particulars: 'Gross Taxable Turnover', amount: 425000 },
  { particulars: 'Output GST (18%)', amount: 76500 },
  { particulars: 'Eligible ITC (GSTR-2B)', amount: 60750 },
]

export const NET_TAX_LIABILITY = 15750

export const DEFAULT_FILING_FEES: TaxComputationItem[] = [
  { particulars: 'CA Consultancy & Reconciliation', amount: 2500 },
  { particulars: 'Platform GST (18%)', amount: 450 },
]

export const TOTAL_PAYABLE_FEE = 2950

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
    gstin: filingData?.gstin?.trim() || DEFAULT_REVIEW_DETAILS.gstin,
    businessName: filingData?.businessName?.trim() || DEFAULT_REVIEW_DETAILS.businessName,
    financialYear: filingData?.financialYear?.trim() || DEFAULT_REVIEW_DETAILS.financialYear,
    filingPeriod: filingData?.selectedMonth?.trim() || DEFAULT_REVIEW_DETAILS.filingPeriod,
    scheme: DEFAULT_REVIEW_DETAILS.scheme,
    frequency: filingData?.frequency?.trim() || DEFAULT_REVIEW_DETAILS.frequency,
    filingType: filingData?.filingType === 'nil' ? 'Nil Return' : DEFAULT_REVIEW_DETAILS.filingType,
    returnForm: filingData?.returnType?.trim() || DEFAULT_REVIEW_DETAILS.returnForm,
    attachedDocsCount: typeof attachedDocsCount === 'number' ? attachedDocsCount : DEFAULT_REVIEW_DETAILS.attachedDocsCount,
  }
}

