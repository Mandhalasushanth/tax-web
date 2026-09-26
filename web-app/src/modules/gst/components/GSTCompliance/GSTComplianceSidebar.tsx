import React from 'react'

interface GSTComplianceSidebarProps {
  onContactSupport: () => void
}

export const GSTComplianceSidebar: React.FC<GSTComplianceSidebarProps> = ({ onContactSupport }) => {
  return (
    <div className="gst-right-column">
      {/* Helpful Information Card */}
      <div className="side-card helpful-info-card">
        <div className="side-card-header">
          <span className="bulb-icon">💡</span>
          <h3 className="side-card-title">Helpful Information</h3>
        </div>
        <p className="helpful-subtitle">You can request support for:</p>
        <ul className="helpful-list">
          <li>
            <span className="check-badge">✓</span>
            <span>GST Return Filing Assistance</span>
          </li>
          <li>
            <span className="check-badge">✓</span>
            <span>Reconciliation Support</span>
          </li>
          <li>
            <span className="check-badge">✓</span>
            <span>Notice &amp; Reply Support</span>
          </li>
          <li>
            <span className="check-badge">✓</span>
            <span>Amendments / Corrections</span>
          </li>
          <li>
            <span className="check-badge">✓</span>
            <span>General GST Compliance Queries</span>
          </li>
        </ul>
        <p className="helpful-footer">
          Our CA team will review your request and get in touch with you.
        </p>
      </div>

      {/* Need Help Card */}
      <div className="side-card need-help-card">
        <div className="side-card-header">
          <span className="headset-icon">🎧</span>
          <h3 className="side-card-title">Need Help?</h3>
        </div>
        <p className="help-subtitle">
          Not sure which request type to select? Our CA team is here to guide you.
        </p>
        <button
          type="button"
          className="btn-contact-support"
          onClick={onContactSupport}
        >
          Contact Support
        </button>
      </div>
    </div>
  )
}
