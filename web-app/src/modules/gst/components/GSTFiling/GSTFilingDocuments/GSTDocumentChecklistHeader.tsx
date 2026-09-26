import React from 'react'
import './GSTDocumentChecklistHeader.css'

interface GSTDocumentChecklistHeaderProps {
  returnLabel: string
  periodLabel: string
  completedCount: number
  totalCount: number
  frequencyLabel?: string
}

export const GSTDocumentChecklistHeader: React.FC<GSTDocumentChecklistHeaderProps> = ({
  returnLabel,
  periodLabel,
  completedCount,
  totalCount,
  frequencyLabel,
}) => {
  const displayFrequency = frequencyLabel?.trim() ? frequencyLabel.trim().toLowerCase() : 'quarterly'
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <>
      {/* Light Blue Notification Banner */}
      <div className="gst-docs-notice-banner" role="status">
        <svg
          className="gst-docs-notice-banner__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <p className="gst-docs-notice-banner__text">
          Upload documents for <span className="gst-docs-notice-banner__highlight">{returnLabel} – {periodLabel}</span>. Clear invoices ensure 100% accurate Input Tax Credit (ITC) claim.
        </p>
      </div>

      {/* Checklist Status Card */}
      <div className="gst-docs-checklist-card">
        <div className="gst-docs-checklist-header">
          <div className="gst-docs-checklist-header__left">
            <h3 className="gst-docs-checklist-header__title">Filing Document Checklist</h3>
            <span className="gst-docs-checklist-header__subtitle">
              Required for {displayFrequency} return
            </span>
          </div>

          <div className="gst-docs-checklist-badge">
            {completedCount}/{totalCount} Completed
          </div>
        </div>

        <div className="gst-docs-progress-track">
          <div
            className="gst-docs-progress-fill"
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          />
        </div>
      </div>
    </>
  )
}
