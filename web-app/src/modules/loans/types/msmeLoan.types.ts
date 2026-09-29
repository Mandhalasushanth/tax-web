import type { UploadedLoanDocument } from '../documents/loanDocument.types'

/**
 * Employment and business profile types
 */
export type MsmeEmploymentProfileType = 'salaried' | 'self-employed' | 'business-owner' | ''

/**
 * Existing loans choice type
 */
export type MsmeExistingLoansType = 'none' | 'active' | ''

/**
 * Applicant profile information pulled securely from account
 */
export interface MsmeApplicantIdentityProfile {
  name: string
  mobile: string
  email: string
  pan: string
  aadhaar: string
  dob: string
  address: string
  isVerified: boolean
}

/**
 * Business constitution options
 */
export type MsmeBusinessConstitutionType =
  | 'Proprietorship'
  | 'Partnership'
  | 'LLP'
  | 'Private Limited'
  | 'Public Limited'
  | 'Others'

/**
 * Business vintage options
 */
export type MsmeBusinessVintageType =
  | '< 1 Year'
  | '1–2 Years'
  | '3–5 Years'
  | '5–10 Years'
  | '10+ Years'

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

/**
 * Validation result for MSME Loan steps
 */
export interface MsmeLoanValidationResult {
  isValid: boolean
  errors: Record<string, string>
  generalError?: string
}

/**
 * Props for Step 1: Loan & Applicant component
 */
export interface MsmeLoanAndApplicantProps {
  data: MsmeLoanFormData
  applicant: MsmeApplicantIdentityProfile
  onChange: (fields: Partial<MsmeLoanFormData>) => void
  errors?: Record<string, string>
}

/**
 * Props for Step 2: Business Details component
 */
export interface MsmeBusinessDetailsProps {
  data: MsmeLoanFormData
  onChange: (fields: Partial<MsmeLoanFormData>) => void
  errors?: Record<string, string>
}

/**
 * Props for Step 3: Banking component
 */
export interface MsmeBankingProps {
  data: MsmeLoanFormData
  onChange: (fields: Partial<MsmeLoanFormData>) => void
  errors?: Record<string, string>
}

/**
 * Props for Step 4: Document Verification component
 */
export interface MsmeDocumentVerificationProps {
  data: MsmeLoanFormData
  onChange: (fields: Partial<MsmeLoanFormData>) => void
  errors?: Record<string, string>
}

/**
 * Props for Step 5: Review & Submit component
 */
export interface MsmeReviewAndSubmitProps {
  data: MsmeLoanFormData
  applicant: MsmeApplicantIdentityProfile
  onChange: (fields: Partial<MsmeLoanFormData>) => void
  onNavigateToStep: (stepNumber: number) => void
  onSubmit: () => void
  isSubmitting?: boolean
  errors?: Record<string, string>
}
