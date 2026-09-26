import type { DocumentItem } from '../types/gstDocuments.types'

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
    iconBg: '#e0f2fe',
    iconColor: '#0284c7',
    isUploaded: false,
  },
  {
    id: 'aadhaar',
    title: 'Aadhaar Card',
    subtitle: 'Front & back copy with QR code',
    category: 'identity',
    iconBg: '#f3e8ff',
    iconColor: '#9333ea',
    isUploaded: false,
  },
  {
    id: 'business_reg',
    title: 'Business Registration Proof',
    subtitle: 'COI / Partnership Deed / Trade License',
    category: 'business',
    iconBg: '#e0e7ff',
    iconColor: '#2563eb',
    isUploaded: false,
  },
  {
    id: 'address_proof',
    title: 'Principal Place Address Proof',
    subtitle: 'Select Address Proof',
    addressProofType: '',
    category: 'business',
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    isUploaded: false,
  },
  {
    id: 'bank_proof',
    title: 'Bank Passbook / Cancelled Cheque',
    subtitle: 'Showing account holder name, A/C & IFSC',
    category: 'financial',
    iconBg: '#d1fae5',
    iconColor: '#059669',
    isUploaded: false,
  },
  {
    id: 'photo',
    title: 'Passport Size Photograph',
    subtitle: 'Recent colour photo with white background',
    category: 'financial',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    isUploaded: false,
  },
]
