import React from 'react'
import './GSTAmendmentProofsCard.css'

interface GSTAmendmentProofsCardProps {
  proofs?: string[]
  showImportantInfo?: boolean
  importantInfoBullets?: string[]
  noteText?: string
}

const DEFAULT_PROOFS = [
  'Property Tax Receipt',
  'Rent / Lease Agreement',
  'Electricity Bill',
  'Water Bill',
  'Municipal Khata Certificate',
  'Ownership Document',
  'NOC from Owner',
  'Any other government-issued document supporting the new address',
]

const DEFAULT_IMPORTANT_BULLETS = [
  'These details are fetched from your GST registration and are read-only.',
  'Update the new details carefully as per official documents.',
  'You need to upload a supporting document for this change.',
  'Click on Review Changes to verify all information before submission.',
]

export const GSTAmendmentProofsCard: React.FC<GSTAmendmentProofsCardProps> = ({
  proofs = DEFAULT_PROOFS,
  showImportantInfo = true,
  importantInfoBullets = DEFAULT_IMPORTANT_BULLETS,
  noteText = 'Uploaded document should be clear and valid.',
}) => {
  return (
    <aside className="gst-amend-sidebar-col">
      {/* 1. Important Information Card Box */}
      {showImportantInfo && (
        <div className="gst-amend-info-bullet-card">
          <div className="gst-amend-info-bullet-card__header">
            <div className="gst-amend-info-bullet-card__icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <h3 className="gst-amend-info-bullet-card__title">Important Information</h3>
          </div>

          <ul className="gst-amend-info-bullets-list">
            {importantInfoBullets.map((bullet, idx) => (
              <li key={idx} className="gst-amend-info-bullet-item">
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 2. Accepted Proofs Card Box */}
      <div className="gst-amend-proofs-card">
        <div className="gst-amend-proofs-card__header">
          <div className="gst-amend-proofs-card__icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <h3 className="gst-amend-proofs-card__title">Accepted proofs</h3>
        </div>

        <div className="gst-amend-proofs-list">
          {proofs.map((item, idx) => (
            <div key={idx} className="gst-amend-proof-item">
              <div className="gst-amend-proof-item__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <span className="gst-amend-proof-item__text">{item}</span>
            </div>
          ))}
        </div>

        {/* Bottom Orange Callout Banner */}
        {noteText && (
          <div className="gst-amend-proofs-note-banner">
            <div className="gst-amend-proofs-note-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <span className="gst-amend-proofs-note-text">{noteText}</span>
          </div>
        )}
      </div>
    </aside>
  )
}

export default GSTAmendmentProofsCard
