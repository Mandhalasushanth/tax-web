import React from 'react'
import { DocumentSection } from '@shared/components'
import { DocumentVerificationHeader } from './DocumentVerificationHeader'
import { BusinessDocumentItem } from './BusinessDocumentItem'
import { useDocumentVerification } from './useDocumentVerification'
import type { DocumentVerificationProps } from '../../../../types/businessLoan.types'
import './DocumentVerification.css'

/**
 * Step 4: Document Verification Component
 * Highly modular, concise, strictly loop-free, and reuses shared upload infrastructure.
 * Strictly uses external CSS classes only - zero inline styles.
 */
export const DocumentVerification: React.FC<DocumentVerificationProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const uploaded = data.uploadedDocs || {}

  const { fileError, handleUpload, handleRemove, handleView } = useDocumentVerification({
    uploadedDocs: uploaded,
    onChange,
  })

  return (
    <div className="document-verification-step" data-testid="step-document-verification">
      {/* 1. Header Banner */}
      <DocumentVerificationHeader />

      {/* 2. File Upload Error Banner */}
      {fileError && (
        <div className="doc-verification-error-banner" role="alert">
          <img
            src="/assets/icons/loans/alert-error.svg"
            alt=""
            width="18"
            height="18"
            aria-hidden="true"
          />
          <span>{fileError}</span>
        </div>
      )}

      {/* 3. Reusable Shared DocumentSection wrapping Full-Width Single-Column List */}
      <DocumentSection className="business-doc-verification-section" variant="flat">
        <div className="business-doc-grid">
          {/* 1. PAN Card (Required) */}
          <BusinessDocumentItem
            id="panCard"
            title="PAN Card"
            subtitle="Entity PAN card & Promoter/Director PAN card"
            iconSrc="/assets/icons/loans/doc-blue.svg"
            themeColor="blue"
            isRequired
            uploadedDoc={uploaded.panCard}
            error={errors.panCard}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
          />

          {/* 2. Aadhaar Card (Required) */}
          <BusinessDocumentItem
            id="aadhaarCard"
            title="Aadhaar Card"
            subtitle="Aadhaar of all Primary Directors / Partners"
            iconSrc="/assets/icons/loans/id-purple.svg"
            themeColor="purple"
            isRequired
            uploadedDoc={uploaded.aadhaarCard}
            error={errors.aadhaarCard}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
          />

          {/* 3. KYC of Directors / Partners (Required) */}
          <BusinessDocumentItem
            id="directorsKyc"
            title="KYC of Directors / Partners"
            subtitle="PAN, Aadhaar, DIN and Passport photo"
            iconSrc="/assets/icons/loans/users-green.svg"
            themeColor="green"
            isRequired
            uploadedDoc={uploaded.directorsKyc}
            error={errors.directorsKyc}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
          />

          {/* 4. Business Address Proof (Required) */}
          <BusinessDocumentItem
            id="businessAddressProof"
            title="Business Address Proof"
            subtitle="Utility bill / Rent agreement / Property document"
            iconSrc="/assets/icons/loans/home-pink.svg"
            themeColor="pink"
            isRequired
            uploadedDoc={uploaded.businessAddressProof}
            error={errors.businessAddressProof}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
          />

          {/* 5. Current Account Bank Statements (Required) */}
          <BusinessDocumentItem
            id="bankStatements"
            title="Current Account Bank Statements"
            subtitle="Last 12 months bank statements"
            iconSrc="/assets/icons/loans/bank-orange.svg"
            themeColor="orange"
            isRequired
            uploadedDoc={uploaded.bankStatements}
            error={errors.bankStatements}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
          />

          {/* 6. GST Certificate (REG-06) (Required) */}
          <BusinessDocumentItem
            id="gstCertificate"
            title="GST Certificate (REG-06)"
            subtitle="GST registration certificate"
            iconSrc="/assets/icons/loans/certificate-green.svg"
            themeColor="green"
            isRequired
            uploadedDoc={uploaded.gstCertificate}
            error={errors.gstCertificate}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
          />

          {/* 7. GST Returns (12 Months) (Required) */}
          <BusinessDocumentItem
            id="gstReturns"
            title="GST Returns (12 Months)"
            subtitle="Filed GSTR-3B & GSTR-1 returns for last 12 months"
            iconSrc="/assets/icons/loans/trend-orange.svg"
            themeColor="orange"
            isRequired
            uploadedDoc={uploaded.gstReturns}
            error={errors.gstReturns}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
          />

          {/* 8. Business ITR (Last 2-3 Years) (Required) */}
          <BusinessDocumentItem
            id="businessItr"
            title="Business ITR (Last 2-3 Years)"
            subtitle="ITR-V and computation for the last 3 assessment years"
            iconSrc="/assets/icons/loans/doc-purple.svg"
            themeColor="purple"
            isRequired
            uploadedDoc={uploaded.businessItr}
            error={errors.businessItr}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
          />

          {/* 9. Audited Balance Sheet (Required) */}
          <BusinessDocumentItem
            id="auditedBalanceSheet"
            title="Audited Balance Sheet"
            subtitle="CA audited balance sheet for last 2-3 years"
            iconSrc="/assets/icons/loans/pie-pink.svg"
            themeColor="pink"
            isRequired
            uploadedDoc={uploaded.auditedBalanceSheet}
            error={errors.auditedBalanceSheet}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
          />

          {/* 10. Profit & Loss Statement (Required) */}
          <BusinessDocumentItem
            id="profitAndLossStatement"
            title="Profit & Loss Statement"
            subtitle="CA certified P&L statement with schedules"
            iconSrc="/assets/icons/loans/bars-purple.svg"
            themeColor="purple"
            isRequired
            uploadedDoc={uploaded.profitAndLossStatement}
            error={errors.profitAndLossStatement}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
          />

          {/* 11. Udyam Registration Certificate (Optional) */}
          <BusinessDocumentItem
            id="udyamCertificate"
            title="Udyam Registration Certificate"
            subtitle="MSME registration certificate"
            iconSrc="/assets/icons/loans/briefcase-green.svg"
            themeColor="green"
            isRequired={false}
            isOptional
            uploadedDoc={uploaded.udyamCertificate}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
          />

          {/* 12. Cash Flow Statement (Required) */}
          <BusinessDocumentItem
            id="cashFlowStatement"
            title="Cash Flow Statement"
            subtitle="Cash flow statement for the latest financial year"
            iconSrc="/assets/icons/loans/doc-blue.svg"
            themeColor="blue"
            isRequired
            uploadedDoc={uploaded.cashFlowStatement}
            error={errors.cashFlowStatement}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
          />

          {/* 13. Business Expansion Document (Required) */}
          <BusinessDocumentItem
            id="businessExpansionDoc"
            title="Business Expansion Document"
            subtitle="Project report / Business plan / Estimated cost"
            iconSrc="/assets/icons/loans/doc-blue.svg"
            themeColor="blue"
            isRequired
            uploadedDoc={uploaded.businessExpansionDoc}
            error={errors.businessExpansionDoc}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
          />

          {/* 14. Business Registration Proof (Required) */}
          <BusinessDocumentItem
            id="businessRegistrationProof"
            title="Business Registration Proof"
            subtitle="Certificate of Incorporation / Business license"
            iconSrc="/assets/icons/loans/briefcase-orange.svg"
            themeColor="orange"
            isRequired
            uploadedDoc={uploaded.businessRegistrationProof}
            error={errors.businessRegistrationProof}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
          />
        </div>
      </DocumentSection>
    </div>
  )
}

export default DocumentVerification
