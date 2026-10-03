import type { PersonalLoanPurposeOption, PersonalLoanTenureOption } from '@modules/loans/types/personalLoan.types'

export const AMOUNT_PRESETS = [
  { label: '₹1 Lakh', value: '1,00,000' },
  { label: '₹3 Lakhs', value: '3,00,000' },
  { label: '₹5 Lakhs', value: '5,00,000' },
  { label: '₹10 Lakhs', value: '10,00,000' },
  { label: '₹20 Lakhs', value: '20,00,000' },
]

export const PURPOSE_OPTIONS: PersonalLoanPurposeOption[] = [
  'Personal Expenses',
  'Medical Emergency',
  'Home Renovation',
  'Debt Consolidation',
  'Travel & Vacation',
  'Wedding / Family Event',
  'Higher Education',
  'Other',
]

export const TENURE_OPTIONS: PersonalLoanTenureOption[] = [
  '3 Months',
  '6 Months',
  '12 Mos (1 Yr)',
  '24 Mos (2 Yrs)',
  '36 Mos (3 Yrs)',
  '48 Mos (4 Yrs)',
  '60 Mos (5 Yrs)',
]
