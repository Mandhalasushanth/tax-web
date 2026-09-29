import type { UploadedLoanDocument } from '../documents/loanDocument.types'

export type ProjectSectorType =
  | 'Infrastructure'
  | 'Renewable Energy'
  | 'Real Estate'
  | 'Manufacturing'
  | 'Healthcare'
  | 'Hospitality & Tourism'
  | 'Logistics & Warehousing'
  | 'Education'
  | 'Agro & Food Processing'
  | 'Other'
  | ''

export type ProjectFinanceTenure =
  | '12 Months'
  | '24 Months'
  | '36 Months'
  | '48 Months'
  | '60 Months'
  | '84 Months'
  | '96 Months'
  | '120 Months'
  | ''

export type PromoterConstitution =
  | 'Individual / Proprietorship'
  | 'Partnership Firm'
  | 'LLP'
  | 'Private Limited Company'
  | 'Public Limited Company'
  | 'Trust / NGO'
  | 'SPV / Project Company'
  | ''

export type CollateralType =
  | 'Land & Building'
  | 'Plant & Machinery'
  | 'Fixed Deposits (FD)'
  | 'Government Securities'
  | 'Personal Guarantee'
  | 'Corporate Guarantee'
  | 'None / Clean'
  | ''

export type ProjectFinanceType =
  | 'Term Loan'
  | 'Structured Finance'
  | 'Syndicated Loan'
  | 'Mezzanine Finance'
  | 'Equity + Debt Mix'
  | ''

export interface ProjectFinanceData {
  // Step 1: Project Details & Funding
  projectName: string
  projectSector: ProjectSectorType
  projectLocation: string
  projectDescription: string
  totalProjectCost: string
  debtFundingRequired: string
  equityContribution: string
  preferredFinanceType: ProjectFinanceType
  repaymentTenure: ProjectFinanceTenure

  // Step 2: Promoter & Collateral
  promoterEntityName: string
  promoterConstitution: PromoterConstitution
  promoterPan: string
  promoterCibilScore: string
  promoterNetWorth: string
  priorProjectExperience: string
  collateralType: CollateralType
  collateralDescription: string
  disbursementBankName: string
  disbursementAccountNumber: string
  disbursementIfscCode: string

  // Step 3 / 4: Documents & Review
  uploadedDocs: Record<string, UploadedLoanDocument>
  termsAccepted: boolean
}
