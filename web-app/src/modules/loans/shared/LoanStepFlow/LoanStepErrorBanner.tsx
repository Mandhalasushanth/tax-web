import React from 'react'
import './LoanStepFlow.css'

export interface LoanStepErrorBannerProps {
  message: string | null
}

/** Red banner shown above a loan step when validation or submission fails */
export const LoanStepErrorBanner: React.FC<LoanStepErrorBannerProps> = ({ message }) => {
  if (!message) return null

  return (
    <div className="loan-step-error-banner" role="alert">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>{message}</span>
    </div>
  )
}

export default LoanStepErrorBanner
