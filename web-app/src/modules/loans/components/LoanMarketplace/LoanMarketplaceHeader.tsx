import React from 'react'
import { WalletIcon } from '../../constants/loanMarketplace.constants'
import type { LoanMarketplaceHeaderProps } from '../../types/loanMarketplace.types'

/**
 * Header component for the Loan Marketplace page.
 * Renders the dark blue hero banner with wallet icon and title.
 */
export const LoanMarketplaceHeader: React.FC<LoanMarketplaceHeaderProps> = ({
  eyebrow = 'Capital & Financing',
  title = 'Loan Marketplace & Assistance',
}) => {
  return (
    <div className="loan-marketplace__header-wrapper">
      {/* Hero Header Banner */}
      <section className="loan-marketplace__header-banner">
        <div className="loan-marketplace__header-main">
          <div className="loan-marketplace__wallet-icon-box">
            <WalletIcon />
          </div>

          <div className="loan-marketplace__header-text">
            <span className="loan-marketplace__eyebrow">{eyebrow}</span>
            <h1 className="loan-marketplace__heading">{title}</h1>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LoanMarketplaceHeader
