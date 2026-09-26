import React from 'react'

interface GSTTrackSidebarProps {
  onReuploadDocuments?: () => void
  onGoToHome?: () => void
  onTrackInApplications?: () => void
  onContactSupport?: () => void
}

export const GSTTrackSidebar: React.FC<GSTTrackSidebarProps> = ({
  onReuploadDocuments,
  onGoToHome,
  onTrackInApplications,
  onContactSupport,
}) => {
  return (
    <aside className="gst-track-sidebar">
      {/* Card 1: Need Help? */}
      <div className="gst-track-card gst-track-help-card">
        <div className="gst-track-help-card__header">
          <div className="gst-track-help-card__icon-box">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
              <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
              <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
              <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />
              <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
            </svg>
          </div>
          <h3 className="gst-track-help-card__title">Need Help?</h3>
        </div>

        <p className="gst-track-help-card__desc">
          If you have missed any documents, you can re-upload them here.
        </p>

        <div className="gst-track-help-card__actions">
          {/* Button 1: Missing Documents? Re-upload */}
          <button
            type="button"
            onClick={onReuploadDocuments}
            className="gst-track-btn gst-track-btn--reupload"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M175 162.5" />
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
              <path d="M12 12v9" />
              <path d="m16 16-4-4-4 4" />
            </svg>
            Missing Documents? Re-upload
          </button>

          {/* Button 2: Go to Home Dashboard */}
          <button
            type="button"
            onClick={onGoToHome}
            className="gst-track-btn gst-track-btn--home"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go to Home Dashboard
          </button>

          {/* Button 3: Track in My Applications */}
          <button
            type="button"
            onClick={onTrackInApplications}
            className="gst-track-btn gst-track-btn--track"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Track in My Applications
          </button>

          {/* Button 4: Contact Support / CA */}
          <button
            type="button"
            onClick={onContactSupport}
            className="gst-track-btn gst-track-btn--support"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Contact Support / CA
          </button>
        </div>
      </div>

      {/* Card 2: Important information */}
      <div className="gst-track-card gst-track-info-card">
        <div className="gst-track-info-card__header">
          <div className="gst-track-info-card__icon-circle">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <h3 className="gst-track-info-card__title">Important information</h3>
        </div>

        <div className="gst-track-info-list">
          {/* Item 1: Processing Time */}
          <div className="gst-track-info-item">
            <div className="gst-track-info-item__icon-bg">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="gst-track-info-item__text">
              <h4 className="gst-track-info-item__title">Processing Time</h4>
              <p className="gst-track-info-item__desc">Usually 1-2 business days</p>
            </div>
          </div>

          {/* Item 2: Updates */}
          <div className="gst-track-info-item">
            <div className="gst-track-info-item__icon-bg">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div className="gst-track-info-item__text">
              <h4 className="gst-track-info-item__title">Updates</h4>
              <p className="gst-track-info-item__desc">You will be notified at each stage</p>
            </div>
          </div>

          {/* Item 3: Support */}
          <div className="gst-track-info-item">
            <div className="gst-track-info-item__icon-bg">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </div>
            <div className="gst-track-info-item__text">
              <h4 className="gst-track-info-item__title">Support</h4>
              <p className="gst-track-info-item__desc">Contact your CA for any queries</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default GSTTrackSidebar
