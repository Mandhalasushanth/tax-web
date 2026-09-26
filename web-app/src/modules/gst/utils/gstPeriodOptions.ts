export interface SelectOption {
  value: string
  label: string
}

export const FINANCIAL_YEAR_OPTIONS: SelectOption[] = [
  { value: 'FY 2026-27', label: 'FY 2026-27' },
  { value: 'FY 2025-26', label: 'FY 2025-26' },
  { value: 'FY 2024-25', label: 'FY 2024-25' },
]

export const FILING_FREQUENCY_OPTIONS = [
  { id: 'Monthly', label: 'Monthly' },
  { id: 'Quarterly', label: 'Quarterly' },
  { id: 'Annual', label: 'Annual' },
]

export const MONTHLY_PERIOD_OPTIONS: SelectOption[] = [
  { value: 'August 2026', label: 'August 2026' },
  { value: 'July 2026', label: 'July 2026' },
  { value: 'June 2026', label: 'June 2026' },
  { value: 'May 2026', label: 'May 2026' },
  { value: 'April 2026', label: 'April 2026' },
]

export const QUARTERLY_PERIOD_OPTIONS: SelectOption[] = [
  { value: 'Quarter 1 (Apr - Jun 2026)', label: 'Quarter 1 (Apr - Jun 2026)' },
  { value: 'Quarter 2 (Jul - Sep 2026)', label: 'Quarter 2 (Jul - Sep 2026)' },
  { value: 'Quarter 3 (Oct - Dec 2026)', label: 'Quarter 3 (Oct - Dec 2026)' },
  { value: 'Quarter 4 (Jan - Mar 2027)', label: 'Quarter 4 (Jan - Mar 2027)' },
]

export const ANNUAL_PERIOD_OPTIONS: SelectOption[] = [
  { value: 'FY 2026-27 Annual Return', label: 'FY 2026-27 Annual Return' },
  { value: 'FY 2025-26 Annual Return', label: 'FY 2025-26 Annual Return' },
]

export const RETURN_PERIOD_OPTIONS: SelectOption[] = [
  ...MONTHLY_PERIOD_OPTIONS,
  ...QUARTERLY_PERIOD_OPTIONS,
]

export const RETURN_TYPE_OPTIONS: SelectOption[] = [
  { value: 'combo', label: 'GSTR-1 & GSTR-3B (Combo)' },
  { value: 'gstr1', label: 'GSTR-1 (Outward Supplies)' },
  { value: 'gstr3b', label: 'GSTR-3B (Monthly Summary)' },
  { value: 'gstr4', label: 'GSTR-4 (Composition Scheme)' },
  { value: 'cmp08', label: 'CMP-08 (Quarterly Statement)' },
]

export const FILING_TYPE_OPTIONS = [
  {
    id: 'regular' as const,
    title: 'Regular Return',
    description: 'File your GST return with actual details',
  },
  {
    id: 'nil' as const,
    title: 'Nil Return',
    description: 'File a nil return if you have no business activity',
  },
]

export const TAX_CALCULATION_METHOD_OPTIONS = [
  {
    id: 'ca_calculate' as const,
    title: 'Let TaxEdge CA calculate from documents',
    description: 'Upload your invoices & GSTR-2B; our CA computes sales, purchases & ITC',
  },
  {
    id: 'estimated_figures' as const,
    title: 'I already have estimated figures (Optional)',
    description: 'Quickly provide estimated sales, purchases, or ITC summary',
  },
]
