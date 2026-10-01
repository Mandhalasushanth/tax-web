import React from 'react'
import { stateFromGstin } from '@modules/gst/utils/gstBusinessDetails.constants'
import './GSTVerifiedBusinessCard.css'

interface GSTVerifiedBusinessCardProps {
  gstin?: string
  tradeName?: string
  legalName?: string
  scheme?: string
  stateName?: string
}

export const GSTVerifiedBusinessCard: React.FC<GSTVerifiedBusinessCardProps> = ({
  gstin = '',
  tradeName,
  legalName,
  scheme = 'Regular Scheme',
  stateName,
}) => {
  const resolvedState = stateName || stateFromGstin(gstin.trim()) || '—'

  return (
    <div className="gst-verified-card" role="region" aria-label="Verified Business Details">
      {/* Top row: Verified badge on left, State on right */}
      <div className="gst-verified-card__top">
        <div className="gst-verified-card__badge">
          <svg
            className="gst-verified-card__badge-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Verified from GST Portal</span>
        </div>

        <span className="gst-verified-card__state">{resolvedState}</span>
      </div>

      {/* Middle row: Trade name and legal name */}
      <div className="gst-verified-card__content">
        <h4 className="gst-verified-card__trade-name">{tradeName}</h4>
        <p className="gst-verified-card__legal-name">{legalName}</p>
      </div>

      {/* Bottom row: Scheme badge */}
      <div className="gst-verified-card__bottom">
        <span className="gst-verified-card__scheme-badge">{scheme}</span>
      </div>
    </div>
  )
}
