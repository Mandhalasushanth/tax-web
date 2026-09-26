import type { UploadedLoanDocument } from '../../../documents/loanDocument.types'

export type HomeLoanOccupation = 'salaried' | 'self-employed' | 'business-owner' | ''

export interface HomeLoanData {
  // Step 1: Requirements
  loanAmount: number | string
  propertyIntent: string
  repaymentTenureYears: number
  propertyStage?: string
  estimatedPropertyCost?: string

  // Step 2: Employment & Income
  occupation: HomeLoanOccupation
  monthlyIncomeRange: string
  exactMonthlyIncome?: string
  hasExistingEmis: boolean
  existingEmiAmount?: string

  // Step 3: Banking & ITR
  bankName: string
  accountNumber: string
  ifscCode: string
  itrStatus: 'filed' | 'not-filed' | 'exempt' | ''
  itrAckNumber?: string
  annualIncomeAsPerItr?: string

  // Step 4: Documents
  uploadedDocs: Record<string, UploadedLoanDocument>

  // Step 5: Terms
  termsAccepted: boolean
}
