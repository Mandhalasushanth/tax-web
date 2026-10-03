import type { VehicleLoanData } from '@modules/loans/types/vehicleLoan.types'
import { commonLoanValidation, loanFieldRules, toStepResult } from './commonLoanValidation'
import type { LoanStepValidationResult } from './commonLoanValidation'

export const vehicleLoanValidation = {
  validateStep1(data: Partial<VehicleLoanData>): LoanStepValidationResult {
    const errors: Record<string, string> = {}

    // 1. Required Loan Amount
    const amountVal = Number(String(data.loanAmount || '').replace(/\D/g, ''))
    if (!amountVal || amountVal <= 0) {
      errors.loanAmount = 'Please specify required vehicle loan amount'
    } else if (amountVal < 50000) {
      errors.loanAmount = 'Minimum vehicle loan amount is ₹50,000'
    } else if (amountVal > 50000000) {
      errors.loanAmount = 'Maximum vehicle loan amount is ₹5,00,00,000'
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
    } else if (data.vehicleMakeModel === 'Other (Specify Custom Vehicle Model)') {
      const modelError = loanFieldRules.text(data.customVehicleMakeModel, 'Vehicle make & model', 2, 100)
      if (modelError) errors.vehicleMakeModel = modelError
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

    // 8. Loan amount must be covered by the vehicle price after down payment
    if (!errors.loanAmount && !errors.onRoadPrice && !errors.downPayment && amountVal > onRoadVal - downPaymentVal) {
      errors.loanAmount = `Loan amount cannot exceed on-road price minus down payment (₹${(onRoadVal - downPaymentVal).toLocaleString('en-IN')})`
    }

    return toStepResult(errors)
  },

  validateStep2(data: Partial<VehicleLoanData>): LoanStepValidationResult {
    const errors: Record<string, string> = {}

    if (!data.occupationType) {
      errors.occupationType = 'Please select your occupation type'
    }

    if (!data.monthlyIncomeRange) {
      errors.monthlyIncomeRange = 'Please select monthly income range'
    }

    if (data.occupationType === 'Business Owner' || data.occupationType === 'Self-Employed Pro') {
      if (!data.legalBusinessName || !data.legalBusinessName.trim()) {
        errors.legalBusinessName = 'Please enter legal business / firm name'
      } else if (data.legalBusinessName.trim().length < 3) {
        errors.legalBusinessName = 'Business / firm name must be at least 3 characters'
      }
      const gstinError = loanFieldRules.optionalGstin(data.gstin)
      if (gstinError) errors.gstin = gstinError
      const udyamError = loanFieldRules.optionalUdyam(data.udyamNumber)
      if (udyamError) errors.udyamNumber = udyamError
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

    return toStepResult(errors)
  },

  validateStep3(data: Partial<VehicleLoanData>): LoanStepValidationResult {
    const errors: Record<string, string> = {}

    const bankNameError = loanFieldRules.bankName(data.bankName)
    if (bankNameError) {
      errors.bankName = bankNameError
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
      const ackError = loanFieldRules.optionalItrAck(data.itrAckNumber)
      if (ackError) errors.itrAckNumber = ackError
    }

    return toStepResult(errors)
  },

  validateStep4(data: Partial<VehicleLoanData>): LoanStepValidationResult {
    const errors: Record<string, string> = {}
    const docs = data.uploadedDocs || {}

    // 8 required checklist documents
    const requiredDocList: { id: string; name: string }[] = [
      { id: 'pan_card', name: 'PAN Card' },
      { id: 'aadhaar_card', name: 'Aadhaar Card' },
      { id: 'driving_license', name: 'Driving License' },
      { id: 'passport_photo', name: 'Passport Size Photograph' },
      { id: 'address_proof', name: 'Address Proof' },
      { id: 'bank_statement', name: 'Bank Statements' },
      { id: 'salary_slip', name: 'Salary Slips / Income Proof' },
      { id: 'dealer_quotation', name: 'Dealer Proforma Invoice / Quotation' },
    ]

    const missingDocs = requiredDocList.filter((doc) => !docs[doc.id])
    if (missingDocs.length > 0) {
      missingDocs.forEach((doc) => {
        errors[doc.id] = `${doc.name} is required`
      })
    }

    return toStepResult(errors)
  },

  validateStep5(data: Partial<VehicleLoanData>): LoanStepValidationResult {
    const errors: Record<string, string> = {}

    if (!data.termsAccepted) {
      errors.termsAccepted = 'Please accept the authorization and declaration to proceed.'
    }

    return toStepResult(errors)
  },
}

