import type { MachineryBusinessType, MachineryBusinessVintage } from '@modules/loans/types/machineryLoan.types'

export const BUSINESS_TYPE_OPTIONS: MachineryBusinessType[] = [
  'Proprietorship',
  'Partnership',
  'LLP',
  'Private Limited',
  'Other',
]

export const BUSINESS_VINTAGE_OPTIONS: MachineryBusinessVintage[] = [
  'Less than 1 year',
  '1–3 years',
  '3–5 years',
  '5–10 years',
  '10+ years',
]
