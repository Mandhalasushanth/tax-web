import React from 'react'
import { routePaths } from '@core/config/routePaths'
import type { LoanMarketplaceItem } from '../types/loanMarketplace.types'

/**
 * 1. Business Loan: Mechanical Gears on Base
 */
export const BusinessGearsIcon: React.FC = () => (
  <svg className="loan-item-card__icon-svg" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <ellipse cx="24" cy="38" rx="16" ry="4" fill="#E2E8F0" />
    <circle cx="21" cy="22" r="10" fill="#94A3B8" />
    <circle cx="21" cy="22" r="5" fill="#F0F4FF" />
    <circle cx="32" cy="16" r="7" fill="#64748B" />
    <circle cx="32" cy="16" r="3.5" fill="#F0F4FF" />
    <path d="M12 36L21 22L32 16" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

/**
 * 2. Personal Loan: Storefront / Personal Finance Facility
 */
export const StorefrontIcon: React.FC = () => (
  <svg className="loan-item-card__icon-svg" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="10" y="22" width="28" height="18" rx="2" fill="#78350F" />
    <path d="M8 14H40L38 22H10L8 14Z" fill="#F59E0B" />
    <path d="M12 14V22M18 14V22M24 14V22M30 14V22M36 14V22" stroke="#FEF3C7" strokeWidth="2" />
    <rect x="20" y="27" width="8" height="13" rx="1" fill="#FEF3C7" />
    <rect x="13" y="27" width="5" height="6" rx="1" fill="#FEF3C7" />
    <rect x="30" y="27" width="5" height="6" rx="1" fill="#FEF3C7" />
  </svg>
)

/**
 * 3. Home Loan: Suburban House with Garden Shrub & Chimney
 */
export const HouseGardenIcon: React.FC = () => (
  <svg className="loan-item-card__icon-svg" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="14" y="22" width="20" height="18" fill="#FDE68A" rx="1" />
    <path d="M10 23L24 12L38 23H10Z" fill="#EA580C" />
    <rect x="29" y="14" width="4" height="6" fill="#9A3412" />
    <rect x="21" y="28" width="6" height="12" fill="#78350F" />
    <circle cx="36" cy="33" r="5" fill="#16A34A" />
    <circle cx="38" cy="31" r="4" fill="#22C55E" />
    <circle cx="12" cy="34" r="3" fill="#15803D" />
  </svg>
)

/**
 * 4. Property Loan: Brick Cottage Villa
 */
export const PropertyVillaIcon: React.FC = () => (
  <svg className="loan-item-card__icon-svg" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path d="M9 22L24 11L39 22H9Z" fill="#92400E" />
    <rect x="13" y="22" width="22" height="17" fill="#FBD5D5" rx="1" />
    <rect x="16" y="25" width="5" height="6" fill="#78350F" rx="0.5" />
    <rect x="27" y="25" width="5" height="6" fill="#78350F" rx="0.5" />
    <rect x="21" y="29" width="6" height="10" fill="#78350F" rx="1" />
  </svg>
)

/**
 * 5. Vehicle Loan: Executive Driver / Automotive Icon
 */
export const ExecutivePersonIcon: React.FC = () => (
  <svg className="loan-item-card__icon-svg" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="16" r="6" fill="#A16207" />
    <path d="M14 36C14 28 18 24 24 24C30 24 34 28 34 36H14Z" fill="#0F172A" />
    <polygon points="24,24 21,32 24,36 27,32" fill="#EA580C" />
    <polygon points="20,24 24,28 28,24" fill="#FFFFFF" />
  </svg>
)

/**
 * 6. Working Capital: High-Rise Building with Grid Windows
 */
export const BuildingGridIcon: React.FC = () => (
  <svg className="loan-item-card__icon-svg" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="14" y="10" width="20" height="30" rx="2" fill="#D97706" />
    <rect x="17" y="14" width="3" height="4" fill="#FEF3C7" />
    <rect x="23" y="14" width="3" height="4" fill="#FEF3C7" />
    <rect x="28" y="14" width="3" height="4" fill="#FEF3C7" />
    <rect x="17" y="21" width="3" height="4" fill="#FEF3C7" />
    <rect x="23" y="21" width="3" height="4" fill="#FEF3C7" />
    <rect x="28" y="21" width="3" height="4" fill="#FEF3C7" />
    <rect x="17" y="28" width="3" height="4" fill="#FEF3C7" />
    <rect x="23" y="28" width="3" height="4" fill="#FEF3C7" />
    <rect x="28" y="28" width="3" height="4" fill="#FEF3C7" />
  </svg>
)

/**
 * 7. Machinery Loan: Industrial Equipment / Vehicle
 */
export const MachineryVehicleIcon: React.FC = () => (
  <svg className="loan-item-card__icon-svg" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path d="M10 26H22V16H14L10 26Z" fill="#0E7490" />
    <rect x="22" y="20" width="16" height="12" rx="1" fill="#0891B2" />
    <circle cx="16" cy="34" r="4" fill="#334155" />
    <circle cx="32" cy="34" r="4" fill="#334155" />
    <circle cx="16" cy="34" r="1.5" fill="#E2E8F0" />
    <circle cx="32" cy="34" r="1.5" fill="#E2E8F0" />
  </svg>
)

/**
 * 8. Project Finance: Blueprint / Architecture Project
 */
export const ProjectFinanceIcon: React.FC = () => (
  <svg className="loan-item-card__icon-svg" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="12" y="12" width="24" height="24" rx="4" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M16 32L24 16L32 32" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="18" y1="28" x2="30" y2="28" stroke="#4F46E5" strokeWidth="2" />
  </svg>
)

/**
 * 9. MSME Loan: Government Seal / Badge
 */
export const MsmeSealIcon: React.FC = () => (
  <svg className="loan-item-card__icon-svg" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="22" r="11" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
    <polygon points="24,15 26,19 30,20 27,23 28,27 24,25 20,27 21,23 18,20 22,19" fill="#D97706" />
    <path d="M19 31L16 40L24 36L32 40L29 31" fill="#B45309" />
  </svg>
)

/**
 * Header Wallet Icon
 */
export const WalletIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  </svg>
)

/**
 * Back Chevron Icon
 */
export const BackChevronIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

/**
 * Right Navigation Chevron Icon
 */
export const RightChevronIcon: React.FC = () => (
  <svg className="loan-item-card__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
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
