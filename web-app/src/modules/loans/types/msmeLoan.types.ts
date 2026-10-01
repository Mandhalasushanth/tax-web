import type { UploadedLoanDocument } from '@modules/loans/documents/loanDocument.types'

/**
 * Employment and business profile types
 */
export type MsmeEmploymentProfileType = 'salaried' | 'self-employed' | 'business-owner' | ''

/**
 * Existing loans choice type
 */
export type MsmeExistingLoansType = 'none' | 'active' | ''

/**
 * Udyam registration choice
 */
export type MsmeUdyamOptionType = 'yes' | 'no' | ''

/**
 * Form data model for MSME Loan application (matching Business Loan architecture)
 */
export interface MsmeLoanFormData {
  // Step 1: Loan & Applicant
  employmentProfile: MsmeEmploymentProfileType
  requiredLoanAmount: string
  preferredTenureMonths: string
  purposeOfLoan: string
  revenueOrTurnover: string
  existingLoans: MsmeExistingLoansType

  // Step 2: Business Details
  registeredBusinessName: string
  businessConstitution: string
  gstin: string
  hasUdyam: MsmeUdyamOptionType
  udyamRegistrationNumber: string
  businessVintage: string
  annualTurnover: string
  annualNetProfit: string
  signatoryName: string
  signatoryDesignation: string
  signatoryEmail: string

  // Step 3: Banking & Tax Records
  primaryOperatingBankName: string
  currentAccountNumber: string
  bankIfscCode: string
  currentLenderBank: string
  totalActiveLoanLimit: string
  itrAcknowledgementNumber: string
  grossTotalIncomeItr: string

  // Legacy/Compatibility fields
  loanPurpose?: string
  repaymentTenure?: string
  hasActiveBorrowings?: boolean
  totalExistingEmiOutgo?: string
  primaryBankName?: string
  itrFilingStatus?: string

  // Step 4: Documents
  uploadedDocs?: Record<string, UploadedLoanDocument>

  // Step 5: Terms & Review
  termsAccepted?: boolean
}
