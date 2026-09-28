import type { NavigateFunction } from 'react-router-dom'
import type { LoanMarketplaceItem } from '../types/loanMarketplace.types'

/**
 * Safely navigates to a specified path or step using React Router,
 * with comprehensive exception handling and fallback recovery.
 *
 * @param navigate - React Router navigate function
 * @param destination - Target route path or step delta number
 * @param fallback - Optional fallback path if initial navigation throws
 */
export function safeNavigateTo(
  navigate: NavigateFunction,
  destination: string | number,
  fallback: string = '/loans'
): void {
  try {
    if (typeof destination === 'number') {
      navigate(destination)
    } else if (typeof destination === 'string' && destination.trim().length > 0) {
      navigate(destination)
    } else {
      console.warn('[LoanMarketplace] Empty destination path provided, navigating to fallback:', fallback)
      navigate(fallback)
    }
  } catch (error) {
    console.error('[LoanMarketplace] Navigation failure encountered:', error)
    try {
      navigate(fallback)
    } catch (fallbackError) {
      console.error('[LoanMarketplace] Critical fallback navigation failure:', fallbackError)
    }
  }
}

/**
 * Validates whether an object adheres to the required LoanMarketplaceItem shape.
 * Prevents runtime errors when processing dynamic loan items.
 */
export function isValidLoanMarketplaceItem(item: unknown): item is LoanMarketplaceItem {
  try {
    if (!item || typeof item !== 'object') {
      return false
    }
    const candidate = item as Partial<LoanMarketplaceItem>
    return (
      typeof candidate.id === 'string' &&
      typeof candidate.title === 'string' &&
      typeof candidate.applyPath === 'string' &&
      typeof candidate.rate === 'string'
    )
  } catch (error) {
    console.error('[LoanMarketplace] Validation error occurred:', error)
    return false
  }
}

/**
 * Generates an accessible ARIA label for screen readers.
 */
export function buildLoanCardAriaLabel(title: string, rate: string, desc: string): string {
  try {
    return `${title}, starting from ${rate}. ${desc}`
  } catch {
    return title
  }
}
