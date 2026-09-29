import type { UploadedLoanDocument } from '../documents/loanDocument.types'

export type PropertyLoanOwnershipType = 'sole' | 'joint'
export type PropertyLoanApplicantType = 'salaried' | 'self_employed_professional' | 'self_employed_business'

export interface PropertyLoanData {
  // Step 1: Loan Requirement
  titleHolderName: string
  titleHolderMobile: string
  titleHolderEmail: string
  titleHolderPan: string
  titleHolderAadhaar: string
  titleHolderDob: string
  titleHolderAddress: string

  loanPurpose: string
  requiredAmount: string
  tenureYears: string
  applicantType: PropertyLoanApplicantType | string
  isExistingCustomer: boolean | null

  // Step 2: Applicant & Income
  personalFullName: string
  personalPan: string
  personalMobile: string
  personalDob: string
  personalAddress: string

  gender: string
  maritalStatus: string
  residenceType: string
  yearsAtCurrentAddress: string

  employerCategory: string
  employerName: string
  totalExperience: string
  yearsInCurrentJob: string
  annualIncome: string

  hasExistingLoans: boolean | null
  existingLoansDetails?: string
  bankName?: string
  accountNumber?: string
  ifscCode?: string

  // Step 3: Property Details
  propertyPincode: string
  propertyCity: string
  propertyDistrict: string
  propertyState: string
  propertyAddress: string
  propertyLandmark: string

  propertyType: string
  propertySubType: string
  constructionStatus: string
  currentUsage: string
  areaType: string
  propertyArea: string
  propertyAge: string
  approvingAuthority: string
  estimatedMarketValue: string

  // Step 4: Ownership
  ownershipType: PropertyLoanOwnershipType
  coOwnerFullName: string
  coOwnerRelationship: string
  coOwnerPan: string
  coOwnerMobile: string

  currentLender: string
  existingLoanType: string
  outstandingLoanAmount: string
  ownershipConfirmed: boolean

  // Step 5: Documents
  uploadedDocs: Record<string, UploadedLoanDocument>

  // Step 6: Review & Declaration
  declarationAgreed: boolean
  inspectionAgreed: boolean
  cibilConsentAgreed: boolean

  // Metadata
  applicationId?: string
  status?: 'draft' | 'submitted' | 'under_review' | 'approved'
  submittedAt?: string
}

export interface PropertyLoanStepProps {
  data: PropertyLoanData
  onChange: (fields: Partial<PropertyLoanData>) => void
  errors?: Record<string, string>
  onNext?: () => void
  onBack?: () => void
}
