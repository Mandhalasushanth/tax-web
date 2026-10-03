import type { WorkingCapitalCreditPurpose, WorkingCapitalFacilityType } from '@modules/loans/types/workingCapitalLoan.types'

export const CREDIT_PURPOSE_OPTIONS: WorkingCapitalCreditPurpose[] = [
  'Working Capital',
  'Inventory / Stock',
  'Raw Material Purchase',
  'Supplier Payments',
  'Business Operating Expenses',
  'Receivables / Cash Flow Gap',
  'Other',
]

export const FACILITY_TYPE_OPTIONS: WorkingCapitalFacilityType[] = [
  'Cash Credit (CC) Facility',
  'Overdraft (OD) Line',
  'Invoice / Bill Discounting',
]
