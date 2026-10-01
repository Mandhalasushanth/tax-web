import type { UploadedLoanDocument } from '@modules/loans/documents/loanDocument.types'

/**
 * Promoter / Sponsor entry in Step 1
 */
export interface ProjectPromoterSponsor {
  id: string
  name: string
  category: 'Individual' | 'Corporate'
  shareholdingPercent: number | string
}

/**
 * Land Parcel entry in Step 2 Section 3
 */
export interface LandParcelItem {
  id: string
  surveyPlotNumber: string
  areaAcres: string
  ownership: string
  acquisitionStatus: string
  titleStatus: string
  encumbrance: string
}

/**
 * Machinery Item in Step 2 Section 8
 */
export interface PlantMachineryItem {
  id: string
  machineryName: string
  category: string
  manufacturerSupplier: string
  quantity: string
  unitCost: string
  totalCost: string
}

/**
 * Raw Material Item in Step 2 Section 9
 */
export interface RawMaterialItem {
  id: string
  mainRawMaterial: string
  source: string
  supplier: string
  annualRequirement: string
  unit: string
  hasSupplyAgreement: boolean
}

/**
 * Implementation Milestone in Step 2 Section 11
 */
export interface ImplementationMilestoneItem {
  id: string
  milestone: string
  plannedDate: string
  actualDate: string
  status: string
}

/**
 * Product / Service Item in Step 4 Section 1
 */
export interface ProductServiceItem {
  id: string
  name: string
  category: string
  unit: string
  installedCapacity: string
  expectedProductionAnnual: string
  capacityUtilisationPercent: string
  sellingPrice: string
  domesticExport: string
  productMixPercent: string
}

/**
 * Customer / Offtaker Item in Step 4 Section 3
 */
export interface CustomerOfftakerItem {
  id: string
  customerName: string
  customerType: string
  expectedPurchaseQuantity: string
  unit: string
  expectedRevenue: string
  isContractAvailable: boolean
  contractPeriodYears: string
  contractedPrice: string
  minimumOfftake: string
  agreementStatus: string
}

export type ProjectSectorType =
  | 'Energy & Power'
  | 'Transportation & Infra'
  | 'Industrial Manufacturing'
  | 'Commercial Real Estate'
  | 'Healthcare & Life Sciences'
  | 'Water & Waste Management'
  | 'Other'
  | ''

export type ProjectType =
  | 'Greenfield Project'
  | 'Brownfield Expansion'
  | 'Modernization & Upgradation'
  | 'Debt Refinancing'
  | ''

export type ProjectDevelopmentOption =
  | 'Greenfield'
  | 'Expansion'
  | 'Modernization'
  | 'Diversification'
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

export type ApplicantEntityType =
  | 'Private Limited'
  | 'Public Limited'
  | 'Limited Liability Partnership (LLP)'
  | 'Partnership Firm'
  | 'Proprietorship'
  | 'Special Purpose Vehicle (SPV)'
  | 'Joint Venture'
  | ''

export type BankingRelationshipType =
  | 'Existing Borrower'
  | 'Savings Account Holder'
  | 'Current Account Holder'
  | 'Fixed Deposit Customer'
  | 'New Customer'
  | ''

export type PrimaryBusinessActivityType =
  | 'Manufacturing & Industrial'
  | 'Renewable Energy & Power'
  | 'Infrastructure & Construction'
  | 'Commercial Real Estate'
  | 'Logistics & Warehousing'
  | 'Healthcare & Pharma'
  | 'Hospitality & Tourism'
  | 'IT & Data Centers'
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
  // Step 1 - Unified Screen: Applicant & Project
  applicantName: string
  entityType: ApplicantEntityType
  pan: string
  cinLlpin: string
  dateOfIncorporation?: string
  isExistingCustomer?: boolean
  isExistingBankCustomer: boolean
  bankingRelationship: BankingRelationshipType
  primaryBusinessActivity: PrimaryBusinessActivityType

  officeAddressLine1: string
  officeAddressLine2: string
  officeState: string
  officeDistrictCity: string
  officePinCode: string

  promoters: ProjectPromoterSponsor[]

  projectName: string
  projectSector: ProjectSectorType
  projectSubSector: string
  projectType: ProjectType
  developmentOption: ProjectDevelopmentOption

  addressLine1: string
  addressLine2: string
  state: string
  districtCity: string
  pinCode: string

  // Step 2 - Location, Land & Technical (Sections 1 through 12)
  // 1. Project Location
  step2ProjectAddress: string
  step2State: string
  step2District: string
  step2PinCode: string
  step2ProjectZone: string
  step2NearestTownCity: string
  step2DistanceNearestTownKm: string

  // 2. Land Details
  totalLandRequiredAcres: string
  landAvailableAcres: string
  landAcquiredAcres: string
  landPendingAcres: string
  landOwnership: string
  landUse: string
  titleStatus: string
  encumbrance: string
  naConversionStatus: string

  // 3. Land Parcels
  landParcels: LandParcelItem[]

  // 4. Right of Way (ROW)
  rowRequired: boolean
  rowType: string
  rowTotalLengthKm: string
  rowObtainedPending: string
  rowApprovalStatus: string
  rowExpectedCompletionDate: string

  // 5. Utilities & Site Infrastructure
  powerSource: string
  waterSource: string
  approachRoad: string
  drainageArrangement: string
  wasteEffluentArrangement: string
  otherInfrastructure: string

  // 6. Technical Details
  technologyType: string
  technologyDescription: string
  technologySource: string
  technologyProvider: string
  isTechnologyProven: boolean
  isTechnologyLicenseRequired: boolean
  technicalConsultant: string

  // 7. Capacity & Production
  proposedCapacity: string
  capacityUnit: string
  expectedInitialUtilisationPercent: string
  stabilisedUtilisationPercent: string
  productionPerYear: string
  operatingDaysPerYear: string
  numberOfShifts: string

  // 8. Plant & Machinery
  plantMachineryList: PlantMachineryItem[]

  // 9. Raw Material / Inputs
  rawMaterialList: RawMaterialItem[]

  // 10. EPC / Project Execution
  epcContractor: string
  contractType: string
  epcContractValue: string
  epcAwardDate: string
  constructionStartDate: string
  expectedCompletionDate: string

  // 11. Implementation Milestones
  implementationMilestones: ImplementationMilestoneItem[]

  // 12. Manpower
  totalEmployees: string
  skilledEmployees: string
  semiSkilledEmployees: string
  unskilledEmployees: string
  technicalStaffEmployees: string
  administrativeStaffEmployees: string

  // Step 3 - Cost & Funding Details
  // 1. Total Project Cost (Capex Breakup)
  landSiteDevCost: string
  civilWorksCost: string
  plantMachineryCost: string
  engineeringTechnicalCost: string
  preliminaryPreOperativeCost: string
  marginMoneyWorkingCapitalCost: string
  contingencyProvisionCost: string
  totalEstimatedProjectCost: string

  // 2. Means of Finance (Funding Structure)
  promotersEquityContribution: string
  debtTermLoanRequested: string
  subordinatedDebtUnsecuredLoans: string
  govtSubsidyCapitalGrant: string
  proposedDebtToEquityRatio: string
  proposedLendersLeadBank: string

  // 3. Disbursement Schedule & Phasing
  phase1DrawdownInvestment: string
  phase1Milestone: string
  phase2DrawdownInvestment: string
  phase2Milestone: string
  expectedCommercialOperationsDate: string

  // Step 4 - Market & Financials
  // 1. Products / Services
  productsServicesList: ProductServiceItem[]

  // 2. Market Details
  targetMarket: string
  marketType: string
  targetGeography: string
  customerSegment: string
  expectedMarketSharePercent: string
  majorCompetitors: string
  competitiveAdvantage: string

  // 3. Customers / Offtakers
  customersOfftakersList: CustomerOfftakerItem[]

  // 4. Projection Setup
  projectionPeriodYears?: string
  historicalYears?: string
  projectedYears?: string
  commercialOperationDate?: string
  stabilisationYear?: string

  // 5. Historical Financials (FY-3, FY-2, FY-1)
  historicalRevenueFy3?: string
  historicalRevenueFy2?: string
  historicalRevenueFy1?: string
  historicalEbitdaFy3?: string
  historicalEbitdaFy2?: string
  historicalEbitdaFy1?: string
  historicalPatFy3?: string
  historicalPatFy2?: string
  historicalPatFy1?: string
  historicalDebtFy3?: string
  historicalDebtFy2?: string
  historicalDebtFy1?: string

  // 8. Working Capital Assumptions
  inventoryDays?: string
  receivableDays?: string
  payableDays?: string
  operatingCycleDays?: string

  // Step 4+: Financial Projections & Details
  totalProjectCost: string
  debtFundingRequired: string
  equityContribution?: string
  preferredFinanceType?: ProjectFinanceType
  repaymentTenure?: ProjectFinanceTenure

  // Step 5 - Loan Requirement & Repayment
  // 1. Loan Requirement
  loanRequirementTotalCost?: string
  loanRequirementOwnContribution?: string
  loanRequiredAmount?: string
  loanType?: string
  schemeProduct?: string
  preferredLender?: string
  proposedDisbursementDate?: string

  // 2. Repayment Details
  repaymentPeriodYears?: string
  moratoriumPeriodMonths?: string
  repaymentFrequency?: string
  expectedInterestRatePercent?: string
  repaymentStartDate?: string
  preferredEmiInstalment?: string

  // 4. Repayment Sources
  primaryRepaymentSource?: string
  secondaryRepaymentSource?: string
  dscrProjected?: string
  explainRepaymentSources?: string

  // Step 6 - Security & Compliance
  // 1. Security / Collateral
  securityList?: SecurityItem[]
  typeOfSecurity?: string
  securityAssetDescription?: string
  securityEstimatedValue?: string
  securityOwnershipType?: string
  securityLocationOfAsset?: string
  securityValuationReportAvailable?: boolean
  securityExistingCharge?: boolean
  securityExistingChargeDetails?: string

  // 2. Legal & Statutory Approvals
  approvalEnvironmentalClearance?: boolean
  approvalBuildingPlan?: boolean
  approvalFactoryLicense?: boolean
  approvalPollutionControlBoard?: boolean
  approvalLandUseConversion?: boolean
  approvalPowerConnection?: boolean
  approvalWaterSupply?: boolean
  approvalOther?: boolean
  approvalOtherSpecify?: string

  // 3. Regulatory Compliance
  businessRegistrationType?: string
  complianceRegistrationNumber?: string
  gstApplicable?: boolean
  complianceGstNumber?: string
  complianceIncomeTaxPan?: string
  complianceTan?: string

  // 4. Insurance Details
  typeOfInsurance?: string
  insuranceCoverageAmount?: string
  insurancePolicyValidity?: string

  // 5. Other Compliance
  labourLawCompliance?: boolean
  localAuthorityApprovals?: boolean
  healthSafetyCompliance?: boolean
  industrySpecificCompliance?: boolean
  anyPendingLitigation?: boolean
  pendingLitigationDetails?: string

  // Step 6+: Promoter & Management
  promoterEntityName: string
  promoterConstitution: string
  promoterPan: string
  promoterCibilScore: string
  promoterNetWorth: string
  priorProjectExperience: string
  collateralType: CollateralType
  collateralDescription: string
  disbursementBankName: string
  disbursementAccountNumber: string
  disbursementIfscCode: string

  // Step 7: Documents, Review & Submit
  uploadedDocs: Record<string, UploadedLoanDocument | File>
  declarationAccurateInfo?: boolean
  declarationAuthorizeVerification?: boolean
  termsAccepted: boolean
}

export interface SecurityItem {
  id?: string
  typeOfSecurity: string
  assetDescription: string
  estimatedValue: string
  ownershipType: string
  locationOfAsset: string
  valuationReportAvailable: boolean
  existingCharge: boolean
  existingChargeDetails?: string
}

