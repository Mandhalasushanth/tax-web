import React from 'react'
import './GSTComplianceConfirmModal.css'

interface GSTComplianceConfirmModalProps {
  isOpen: boolean
  gstin: string
  requestType: string
  onConfirm: () => void
  onCancel: () => void
}

export const GSTComplianceConfirmModal: React.FC<GSTComplianceConfirmModalProps> = ({
  isOpen,
  gstin,
  requestType,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null

  return (
    <div className="gst-comp-modal-overlay">
      <div className="gst-comp-modal-card">
        {/* Shield Icon */}
        <div className="gst-comp-modal-shield-container">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gst-comp-modal-shield-icon">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        </div>

        <h3 className="gst-comp-modal-title">Submit GST Compliance Request?</h3>
        
        <p className="gst-comp-modal-desc">
          Are you sure you want to submit this {requestType || 'Reconciliation Support'} request for GSTIN{' '}
          <strong>{gstin || '29AAAAA0000A1Z5'}</strong>? Our CA team will immediately begin processing.
        </p>

        <div className="gst-comp-modal-actions">
          <button type="button" className="gst-comp-modal-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="gst-comp-modal-submit-btn" onClick={onConfirm}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
