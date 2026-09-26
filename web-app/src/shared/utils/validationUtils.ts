import { REGEX } from '../constants/common.constants'
import { validateMobileNumber, isValidMobile } from './mobileValidation'
import {
  formatAadhaar,
  formatPan,
  formatMobile,
  formatIfsc,
  panFromGstin,
  isValidGstin,
} from './formatUtils'

export {
  validateMobileNumber,
  isValidMobile,
  formatAadhaar,
  formatPan,
  formatMobile,
  formatIfsc,
  panFromGstin,
  isValidGstin,
}

export const isValidPan = (value: string): boolean => REGEX.pan.test(value.trim().toUpperCase())
export const isValidPincode = (value: string): boolean => REGEX.pincode.test(value.trim())

/**
 * Validates Email addresses (RFC 5322 compatible standard check)
 */
export const isValidEmail = (email: string): boolean => {
  const trimmed = email.trim()
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)
}

export const validateEmail = (email: string): string | null => {
  const trimmed = email.trim()
  if (!trimmed) {
    return 'Email address is required'
  }
  if (!isValidEmail(trimmed)) {
    return 'Please enter a valid email address (e.g. name@domain.com)'
  }
  return null
}

/**
 * Validates 11-character Indian IFSC code
 */
export const isValidIfsc = (ifsc: string): boolean => {
  const trimmed = ifsc.trim().toUpperCase()
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(trimmed)
}

export const validateIfsc = (ifsc: string): string | null => {
  const trimmed = ifsc.trim().toUpperCase()
  if (!trimmed) {
    return 'IFSC code is required'
  }
  if (trimmed.length !== 11) {
    return 'IFSC code must be exactly 11 characters'
  }
  if (!isValidIfsc(trimmed)) {
    return 'Invalid IFSC code format (e.g. HDFC0001234 — 4 letters, 0, 6 characters)'
  }
  return null
}

/**
 * Validates Bank Account Numbers: 9 to 18 numeric digits
 */
export const isValidBankAccNumber = (acc: string): boolean => {
  const digits = acc.replace(/\D/g, '').trim()
  return digits.length >= 9 && digits.length <= 18
}

/**
 * Validates HSN / SAC code (2 to 8 alphanumeric characters)
 */
export const isValidHsnSac = (code: string): boolean => {
  const trimmed = code.trim()
  return /^[0-9A-Za-z]{2,8}$/.test(trimmed)
}

/**
 * Validates PAN Number (5 letters, 4 numbers, 1 letter)
 */
export const validatePan = (pan: string): string | null => {
  const trimmed = pan.trim().toUpperCase()
  if (!trimmed) {
    return 'PAN number is required'
  }
  if (trimmed.length !== 10) {
    return 'PAN must be exactly 10 characters'
  }
  if (!isValidPan(trimmed)) {
    return 'Invalid PAN format (e.g. ABCDE1234F — 5 letters, 4 digits, 1 letter)'
  }
  return null
}

/**
 * Validates 6-digit Indian PIN Code
 */
export const validatePincode = (pincode: string): string | null => {
  const trimmed = pincode.trim()
  if (!trimmed) {
    return 'PIN code is required'
  }
  if (trimmed.length !== 6) {
    return 'PIN code must be exactly 6 digits'
  }
  if (!isValidPincode(trimmed)) {
    return 'Invalid PIN code (must start with 1-9 and contain 6 digits)'
  }
  return null
}

/**
 * Validates Signatory Date of Birth:
 * - Must be a valid date
 * - Signatory must be at least 18 years old
 * - Cannot be in the future
 */
export const validateDobSignatory = (dob: string): string | null => {
  if (!dob) {
    return 'Date of birth is required'
  }
  const dateObj = new Date(dob)
  if (isNaN(dateObj.getTime())) {
    return 'Please select a valid date of birth'
  }
  const today = new Date()
  if (dateObj > today) {
    return 'Date of birth cannot be in the future'
  }

  // Calculate age
  let age = today.getFullYear() - dateObj.getFullYear()
  const monthDiff = today.getMonth() - dateObj.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateObj.getDate())) {
    age--
  }

  if (age < 18) {
    return 'Authorised signatory must be at least 18 years of age'
  }
  if (age > 100) {
    return 'Please enter a valid date of birth'
  }

  return null
}

/**
 * Validates Commencement Date:
 * - Must be a valid date
 * - Cannot be more than 30 days in the future
 */
export const validateCommencementDate = (date: string): string | null => {
  if (!date) {
    return 'Date of commencement is required'
  }
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) {
    return 'Please select a valid date'
  }
  const maxFuture = new Date()
  maxFuture.setDate(maxFuture.getDate() + 30)
  if (dateObj > maxFuture) {
    return 'Commencement date cannot be more than 30 days in the future'
  }
  return null
}

/**
 * Validates genuine Indian 12-digit Aadhaar numbers
 */
export const validateAadhaar = (aadhaar: string): string | null => {
  const digits = aadhaar.replace(/\D/g, '').trim()

  if (!digits) {
    return 'Aadhaar number is required'
  }
  if (digits.length !== 12) {
    return 'Aadhaar number must be exactly 12 digits'
  }
  if (/^(\d)\1{11}$/.test(digits)) {
    return 'Please enter a valid Aadhaar number, not repeated digits'
  }
  const uniqueDigits = new Set(digits.split('')).size
  if (uniqueDigits < 4) {
    return 'Please enter a valid 12-digit Aadhaar number'
  }
  return null
}

export const isValidAadhaar = (value: string): boolean => validateAadhaar(value) === null

export const isNonEmpty = (value: string | null | undefined): boolean => Boolean(value && value.trim().length > 0)

/**
 * Validates a required field with friendly error copy
 */
export const validateRequired = (
  value: string | number | null | undefined,
  fieldLabel = 'This field'
): string | null => {
  if (value === null || value === undefined) {
    return `${fieldLabel} is required`
  }
  if (typeof value === 'string' && value.trim() === '') {
    return `${fieldLabel} is required`
  }
  return null
}

/**
 * Validates multiple required fields in an object, returning an errors map.
 */
export const validateRequiredFields = <T extends Record<string, any>>(
  values: T,
  fieldLabels: Partial<Record<keyof T, string>>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } => {
  const entries = Object.entries(fieldLabels) as [keyof T, string][]
  const errors = entries.reduce<Partial<Record<keyof T, string>>>((acc, [key, label]) => {
    const val = values[key]
    const err = validateRequired(val, label)
    if (err) {
      acc[key] = err
    }
    return acc
  }, {})

  const isValid = Object.keys(errors).length === 0
  return { isValid, errors }
}
