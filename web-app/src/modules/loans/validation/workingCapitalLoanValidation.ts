import { commonLoanValidation, loanFieldRules, toStepResult } from './commonLoanValidation'
import type { WorkingCapitalLoanData } from '@modules/loans/types/workingCapitalLoan.types'
import type { LoanStepValidationResult } from './commonLoanValidation'

export const WORKING_CAPITAL_DOCUMENT_CONFIGS = [
  // IDENTITY & ADDRESS
  { id: 'pan_card', name: 'PAN Card', isRequired: true, category: 'identity' },
  { id: 'aadhaar_card', name: 'Aadhaar Card', isRequired: true, category: 'identity' },
  { id: 'kyc_directors', name: 'KYC of Directors / Partners', isRequired: true, category: 'identity' },

  // INCOME & BANKING
  { id: 'bank_statement', name: 'Current Account Bank Statements', isRequired: true, category: 'income' },

  // BUSINESS & TAX
  { id: 'gst_certificate', name: 'GST Certificate (REG-06)', isRequired: true, category: 'business' },
  { id: 'gst_returns', name: 'GST Returns (12 Months)', isRequired: true, category: 'business' },
  { id: 'business_itr', name: 'Business ITR (Last 2-3 Years)', isRequired: true, category: 'business' },
  { id: 'audited_balance_sheet', name: 'Audited Balance Sheet', isRequired: true, category: 'business' },
  { id: 'profit_loss_statement', name: 'Profit & Loss Statement', isRequired: true, category: 'business' },
  { id: 'udyam_certificate', name: 'Udyam Registration Certificate', isRequired: false, category: 'business' },
  { id: 'business_reg_proof', name: 'Business Registration Proof', isRequired: true, category: 'business' },

  // COLLATERAL & OTHERS
  { id: 'existing_loan_sanction', name: 'Existing Loan Sanction Letters', isRequired: false, category: 'collateral' },
]

export const workingCapitalLoanValidation = {
  validateStep1: (data: WorkingCapitalLoanData): LoanStepValidationResult => {
    const errors: Record<string, string> = {}

    const amountNum = Number(String(data.requiredCreditLimit || '').replace(/[^\d]/g, ''))
    if (!amountNum || isNaN(amountNum)) {
      errors.requiredCreditLimit = 'Please enter your required credit limit (Min ₹1 Lakh)'
    } else if (amountNum < 100000 || amountNum > 500000000) {
      errors.requiredCreditLimit = 'Credit limit must be between ₹1 Lakh and ₹50 Crores'
    }

    if (!data.creditPurpose || !data.creditPurpose.trim()) {
      errors.creditPurpose = 'Please select credit purpose'
    }

    if (!data.preferredFacilityType || !data.preferredFacilityType.trim()) {
      errors.preferredFacilityType = 'Please select preferred facility type'
    }

    if (data.hasActiveBorrowings) {
      const emiNum = Number(String(data.monthlyEmiOutgo || '').replace(/[^\d]/g, ''))
      if (!emiNum || isNaN(emiNum) || emiNum <= 0) {
        errors.monthlyEmiOutgo = 'Please enter total monthly interest / EMI outgo'
      }
    }

    return toStepResult(errors)
  },

  validateStep2: (data: WorkingCapitalLoanData): LoanStepValidationResult => {
    const errors: Record<string, string> = {}

    // Section 1: Business Operations & Financials
    if (!data.registeredBusinessName || !data.registeredBusinessName.trim()) {
      errors.registeredBusinessName = 'Please enter registered enterprise / business name'
    } else if (data.registeredBusinessName.trim().length < 3) {
      errors.registeredBusinessName = 'Business name must be at least 3 characters'
    }

    const udyamError = loanFieldRules.optionalUdyam(data.udyamRegistrationNumber)
    if (udyamError) {
      errors.udyamRegistrationNumber = udyamError
    }

    const gstinTrimmed = (data.gstinNumber || '').trim().toUpperCase()
    if (!gstinTrimmed) {
      errors.gstinNumber = 'GSTIN Number is required'
    } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstinTrimmed)) {
      errors.gstinNumber = 'Please enter a valid 15-digit GSTIN (e.g. 07AAAAA0000A1Z5)'
    }

    if (!data.operationalTrackRecord || !data.operationalTrackRecord.trim()) {
      errors.operationalTrackRecord = 'Please select operational track record'
    }

    const turnoverClean = (data.annualAuditedTurnover || '').replace(/[^\d]/g, '')
    if (!turnoverClean) {
      errors.annualAuditedTurnover = 'Please enter annual audited turnover'
    } else if (Number(turnoverClean) <= 0) {
      errors.annualAuditedTurnover = 'Please enter a valid turnover amount'
    }

    const profitClean = (data.annualNetProfitBeforeTax || '').replace(/[^\d]/g, '')
    if (!profitClean) {
      errors.annualNetProfitBeforeTax = 'Please enter annual net profit before tax'
    } else if (turnoverClean && Number(profitClean) > Number(turnoverClean)) {
      errors.annualNetProfitBeforeTax = 'Net profit cannot be greater than annual turnover'
    }

    // Section 2: Operating Current Account & Taxation
    const bankNameError = loanFieldRules.bankName(data.currentAccountBankName)
    if (bankNameError) {
      errors.currentAccountBankName = bankNameError
    }

    const accTrimmed = (data.currentAccountNumber || '').trim()
    if (!accTrimmed) {
      errors.currentAccountNumber = 'Current account number is required'
    } else if (!/^\d{9,18}$/.test(accTrimmed)) {
      errors.currentAccountNumber = 'Account number must contain 9 to 18 digits'
    }

    const ifscTrimmed = (data.bankIfscCode || '').trim().toUpperCase()
    if (!ifscTrimmed) {
      errors.bankIfscCode = 'Bank IFSC code is required'
    } else if (!commonLoanValidation.isValidIfsc(ifscTrimmed)) {
      errors.bankIfscCode = 'Please enter a valid 11-digit IFSC code (e.g. SBIN0004567)'
    }

    if (!data.itrFilingStatus || !data.itrFilingStatus.trim()) {
      errors.itrFilingStatus = 'Please select ITR filing status'
    } else if (data.itrFilingStatus === 'Filed') {
      const ackError = loanFieldRules.optionalItrAck(data.itrAcknowledgementNumber)
      if (ackError) errors.itrAcknowledgementNumber = ackError
    }

    return toStepResult(errors)
  },

  validateStep3: (data: WorkingCapitalLoanData): LoanStepValidationResult => {
    const uploadedDocs = data.uploadedDocs || {}
    const requiredDocs = WORKING_CAPITAL_DOCUMENT_CONFIGS.filter((d) => d.isRequired)

    const missing = requiredDocs.filter((doc) => !uploadedDocs[doc.id])
    const errors = Object.fromEntries(missing.map((doc) => [doc.id, `${doc.name} is required`]))
    const names = missing.map((doc) => doc.name)
    const summary = names.length
      ? `Please upload mandatory documents (${names.slice(0, 3).join(', ')}${names.length > 3 ? '...' : ''})`
      : undefined

    return toStepResult(errors, summary)
  },

  validateStep4: (data: WorkingCapitalLoanData): LoanStepValidationResult => {
    const errors: Record<string, string> = {}
    if (!data.termsAccepted) {
      errors.termsAccepted = 'Please accept the authorization declaration before submitting'
    }

    return toStepResult(errors)
  },
}
