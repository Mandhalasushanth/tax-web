import { commonLoanValidation } from '../../../validation/commonLoanValidation'
import type { HomeLoanData } from '../types/homeLoan.types'

export interface StepValidationResult {
  isValid: boolean
  error?: string
  errors: Record<string, string>
}

export const REQUIRED_DOCUMENT_IDS = [
  { id: 'pan_card', name: 'PAN Card' },
  { id: 'aadhaar_card', name: 'Aadhaar Card' },
  { id: 'address_proof', name: 'Address Proof' },
  { id: 'passport_photo', name: 'Passport Size Photograph' },
  { id: 'bank_statements', name: 'Bank Statements (6-12 Months)' },
  { id: 'salary_slips', name: 'Salary Slips / Income Proof' },
  { id: 'form_16_itr', name: 'Form 16 / ITR & Computation (2 Years)' },
  { id: 'agreement_to_sell', name: 'Agreement to Sell / Allotment Letter' },
  { id: 'building_plan', name: 'Approved Building Plan & Sanction Map' },
  { id: 'title_deed', name: 'Title Deed / Chain of Deeds' },
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
}

export const homeLoanValidation = {
  validateStep1: (data: HomeLoanData): StepValidationResult => {
    const errors: Record<string, string> = {}

    const loanAmountNum = Number(String(data.loanAmount || '').replace(/[^\d]/g, ''))
    if (!loanAmountNum || isNaN(loanAmountNum)) {
      errors.loanAmount = 'Please enter your required loan amount (Min ₹5 Lakhs)'
    } else if (loanAmountNum < 500000 || loanAmountNum > 100000000) {
      errors.loanAmount = 'Loan amount must be between ₹5 Lakhs and ₹10 Crores'
    }

    if (!data.propertyIntent || !data.propertyIntent.trim()) {
      errors.propertyIntent = 'Please select your property intent / purpose'
    }

    if (!data.repaymentTenureYears || data.repaymentTenureYears <= 0) {
      errors.repaymentTenureYears = 'Please select intended repayment tenure'
    } else if (data.repaymentTenureYears < 5 || data.repaymentTenureYears > 35) {
      errors.repaymentTenureYears = 'Tenure must be between 5 and 35 years'
    }

    if (!data.propertyStage || !data.propertyStage.trim()) {
      errors.propertyStage = 'Please select property construction stage'
    }

    const costClean = (data.estimatedPropertyCost || '').replace(/[^\d]/g, '')
    if (!costClean) {
      errors.estimatedPropertyCost = 'Please enter estimated total property or agreement value'
    } else {
      const costNum = Number(costClean)
      if (isNaN(costNum) || costNum <= 0) {
        errors.estimatedPropertyCost = 'Please enter a valid property cost'
      } else if (loanAmountNum > 0 && costNum < loanAmountNum) {
        errors.estimatedPropertyCost = `Property cost (₹${costNum.toLocaleString('en-IN')}) cannot be less than the requested loan amount (₹${loanAmountNum.toLocaleString('en-IN')})`
      }
    }

    const firstError = Object.values(errors)[0]
    return {
      isValid: Object.keys(errors).length === 0,
      error: firstError,
      errors,
    }
  },

  validateStep2: (data: HomeLoanData): StepValidationResult => {
    const errors: Record<string, string> = {}

    if (!data.occupation) {
      errors.occupation = 'Please select your occupation category'
    }

    if (!data.monthlyIncomeRange || !data.monthlyIncomeRange.trim()) {
      errors.monthlyIncomeRange = 'Please select monthly household income range'
    }

    if (data.hasExistingEmis) {
      const emiClean = (data.existingEmiAmount || '').replace(/[^\d]/g, '')
      if (!emiClean) {
        errors.existingEmiAmount = 'Please enter ongoing monthly EMI amount'
      } else {
        const emiNum = Number(emiClean)
        if (isNaN(emiNum) || emiNum <= 0) {
          errors.existingEmiAmount = 'Ongoing EMI amount must be greater than ₹0'
        }
      }
    }

    const firstError = Object.values(errors)[0]
    return {
      isValid: Object.keys(errors).length === 0,
      error: firstError,
      errors,
    }
  },

  validateStep3: (data: HomeLoanData): StepValidationResult => {
    const errors: Record<string, string> = {}

    if (!data.bankName || !data.bankName.trim()) {
      errors.bankName = 'Please select your operating bank'
    }

    const accTrimmed = (data.accountNumber || '').trim()
    if (!accTrimmed) {
      errors.accountNumber = 'Bank account number is required'
    } else if (!/^\d{9,18}$/.test(accTrimmed)) {
      errors.accountNumber = 'Account number must contain only digits (9 to 18 digits)'
    }

    const ifscTrimmed = (data.ifscCode || '').trim().toUpperCase()
    if (!ifscTrimmed) {
      errors.ifscCode = 'Bank IFSC code is required'
    } else if (!commonLoanValidation.isValidIfsc(ifscTrimmed)) {
      errors.ifscCode = 'Please enter a valid 11-digit IFSC code (e.g. HDFC0001234)'
    }

    if (!data.itrStatus) {
      errors.itrStatus = 'Please select ITR filing status'
    } else if (data.itrStatus === 'filed') {
      if (data.itrAckNumber && data.itrAckNumber.trim()) {
        const ackClean = data.itrAckNumber.trim()
        if (!/^\d{15}$/.test(ackClean)) {
          errors.itrAckNumber = 'ITR acknowledgement number must be exactly 15 digits'
        }
      }
      if (data.annualIncomeAsPerItr && data.annualIncomeAsPerItr.trim()) {
        const incClean = data.annualIncomeAsPerItr.replace(/[^\d]/g, '')
        if (!incClean || isNaN(Number(incClean))) {
          errors.annualIncomeAsPerItr = 'Please enter a valid annual income'
        }
      }
    }

    const firstError = Object.values(errors)[0]
    return {
      isValid: Object.keys(errors).length === 0,
      error: firstError,
      errors,
    }
  },

  validateStep4: (data: HomeLoanData): StepValidationResult => {
    const uploadedDocs = data.uploadedDocs || {}
    const { errors, missingDocs } = REQUIRED_DOCUMENT_IDS.reduce<{
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

    const errorMsg =
      missingDocs.length > 0
        ? `Please upload all required documents (${missingDocs.length} missing: ${missingDocs.slice(0, 3).join(', ')}${missingDocs.length > 3 ? ` +${missingDocs.length - 3} more` : ''})`
        : undefined

    return {
      isValid: missingDocs.length === 0,
      error: errorMsg,
      errors,
    }
  },

  validateStep5: (data: HomeLoanData): StepValidationResult => {
    const errors: Record<string, string> = {}
    if (!data.termsAccepted) {
      errors.termsAccepted = 'Please accept the Terms & Conditions before submitting'
    }
    return {
      isValid: Object.keys(errors).length === 0,
      error: errors.termsAccepted,
      errors,
    }
  },
}
