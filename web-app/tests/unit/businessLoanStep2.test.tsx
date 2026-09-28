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
import { BusinessDetails } from '../../src/modules/loans/components/BusinessLoan/steps/BusinessDetails/BusinessDetails'
import { BusinessLoan } from '../../src/modules/loans/components/BusinessLoan/BusinessLoan'
import { validateStep2BusinessDetails } from '../../src/modules/loans/validation/businessLoanValidation'
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
  registeredBusinessName: '',
  businessConstitution: '',
  gstin: '',
  hasUdyam: 'yes',
  udyamRegistrationNumber: '',
  businessVintage: '',
  annualTurnover: '',
  annualNetProfit: '',
  signatoryName: '',
  signatoryDesignation: '',
  signatoryEmail: '',
}

describe('BusinessLoan Step 2 (Business Details)', () => {
  it('renders all Step 2 fields, headings, and helper texts', () => {
    const handleChange = vi.fn()

    render(
      <BusinessDetails
        data={DEFAULT_MOCK_DATA}
        onChange={handleChange}
        errors={{}}
      />
    )

    // Header
    expect(screen.getByText('Enterprise & Commercial Profile')).toBeInTheDocument()
    expect(
      screen.getByText("Provide your firm's registration credentials and key business information.")
    ).toBeInTheDocument()

    // Field Labels
    expect(screen.getByLabelText(/Registered Business \/ Firm Name/)).toBeInTheDocument()
    expect(screen.getByText(/Business Constitution \/ Type/)).toBeInTheDocument()
    expect(screen.getByLabelText(/^GSTIN/)).toBeInTheDocument()
    expect(screen.getByText(/15-character Goods & Services Tax Number/)).toBeInTheDocument()
    expect(screen.getByText(/Udyam Registration Number \(MSME\)/)).toBeInTheDocument()
    expect(screen.getByText(/Business Vintage \(Years in Operation\)/)).toBeInTheDocument()

    expect(screen.getByLabelText(/Annual Turnover \(FY 2024–25 \/ Latest\)/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Annual Net Profit \(After Tax\)/)).toBeInTheDocument()
    expect(screen.getByText(/Authorized Signatory Details/)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Name/)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Designation/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email \(Optional\)/)).toBeInTheDocument()
  })

  it('manages custom dropdowns with closed-by-default behavior and selection', () => {
    const handleChange = vi.fn()

    render(
      <BusinessDetails
        data={DEFAULT_MOCK_DATA}
        onChange={handleChange}
        errors={{}}
      />
    )

    // Constitution dropdown initially closed
    expect(screen.queryByRole('option', { name: 'Private Limited' })).not.toBeInTheDocument()

    const constitutionTrigger = screen.getByTestId('business-constitution-dropdown')
    expect(constitutionTrigger).toHaveAttribute('aria-expanded', 'false')

    // Click to open
    fireEvent.click(constitutionTrigger)
    expect(constitutionTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('option', { name: 'Private Limited' })).toBeInTheDocument()

    // Select option
    fireEvent.click(screen.getByRole('option', { name: 'Private Limited' }))
    expect(handleChange).toHaveBeenCalledWith({ businessConstitution: 'Private Limited' })

    // Vintage dropdown initially closed
    expect(screen.queryByRole('option', { name: '3–5 Years' })).not.toBeInTheDocument()
    const vintageTrigger = screen.getByTestId('business-vintage-dropdown')
    expect(vintageTrigger).toHaveAttribute('aria-expanded', 'false')

    // Click to open
    fireEvent.click(vintageTrigger)
    expect(vintageTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('option', { name: '3–5 Years' })).toBeInTheDocument()

    // Select option
    fireEvent.click(screen.getByRole('option', { name: '3–5 Years' }))
    expect(handleChange).toHaveBeenCalledWith({ businessVintage: '3–5 Years' })
  })

  it('toggles Udyam Registration input visibility with Yes and No selection', () => {
    const handleChange = vi.fn()

    const { rerender } = render(
      <BusinessDetails
        data={{ ...DEFAULT_MOCK_DATA, hasUdyam: 'yes' }}
        onChange={handleChange}
        errors={{}}
      />
    )

    // When Yes: input is visible
    expect(screen.getByLabelText('Udyam Registration Number')).toBeInTheDocument()

    // Click No button
    const noBtn = screen.getByTestId('udyam-toggle-no')
    fireEvent.click(noBtn)
    expect(handleChange).toHaveBeenCalledWith({ hasUdyam: 'no' })

    // When No: input is hidden
    rerender(
      <BusinessDetails
        data={{ ...DEFAULT_MOCK_DATA, hasUdyam: 'no' }}
        onChange={handleChange}
        errors={{}}
      />
    )
    expect(screen.queryByLabelText('Udyam Registration Number')).not.toBeInTheDocument()
  })

  it('validates Step 2 fields correctly and handles validation rules', () => {
    const invalidData: BusinessLoanFormData = {
      ...DEFAULT_MOCK_DATA,
      registeredBusinessName: '',
      businessConstitution: '',
      gstin: 'invalid-gst',
      hasUdyam: 'yes',
      udyamRegistrationNumber: '',
      businessVintage: '',
      annualTurnover: '',
      annualNetProfit: '',
      signatoryName: '',
      signatoryDesignation: '',
    }

    const res = validateStep2BusinessDetails(invalidData)
    expect(res.isValid).toBe(false)
    expect(res.errors.registeredBusinessName).toBeDefined()
    expect(res.errors.businessConstitution).toBeDefined()
    expect(res.errors.gstin).toBeDefined()
    expect(res.errors.udyamRegistrationNumber).toBeDefined()
    expect(res.errors.businessVintage).toBeDefined()
    expect(res.errors.annualTurnover).toBeDefined()
    expect(res.errors.annualNetProfit).toBeDefined()
    expect(res.errors.signatoryName).toBeDefined()
    expect(res.errors.signatoryDesignation).toBeDefined()

    // Test with No Udyam and valid data
    const validData: BusinessLoanFormData = {
      ...DEFAULT_MOCK_DATA,
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
    }

    const validRes = validateStep2BusinessDetails(validData)
    expect(validRes.isValid).toBe(true)
    expect(Object.keys(validRes.errors)).toHaveLength(0)
  })

  it('allows advancing from Step 1 to Step 2 and navigating back with preserved data', () => {
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

    // Click Continue
    const continueBtn = screen.getByRole('button', { name: /continue/i })
    fireEvent.click(continueBtn)

    // Now on Step 2
    expect(screen.getByText('Enterprise & Commercial Profile')).toBeInTheDocument()

    // Step 1 stepper is completed (navy blue)
    const step1Btn = screen.getByLabelText(/Loan & Applicant \(completed\)/)
    expect(step1Btn).toBeInTheDocument()

    // Step 2 stepper is active
    const step2Btn = screen.getByLabelText(/Business \(active\)/)
    expect(step2Btn).toBeInTheDocument()

    // Fill in business name
    fireEvent.change(screen.getByLabelText(/Registered Business \/ Firm Name/), {
      target: { value: 'Apex Enterprises Pvt Ltd' },
    })

    // Click Back button
    const backBtn = screen.getByRole('button', { name: 'Back' })
    fireEvent.click(backBtn)

    // Returned to Step 1
    expect(screen.getByText('Applicant Identity Details')).toBeInTheDocument()

    // Click Continue to return to Step 2
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByText('Enterprise & Commercial Profile')).toBeInTheDocument()

    // Business name preserved
    expect(screen.getByLabelText(/Registered Business \/ Firm Name/)).toHaveValue(
      'Apex Enterprises Pvt Ltd'
    )
  })
})
