import type { ProjectFinanceData, StepValidationResult } from '../types/projectFinance.types'
import { validateStep1, validateStep2, validateStep3 } from './projectFinanceValidationPart1'
import { validateStep4, validateStep5, validateStep6, validateStep7 } from './projectFinanceValidationPart2'

export const projectFinanceValidation = {
  validateStep1: (data: ProjectFinanceData): StepValidationResult => validateStep1(data),
  validateStep2: (data: ProjectFinanceData): StepValidationResult => validateStep2(data),
  validateStep3: (data: ProjectFinanceData): StepValidationResult => validateStep3(data),
  validateStep4: (data: ProjectFinanceData): StepValidationResult => validateStep4(data),
  validateStep5: (data: ProjectFinanceData): StepValidationResult => validateStep5(data),
  validateStep6: (data: ProjectFinanceData): StepValidationResult => validateStep6(data),
  validateStep7: (data: ProjectFinanceData): StepValidationResult => validateStep7(data),
}

export * from './projectFinanceValidationPart1'
export * from './projectFinanceValidationPart2'
