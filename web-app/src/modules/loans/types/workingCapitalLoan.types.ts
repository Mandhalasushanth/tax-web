import type { UploadedLoanDocument } from '@modules/loans/documents/loanDocument.types'

export type WorkingCapitalCreditPurpose =
  | 'Working Capital'
  | 'Inventory / Stock'
  | 'Raw Material Purchase'
  | 'Supplier Payments'
  | 'Business Operating Expenses'
  | 'Receivables / Cash Flow Gap'
  | 'Other'
  | ''

export type WorkingCapitalFacilityType =
  | 'Cash Credit (CC) Facility'
  | 'Overdraft (OD) Line'
  | 'Invoice / Bill Discounting'
  | ''

export type WorkingCapitalTrackRecord =
  | '< 1 Year'
  | '1 - 2 Years'
  | '3 - 5 Years'
  | '5 - 10 Years'
  | '10+ Years'
  | ''

export type WorkingCapitalItrStatus =
  | 'Filed'
  | 'Not Filed'
  | 'Exempt'
  | ''

export interface WorkingCapitalLoanData {
  // Step 1: Financials / Facility Requirements
  requiredCreditLimit: number | string
  creditPurpose: WorkingCapitalCreditPurpose
  preferredFacilityType: WorkingCapitalFacilityType
  hasActiveBorrowings: boolean
  monthlyEmiOutgo?: string

  // Step 2: Business & Banking (Section 1: Business Operations & Financials)
  registeredBusinessName: string
  gstinNumber: string
  udyamRegistrationNumber?: string
  operationalTrackRecord: WorkingCapitalTrackRecord
  annualAuditedTurnover: string
  annualNetProfitBeforeTax: string

  // Step 2: Business & Banking (Section 2: Operating Current Account & Taxation)
  currentAccountBankName: string
  currentAccountNumber: string
  bankIfscCode: string
  bankBranchName?: string
  itrFilingStatus: WorkingCapitalItrStatus
  itrAcknowledgementNumber?: string

  // Step 3 / 4: Documents & Review
  uploadedDocs: Record<string, UploadedLoanDocument>
  termsAccepted: boolean
}
