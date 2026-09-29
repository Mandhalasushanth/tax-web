import type { PersonalLoanData } from '../types/personalLoan.types'
import { commonLoanValidation } from './commonLoanValidation'

export interface ValidationResult {
  isValid: boolean
  error?: string
  errors: Record<string, string>
}

export const PERSONAL_LOAN_REQUIRED_DOC_IDS = [
  'pan_card',
  'aadhaar_card',
  'address_proof',
  'passport_photo',
  'bank_statements',
  'salary_slips',
] as const

export const personalLoanValidation = {
  validateStep1: (data: PersonalLoanData): ValidationResult => {
    const errors: Record<string, string> = {}

    const amountNum = Number(String(data.requiredLoanAmount || '').replace(/\D/g, ''))
    if (!data.requiredLoanAmount || !amountNum) {
      errors.requiredLoanAmount = 'Required loan amount is required'
    } else if (amountNum < 25000) {
      errors.requiredLoanAmount = 'Minimum loan amount is ₹25,000'
    } else if (amountNum > 5000000) {
      errors.requiredLoanAmount = 'Maximum loan amount is ₹50,00,000'
    }

    if (!data.purposeOfLoan || !data.purposeOfLoan.trim()) {
      errors.purposeOfLoan = 'Purpose of loan is required'
    }

    if (!data.preferredTenure || !data.preferredTenure.trim()) {
      errors.preferredTenure = 'Preferred tenure is required'
    }

    const salaryNum = Number(String(data.monthlyNetSalary || '').replace(/\D/g, ''))
    if (!data.monthlyNetSalary || !salaryNum) {
      errors.monthlyNetSalary = 'Monthly net in-hand salary is required'
    } else if (salaryNum < 10000) {
      errors.monthlyNetSalary = 'Minimum monthly salary must be at least ₹10,000'
    }

    if (data.hasExistingLoans) {
      const emiNum = Number(String(data.existingMonthlyEmi || '').replace(/\D/g, ''))
      if (!data.existingMonthlyEmi || !emiNum) {
        errors.existingMonthlyEmi = 'Please provide current monthly EMI outgo'
      }
    }

    const isValid = Object.keys(errors).length === 0
    return {
      isValid,
      error: isValid ? undefined : Object.values(errors)[0],
      errors,
    }
  },

  validateStep2: (data: PersonalLoanData): ValidationResult => {
    const errors: Record<string, string> = {}

    if (!data.primaryBankName || !data.primaryBankName.trim()) {
      errors.primaryBankName = 'Primary operating bank name is required'
    }

    const accRes = commonLoanValidation.validateAccountNumber(data.bankAccountNumber || '')
    if (!accRes.isValid) {
      errors.bankAccountNumber = accRes.message || 'Valid bank account number is required'
    }

    const ifscRes = commonLoanValidation.validateIfsc(data.bankIfscCode || '')
    if (!ifscRes.isValid) {
      errors.bankIfscCode = ifscRes.message || 'Valid 11-digit bank IFSC code is required'
    }

    const isValid = Object.keys(errors).length === 0
    return {
      isValid,
      error: isValid ? undefined : Object.values(errors)[0],
      errors,
    }
  },

  validateStep3: (data: PersonalLoanData): ValidationResult => {
    const errors: Record<string, string> = {}
    const uploadedDocs = data.uploadedDocs || {}

    PERSONAL_LOAN_REQUIRED_DOC_IDS.forEach((docId) => {
      if (!uploadedDocs[docId]) {
        errors[docId] = 'Required document'
      }
    })

    const isValid = Object.keys(errors).length === 0
    return {
      isValid,
      error: isValid ? undefined : 'Please upload all 6 required documents to expedite sanction.',
      errors,
    }
  },

  validateStep4: (data: PersonalLoanData): ValidationResult => {
    const errors: Record<string, string> = {}

    if (!data.confirmAccurate) {
      errors.confirmAccurate = 'You must confirm that all details are accurate'
    }
    if (!data.authorizeCreditCheck) {
      errors.authorizeCreditCheck = 'You must authorize credit bureau checks'
    }

    const isValid = Object.keys(errors).length === 0
    return {
      isValid,
      error: isValid ? undefined : Object.values(errors)[0],
      errors,
    }
  },
}
