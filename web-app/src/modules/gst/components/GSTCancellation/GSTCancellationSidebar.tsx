import React from 'react'

const ACCEPTED_PROOFS = [
  'Business Closure Proof',
  'Sale / Transfer Agreement',
  'Merger / Amalgamation Document',
  'Revised Constitution / Partnership Document',
  'Death Certificate',
  'Other Relevant Supporting Document',
]

export const GSTCancellationSidebar: React.FC = () => {
  return (
    <div className="gst-canc-accepted-card">
      <div className="gst-canc-accepted-header">
        <span className="gst-canc-accepted-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </span>
        <h4 className="gst-canc-accepted-title">Accepted proofs</h4>
      </div>

      <ul className="gst-canc-accepted-list">
        {ACCEPTED_PROOFS.map((item) => (
          <li key={item} className="gst-canc-accepted-item">
            <span className="gst-canc-bullet">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GSTCancellationSidebar
