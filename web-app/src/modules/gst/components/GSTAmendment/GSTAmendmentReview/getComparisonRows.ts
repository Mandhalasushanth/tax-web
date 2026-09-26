import type { AddressDetailsItem, BankDetailsItem, ContactDetailsItem, SignatoryDetailsItem } from './GSTAmendmentReview'

export interface RowItem {
  label: string
  value: string
}

export function getBankRows(details: BankDetailsItem, isRequested: boolean): RowItem[] {
  const rows: RowItem[] = [
    { label: 'Bank Name', value: details.bankName },
    { label: 'Account Number', value: details.accountNumber },
  ]

  if (isRequested) {
    rows.push({
      label: 'Confirm Account Number',
      value: details.confirmAccountNumber || details.accountNumber,
    })
  }

  rows.push(
    { label: 'IFSC Code', value: details.ifscCode },
    { label: 'Account Type', value: details.accountType }
  )

  return rows
}

export function getAddressRows(
  details: AddressDetailsItem,
  isAdditional: boolean,
  isRequested: boolean
): RowItem[] {
  const rows: RowItem[] = [
    {
      label: isRequested ? (isAdditional ? 'Additional Place Address' : 'Address') : 'Address',
      value: details.address,
    },
    { label: 'City', value: details.city },
  ]

  if (!isAdditional && details.district) {
    rows.push({ label: 'District', value: details.district })
  }

  if (!isAdditional && details.state) {
    rows.push({ label: isRequested ? 'State / UT' : 'State', value: details.state })
  }

  rows.push(
    { label: 'PIN Code', value: details.pinCode },
    { label: 'Nature of Premises', value: details.natureOfPremises || (isRequested ? 'Shared' : 'Warehouse') }
  )

  return rows
}

export function getSignatoryRows(details: SignatoryDetailsItem, isRequested: boolean): RowItem[] {
  if (isRequested) {
    return [
      { label: 'Signatory Name', value: details.name },
      { label: 'Signatory PAN', value: details.pan },
      { label: 'Date of Birth', value: details.dob || '01-01-2000' },
      { label: 'Designation', value: details.designation },
      { label: 'Signatory Mobile', value: details.mobile },
      { label: 'Signatory Email', value: details.email },
    ]
  }

  return [
    { label: 'Name', value: details.name },
    { label: 'PAN', value: details.pan },
    { label: 'Designation', value: details.designation },
    { label: 'Mobile', value: details.mobile },
    { label: 'Email', value: details.email },
  ]
}

export function getContactRows(details: ContactDetailsItem): RowItem[] {
  return [
    { label: 'Mobile Number', value: details.mobile },
    { label: 'Email Address', value: details.email },
  ]
}

