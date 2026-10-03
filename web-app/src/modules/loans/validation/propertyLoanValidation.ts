import type { PropertyLoanData } from '@modules/loans/types/propertyLoan.types'
import { loanFieldRules, toAmount, toStepResult } from './commonLoanValidation'
import type { LoanStepValidationResult } from './commonLoanValidation'

const REQUIRED_FIELDS_MESSAGE = 'Please complete all required fields correctly before proceeding.'

const isBlank = (val: unknown): boolean => !String(val ?? '').trim()

/** Adds `message` for every field in `fields` that has no value */
const requireFields = (
  errors: Record<string, string>,
  data: PropertyLoanData,
  fields: Partial<Record<keyof PropertyLoanData, string>>
): void => {
  Object.entries(fields).forEach(([field, message]) => {
    if (isBlank(data[field as keyof PropertyLoanData]) && message) errors[field] = message
  })
}

/** Records the rule's message for `field` when the rule fails */
const applyRule = (errors: Record<string, string>, field: string, message: string | undefined): void => {
  if (message) errors[field] = message
}

/** Step 1: Loan Requirement */
const validateStep1 = (data: PropertyLoanData): LoanStepValidationResult => {
  const errors: Record<string, string> = {}
  requireFields(errors, data, {
    loanPurpose: 'Please select a loan purpose',
    tenureYears: 'Please select preferred tenure',
    applicantType: 'Please select applicant type',
  })
  applyRule(errors, 'requiredAmount', loanFieldRules.amount(data.requiredAmount, 'Loan amount', 100000, 500000000))
  if (data.isExistingCustomer === null || data.isExistingCustomer === undefined) {
    errors.isExistingCustomer = 'Please specify if you are an existing customer'
  }
  return toStepResult(errors, REQUIRED_FIELDS_MESSAGE)
}

/** Step 2: Personal & Employment Profile */
const validateStep2 = (data: PropertyLoanData): LoanStepValidationResult => {
  const errors: Record<string, string> = {}
  applyRule(errors, 'personalFullName', loanFieldRules.personName(data.personalFullName, 'Full name'))
  applyRule(errors, 'personalPan', loanFieldRules.pan(data.personalPan))
  applyRule(errors, 'personalMobile', loanFieldRules.mobile(data.personalMobile))
  applyRule(errors, 'personalDob', loanFieldRules.dob(data.personalDob, 21, 70))
  applyRule(errors, 'personalAddress', loanFieldRules.text(data.personalAddress, 'Current address', 10, 250))
  applyRule(errors, 'employerName', loanFieldRules.text(data.employerName, 'Employer name', 2, 100))
  requireFields(errors, data, {
    gender: 'Gender is required',
    maritalStatus: 'Marital status is required',
    residenceType: 'Residence type is required',
    yearsAtCurrentAddress: 'Years at current address is required',
    employerCategory: 'Employer category is required',
    totalExperience: 'Total work experience is required',
    yearsInCurrentJob: 'Years in current job is required',
  })
  if (toAmount(data.annualIncome) <= 0) {
    errors.annualIncome = 'Please enter valid annual income'
  }
  if (data.hasExistingLoans === null || data.hasExistingLoans === undefined) {
    errors.hasExistingLoans = 'Please indicate if you have existing loans'
  }
  return toStepResult(errors, REQUIRED_FIELDS_MESSAGE)
}

/** Step 3: Property & Asset Details */
const validateStep3 = (data: PropertyLoanData): LoanStepValidationResult => {
  const errors: Record<string, string> = {}
  applyRule(errors, 'propertyPincode', loanFieldRules.pincode(data.propertyPincode))
  applyRule(errors, 'propertyCity', loanFieldRules.placeName(data.propertyCity, 'City'))
  applyRule(errors, 'propertyDistrict', loanFieldRules.placeName(data.propertyDistrict, 'District'))
  applyRule(errors, 'propertyAddress', loanFieldRules.text(data.propertyAddress, 'Property address', 10, 250))
  requireFields(errors, data, {
    propertyState: 'State is required',
    propertyType: 'Property type is required',
    propertySubType: 'Property sub-type is required',
    constructionStatus: 'Construction status is required',
    currentUsage: 'Current usage is required',
    areaType: 'Area type is required',
    propertyAge: 'Property age is required',
    approvingAuthority: 'Approving authority is required',
  })
  if (toAmount(data.propertyArea) <= 0) {
    errors.propertyArea = 'Please enter valid property area'
  }
  const marketValue = toAmount(data.estimatedMarketValue)
  if (marketValue <= 0) {
    errors.estimatedMarketValue = 'Please enter estimated market value'
  } else if (marketValue < toAmount(data.requiredAmount)) {
    errors.estimatedMarketValue = 'Estimated market value cannot be less than the requested loan amount'
  }
  return toStepResult(errors, REQUIRED_FIELDS_MESSAGE)
}

/** Step 4: Ownership & Co-owners */
const validateStep4 = (data: PropertyLoanData): LoanStepValidationResult => {
  const errors: Record<string, string> = {}
  requireFields(errors, data, { ownershipType: 'Please select ownership type' })

  if (data.ownershipType === 'joint') {
    applyRule(errors, 'coOwnerFullName', loanFieldRules.personName(data.coOwnerFullName, 'Co-owner full name'))
    requireFields(errors, data, { coOwnerRelationship: 'Relationship is required' })
    const coOwnerPan = (data.coOwnerPan || '').trim().toUpperCase()
    const panError = loanFieldRules.pan(coOwnerPan, 'Co-owner PAN')
    applyRule(
      errors,
      'coOwnerPan',
      panError ||
        (coOwnerPan === (data.personalPan || '').trim().toUpperCase()
          ? 'Co-owner PAN cannot be the same as the applicant PAN'
          : undefined)
    )
    applyRule(errors, 'coOwnerMobile', loanFieldRules.mobile(data.coOwnerMobile, 'Co-owner mobile number'))
  }

  if (!data.ownershipConfirmed) {
    errors.ownershipConfirmed = 'Please confirm ownership declaration to proceed'
  }
  return toStepResult(errors, REQUIRED_FIELDS_MESSAGE)
}

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

/** Step 5: Document Dossier */
const validateStep5 = (data: PropertyLoanData): LoanStepValidationResult => {
  const uploaded = data.uploadedDocs || {}
  const errors = Object.fromEntries(
    REQUIRED_DOC_KEYS.filter((key) => !uploaded[key]).map((key) => [key, 'Document is required'])
  )
  return toStepResult(errors, 'Please upload all required documents before proceeding.')
}

/** Step 6: Review & Final Declaration */
const validateStep6 = (data: PropertyLoanData): LoanStepValidationResult => {
  const errors: Record<string, string> = {}
  if (!data.declarationAgreed) {
    errors.declarationAgreed = 'You must accept the declaration to submit'
  }
  return toStepResult(errors, 'Please accept the authorization declaration before submitting.')
}

export const propertyLoanValidation = {
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
  validateStep5,
  validateStep6,
}
