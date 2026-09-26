import type {
  SalaryDetails,
  HousePropertyDetails,
  BusinessDetails,
  CapitalGainsDetails,
  OtherSourcesDetails,
  DeductionsData,
} from './itrFiling.constants'

export const parseAmount = (val?: string | number | null): number => {
  if (val === null || val === undefined) return 0
  if (typeof val === 'number') return isNaN(val) ? 0 : val
  const str = String(val).trim()
  if (!str) return 0
  const clean = str.replace(/[^0-9.]/g, '')
  const num = parseFloat(clean)
  return isNaN(num) ? 0 : num
}

export const formatINR = (val: number): string =>
  val === 0 ? '₹ 0' : `₹ ${val.toLocaleString('en-IN')}`

export function computeOldRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 250000) return 0
  let tax = 0
  let remaining = taxableIncome
  if (remaining > 1000000) {
    tax += (remaining - 1000000) * 0.3
    remaining = 1000000
  }
  if (remaining > 500000) {
    tax += (remaining - 500000) * 0.2
    remaining = 500000
  }
  if (remaining > 250000) {
    tax += (remaining - 250000) * 0.05
  }
  // Section 87A rebate for Old Regime: up to ₹5,00,000 taxable income
  if (taxableIncome <= 500000) return 0
  return Math.round(tax)
}

export function computeNewRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 400000) return 0
  const slabs = [
    [400000, 800000, 0.05],
    [800000, 1200000, 0.10],
    [1200000, 1600000, 0.15],
    [1600000, 2000000, 0.20],
    [2000000, 2400000, 0.25],
    [2400000, Infinity, 0.30],
  ]
  const tax = slabs.reduce((acc, [low, high, rate]) => {
    if (taxableIncome > low) {
      return acc + (Math.min(taxableIncome, high) - low) * rate
    }
    return acc
  }, 0)
  // Section 87A rebate for New Regime (AY 2026-27): up to ₹12,00,000 taxable income
  if (taxableIncome <= 1200000) return 0
  return Math.round(tax)
}

export interface ItrTaxCalculationParams {
  selectedSources?: string[]
  salaryDetails?: SalaryDetails
  housePropertyDetails?: HousePropertyDetails
  businessDetails?: BusinessDetails
  capitalGainsDetails?: CapitalGainsDetails
  otherSourcesDetails?: OtherSourcesDetails
  selectedRegime?: 'new' | 'old' | ''
  deductions?: DeductionsData
}

export interface ItrTaxCalculationResult {
  grossTotalIncome: number
  salaryIncome: number
  hpIncome: number
  bizIncome: number
  cgIncome: number
  otherIncome: number
  stdDeduction: number
  totalChapterVIDeductions: number
  netTaxableIncome: number
  grossTax: number
  cess: number
  totalTaxLiability: number
  tdsCredits: number
  netTaxPayable: number
  refundDue: number
  newRegime: {
    grossTotalIncome: number
    totalDeductions: number
    taxableIncome: number
    taxPayable: number
  }
  oldRegime: {
    grossTotalIncome: number
    totalDeductions: number
    taxableIncome: number
    taxPayable: number
  }
}

export function calculateItrTax(params: ItrTaxCalculationParams): ItrTaxCalculationResult {
  const selected = params.selectedSources || []

  // 1. Salary Income
  let salaryIncome = 0
  if (selected.includes('salary') && params.salaryDetails) {
    const gross = parseAmount(params.salaryDetails.grossSalary)
    const exempt = parseAmount(params.salaryDetails.exemptAllowances)
    salaryIncome = Math.max(0, gross - exempt)
  }

  // 2. House Property Income
  let hpIncome = 0
  if (selected.includes('house_property') && params.housePropertyDetails) {
    if (params.housePropertyDetails.propertyType === 'self_occupied') {
      const interest = parseAmount(params.housePropertyDetails.homeLoanInterest)
      // Self occupied interest is loss up to ₹2,00,000
      hpIncome = -Math.min(interest, 200000)
    } else {
      const rent = parseAmount(params.housePropertyDetails.annualRentReceived)
      const municipalTax = parseAmount(params.housePropertyDetails.municipalTaxPaid)
      const netAnnualVal = Math.max(0, rent - municipalTax)
      const standardDed = netAnnualVal * 0.3
      const loanInterest = parseAmount(params.housePropertyDetails.homeLoanInterest)
      hpIncome = netAnnualVal - standardDed - loanInterest
    }
  }

  // 3. Business Income
  let bizIncome = 0
  if (selected.includes('business') && params.businessDetails) {
    const declaredProfit = parseAmount(params.businessDetails.declaredNetProfit)
    const turnover = parseAmount(params.businessDetails.grossTurnover)
    if (declaredProfit > 0) {
      bizIncome = declaredProfit
    } else if (turnover > 0) {
      if (params.businessDetails.reportingMethod === '44ADA') {
        bizIncome = turnover * 0.5
      } else {
        bizIncome = turnover * 0.08
      }
    }
  }

  // 4. Capital Gains
  let cgIncome = 0
  if (selected.includes('capital_gains') && params.capitalGainsDetails) {
    const stcg = parseAmount(params.capitalGainsDetails.stcg)
    const ltcg = parseAmount(params.capitalGainsDetails.ltcg)
    cgIncome = stcg + ltcg
  }

  // 5. Other Sources
  let otherIncome = 0
  if (selected.includes('other_sources') && params.otherSourcesDetails) {
    const interest = parseAmount(params.otherSourcesDetails.interestIncome)
    const dividend = parseAmount(params.otherSourcesDetails.dividendIncome)
    const other = parseAmount(params.otherSourcesDetails.otherIncome)
    otherIncome = interest + dividend + other
  }

  // Gross Total Income (cannot be negative)
  const totalPositiveIncome = salaryIncome + bizIncome + cgIncome + otherIncome
  const grossTotalIncome = Math.max(0, totalPositiveIncome + hpIncome)

  // Standard Deduction (u/s 16(ia): strictly for salaried, capped at salary income)
  const hasSalary = selected.includes('salary') && salaryIncome > 0
  const stdDeductionNew = hasSalary ? Math.min(salaryIncome, 75000) : 0
  const stdDeductionOld = hasSalary ? Math.min(salaryIncome, 50000) : 0

  // Deductions for Old Regime
  let section80C = 0
  let section80D = 0
  let homeLoan24b = 0
  if (params.deductions) {
    section80C = parseAmount(params.deductions.section80C) || Math.min(
      [
        params.deductions.epf,
        params.deductions.ppf,
        params.deductions.lic,
        params.deductions.elss,
        params.deductions.childrenTuition,
        params.deductions.housingLoanPrincipal,
      ].reduce((acc, v) => acc + parseAmount(v), 0),
      150000
    )

    section80D = parseAmount(params.deductions.section80D) || Math.min(
      parseAmount(params.deductions.selfInsurance) + parseAmount(params.deductions.parentInsurance),
      params.deductions.parentsSeniorCitizen ? 75000 : 50000
    )

    // Only if not already claimed in house property
    if (!selected.includes('house_property')) {
      homeLoan24b = Math.min(parseAmount(params.deductions.homeLoanInterest24b), 200000)
    }
  }

  const rawChapterVI = section80C + section80D + homeLoan24b
  // Chapter VI-A cannot exceed gross total income after standard deduction
  const maxAllowableOldDeductions = Math.max(0, grossTotalIncome - stdDeductionOld)
  const totalChapterVIDeductions = Math.min(rawChapterVI, maxAllowableOldDeductions)

  // New Regime Calculation
  const taxableNew = Math.max(0, grossTotalIncome - stdDeductionNew)
  const baseTaxNew = computeNewRegimeTax(taxableNew)
  const taxPayableNew = Math.round(baseTaxNew * 1.04)

  // Old Regime Calculation
  const taxableOld = Math.max(0, grossTotalIncome - stdDeductionOld - totalChapterVIDeductions)
  const baseTaxOld = computeOldRegimeTax(taxableOld)
  const taxPayableOld = Math.round(baseTaxOld * 1.04)

  // Active regime specifics
  const regime = params.selectedRegime || 'new'
  const activeStdDeduction = regime === 'new' ? stdDeductionNew : stdDeductionOld
  const activeChapterVIDeductions = regime === 'new' ? 0 : totalChapterVIDeductions
  const activeNetTaxableIncome = regime === 'new' ? taxableNew : taxableOld
  const activeGrossTax = regime === 'new' ? baseTaxNew : baseTaxOld
  const activeCess = Math.round(activeGrossTax * 0.04)
  const activeTotalLiability = activeGrossTax + activeCess

  // TDS credits
  const tdsCredits = selected.includes('salary') && params.salaryDetails
    ? parseAmount(params.salaryDetails.tdsDeducted)
    : 0

  const netTaxPayable = Math.max(0, activeTotalLiability - tdsCredits)
  const refundDue = Math.max(0, tdsCredits - activeTotalLiability)

  return {
    grossTotalIncome,
    salaryIncome,
    hpIncome,
    bizIncome,
    cgIncome,
    otherIncome,
    stdDeduction: activeStdDeduction,
    totalChapterVIDeductions: activeChapterVIDeductions,
    netTaxableIncome: activeNetTaxableIncome,
    grossTax: activeGrossTax,
    cess: activeCess,
    totalTaxLiability: activeTotalLiability,
    tdsCredits,
    netTaxPayable,
    refundDue,
    newRegime: {
      grossTotalIncome,
      totalDeductions: stdDeductionNew,
      taxableIncome: taxableNew,
      taxPayable: taxPayableNew,
    },
    oldRegime: {
      grossTotalIncome,
      totalDeductions: stdDeductionOld + totalChapterVIDeductions,
      taxableIncome: taxableOld,
      taxPayable: taxPayableOld,
    },
  }
}
