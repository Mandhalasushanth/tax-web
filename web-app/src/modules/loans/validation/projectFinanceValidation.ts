import { commonLoanValidation, loanInputHelpers } from './commonLoanValidation'
import type { ProjectFinanceData } from '../types/projectFinance.types'

export interface StepValidationResult {
  isValid: boolean
  error?: string
  errors: Record<string, string>
}

export const PROJECT_FINANCE_DOCUMENT_CONFIGS = [
  { id: 'pan_card', name: 'PAN Card (Entity & Promoter)', isRequired: true, category: 'identity' },
  { id: 'aadhaar_card', name: 'KYC / Aadhaar of Promoters', isRequired: true, category: 'identity' },
  { id: 'project_report', name: 'Detailed Project Report (DPR)', isRequired: true, category: 'project' },
  { id: 'project_approval', name: 'Government / Regulatory Approvals', isRequired: true, category: 'project' },
  { id: 'audited_financials', name: 'Audited Financial Statements', isRequired: true, category: 'income' },
  { id: 'bank_statement', name: 'Bank Statement (12 months)', isRequired: true, category: 'income' },
  { id: 'itr_acknowledgement', name: 'ITR Acknowledgement (3 years)', isRequired: false, category: 'income' },
  { id: 'land_documents', name: 'Land / Site Documents', isRequired: false, category: 'project' },
]

export { loanInputHelpers }

export const projectFinanceValidation = {
  validateStep1: (data: ProjectFinanceData): StepValidationResult => {
    const errors: Record<string, string> = {}

    if (!data.projectName || !data.projectName.trim()) {
      errors.projectName = 'Please enter the project name'
    }

    if (!data.projectSector || !data.projectSector.trim()) {
      errors.projectSector = 'Please select the project sector'
    }

    const totalCostNum = Number(String(data.totalProjectCost || '').replace(/[^\d]/g, ''))
    if (!totalCostNum || isNaN(totalCostNum)) {
      errors.totalProjectCost = 'Please enter total project cost (Min ₹25 Lakhs)'
    } else if (totalCostNum < 2500000) {
      errors.totalProjectCost = 'Total project cost must be at least ₹25 Lakhs'
    }

    const debtFundingNum = Number(String(data.debtFundingRequired || '').replace(/[^\d]/g, ''))
    if (!debtFundingNum || isNaN(debtFundingNum)) {
      errors.debtFundingRequired = 'Please enter debt funding required (Min ₹10 Lakhs)'
    } else if (debtFundingNum < 1000000) {
      errors.debtFundingRequired = 'Debt funding required must be at least ₹10 Lakhs'
    }

    if (!data.preferredFinanceType || !data.preferredFinanceType.trim()) {
      errors.preferredFinanceType = 'Please select preferred finance type'
    }

    if (!data.repaymentTenure || !data.repaymentTenure.trim()) {
      errors.repaymentTenure = 'Please select repayment tenure'
    }

    if (!data.projectLocation || !data.projectLocation.trim()) {
      errors.projectLocation = 'Please enter the project location / state'
    }

    const firstError = Object.values(errors)[0]
    return { isValid: Object.keys(errors).length === 0, error: firstError, errors }
  },

  validateStep2: (data: ProjectFinanceData): StepValidationResult => {
    const errors: Record<string, string> = {}

    if (!data.promoterEntityName || !data.promoterEntityName.trim()) {
      errors.promoterEntityName = 'Please enter the promoter / entity name'
    }

    if (!data.promoterConstitution || !data.promoterConstitution.trim()) {
      errors.promoterConstitution = 'Please select the entity / promoter constitution'
    }

    const panTrimmed = (data.promoterPan || '').trim().toUpperCase()
    if (!panTrimmed) {
      errors.promoterPan = 'PAN of entity / promoter is required'
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panTrimmed)) {
      errors.promoterPan = 'Please enter a valid 10-character PAN (e.g. ABCDE1234F)'
    }

    if (!data.collateralType || !data.collateralType.trim()) {
      errors.collateralType = 'Please select the collateral type'
    }

    if (!data.disbursementBankName || !data.disbursementBankName.trim()) {
      errors.disbursementBankName = 'Please enter the disbursement bank name'
    }

    const accTrimmed = (data.disbursementAccountNumber || '').trim()
    if (!accTrimmed) {
      errors.disbursementAccountNumber = 'Disbursement account number is required'
    } else if (!/^\d{9,18}$/.test(accTrimmed)) {
      errors.disbursementAccountNumber = 'Account number must be 9 to 18 digits'
    }

    const ifscTrimmed = (data.disbursementIfscCode || '').trim().toUpperCase()
    if (!ifscTrimmed) {
      errors.disbursementIfscCode = 'Bank IFSC code is required'
    } else if (!commonLoanValidation.isValidIfsc(ifscTrimmed)) {
      errors.disbursementIfscCode = 'Please enter a valid 11-character IFSC code (e.g. BKID0008832)'
    }

    const firstError = Object.values(errors)[0]
    return { isValid: Object.keys(errors).length === 0, error: firstError, errors }
  },

  validateStep3: (data: ProjectFinanceData): StepValidationResult => {
    const uploadedDocs = data.uploadedDocs || {}
    const mandatoryDocs = PROJECT_FINANCE_DOCUMENT_CONFIGS.filter((d) => d.isRequired)

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

  validateStep4: (data: ProjectFinanceData): StepValidationResult => {
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
