import type { AmendmentCardItem } from './index'
import type { GSTAmendmentFormData } from '../../hooks/useGSTAmendmentFlow'

export interface GSTAmendmentReviewData {
  sectionTitle: string
  isAddressType: boolean
  currentAddress?: {
    address: string
    city: string
    district?: string
    state?: string
    pinCode: string
    natureOfPremises: string
  }
  requestedAddress?: {
    address: string
    city: string
    district?: string
    state?: string
    pinCode: string
    natureOfPremises: string
  }
  currentBank?: { bankName: string; accountNumber: string; ifscCode: string; accountType: string }
  requestedBank?: { bankName: string; accountNumber: string; confirmAccountNumber: string; ifscCode: string; accountType: string }
  currentSig?: { name: string; pan: string; designation: string; mobile: string; email: string }
  requestedSig?: { name: string; designation: string; pan: string; mobile: string; dob: string; email: string }
  currentContact?: { mobile: string; email: string }
  requestedContact?: { mobile: string; email: string }
  reviewGstin: string
  fileName: string
  fileSizeText: string
}

export function buildReviewData(
  selectedOption: AmendmentCardItem,
  formData: GSTAmendmentFormData,
  gstin: string,
  configTitle: string
): GSTAmendmentReviewData {
  const isAddressType =
    selectedOption.id === 'principal_place' || selectedOption.id === 'additional_place'

  const mb = formData.file ? formData.file.size / (1024 * 1024) : 0
  const sizeText = mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round((formData.file?.size || 0) / 1024))} KB`

  const isAdditional = selectedOption.id === 'additional_place'
  const currentAddress = isAdditional
    ? { address: 'Peenya Industrial Area', city: 'Bengaluru', pinCode: '560058', natureOfPremises: 'Warehouse' }
    : { address: 'MG Road, Bengaluru', city: 'Bengaluru', district: 'Bengaluru Urban', state: 'Karnataka', pinCode: '560001', natureOfPremises: '—' }

  const userAddr = formData.addressDetails
  const requestedAddress = userAddr && userAddr.address
    ? {
        address: userAddr.address,
        city: userAddr.city || 'Nellore',
        district: userAddr.district || 'Nellore',
        state: userAddr.state || 'Andhra Pradesh',
        pinCode: userAddr.pinCode || (isAdditional ? '560001' : '560011'),
        natureOfPremises: userAddr.natureOfPremises || (isAdditional ? 'Shared' : 'Warehouse'),
      }
    : (isAdditional
      ? { address: 'Nellore', city: 'Nellore', pinCode: '560001', natureOfPremises: 'Shared' }
      : { address: 'Nellore', city: 'Nellore', district: 'Nellore', state: 'Andhra Pradesh', pinCode: '560011', natureOfPremises: 'Warehouse' })

  const isBankType = selectedOption.id === 'bank_accounts'
  const userBank = formData.bankDetails || {}
  const currentBank = isBankType
    ? { bankName: 'HDFC Bank', accountNumber: 'XXXXX1234', ifscCode: 'HDFC0001234', accountType: 'Current' }
    : undefined

  const requestedBank = isBankType
    ? {
        bankName: userBank.bankName || 'Icic',
        accountNumber: userBank.accountNumber || '33457469933',
        confirmAccountNumber: userBank.accountNumber || '33457469933',
        ifscCode: userBank.ifscCode || 'ICIC0005678',
        accountType: userBank.accountType || 'Current',
      }
    : undefined

  const isSignatoryType = selectedOption.id === 'authorised_signatories'
  const userSig = formData.signatoryDetails || {}
  const currentSig = isSignatoryType
    ? {
        name: 'Akhil Kumar',
        pan: 'AKHIL1234K',
        designation: 'Proprietor',
        mobile: '+91 98765 43210',
        email: 'akhil@business.com',
      }
    : undefined

  const requestedSig = isSignatoryType
    ? {
        name: userSig.name || 'Suresh Kumar',
        designation: userSig.designation || 'Director',
        pan: userSig.pan || 'ABCDE1234F',
        mobile: userSig.mobile || '8749594844',
        dob: userSig.dob || '15-08-1990',
        email: userSig.email || 'suresh@business.com',
      }
    : undefined

  const isContactType = selectedOption.id === 'contact_details'
  const userContact = formData.contactDetails || {}
  const currentContact = isContactType
    ? { mobile: '+91 98765 43210', email: 'akhil@business.com' }
    : undefined
  const requestedContact = isContactType
    ? { mobile: userContact.mobile || '+91 98765 43210', email: userContact.email || 'akhil@business.com' }
    : undefined

  const reviewGstin = gstin || (isBankType || isSignatoryType || isContactType ? '29AAAAA0000A1Z5' : isAdditional ? '29AAAAA0000A1Z6' : '29AAAAA0000A1Z5')
  const fileName = formData.file?.name || (isSignatoryType ? 'Screenshot_2026-09-16-12-05-14-30_f7.....png' : isBankType ? 'Screenshot_2026-09-16-11-05-22-60_f7.....png' : isAdditional ? 'Screenshot_2026-09-16-09-49-45-99_f7.png' : 'Screenshot_2026-09-16-14-25-44.png')

  return {
    sectionTitle: configTitle,
    isAddressType,
    currentAddress,
    requestedAddress,
    currentBank,
    requestedBank,
    currentSig,
    requestedSig,
    currentContact,
    requestedContact,
    reviewGstin,
    fileName,
    fileSizeText: sizeText || '0.3 MB',
  }
}
