import React from 'react'
import { Link } from 'react-router-dom'
import './LoanMarketplace.css'

interface LoanMarketItem {
  id: string
  title: string
  desc: string
  rate: string
  applyPath: string
  tileBg: string
  tileBorder: string
  icon: React.ReactNode
}

// 3. Home Loan: Suburban House with Garden Shrub & Chimney
const HouseGardenIcon = () => (
  <svg className="loan-item-card__icon-svg" viewBox="0 0 48 48" fill="none">
    <rect x="14" y="22" width="20" height="18" fill="#FDE68A" rx="1" />
    <path d="M10 23L24 12L38 23H10Z" fill="#EA580C" />
    <rect x="29" y="14" width="4" height="6" fill="#9A3412" />
    <rect x="21" y="28" width="6" height="12" fill="#78350F" />
    <circle cx="36" cy="33" r="5" fill="#16A34A" />
    <circle cx="38" cy="31" r="4" fill="#22C55E" />
    <circle cx="12" cy="34" r="3" fill="#15803D" />
  </svg>
)

// Wallet Header Icon
const WalletIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  </svg>
)

const LOAN_ITEMS: LoanMarketItem[] = [
  {
    id: 'home-loan',
    title: 'Home Loan',
    desc: 'Lowest interest rate for home purchase & renovation',
    rate: 'From 8.4% p.a.',
    applyPath: '/loans/home-loan',
    tileBg: '#F0FDF4',
    tileBorder: '#BBF7D0',
    icon: <HouseGardenIcon />,
  },
]

export const LoanMarketplace: React.FC = () => {
  return (
    <div className="loan-marketplace">
      {/* Sticky Top Section Header Banner */}
      <div className="loan-marketplace__header-wrapper">
        <section className="loan-marketplace__header-banner">
          <div className="loan-marketplace__header-main">
            <div className="loan-marketplace__wallet-icon-box">
              <WalletIcon />
            </div>

            <div className="loan-marketplace__header-text">
              <span className="loan-marketplace__eyebrow">Capital &amp; Financing</span>
              <h1 className="loan-marketplace__heading">Loan Marketplace &amp; Assistance</h1>
            </div>
          </div>
        </section>
      </div>

      {/* Loan List (One row per loan type) */}
      <div className="loan-marketplace__list">
        {LOAN_ITEMS.map((item) => (
          <Link
            key={item.id}
            to={item.applyPath}
            className="loan-item-card"
          >
            <div className="loan-item-card__left">
              <div className="loan-item-card__icon-tile loan-item-card__icon-tile--green">
                {item.icon}
              </div>
              <div className="loan-item-card__info">
                <h2 className="loan-item-card__title">{item.title}</h2>
                <p className="loan-item-card__desc">{item.desc}</p>
              </div>
            </div>

            <div className="loan-item-card__right">
              <span className="loan-item-card__rate">{item.rate}</span>
              <svg className="loan-item-card__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LoanMarketplace
