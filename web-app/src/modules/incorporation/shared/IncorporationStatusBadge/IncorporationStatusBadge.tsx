import React from 'react'
import './IncorporationStatusBadge.css'

export type IncorporationStatus = 'DRAFT' | 'FILED' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED'

interface IncorporationStatusBadgeProps {
  status: IncorporationStatus
  className?: string
}

export const IncorporationStatusBadge: React.FC<IncorporationStatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'APPROVED':
        return { modifier: 'inc-status-badge--approved', label: 'Incorporated' }
      case 'REJECTED':
        return { modifier: 'inc-status-badge--rejected', label: 'Rejected' }
      case 'FILED':
        return { modifier: 'inc-status-badge--filed', label: 'Filed with ROC' }
      case 'PENDING_APPROVAL':
        return { modifier: 'inc-status-badge--pending_approval', label: 'Pending Approval' }
      case 'DRAFT':
      default:
        return { modifier: 'inc-status-badge--draft', label: 'Draft' }
    }
  }

  const config = getStatusConfig()

  return (
    <span className={`inc-status-badge ${config.modifier} ${className}`}>
      {config.label}
    </span>
  )
}

export default IncorporationStatusBadge
