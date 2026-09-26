import {
  validatePan,
  validateIfsc,
  validatePincode,
  validateEmail,
  validateMobileNumber,
  isValidBankAccNumber,
  isValidHsnSac,
  validateDobSignatory,
} from '@shared/utils'
import type { GstBusinessFormData } from '../types/gstBusiness.types'

export const validateGstBusinessForm = (data: GstBusinessFormData): Record<string, string> => {
  const errs: Record<string, string> = {}

  // 1. Business Details
  if (!data.legalName.trim()) {
    errs.legalName = 'Legal name of business is required'
  } else if (data.legalName.trim().length < 2) {
    errs.legalName = 'Legal name must be at least 2 characters'
  }

  if (!data.tradeName.trim()) {
    errs.tradeName = 'Trade / brand name is required'
  } else if (data.tradeName.trim().length < 2) {
    errs.tradeName = 'Trade name must be at least 2 characters'
  }

  if (!data.constitution) {
    errs.constitution = 'Please select constitution of business'
  }

  if (!data.natureOfBusiness) {
    errs.natureOfBusiness = 'Please select nature of business'
  }

  if (!data.commencementDate) {
    errs.commencementDate = 'Date of commencement is required'
  }

  if (!data.registrationReason) {
    errs.registrationReason = 'Please select reason for registration'
  }

  if (!data.compositionScheme) {
    errs.compositionScheme = 'Please select Yes or No for composition scheme'
  }

  if (!data.placeOfBusiness) {
    errs.placeOfBusiness = 'Please select place of business type'
  }

  if (!data.businessAddress.trim()) {
    errs.businessAddress = 'Business address is required'
  } else if (data.businessAddress.trim().length < 5) {
    errs.businessAddress = 'Please enter a complete address (minimum 5 characters)'
  }

  if (!data.city.trim()) {
    errs.city = 'City is required'
  }

  if (!data.district.trim()) {
    errs.district = 'District is required'
  }

  if (!data.state) {
    errs.state = 'Please select state'
  }

  const pinErr = validatePincode(data.pinCode)
  if (pinErr) {
    errs.pinCode = pinErr
  }

  if (!data.hsnSacCode.trim()) {
    errs.hsnSacCode = 'HSN / SAC code is required'
  } else if (!isValidHsnSac(data.hsnSacCode)) {
    errs.hsnSacCode = 'HSN / SAC must be 2 to 8 alphanumeric characters'
  }

  // 2. Bank Details
  if (!data.bankName.trim()) {
    errs.bankName = 'Bank name is required'
  }

  if (!data.accountHolderName.trim()) {
    errs.accountHolderName = 'Account holder name is required'
  }

  if (!data.accountNumber.trim()) {
    errs.accountNumber = 'Account number is required'
  } else if (!isValidBankAccNumber(data.accountNumber)) {
    errs.accountNumber = 'Account number must be between 9 and 18 digits'
  }

  if (data.confirmAccountNumber !== data.accountNumber) {
    errs.confirmAccountNumber = 'Account numbers do not match'
  }

  if (!data.accountType) {
    errs.accountType = 'Please select account type'
  }

  const ifscErr = validateIfsc(data.ifscCode)
  if (ifscErr) {
    errs.ifscCode = ifscErr
  }

  // 3. Authorised Signatory Details
  if (!data.signatoryName.trim()) {
    errs.signatoryName = 'Full legal name is required'
  } else if (data.signatoryName.trim().length < 2) {
    errs.signatoryName = 'Name must be at least 2 characters'
  }

  if (!data.designation.trim()) {
    errs.designation = 'Designation is required'
  }

  const panErr = validatePan(data.signatoryPan)
  if (panErr) {
    errs.signatoryPan = panErr
  }

  const emailErr = validateEmail(data.signatoryEmail)
  if (emailErr) {
    errs.signatoryEmail = emailErr
  }

  const mobileErr = validateMobileNumber(data.signatoryMobile)
  if (mobileErr) {
    errs.signatoryMobile = mobileErr
  }

  const dobErr = validateDobSignatory(data.dob)
  if (dobErr) {
    errs.dob = dobErr
  }

  if (!data.aadhaarConsent) {
    errs.aadhaarConsent = 'Aadhaar authentication consent is mandatory to proceed'
  }

  return errs
}
