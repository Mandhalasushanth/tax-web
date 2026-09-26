import {
  IconBriefcase,
  IconFileText,
  IconPaperclip,
  IconWallet,
  IconPayslip,
} from './itrFilingIcons'

export * from './itrFilingIcons'
export * from './itrFilingDefaults'

/* ==========================================================================
   1. Category Types & Constants
   ========================================================================== */
export type ItrCategoryId =
  | 'salaried'
  | 'business'
  | 'professional'
  | 'freelancer'
  | 'trader'
  | 'rental'
  | 'capital_gains'
  | 'multiple'

export interface ItrCategoryItem {
  id: ItrCategoryId
  title: string
  subtitle: string
  formTag: string
  iconName: string
}

export const ITR_CATEGORIES: ItrCategoryItem[] = [
  { id: 'salaried', title: 'Salaried', subtitle: 'Salary income with Form 16', formTag: 'ITR-1', iconName: 'user' },
  { id: 'business', title: 'Business Income', subtitle: 'Trading, manufacturing & sales', formTag: 'ITR-3/4', iconName: 'store' },
  { id: 'professional', title: 'Professional', subtitle: 'Doctor, Lawyer, Consultant, CA', formTag: 'ITR-3', iconName: 'medical' },
  { id: 'freelancer', title: 'Freelancer', subtitle: 'Independent contractor & gigs', formTag: 'ITR-3/4', iconName: 'laptop' },
  { id: 'trader', title: 'Trader / Investor', subtitle: 'Stocks, F&O & Intraday', formTag: 'ITR-3', iconName: 'trending' },
  { id: 'rental', title: 'Rental Income', subtitle: 'House & commercial property', formTag: 'ITR-1/2', iconName: 'home' },
  { id: 'capital_gains', title: 'Capital Gains', subtitle: 'Property, shares & mutual funds', formTag: 'ITR-2', iconName: 'document' },
  { id: 'multiple', title: 'Multiple Sources', subtitle: 'Combination of income sources', formTag: 'ITR-2/3', iconName: 'link' },
]

/* ==========================================================================
   2. Taxpayer Profile & Personal Info Types
   ========================================================================== */
export interface TaxpayerProfile {
  panNumber: string
  aadhaarNumber: string
  fullName: string
  dob: string
  mobileNumber: string
  emailAddress: string
  registeredAddress: string
}

export type AssessmentYearOption = 'AY 2026-27' | 'AY 2027-28' | 'AY 2025-26' | ''
export type ResidentialStatusOption = 'resident' | 'nri' | 'rnor' | ''
export type FilingTypeOption = 'original' | 'belated' | 'revised' | 'updated' | ''

export interface FilingBankAccount {
  id: string
  bankName: string
  accountNumber: string
  ifsc: string
  accountType: 'savings' | 'current'
  isPrimary: boolean
  isPreValidated: boolean
}

export interface PreviousItrInfo {
  hasPreviousReturn: boolean
  previousAy?: string
  ackNumber?: string
  filingDate?: string
  hasCarryForwardLoss?: boolean
  lossAmount?: string
  importSalary?: boolean
  importDeductions?: boolean
  importLosses?: boolean
  importBankAccounts?: boolean
}

/* ==========================================================================
   3. Income Sources Types & Constants
   ========================================================================== */
export interface SalaryDetails {
  employerName: string
  grossSalary: string
  exemptAllowances: string
  tdsDeducted: string
}

export interface HousePropertyDetails {
  propertyType: 'self_occupied' | 'let_out'
  homeLoanInterest: string
  annualRentReceived: string
  municipalTaxPaid: string
}

export interface BusinessDetails {
  reportingMethod: '44AD' | '44ADA' | 'regular' | 'not_sure'
  grossTurnover: string
  declaredNetProfit: string
}

export interface CapitalGainsDetails {
  assetTypes: string[]
  stcg: string
  ltcg: string
}

export interface OtherSourcesDetails {
  interestIncome: string
  dividendIncome: string
  otherIncome: string
}

export const ALL_SOURCES = [
  { id: 'salary', label: 'Salary / Pension' },
  { id: 'house_property', label: 'House Property' },
  { id: 'business', label: 'Business / Profession' },
  { id: 'capital_gains', label: 'Capital Gains' },
  { id: 'other_sources', label: 'Other Sources' },
]

export const ASSET_TYPE_OPTIONS = [
  'Equity & Mutual Funds',
  'F&O & Intraday Trading',
  'Crypto / VDA',
  'Real Estate / Land',
]

export const BUSINESS_METHODS = [
  {
    id: '44AD' as const,
    title: 'Presumptive Business (Section 44AD)',
    desc: 'Small traders & retailers (ITR-4 Sugam)',
  },
  {
    id: '44ADA' as const,
    title: 'Presumptive Profession (Section 44ADA)',
    desc: 'Doctors, IT consultants, lawyers (ITR-4 Sugam)',
  },
  {
    id: 'regular' as const,
    title: 'Regular Books of Accounts (ITR-3)',
    desc: 'Maintaining P&L, Balance Sheet, or Audit',
  },
  {
    id: 'not_sure' as const,
    title: "I'm Not Sure",
    desc: 'TaxEdge CA will review and select the best option',
  },
]

/* ==========================================================================
   4. Deductions Data Type
   ========================================================================== */
export interface DeductionsData {
  epf: string
  ppf: string
  lic: string
  elss: string
  childrenTuition: string
  housingLoanPrincipal: string
  selfInsurance: string
  parentInsurance: string
  parentsSeniorCitizen: boolean
  homeLoanInterest24b: string
  section80CTotal: string
  section80D: string
  otherDeductions: string
  section80C: string
  homeLoanInterest: string
}

/* ==========================================================================
   5. Documents Types & Constants
   ========================================================================== */
export interface UploadedDocInfo {
  id: string
  fileName: string
  fileSize: string
  uploadedAt: string
}

export interface ChecklistDocConfig {
  id: string
  title: string
  desc: string
  Icon: React.FC
  isMandatory?: boolean
}

export const REQUIRED_DOCS: ChecklistDocConfig[] = [
  {
    id: 'form16',
    title: 'Form 16 (Part A & B) *',
    desc: 'Issued by your employer showing salary breakup & TDS',
    Icon: IconBriefcase,
    isMandatory: true,
  },
]

export const RECOMMENDED_DOCS: ChecklistDocConfig[] = [
  {
    id: 'form26as',
    title: 'Form 26AS Tax Credit Statement',
    desc: 'Helps your CA reconcile TDS credits and advance tax payments',
    Icon: IconFileText,
  },
  {
    id: 'ais_tis',
    title: 'AIS / TIS Statement',
    desc: 'Annual Information Statement for interest, dividends, and transactions',
    Icon: IconPaperclip,
  },
  {
    id: 'bank_statement',
    title: 'Bank Account Statement',
    desc: 'Recent statement for savings or current account',
    Icon: IconWallet,
  },
  {
    id: 'salary_payslips',
    title: 'Salary Payslips',
    desc: 'Recent salary slips to verify allowances and deductions',
    Icon: IconPayslip,
  },
]

export const ALL_DOCS = [...REQUIRED_DOCS, ...RECOMMENDED_DOCS]

/* ==========================================================================
   6. Steps & Progress Stages
   ========================================================================== */
export const ITR_STEPS = [
  { id: 1, label: 'Personal & Filing' },
  { id: 2, label: 'Income Sources' },
  { id: 3, label: 'Regime & Deductions' },
  { id: 4, label: 'Document Checklist' },
  { id: 5, label: 'Review & File' },
]

export const ITR_STEP_LABELS = [
  'Personal & Filing Info',
  'Income Sources',
  'Regime & Deductions',
  'Document Checklist',
  'Review & File',
]

export interface ItrDraftStateParams {
  isStarted: boolean
  currentStep: number
  selectedCategoryId: ItrCategoryId | null
  assessmentYear: AssessmentYearOption
  residentialStatus: ResidentialStatusOption
  filingType: FilingTypeOption
  bankAccounts: FilingBankAccount[]
  selectedBankId: string
  previousItr: PreviousItrInfo
  selectedSources: string[]
  salaryDetails: SalaryDetails
  housePropertyDetails: HousePropertyDetails
  businessDetails: BusinessDetails
  capitalGainsDetails: CapitalGainsDetails
  otherSourcesDetails: OtherSourcesDetails
  selectedRegime: 'new' | 'old' | ''
  deductions: DeductionsData
  uploadedDocs: Record<string, UploadedDocInfo>
}
