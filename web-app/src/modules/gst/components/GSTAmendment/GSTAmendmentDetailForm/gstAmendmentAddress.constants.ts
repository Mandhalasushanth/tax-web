import type { AddressDetails } from './GSTAmendmentAddressForm'

export const DEFAULT_PRINCIPAL_DETAILS: AddressDetails = {
  address: 'MG Road, Bengaluru',
  city: 'Bengaluru',
  district: 'Bengaluru Urban',
  state: 'Karnataka',
  pinCode: '560001',
  natureOfPremises: '—',
}

export const DEFAULT_ADDITIONAL_DETAILS: AddressDetails = {
  address: 'Peenya Industrial Area',
  city: 'Bengaluru',
  district: 'Bengaluru Urban',
  state: 'Karnataka',
  pinCode: '560058',
  natureOfPremises: 'Warehouse',
}

export const ADDITIONAL_PROOFS = [
  'Property Tax Receipt',
  'Municipal Khata Certificate / Khata Copy',
  'Electricity Bill',
  'Rent / Lease Agreement',
  'Consent Letter',
  'Government-issued document/certificate showing the premises',
  'Legal ownership document',
  'Any other relevant supporting document',
]

export const PRINCIPAL_PROOFS = [
  'Property Tax Receipt',
  'Rent / Lease Agreement',
  'Electricity Bill',
  'Water Bill',
  'Municipal Khata Certificate',
  'Ownership Document',
  'NOC from Owner',
  'Any other government-issued document supporting the new address',
]
