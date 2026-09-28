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
    } else if (data.vehicleMakeModel === 'Other (Specify Custom Vehicle Model)' && !data.customVehicleMakeModel?.trim()) {
      errors.vehicleMakeModel = 'Please specify your custom vehicle make & model'
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

    if (!data.occupationType) {
      errors.occupationType = 'Please select your occupation type'
    }

    if (!data.monthlyIncomeRange) {
      errors.monthlyIncomeRange = 'Please select monthly income range'
    } else if (data.monthlyIncomeRange === 'Specify Exact Amount') {
      const exactVal = Number(String(data.exactMonthlyIncome || '').replace(/\D/g, ''))
      if (!exactVal || exactVal <= 0) {
        errors.exactMonthlyIncome = 'Please enter your exact monthly net income'
      }
    }

    if (data.occupationType === 'Business Owner' || data.occupationType === 'Self-Employed Pro') {
      if (!data.legalBusinessName || !data.legalBusinessName.trim()) {
        errors.legalBusinessName = 'Please enter legal business / firm name'
      }
      if (!data.businessVintageYears || !data.businessVintageYears.trim()) {
        errors.businessVintageYears = 'Please enter business vintage in years'
      }
      const turnoverVal = Number(String(data.annualTurnover || '').replace(/\D/g, ''))
      if (!turnoverVal || turnoverVal <= 0) {
        errors.annualTurnover = 'Please enter annual turnover in ₹'
      }
    }

    if (data.hasActiveEmis) {
      const emiVal = Number(String(data.totalMonthlyEmi || '').replace(/\D/g, ''))
      if (!emiVal || emiVal <= 0) {
        errors.totalMonthlyEmi = 'Please enter total ongoing monthly EMI'
      }
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

    if (!data.itrStatus) {
      errors.itrStatus = 'Please select ITR filing status'
    } else if (data.itrStatus === 'Filed') {
      const grossNum = Number(String(data.grossAnnualIncomeItr || '').replace(/\D/g, ''))
      if (!grossNum || grossNum <= 0) {
        errors.grossAnnualIncomeItr = 'Please enter gross total annual income as per ITR'
      }
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
