export const GSTTrackHeader: React.FC = () => {
  return (
    <div className="gst-track-header">
      {/* Page Title */}
      <div className="gst-track-header__top">
        <div className="gst-track-header__titles">
          <h1 className="gst-track-header__main-title">Application Status</h1>
          <p className="gst-track-header__subtitle">
            Track the real-time status of your GST application
          </p>
        </div>
      </div>

      {/* Application Submitted Alert Banner */}
      <div className="gst-track-alert">
        <div className="gst-track-alert__icon-wrapper">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gst-track-alert__check-icon"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="gst-track-alert__content">
          <h2 className="gst-track-alert__title">Application Submitted!</h2>
          <p className="gst-track-alert__message">
            Your GST application has been successfully filed with TaxEdge.
          </p>
        </div>
      </div>
    </div>
  )
}

export default GSTTrackHeader
