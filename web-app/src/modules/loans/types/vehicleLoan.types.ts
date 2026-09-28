export type VehicleCondition = 'New Vehicle' | 'Pre-Owned / Used Vehicle'

export type VehicleCategory =
  | 'New Car (Passenger)'
  | 'Pre-Owned / Used Car'
  | 'Electric Vehicle (EV - 2W / 4W)'
  | 'Two-Wheeler / Superbike'
  | 'Commercial Vehicle / Truck'
  | 'Fleet Purchase'
  | 'Balance Transfer & Top-Up'
  | 'Others'

export type VehicleRepaymentTenure =
  | '3 M (3 Months)'
  | '6 M (6 Months)'
  | '9 M (9 Months)'
  | '12 M (1 Yr)'
  | '18 M (1.5 Yrs)'
  | '24 M (2 Yrs)'
  | '36 M (3 Yrs)'
  | '48 M (4 Yrs)'
  | '60 M (5 Yrs)'
  | '72 M (6 Yrs)'
  | '84 M (7 Yrs)'
  | 'Other / Custom Tenure'

export type VehicleMakeModel =
  | 'Maruti Suzuki Swift'
  | 'Maruti Suzuki Baleno'
  | 'Maruti Suzuki Brezza'
  | 'Maruti Suzuki Ertiga'
  | 'Hyundai Creta'
  | 'Hyundai Venue'
  | 'Hyundai i20'
  | 'Hyundai Verna'
  | 'Tata Nexon'
  | 'Tata Punch'
  | 'Tata Harrier / Safari'
  | 'Tata Nexon EV'
  | 'Mahindra Thar'
  | 'Mahindra Scorpio-N'
  | 'Mahindra XUV700'
  | 'Kia Seltos'
  | 'Kia Sonet'
  | 'Toyota Innova Crysta / Hycross'
  | 'Toyota Fortuner'
  | 'Honda City / Elevate'
  | 'Electric: MG ZS EV / Ola S1 / Ather 450X'
  | 'Two-Wheeler: Honda Activa / TVS Jupiter'
  | 'Two-Wheeler: Royal Enfield / Bajaj Pulsar'
  | 'Commercial: Tata Ace / Mahindra Bolero Pik-Up'
  | 'Other (Specify Custom Vehicle Model)'

export type VehicleEmploymentType = 'Salaried' | 'Self Employed Professional' | 'Self Employed Business'

export interface VehicleLoanData {
  // Step 1: Vehicle & Loan Requirements
  loanAmount: string | number
  vehicleCategory: VehicleCategory | ''
  repaymentTenure: VehicleRepaymentTenure | ''
  vehicleCondition: VehicleCondition
  vehicleMakeModel: string
  customVehicleMakeModel?: string
  onRoadPrice: string | number
  downPayment: string | number

  // Step 2: Applicant & Employment Details
  fullName: string
  mobileNumber: string
  panNumber: string
  employmentType: VehicleEmploymentType
  monthlyNetIncome: string | number
  city: string

  // Step 3: Banking & Disbursement
  bankName: string
  accountNumber: string
  ifscCode: string
  branchName?: string

  // Step 4: Documents & Review
  uploadedDocs?: Record<string, { name: string; size: string; file?: File; uploadedAt: string }>
  termsAccepted: boolean
}
