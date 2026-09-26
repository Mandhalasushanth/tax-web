import React from 'react'
import './GSTVerifiedBusinessCard.css'

interface GSTVerifiedBusinessCardProps {
  gstin?: string
  tradeName?: string
  legalName?: string
  scheme?: string
  stateName?: string
}

const STATE_CODE_MAP: Record<string, string> = {
  '29': 'Karnataka',
  '27': 'Maharashtra',
  '36': 'Telangana',
  '37': 'Andhra Pradesh',
  '07': 'Delhi',
  '33': 'Tamil Nadu',
  '24': 'Gujarat',
  '19': 'West Bengal',
  '08': 'Rajasthan',
  '09': 'Uttar Pradesh',
  '06': 'Haryana',
  '03': 'Punjab',
  '32': 'Kerala',
}

export const GSTVerifiedBusinessCard: React.FC<GSTVerifiedBusinessCardProps> = ({
  gstin = '',
  tradeName = 'Shree Deshmukh Traders',
  legalName = 'Shree Deshmukh Enterprises Private Limited',
  scheme = 'Regular Scheme',
  stateName,
}) => {
  const prefix = gstin.trim().slice(0, 2)
  const resolvedState = stateName || STATE_CODE_MAP[prefix] || 'Karnataka'

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
