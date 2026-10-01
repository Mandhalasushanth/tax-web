import { validateCommencementDate } from '@shared/utils'
import type { GstBusinessFormData } from '@modules/gst/types/gstBusiness.types'
import { gstFieldRules as r, runGstRules } from '@modules/gst/validation/gstFieldRules'

const select = (message: string) => (v?: string) => ((v || '').trim() ? undefined : message)

/** Step 1 of GST registration: business, bank and authorised signatory details */
export const validateGstBusinessForm = (data: GstBusinessFormData): Record<string, string> => {
  const errors = runGstRules(data as unknown as Record<string, unknown>, {
    // Business details
    legalName: r.businessName('Legal name of business'),
    tradeName: r.businessName('Trade / brand name'),
    constitution: select('Please select constitution of business'),
    natureOfBusiness: select('Please select nature of business'),
    commencementDate: (v) => validateCommencementDate(v || '') || undefined,
    registrationReason: select('Please select reason for registration'),
    compositionScheme: select('Please select Yes or No for composition scheme'),
    placeOfBusiness: select('Please select place of business type'),
    businessAddress: r.address('Business address'),
    city: r.placeName('City'),
    district: r.placeName('District'),
    state: select('Please select state'),
    pinCode: r.pinCode,
    hsnSacCode: r.hsnSac,

    // Bank details
    bankName: r.bankName,
    accountHolderName: r.personName('Account holder name'),
    accountNumber: r.accountNumber,
    confirmAccountNumber: (v) => r.confirmAccountNumber(data.accountNumber, v),
    accountType: select('Please select account type'),
    ifscCode: r.ifsc,

    // Authorised signatory
    signatoryName: r.personName('Full legal name'),
    designation: r.designation,
    signatoryPan: r.pan,
    signatoryEmail: r.email,
    signatoryMobile: r.mobile,
    dob: r.signatoryDob,
  })

  return data.aadhaarConsent
    ? errors
    : { ...errors, aadhaarConsent: 'Aadhaar authentication consent is mandatory to proceed' }
}
