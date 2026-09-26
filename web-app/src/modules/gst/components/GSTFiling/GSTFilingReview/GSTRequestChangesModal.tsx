import { useEffect } from 'react'
import './GSTRequestChangesModal.css'

interface GSTRequestChangesModalProps {
  isOpen: boolean
  onClose: () => void
}

export const GSTRequestChangesModal = ({
  isOpen,
  onClose,
}: GSTRequestChangesModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="gst-request-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gst-request-modal-title"
    >
      <div
        className="gst-request-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="gst-request-modal-title" className="gst-request-modal-title">
          Request Changes
        </h3>
        <p className="gst-request-modal-body">
          Your request has been forwarded to our Chartered Accountant. You will receive an updated return summary shortly.
        </p>
        <div className="gst-request-modal-actions">
          <button
            type="button"
            className="gst-request-modal-btn-ok"
            onClick={onClose}
            autoFocus
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
