import type { GstAmendmentFieldKey } from '@modules/gst/types/gst.types'
import {
  formatProfileAddress,
  formatProfileBank,
  formatProfileBusinessName,
  formatProfileContact,
  formatProfileSignatory,
  type GstBusinessProfile,
} from '@modules/gst/services/gstProfileService'

export interface AmendmentFieldOption {
  key: GstAmendmentFieldKey
  label: string
  oldValue: string
  placeholder: string
  helperHint: string
  docHint: string
}

export const GST_AMENDMENT_FIELD_OPTIONS: AmendmentFieldOption[] = [
  {
    key: 'business_address',
    label: 'Business Address',
    oldValue: '',
    placeholder: 'Enter the updated address with PIN code',
    helperHint: 'Business name, address, business type, bank details, authorized signatory, additional place of business',
    docHint: 'Proof of the change — e.g. new rental agreement, name-change certificate',
  },
  {
    key: 'business_name',
    label: 'Business Name / Trade Name',
    oldValue: '',
    placeholder: 'Enter the updated legal or trade name',
    helperHint: 'Update registered trade name or legal business entity name',
    docHint: 'Proof of the change — e.g. amended partnership deed, certificate of incorporation, or name-change affidavit',
  },
  {
    key: 'authorized_signatory',
    label: 'Authorized Signatory',
    oldValue: '',
    placeholder: 'Enter the updated signatory name, PAN and designation',
    helperHint: 'Add, update or replace authorized signatory on record',
    docHint: 'Proof of the change — e.g. board resolution, letter of authorization, or PAN card copy',
  },
  {
    key: 'bank_account',
    label: 'Bank Account Details',
    oldValue: '',
    placeholder: 'Enter updated bank name, account number, and IFSC',
    helperHint: 'Update primary or secondary business bank account',
    docHint: 'Proof of the change — e.g. cancelled cheque, bank statement with name & IFSC',
  },
  {
    key: 'additional_place',
    label: 'Additional Place of Business',
    oldValue: 'None on record (0 additional places registered)',
    placeholder: 'Enter address of new branch, warehouse or additional place of business',
    helperHint: 'Add or modify additional branch / godown / warehouse address',
    docHint: 'Proof of the change — e.g. branch rental agreement, consent letter or municipal permit',
  },
  {
    key: 'contact_details',
    label: 'Contact Details (Email / Mobile)',
    oldValue: '',
    placeholder: 'Enter updated mobile number and primary email address',
    helperHint: 'Update mobile number and email address for OTP and department notifications',
    docHint: 'Proof of the change — e.g. letterhead request with KYC proof',
  },
  {
    key: 'business_constitution',
    label: 'Business Constitution / Type',
    oldValue: 'Proprietorship',
    placeholder: 'Enter updated business constitution type',
    helperHint: 'Conversion of entity constitution (e.g. Proprietorship to Partnership/LLP)',
    docHint: 'Proof of the change — e.g. partnership deed / certificate of incorporation',
  },
]

/** Current-value resolvers for fields whose value comes from the user's GST profile */
const PROFILE_OLD_VALUES: Partial<Record<GstAmendmentFieldKey, (p: GstBusinessProfile) => string>> = {
  business_address: formatProfileAddress,
  business_name: formatProfileBusinessName,
  authorized_signatory: formatProfileSignatory,
  bank_account: formatProfileBank,
  contact_details: formatProfileContact,
}

/** Amendment field options with "current value" filled from the user's profile */
export const getAmendmentFieldOptions = (profile: GstBusinessProfile): AmendmentFieldOption[] =>
  GST_AMENDMENT_FIELD_OPTIONS.map((opt) => {
    const resolve = PROFILE_OLD_VALUES[opt.key]
    return resolve ? { ...opt, oldValue: resolve(profile) } : opt
  })
