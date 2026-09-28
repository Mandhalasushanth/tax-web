// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@core/config/environment', () => ({
  env: {
    appName: 'TaxEdge',
    apiBaseUrl: 'http://localhost:3000',
    enableMocks: true,
    isDev: true,
    isProd: false,
  },
}))

import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach } from 'vitest'
import { Banking } from '../../src/modules/loans/components/BusinessLoan/steps/Banking/Banking'
import { BusinessLoan } from '../../src/modules/loans/components/BusinessLoan/BusinessLoan'
import { validateStep3Banking } from '../../src/modules/loans/validation/businessLoanValidation'
import type { BusinessLoanFormData } from '../../src/modules/loans/types/businessLoan.types'

afterEach(() => {
  cleanup()
})

const DEFAULT_MOCK_DATA: BusinessLoanFormData = {
  employmentProfile: 'business-owner',
  requiredLoanAmount: '2500000-5000000',
  preferredTenureMonths: '36',
  purposeOfLoan: 'Working Capital',
  revenueOrTurnover: '1500000',
  existingLoans: 'none',
  registeredBusinessName: 'Apex Enterprises Pvt Ltd',
  businessConstitution: 'Private Limited',
  gstin: '27ABCDE1234F1Z5',
  hasUdyam: 'no',
  udyamRegistrationNumber: '',
  businessVintage: '3–5 Years',
  annualTurnover: '5000000',
  annualNetProfit: '500000',
  signatoryName: 'Ramesh Kumar',
  signatoryDesignation: 'Director',
  signatoryEmail: 'ramesh@company.com',
  primaryOperatingBankName: '',
  currentAccountNumber: '',
  bankIfscCode: '',
  currentLenderBank: '',
  totalActiveLoanLimit: '',
  itrAcknowledgementNumber: '',
  grossTotalIncomeItr: '',
}

describe('BusinessLoan Step 3 (Banking)', () => {
  it('renders all Step 3 cards, headings, and field inputs', () => {
    const handleChange = vi.fn()

    render(
      <Banking
        data={DEFAULT_MOCK_DATA}
        onChange={handleChange}
        errors={{}}
      />
    )

    // Card 1: Banking & Tax Records
    expect(screen.getByText('Banking & Tax Records')).toBeInTheDocument()
    expect(
      screen.getByText('Provide primary current account details and income tax filing acknowledgment.')
    ).toBeInTheDocument()
    expect(screen.getByText(/Primary Operating Bank Name/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Current Account Number/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Bank IFSC Code/)).toBeInTheDocument()

    // Card 2: Existing Credit Facilities
    expect(screen.getByText('Existing Credit Facilities')).toBeInTheDocument()
    expect(screen.getByText('Current Lender / Bank')).toBeInTheDocument()
    expect(screen.getByLabelText(/Total Active Loan Limit/)).toBeInTheDocument()

    // Card 3: Business Tax Filings
    expect(screen.getByText('Business Tax Filings')).toBeInTheDocument()
    expect(
      screen.getByLabelText(/ITR Acknowledgement Number \(15 Digits\) \(Optional\)/)
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/Gross Total Income as per ITR/)).toBeInTheDocument()
  })

  it('manages custom dropdowns with closed-by-default behavior and selection', () => {
    const handleChange = vi.fn()

    render(
      <Banking
        data={DEFAULT_MOCK_DATA}
        onChange={handleChange}
        errors={{}}
      />
    )

    // Bank dropdown initially closed
    expect(screen.queryByRole('option', { name: 'HDFC Bank' })).not.toBeInTheDocument()
    const bankTrigger = screen.getByTestId('bank-name-dropdown')
    expect(bankTrigger).toHaveAttribute('aria-expanded', 'false')

    // Click to open
    fireEvent.click(bankTrigger)
    expect(bankTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('option', { name: 'HDFC Bank' })).toBeInTheDocument()

    // Select HDFC Bank
    fireEvent.click(screen.getByRole('option', { name: 'HDFC Bank' }))
    expect(handleChange).toHaveBeenCalledWith({ primaryOperatingBankName: 'HDFC Bank' })

    // Current Lender dropdown initially closed
    expect(screen.queryByRole('option', { name: 'Axis Bank (CC/OD)' })).not.toBeInTheDocument()
    const lenderTrigger = screen.getByTestId('current-lender-dropdown')
    expect(lenderTrigger).toHaveAttribute('aria-expanded', 'false')

    // Click to open
    fireEvent.click(lenderTrigger)
    expect(lenderTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('option', { name: 'Axis Bank (CC/OD)' })).toBeInTheDocument()

    // Select Axis Bank
    fireEvent.click(screen.getByRole('option', { name: 'Axis Bank (CC/OD)' }))
    expect(handleChange).toHaveBeenCalledWith({ currentLenderBank: 'Axis Bank (CC/OD)' })
  })

  it('validates Step 3 fields correctly for required and optional formats', () => {
    // 1. Invalid empty data
    const invalidData: BusinessLoanFormData = {
      ...DEFAULT_MOCK_DATA,
      primaryOperatingBankName: '',
      currentAccountNumber: '',
      bankIfscCode: '',
      itrAcknowledgementNumber: '1234', // invalid length
    }

    const res = validateStep3Banking(invalidData)
    expect(res.isValid).toBe(false)
    expect(res.errors.primaryOperatingBankName).toBeDefined()
    expect(res.errors.currentAccountNumber).toBeDefined()
    expect(res.errors.bankIfscCode).toBeDefined()
    expect(res.errors.itrAcknowledgementNumber).toBeDefined()

    // 2. Invalid IFSC code format
    const badIfscData: BusinessLoanFormData = {
      ...DEFAULT_MOCK_DATA,
      primaryOperatingBankName: 'HDFC Bank',
      currentAccountNumber: '50200012345678',
      bankIfscCode: 'INVALIDIFSC',
    }
    const badIfscRes = validateStep3Banking(badIfscData)
    expect(badIfscRes.isValid).toBe(false)
    expect(badIfscRes.errors.bankIfscCode).toBeDefined()

    // 3. Valid Step 3 data
    const validData: BusinessLoanFormData = {
      ...DEFAULT_MOCK_DATA,
      primaryOperatingBankName: 'HDFC Bank',
      currentAccountNumber: '50200012345678',
      bankIfscCode: 'HDFC0001234',
      currentLenderBank: 'Axis Bank (CC/OD)',
      totalActiveLoanLimit: '1500000',
      itrAcknowledgementNumber: '123456789012345',
      grossTotalIncomeItr: '3500000',
    }

    const validRes = validateStep3Banking(validData)
    expect(validRes.isValid).toBe(true)
    expect(Object.keys(validRes.errors)).toHaveLength(0)
  })

  it('allows advancing from Step 1 to Step 2 to Step 3 and navigating back with preserved data', () => {
    render(
      <MemoryRouter>
        <BusinessLoan />
      </MemoryRouter>
    )

    // Complete Step 1 inputs
    fireEvent.change(screen.getByLabelText('Required Loan Amount'), {
      target: { value: '2500000-5000000' },
    })
    fireEvent.change(screen.getByLabelText('Preferred Tenure'), {
      target: { value: '36' },
    })
    fireEvent.change(screen.getByLabelText('Purpose of Loan'), {
      target: { value: 'Working Capital' },
    })
    fireEvent.change(screen.getByLabelText('Monthly or Annual Revenue'), {
      target: { value: '500000' },
    })
    fireEvent.click(screen.getByTestId('employment-option-salaried'))
    fireEvent.click(screen.getByTestId('existing-loan-option-none'))

    // Advance to Step 2
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByText('Enterprise & Commercial Profile')).toBeInTheDocument()

    // Fill Step 2 mandatory fields
    fireEvent.change(screen.getByLabelText(/Registered Business \/ Firm Name/), {
      target: { value: 'Apex Enterprises Pvt Ltd' },
    })
    fireEvent.change(screen.getByLabelText(/^GSTIN/), {
      target: { value: '27ABCDE1234F1Z5' },
    })
    // Select constitution
    fireEvent.click(screen.getByTestId('business-constitution-dropdown'))
    fireEvent.click(screen.getByRole('option', { name: 'Private Limited' }))
    // Toggle Udyam No
    fireEvent.click(screen.getByTestId('udyam-toggle-no'))
    // Select vintage
    fireEvent.click(screen.getByTestId('business-vintage-dropdown'))
    fireEvent.click(screen.getByRole('option', { name: '3–5 Years' }))
    // Fill turnover & profit
    fireEvent.change(screen.getByLabelText(/Annual Turnover/), {
      target: { value: '5000000' },
    })
    fireEvent.change(screen.getByLabelText(/Annual Net Profit/), {
      target: { value: '500000' },
    })
    // Fill signatory details
    fireEvent.change(screen.getByLabelText(/^Name/), {
      target: { value: 'Ramesh Kumar' },
    })
    fireEvent.change(screen.getByLabelText(/^Designation/), {
      target: { value: 'Director' },
    })

    // Advance to Step 3
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByText('Banking & Tax Records')).toBeInTheDocument()

    // Check Stepper status: Step 1 completed, Step 2 completed, Step 3 active
    expect(screen.getByLabelText(/Loan & Applicant \(completed\)/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Business \(completed\)/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Banking \(active\)/)).toBeInTheDocument()

    // Fill Step 3 account number
    fireEvent.change(screen.getByLabelText('Current Account Number'), {
      target: { value: '50200012345678' },
    })

    // Click Back to Step 2
    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(screen.getByText('Enterprise & Commercial Profile')).toBeInTheDocument()

    // Click Continue to return to Step 3
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByText('Banking & Tax Records')).toBeInTheDocument()

    // Account number preserved
    expect(screen.getByLabelText('Current Account Number')).toHaveValue('50200012345678')
  })
})
