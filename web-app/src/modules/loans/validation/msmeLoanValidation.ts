import { commonLoanValidation, loanInputHelpers } from './commonLoanValidation'
import type { MsmeLoanData } from '../types/msmeLoan.types'

export interface StepValidationResult {
  isValid: boolean
  error?: string
  errors: Record<string, string>
}

export const MSME_DOCUMENT_CONFIGS = [
  { id: 'pan_card', name: 'PAN Card', isRequired: true, category: 'identity' },
  { id: 'aadhaar_card', name: 'Aadhaar / KYC Document', isRequired: true, category: 'identity' },
  { id: 'bank_statement', name: 'Bank Statement (12 months)', isRequired: true, category: 'income' },
  { id: 'gst_returns', name: 'GST Returns (3 months)', isRequired: true, category: 'business' },
  { id: 'itr_acknowledgement', name: 'ITR Acknowledgement', isRequired: false, category: 'income' },
  { id: 'balance_sheet', name: 'Balance Sheet / P&L', isRequired: false, category: 'income' },
  { id: 'udyam_certificate', name: 'Udyam Registration Certificate', isRequired: false, category: 'business' },
  { id: 'business_reg_proof', name: 'Business Registration Proof', isRequired: false, category: 'business' },
]

export { loanInputHelpers }

export const msmeLoanValidation = {
  validateStep1: (data: MsmeLoanData): StepValidationResult => {
    const errors: Record<string, string> = {}

    const loanAmountNum = Number(String(data.requiredLoanAmount || '').replace(/[^\d]/g, ''))
    if (!loanAmountNum || isNaN(loanAmountNum)) {
      errors.requiredLoanAmount = 'Please enter your required loan amount (Min ₹1 Lakh)'
    } else if (loanAmountNum < 100000 || loanAmountNum > 100000000) {
      errors.requiredLoanAmount = 'Loan amount must be between ₹1 Lakh and ₹10 Crores'
    }

    if (!data.loanPurpose || !data.loanPurpose.trim()) {
      errors.loanPurpose = 'Please select the purpose of the loan'
    }

    if (!data.repaymentTenure || !data.repaymentTenure.trim()) {
      errors.repaymentTenure = 'Please select repayment tenure'
    }

    if (data.hasActiveBorrowings) {
      const emiNum = Number(String(data.totalExistingEmiOutgo || '').replace(/[^\d]/g, ''))
      if (!emiNum || isNaN(emiNum)) {
        errors.totalExistingEmiOutgo = 'Please enter total monthly EMI outgo for existing loans'
      }
    }

    const firstError = Object.values(errors)[0]
    return { isValid: Object.keys(errors).length === 0, error: firstError, errors }
  },

  validateStep2: (data: MsmeLoanData): StepValidationResult => {
    const errors: Record<string, string> = {}

    if (!data.registeredBusinessName || !data.registeredBusinessName.trim()) {
      errors.registeredBusinessName = 'Please enter your registered business name'
    }

    if (!data.businessConstitution || !data.businessConstitution.trim()) {
      errors.businessConstitution = 'Please select your business constitution'
    }

    if (!data.businessVintage || !data.businessVintage.trim()) {
      errors.businessVintage = 'Please select your business vintage'
    }

    const gstinTrimmed = (data.gstin || '').trim().toUpperCase()
    if (!gstinTrimmed) {
      errors.gstin = 'GSTIN is required for MSME loan applicants'
    } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstinTrimmed)) {
      errors.gstin = 'Please enter a valid 15-digit GSTIN (e.g. 24AABCP1234F1Z9)'
    }

    const turnoverClean = (data.annualTurnover || '').replace(/[^\d]/g, '')
    if (!turnoverClean) {
      errors.annualTurnover = 'Please enter annual turnover in ₹'
    } else if (Number(turnoverClean) <= 0) {
      errors.annualTurnover = 'Please enter a valid annual turnover'
    }

    const profitClean = (data.annualNetProfit || '').replace(/[^\d]/g, '')
    if (!profitClean) {
      errors.annualNetProfit = 'Please enter annual net profit / income in ₹'
    }

    if (!data.primaryBankName || !data.primaryBankName.trim()) {
      errors.primaryBankName = 'Please enter your primary bank name'
    }

    const accTrimmed = (data.currentAccountNumber || '').trim()
    if (!accTrimmed) {
      errors.currentAccountNumber = 'Current account number is required'
    } else if (!/^\d{9,18}$/.test(accTrimmed)) {
      errors.currentAccountNumber = 'Account number must be 9 to 18 digits'
    }

    const ifscTrimmed = (data.bankIfscCode || '').trim().toUpperCase()
    if (!ifscTrimmed) {
      errors.bankIfscCode = 'Bank IFSC code is required'
    } else if (!commonLoanValidation.isValidIfsc(ifscTrimmed)) {
      errors.bankIfscCode = 'Please enter a valid 11-character IFSC code (e.g. BKID0008832)'
    }

    const firstError = Object.values(errors)[0]
    return { isValid: Object.keys(errors).length === 0, error: firstError, errors }
  },

  validateStep3: (data: MsmeLoanData): StepValidationResult => {
    const uploadedDocs = data.uploadedDocs || {}
    const mandatoryDocs = MSME_DOCUMENT_CONFIGS.filter((d) => d.isRequired)

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

    const firstMissing = missingDocs[0]
    const errorMsg = firstMissing
      ? `Please upload mandatory documents (${missingDocs.join(', ')})`
      : undefined

    return { isValid: Object.keys(errors).length === 0, error: errorMsg, errors }
  },

  validateStep4: (data: MsmeLoanData): StepValidationResult => {
    const errors: Record<string, string> = {}

    if (!data.termsAccepted) {
      errors.termsAccepted = 'Please accept the declaration before submitting'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      error: errors.termsAccepted,
      errors,
    }
  },
}
