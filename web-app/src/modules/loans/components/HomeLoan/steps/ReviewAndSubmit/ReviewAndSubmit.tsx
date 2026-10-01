import React from 'react'
import { LoanReviewSection } from '@modules/loans/shared'
import type { HomeLoanData } from '@modules/loans/types/homeLoan.types'
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

  const renderRequirementsReview = () => (
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
          value:
            formData.propertyIntent === 'Others' && formData.customPropertyIntent
              ? `Others (${formData.customPropertyIntent})`
              : formData.propertyIntent || 'Not specified',
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
  )

  const renderEmploymentReview = () => (
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
          value:
            formData.monthlyIncomeRange?.startsWith('Other') && formData.exactMonthlyIncome
              ? `₹${formData.exactMonthlyIncome}`
              : formData.monthlyIncomeRange || 'Not specified',
        },
        {
          label: 'Existing EMIs',
          value: formData.hasExistingEmis
            ? `₹${formData.existingEmiAmount || '0'} / month`
            : 'No Existing EMIs',
        },
      ]}
    />
  )

  const renderBankingReview = () => (
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
  )

  const renderDocumentsReview = () => (
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
  )

  const renderDeclaration = () => (
    <>
      <div
        className={`home-loan-review__declaration ${
          errors.termsAccepted ? 'home-loan-review__declaration--error' : ''
        }`}
      >
        <input
          id="home-loan-terms-checkbox"
          type="checkbox"
          className="home-loan-review__checkbox"
          checked={Boolean(formData.termsAccepted)}
          onChange={(e) => updateFormData({ termsAccepted: e.target.checked })}
        />
        <label htmlFor="home-loan-terms-checkbox" className="home-loan-review__label">
          I authorize TaxEdge to evaluate my credit report and share my property purchase details and income proof with partner housing finance institutes for home loan underwriting.
        </label>
      </div>
      {errors.termsAccepted && (
        <span className="home-loan-field-error" role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {errors.termsAccepted}
        </span>
      )}
    </>
  )

  return (
    <div className="home-loan-review">
      {renderRequirementsReview()}
      {renderEmploymentReview()}
      {renderBankingReview()}
      {renderDocumentsReview()}
      {renderDeclaration()}
    </div>
  )
}

export default ReviewAndSubmit
