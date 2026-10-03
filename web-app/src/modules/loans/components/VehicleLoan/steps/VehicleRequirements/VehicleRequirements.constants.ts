import type { VehicleCategory, VehicleRepaymentTenure, VehicleMakeModel } from '@modules/loans/types/vehicleLoan.types'

export const VEHICLE_CATEGORY_OPTIONS: VehicleCategory[] = [
  'New Car (Passenger)',
  'Pre-Owned / Used Car',
  'Electric Vehicle (EV - 2W / 4W)',
  'Two-Wheeler / Superbike',
  'Commercial Vehicle / Truck',
  'Fleet Purchase',
  'Balance Transfer & Top-Up',
  'Others',
]

export const SHORT_TERM_TENURE_OPTIONS: { label: string; value: VehicleRepaymentTenure }[] = [
  { label: '3 M', value: '3 M (3 Months)' },
  { label: '6 M', value: '6 M (6 Months)' },
  { label: '9 M', value: '9 M (9 Months)' },
]

export const LONG_TERM_TENURE_OPTIONS: { label: string; value: VehicleRepaymentTenure }[] = [
  { label: '1 Yr', value: '12 M (1 Yr)' },
  { label: '1.5 Yrs', value: '18 M (1.5 Yrs)' },
  { label: '2 Yrs', value: '24 M (2 Yrs)' },
  { label: '3 Yrs', value: '36 M (3 Yrs)' },
  { label: '4 Yrs', value: '48 M (4 Yrs)' },
  { label: '5 Yrs', value: '60 M (5 Yrs)' },
  { label: '6 Yrs', value: '72 M (6 Yrs)' },
  { label: '7 Yrs', value: '84 M (7 Yrs)' },
  { label: 'Custom', value: 'Other / Custom Tenure' },
]

export const QUICK_TENURE_PILLS: { label: string; value: VehicleRepaymentTenure }[] = [
  { label: '6 M', value: '6 M (6 Months)' },
  { label: '1 Yr', value: '12 M (1 Yr)' },
  { label: '2 Yrs', value: '24 M (2 Yrs)' },
  { label: '3 Yrs', value: '36 M (3 Yrs)' },
  { label: '5 Yrs', value: '60 M (5 Yrs)' },
  { label: '7 Yrs', value: '84 M (7 Yrs)' },
]

export const VEHICLE_MAKE_MODEL_OPTIONS: VehicleMakeModel[] = [
  'Maruti Suzuki Swift',
  'Maruti Suzuki Baleno',
  'Maruti Suzuki Brezza',
  'Maruti Suzuki Ertiga',
  'Hyundai Creta',
  'Hyundai Venue',
  'Hyundai i20',
  'Hyundai Verna',
  'Tata Nexon',
  'Tata Punch',
  'Tata Harrier / Safari',
  'Tata Nexon EV',
  'Mahindra Thar',
  'Mahindra Scorpio-N',
  'Mahindra XUV700',
  'Kia Seltos',
  'Kia Sonet',
  'Toyota Innova Crysta / Hycross',
  'Toyota Fortuner',
  'Honda City / Elevate',
  'Electric: MG ZS EV / Ola S1 / Ather 450X',
  'Two-Wheeler: Honda Activa / TVS Jupiter',
  'Two-Wheeler: Royal Enfield / Bajaj Pulsar',
  'Commercial: Tata Ace / Mahindra Bolero Pik-Up',
  'Other (Specify Custom Vehicle Model)',
]

export const AMOUNT_PRESETS = [
  { label: '₹3 Lakhs', value: 300000 },
  { label: '₹5 Lakhs', value: 500000 },
  { label: '₹8 Lakhs', value: 800000 },
  { label: '₹12 Lakhs', value: 1200000 },
  { label: '₹20 Lakhs', value: 2000000 },
]
