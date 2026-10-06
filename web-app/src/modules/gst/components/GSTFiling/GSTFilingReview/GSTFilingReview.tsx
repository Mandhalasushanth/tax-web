import React, { useState } from 'react'
import { GST_FEES, withPlatformGst } from '@modules/gst/constants/gstBusiness.constants'
import { GSTFilingStepper } from '@modules/gst/shared/GSTFilingStepper/GSTFilingStepper'
import type { FilingPeriodData } from '../GSTFilingPeriod/GSTFilingPeriod'
import { GSTReviewFilingDetailsCard } from './GSTReviewFilingDetails'
import {
  GSTReviewTaxComputationCard,
  GSTReviewFilingFeeCard,
} from './GSTReviewComputation'
import { GSTRequestChangesModal } from './GSTRequestChangesModal'
import {
  getResolvedReviewDetails,
  getTaxComputationRows,
} from '@modules/gst/utils/gstReviewData'
import {
  DEFAULT_DOCUMENT_ITEMS,
  DEFAULT_FILING_UPLOADED_FILES,
  calculateDocumentSummary,
  type UploadedFileInfo,
} from '@modules/gst/utils/gstDocumentsData'
import { StepActionBar } from '@shared/components'
import './GSTFilingReview.css'

export interface GSTFilingReviewProps {
  selectedMonth?: string
  baseFee?: number
  filingData?: Partial<FilingPeriodData>
  uploadedFiles?: Record<string, UploadedFileInfo>
  notApplicableDocs?: Record<string, boolean>
  onBack: () => void
  onRequestChange?: () => void
  onStepClick?: (step: number) => void
  onApprove: () => void
  onSaveDraft?: () => void
  onEditFilingDetails?: () => void
}

export const GSTFilingReview: React.FC<GSTFilingReviewProps> = ({
  selectedMonth,
  filingData,
  uploadedFiles,
  notApplicableDocs,
  onBack,
  onRequestChange,
  onStepClick,
  onApprove,
  onSaveDraft,
  onEditFilingDetails,
}) => {
  const [showRequestModal, setShowRequestModal] = useState(false)

  const handleEditDetails = () => {
    if (onEditFilingDetails) {
      onEditFilingDetails()
    } else if (onStepClick) {
      onStepClick(1)
    } else if (onRequestChange) {
      onRequestChange()
    } else {
      onBack()
    }
  }

  const effectiveUploadedFiles = uploadedFiles ?? DEFAULT_FILING_UPLOADED_FILES
  const effectiveNotApplicableDocs = notApplicableDocs ?? {}

  const docSummaryResult = calculateDocumentSummary(
    DEFAULT_DOCUMENT_ITEMS,
    effectiveUploadedFiles,
    effectiveNotApplicableDocs
  )

  const details = getResolvedReviewDetails(
    {
      ...filingData,
      selectedMonth: selectedMonth || filingData?.selectedMonth,
    },
    docSummaryResult.totalVerified
  )




  const effectiveBaseFee = filingData?.baseFee && filingData.baseFee > 0 ? filingData.baseFee : GST_FEES.filingCombo
  const { gst: gstAmount, total: totalPayableFee } = withPlatformGst(effectiveBaseFee)
  const taxComputation = getTaxComputationRows(filingData?.filingType === 'nil')

  const filingFeeItems = [
    { particulars: 'CA Consultancy & Reconciliation', amount: effectiveBaseFee },
    { particulars: 'Platform GST (18%)', amount: gstAmount },
  ]

  return (
    <div className="gst-review-page">
      {/* Main Page Header */}
      <header className="gst-review-header">
        <h1 className="gst-review-title">Filing Review &amp; Computation</h1>
        <p className="gst-review-subtitle">
          Review your details, check the computed tax figures and proceed to file your GST return.
        </p>
      </header>

      {/* Stepper */}
      <div className="gst-review-top-bar">
        <div className="gst-review-stepper-wrap">
          <GSTFilingStepper currentStep={3} onStepClick={onStepClick} />
        </div>
      </div>

      {/* Dark Navy "Ready for Review" Banner */}
      <div className="gst-review-ready-banner" role="status">
        <div className="gst-review-ready-banner__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="gst-review-ready-banner__content">
          <h2 className="gst-review-ready-banner__title">Ready for Review</h2>
          <p className="gst-review-ready-banner__subtitle">
            TaxEdge CA has prepared return computation based on your verified business records.
          </p>
        </div>
      </div>

      {/* Review Content: 1st Section Full Width, 2nd Section Side by Side */}
      <div className="gst-review-main-content">
        {/* 1st Section: Filing Details (Full Width) with Edit option */}
        <div className="gst-review-section-details">
          <GSTReviewFilingDetailsCard
            details={details}
            onEdit={handleEditDetails}
          />
        </div>

        {/* 2nd Section: Tax Computation & Professional Filing Fee (Side by Side) */}
        <div className="gst-review-side-by-side-row">
          <GSTReviewTaxComputationCard
            items={taxComputation.items}
            netLiability={taxComputation.netLiability}
          />
          <GSTReviewFilingFeeCard
            items={filingFeeItems}
            totalFee={totalPayableFee}
          />
        </div>
      </div>

      {/* Step Navigation Bar */}
      <StepActionBar
        onBack={onBack}
        onNext={onApprove}
        onSaveDraft={onSaveDraft}
        nextLabel="Continue"
      />

      {/* Confirmation Modal */}
      <GSTRequestChangesModal
        isOpen={showRequestModal}
        onClose={() => {
          setShowRequestModal(false)
          if (onRequestChange) {
            // keep user on page or allow further actions
          }
        }}
      />
    </div>
  )
}
