export const AMENDMENT_CONFIGS: Record<
  string,
  {
    title: string
    currentValue: string
    inputLabel: string
    placeholder: string
    proofs: string[]
  }
> = {
  legal_name: {
    title: 'Legal Business Name',
    currentValue: 'Vani Enterprises',
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
    currentValue: 'Flat 402, Sai Residency, Hitec City, Hyderabad - 500081',
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
    currentValue: 'Plot 12, Industrial Park, Gachibowli, Hyderabad - 500032',
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
    currentValue: 'HDFC Bank · A/C **** 4892 · HDFC0001234',
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
    currentValue: 'Vani Udatha (Proprietor / Director)',
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
    currentValue: '+91 98765 43210 · vani@vanienterprises.com',
    inputLabel: 'New Contact Mobile & Email',
    placeholder: 'Enter new mobile number & official email',
    proofs: [
      'Authorisation letter signed by proprietor/authorised signatory',
      'Self-attested PAN of authorised signatory',
      'ID proof / Board declaration',
    ],
  },
}
