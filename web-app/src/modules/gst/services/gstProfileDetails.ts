import { gstProfileService, orNotAvailable } from '@modules/gst/services/gstProfileService'

/**
 * "Current details" blocks shown on amendment forms and review, built from the
 * user's GST profile. Unknown values display as "—".
 */

export const getCurrentAddressDetails = (isAdditionalPlace: boolean) => {
  const p = gstProfileService.get()
  return isAdditionalPlace
    ? { address: 'None on record', city: orNotAvailable(''), district: orNotAvailable(''), state: orNotAvailable(''), pinCode: orNotAvailable(''), natureOfPremises: orNotAvailable('') }
    : {
        address: orNotAvailable(p.address),
        city: orNotAvailable(p.city),
        district: orNotAvailable(''),
        state: orNotAvailable(p.state),
        pinCode: orNotAvailable(p.pinCode),
        natureOfPremises: orNotAvailable(''),
      }
}

export const getCurrentBankDetails = () => {
  const p = gstProfileService.get()
  return {
    bankName: orNotAvailable(p.bankName),
    accountNumber: p.accountNumber ? `XXXXX${p.accountNumber.slice(-4)}` : orNotAvailable(''),
    ifscCode: orNotAvailable(p.ifscCode),
    accountType: orNotAvailable(''),
  }
}

export const getCurrentSignatoryDetails = () => {
  const p = gstProfileService.get()
  return {
    name: orNotAvailable(p.signatoryName),
    pan: orNotAvailable(p.pan),
    designation: orNotAvailable(p.signatoryDesignation),
    mobile: p.mobile ? `+91 ${p.mobile}` : orNotAvailable(''),
    email: orNotAvailable(p.email),
  }
}

export const getCurrentContactDetails = () => {
  const p = gstProfileService.get()
  return {
    mobile: p.mobile ? `+91 ${p.mobile}` : orNotAvailable(''),
    email: orNotAvailable(p.email),
  }
}
