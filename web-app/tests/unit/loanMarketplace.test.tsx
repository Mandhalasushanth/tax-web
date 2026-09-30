// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LoanMarketplace } from '../../src/modules/loans/components/LoanMarketplace/LoanMarketplace'
import { LOAN_MARKETPLACE_ITEMS } from '../../src/modules/loans/constants/loanMarketplace.constants'
import {
  safeNavigateTo,
  isValidLoanMarketplaceItem,
  buildLoanCardAriaLabel,
} from '../../src/modules/loans/utils/loanMarketplace.utils'

describe('LoanMarketplace Module', () => {
  it('contains exactly 7 loans in the marketplace catalog matching the specification', () => {
    expect(LOAN_MARKETPLACE_ITEMS).toHaveLength(7)

    const expectedOrder = [
      { id: 'business-loan', title: 'Business Loan', rate: 'From 12% p.a.' },
      { id: 'home-loan', title: 'Home Loan', rate: 'From 8.4% p.a.' },
      { id: 'vehicle-loan', title: 'Vehicle Loan', rate: 'From 8.75% p.a.' },
      { id: 'working-capital', title: 'Working Capital', rate: 'From 10.0% p.a.' },
      { id: 'machinery-loan', title: 'Machinery Loan', rate: 'From 11.0% p.a.' },
      { id: 'project-finance', title: 'Project Finance', rate: 'Custom Pricing' },
      { id: 'msme-loan', title: 'MSME Loan', rate: 'From 7.5% p.a.' },
    ]

    expectedOrder.forEach((expected, index) => {
      const item = LOAN_MARKETPLACE_ITEMS[index]
      expect(item.id).toBe(expected.id)
      expect(item.title).toBe(expected.title)
      expect(item.rate).toBe(expected.rate)
    })
  })

  it('renders all 7 loan cards and header inside LoanMarketplace', () => {
    render(
      <MemoryRouter>
        <LoanMarketplace />
      </MemoryRouter>
    )

    expect(screen.getByText('Capital & Financing')).toBeInTheDocument()
    expect(screen.getByText('Loan Marketplace & Assistance')).toBeInTheDocument()

    // Verify all 7 loan titles are rendered
    expect(screen.getByText('Business Loan')).toBeInTheDocument()
    expect(screen.getByText('Home Loan')).toBeInTheDocument()
    expect(screen.getByText('Vehicle Loan')).toBeInTheDocument()
    expect(screen.getByText('Working Capital')).toBeInTheDocument()
    expect(screen.getByText('Machinery Loan')).toBeInTheDocument()
    expect(screen.getByText('Project Finance')).toBeInTheDocument()
    expect(screen.getByText('MSME Loan')).toBeInTheDocument()

    // Verify all rates are displayed
    expect(screen.getByText('From 12% p.a.')).toBeInTheDocument()
    expect(screen.getByText('Custom Pricing')).toBeInTheDocument()
    expect(screen.getByText('From 7.5% p.a.')).toBeInTheDocument()
  })

  it('safely handles exception during navigation in safeNavigateTo', () => {
    const faultyNavigate = vi.fn().mockImplementationOnce(() => {
      throw new Error('Navigation failed')
    })

    // Should catch the exception and try fallback
    expect(() => safeNavigateTo(faultyNavigate, '/test-path', '/loans')).not.toThrow()
    expect(faultyNavigate).toHaveBeenCalledTimes(2)
  })

  it('validates loan items safely with isValidLoanMarketplaceItem', () => {
    expect(isValidLoanMarketplaceItem(LOAN_MARKETPLACE_ITEMS[0])).toBe(true)
    expect(isValidLoanMarketplaceItem(null)).toBe(false)
    expect(isValidLoanMarketplaceItem(undefined)).toBe(false)
    expect(isValidLoanMarketplaceItem({})).toBe(false)
    expect(isValidLoanMarketplaceItem({ id: '1' })).toBe(false)
  })

  it('builds accessible ARIA labels with buildLoanCardAriaLabel', () => {
    const label = buildLoanCardAriaLabel('Business Loan', 'From 12% p.a.', 'Unsecured capital')
    expect(label).toBe('Business Loan, starting from From 12% p.a.. Unsecured capital')
  })
})
