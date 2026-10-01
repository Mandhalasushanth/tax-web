import { commonLoanValidation, loanFieldRules, toAmount, toStepResult } from './commonLoanValidation'
import type { LoanStepValidationResult } from './commonLoanValidation'
import type { HomeLoanData } from '@modules/loans/types/homeLoan.types'

export const HOME_LOAN_REQUIRED_DOCUMENTS = [
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

const fmt = (n: number): string => `₹${n.toLocaleString('en-IN')}`

export const homeLoanValidation = {
  /** Step 1: Requirements */
  validateStep1: (data: HomeLoanData): LoanStepValidationResult => {
    const errors: Record<string, string> = {}

    const loanAmount = toAmount(data.loanAmount)
    if (!loanAmount) {
      errors.loanAmount = 'Please enter your required loan amount (Min ₹5 Lakhs)'
    } else if (loanAmount < 500000 || loanAmount > 100000000) {
      errors.loanAmount = 'Loan amount must be between ₹5 Lakhs and ₹10 Crores'
    }

    if (!data.propertyIntent || !data.propertyIntent.trim()) {
      errors.propertyIntent = 'Please select your property intent / purpose'
    } else if (data.propertyIntent === 'Others') {
      const customIntentError = loanFieldRules.text(data.customPropertyIntent, 'Custom property intent', 3, 100)
      if (customIntentError) errors.customPropertyIntent = customIntentError
    }

    if (!data.repaymentTenureYears || data.repaymentTenureYears <= 0) {
      errors.repaymentTenureYears = 'Please select intended repayment tenure'
    } else if (data.repaymentTenureYears < 5 || data.repaymentTenureYears > 35) {
      errors.repaymentTenureYears = 'Tenure must be between 5 and 35 years'
    }

    if (!data.propertyStage || !data.propertyStage.trim()) {
      errors.propertyStage = 'Please select property construction stage'
    }

    const propertyCost = toAmount(data.estimatedPropertyCost)
    if (!(data.estimatedPropertyCost || '').trim()) {
      errors.estimatedPropertyCost = 'Please enter estimated total property or agreement value'
    } else if (propertyCost <= 0) {
      errors.estimatedPropertyCost = 'Please enter a valid property cost'
    } else if (loanAmount > 0 && propertyCost < loanAmount) {
      errors.estimatedPropertyCost = `Property cost (${fmt(propertyCost)}) cannot be less than the requested loan amount (${fmt(loanAmount)})`
    }

    return toStepResult(errors)
  },

  /** Step 2: Employment & Income */
  validateStep2: (data: HomeLoanData): LoanStepValidationResult => {
    const errors: Record<string, string> = {}

    if (!data.occupation) {
      errors.occupation = 'Please select your occupation category'
    }

    const hasExactIncome = (data.monthlyIncomeRange || '').startsWith('Other')
    const exactIncome = toAmount(data.exactMonthlyIncome)
    if (!data.monthlyIncomeRange || !data.monthlyIncomeRange.trim()) {
      errors.monthlyIncomeRange = 'Please select monthly household income range'
    } else if (hasExactIncome && !(data.exactMonthlyIncome || '').trim()) {
      errors.exactMonthlyIncome = 'Please enter your monthly net income'
    } else if (hasExactIncome && exactIncome < 10000) {
      errors.exactMonthlyIncome = 'Monthly net income must be at least ₹10,000'
    }

    if (data.hasExistingEmis) {
      const emi = toAmount(data.existingEmiAmount)
      if (!(data.existingEmiAmount || '').trim()) {
        errors.existingEmiAmount = 'Please enter ongoing monthly EMI amount'
      } else if (emi <= 0) {
        errors.existingEmiAmount = 'Ongoing EMI amount must be greater than ₹0'
      } else if (hasExactIncome && exactIncome > 0 && emi >= exactIncome) {
        errors.existingEmiAmount = 'Ongoing EMI must be less than your monthly net income'
      }
    }

    return toStepResult(errors)
  },

  /** Step 3: Banking & ITR */
  validateStep3: (data: HomeLoanData): LoanStepValidationResult => {
    const errors: Record<string, string> = {}

    const bankNameError = loanFieldRules.bankName(data.bankName)
    if (bankNameError) errors.bankName = bankNameError

    const account = (data.accountNumber || '').trim()
    if (!account) {
      errors.accountNumber = 'Bank account number is required'
    } else if (!commonLoanValidation.isValidAccountNumber(account)) {
      errors.accountNumber = 'Account number must contain only digits (9 to 18 digits)'
    }

    const ifsc = (data.ifscCode || '').trim()
    if (!ifsc) {
      errors.ifscCode = 'Bank IFSC code is required'
    } else if (!commonLoanValidation.isValidIfsc(ifsc)) {
      errors.ifscCode = 'Please enter a valid 11-digit IFSC code (e.g. HDFC0001234)'
    }

    if (!data.itrStatus) {
      errors.itrStatus = 'Please select ITR filing status'
    } else if (data.itrStatus === 'filed') {
      const ackError = loanFieldRules.optionalItrAck(data.itrAckNumber)
      if (ackError) errors.itrAckNumber = ackError
    }

    return toStepResult(errors)
  },

  /** Step 4: Documents */
  validateStep4: (data: HomeLoanData): LoanStepValidationResult => {
    const uploadedDocs = data.uploadedDocs || {}
    const missing = HOME_LOAN_REQUIRED_DOCUMENTS.filter((doc) => !uploadedDocs[doc.id])
    const errors = Object.fromEntries(missing.map((doc) => [doc.id, `${doc.name} is required`]))
    const names = missing.map((doc) => doc.name)
    const summary =
      names.length > 0
        ? `Please upload all required documents (${names.length} missing: ${names.slice(0, 3).join(', ')}${names.length > 3 ? ` +${names.length - 3} more` : ''})`
        : undefined
    return toStepResult(errors, summary)
  },

  /** Step 5: Review & Submit */
  validateStep5: (data: HomeLoanData): LoanStepValidationResult => {
    const errors: Record<string, string> = {}
    if (!data.termsAccepted) {
      errors.termsAccepted = 'Please authorize TaxEdge and accept the declaration to submit your application.'
    }
    return toStepResult(errors)
  },
}
