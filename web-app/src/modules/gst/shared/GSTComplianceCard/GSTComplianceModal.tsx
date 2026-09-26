import React from 'react'
import './GSTComplianceModal.css'

export type ComplianceRequestOption = 'Reconciliation Support' | 'Notice Response'

interface GSTComplianceModalProps {
  isOpen: boolean
  selectedOption: string
  onSelect: (option: ComplianceRequestOption) => void
  onClose: () => void
}

export const GSTComplianceModal: React.FC<GSTComplianceModalProps> = ({
  isOpen,
  selectedOption,
  onSelect,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className="gst-comp-modal-overlay" onClick={onClose}>
      <div className="gst-comp-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Top Handle Bar */}
        <div className="gst-comp-modal-handle" />

        {/* Modal Header */}
        <div className="gst-comp-modal-header">
          <h3 className="gst-comp-modal-title">Select Request Type</h3>
          <button type="button" className="gst-comp-modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Options List */}
        <div className="gst-comp-modal-options">
          {/* Option 1: Reconciliation Support */}
          <div
            className={`gst-comp-option-card ${selectedOption === 'Reconciliation Support' ? 'is-selected' : ''}`}
            onClick={() => {
              onSelect('Reconciliation Support')
              onClose()
            }}
            role="button"
            tabIndex={0}
          >
            <div className="gst-comp-option-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </div>
            <div className="gst-comp-option-info">
              <h4 className="gst-comp-option-title">Reconciliation Support</h4>
              <p className="gst-comp-option-desc">Reconcile Purchase &amp; Sales registers against GSTR-2B</p>
            </div>
            <div className="gst-comp-option-radio">
              <div className={`gst-comp-radio-inner ${selectedOption === 'Reconciliation Support' ? 'checked' : ''}`} />
            </div>
          </div>

          {/* Option 2: Notice Response */}
          <div
            className={`gst-comp-option-card ${selectedOption === 'Notice Response' ? 'is-selected' : ''}`}
            onClick={() => {
              onSelect('Notice Response')
              onClose()
            }}
            role="button"
            tabIndex={0}
          >
            <div className="gst-comp-option-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <div className="gst-comp-option-info">
              <h4 className="gst-comp-option-title">Notice Response</h4>
              <p className="gst-comp-option-desc">Expert CA response drafting for GST department notices</p>
            </div>
            <div className="gst-comp-option-radio">
              <div className={`gst-comp-radio-inner ${selectedOption === 'Notice Response' ? 'checked' : ''}`} />
            </div>
          </div>
        </div>

        {/* Bottom Cancel Button */}
        <button type="button" className="gst-comp-modal-cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default GSTComplianceModal
