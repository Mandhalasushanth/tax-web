import {
  formatProfileAddress,
  formatProfileBank,
  formatProfileContact,
  formatProfileSignatory,
  gstProfileService,
  orNotAvailable,
  type GstBusinessProfile,
} from '@modules/gst/services/gstProfileService'

export interface AmendmentConfig {
  title: string
  currentValue: string
  inputLabel: string
  placeholder: string
  proofs: string[]
}

type AmendmentConfigTemplate = Omit<AmendmentConfig, 'currentValue'> & {
  currentValue: (profile: GstBusinessProfile) => string
}

const AMENDMENT_CONFIG_TEMPLATES: Record<string, AmendmentConfigTemplate> = {
  legal_name: {
    title: 'Legal Business Name',
    currentValue: (p) => orNotAvailable(p.legalName),
    inputLabel: 'New Legal Business Name',
    placeholder: 'As per PAN',
    proofs: [
      'Certificate of Incorporation / Name Change Certificate',
      'Revised Certificate of Incorporation',
      'Government-issued business registration certificate showing the new legal name',
      'Revised LLP / Partnership Registration Document',
      'Government-issued order/document reflecting the changed legal name',
      'Other official name-change supporting document',
    ],
  },
  principal_place: {
    title: 'Principal Place of Business',
    currentValue: formatProfileAddress,
    inputLabel: 'New Principal Address',
    placeholder: 'Enter full address with PIN code',
    proofs: [
      'Electricity bill / Utility bill (not older than 2 months)',
      'Rent / Lease Agreement & No Objection Certificate (NOC)',
      'Property tax receipt or Municipal khata copy',
      'Consent letter from property owner along with ownership proof',
    ],
  },
  additional_place: {
    title: 'Additional Place of Business',
    currentValue: () => 'None on record',
    inputLabel: 'New Additional Place Address',
    placeholder: 'Enter full address of additional premises',
    proofs: [
      'Lease / Rental agreement for additional premises',
      'Latest Utility Bill (Electricity/Water)',
      'Property Ownership Deed / Khata copy',
    ],
  },
  bank_accounts: {
    title: 'Bank Accounts',
    currentValue: formatProfileBank,
    inputLabel: 'New Bank Account Details',
    placeholder: 'Enter Account Number & IFSC Code',
    proofs: [
      'Cancelled Cheque with printed business name',
      'Bank Statement first page (showing name, A/C no & IFSC)',
      'Bank Passbook first page with branch stamp',
    ],
  },
  authorised_signatories: {
    title: 'Authorised Signatories',
    currentValue: formatProfileSignatory,
    inputLabel: 'New Authorised Signatory Name',
    placeholder: 'Enter full name as per Aadhaar/PAN',
    proofs: [
      'Board Resolution / Letter of Authorisation',
      'Copy of PAN & Aadhaar of new signatory',
      'Passport / Voter ID proof',
    ],
  },
  contact_details: {
    title: 'Contact Details',
    currentValue: formatProfileContact,
    inputLabel: 'New Contact Mobile & Email',
    placeholder: 'Enter new mobile number & official email',
    proofs: [
      'Authorisation letter signed by proprietor/authorised signatory',
      'Self-attested PAN of authorised signatory',
      'ID proof / Board declaration',
    ],
  },
}

/** Amendment form config with the "current value" taken from the user's GST profile */
export const getAmendmentConfig = (id: string, fallbackTitle: string): AmendmentConfig => {
  const template = AMENDMENT_CONFIG_TEMPLATES[id]
  if (!template) {
    return { title: fallbackTitle, currentValue: 'Current details', inputLabel: 'New Value', placeholder: 'Enter new value', proofs: [] }
  }
  return { ...template, currentValue: template.currentValue(gstProfileService.get()) }
}
