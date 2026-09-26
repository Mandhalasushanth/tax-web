import React from 'react'
import { useAppStore } from '@store/index'
import './GSTCertificateSubmitted.css'

interface GSTCertificateSubmittedProps {
  applicationId?: string
  gstin?: string
  requestType?: string
  onBackToForm: () => void
  onAllForms?: () => void
}

export const GSTCertificateSubmitted: React.FC<GSTCertificateSubmittedProps> = ({
  gstin = '29AAAAA0000A1Z5',
}) => {
  const pushToast = useAppStore((state) => state.pushToast)

  const handleDownload = () => {
    pushToast(`Downloading certificate GST-Certificate-${gstin}.pdf`, 'success')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'GST Registration Certificate',
        text: `GST Certificate for ${gstin}`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      pushToast('Certificate link copied to clipboard!', 'success')
    }
  }

  return (
    <div className="gcs-root">
      {/* ── Top Hero Banner ── */}
      <div className="gcs-hero-banner">
        <div className="gcs-hero-left">
          <div className="gcs-success-badge">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Success</span>
          </div>
          <h1 className="gcs-hero-title">
            Certificate <span className="gcs-hero-title-highlight">Ready!</span>
          </h1>
          <p className="gcs-hero-subtitle1">
            Your GST Registration Certificate (Form REG-06) for{' '}
            <strong className="gcs-gstin-bold">{gstin}</strong> is ready.
          </p>
          <p className="gcs-hero-subtitle2">
            You can now download, share or save your certificate for your records.
          </p>
        </div>

        {/* Hero Right Graphic */}
        <div className="gcs-hero-right">
          <div className="gcs-doc-illustration">
            <div className="gcs-doc-paper">
              <span className="gcs-doc-heading">GST</span>
              <span className="gcs-doc-subheading">REG-06</span>
              <div className="gcs-doc-line" />
              <div className="gcs-doc-line gcs-doc-line--short" />
              <div className="gcs-doc-line" />
              <div className="gcs-doc-check-badge">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          </div>
          <div className="gcs-cursive-tagline">
            <span className="gcs-cursive-text">Compliant Today</span>
            <span className="gcs-cursive-text">Growing Tomorrow</span>
            <svg className="gcs-cursive-swash" viewBox="0 0 120 12" fill="none">
              <path d="M2 8 C 30 2, 80 10, 118 4" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Two Column Layout ── */}
      <div className="gcs-layout">
        {/* ── LEFT: Certificate Details Card ── */}
        <div className="gcs-details-card">
          <div className="gcs-card-header">
            <div className="gcs-card-header-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h2 className="gcs-card-title">Certificate Details</h2>
          </div>

          <div className="gcs-detail-rows">
            <div className="gcs-detail-row">
              <div className="gcs-detail-row-left">
                <div className="gcs-row-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <span className="gcs-detail-label">Document</span>
              </div>
              <span className="gcs-detail-value gcs-detail-value--bold">
                GST Registration Certificate (Form REG-06)
              </span>
            </div>

            <div className="gcs-detail-row">
              <div className="gcs-detail-row-left">
                <div className="gcs-row-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  </svg>
                </div>
                <span className="gcs-detail-label">Format</span>
              </div>
              <span className="gcs-detail-value gcs-detail-value--bold">PDF</span>
            </div>

            <div className="gcs-detail-row">
              <div className="gcs-detail-row-left">
                <div className="gcs-row-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <span className="gcs-detail-label">Status</span>
              </div>
              <span className="gcs-status-ready-badge">
                <span className="gcs-status-dot">●</span> Ready
              </span>
            </div>

            <div className="gcs-detail-row">
              <div className="gcs-detail-row-left">
                <div className="gcs-row-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <span className="gcs-detail-label">Generated On</span>
              </div>
              <span className="gcs-detail-value">17 Sept 2026, 03:18 PM</span>
            </div>

            <div className="gcs-detail-row gcs-detail-row--last">
              <div className="gcs-detail-row-left">
                <div className="gcs-row-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                </div>
                <span className="gcs-detail-label">File Name</span>
              </div>
              <span className="gcs-detail-value gcs-filename-val">
                GST-Certificate-{gstin}.pdf
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="gcs-actions-grid">
            <button type="button" className="gcs-btn-download" onClick={handleDownload}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Certificate</span>
            </button>

            <button type="button" className="gcs-btn-share" onClick={handleShare}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span>Share Certificate</span>
            </button>
          </div>
        </div>

        {/* ── RIGHT: Sidebar ── */}
        <aside className="gcs-sidebar">
          {/* Card 1: What's Next? */}
          <div className="gcs-whats-next-card">
            <div className="gcs-wn-header">
              <div className="gcs-wn-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                </svg>
              </div>
              <div>
                <h3 className="gcs-wn-title">What's Next?</h3>
                <p className="gcs-wn-subtitle">Make the most of your certificate</p>
              </div>
            </div>

            <div className="gcs-wn-list">
              <div className="gcs-wn-item">
                <div className="gcs-wn-item-icon">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#2563eb" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
                <span>Use it for compliance filings</span>
              </div>

              <div className="gcs-wn-item">
                <div className="gcs-wn-item-icon">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#2563eb" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </div>
                <span>Share with authorized personnel</span>
              </div>

              <div className="gcs-wn-item">
                <div className="gcs-wn-item-icon">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#2563eb" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span>Save for future reference</span>
              </div>
            </div>
          </div>

          {/* Card 2: Security Banner */}
          <div className="gcs-security-card">
            <div className="gcs-security-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2563eb" strokeWidth="2.2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div>
              <h4 className="gcs-security-title">Your data is safe with us</h4>
              <p className="gcs-security-text">
                We ensure the highest security standards to keep your information protected.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default GSTCertificateSubmitted
