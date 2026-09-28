import React from 'react'
import type { ReviewAndSubmitProps } from '../../../../types/businessLoan.types'
import { ReviewSectionCard } from './ReviewSectionCard'
import './ReviewAndSubmit.css'

const PURPOSE_MAP: Record<string, string> = {
  'working-capital': 'Working Capital & Inventory',
  'expansion': 'Business Expansion',
  'equipment': 'Machinery & Equipment',
  'debt-consolidation': 'Debt Consolidation',
  'infrastructure': 'Premises & Infrastructure',
}

/**
 * Pure helper to format Indian currency with standard numbering notation (Pure functional)
 */
function formatIndianCurrency(val?: string): string {
  const digits = val ? val.replace(/\D/g, '') : ''
  return !val || !digits ? '—' : `₹${Number(digits).toLocaleString('en-IN')}`
}

/**
 * Pure helper to mask current account number (Pure functional)
 */
function maskAccountNumber(acc?: string): string {
  const clean = acc ? acc.trim() : ''
  return !clean ? '—' : clean.length <= 4 ? clean : `XXXXXX${clean.slice(-4)}`
}

/**
 * Formats loan purpose to user-friendly display string (Pure functional)
 */
function formatPurpose(purpose?: string): string {
  return !purpose ? '—' : PURPOSE_MAP[purpose] || purpose
}

/**
 * Formats vintage to display representation matching screenshot (Pure functional)
 */
function formatVintage(vintage?: string): string {
  return !vintage ? '—' : `${vintage} Years`
}

/**
 * Reusable Row Component for Key-Value display with colon alignment
 */
const ReviewRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="review-row">
    <span className="review-label">{label}</span>
    <span className="review-colon">:</span>
    <span className="review-value">{value}</span>
  </div>
)

/**
 * Reusable Document Pill Component matching screenshot
 */
const DocumentPill: React.FC<{ label: string }> = ({ label }) => (
  <span className="review-doc-pill">
    <img
      src="/assets/icons/loans/doc-green.svg"
      alt=""
      width="14"
      height="14"
      className="review-doc-pill__icon"
      aria-hidden="true"
    />
    <span className="review-doc-pill__text">{label}</span>
  </span>
)

/**
 * Business Loan Step 5: Review & Submit Component
 * Displays applicant profile, loan details, business details, banking records,
 * and uploaded document badges exactly as shown in the screenshot.
 * Strictly zero inline styles, zero internal styles, and zero loops.
 */
export const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({
  data,
  applicant,
  onChange,
  onNavigateToStep,
  errors,
}) => {
  // Check individual document uploads without any loops
  const hasPanCard = Boolean(data.uploadedDocs?.panCard)
  const hasAadhaarCard = Boolean(data.uploadedDocs?.aadhaarCard)
  const hasDirectorsKyc = Boolean(data.uploadedDocs?.directorsKyc)
  const hasBusinessAddressProof = Boolean(data.uploadedDocs?.businessAddressProof)
  const hasBankStatements = Boolean(data.uploadedDocs?.bankStatements)
  const hasGstCertificate = Boolean(data.uploadedDocs?.gstCertificate)
  const hasGstReturns = Boolean(data.uploadedDocs?.gstReturns)
  const hasBusinessItr = Boolean(data.uploadedDocs?.businessItr)
  const hasAuditedBalanceSheet = Boolean(data.uploadedDocs?.auditedBalanceSheet)
  const hasProfitAndLoss = Boolean(data.uploadedDocs?.profitAndLossStatement)
  const hasCashFlow = Boolean(data.uploadedDocs?.cashFlowStatement)
  const hasUdyamCert = Boolean(data.uploadedDocs?.udyamRegistrationCert)
  const hasBusinessRegProof = Boolean(data.uploadedDocs?.businessRegistrationProof)
  const hasBusinessExpansion = Boolean(data.uploadedDocs?.businessExpansionDoc)

  // Compute uploaded document count purely without any loops
  const uploadedCount =
    (hasPanCard ? 1 : 0) +
    (hasAadhaarCard ? 1 : 0) +
    (hasDirectorsKyc ? 1 : 0) +
    (hasBusinessAddressProof ? 1 : 0) +
    (hasBankStatements ? 1 : 0) +
    (hasGstCertificate ? 1 : 0) +
    (hasGstReturns ? 1 : 0) +
    (hasBusinessItr ? 1 : 0) +
    (hasAuditedBalanceSheet ? 1 : 0) +
    (hasProfitAndLoss ? 1 : 0) +
    (hasCashFlow ? 1 : 0) +
    (hasUdyamCert ? 1 : 0) +
    (hasBusinessRegProof ? 1 : 0) +
    (hasBusinessExpansion ? 1 : 0)

  const countBadgeText = `${uploadedCount} of ${uploadedCount > 0 ? uploadedCount : 12} uploaded`

  // Format Udyam display string
  const udyamDisplay =
    data.hasUdyam === 'yes'
      ? data.udyamRegistrationNumber
        ? `Yes (${data.udyamRegistrationNumber})`
        : 'Yes'
      : 'No'

  // Format Existing Loans string
  const existingLoansDisplay = data.existingLoans === 'none' ? 'No' : 'Yes'

  // Format Tenure display string
  const tenureDisplay = data.preferredTenureMonths
    ? `${data.preferredTenureMonths} Months`
    : '—'

  return (
    <div className="review-and-submit" data-testid="review-and-submit-step">
      {/* 1. Application Dossier Review Header Banner */}
      <div className="review-dossier-banner">
        <div className="review-dossier-banner__icon" aria-hidden="true">
          <img
            src="/assets/icons/loans/doc-orange.svg"
            alt=""
            width="22"
            height="22"
          />
        </div>
        <div className="review-dossier-banner__content">
          <h2 className="review-dossier-banner__title">Application Dossier Review</h2>
          <p className="review-dossier-banner__subtitle">
            Please review all the details and uploaded documents before submitting to our lending partners.
          </p>
        </div>
      </div>

      {/* 2. Review Sections List */}
      <div className="review-sections-list">
        {/* Section 1: Applicant Information */}
        <ReviewSectionCard
          title="Applicant Information"
          iconSrc="/assets/icons/loans/applicant-user.svg"
          themeColor="blue"
          testId="applicant-info-card"
          badge={
            <div className="review-verified-badge">
              <img
                src="/assets/icons/loans/verified-circle.svg"
                alt=""
                width="16"
                height="16"
                className="review-verified-badge__icon"
                aria-hidden="true"
              />
              <span>Verified Profile</span>
            </div>
          }
        >
          <div className="review-grid">
            <div className="review-col">
              <ReviewRow label="Name" value={applicant.name || '—'} />
              <ReviewRow label="Mobile" value={applicant.mobile || '—'} />
              <ReviewRow label="Email" value={applicant.email || '—'} />
            </div>
            <div className="review-col">
              <ReviewRow label="PAN Number" value={applicant.pan || '—'} />
              <ReviewRow label="Aadhaar Number" value={applicant.aadhaar || '—'} />
            </div>
          </div>
        </ReviewSectionCard>

        {/* Section 2: Loan Requirement */}
        <ReviewSectionCard
          title="Loan Requirement"
          iconSrc="/assets/icons/loans/wallet.svg"
          themeColor="orange"
          onEdit={() => onNavigateToStep(1)}
          testId="loan-requirement-card"
        >
          <div className="review-grid">
            <div className="review-col">
              <ReviewRow label="Facility Type" value="Business Loan" />
              <ReviewRow
                label="Requested Amount"
                value={formatIndianCurrency(data.requiredLoanAmount)}
              />
              <ReviewRow label="Purpose" value={formatPurpose(data.purposeOfLoan)} />
            </div>
            <div className="review-col">
              <ReviewRow label="Preferred Tenure" value={tenureDisplay} />
              <ReviewRow label="Existing Loans" value={existingLoansDisplay} />
            </div>
          </div>
        </ReviewSectionCard>

        {/* Section 3: Business Details */}
        <ReviewSectionCard
          title="Business Details"
          iconSrc="/assets/icons/loans/network-purple.svg"
          themeColor="purple"
          onEdit={() => onNavigateToStep(2)}
          testId="business-details-card"
        >
          <div className="review-grid">
            <div className="review-col">
              <ReviewRow
                label="Firm / Business Name"
                value={data.registeredBusinessName || '—'}
              />
              <ReviewRow
                label="Business Constitution"
                value={data.businessConstitution || '—'}
              />
              <ReviewRow
                label="Authorized Signatory"
                value={data.signatoryName || '—'}
              />
              <ReviewRow label="GSTIN" value={data.gstin || '—'} />
            </div>
            <div className="review-col">
              <ReviewRow label="Udyam Registration" value={udyamDisplay} />
              <ReviewRow
                label="Business Vintage"
                value={formatVintage(data.businessVintage)}
              />
              <ReviewRow
                label="Annual Turnover"
                value={formatIndianCurrency(data.annualTurnover)}
              />
              <ReviewRow
                label="Net Profit"
                value={formatIndianCurrency(data.annualNetProfit)}
              />
            </div>
          </div>
        </ReviewSectionCard>

        {/* Section 4: Banking & Tax Details */}
        <ReviewSectionCard
          title="Banking & Tax Details"
          iconSrc="/assets/icons/loans/bank-orange.svg"
          themeColor="pink"
          onEdit={() => onNavigateToStep(3)}
          testId="banking-tax-details-card"
        >
          <div className="review-grid">
            <div className="review-col">
              <ReviewRow
                label="Bank"
                value={data.primaryOperatingBankName || '—'}
              />
              <ReviewRow
                label="Account Number"
                value={maskAccountNumber(data.currentAccountNumber)}
              />
            </div>
            <div className="review-col">
              <ReviewRow label="IFSC Code" value={data.bankIfscCode || '—'} />
              <ReviewRow
                label="ITR Filing"
                value={
                  data.itrAcknowledgementNumber
                    ? `Filed (${data.itrAcknowledgementNumber})`
                    : 'Filed (Last 3 Years)'
                }
              />
            </div>
          </div>
        </ReviewSectionCard>

        {/* Section 5: Uploaded Documents */}
        <ReviewSectionCard
          title="Uploaded Documents"
          iconSrc="/assets/icons/loans/certificate-green.svg"
          themeColor="green"
          countBadge={countBadgeText}
          onEdit={() => onNavigateToStep(4)}
          editLabel="Manage"
          testId="uploaded-documents-card"
        >
          <div className="review-docs-container">
            {hasPanCard && <DocumentPill label="PAN Card" />}
            {hasAadhaarCard && <DocumentPill label="Aadhaar Card" />}
            {hasDirectorsKyc && <DocumentPill label="KYC of Directors / Partners" />}
            {hasBusinessAddressProof && <DocumentPill label="Business Address Proof" />}
            {hasBankStatements && <DocumentPill label="Current Account Bank Statements" />}
            {hasGstCertificate && <DocumentPill label="GST Certificate (REG-06)" />}
            {hasGstReturns && <DocumentPill label="GST Returns (12 Months)" />}
            {hasBusinessItr && <DocumentPill label="Business ITR (Last 2-3 Years)" />}
            {hasAuditedBalanceSheet && <DocumentPill label="Audited Balance Sheet" />}
            {hasProfitAndLoss && <DocumentPill label="Profit & Loss Statement" />}
            {hasCashFlow && <DocumentPill label="Cash Flow Statement" />}
            {hasUdyamCert && <DocumentPill label="Udyam Registration Certificate" />}
            {hasBusinessRegProof && <DocumentPill label="Business Registration Proof" />}
            {hasBusinessExpansion && <DocumentPill label="Business Expansion Document" />}

            {uploadedCount === 0 && (
              <span className="review-docs-empty">
                No documents uploaded yet. Click &quot;Manage&quot; to upload required documents.
              </span>
            )}
          </div>
        </ReviewSectionCard>
      </div>

      {/* 3. Authorization Checkbox */}
      <div className="review-auth-container">
        <label className="review-auth-label">
          <input
            type="checkbox"
            className="review-auth-checkbox"
            checked={Boolean(data.termsAccepted)}
            onChange={(e) => onChange({ termsAccepted: e.target.checked })}
            data-testid="terms-accepted-checkbox"
          />
          <span className="review-auth-text">
            I hereby authorize TaxEdge and its lending partners to fetch my credit bureau report (CIBIL/Experian), verify submitted tax/bank statements, and represent my loan file before financial institutions.
          </span>
        </label>
        {errors?.termsAccepted && (
          <div className="review-auth-error" role="alert">
            {errors.termsAccepted}
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewAndSubmit
