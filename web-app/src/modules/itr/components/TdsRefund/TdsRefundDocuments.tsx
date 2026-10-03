import React, { useState, useRef } from 'react'
import { StepActionBar } from '@shared/components'
import { TDS_DOCUMENTS, DocIcons, TdsIcons, type TdsDocumentConfig } from '../../utils/tdsRefund.constants'
import { TdsRefundProgressTracker } from './TdsRefundOverview'
import './TdsRefundDocuments.css'

import type { UploadedFileMeta } from '../../types/tdsRefund.types'
export type { UploadedFileMeta }

const VERIFICATION_CHECKLIST = [
  '256-bit Bank Grade Security',
  'Reconciliation with 26AS & AIS',
  'Next: Senior CA Review & Filing',
]

const DOCUMENT_GUIDELINES = [
  'Supported: PDF, JPG, PNG (up to 25MB).',
  'Password-protected PDFs accepted (standard ITD format).',
  'Form 16 & AIS can be downloaded from ITD portal.',
  'Clear scans prevent verification delays.',
]

export const TdsRefundDocumentsSidebar: React.FC = () => (
  <aside className="tds-docs-sidebar" aria-label="Document verification and guidelines">
    <div className="tds-progression-card">
      <span className="tds-progression-badge">Stage 2 in Progress</span>
      <h3 className="tds-progression-title">Document Verification</h3>
      <p className="tds-progression-desc">
        Uploaded files are securely scanned and matched with ITD records for refund accuracy.
      </p>

      <div className="tds-progression-checklist">
        {VERIFICATION_CHECKLIST.map((item) => (
          <div key={item} className="tds-progression-item">
            <TdsIcons.Checkmark />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="tds-progression-security">
        <div className="tds-prog-sec-row">
          <TdsIcons.Shield />
          <span>ISO 27001 Certified Vault</span>
        </div>
        <div className="tds-prog-sec-row">
          <TdsIcons.Zap />
          <span>Instant CA validation upon filing</span>
        </div>
      </div>
    </div>

    <div className="tds-sidebar-card tds-sidebar-trust-card">
      <div className="tds-trust-icon-box">
        <TdsIcons.Shield />
      </div>
      <div>
        <h4 className="tds-trust-title">Dedicated Tax Expert Review</h4>
        <p className="tds-trust-desc">
          A Senior Chartered Accountant checks all deductions and validates proofs before ITD submission.
        </p>
      </div>
    </div>

    <div className="tds-sidebar-card tds-sidebar-tip-card">
      <h4 className="tds-tip-title">Document Guidelines</h4>
      <ul className="tds-tip-list">
        {DOCUMENT_GUIDELINES.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </div>
  </aside>
)

export interface TdsRefundDocumentsProps {
  onBack: () => void
  onNext?: () => void
  onSaveDraft?: () => void
  initialUploads?: Record<string, UploadedFileMeta>
  onUploadsChange?: (uploads: Record<string, UploadedFileMeta>) => void
}

const formatFileSize = (bytes: number): string =>
  bytes > 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`

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
  const uploadedCount = Math.min(totalCount, Object.keys(uploads).length)
  const percent = Math.round((uploadedCount / totalCount) * 100)

  const handleFileChange = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return

      const newUploads = {
        ...uploads,
        [docId]: { name: file.name, size: formatFileSize(file.size) },
      }
      setUploads(newUploads)
      onUploadsChange?.(newUploads)
    } catch {
      // Safe fallback
    }
  }

  const handleRemove = (docId: string) => {
    try {
      const updated = { ...uploads }
      delete updated[docId]
      setUploads(updated)
      onUploadsChange?.(updated)
      if (fileInputRefs.current[docId]) {
        fileInputRefs.current[docId]!.value = ''
      }
    } catch {
      // Safe fallback
    }
  }

  const triggerUpload = (docId: string) => {
    try {
      fileInputRefs.current[docId]?.click()
    } catch {
      // Safe fallback
    }
  }

  const isDocumentsValid = Boolean(uploads['pan'] && (uploads['aadhaar'] || uploads['form16']))

  const renderProgressCard = () => (
    <div className="tds-docs-progress-card">
      <div className="tds-docs-progress-labels">
        <span className="tds-docs-progress-count">
          <strong>{uploadedCount}</strong> of <strong>{totalCount}</strong> documents uploaded
        </span>
        <span className="tds-docs-progress-percent">{percent}% Completed</span>
      </div>
      <div className="tds-docs-progress-bar-track">
        <div className={`tds-docs-progress-bar-fill tds-docs-progress-bar-fill--${uploadedCount}`} />
      </div>
    </div>
  )

  const renderDocumentCard = (doc: TdsDocumentConfig) => {
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
          className="tds-doc-file-input-hidden"
          onChange={(e) => handleFileChange(doc.id, e)}
          accept=".pdf,.jpg,.jpeg,.png"
        />

        <div className="tds-doc-info-wrap">
          <div className={`tds-doc-icon-box tds-doc-icon-box--${doc.id}`}>
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
  }

  return (
    <div className="tds-docs-page">
      <div className="tds-docs-stepper-wrap">
        <TdsRefundProgressTracker currentStep={2} />
      </div>
      <div className="tds-docs-layout">
        <main className="tds-docs-main">
          {renderProgressCard()}
          <div className="tds-docs-list">
            {TDS_DOCUMENTS.map(renderDocumentCard)}
          </div>
        </main>
        <TdsRefundDocumentsSidebar />
      </div>
      <StepActionBar
        onBack={onBack}
        onNext={onNext}
        onSaveDraft={onSaveDraft}
        nextLabel="Continue"
        nextDisabled={!isDocumentsValid}
        nextTestId="tds-docs-proceed-btn"
      />
    </div>
  )
}

export default TdsRefundDocuments
