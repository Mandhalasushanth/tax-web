import type { MsmeLoanFormData } from '@modules/loans/types/msmeLoan.types'
import {
  validateStep1LoanAndApplicant,
  validateStep2BusinessDetails,
  validateStep3Banking,
  validateStep4Documents,
  validateStep5Review,
} from './businessLoanValidation'

/**
 * MSME Loan uses the Business Loan form steps, so it shares the Business Loan rules.
 * Only the wording of the purpose message differs.
 */
export const msmeLoanValidation = {
  validateStep1: (data: MsmeLoanFormData) => validateStep1LoanAndApplicant(data, 'MSME loan'),
  validateStep2: (data: MsmeLoanFormData) => validateStep2BusinessDetails(data),
  validateStep3: (data: MsmeLoanFormData) => validateStep3Banking(data),
  validateStep4: (data: MsmeLoanFormData) => validateStep4Documents(data),
  validateStep5: (data: MsmeLoanFormData) => validateStep5Review(data),
}
