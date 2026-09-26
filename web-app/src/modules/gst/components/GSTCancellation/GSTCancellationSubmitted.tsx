import React from 'react'
import './GSTCancellationSubmitted.css'

export interface GSTCancellationSubmittedProps {
  applicationId?: string
  gstin: string
  cancellationDate?: string
  onBackToForm: () => void
  onAllForms: () => void
}

export const GSTCancellationSubmitted: React.FC<GSTCancellationSubmittedProps> = ({
  applicationId = 'AA290926430313',
  gstin = '29AAAAA0000A1Z8',
  cancellationDate = '2026-09-28',
  onAllForms,
}) => {
  const currentDateFormatted = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const formatEffectiveDate = (dateStr?: string) => {
    if (!dateStr) return '28 Sept 2026'
    try {
      const d = new Date(dateStr)
      if (isNaN(d.getTime())) return dateStr
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="gst-canc-success-wrapper">
      {/* Top Banner Graphic & Confetti Circle */}
      <div className="gst-canc-success-top-banner">
        <div className="gst-canc-confetti-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="gst-canc-check-svg">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="gst-canc-success-title">Cancellation Submitted</h1>
        <p className="gst-canc-success-sub1">Your application Form REG-16 has been initiated successfully.</p>
        <p className="gst-canc-success-sub2">You will be notified about the updates via email and SMS.</p>
      </div>

      {/* Main White Details Card */}
      <div className="gst-canc-details-card">
        <div className="gst-canc-detail-row">
          <span className="gst-canc-detail-label">Application Type</span>
          <span className="gst-canc-detail-val">GST Cancellation</span>
        </div>

        <div className="gst-canc-detail-row">
          <span className="gst-canc-detail-label">ARN / Reference</span>
          <span className="gst-canc-detail-val">{applicationId}</span>
        </div>

        <div className="gst-canc-detail-row">
          <span className="gst-canc-detail-label">GSTIN</span>
          <span className="gst-canc-detail-val">{gstin}</span>
        </div>

        <div className="gst-canc-detail-row">
          <span className="gst-canc-detail-label">Submission Date</span>
          <span className="gst-canc-detail-val">{currentDateFormatted}</span>
        </div>

        <div className="gst-canc-detail-row">
          <span className="gst-canc-detail-label">Effective Date</span>
          <span className="gst-canc-detail-val">{formatEffectiveDate(cancellationDate)}</span>
        </div>

        <div className="gst-canc-detail-row no-border">
          <span className="gst-canc-detail-label">Current Status</span>
          <span className="gst-canc-status-val">
            <span className="gst-canc-dot">●</span> Submitted
          </span>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="gst-canc-actions-grid">
        <button type="button" className="gst-canc-track-btn" onClick={onAllForms}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          <span>Track Cancellation</span>
        </button>

        <button type="button" className="gst-canc-my-app-btn" onClick={onAllForms}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <span>My Application</span>
        </button>
      </div>
    </div>
  )
}

export default GSTCancellationSubmitted

