import type { UploadedLoanDocument } from '../documents/loanDocument.types'

export type MsmeLoanConstitution =
  | 'Proprietorship'
  | 'Partnership'
  | 'LLP'
  | 'Private Limited'
  | 'Public Limited'
  | 'Others'
  | ''

export type MsmeBusinessVintage =
  | '< 1 Year'
  | '1–2 Years'
  | '3–5 Years'
  | '5–10 Years'
  | '10+ Years'
  | ''

export type MsmeLoanPurpose =
  | 'Working Capital'
  | 'Capital Expenditure'
  | 'Machinery Purchase'
  | 'Expansion / Diversification'
  | 'Export Finance'
  | 'Technology Upgrade'
  | 'Other'
  | ''

export type MsmeLoanTenure =
  | '12 Months'
  | '24 Months'
  | '36 Months'
  | '48 Months'
  | '60 Months'
  | '72 Months'
  | '84 Months'
  | ''

export type MsmeUdyamOption = 'yes' | 'no' | ''
export type MsmeItrStatus = 'Filed' | 'Not Filed' | 'Exempt' | ''

export interface MsmeLoanData {
  // Step 1: MSME Profile & Loan
  requiredLoanAmount: string
  loanPurpose: MsmeLoanPurpose
  repaymentTenure: MsmeLoanTenure
  hasActiveBorrowings: boolean
  totalExistingEmiOutgo: string

  // Step 2: Business & Banking
  registeredBusinessName: string
  businessConstitution: MsmeLoanConstitution
  gstin: string
  hasUdyam: MsmeUdyamOption
  udyamRegistrationNumber: string
  businessVintage: MsmeBusinessVintage
  annualTurnover: string
  annualNetProfit: string
  primaryBankName: string
  currentAccountNumber: string
  bankIfscCode: string
  itrFilingStatus: MsmeItrStatus
  itrAcknowledgementNumber: string

  // Step 3 / 4: Documents & Review
  uploadedDocs: Record<string, UploadedLoanDocument>
  termsAccepted: boolean
}
