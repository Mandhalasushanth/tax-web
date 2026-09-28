export type VehicleCondition = 'New Vehicle' | 'Pre-Owned / Used Vehicle'

export type VehicleCategory =
  | 'Two Wheeler'
  | 'Four Wheeler (Car / SUV)'
  | 'Commercial Vehicle (LCV / HCV)'
  | 'Electric Vehicle (EV)'
  | 'Tractor / Agri Vehicle'
  | 'Construction Equipment Vehicle'
  | 'Others'

export type VehicleRepaymentTenure =
  | '6 Months'
  | '1 Year'
  | '2 Years'
  | '3 Years'
  | '4 Years'
  | '5 Years'
  | '7 Years'

export type VehicleEmploymentType = 'Salaried' | 'Self Employed Professional' | 'Self Employed Business'

export interface VehicleLoanData {
  // Step 1: Vehicle & Loan Requirements
  loanAmount: string | number
  vehicleCategory: VehicleCategory | ''
  repaymentTenure: VehicleRepaymentTenure | ''
  vehicleCondition: VehicleCondition
  vehicleMakeModel: string
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
