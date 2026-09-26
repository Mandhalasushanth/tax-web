import React from 'react'
import './GSTAmendmentSubmitted.css'

interface GSTAmendmentSubmittedProps {
  arnNumber?: string
  submissionDateText?: string
  requestedSection?: string
  onTrackAmendment?: () => void
  onOpenMyApplications?: () => void
}

export const GSTAmendmentSubmitted: React.FC<GSTAmendmentSubmittedProps> = ({
  arnNumber = 'AA2993736545',
  submissionDateText = '15 Sep 2026, 03:22 PM',
  requestedSection = 'Legal Business Name',
  onTrackAmendment,
  onOpenMyApplications,
}) => {
  return (
    <div className="gst-amend-submitted-container">
      {/* 1. Hero Header with Checkmark */}
      <div className="gst-amend-submitted-hero">
        <div className="gst-amend-submitted-ring">
          <div className="gst-amend-submitted-inner-circle">
            <svg viewBox="0 0 24 24" className="gst-amend-check-svg">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <h1 className="gst-amend-submitted-title">Amendment Submitted</h1>
        <p className="gst-amend-submitted-subtitle">
          Your GST amendment request has been successfully submitted.
        </p>
      </div>

      {/* 2. Main Details Card */}
      <div className="gst-amend-submitted-card">
        {/* Row 1: Application Type */}
        <div className="gst-amend-submitted-row">
          <div className="gst-amend-submitted-row__left">
            <div className="gst-amend-submitted-icon-bg gst-amend-submitted-icon-bg--blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <span className="gst-amend-submitted-label">Application Type</span>
          </div>
          <span className="gst-amend-submitted-value">GST Amendment</span>
        </div>

        <div className="gst-amend-submitted-divider" />

        {/* Row 2: ARN / Reference */}
        <div className="gst-amend-submitted-row">
          <div className="gst-amend-submitted-row__left">
            <div className="gst-amend-submitted-icon-bg gst-amend-submitted-icon-bg--purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
                <line x1="10" y1="3" x2="8" y2="21" />
                <line x1="16" y1="3" x2="14" y2="21" />
              </svg>
            </div>
            <span className="gst-amend-submitted-label">ARN / Reference</span>
          </div>
          <span className="gst-amend-submitted-value gst-amend-submitted-value--arn">
            {arnNumber}
          </span>
        </div>

        <div className="gst-amend-submitted-divider" />

        {/* Row 3: Submission Date */}
        <div className="gst-amend-submitted-row">
          <div className="gst-amend-submitted-row__left">
            <div className="gst-amend-submitted-icon-bg gst-amend-submitted-icon-bg--orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <span className="gst-amend-submitted-label">Submission Date</span>
          </div>
          <span className="gst-amend-submitted-value">{submissionDateText}</span>
        </div>

        <div className="gst-amend-submitted-divider" />

        {/* Row 4: Requested Section */}
        <div className="gst-amend-submitted-row">
          <div className="gst-amend-submitted-row__left">
            <div className="gst-amend-submitted-icon-bg gst-amend-submitted-icon-bg--green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </div>
            <span className="gst-amend-submitted-label">Requested Section</span>
          </div>
          <span className="gst-amend-submitted-value">{requestedSection}</span>
        </div>

        <div className="gst-amend-submitted-divider" />

        {/* Row 5: Current Status */}
        <div className="gst-amend-submitted-row">
          <div className="gst-amend-submitted-row__left">
            <div className="gst-amend-submitted-icon-bg gst-amend-submitted-icon-bg--green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <span className="gst-amend-submitted-label">Current Status</span>
          </div>
          <span className="gst-amend-submitted-status-badge">Submitted</span>
        </div>
      </div>

      {/* 3. Action Buttons Row */}
      <div className="gst-amend-submitted-actions-row">
        <button
          type="button"
          onClick={onTrackAmendment}
          className="gst-amend-submitted-btn-orange"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gst-amend-btn-icon-target">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          <span>Track Amendment</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gst-amend-btn-icon-arrow">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onOpenMyApplications}
          className="gst-amend-submitted-btn-navy"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <span>Open My Applications</span>
        </button>
      </div>
    </div>
  )
}

export default GSTAmendmentSubmitted
