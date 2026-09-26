import React from 'react'

interface GSTSignatoriesReadonlyProps {
  currentDetails: {
    name: string
    pan: string
    designation: string
    mobile: string
    email: string
  }
}

export const GSTSignatoriesReadonly: React.FC<GSTSignatoriesReadonlyProps> = ({ currentDetails }) => {
  return (
    <div className="gst-amend-card-box">
      <h3 className="gst-amend-card-box__title">Currently registered (read-only)</h3>
      <div className="gst-sig-readonly-grid">
        <div className="gst-sig-readonly-col">
          <div>
            <span className="gst-amend-readonly-label">Name</span>
            <span className="gst-amend-readonly-value">
              {currentDetails.name}
            </span>
          </div>
          <div className="gst-amend-readonly-group">
            <span className="gst-amend-readonly-label">PAN</span>
            <span className="gst-amend-readonly-value">
              {currentDetails.pan}
            </span>
          </div>
          <div className="gst-amend-readonly-group">
            <span className="gst-amend-readonly-label">Designation</span>
            <span className="gst-amend-readonly-value">
              {currentDetails.designation}
            </span>
          </div>
        </div>

        <div className="gst-sig-readonly-col">
          <div>
            <span className="gst-amend-readonly-label">Mobile</span>
            <span className="gst-amend-readonly-value">
              {currentDetails.mobile}
            </span>
          </div>
          <div className="gst-amend-readonly-group">
            <span className="gst-amend-readonly-label">Email</span>
            <span className="gst-amend-readonly-value">
              {currentDetails.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GSTSignatoriesReadonly
