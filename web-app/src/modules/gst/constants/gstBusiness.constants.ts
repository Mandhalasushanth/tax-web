/** Filing company details printed on receipts and declarations */
export const GST_COMPANY = {
  legalName: 'TaxEdge Fin Solutions',
  shortName: 'TE',
  gstin: '27AAKCT9182F12R',
  location: 'Pune, Maharashtra',
  teamName: 'TaxEdge Team',
} as const

/** Professional fees (₹, before GST) */
export const GST_FEES = {
  registration: 1499,
  filingNil: 500,
  filingGstr1: 1500,
  filingCombo: 2500,
  compliance: 4000,
  amendment: 2000,
  cancellation: 3500,
  certificate: 750,
} as const

/** GST charged on TaxEdge professional fees */
export const PLATFORM_GST_RATE = 0.18

/** Base filing fee for the selected return */
export const getFilingBaseFee = (filingType?: string, returnType?: string): number =>
  filingType === 'nil' ? GST_FEES.filingNil : returnType === 'gstr1' ? GST_FEES.filingGstr1 : GST_FEES.filingCombo

/** Fee plus platform GST */
export const withPlatformGst = (base: number): { gst: number; total: number } => {
  const gst = Math.round(base * PLATFORM_GST_RATE)
  return { gst, total: base + gst }
}
