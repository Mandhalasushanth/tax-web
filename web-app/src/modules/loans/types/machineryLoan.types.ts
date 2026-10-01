import type { UploadedLoanDocument } from '@modules/loans/documents/loanDocument.types'

export type MachineryEquipmentType =
  | 'CNC / Automation Machinery'
  | 'Medical Equipment'
  | 'Printing / Packaging Machinery'
  | 'Construction Machinery'
  | 'Food Processing Machinery'
  | 'Textile Machinery'
  | 'Other'
  | ''

export type MachineryLoanRepaymentTenure =
  | '12 Months'
  | '24 Months'
  | '36 Months'
  | '48 Months'
  | '57 Months'
  | '60 Months'
  | '63 Months'
  | '66 Months'
  | '69 Months'
  | '72 Months'
  | '75 Months'
  | '78 Months'
  | '81 Months'
  | '84 Months'
  | ''

export type MachineryBusinessType =
  | 'Proprietorship'
  | 'Partnership'
  | 'LLP'
  | 'Private Limited'
  | 'Other'
  | ''

export type MachineryBusinessVintage =
  | 'Less than 1 year'
  | '1–3 years'
  | '3–5 years'
  | '5–10 years'
  | '10+ years'
  | ''

export interface MachineryLoanData {
  // Step 1: Loan Details
  loanAmount: number | string
  machineryType: MachineryEquipmentType
  repaymentTenure: MachineryLoanRepaymentTenure

  // Step 2: Business Details
  businessName: string
  businessType: MachineryBusinessType
  businessVintage: MachineryBusinessVintage
  annualTurnover: string
  isGstRegistered: boolean
  gstin?: string

  // Step 3: Banking
  bankName: string
  accountNumber: string
  ifscCode: string
  branchName?: string

  // Step 4: Documents & Review
  uploadedDocs: Record<string, UploadedLoanDocument>
  termsAccepted: boolean
}
