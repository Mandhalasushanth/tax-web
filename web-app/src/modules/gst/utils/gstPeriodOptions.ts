export interface SelectOption {
  value: string
  label: string
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const toOption = (value: string): SelectOption => ({ value, label: value })

/** Indian financial year (April–March) that contains the given date, as its starting year */
const fyStartYear = (date: Date): number => (date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1)
const fyLabel = (startYear: number): string => `FY ${startYear}-${String(startYear + 1).slice(-2)}`

const today = new Date()
const currentFyStart = fyStartYear(today)

/** Current and two previous financial years */
export const FINANCIAL_YEAR_OPTIONS: SelectOption[] = [0, 1, 2].map((back) => toOption(fyLabel(currentFyStart - back)))

export const FILING_FREQUENCY_OPTIONS = [
  { id: 'Monthly', label: 'Monthly' },
  { id: 'Quarterly', label: 'Quarterly' },
  { id: 'Annual', label: 'Annual' },
]

/** Last five completed months (a return is filed for the previous month) */
export const MONTHLY_PERIOD_OPTIONS: SelectOption[] = [1, 2, 3, 4, 5].map((back) => {
  const d = new Date(today.getFullYear(), today.getMonth() - back, 1)
  return toOption(`${MONTHS[d.getMonth()]} ${d.getFullYear()}`)
})

/** Four quarters of the current financial year */
export const QUARTERLY_PERIOD_OPTIONS: SelectOption[] = [
  ['Quarter 1', 'Apr', 'Jun', 0],
  ['Quarter 2', 'Jul', 'Sep', 0],
  ['Quarter 3', 'Oct', 'Dec', 0],
  ['Quarter 4', 'Jan', 'Mar', 1],
].map(([name, from, to, offset]) => toOption(`${name} (${from} - ${to} ${currentFyStart + Number(offset)})`))

/** Annual returns for the current and previous financial year */
export const ANNUAL_PERIOD_OPTIONS: SelectOption[] = [0, 1].map((back) => toOption(`${fyLabel(currentFyStart - back)} Annual Return`))

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
