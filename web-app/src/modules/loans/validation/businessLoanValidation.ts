import type {
  BusinessLoanFormData,
  BusinessLoanValidationResult,
} from '../types/businessLoan.types'

/**
 * Validates Step 1: Loan & Applicant data (Pure functional, zero if/else/loops)
 */
export function validateStep1LoanAndApplicant(
  data: BusinessLoanFormData
): BusinessLoanValidationResult {
  const errors: Record<string, string> = {}

  try {
    // 1. Employment profile validation
    !data.employmentProfile
      ? (errors.employmentProfile = 'Please select your employment or business profile.')
      : undefined

    // 2. Required loan amount validation
    !data.requiredLoanAmount || data.requiredLoanAmount.trim() === ''
      ? (errors.requiredLoanAmount = 'Please select the required loan amount.')
      : undefined

    // 3. Preferred tenure validation
    !data.preferredTenureMonths || data.preferredTenureMonths.trim() === ''
      ? (errors.preferredTenureMonths = 'Please select your preferred loan tenure.')
      : undefined

    // 4. Purpose of loan validation
    !data.purposeOfLoan || data.purposeOfLoan.trim() === ''
      ? (errors.purposeOfLoan = 'Please select the purpose of the business loan.')
      : undefined

    // 5. Revenue / Turnover validation
    const cleanNum = Number(data.revenueOrTurnover ? data.revenueOrTurnover.replace(/[^\d.]/g, '') : 0)
    !data.revenueOrTurnover || data.revenueOrTurnover.trim() === ''
      ? (errors.revenueOrTurnover = 'Please enter your monthly or annual revenue/turnover.')
      : (isNaN(cleanNum) || cleanNum <= 0)
        ? (errors.revenueOrTurnover = 'Please enter a valid revenue amount greater than zero.')
        : undefined

    // 6. Existing loans selection validation
    !data.existingLoans
      ? (errors.existingLoans = 'Please indicate whether you have any existing loans.')
      : undefined

    const isValid = Object.keys(errors).length === 0

    return {
      isValid,
      errors,
      generalError: isValid ? undefined : 'Please complete all required fields marked with *.',
    }
  } catch (err) {
    console.error('[businessLoanValidation] Validation exception occurred:', err)
    return {
      isValid: false,
      errors: { general: 'An unexpected validation error occurred. Please verify your inputs.' },
      generalError: 'Validation error occurred.',
    }
  }
}

/**
 * Validates Step 2: Business Details (Pure functional, zero if/else/loops)
 */
export function validateStep2BusinessDetails(
  data: BusinessLoanFormData
): BusinessLoanValidationResult {
  const errors: Record<string, string> = {}

  try {
    // 1. Registered Business / Firm Name
    !data.registeredBusinessName || data.registeredBusinessName.trim() === ''
      ? (errors.registeredBusinessName = 'Please enter your registered business or firm name.')
      : undefined

    // 2. Business Constitution / Type
    !data.businessConstitution || data.businessConstitution.trim() === ''
      ? (errors.businessConstitution = 'Please select your business constitution/type.')
      : undefined

    // 3. GSTIN (15 characters alphanumeric format)
    const cleanGstin = data.gstin ? data.gstin.trim().toUpperCase() : ''
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    !data.gstin || data.gstin.trim() === ''
      ? (errors.gstin = 'Please enter your 15-character GSTIN.')
      : (cleanGstin.length !== 15 || !gstinRegex.test(cleanGstin))
        ? (errors.gstin = 'Please enter a valid 15-character GSTIN (e.g. 27ABCDE1234F1Z5).')
        : undefined

    // 4. Udyam Registration Number (MSME)
    const cleanUdyam = data.udyamRegistrationNumber ? data.udyamRegistrationNumber.trim().toUpperCase() : ''
    const udyamRegex = /^UDYAM-[A-Z0-9-]{5,20}$/
    !data.hasUdyam
      ? (errors.hasUdyam = 'Please select whether your business holds an Udyam Registration.')
      : data.hasUdyam === 'yes'
        ? (!data.udyamRegistrationNumber || data.udyamRegistrationNumber.trim() === '')
          ? (errors.udyamRegistrationNumber = 'Please enter your Udyam Registration Number.')
          : !udyamRegex.test(cleanUdyam)
            ? (errors.udyamRegistrationNumber = 'Please enter a valid Udyam number (e.g. UDYAM-XX-0001234).')
            : undefined
        : undefined

    // 5. Business Vintage
    !data.businessVintage || data.businessVintage.trim() === ''
      ? (errors.businessVintage = 'Please select your business vintage.')
      : undefined

    // 6. Annual Turnover
    const cleanTurnover = Number(data.annualTurnover ? data.annualTurnover.replace(/[^\d.]/g, '') : 0)
    !data.annualTurnover || data.annualTurnover.trim() === ''
      ? (errors.annualTurnover = 'Please enter your latest annual turnover.')
      : (isNaN(cleanTurnover) || cleanTurnover <= 0)
        ? (errors.annualTurnover = 'Please enter a valid turnover amount greater than zero.')
        : undefined

    // 7. Annual Net Profit
    const cleanProfit = Number(data.annualNetProfit ? data.annualNetProfit.replace(/[^\d.]/g, '') : 0)
    !data.annualNetProfit || data.annualNetProfit.trim() === ''
      ? (errors.annualNetProfit = 'Please enter your annual net profit (after tax).')
      : (isNaN(cleanProfit) || cleanProfit < 0)
        ? (errors.annualNetProfit = 'Please enter a valid profit amount.')
        : undefined

    // 8. Authorized Signatory Details
    const sigName = data.signatoryName ? data.signatoryName.trim() : ''
    !data.signatoryName || data.signatoryName.trim() === ''
      ? (errors.signatoryName = 'Please enter the signatory name.')
      : /\d/.test(sigName)
        ? (errors.signatoryName = 'Signatory name must contain only letters, no numbers allowed.')
        : sigName.length < 2
          ? (errors.signatoryName = 'Signatory name must be at least 2 characters.')
          : undefined

    const sigDesig = data.signatoryDesignation ? data.signatoryDesignation.trim() : ''
    !data.signatoryDesignation || data.signatoryDesignation.trim() === ''
      ? (errors.signatoryDesignation = 'Please enter the signatory designation.')
      : /\d/.test(sigDesig)
        ? (errors.signatoryDesignation = 'Designation must contain only letters, no numbers allowed.')
        : undefined

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const sigEmail = data.signatoryEmail ? data.signatoryEmail.trim() : ''
    sigEmail && !emailRegex.test(sigEmail)
      ? (errors.signatoryEmail = 'Please enter a valid email address.')
      : undefined

    const isValid = Object.keys(errors).length === 0

    return {
      isValid,
      errors,
      generalError: isValid ? undefined : 'Please complete all required fields marked with *.',
    }
  } catch (err) {
    console.error('[businessLoanValidation] Step 2 validation exception:', err)
    return {
      isValid: false,
      errors: { general: 'An unexpected validation error occurred. Please verify your inputs.' },
      generalError: 'Validation error occurred.',
    }
  }
}

/**
 * Validates Step 3: Banking & Tax Records (Pure functional, zero if/else/loops)
 */
export function validateStep3Banking(
  data: BusinessLoanFormData
): BusinessLoanValidationResult {
  const errors: Record<string, string> = {}

  try {
    // 1. Primary Operating Bank Name (Required)
    !data.primaryOperatingBankName || data.primaryOperatingBankName.trim() === ''
      ? (errors.primaryOperatingBankName = 'Please select your primary operating bank.')
      : undefined

    // 2. Current Account Number (Required, 9-18 digits)
    const cleanAcc = data.currentAccountNumber ? data.currentAccountNumber.trim() : ''
    const accRegex = /^\d{9,18}$/
    !data.currentAccountNumber || data.currentAccountNumber.trim() === ''
      ? (errors.currentAccountNumber = 'Please enter your current account number.')
      : !accRegex.test(cleanAcc)
        ? (errors.currentAccountNumber = 'Please enter a valid current account number (9–18 digits).')
        : undefined

    // 3. Bank IFSC Code (Required, 11 chars: 4 uppercase letters, 0, 6 alphanumeric)
    const cleanIfsc = data.bankIfscCode ? data.bankIfscCode.trim().toUpperCase() : ''
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/
    !data.bankIfscCode || data.bankIfscCode.trim() === ''
      ? (errors.bankIfscCode = 'Please enter your bank IFSC code.')
      : (cleanIfsc.length !== 11 || !ifscRegex.test(cleanIfsc))
        ? (errors.bankIfscCode = 'Please enter a valid 11-character IFSC code (e.g. HDFC0001234).')
        : undefined

    // 4. Total Active Loan Limit (Optional, numeric if present)
    const cleanLimit = Number(data.totalActiveLoanLimit ? data.totalActiveLoanLimit.replace(/[^\d.]/g, '') : 0)
    data.totalActiveLoanLimit && data.totalActiveLoanLimit.trim() !== '' && (isNaN(cleanLimit) || cleanLimit < 0)
      ? (errors.totalActiveLoanLimit = 'Please enter a valid loan limit amount.')
      : undefined

    // 5. ITR Acknowledgement Number (Optional, 15 digits if present)
    const cleanItr = data.itrAcknowledgementNumber ? data.itrAcknowledgementNumber.trim() : ''
    data.itrAcknowledgementNumber && data.itrAcknowledgementNumber.trim() !== '' && !/^\d{15}$/.test(cleanItr)
      ? (errors.itrAcknowledgementNumber = 'Please enter a valid 15-digit ITR acknowledgement number.')
      : undefined

    // 6. Gross Total Income as per ITR (Optional, numeric if present)
    const cleanIncome = Number(data.grossTotalIncomeItr ? data.grossTotalIncomeItr.replace(/[^\d.]/g, '') : 0)
    data.grossTotalIncomeItr && data.grossTotalIncomeItr.trim() !== '' && (isNaN(cleanIncome) || cleanIncome < 0)
      ? (errors.grossTotalIncomeItr = 'Please enter a valid gross total income amount.')
      : undefined

    const isValid = Object.keys(errors).length === 0

    return {
      isValid,
      errors,
      generalError: isValid ? undefined : 'Please complete all required fields marked with *.',
    }
  } catch (err) {
    console.error('[businessLoanValidation] Step 3 validation exception:', err)
    return {
      isValid: false,
      errors: { general: 'An unexpected validation error occurred. Please verify your inputs.' },
      generalError: 'Validation error occurred.',
    }
  }
}

/**
 * Validates individual uploaded document file for type and 5MB limit (Pure functional)
 */
export function validateDocumentFile(file: File): { isValid: boolean; error?: string } {
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']

  const fileNameLower = file.name.toLowerCase()
  const hasValidExt =
    fileNameLower.endsWith('.pdf') ||
    fileNameLower.endsWith('.jpg') ||
    fileNameLower.endsWith('.jpeg') ||
    fileNameLower.endsWith('.png')

  const hasValidMime = ALLOWED_TYPES.includes(file.type) || hasValidExt

  return !hasValidMime
    ? {
        isValid: false,
        error: 'Invalid file format. Only PDF, JPG, and PNG files are accepted.',
      }
    : file.size > MAX_FILE_SIZE
      ? {
          isValid: false,
          error: 'File size exceeds the 5 MB limit. Please upload a smaller file.',
        }
      : { isValid: true }
}

/**
 * Validates Step 4: Document Verification (Pure functional, zero if/else/loops)
 */
export function validateStep4Documents(
  data: BusinessLoanFormData
): BusinessLoanValidationResult {
  const errors: Record<string, string> = {}
  const uploaded = data.uploadedDocs || {}

  try {
    !uploaded.panCard ? (errors.panCard = 'Please upload Entity PAN card & Promoter/Director PAN card.') : undefined
    !uploaded.aadhaarCard ? (errors.aadhaarCard = 'Please upload Aadhaar of all Primary Directors / Partners.') : undefined
    !uploaded.directorsKyc ? (errors.directorsKyc = 'Please upload KYC of Directors / Partners.') : undefined
    !uploaded.businessAddressProof ? (errors.businessAddressProof = 'Please upload Business Address Proof.') : undefined
    !uploaded.bankStatements ? (errors.bankStatements = 'Please upload Last 12 months bank statements.') : undefined
    !uploaded.gstCertificate ? (errors.gstCertificate = 'Please upload GST Certificate (REG-06).') : undefined
    !uploaded.gstReturns ? (errors.gstReturns = 'Please upload Filed GSTR-3B & GSTR-1 returns for last 12 months.') : undefined
    !uploaded.businessItr ? (errors.businessItr = 'Please upload Business ITR (Last 2–3 Years).') : undefined
    !uploaded.auditedBalanceSheet ? (errors.auditedBalanceSheet = 'Please upload CA audited balance sheet for last 2–3 years.') : undefined
    !uploaded.profitAndLossStatement ? (errors.profitAndLossStatement = 'Please upload CA certified P&L statement with schedules.') : undefined
    !uploaded.cashFlowStatement ? (errors.cashFlowStatement = 'Please upload Cash flow statement for the latest financial year.') : undefined
    !uploaded.businessExpansionDoc ? (errors.businessExpansionDoc = 'Please upload Project report / Business plan / Estimated cost.') : undefined
    !uploaded.businessRegistrationProof ? (errors.businessRegistrationProof = 'Please upload Certificate of Incorporation / Business license.') : undefined

    const isValid = Object.keys(errors).length === 0

    return {
      isValid,
      errors,
      generalError: isValid ? undefined : 'Please upload all mandatory documents marked with * before continuing.',
    }
  } catch (err) {
    console.error('[businessLoanValidation] Step 4 validation exception:', err)
    return {
      isValid: false,
      errors: { general: 'An unexpected validation error occurred while checking documents.' },
      generalError: 'Validation error occurred.',
    }
  }
}

/**
 * Validates Step 5: Review & Submit (Pure functional, zero if/else/loops)
 */
export function validateStep5Review(
  data: BusinessLoanFormData
): BusinessLoanValidationResult {
  const errors: Record<string, string> = {}

  try {
    !data.termsAccepted
      ? (errors.termsAccepted = 'Please authorize TaxEdge and its lending partners to proceed with the application.')
      : undefined

    const isValid = Object.keys(errors).length === 0

    return {
      isValid,
      errors,
      generalError: isValid ? undefined : 'Please check the authorization box before submitting.',
    }
  } catch (err) {
    console.error('[businessLoanValidation] Step 5 validation exception:', err)
    return {
      isValid: false,
      errors: { general: 'An unexpected error occurred during submission validation.' },
      generalError: 'Validation error occurred.',
    }
  }
}
