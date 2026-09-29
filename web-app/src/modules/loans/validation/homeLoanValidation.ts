import { commonLoanValidation } from './commonLoanValidation'
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

export { loanInputHelpers } from './commonLoanValidation'

export const homeLoanValidation = {
  validateStep1: (data: HomeLoanData): StepValidationResult => {
    const errors: Record<string, string> = {}

    const loanAmountNum = Number(String(data.loanAmount || '').replace(/[^\d]/g, ''))
    !loanAmountNum || isNaN(loanAmountNum)
      ? (errors.loanAmount = 'Please enter your required loan amount (Min ₹5 Lakhs)')
      : loanAmountNum < 500000 || loanAmountNum > 100000000
        ? (errors.loanAmount = 'Loan amount must be between ₹5 Lakhs and ₹10 Crores')
        : undefined

    !data.propertyIntent || !data.propertyIntent.trim()
      ? (errors.propertyIntent = 'Please select your property intent / purpose')
      : data.propertyIntent === 'Others' && (!data.customPropertyIntent || !data.customPropertyIntent.trim())
        ? (errors.customPropertyIntent = 'Please specify custom property intent')
        : undefined

    !data.repaymentTenureYears || data.repaymentTenureYears <= 0
      ? (errors.repaymentTenureYears = 'Please select intended repayment tenure')
      : data.repaymentTenureYears < 5 || data.repaymentTenureYears > 35
        ? (errors.repaymentTenureYears = 'Tenure must be between 5 and 35 years')
        : undefined

    !data.propertyStage || !data.propertyStage.trim()
      ? (errors.propertyStage = 'Please select property construction stage')
      : undefined

    const costClean = (data.estimatedPropertyCost || '').replace(/[^\d]/g, '')
    const costNum = Number(costClean)
    !costClean
      ? (errors.estimatedPropertyCost = 'Please enter estimated total property or agreement value')
      : isNaN(costNum) || costNum <= 0
        ? (errors.estimatedPropertyCost = 'Please enter a valid property cost')
        : loanAmountNum > 0 && costNum < loanAmountNum
          ? (errors.estimatedPropertyCost = `Property cost (₹${costNum.toLocaleString('en-IN')}) cannot be less than the requested loan amount (₹${loanAmountNum.toLocaleString('en-IN')})`)
          : undefined

    const firstError = Object.values(errors)[0]
    return {
      isValid: Object.keys(errors).length === 0,
      error: firstError,
      errors,
    }
  },

  validateStep2: (data: HomeLoanData): StepValidationResult => {
    const errors: Record<string, string> = {}

    !data.occupation
      ? (errors.occupation = 'Please select your occupation category')
      : undefined

    !data.monthlyIncomeRange || !data.monthlyIncomeRange.trim()
      ? (errors.monthlyIncomeRange = 'Please select monthly household income range')
      : data.monthlyIncomeRange.startsWith('Other') && (!data.exactMonthlyIncome || !data.exactMonthlyIncome.trim())
        ? (errors.exactMonthlyIncome = 'Please enter your monthly net income')
        : undefined

    const emiClean = (data.existingEmiAmount || '').replace(/[^\d]/g, '')
    const emiNum = Number(emiClean)
    data.hasExistingEmis
      ? !emiClean
        ? (errors.existingEmiAmount = 'Please enter ongoing monthly EMI amount')
        : isNaN(emiNum) || emiNum <= 0
          ? (errors.existingEmiAmount = 'Ongoing EMI amount must be greater than ₹0')
          : undefined
      : undefined

    const firstError = Object.values(errors)[0]
    return {
      isValid: Object.keys(errors).length === 0,
      error: firstError,
      errors,
    }
  },

  validateStep3: (data: HomeLoanData): StepValidationResult => {
    const errors: Record<string, string> = {}

    !data.bankName || !data.bankName.trim()
      ? (errors.bankName = 'Please enter your bank name')
      : undefined

    const accTrimmed = (data.accountNumber || '').trim()
    !accTrimmed
      ? (errors.accountNumber = 'Bank account number is required')
      : !/^\d{9,18}$/.test(accTrimmed)
        ? (errors.accountNumber = 'Account number must contain only digits (9 to 18 digits)')
        : undefined

    const ifscTrimmed = (data.ifscCode || '').trim().toUpperCase()
    !ifscTrimmed
      ? (errors.ifscCode = 'Bank IFSC code is required')
      : !commonLoanValidation.isValidIfsc(ifscTrimmed)
        ? (errors.ifscCode = 'Please enter a valid 11-digit IFSC code (e.g. HDFC0001234)')
        : undefined

    const ackClean = (data.itrAckNumber || '').trim()
    const incClean = (data.annualIncomeAsPerItr || '').replace(/[^\d]/g, '')

    !data.itrStatus
      ? (errors.itrStatus = 'Please select ITR filing status')
      : data.itrStatus === 'filed'
        ? (
            data.itrAckNumber && data.itrAckNumber.trim() && !/^\d{15}$/.test(ackClean)
              ? (errors.itrAckNumber = 'ITR acknowledgement number must be exactly 15 digits')
              : undefined,
            data.annualIncomeAsPerItr && data.annualIncomeAsPerItr.trim() && (!incClean || isNaN(Number(incClean)))
              ? (errors.annualIncomeAsPerItr = 'Please enter a valid annual income')
              : undefined
          )
        : undefined

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
        !uploadedDocs[doc.id]
          ? (acc.errors[doc.id] = `${doc.name} is required`, acc.missingDocs.push(doc.name))
          : undefined
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
      errors.termsAccepted = 'Please authorize TaxEdge and accept the declaration to submit your application.'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      error: errors.termsAccepted,
      errors,
    }
  },
}
