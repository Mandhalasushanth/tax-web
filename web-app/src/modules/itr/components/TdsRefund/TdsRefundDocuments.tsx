import React, { useState, useRef } from 'react'
import { TDS_DOCUMENTS, DocIcons, type TdsDocumentConfig } from '../../utils/tdsRefundDocuments.constants'
import { StepActionBar } from '@shared/components'
import { TdsRefundStepTracker } from './TdsRefundStepTracker'
import './TdsRefundDocuments.css'

export interface UploadedFileMeta {
  name: string
  size: string
}

export const TdsRefundDocumentsSidebar: React.FC = () => {
  return (
    <aside className="tds-docs-sidebar" aria-label="Document verification and guidelines">
      {/* 1. Stage 2 Progression Card */}
      <div className="tds-progression-card">
        <span className="tds-progression-badge">Stage 2 in Progress</span>
        <h3 className="tds-progression-title">Document Verification</h3>
        <p className="tds-progression-desc">
          Uploaded files are securely scanned and matched with ITD records for refund accuracy.
        </p>

        <div className="tds-progression-checklist">
          <div className="tds-progression-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>256-bit Bank Grade Security</span>
          </div>
          <div className="tds-progression-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Reconciliation with 26AS &amp; AIS</span>
          </div>
          <div className="tds-progression-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Next: Senior CA Review &amp; Filing</span>
          </div>
        </div>

        <div className="tds-progression-security">
          <div className="tds-prog-sec-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>ISO 27001 Certified Vault</span>
          </div>
          <div className="tds-prog-sec-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>Instant CA validation upon filing</span>
          </div>
        </div>
      </div>

      {/* 2. Expert CA Review Trust Card */}
      <div className="tds-sidebar-card tds-sidebar-trust-card">
        <div className="tds-trust-icon-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div>
          <h4 className="tds-trust-title">Dedicated Tax Expert Review</h4>
          <p className="tds-trust-desc">
            A Senior Chartered Accountant checks all deductions and validates proofs before ITD submission.
          </p>
        </div>
      </div>

      {/* 3. Document Guidelines Checklist Card */}
      <div className="tds-sidebar-card tds-sidebar-tip-card">
        <h4 className="tds-tip-title">Document Guidelines</h4>
        <ul className="tds-tip-list">
          <li>Supported: PDF, JPG, PNG (up to 25MB).</li>
          <li>Password-protected PDFs accepted (standard ITD format).</li>
          <li>Form 16 &amp; AIS can be downloaded from ITD portal.</li>
          <li>Clear scans prevent verification delays.</li>
        </ul>
      </div>
    </aside>
  )
}

export interface TdsRefundDocumentsProps {
  onBack: () => void
  onNext?: () => void
  onSaveDraft?: () => void
  initialUploads?: Record<string, UploadedFileMeta>
  onUploadsChange?: (uploads: Record<string, UploadedFileMeta>) => void
}

export const TdsRefundDocuments: React.FC<TdsRefundDocumentsProps> = ({
  onBack,
  onNext,
  onSaveDraft,
  initialUploads,
  onUploadsChange,
}) => {
  const [uploads, setUploads] = useState<Record<string, UploadedFileMeta>>(initialUploads || {})
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const totalCount = TDS_DOCUMENTS.length
  const uploadedCount = Object.keys(uploads).length
  const percent = Math.round((uploadedCount / totalCount) * 100)

  const handleFileChange = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const sizeStr = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`

    const newUploads = {
      ...uploads,
      [docId]: {
        name: file.name,
        size: sizeStr,
      },
    }
    setUploads(newUploads)
    onUploadsChange?.(newUploads)
  }

  const handleRemove = (docId: string) => {
    const updated = { ...uploads }
    delete updated[docId]
    setUploads(updated)
    onUploadsChange?.(updated)
    if (fileInputRefs.current[docId]) {
      fileInputRefs.current[docId]!.value = ''
    }
  }

  const triggerUpload = (docId: string) => {
    fileInputRefs.current[docId]?.click()
  }

  const isStep2Valid = Boolean(uploads['pan'] && uploads['aadhaar'])

  return (
    <div className="tds-docs-page">
      {/* Centered Stepper Track */}
      <div className="tds-docs-stepper-wrap">
        <TdsRefundStepTracker currentStep={2} />
      </div>

      {/* 2-Column Desktop Grid Layout */}
      <div className="tds-docs-layout">
        {/* Main Document List Column */}
        <main className="tds-docs-main">
          {/* Progress Card */}
          <div className="tds-docs-progress-card">
            <div className="tds-docs-progress-labels">
              <span className="tds-docs-progress-count">
                <strong>{uploadedCount}</strong> of <strong>{totalCount}</strong> documents uploaded
              </span>
              <span className="tds-docs-progress-percent">{percent}% Completed</span>
            </div>
            <div className="tds-docs-progress-bar-track">
              <div
                className="tds-docs-progress-bar-fill"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* List of Documents */}
          <div className="tds-docs-list">
            {TDS_DOCUMENTS.map((doc: TdsDocumentConfig) => {
              const uploaded = uploads[doc.id]
              const IconComp = DocIcons[doc.id] || DocIcons.pan

              return (
                <div
                  key={doc.id}
                  className={`tds-doc-card ${uploaded ? 'tds-doc-card--uploaded' : ''}`}
                  data-testid={`tds-doc-card-${doc.id}`}
                >
                  <input
                    type="file"
                    ref={(el) => {
                      fileInputRefs.current[doc.id] = el
                    }}
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(doc.id, e)}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />

                  {/* Left Info */}
                  <div className="tds-doc-info-wrap">
                    <div
                      className="tds-doc-icon-box"
                      style={{ background: doc.bgColor, color: doc.iconColor }}
                    >
                      <IconComp />
                    </div>
                    <div className="tds-doc-texts">
                      <div className="tds-doc-title-row">
                        <span className="tds-doc-title">{doc.title}</span>
                        {doc.required ? (
                          <span className="tds-doc-required-star" title="Mandatory document">*</span>
                        ) : (
                          <span className="tds-doc-optional-tag">(Optional)</span>
                        )}
                      </div>
                      <span className="tds-doc-subtitle">{doc.subtitle}</span>
                    </div>
                  </div>

                  {/* Right Action */}
                  <div className="tds-doc-action">
                    {uploaded ? (
                      <div className="tds-doc-uploaded-state">
                        <span className="tds-doc-uploaded-pill" title={uploaded.name}>
                          ✓ {uploaded.name}
                        </span>
                        <button
                          type="button"
                          className="tds-doc-remove-btn"
                          onClick={() => handleRemove(doc.id)}
                          title="Remove file"
                          data-testid={`remove-btn-${doc.id}`}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="tds-doc-upload-btn"
                        onClick={() => triggerUpload(doc.id)}
                        data-testid={`upload-btn-${doc.id}`}
                      >
                        <span className="tds-doc-upload-arrow">↑</span>
                        <span>Upload</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </main>

        {/* Right Desktop Sidebar */}
        <TdsRefundDocumentsSidebar />
      </div>

      {/* Bottom Action Bar */}
      <StepActionBar
        onBack={onBack}
        onNext={onNext}
        onSaveDraft={onSaveDraft}
        nextLabel="Continue"
        nextDisabled={!isStep2Valid}
        nextTestId="tds-docs-proceed-btn"
      />
    </div>
  )
}

export default TdsRefundDocuments
