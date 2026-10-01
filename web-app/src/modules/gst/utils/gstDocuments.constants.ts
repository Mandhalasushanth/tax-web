import type { DocumentItem } from '@modules/gst/types/gstDocuments.types'

export const ADDRESS_PROOF_OPTIONS: readonly string[] = [
  'Electricity Bill',
  'Rent / Lease Agreement',
  'Legal Ownership Document',
  'Property Tax Receipt',
  'Municipal Khata Copy',
  'Telephone / Water Bill',
  'Consent Letter / NOC with Ownership Proof',
] as const

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'pan',
    title: 'PAN Card',
    subtitle: 'Front copy with clear name & photo',
    category: 'identity',
    tone: 'sky',
    isUploaded: false,
  },
  {
    id: 'aadhaar',
    title: 'Aadhaar Card',
    subtitle: 'Front & back copy with QR code',
    category: 'identity',
    tone: 'purple',
    isUploaded: false,
  },
  {
    id: 'business_reg',
    title: 'Business Registration Proof',
    subtitle: 'COI / Partnership Deed / Trade License',
    category: 'business',
    tone: 'indigo',
    isUploaded: false,
  },
  {
    id: 'address_proof',
    title: 'Principal Place Address Proof',
    subtitle: 'Select Address Proof',
    addressProofType: '',
    category: 'business',
    tone: 'amber',
    isUploaded: false,
  },
  {
    id: 'bank_proof',
    title: 'Bank Passbook / Cancelled Cheque',
    subtitle: 'Showing account holder name, A/C & IFSC',
    category: 'financial',
    tone: 'green',
    isUploaded: false,
  },
  {
    id: 'photo',
    title: 'Passport Size Photograph',
    subtitle: 'Recent colour photo with white background',
    category: 'financial',
    tone: 'orange',
    isUploaded: false,
  },
]
