import React, { useState } from 'react'
import './GSTComplianceSubmitted.css'

export interface GSTComplianceSubmittedProps {
  applicationId?: string
  gstin: string
  requestType?: string
  fieldsCount?: number
  onBackToForm: () => void
  onAllForms: () => void
}

export const GSTComplianceSubmitted: React.FC<GSTComplianceSubmittedProps> = ({
  applicationId,
  gstin = '',
  requestType = 'Notice Response',
  onAllForms,
}) => {
  const [copied, setCopied] = useState(false)
  const isNotice = requestType === 'Notice Response'
  const defaultAppId = isNotice ? 'GSTC-2026-688084' : 'GSTC-2026-680427'
  const displayAppId = applicationId || defaultAppId

  const handleCopy = () => {
    navigator.clipboard.writeText(displayAppId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="gst-comp-success-container">
      {/* Top Banner Graphic */}
      <div className="gst-comp-success-banner">
        <div className="gst-comp-success-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="gst-comp-success-title">Request Submitted Successfully</h1>
        <p className="gst-comp-success-subtitle">
          Your GST Compliance request has been submitted successfully. Our CA team will review your documents and contact you shortly.
        </p>
      </div>

      {/* Main Details Card */}
      <div className="gst-comp-success-card">
        {/* Row 1: Ref ID, Submitted Date, Estimated Response */}
        <div className="gst-comp-success-top-grid">
          <div className="gst-comp-success-col">
            <span className="gst-comp-meta-label">REFERENCE ID</span>
            <div className="gst-comp-ref-id-row">
              <span className="gst-comp-ref-id">{displayAppId}</span>
              <button type="button" className="gst-comp-copy-btn" onClick={handleCopy}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="gst-comp-success-col">
            <span className="gst-comp-meta-label">SUBMITTED ON</span>
            <div className="gst-comp-meta-val-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="gst-comp-meta-text">{currentDate}</span>
            </div>
          </div>

          <div className="gst-comp-success-col">
            <span className="gst-comp-meta-label">ESTIMATED RESPONSE</span>
            <div className="gst-comp-meta-val-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="gst-comp-meta-text highlight-blue">Within 24 Hours</span>
            </div>
          </div>
        </div>

        <div className="gst-comp-success-divider" />

        {/* Row 2: Request Type & GSTIN */}
        <div className="gst-comp-success-bottom-grid">
          <div className="gst-comp-info-block">
            <div className="gst-comp-block-icon bg-orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="gst-comp-block-text">
              <span className="gst-comp-meta-label">REQUEST TYPE</span>
              <h4 className="gst-comp-block-title">{requestType}</h4>
              {!isNotice && (
                <p className="gst-comp-block-desc">Reconcile Purchase &amp; Sales registers against GSTR-2B</p>
              )}
            </div>
          </div>

          <div className="gst-comp-info-block">
            <div className="gst-comp-block-icon bg-blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
              </svg>
            </div>
            <div className="gst-comp-block-text">
              <span className="gst-comp-meta-label">GSTIN</span>
              <h4 className="gst-comp-block-title">{gstin}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* What happens next? Card */}
      <div className="gst-comp-next-card">
        <h3 className="gst-comp-next-title">What happens next?</h3>

        <div className="gst-comp-steps-grid">
          <div className="gst-comp-step-item">
            <span className="gst-comp-step-num num-orange">1</span>
            <div className="gst-comp-step-content">
              {isNotice ? (
                <p className="gst-comp-step-text">A certified Chartered Accountant will review your uploaded registers and notice details.</p>
              ) : (
                <>
                  <h4 className="gst-comp-step-heading">Our CA team will review</h4>
                  <p className="gst-comp-step-desc">A certified Chartered Accountant will review your uploaded documents and notice details.</p>
                </>
              )}
            </div>
          </div>

          <span className="gst-comp-step-arrow">›</span>

          <div className="gst-comp-step-item">
            <span className="gst-comp-step-num num-blue">2</span>
            <div className="gst-comp-step-content">
              {isNotice ? (
                <p className="gst-comp-step-text">You will receive an update in your TaxEdge Notifications and WhatsApp within 24 hours.</p>
              ) : (
                <>
                  <h4 className="gst-comp-step-heading">You will be notified</h4>
                  <p className="gst-comp-step-desc">You will receive an update in your TaxEdge Notifications and WhatsApp within 24 hours.</p>
                </>
              )}
            </div>
          </div>

          {!isNotice && (
            <>
              <span className="gst-comp-step-arrow">›</span>
              <div className="gst-comp-step-item">
                <span className="gst-comp-step-num num-green">3</span>
                <div className="gst-comp-step-content">
                  <h4 className="gst-comp-step-heading">Track your request</h4>
                  <p className="gst-comp-step-desc">You can track the status anytime from your dashboard.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="gst-comp-success-actions">
        <button type="button" className="gst-comp-track-btn" onClick={onAllForms}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
          Track Request
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="gst-comp-arrow-right">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        <button type="button" className="gst-comp-dashboard-btn" onClick={onAllForms}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}

export default GSTComplianceSubmitted
