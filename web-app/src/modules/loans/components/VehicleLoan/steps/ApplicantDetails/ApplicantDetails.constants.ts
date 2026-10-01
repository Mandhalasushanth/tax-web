import type { VehicleOccupationType, VehicleIncomeRange } from '@modules/loans/types/vehicleLoan.types'

export const OCCUPATION_OPTIONS: VehicleOccupationType[] = [
  'Salaried',
  'Self-Employed Pro',
  'Business Owner',
]

export const INCOME_RANGE_OPTIONS: VehicleIncomeRange[] = [
  'Below ₹10,000',
  '₹10,000 - ₹15,000',
  '₹15,000 - ₹30,000',
  '₹30,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  'Above ₹1,00,000',
]
