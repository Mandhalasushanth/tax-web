import React from 'react'
import type { BusinessDetailsProps } from '../../../../types/businessLoan.types'
import { BusinessEnterpriseCard } from './BusinessEnterpriseCard'
import { BusinessFinancialsCard } from './BusinessFinancialsCard'
import { BusinessRegistrationCard } from './BusinessRegistrationCard'
import { AuthorizedSignatoryCard } from './AuthorizedSignatoryCard'
import './BusinessDetails.css'

/**
 * Step 2: Business Details Component
 * Strictly functional, loop-free, and modular.
 */
export const BusinessDetails: React.FC<BusinessDetailsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  return (
    <div className="business-details-step" data-testid="step-business-details">
      {/* 1. Header Section */}
      <div className="business-details-header">
        <h2 className="business-details-title">Enterprise &amp; Commercial Profile</h2>
        <p className="business-details-subtitle">
          Provide your firm&apos;s registration credentials and key business information.
        </p>
      </div>

      {/* 2. Form Layout (2 Columns): Enterprise & Registration */}
      <div className="business-details-grid">
        {/* Left Column: Firm Name, GSTIN, Vintage */}
        <div className="business-details-column">
          <BusinessEnterpriseCard data={data} onChange={onChange} errors={errors} />
        </div>

        {/* Right Column: Business Constitution, Udyam Registration, Authorized Signatory Details */}
        <div className="business-details-column">
          <BusinessRegistrationCard data={data} onChange={onChange} errors={errors} />
          <AuthorizedSignatoryCard data={data} onChange={onChange} errors={errors} />
        </div>
      </div>

      {/* 3. Financials: Turnover & Profit side-by-side across FULL WIDTH */}
      <BusinessFinancialsCard data={data} onChange={onChange} errors={errors} />
    </div>
  )
}

export default BusinessDetails
