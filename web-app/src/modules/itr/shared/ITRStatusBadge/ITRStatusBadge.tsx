import React from 'react'
import './ITRStatusBadge.css'

export type ITRStatus = 'NOT_FILED' | 'E_VERIFIED' | 'PROCESSING' | 'PROCESSED' | 'DEFECTIVE'

interface ITRStatusBadgeProps {
  status: ITRStatus
  className?: string
}

export const ITRStatusBadge: React.FC<ITRStatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'E_VERIFIED':
        return { variantClass: 'itr-status-badge--e-verified', label: 'E-Verified' }
      case 'PROCESSED':
        return { variantClass: 'itr-status-badge--processed', label: 'Processed' }
      case 'DEFECTIVE':
        return { variantClass: 'itr-status-badge--defective', label: 'Defective Return' }
      case 'PROCESSING':
        return { variantClass: 'itr-status-badge--processing', label: 'Processing' }
      case 'NOT_FILED':
      default:
        return { variantClass: 'itr-status-badge--not-filed', label: 'Not Filed' }
    }
  }

  const config = getStatusConfig()

  return (
    <span className={`itr-status-badge ${config.variantClass} ${className}`}>
      {config.label}
    </span>
  )
}

export default ITRStatusBadge

