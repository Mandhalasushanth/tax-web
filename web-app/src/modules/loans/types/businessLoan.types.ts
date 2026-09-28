import type { UploadedLoanDocument } from '../documents/loanDocument.types'

/**
 * Employment and business profile types
 */
export type EmploymentProfileType = 'salaried' | 'self-employed' | 'business-owner' | ''

/**
 * Existing loans choice type
 */
export type ExistingLoansType = 'none' | 'active' | ''

/**
 * Applicant profile information pulled securely from account
 */
export interface ApplicantIdentityProfile {
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
export type BusinessConstitutionType =
  | 'Proprietorship'
  | 'Partnership'
  | 'LLP'
  | 'Private Limited'
  | 'Public Limited'
  | 'Others'

/**
 * Business vintage options
 */
export type BusinessVintageType =
  | '< 1 Year'
  | '1–2 Years'
  | '3–5 Years'
  | '5–10 Years'
  | '10+ Years'

/**
 * Udyam registration choice
 */
export type UdyamOptionType = 'yes' | 'no' | ''

/**
 * Form data model for Business Loan application
 */
export interface BusinessLoanFormData {
  // Step 1: Loan & Applicant
  employmentProfile: EmploymentProfileType
  requiredLoanAmount: string
  preferredTenureMonths: string
  purposeOfLoan: string
  revenueOrTurnover: string
  existingLoans: ExistingLoansType

  // Step 2: Business Details
  registeredBusinessName: string
  businessConstitution: string
  gstin: string
  hasUdyam: UdyamOptionType
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

  // Future steps placeholders
  bankName?: string
  accountNumber?: string
  ifscCode?: string
  uploadedDocs?: Record<string, UploadedLoanDocument>
  termsAccepted?: boolean
}

/**
 * Validation result for Business Loan steps
 */
export interface BusinessLoanValidationResult {
  isValid: boolean
  errors: Record<string, string>
  generalError?: string
}

/**
 * Props for Step 1: Loan & Applicant component
 */
export interface LoanAndApplicantProps {
  data: BusinessLoanFormData
  applicant: ApplicantIdentityProfile
  onChange: (fields: Partial<BusinessLoanFormData>) => void
  errors?: Record<string, string>
}

/**
 * Props for Step 2: Business Details component
 */
export interface BusinessDetailsProps {
  data: BusinessLoanFormData
  onChange: (fields: Partial<BusinessLoanFormData>) => void
  errors?: Record<string, string>
}

/**
 * Props for Step 3: Banking component
 */
export interface BankingProps {
  data: BusinessLoanFormData
  onChange: (fields: Partial<BusinessLoanFormData>) => void
  errors?: Record<string, string>
}

/**
 * Props for Step 4: Document Verification component
 */
export interface DocumentVerificationProps {
  data: BusinessLoanFormData
  onChange: (fields: Partial<BusinessLoanFormData>) => void
  errors?: Record<string, string>
}

/**
 * Props for Step 5: Review & Submit component
 */
export interface ReviewAndSubmitProps {
  data: BusinessLoanFormData
  applicant: ApplicantIdentityProfile
  onChange: (fields: Partial<BusinessLoanFormData>) => void
  onNavigateToStep: (stepNumber: number) => void
  onSubmit: () => void
  isSubmitting?: boolean
  errors?: Record<string, string>
}


