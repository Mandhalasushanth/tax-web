import type { UploadedLoanDocument } from '../documents/loanDocument.types'

export type PersonalLoanPurposeOption =
  | 'Personal Expenses'
  | 'Medical Emergency'
  | 'Home Renovation'
  | 'Debt Consolidation'
  | 'Travel & Vacation'
  | 'Wedding / Family Event'
  | 'Higher Education'
  | 'Other'

export type PersonalLoanTenureOption =
  | '3 Months'
  | '6 Months'
  | '12 Mos (1 Yr)'
  | '24 Mos (2 Yrs)'
  | '36 Mos (3 Yrs)'
  | '48 Mos (4 Yrs)'
  | '60 Mos (5 Yrs)'

export interface PersonalLoanData {
  // Step 1: Financial Requirements
  requiredLoanAmount: string
  purposeOfLoan: string
  preferredTenure: string
  monthlyNetSalary: string
  hasExistingLoans: boolean
  existingMonthlyEmi?: string

  // Step 2: Banking Details
  primaryBankName: string
  bankAccountNumber: string
  bankIfscCode: string
  branchName?: string

  // Step 3: Documents
  uploadedDocs: Record<string, UploadedLoanDocument>

  // Step 4: Review Declarations
  confirmAccurate: boolean
  authorizeCreditCheck: boolean
}

export interface PersonalLoanStepProps {
  data: PersonalLoanData
  onChange: (fields: Partial<PersonalLoanData>) => void
  errors?: Record<string, string>
}
