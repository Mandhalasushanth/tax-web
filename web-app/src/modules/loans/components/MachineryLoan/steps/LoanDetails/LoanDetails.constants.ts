import type { MachineryEquipmentType, MachineryLoanRepaymentTenure } from '@modules/loans/types/machineryLoan.types'

export const MACHINERY_EQUIPMENT_TYPES: MachineryEquipmentType[] = [
  'CNC / Automation Machinery',
  'Medical Equipment',
  'Printing / Packaging Machinery',
  'Construction Machinery',
  'Food Processing Machinery',
  'Textile Machinery',
  'Other',
]

export const REPAYMENT_TENURE_OPTIONS: MachineryLoanRepaymentTenure[] = [
  '12 Months',
  '24 Months',
  '36 Months',
  '48 Months',
  '60 Months',
  '72 Months',
  '84 Months',
]
