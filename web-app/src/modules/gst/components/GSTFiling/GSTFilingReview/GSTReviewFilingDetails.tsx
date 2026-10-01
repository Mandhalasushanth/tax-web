import React from 'react'
import type { ReviewDetailsData, DocumentSummaryItem } from '@modules/gst/utils/gstReviewData'
import './GSTReviewFilingDetails.css'

interface GSTReviewFilingDetailsProps {
  details: ReviewDetailsData
  onEdit?: () => void
}

interface GSTReviewDocumentsSummaryProps {
  summaryItems: DocumentSummaryItem[]
  overallVerifiedCount?: number
  totalDocsCount?: number
}

const SummaryItemIcon: React.FC<{ status?: string; isComplete?: boolean }> = ({ status, isComplete }) => {
  if (status === 'verified' || (!status && isComplete)) {
    return (
      <span className="gst-review-doc-item__icon-check" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </span>
    )
  }
  if (status === 'pending') {
    return (
      <span className="gst-review-doc-item__icon-pending" aria-hidden="true" title="Pending Verification">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      </span>
    )
  }
  if (status === 'not_applicable') {
    return (
      <span className="gst-review-doc-item__icon-na" aria-hidden="true" title="Not Applicable">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </span>
    )
  }
  return <span className="gst-review-doc-item__icon-empty" aria-hidden="true" />
}

export const GSTReviewFilingDetailsCard: React.FC<GSTReviewFilingDetailsProps> = ({
  details,
  onEdit,
}) => {
  return (
    <div className="gst-review-card">
      <div className="gst-review-card__header gst-review-card__header--split">
        <div className="gst-review-card__header-left">
          <div className="gst-review-card__icon-wrap gst-review-card__icon-wrap--orange">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h3 className="gst-review-card__title">Filing Details</h3>
        </div>

        {onEdit && (
          <button
            type="button"
            className="gst-review-card__edit-btn"
            onClick={onEdit}
            aria-label="Edit Filing Details"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="gst-review-card__edit-icon"
              aria-hidden="true"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Edit</span>
          </button>
        )}
      </div>

      <div className="gst-review-details-grid">
        {/* Column 1 */}
        <div className="gst-review-field">
          <span className="gst-review-field__label">GSTIN</span>
          <span className="gst-review-field__value">{details.gstin}</span>
        </div>
        <div className="gst-review-field">
          <span className="gst-review-field__label">Financial Year</span>
          <span className="gst-review-field__value">{details.financialYear}</span>
        </div>

        <div className="gst-review-field">
          <span className="gst-review-field__label">Business Entity</span>
          <span className="gst-review-field__value">{details.businessName}</span>
        </div>
        <div className="gst-review-field">
          <span className="gst-review-field__label">Filing Period</span>
          <span className="gst-review-field__value">{details.filingPeriod}</span>
        </div>

        <div className="gst-review-field">
          <span className="gst-review-field__label">Taxpayer Scheme</span>
          <span className="gst-review-field__value">{details.scheme}</span>
        </div>
        <div className="gst-review-field">
          <span className="gst-review-field__label">Filing Frequency</span>
          <span className="gst-review-field__value">{details.frequency}</span>
        </div>

        <div className="gst-review-field">
          <span className="gst-review-field__label">Filing Type</span>
          <span className="gst-review-field__value">{details.filingType}</span>
        </div>
        <div className="gst-review-field">
          <span className="gst-review-field__label">Return Form</span>
          <span className="gst-review-field__value">{details.returnForm}</span>
        </div>

        <div className="gst-review-field">
          <span className="gst-review-field__label">Attached Documents</span>
          <span className="gst-review-field__value">{details.attachedDocsCount} Files Verified</span>
        </div>
      </div>
    </div>
  )
}

export const GSTReviewDocumentsSummaryCard: React.FC<GSTReviewDocumentsSummaryProps> = ({
  summaryItems,
  overallVerifiedCount,
  totalDocsCount,
}) => {
  const totalCompleted = overallVerifiedCount ?? summaryItems.reduce((acc, item) => acc + item.completed, 0)
  const totalRequired = totalDocsCount ?? summaryItems.reduce((acc, item) => acc + item.total, 0)
  const displayCount = `${totalCompleted}/${totalRequired || 12}`

  return (
    <div className="gst-review-card">
      <div className="gst-review-card__header gst-review-card__header--split">
        <div className="gst-review-card__header-left">
          <div className="gst-review-card__icon-wrap gst-review-card__icon-wrap--blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h3 className="gst-review-card__title">Documents Summary</h3>
        </div>
        <span className="gst-review-doc-overall-badge">
          <svg viewBox="0 0 20 20" fill="currentColor" className="gst-review-doc-overall-icon">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Documents: {displayCount} Verified
        </span>
      </div>

      {/* Overall Status Banner */}
      <div className="gst-review-doc-overall-banner">
        <div className="gst-review-doc-overall-content">
          <span className="gst-review-doc-overall-label">Verification Status</span>
          <span className="gst-review-doc-overall-text">All required documents have been reviewed and verified.</span>
        </div>
        <div className="gst-review-doc-overall-pill">
          <svg viewBox="0 0 20 20" fill="currentColor" className="gst-review-doc-overall-pill-icon">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>{displayCount} Verified</span>
        </div>
      </div>

      <div className="gst-review-doc-summary-list">
        {summaryItems.map((item) => {
          const isComplete = item.completed > 0
          const status = item.status || (item.completed === item.total ? 'verified' : item.completed > 0 ? 'pending' : 'not_added')
          const statusText =
            item.statusText ||
            (status === 'verified'
              ? 'Verified'
              : status === 'pending'
              ? 'Pending Verification'
              : status === 'not_applicable'
              ? 'Not Applicable'
              : 'Not Added')

          return (
            <div key={item.id} className="gst-review-doc-item">
              <div className="gst-review-doc-item__left">
                <SummaryItemIcon status={status} isComplete={isComplete} />
                <span>{item.label}</span>
              </div>
              <div className="gst-review-doc-item__right">
                <span className="gst-review-doc-item__count">
                  {item.completed}/{item.total}
                </span>
                <span className={`gst-review-doc-item__status gst-review-doc-item__status--${status}`}>
                  {statusText}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

