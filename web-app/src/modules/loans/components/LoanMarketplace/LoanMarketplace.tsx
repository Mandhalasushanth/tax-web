import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoanMarketplaceHeader } from './LoanMarketplaceHeader'
import { LoanMarketplaceCard } from './LoanMarketplaceCard'
import { LOAN_MARKETPLACE_ITEMS } from '../../constants/loanMarketplace.constants'
import { safeNavigateTo, isValidLoanMarketplaceItem } from '../../utils/loanMarketplace.utils'
import type { LoanMarketplaceItem } from '../../types/loanMarketplace.types'
import './LoanMarketplace.css'

/**
 * Main orchestrator component for the Loan Marketplace page.
 * Implements advanced modular architecture, strict functional separation,
 * and robust exception handling.
 */
export const LoanMarketplace: React.FC = () => {
  const navigate = useNavigate()

  /**
   * Safe item selection handler with exception handling.
   */
  const handleLoanSelect = useCallback(
    (item: LoanMarketplaceItem): void => {
      try {
        if (!isValidLoanMarketplaceItem(item)) {
          console.warn('[LoanMarketplace] Attempted to navigate with invalid loan item:', item)
          return
        }
        safeNavigateTo(navigate, item.applyPath, '/loans')
      } catch (err) {
        console.error('[LoanMarketplace] Unexpected error in handleLoanSelect:', err)
        safeNavigateTo(navigate, '/loans')
      }
    },
    [navigate]
  )

  /**
   * Filters and validates items with error containment.
   */
  const validLoanItems = useMemo((): LoanMarketplaceItem[] => {
    try {
      return LOAN_MARKETPLACE_ITEMS.filter((item) => isValidLoanMarketplaceItem(item))
    } catch (err) {
      console.error('[LoanMarketplace] Error while filtering loan items:', err)
      return []
    }
  }, [])

  return (
    <div className="loan-marketplace" data-testid="loan-marketplace-container">
      {/* Sticky Top Section Header Banner */}
      <LoanMarketplaceHeader />

      {/* Loan Catalog List */}
      <main className="loan-marketplace__list" role="feed" aria-label="Available loan products">
        {validLoanItems.map((item) => (
          <LoanMarketplaceCard
            key={item.id}
            item={item}
            onSelect={handleLoanSelect}
          />
        ))}
      </main>
    </div>
  )
}

export default LoanMarketplace
