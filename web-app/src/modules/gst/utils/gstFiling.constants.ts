import type { FilingPeriodData } from '../components/GSTFiling'

export const DEFAULT_FILING_DATA: FilingPeriodData = {
  gstin: '',
  businessName: 'Shree Deshmukh Traders',
  financialYear: 'FY 2026-27',
  frequency: 'Monthly',
  selectedMonth: 'August 2026',
  returnType: 'combo',
  baseFee: 2500,
  filingType: 'regular',
  calculationMethod: 'ca_calculate',
}

export const STEP_LABELS: Record<number, string> = {
  1: 'Period Selection',
  2: 'Upload Documents',
  3: 'Review & Figures',
  4: 'Payment',
}
