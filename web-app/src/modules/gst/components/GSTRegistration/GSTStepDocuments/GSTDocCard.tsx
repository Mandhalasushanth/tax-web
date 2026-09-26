import { useState, type FC, type ReactNode } from 'react'
import type { DocumentItem } from '../../../types/gstDocuments.types'
import { ADDRESS_PROOF_OPTIONS } from '../../../utils/gstDocuments.constants'
import {
  PanCardIcon,
  AadhaarCardIcon,
  BusinessRegIcon,
  AddressProofIcon,
  BankProofIcon,
  PhotoIcon,
  CloudUploadIcon,
  CheckCircleIcon,
  ViewEyeIcon,
  ReplaceRotateIcon,
  DeleteTrashIcon,
} from '../../../shared/GSTDocIcons/GSTDocIcons'
import './GSTDocCard.css'

interface GSTDocCardProps {
  doc: DocumentItem
  isReplacing: boolean
  onTriggerCamera?: (id: string) => void
  onTriggerUpload: (id: string) => void
  onStartReplace: (id: string) => void
  onCancelReplace: () => void
  onDelete: (id: string) => void
  onView: (doc: DocumentItem) => void
  onAddressProofChange?: (value: string) => void
}

const getDocIcon = (id: string): ReactNode => {
  switch (id) {
    case 'pan':
      return <PanCardIcon />
    case 'aadhaar':
      return <AadhaarCardIcon />
    case 'business_reg':
      return <BusinessRegIcon />
    case 'address_proof':
      return <AddressProofIcon />
    case 'bank_proof':
      return <BankProofIcon />
    case 'photo':
      return <PhotoIcon />
    default:
      return <BusinessRegIcon />
  }
}

export const GSTDocCard: FC<GSTDocCardProps> = ({
  doc,
  isReplacing,
  onTriggerUpload,
  onStartReplace,
  onCancelReplace,
  onDelete,
  onView,
  onAddressProofChange,
}) => {
  const [addressWarning, setAddressWarning] = useState(false)
  const showUploadButtons = !doc.isUploaded || isReplacing

  const handleUploadClick = () => {
    if (doc.id === 'address_proof' && !doc.addressProofType) {
      setAddressWarning(true)
      return
    }
    setAddressWarning(false)
    onTriggerUpload(doc.id)
  }

  return (
    <article className="gst-doc-card">
      <div className="gst-doc-card__body">
        {/* Left details */}
        <div className="gst-doc-card__left">
          <div
            className="gst-doc-card__icon"
            style={{ backgroundColor: doc.iconBg, color: doc.iconColor }}
            aria-hidden="true"
          >
            {getDocIcon(doc.id)}
          </div>

          <div className="gst-doc-card__details">
            <h4 className="gst-doc-card__title">
              {doc.title} <span className="gst-doc-card__asterisk">*</span>
            </h4>

            {doc.id === 'address_proof' ? (
              <div className="gst-doc-address-wrapper">
                <div
                  className={`gst-doc-dropdown-wrapper ${
                    addressWarning && !doc.addressProofType
                      ? 'gst-doc-dropdown-wrapper--warning'
                      : ''
                  }`}
                >
                  <select
                    className={`gst-doc-select ${
                      addressWarning && !doc.addressProofType ? 'gst-doc-select--warning' : ''
                    }`}
                    value={doc.addressProofType || ''}
                    onChange={(e) => {
                      if (e.target.value) setAddressWarning(false)
                      onAddressProofChange?.(e.target.value)
                    }}
                    aria-label="Select Address Proof Type"
                  >
                    <option value="">Select Address Proof</option>
                    {ADDRESS_PROOF_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {addressWarning && !doc.addressProofType && (
                  <p className="gst-doc-address-warning-text" role="alert">
                    * Choose address type
                  </p>
                )}
              </div>
            ) : (
              <p className="gst-doc-card__desc">{doc.subtitle}</p>
            )}

            {doc.isUploaded && doc.fileName && (
              <p className="gst-doc-card__filename">{doc.fileName}</p>
            )}
          </div>
        </div>

        {/* Right action/status */}
        <div className="gst-doc-card__right">
          {showUploadButtons ? (
            <div className="gst-doc-upload-btn-group">
              <button
                type="button"
                className="gst-doc-btn-upload-file"
                onClick={handleUploadClick}
              >
                <CloudUploadIcon />
                Upload File
              </button>

              {isReplacing && (
                <button
                  type="button"
                  className="gst-doc-btn-cancel-replace"
                  onClick={onCancelReplace}
                >
                  Cancel
                </button>
              )}
            </div>
          ) : (
            <span className="gst-doc-status-badge gst-doc-status-badge--uploaded">
              <CheckCircleIcon />
              Uploaded
            </span>
          )}
        </div>
      </div>

      {/* Footer: shown when document is verified/uploaded */}
      {doc.isUploaded && !isReplacing && (
        <footer className="gst-doc-card__footer">
          <button
            type="button"
            className="gst-doc-card__action-btn gst-doc-card__action-btn--view"
            onClick={() => onView(doc)}
          >
            <ViewEyeIcon />
            View Document
          </button>

          <span className="gst-doc-card__divider" aria-hidden="true" />

          <button
            type="button"
            className="gst-doc-card__action-btn"
            onClick={() => onStartReplace(doc.id)}
          >
            <ReplaceRotateIcon />
            Replace
          </button>

          <span className="gst-doc-card__divider" aria-hidden="true" />

          <button
            type="button"
            className="gst-doc-card__action-btn gst-doc-card__action-btn--delete"
            onClick={() => onDelete(doc.id)}
            title={`Delete ${doc.title}`}
          >
            <DeleteTrashIcon />
          </button>
        </footer>
      )}
    </article>
  )
}
