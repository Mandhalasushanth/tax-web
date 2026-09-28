import React from 'react'
import { LoanReviewSection } from '../../../../components/LoanReviewSection/LoanReviewSection'
import type { VehicleLoanData } from '../../../../types/vehicleLoan.types'
import './ReviewAndDeclaration.css'

export interface ReviewAndDeclarationProps {
  data: VehicleLoanData
  onChange: (fields: Partial<VehicleLoanData>) => void
  onNavigateToStep: (stepNumber: number) => void
  errors?: Record<string, string>
}

export const ReviewAndDeclaration: React.FC<ReviewAndDeclarationProps> = ({
  data,
  onChange,
  onNavigateToStep,
  errors = {},
}) => {
  const maskedAccountNumber = data.accountNumber
    ? data.accountNumber.length > 4
      ? `XXXXXX${data.accountNumber.slice(-4)}`
      : data.accountNumber
    : 'Not specified'

  const uploadedDocCount = Object.keys(data.uploadedDocs || {}).length

  return (
    <div className="vehicle-review-step">
      <div className="vehicle-loan-section-heading">
        <h3 className="vehicle-loan-section-heading__title">Vehicle Loan Dossier Review</h3>
        <p className="vehicle-loan-section-heading__desc">
          Review vehicle requirements, employment & income profile, disbursement banking, and document uploads.
        </p>
      </div>

      <div className="vehicle-loan-review-group">
        {/* Step 1: Vehicle & Loan Requirements Review */}
        <LoanReviewSection
          title="Vehicle & Loan Requirements"
          onEdit={() => onNavigateToStep(1)}
          items={[
            {
              label: 'Loan Amount',
              value: data.loanAmount
                ? `₹${(Number(String(data.loanAmount).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}`
                : 'Not specified',
            },
            { label: 'Category', value: data.vehicleCategory || 'Not specified' },
            { label: 'Condition', value: data.vehicleCondition || 'Not specified' },
            {
              label: 'Make & Model',
              value: data.vehicleMakeModel === 'Other (Specify Custom Vehicle Model)'
                ? data.customVehicleMakeModel || 'Custom Vehicle'
                : data.vehicleMakeModel || 'Not specified',
            },
            {
              label: 'On-Road Price',
              value: data.onRoadPrice
                ? `₹${(Number(String(data.onRoadPrice).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}`
                : 'Not specified',
            },
            {
              label: 'Down Payment',
              value: data.downPayment
                ? `₹${(Number(String(data.downPayment).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}`
                : 'Not specified',
            },
            { label: 'Tenure', value: data.repaymentTenure || 'Not specified' },
          ]}
        />

        {/* Step 2: Employment & Income Review */}
        <LoanReviewSection
          title="Employment & Income"
          onEdit={() => onNavigateToStep(2)}
          items={[
            { label: 'Occupation', value: data.occupationType || 'Not specified' },
            {
              label: 'Monthly Net Income',
              value: data.monthlyIncomeRange || 'Not specified',
            },
            ...(data.occupationType === 'Business Owner' || data.occupationType === 'Self-Employed Pro'
              ? [
                  { label: 'Business Name', value: data.legalBusinessName || 'Not specified' },
                  ...(data.gstin ? [{ label: 'GSTIN', value: data.gstin }] : []),
                  ...(data.udyamNumber ? [{ label: 'Udyam No.', value: data.udyamNumber }] : []),
                  { label: 'Vintage', value: data.businessVintageYears ? `${data.businessVintageYears} Years` : 'Not specified' },
                  {
                    label: 'Turnover',
                    value: data.annualTurnover
                      ? `₹${(Number(String(data.annualTurnover).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}`
                      : 'Not specified',
                  },
                ]
              : []),
            {
              label: 'Existing EMIs',
              value: data.hasActiveEmis
                ? `Active (₹${(Number(String(data.totalMonthlyEmi).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}/mo)`
                : 'No Other EMIs',
            },
          ]}
        />

        {/* Step 3: Banking & ITR Review */}
        <LoanReviewSection
          title="Disbursement Banking & ITR"
          onEdit={() => onNavigateToStep(3)}
          items={[
            { label: 'Bank Name', value: data.bankName || 'Not specified' },
            { label: 'Account Number', value: maskedAccountNumber },
            { label: 'IFSC Code', value: data.ifscCode || '—' },
            { label: 'ITR Status', value: data.itrStatus || 'Not specified' },
            ...(data.itrStatus === 'Filed'
              ? [
                  ...(data.itrAckNumber ? [{ label: 'ITR Ack Number', value: data.itrAckNumber }] : []),
                  {
                    label: 'Gross Annual Income',
                    value: data.grossAnnualIncomeItr
                      ? `₹${(Number(String(data.grossAnnualIncomeItr).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}`
                      : 'Not specified',
                  },
                ]
              : []),
          ]}
        />

        {/* Step 4: Documents Upload Summary */}
        <LoanReviewSection
          title="Document Dossier"
          onEdit={() => onNavigateToStep(4)}
          items={[
            { label: 'Attached Documents', value: `${uploadedDocCount} Files Uploaded` },
          ]}
        />
      </div>

      {/* 3. Authorization Declaration */}
      <div className="vehicle-review__declaration">
        <input
          id="vehicle-loan-terms-checkbox"
          type="checkbox"
          className="vehicle-review__checkbox"
          checked={data.termsAccepted}
          onChange={(e) => onChange({ termsAccepted: e.target.checked })}
        />
        <label htmlFor="vehicle-loan-terms-checkbox" className="vehicle-review__label">
          I authorize TaxEdge and its lending partners to check credit bureau scores (CIBIL/Experian), verify my vehicle documentation, and process this Vehicle Loan application.
        </label>
      </div>
      {errors.termsAccepted && (
        <span className="vehicle-field-error" role="alert">
          {errors.termsAccepted}
        </span>
      )}
    </div>
  )
}

export default ReviewAndDeclaration
