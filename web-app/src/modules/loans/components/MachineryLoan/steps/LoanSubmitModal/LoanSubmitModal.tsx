import React from 'react'
import './LoanSubmitModal.css'

export interface LoanSubmitModalProps {
  isOpen: boolean
  referenceNumber: string
  onTrackStatus: () => void
}

export const LoanSubmitModal: React.FC<LoanSubmitModalProps> = ({
  isOpen,
  referenceNumber,
  onTrackStatus,
}) => {
  if (!isOpen) return null

  return (
    <div className="loan-submit-modal-overlay" role="dialog" aria-modal="true">
      <div className="loan-submit-modal-card">
        <h3 className="loan-submit-modal-title">Machinery Loan Submitted</h3>
        <p className="loan-submit-modal-body">
          Your application (Ref: {referenceNumber}) has been submitted. Our TaxEdge Loan Agent will process the application shortly.
        </p>
        <div className="loan-submit-modal-actions">
          <button
            type="button"
            className="loan-submit-modal-btn"
            onClick={onTrackStatus}
          >
            TRACK STATUS
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoanSubmitModal
