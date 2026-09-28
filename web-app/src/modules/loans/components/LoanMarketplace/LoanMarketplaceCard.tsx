import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RightChevronIcon } from '../../constants/loanMarketplace.constants'
import { safeNavigateTo, buildLoanCardAriaLabel } from '../../utils/loanMarketplace.utils'
import type { LoanMarketplaceCardProps } from '../../types/loanMarketplace.types'

/**
 * Pure, reusable card component representing an individual loan product in the marketplace.
 */
export const LoanMarketplaceCard: React.FC<LoanMarketplaceCardProps> = ({ item, onSelect }) => {
  const navigate = useNavigate()

  /**
   * Safely handles card selection and navigation.
   */
  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    try {
      if (typeof onSelect === 'function') {
        e.preventDefault()
        onSelect(item)
      } else {
        // Allow default link behavior or fall back to safe navigation if default fails
      }
    } catch (err) {
      e.preventDefault()
      console.error(`[LoanMarketplaceCard] Exception while handling click on loan: ${item.id}`, err)
      safeNavigateTo(navigate, item.applyPath, '/loans')
    }
  }

  const ariaLabel = buildLoanCardAriaLabel(item.title, item.rate, item.desc)

  return (
    <a
      href={item.applyPath}
      onClick={handleCardClick}
      className="loan-item-card"
      aria-label={ariaLabel}
      data-testid={`loan-card-${item.id}`}
    >
      <div className="loan-item-card__left">
        <div
          className="loan-item-card__icon-tile"
          style={{
            backgroundColor: item.tileBg,
            borderColor: item.tileBorder,
          }}
        >
          {item.icon}
        </div>
        <div className="loan-item-card__info">
          <h2 className="loan-item-card__title">{item.title}</h2>
          <p className="loan-item-card__desc">{item.desc}</p>
        </div>
      </div>

      <div className="loan-item-card__right">
        <span className="loan-item-card__rate">{item.rate}</span>
        <RightChevronIcon />
      </div>
    </a>
  )
}

export default LoanMarketplaceCard
