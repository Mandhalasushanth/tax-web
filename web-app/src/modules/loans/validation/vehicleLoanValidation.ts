import type { VehicleLoanData } from '../types/vehicleLoan.types'
import { commonLoanValidation, loanInputHelpers } from './commonLoanValidation'

export interface VehicleValidationResult {
  isValid: boolean
  errors: Record<string, string>
  error?: string
}

export const vehicleLoanValidation = {
  validateStep1(data: Partial<VehicleLoanData>): VehicleValidationResult {
    const errors: Record<string, string> = {}

    // 1. Required Loan Amount
    const amountVal = Number(String(data.loanAmount || '').replace(/\D/g, ''))
    if (!amountVal || amountVal <= 0) {
      errors.loanAmount = 'Please specify required vehicle loan amount'
    } else if (amountVal < 50000) {
      errors.loanAmount = 'Minimum vehicle loan amount is ₹50,000'
    }

    // 2. Vehicle Category & Purpose
    if (!data.vehicleCategory) {
      errors.vehicleCategory = 'Please select a vehicle category / purpose'
    }

    // 3. Repayment Tenure
    if (!data.repaymentTenure) {
      errors.repaymentTenure = 'Please select repayment tenure'
    }

    // 4. Vehicle Condition
    if (!data.vehicleCondition) {
      errors.vehicleCondition = 'Please select vehicle condition'
    }

    // 5. Vehicle Make & Model
    if (!data.vehicleMakeModel || !data.vehicleMakeModel.trim()) {
      errors.vehicleMakeModel = 'Please enter or select vehicle make and model'
    }

    // 6. Estimated On-Road Price / Valuation
    const onRoadVal = Number(String(data.onRoadPrice || '').replace(/\D/g, ''))
    if (!onRoadVal || onRoadVal <= 0) {
      errors.onRoadPrice = 'Please enter estimated on-road price / valuation'
    }

    // 7. Expected Down Payment / Margin
    const downPaymentVal = Number(String(data.downPayment || '').replace(/\D/g, ''))
    if (data.downPayment === '' || data.downPayment === undefined || downPaymentVal < 0) {
      errors.downPayment = 'Please enter expected down payment / margin money'
    } else if (onRoadVal > 0 && downPaymentVal >= onRoadVal) {
      errors.downPayment = 'Down payment cannot be greater than or equal to on-road price'
    }

    const firstError = Object.values(errors)[0]
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      error: firstError,
    }
  },

  validateStep2(data: Partial<VehicleLoanData>): VehicleValidationResult {
    const errors: Record<string, string> = {}

    if (!data.fullName || !data.fullName.trim()) {
      errors.fullName = 'Please enter applicant full name'
    }

    const phoneRes = commonLoanValidation.validatePhone(data.mobileNumber || '')
    if (!phoneRes.isValid) {
      errors.mobileNumber = phoneRes.message || 'Invalid mobile number'
    }

    const panRes = commonLoanValidation.validatePan(data.panNumber || '')
    if (!panRes.isValid) {
      errors.panNumber = panRes.message || 'Invalid PAN number'
    }

    if (!data.employmentType) {
      errors.employmentType = 'Please select employment type'
    }

    const incomeVal = Number(String(data.monthlyNetIncome || '').replace(/\D/g, ''))
    if (!incomeVal || incomeVal <= 0) {
      errors.monthlyNetIncome = 'Please enter monthly net take-home income'
    }

    if (!data.city || !data.city.trim()) {
      errors.city = 'Please enter current residing city'
    }

    const firstError = Object.values(errors)[0]
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      error: firstError,
    }
  },

  validateStep3(data: Partial<VehicleLoanData>): VehicleValidationResult {
    const errors: Record<string, string> = {}

    if (!data.bankName || !data.bankName.trim()) {
      errors.bankName = 'Please enter primary bank name'
    }

    const accRes = commonLoanValidation.validateAccountNumber(data.accountNumber || '')
    if (!accRes.isValid) {
      errors.accountNumber = accRes.message || 'Invalid bank account number'
    }

    const ifscRes = commonLoanValidation.validateIfsc(data.ifscCode || '')
    if (!ifscRes.isValid) {
      errors.ifscCode = ifscRes.message || 'Invalid IFSC code'
    }

    const firstError = Object.values(errors)[0]
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      error: firstError,
    }
  },

  validateStep4(data: Partial<VehicleLoanData>): VehicleValidationResult {
    const errors: Record<string, string> = {}

    if (!data.termsAccepted) {
      errors.termsAccepted = 'Please accept the authorization and declaration to proceed.'
    }

    const docs = data.uploadedDocs || {}
    const mandatoryDocs = ['pan_card', 'aadhaar_card', 'bank_statement']
    const missingDocs = mandatoryDocs.filter((id) => !docs[id])

    if (missingDocs.length > 0) {
      missingDocs.forEach((id) => {
        errors[id] = 'This document is mandatory'
      })
    }

    const firstError = Object.values(errors)[0]
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      error: firstError,
    }
  },
}

export { loanInputHelpers }
