import type { PropertyLoanData } from '../types/propertyLoan.types'

/**
 * Custom validation error class used in the functional validation pipeline
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

/**
 * Reusable function to throw a ValidationError
 */
export const throwValidationError = (message: string): never => {
  throw new ValidationError(message)
}

/**
 * Reusable function that evaluates a predicate; throws an exception when false
 */
export const assertCondition = (condition: boolean, errorMessage: string): void => {
  try {
    Boolean(condition) || throwValidationError(errorMessage)
  } catch (err) {
    throw err
  }
}

/**
 * Reusable assertion function for non-empty string or required values
 */
export const assertNonEmpty = (value: unknown, errorMessage: string): void => {
  try {
    const trimmed = String(value ?? '').trim()
    assertCondition(trimmed.length > 0, errorMessage)
  } catch (err) {
    throw err
  }
}

/**
 * Reusable assertion function for strictly positive numbers
 */
export const assertPositiveNumber = (value: unknown, errorMessage: string): void => {
  try {
    const raw = String(value ?? '').replace(/,/g, '').trim()
    const num = parseFloat(raw)
    const isValid = raw.length > 0 && !isNaN(num) && num > 0
    assertCondition(isValid, errorMessage)
  } catch (err) {
    throw err
  }
}

/**
 * Reusable assertion function for regex matching
 */
export const assertPattern = (
  value: string | undefined | null,
  pattern: RegExp,
  errorMessage: string
): void => {
  try {
    const trimmed = String(value ?? '').trim()
    const isValid = trimmed.length > 0 && pattern.test(trimmed)
    assertCondition(isValid, errorMessage)
  } catch (err) {
    throw err
  }
}

/**
 * Reusable assertion function for minimum digits
 */
export const assertMinDigits = (
  value: string | undefined | null,
  minDigits: number,
  errorMessage: string
): void => {
  try {
    const digits = String(value ?? '').replace(/\D/g, '')
    assertCondition(digits.length >= minDigits, errorMessage)
  } catch (err) {
    throw err
  }
}

/**
 * Reusable assertion function for exact digit length
 */
export const assertExactDigits = (
  value: string | undefined | null,
  count: number,
  errorMessage: string
): void => {
  try {
    const trimmed = String(value ?? '').trim()
    const pattern = new RegExp(`^\\d{${count}}$`)
    const isValid = trimmed.length === count && pattern.test(trimmed)
    assertCondition(isValid, errorMessage)
  } catch (err) {
    throw err
  }
}

/**
 * Reusable assertion function to ensure value is not null or undefined
 */
export const assertNotNull = (value: unknown, errorMessage: string): void => {
  try {
    assertCondition(value !== null && value !== undefined, errorMessage)
  } catch (err) {
    throw err
  }
}

/**
 * Reusable assertion function for truthy boolean flag
 */
export const assertTrue = (value: boolean | undefined | null, errorMessage: string): void => {
  try {
    assertCondition(Boolean(value), errorMessage)
  } catch (err) {
    throw err
  }
}

/**
 * Reusable execution wrapper: runs rule inside try-catch exception handling.
 * Captures thrown validation errors and populates the errors record.
 */
export const executeRule = (
  field: string,
  ruleFn: () => void,
  errors: Record<string, string>
): void => {
  try {
    ruleFn()
  } catch (err: unknown) {
    errors[field] = err instanceof Error ? err.message : String(err)
  }
}

/**
 * Step 1: Loan Requirement validators
 */
const validateStep1 = (data: PropertyLoanData, errors: Record<string, string>): void => {
  executeRule('loanPurpose', () => assertNonEmpty(data.loanPurpose, 'Please select a loan purpose'), errors)
  executeRule('requiredAmount', () => assertPositiveNumber(data.requiredAmount, 'Please enter a valid loan amount'), errors)
  executeRule('tenureYears', () => assertNonEmpty(data.tenureYears, 'Please select preferred tenure'), errors)
  executeRule('applicantType', () => assertNonEmpty(data.applicantType, 'Please select applicant type'), errors)
  executeRule('isExistingCustomer', () => assertNotNull(data.isExistingCustomer, 'Please specify if you are an existing customer'), errors)
}

/**
 * Step 2: Personal & Employment Profile validators
 */
const validateStep2 = (data: PropertyLoanData, errors: Record<string, string>): void => {
  executeRule('personalFullName', () => assertNonEmpty(data.personalFullName, 'Full name is required'), errors)
  executeRule('personalPan', () => assertPattern(data.personalPan, /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i, 'Enter a valid 10-digit PAN (e.g. ABCDE1234F)'), errors)
  executeRule('personalMobile', () => assertMinDigits(data.personalMobile, 10, 'Enter a valid 10-digit mobile number'), errors)
  executeRule('personalDob', () => assertNonEmpty(data.personalDob, 'Date of birth is required'), errors)
  executeRule('personalAddress', () => assertNonEmpty(data.personalAddress, 'Current address is required'), errors)
  executeRule('gender', () => assertNonEmpty(data.gender, 'Gender is required'), errors)
  executeRule('maritalStatus', () => assertNonEmpty(data.maritalStatus, 'Marital status is required'), errors)
  executeRule('residenceType', () => assertNonEmpty(data.residenceType, 'Residence type is required'), errors)
  executeRule('yearsAtCurrentAddress', () => assertNonEmpty(data.yearsAtCurrentAddress, 'Years at current address is required'), errors)
  executeRule('employerCategory', () => assertNonEmpty(data.employerCategory, 'Employer category is required'), errors)
  executeRule('employerName', () => assertNonEmpty(data.employerName, 'Employer name is required'), errors)
  executeRule('totalExperience', () => assertNonEmpty(data.totalExperience, 'Total work experience is required'), errors)
  executeRule('yearsInCurrentJob', () => assertNonEmpty(data.yearsInCurrentJob, 'Years in current job is required'), errors)
  executeRule('annualIncome', () => assertPositiveNumber(data.annualIncome, 'Please enter valid annual income'), errors)
  executeRule('hasExistingLoans', () => assertNotNull(data.hasExistingLoans, 'Please indicate if you have existing loans'), errors)
}

/**
 * Step 3: Property & Asset Details validators
 */
const validateStep3 = (data: PropertyLoanData, errors: Record<string, string>): void => {
  executeRule('propertyPincode', () => assertExactDigits(data.propertyPincode, 6, 'Enter a valid 6-digit PIN code'), errors)
  executeRule('propertyCity', () => assertNonEmpty(data.propertyCity, 'City is required'), errors)
  executeRule('propertyDistrict', () => assertNonEmpty(data.propertyDistrict, 'District is required'), errors)
  executeRule('propertyState', () => assertNonEmpty(data.propertyState, 'State is required'), errors)
  executeRule('propertyAddress', () => assertNonEmpty(data.propertyAddress, 'Property address is required'), errors)
  executeRule('propertyType', () => assertNonEmpty(data.propertyType, 'Property type is required'), errors)
  executeRule('propertySubType', () => assertNonEmpty(data.propertySubType, 'Property sub-type is required'), errors)
  executeRule('constructionStatus', () => assertNonEmpty(data.constructionStatus, 'Construction status is required'), errors)
  executeRule('currentUsage', () => assertNonEmpty(data.currentUsage, 'Current usage is required'), errors)
  executeRule('areaType', () => assertNonEmpty(data.areaType, 'Area type is required'), errors)
  executeRule('propertyArea', () => assertPositiveNumber(data.propertyArea, 'Please enter valid property area'), errors)
  executeRule('propertyAge', () => assertNonEmpty(data.propertyAge, 'Property age is required'), errors)
  executeRule('approvingAuthority', () => assertNonEmpty(data.approvingAuthority, 'Approving authority is required'), errors)
  executeRule('estimatedMarketValue', () => assertPositiveNumber(data.estimatedMarketValue, 'Please enter estimated market value'), errors)
}

/**
 * Step 4: Ownership & Co-owners validators
 */
const validateStep4 = (data: PropertyLoanData, errors: Record<string, string>): void => {
  executeRule('ownershipType', () => assertNonEmpty(data.ownershipType, 'Please select ownership type'), errors)

  // Joint ownership rules - conditionally verified via function execution without if/else
  try {
    const isJoint = data.ownershipType === 'joint'
    isJoint && (() => {
      executeRule('coOwnerFullName', () => assertNonEmpty(data.coOwnerFullName, 'Co-owner full name is required'), errors)
      executeRule('coOwnerRelationship', () => assertNonEmpty(data.coOwnerRelationship, 'Relationship is required'), errors)
      executeRule('coOwnerPan', () => assertPattern(data.coOwnerPan, /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i, 'Enter valid 10-digit PAN of co-owner'), errors)
      executeRule('coOwnerMobile', () => assertMinDigits(data.coOwnerMobile, 10, 'Enter valid 10-digit mobile number'), errors)
    })()
  } catch (err: unknown) {
    errors.coOwner = err instanceof Error ? err.message : 'Co-owner validation failed'
  }

  executeRule('ownershipConfirmed', () => assertTrue(data.ownershipConfirmed, 'Please confirm ownership declaration to proceed'), errors)
}

/**
 * Step 5: Document Dossier validators
 */
const REQUIRED_DOC_KEYS = [
  'pan_card',
  'aadhaar_card',
  'kyc_directors',
  'bank_statement',
  'gst_certificate',
  'gst_returns',
  'business_itr',
  'audited_balance_sheet',
  'profit_loss_statement',
  'business_reg_proof',
] as const

const validateStep5 = (data: PropertyLoanData, errors: Record<string, string>): void => {
  const uploaded = data.uploadedDocs || {}
  REQUIRED_DOC_KEYS.forEach((key) => {
    executeRule(
      key,
      () => {
        try {
          Boolean(uploaded[key]) || throwValidationError('Document is required')
        } catch (err) {
          throw err
        }
      },
      errors
    )
  })
}

/**
 * Step 6: Review & Final Declaration validators
 */
const validateStep6 = (data: PropertyLoanData, errors: Record<string, string>): void => {
  executeRule('declarationAgreed', () => assertTrue(data.declarationAgreed, 'You must accept the declaration to submit'), errors)
}

/**
 * Step dispatch map of reusable validation functions
 */
const STEP_VALIDATORS: Record<number, (data: PropertyLoanData, errors: Record<string, string>) => void> = {
  1: validateStep1,
  2: validateStep2,
  3: validateStep3,
  4: validateStep4,
  5: validateStep5,
  6: validateStep6,
}

/**
 * Main step validation entry point
 * Pure functional dispatcher using exception handling instead of if-else statements
 */
export const validatePropertyLoanStep = (
  step: number,
  data: PropertyLoanData
): Record<string, string> => {
  const errors: Record<string, string> = {}
  try {
    const validator = STEP_VALIDATORS[step] || (() => {})
    validator(data, errors)
  } catch (err: unknown) {
    errors.general = err instanceof Error ? err.message : 'Validation failed'
  }
  return errors
}
