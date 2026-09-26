import React from 'react'

interface GSTTrackAppCardProps {
  appId?: string
  statusText?: string
  businessName?: string
  appliedOnDate?: string
  estCompletion?: string
}

export const GSTTrackAppCard: React.FC<GSTTrackAppCardProps> = ({
  appId = 'GST-2026-35907',
  statusText = 'Under Verification',
  businessName = 'Shree Deshmukh Enterprises',
  appliedOnDate = '15 Sep 2026',
  estCompletion = '1-2 Business Days',
}) => {
  return (
    <div className="gst-track-app-card">
      <div className="gst-track-app-card__header">
        <div className="gst-track-app-card__id-box">
          <span className="gst-track-app-card__id-label">APPLICATION ID</span>
          <h2 className="gst-track-app-card__id-value">{appId}</h2>
        </div>
        <div className="gst-track-app-card__status-badge">
          {statusText}
        </div>
      </div>

      <div className="gst-track-app-card__divider" />

      <div className="gst-track-app-card__grid">
        {/* Business */}
        <div className="gst-track-app-card__col">
          <div className="gst-track-app-card__icon-box">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
              <path d="M9 22v-4h6v4" />
              <path d="M8 6h.01" />
              <path d="M16 6h.01" />
              <path d="M12 6h.01" />
              <path d="M12 10h.01" />
              <path d="M12 14h.01" />
              <path d="M16 10h.01" />
              <path d="M16 14h.01" />
              <path d="M8 10h.01" />
              <path d="M8 14h.01" />
            </svg>
          </div>
          <div className="gst-track-app-card__col-info">
            <span className="gst-track-app-card__col-label">Business</span>
            <span className="gst-track-app-card__col-value" title={businessName}>
              {businessName.length > 14 ? `${businessName.slice(0, 13)}...` : businessName}
            </span>
          </div>
        </div>

        {/* Applied On */}
        <div className="gst-track-app-card__col">
          <div className="gst-track-app-card__icon-box">
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
          </div>
          <div className="gst-track-app-card__col-info">
            <span className="gst-track-app-card__col-label">Applied On</span>
            <span className="gst-track-app-card__col-value">Today</span>
            <span className="gst-track-app-card__col-subvalue">{appliedOnDate}</span>
          </div>
        </div>

        {/* Est. Completion */}
        <div className="gst-track-app-card__col">
          <div className="gst-track-app-card__icon-box">
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
          <div className="gst-track-app-card__col-info">
            <span className="gst-track-app-card__col-label">Est. Completion</span>
            <span className="gst-track-app-card__col-value">{estCompletion}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GSTTrackAppCard
