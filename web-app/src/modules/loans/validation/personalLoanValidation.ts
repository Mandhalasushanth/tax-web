import type { PersonalLoanData } from '@modules/loans/types/personalLoan.types'
import { commonLoanValidation, loanFieldRules, toStepResult } from './commonLoanValidation'
import type { LoanStepValidationResult } from './commonLoanValidation'

export const PERSONAL_LOAN_REQUIRED_DOC_IDS = [
  'pan_card',
  'aadhaar_card',
  'address_proof',
  'passport_photo',
  'bank_statements',
  'salary_slips',
] as const

export const personalLoanValidation = {
  validateStep1: (data: PersonalLoanData): LoanStepValidationResult => {
    const errors: Record<string, string> = {}

    const amountNum = Number(String(data.requiredLoanAmount || '').replace(/\D/g, ''))
    if (!data.requiredLoanAmount || !amountNum) {
      errors.requiredLoanAmount = 'Required loan amount is required'
    } else if (amountNum < 25000) {
      errors.requiredLoanAmount = 'Minimum loan amount is ₹25,000'
    } else if (amountNum > 5000000) {
      errors.requiredLoanAmount = 'Maximum loan amount is ₹50,00,000'
    }

    const purpose = (data.purposeOfLoan || '').trim()
    if (!purpose) {
      errors.purposeOfLoan = 'Purpose of loan is required'
    } else if (purpose.toLowerCase() === 'other') {
      errors.purposeOfLoan = 'Please specify the purpose of your loan'
    } else {
      const purposeError = loanFieldRules.text(purpose, 'Purpose of loan', 3, 100)
      if (purposeError) errors.purposeOfLoan = purposeError
    }

    if (!data.preferredTenure || !data.preferredTenure.trim()) {
      errors.preferredTenure = 'Preferred tenure is required'
    }

    const salaryNum = Number(String(data.monthlyNetSalary || '').replace(/\D/g, ''))
    if (!data.monthlyNetSalary || !salaryNum) {
      errors.monthlyNetSalary = 'Monthly net in-hand salary is required'
    } else if (salaryNum < 10000) {
      errors.monthlyNetSalary = 'Minimum monthly salary must be at least ₹10,000'
    } else if (salaryNum > 100000000) {
      errors.monthlyNetSalary = 'Please enter a valid monthly salary'
    }

    if (data.hasExistingLoans) {
      const emiNum = Number(String(data.existingMonthlyEmi || '').replace(/\D/g, ''))
      if (!data.existingMonthlyEmi || !emiNum) {
        errors.existingMonthlyEmi = 'Please provide current monthly EMI outgo'
      } else if (salaryNum && emiNum >= salaryNum) {
        errors.existingMonthlyEmi = 'Existing EMI must be less than your monthly net salary'
      }
    }

    return toStepResult(errors)
  },

  validateStep2: (data: PersonalLoanData): LoanStepValidationResult => {
    const errors: Record<string, string> = {}

    const bankNameError = loanFieldRules.bankName(data.primaryBankName)
    if (bankNameError) {
      errors.primaryBankName = bankNameError
    }

    const accRes = commonLoanValidation.validateAccountNumber(data.bankAccountNumber || '')
    if (!accRes.isValid) {
      errors.bankAccountNumber = accRes.message || 'Valid bank account number is required'
    }

    const ifscRes = commonLoanValidation.validateIfsc(data.bankIfscCode || '')
    if (!ifscRes.isValid) {
      errors.bankIfscCode = ifscRes.message || 'Valid 11-digit bank IFSC code is required'
    }

    return toStepResult(errors)
  },

  validateStep3: (data: PersonalLoanData): LoanStepValidationResult => {
    const errors: Record<string, string> = {}
    const uploadedDocs = data.uploadedDocs || {}

    PERSONAL_LOAN_REQUIRED_DOC_IDS.forEach((docId) => {
      if (!uploadedDocs[docId]) {
        errors[docId] = 'Required document'
      }
    })

    return toStepResult(errors, 'Please upload all 6 required documents to expedite sanction.')
  },

  validateStep4: (data: PersonalLoanData): LoanStepValidationResult => {
    const errors: Record<string, string> = {}

    if (!data.confirmAccurate) {
      errors.confirmAccurate = 'You must confirm that all details are accurate'
    }
    if (!data.authorizeCreditCheck) {
      errors.authorizeCreditCheck = 'You must authorize credit bureau checks'
    }

    return toStepResult(errors)
  },
}
