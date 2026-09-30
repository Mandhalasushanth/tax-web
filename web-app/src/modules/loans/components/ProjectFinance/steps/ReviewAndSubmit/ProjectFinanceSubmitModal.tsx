import React from 'react'
import './ProjectFinanceSubmitModal.css'

export interface ProjectFinanceSubmitModalProps {
  isOpen: boolean
  applicationId: string
  onDone: () => void
}

export const ProjectFinanceSubmitModal: React.FC<ProjectFinanceSubmitModalProps> = ({
  isOpen,
  applicationId,
  onDone,
}) => {
  if (!isOpen) return null

  return (
    <div className="pf-submit-modal-overlay" role="dialog" aria-modal="true">
      <div className="pf-submit-modal-card">
        {/* Success Icon */}
        <div className="pf-submit-modal-icon-wrap">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="pf-submit-modal-title">Application Submitted!</h2>

        {/* Application ID Pill */}
        <div className="pf-submit-modal-id-pill">
          Application ID: {applicationId}
        </div>

        {/* Message */}
        <p className="pf-submit-modal-desc">
          Your Project Finance loan application has been submitted successfully. Our credit appraisal team will review your proposal and initiate the site evaluation.
        </p>

        {/* Done Button */}
        <button
          type="button"
          className="pf-submit-modal-btn"
          onClick={onDone}
          data-testid="pf-submit-modal-done-btn"
          aria-label="Done"
        >
          Done
        </button>
      </div>
    </div>
  )
}
