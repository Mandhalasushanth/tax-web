import { commonLoanValidation } from './commonLoanValidation'
import type { MachineryLoanData } from '../types/machineryLoan.types'

export interface StepValidationResult {
  isValid: boolean
  error?: string
  errors: Record<string, string>
}

export const MACHINERY_DOCUMENT_CONFIGS = [
  { id: 'pan_card', name: 'PAN Card', isRequired: true, category: 'identity' },
  { id: 'aadhaar_card', name: 'Aadhaar / Accepted KYC', isRequired: true, category: 'identity' },
  { id: 'bank_statement', name: 'Bank Statement', isRequired: true, category: 'income' },
  { id: 'machinery_quotation', name: 'Machinery Quotation', isRequired: true, category: 'business' },
  { id: 'gst_certificate', name: 'GST Certificate / Returns', isRequired: false, category: 'business' },
  { id: 'business_reg_proof', name: 'Business Registration Proof', isRequired: false, category: 'business' },
  { id: 'udyam_certificate', name: 'Udyam Certificate', isRequired: false, category: 'business' },
]

export const loanInputHelpers = {
  allowOnlyNumbersKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(e.key) ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return
    }
    if (!/^\d$/.test(e.key)) {
      e.preventDefault()
    }
  },

  allowOnlyAlphanumericKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(e.key) ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return
    }
    if (!/^[a-zA-Z0-9]$/.test(e.key)) {
      e.preventDefault()
    }
  },

  formatCurrencyString: (val: string): string => {
    const digits = val.replace(/\D/g, '')
    if (!digits) return ''
    return Number(digits).toLocaleString('en-IN')
  },

  digitsOnly: (val: string, maxLen?: number): string => {
    const digits = val.replace(/\D/g, '')
    return maxLen ? digits.slice(0, maxLen) : digits
  },

  cleanIfsc: (val: string): string => {
    return val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11)
  },

  cleanGstin: (val: string): string => {
    return val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 15)
  },
}

export const machineryLoanValidation = {
  validateStep1: (data: MachineryLoanData): StepValidationResult => {
    const errors: Record<string, string> = {}

    const loanAmountNum = Number(String(data.loanAmount || '').replace(/[^\d]/g, ''))
    if (!loanAmountNum || isNaN(loanAmountNum)) {
      errors.loanAmount = 'Please enter your required loan amount (Min ₹1 Lakh)'
    } else if (loanAmountNum < 100000 || loanAmountNum > 200000000) {
      errors.loanAmount = 'Loan amount must be between ₹1 Lakh and ₹20 Crores'
    }

    if (!data.machineryType || !data.machineryType.trim()) {
      errors.machineryType = 'Please select machinery / equipment type'
    }

    if (!data.repaymentTenure || !data.repaymentTenure.trim()) {
      errors.repaymentTenure = 'Please select repayment tenure'
    }

    const firstError = Object.values(errors)[0]
    return {
      isValid: Object.keys(errors).length === 0,
      error: firstError,
      errors,
    }
  },

  validateStep2: (data: MachineryLoanData): StepValidationResult => {
    const errors: Record<string, string> = {}

    if (!data.businessName || !data.businessName.trim()) {
      errors.businessName = 'Please enter your business / plant name'
    }

    if (!data.businessType || !data.businessType.trim()) {
      errors.businessType = 'Please select business type'
    }

    if (!data.businessVintage || !data.businessVintage.trim()) {
      errors.businessVintage = 'Please select business vintage'
    }

    const turnoverClean = (data.annualTurnover || '').replace(/[^\d]/g, '')
    if (!turnoverClean) {
      errors.annualTurnover = 'Please enter annual turnover in ₹'
    } else {
      const num = Number(turnoverClean)
      if (isNaN(num) || num <= 0) {
        errors.annualTurnover = 'Please enter a valid annual turnover'
      }
    }

    if (data.isGstRegistered) {
      const gstinTrimmed = (data.gstin || '').trim().toUpperCase()
      if (!gstinTrimmed) {
        errors.gstin = 'GSTIN is required for GST registered business'
      } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstinTrimmed)) {
        errors.gstin = 'Please enter a valid 15-digit GSTIN (e.g. 24AABCP1234F1Z9)'
      }
    }

    const firstError = Object.values(errors)[0]
    return {
      isValid: Object.keys(errors).length === 0,
      error: firstError,
      errors,
    }
  },

  validateStep3: (data: MachineryLoanData): StepValidationResult => {
    const errors: Record<string, string> = {}

    if (!data.bankName || !data.bankName.trim()) {
      errors.bankName = 'Please enter or select your bank name'
    }

    const accTrimmed = (data.accountNumber || '').trim()
    if (!accTrimmed) {
      errors.accountNumber = 'Current account number is required'
    } else if (!/^\d{9,18}$/.test(accTrimmed)) {
      errors.accountNumber = 'Current account number must contain only digits (9 to 18 digits)'
    }

    const ifscTrimmed = (data.ifscCode || '').trim().toUpperCase()
    if (!ifscTrimmed) {
      errors.ifscCode = 'Bank IFSC code is required'
    } else if (!commonLoanValidation.isValidIfsc(ifscTrimmed)) {
      errors.ifscCode = 'Please enter a valid 11-digit IFSC code (e.g. BKID0008832)'
    }

    const firstError = Object.values(errors)[0]
    return {
      isValid: Object.keys(errors).length === 0,
      error: firstError,
      errors,
    }
  },

  validateStep4: (data: MachineryLoanData): StepValidationResult => {
    const uploadedDocs = data.uploadedDocs || {}
    const mandatoryDocs = MACHINERY_DOCUMENT_CONFIGS.slice(0, 4)

    const { errors, missingDocs } = mandatoryDocs.reduce<{
      errors: Record<string, string>
      missingDocs: string[]
    }>(
      (acc, doc) => {
        if (!uploadedDocs[doc.id]) {
          acc.errors[doc.id] = `${doc.name} is required`
          acc.missingDocs.push(doc.name)
        }
        return acc
      },
      { errors: {}, missingDocs: [] }
    )

    if (!data.termsAccepted) {
      errors.termsAccepted = 'Please accept the Terms & Conditions before submitting'
    }

    const firstMissing = missingDocs[0]
    const errorMsg = firstMissing
      ? `Please upload mandatory documents (${missingDocs.join(', ')})`
      : errors.termsAccepted

    return {
      isValid: Object.keys(errors).length === 0,
      error: errorMsg,
      errors,
    }
  },
}
