import React from 'react'

export interface GSTStatusCardProps {
  applicationRef: string
  businessName?: string
  onDashboard: () => void
  onTrackInApplications: () => void
  onContactSupport: () => void
}

export const GSTStatusCard: React.FC<GSTStatusCardProps> = ({
  onDashboard,
  onTrackInApplications,
  onContactSupport,
}) => {
  return (
    <aside className="gst-status-sidebar-col">
      <div className="gst-status-actions-card">
        <h3 className="gst-status-actions-card__title">Next Steps & Actions</h3>
        <p className="gst-status-actions-card__subtitle">
          Manage your new application or return to your account
        </p>

        {/* Action Buttons */}
        <div className="gst-status-actions">
          {/* Track in My Applications */}
          <button
            type="button"
            className="gst-status-btn gst-status-btn--track"
            onClick={onTrackInApplications}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="gst-status-btn-icon"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <span>Track in My Applications</span>
          </button>

          {/* Go to Home Dashboard */}
          <button
            type="button"
            className="gst-status-btn gst-status-btn--dashboard"
            onClick={onDashboard}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="gst-status-btn-icon"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span>Go to Home Dashboard</span>
          </button>

          {/* Contact Support / CA */}
          <button
            type="button"
            className="gst-status-btn gst-status-btn--support"
            onClick={onContactSupport}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="gst-status-btn-icon"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Contact Support / CA</span>
          </button>
        </div>
      </div>

      {/* Helpful Guidance Card */}
      <div className="gst-status-help-card">
        <div className="gst-status-help-card__icon" aria-hidden="true">💡</div>
        <div className="gst-status-help-card__content">
          <h4 className="gst-status-help-card__title">What happens next?</h4>
          <p className="gst-status-help-card__text">
            Our CA verification team will review your submitted proofs within 24 hours. You will receive an SMS and email notification once your ARN is generated.
          </p>
        </div>
      </div>
    </aside>
  )
}
