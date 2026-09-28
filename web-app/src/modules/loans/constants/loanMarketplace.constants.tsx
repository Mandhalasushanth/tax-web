import React from 'react'
import { routePaths } from '@core/config/routePaths'
import type { LoanMarketplaceItem } from '../types/loanMarketplace.types'

/**
 * 1. Business Loan: Mechanical Gears on Base
 */
export const BusinessGearsIcon: React.FC = () => (
  <img
    src="/assets/icons/loans/marketplace/business-gears.svg"
    alt=""
    width="48"
    height="48"
    className="loan-item-card__icon-svg"
    aria-hidden="true"
  />
)

/**
 * 2. Personal Loan: Storefront / Personal Finance Facility
 */
export const StorefrontIcon: React.FC = () => (
  <img
    src="/assets/icons/loans/marketplace/storefront.svg"
    alt=""
    width="48"
    height="48"
    className="loan-item-card__icon-svg"
    aria-hidden="true"
  />
)

/**
 * 3. Home Loan: Suburban House with Garden Shrub & Chimney
 */
export const HouseGardenIcon: React.FC = () => (
  <img
    src="/assets/icons/loans/marketplace/house-garden.svg"
    alt=""
    width="48"
    height="48"
    className="loan-item-card__icon-svg"
    aria-hidden="true"
  />
)

/**
 * 4. Property Loan: Brick Cottage Villa
 */
export const PropertyVillaIcon: React.FC = () => (
  <img
    src="/assets/icons/loans/marketplace/property-villa.svg"
    alt=""
    width="48"
    height="48"
    className="loan-item-card__icon-svg"
    aria-hidden="true"
  />
)

/**
 * 5. Vehicle Loan: Executive Driver / Automotive Icon
 */
export const ExecutivePersonIcon: React.FC = () => (
  <img
    src="/assets/icons/loans/marketplace/executive-person.svg"
    alt=""
    width="48"
    height="48"
    className="loan-item-card__icon-svg"
    aria-hidden="true"
  />
)

/**
 * 6. Working Capital: High-Rise Building with Grid Windows
 */
export const BuildingGridIcon: React.FC = () => (
  <img
    src="/assets/icons/loans/marketplace/building-grid.svg"
    alt=""
    width="48"
    height="48"
    className="loan-item-card__icon-svg"
    aria-hidden="true"
  />
)

/**
 * 7. Machinery Loan: Industrial Equipment / Vehicle
 */
export const MachineryVehicleIcon: React.FC = () => (
  <img
    src="/assets/icons/loans/marketplace/machinery-vehicle.svg"
    alt=""
    width="48"
    height="48"
    className="loan-item-card__icon-svg"
    aria-hidden="true"
  />
)

/**
 * 8. Project Finance: Blueprint / Architecture Project
 */
export const ProjectFinanceIcon: React.FC = () => (
  <img
    src="/assets/icons/loans/marketplace/project-finance.svg"
    alt=""
    width="48"
    height="48"
    className="loan-item-card__icon-svg"
    aria-hidden="true"
  />
)

/**
 * 9. MSME Loan: Government Seal / Badge
 */
export const MsmeSealIcon: React.FC = () => (
  <img
    src="/assets/icons/loans/marketplace/msme-seal.svg"
    alt=""
    width="48"
    height="48"
    className="loan-item-card__icon-svg"
    aria-hidden="true"
  />
)

/**
 * Header Wallet Icon
 */
export const WalletIcon: React.FC = () => (
  <img
    src="/assets/icons/loans/wallet.svg"
    alt=""
    width="28"
    height="28"
    aria-hidden="true"
  />
)

/**
 * Back Chevron Icon
 */
export const BackChevronIcon: React.FC = () => (
  <img
    src="/assets/icons/loans/arrow-left.svg"
    alt=""
    width="20"
    height="20"
    aria-hidden="true"
  />
)

/**
 * Right Navigation Chevron Icon
 */
export const RightChevronIcon: React.FC = () => (
  <img
    src="/assets/icons/loans/arrow-right.svg"
    alt=""
    width="16"
    height="16"
    className="loan-item-card__chevron"
    aria-hidden="true"
  />
)


/**
 * Complete list of loan items exactly matching the Marketplace catalog.
 */
export const LOAN_MARKETPLACE_ITEMS: LoanMarketplaceItem[] = [
  {
    id: 'business-loan',
    title: 'Business Loan',
    desc: 'Unsecured capital up to ₹50 Lakhs',
    rate: 'From 12% p.a.',
    applyPath: routePaths.loansBusinessLoan,
    tileBg: '#F0F4FF',
    tileBorder: '#DBE4FF',
    icon: <BusinessGearsIcon />,
  },
  {
    id: 'personal-loan',
    title: 'Personal Loan',
    desc: 'Quick personal funds up to ₹25 Lakhs',
    rate: 'From 10.5% p.a.',
    applyPath: routePaths.loansPersonalLoan,
    tileBg: '#FEF6EE',
    tileBorder: '#FED7AA',
    icon: <StorefrontIcon />,
  },
  {
    id: 'home-loan',
    title: 'Home Loan',
    desc: 'Lowest interest rate for home purchase & renovation',
    rate: 'From 8.4% p.a.',
    applyPath: routePaths.loansHomeLoan,
    tileBg: '#F0FDF4',
    tileBorder: '#BBF7D0',
    icon: <HouseGardenIcon />,
  },
  {
    id: 'property-loan',
    title: 'Property Loan',
    desc: 'Loan against commercial or residential property',
    rate: 'From 9.5% p.a.',
    applyPath: routePaths.loansPropertyLoan,
    tileBg: '#FDF2F8',
    tileBorder: '#FBCFE8',
    icon: <PropertyVillaIcon />,
  },
  {
    id: 'vehicle-loan',
    title: 'Vehicle Loan',
    desc: 'New & pre-owned commercial and personal vehicles',
    rate: 'From 8.75% p.a.',
    applyPath: routePaths.loansVehicleLoan,
    tileBg: '#F0F9FF',
    tileBorder: '#BAE6FD',
    icon: <ExecutivePersonIcon />,
  },
  {
    id: 'working-capital',
    title: 'Working Capital',
    desc: 'Cash Credit (CC) & Overdraft (OD) facilities',
    rate: 'From 10.0% p.a.',
    applyPath: routePaths.loansWorkingCapitalLoan,
    tileBg: '#FFFBEB',
    tileBorder: '#FDE68A',
    icon: <BuildingGridIcon />,
  },
  {
    id: 'machinery-loan',
    title: 'Machinery Loan',
    desc: 'Equip your factory or business with modern machinery',
    rate: 'From 11.0% p.a.',
    applyPath: routePaths.loansMachineryLoan,
    tileBg: '#ECFEFF',
    tileBorder: '#A5F3FC',
    icon: <MachineryVehicleIcon />,
  },
  {
    id: 'project-finance',
    title: 'Project Finance',
    desc: 'Custom long-term capital for large infrastructure & projects',
    rate: 'Custom Pricing',
    applyPath: routePaths.loansProjectFinance,
    tileBg: '#EEF2FF',
    tileBorder: '#C7D2FE',
    icon: <ProjectFinanceIcon />,
  },
  {
    id: 'msme-loan',
    title: 'MSME Loan',
    desc: 'Subsidized government-backed schemes (CGTMSE / Mudra)',
    rate: 'From 7.5% p.a.',
    applyPath: routePaths.loansMsmeLoan,
    tileBg: '#FFF7ED',
    tileBorder: '#FFEDD5',
    icon: <MsmeSealIcon />,
  },
]
