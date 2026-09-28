import React from 'react'
import type { BankingProps } from '../../../../types/businessLoan.types'
import { BankingTaxRecordsCard } from './BankingTaxRecordsCard'
import { ExistingCreditFacilitiesCard } from './ExistingCreditFacilitiesCard'
import { BusinessTaxFilingsCard } from './BusinessTaxFilingsCard'
import './Banking.css'

/**
 * Step 3: Banking & Tax Records Component
 * Strictly functional, loop-free, and modular.
 */
export const Banking: React.FC<BankingProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  return (
    <div className="business-banking-step" data-testid="step-business-banking">
      {/* 1. Banking & Tax Records Section */}
      <BankingTaxRecordsCard data={data} onChange={onChange} errors={errors} />

      {/* 2. Existing Credit Facilities Section */}
      <ExistingCreditFacilitiesCard data={data} onChange={onChange} errors={errors} />

      {/* 3. Business Tax Filings Section */}
      <BusinessTaxFilingsCard data={data} onChange={onChange} errors={errors} />
    </div>
  )
}

export default Banking
