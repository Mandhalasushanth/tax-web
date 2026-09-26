import React, { useState, useRef } from 'react'
import { GSTNoticeResponseFields } from './GSTNoticeResponseFields'
import './GSTComplianceUploadFields.css'

interface GSTComplianceUploadFieldsProps {
  requestType: string
}

const GSTComplianceUploadFieldsInner: React.FC = () => {
  const [purchaseFile, setPurchaseFile] = useState<File | null>(null)
  const [salesFile, setSalesFile] = useState<File | null>(null)
  const [arnReference, setArnReference] = useState('')
  const [remarks, setRemarks] = useState('')

  const purchaseInputRef = useRef<HTMLInputElement>(null)
  const salesInputRef = useRef<HTMLInputElement>(null)

  const handlePurchaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPurchaseFile(e.target.files[0])
    }
  }

  const handleSalesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSalesFile(e.target.files[0])
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  return (
    <div className="gst-comp-doc-card">
      {/* Header Banner */}
      <div className="gst-comp-doc-header">
        <span className="gst-comp-doc-header-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </span>
        <h3 className="gst-comp-doc-header-title">Reconciliation Documents</h3>
      </div>

      <div className="gst-comp-doc-body">
        {/* Document Row 1: Purchase Register */}
        <div className="gst-comp-doc-row">
          <div className="gst-comp-doc-info">
            <span className="gst-comp-doc-type-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </span>
            <div className="gst-comp-doc-text">
              <div className="gst-comp-doc-title-wrapper">
                <h4 className="gst-comp-doc-name">Purchase Register</h4>
                <span className="gst-comp-req-badge">REQUIRED</span>
              </div>
              <p className="gst-comp-doc-sub">Upload purchase register for reconciliation (GSTR-2B)</p>
            </div>
          </div>

          <div className="gst-comp-doc-actions">
            <input
              type="file"
              ref={purchaseInputRef}
              onChange={handlePurchaseChange}
              style={{ display: 'none' }}
              accept=".pdf,.xlsx,.xls,.csv,.jpg,.png"
            />

            {!purchaseFile ? (
              <div className="gst-comp-upload-cta">
                <button
                  type="button"
                  className="gst-comp-upload-btn"
                  onClick={() => purchaseInputRef.current?.click()}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload File
                </button>
                <span className="gst-comp-format-hint">Supported formats: PDF, JPG, PNG (Max 10 MB)</span>
              </div>
            ) : (
              <div className="gst-comp-uploaded-file-bar">
                <div className="gst-comp-file-details">
                  <span className="gst-comp-file-check">✓</span>
                  <span className="gst-comp-file-name">{purchaseFile.name}</span>
                  <span className="gst-comp-file-size">({formatFileSize(purchaseFile.size)})</span>
                </div>
                <div className="gst-comp-file-controls">
                  <button
                    type="button"
                    className="gst-comp-replace-btn"
                    onClick={() => purchaseInputRef.current?.click()}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 4 23 10 17 10" />
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                    Replace
                  </button>
                  <button
                    type="button"
                    className="gst-comp-delete-btn"
                    onClick={() => setPurchaseFile(null)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Document Row 2: Sales Register */}
        <div className="gst-comp-doc-row">
          <div className="gst-comp-doc-info">
            <span className="gst-comp-doc-type-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </span>
            <div className="gst-comp-doc-text">
              <div className="gst-comp-doc-title-wrapper">
                <h4 className="gst-comp-doc-name">Sales Register</h4>
                <span className="gst-comp-req-badge">REQUIRED</span>
              </div>
              <p className="gst-comp-doc-sub">Upload sales register for reconciliation (GSTR-2B)</p>
            </div>
          </div>

          <div className="gst-comp-doc-actions">
            <input
              type="file"
              ref={salesInputRef}
              onChange={handleSalesChange}
              style={{ display: 'none' }}
              accept=".pdf,.xlsx,.xls,.csv,.jpg,.png"
            />

            {!salesFile ? (
              <div className="gst-comp-upload-cta">
                <button
                  type="button"
                  className="gst-comp-upload-btn"
                  onClick={() => salesInputRef.current?.click()}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload File
                </button>
                <span className="gst-comp-format-hint">Supported formats: PDF, JPG, PNG (Max 10 MB)</span>
              </div>
            ) : (
              <div className="gst-comp-uploaded-file-bar">
                <div className="gst-comp-file-details">
                  <span className="gst-comp-file-check">✓</span>
                  <span className="gst-comp-file-name">{salesFile.name}</span>
                  <span className="gst-comp-file-size">({formatFileSize(salesFile.size)})</span>
                </div>
                <div className="gst-comp-file-controls">
                  <button
                    type="button"
                    className="gst-comp-replace-btn"
                    onClick={() => salesInputRef.current?.click()}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 4 23 10 17 10" />
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                    Replace
                  </button>
                  <button
                    type="button"
                    className="gst-comp-delete-btn"
                    onClick={() => setSalesFile(null)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reference / ARN Input */}
        <div className="gst-comp-extra-field">
          <input
            type="text"
            placeholder="Enter GSTR-2B reference or ARN (if any)"
            value={arnReference}
            onChange={(e) => setArnReference(e.target.value)}
            className="gst-comp-input"
          />
        </div>

        {/* Remarks Textarea with Character Counter */}
        <div className="gst-comp-extra-field">
          <div className="gst-comp-textarea-wrapper">
            <textarea
              rows={3}
              maxLength={500}
              placeholder="Tell us anything our CA should know..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="gst-comp-textarea"
            />
            <span className="gst-comp-char-counter">{remarks.length}/500</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const GSTComplianceUploadFields: React.FC<GSTComplianceUploadFieldsProps> = ({ requestType }) => {
  if (!requestType) return null

  if (requestType === 'Notice Response') {
    return <GSTNoticeResponseFields />
  }

  return <GSTComplianceUploadFieldsInner />
}

export default GSTComplianceUploadFields
