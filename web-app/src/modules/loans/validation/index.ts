import {
  validateStep1LoanAndApplicant,
  validateStep2BusinessDetails,
  validateStep3Banking,
  validateStep4Documents,
  validateStep5Review,
} from './businessLoanValidation'

export * from './commonLoanValidation'
export {
  MACHINERY_DOCUMENT_CONFIGS,
  machineryLoanValidation,
} from './machineryLoanValidation'
export type { StepValidationResult as MachineryStepValidationResult } from './machineryLoanValidation'

export {
  WORKING_CAPITAL_DOCUMENT_CONFIGS,
  workingCapitalLoanValidation,
} from './workingCapitalLoanValidation'

export { vehicleLoanValidation } from './vehicleLoanValidation'
export type { VehicleValidationResult } from './vehicleLoanValidation'

export {
  validateStep1LoanAndApplicant as validateBusinessLoanStep1,
  validateStep2BusinessDetails as validateBusinessLoanStep2,
  validateStep3Banking as validateBusinessLoanStep3,
  validateStep4Documents as validateBusinessLoanStep4,
  validateStep5Review as validateBusinessLoanStep5,
} from './businessLoanValidation'

export const businessLoanValidation = {
  validateStep1: validateStep1LoanAndApplicant,
  validateStep2: validateStep2BusinessDetails,
  validateStep3: validateStep3Banking,
  validateStep4: validateStep4Documents,
  validateStep5: validateStep5Review,
}

export { homeLoanValidation, REQUIRED_DOCUMENT_IDS as HOME_LOAN_REQUIRED_DOCUMENT_IDS } from './homeLoanValidation'
export type { StepValidationResult as HomeLoanStepValidationResult } from './homeLoanValidation'

export { msmeLoanValidation } from './msmeLoanValidation'
export { projectFinanceValidation } from './projectFinanceValidation'
export {
  validateStep1 as validateProjectFinanceStep1,
  validateStep2 as validateProjectFinanceStep2,
  validateStep3 as validateProjectFinanceStep3,
} from './projectFinanceValidationPart1'
export {
  validateStep4 as validateProjectFinanceStep4,
  validateStep5 as validateProjectFinanceStep5,
  validateStep6 as validateProjectFinanceStep6,
  validateStep7 as validateProjectFinanceStep7,
} from './projectFinanceValidationPart2'
