import React from 'react'
import { LoanReviewSection } from '../../../../components/LoanReviewSection/LoanReviewSection'
import type { HomeLoanData } from '../../types/homeLoan.types'
import './ReviewAndSubmit.css'

export interface ReviewAndSubmitProps {
  formData: HomeLoanData
  updateFormData: (fields: Partial<HomeLoanData>) => void
  onNavigateToStep: (stepNumber: number) => void
  errors?: Record<string, string>
}

export const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({
  formData,
  updateFormData,
  onNavigateToStep,
  errors = {},
}) => {
  const docCount = Object.keys(formData.uploadedDocs || {}).length

  return (
    <div className="home-loan-review">
      {/* 1. Loan & Property Requirements */}
      <LoanReviewSection
        title="Loan & Property Requirements"
        onEdit={() => onNavigateToStep(1)}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        }
        items={[
          {
            label: 'Requested Amount',
            value: formData.loanAmount
              ? `₹${(Number(String(formData.loanAmount).replace(/\D/g, '')) || 0).toLocaleString('en-IN')}`
              : 'Not specified',
          },
          {
            label: 'Property Intent',
            value: formData.propertyIntent || 'Not specified',
          },
          {
            label: 'Tenure',
            value: formData.repaymentTenureYears
              ? `${formData.repaymentTenureYears} Years (${formData.repaymentTenureYears * 12} Months)`
              : 'Not specified',
          },
          ...(formData.propertyStage ? [{
            label: 'Property Stage',
            value: formData.propertyStage,
          }] : []),
          ...(formData.estimatedPropertyCost ? [{
            label: 'Estimated Property Cost',
            value: formData.estimatedPropertyCost.startsWith('₹')
              ? formData.estimatedPropertyCost
              : `₹${formData.estimatedPropertyCost}`,
          }] : []),
        ]}
      />

      {/* 2. Employment & Income */}
      <LoanReviewSection
        title="Employment & Income Profile"
        onEdit={() => onNavigateToStep(2)}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="7" rx="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        }
        items={[
          {
            label: 'Occupation',
            value: (formData.occupation || '').replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          },
          {
            label: 'Monthly Net Income',
            value: formData.monthlyIncomeRange || 'Not specified',
          },
          {
            label: 'Existing EMIs',
            value: formData.hasExistingEmis
              ? `₹${formData.existingEmiAmount || '0'} / month`
              : 'No Existing EMIs',
          },
        ]}
      />

      {/* 3. Banking & ITR */}
      <LoanReviewSection
        title="Banking & ITR Compliance"
        onEdit={() => onNavigateToStep(3)}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        }
        items={[
          {
            label: 'Operating Bank',
            value: formData.bankName || 'Not specified',
          },
          {
            label: 'IFSC Code',
            value: formData.ifscCode || '—',
          },
          {
            label: 'ITR Status',
            value: formData.itrStatus
              ? `${formData.itrStatus.toUpperCase()}${
                  formData.annualIncomeAsPerItr ? ` (₹${formData.annualIncomeAsPerItr})` : ''
                }`
              : 'Not specified',
          },
        ]}
      />

      {/* 4. Uploaded Documents */}
      <LoanReviewSection
        title={`Uploaded Documents (${docCount})`}
        onEdit={() => onNavigateToStep(4)}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        }
        items={[
          {
            label: 'Documents Attached',
            value: docCount > 0 ? `${docCount} files uploaded` : 'No documents uploaded yet',
          },
        ]}
      />

      {/* Declaration Checkbox */}
      <div className="home-loan-review__declaration">
        <input
          id="home-loan-terms-checkbox"
          type="checkbox"
          className="home-loan-review__checkbox"
          checked={formData.termsAccepted}
          onChange={(e) => updateFormData({ termsAccepted: e.target.checked })}
        />
        <label htmlFor="home-loan-terms-checkbox" className="home-loan-review__label">
          I confirm that all provided details and attached documents are accurate and authentic to the best of my knowledge, and I accept the{' '}
          <span className="home-loan-review__terms-link">Terms &amp; Conditions</span> of the Home Loan application.
        </label>
      </div>
      {errors.termsAccepted && (
        <span className="home-loan-field-error" role="alert">
          {errors.termsAccepted}
        </span>
      )}
    </div>
  )
}

export default ReviewAndSubmit
