import React, { useRef } from 'react'
import { StepActionBar } from '@shared/components'
import {
  type UploadedDocInfo,
  type ChecklistDocConfig,
  REQUIRED_DOCS,
  RECOMMENDED_DOCS,
  ALL_DOCS,
  IconUpload,
} from '../itrFiling.constants'
import { ItrStepHeaderStepper } from '../ItrStepHeaderStepper'
import './ItrStepDocumentsView.css'

export type { UploadedDocInfo }

/* ==========================================================================
   1. Document Item Row
   ========================================================================== */
interface ItrDocItemRowProps {
  doc: ChecklistDocConfig
  uploaded?: UploadedDocInfo
  onTriggerUpload: (docId: string) => void
  onRemoveDoc: (docId: string) => void
}

const ItrDocItemRow: React.FC<ItrDocItemRowProps> = ({
  doc,
  uploaded,
  onTriggerUpload,
  onRemoveDoc,
}) => (
  <div className={`itr-doc-item ${uploaded ? 'itr-doc-item--uploaded' : ''}`}>
    <div className="itr-doc-item__left">
      <div className="itr-doc-icon-box" aria-hidden="true">
        <doc.Icon />
      </div>
      <div className="itr-doc-item__titles">
        <h4 className="itr-doc-item__title">{doc.title}</h4>
        <p className="itr-doc-item__desc">{doc.desc}</p>
        {uploaded && (
          <div className="itr-doc-uploaded-meta">
            <span>✓ {uploaded.fileName}</span>
            <span>({uploaded.fileSize})</span>
          </div>
        )}
      </div>
    </div>

    <div className="itr-doc-item__actions">
      {uploaded ? (
        <button
          type="button"
          className="itr-btn-remove-doc"
          onClick={() => onRemoveDoc(doc.id)}
          aria-label={`Remove ${doc.title}`}
        >
          Remove
        </button>
      ) : (
        <button
          type="button"
          className="itr-btn-upload"
          onClick={() => onTriggerUpload(doc.id)}
          aria-label={`Upload ${doc.title}`}
        >
          <IconUpload />
          <span>Upload File</span>
        </button>
      )}
    </div>
  </div>
)

/* ==========================================================================
   2. Main Step 4 View
   ========================================================================== */
export interface ItrStepDocumentsViewProps {
  onBack: () => void
  onNext: () => void
  onSaveDraft?: () => void
  uploadedDocs: Record<string, UploadedDocInfo>
  onUploadDoc: (docId: string, doc: UploadedDocInfo) => void
  onRemoveDoc: (docId: string) => void
}

export const ItrStepDocumentsView: React.FC<ItrStepDocumentsViewProps> = ({
  onBack,
  onNext,
  onSaveDraft,
  uploadedDocs,
  onUploadDoc,
  onRemoveDoc,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const currentTargetDocId = useRef<string>('')

  const totalPossible = ALL_DOCS.length
  const uploadedCount = Object.keys(uploadedDocs).length
  const readyPercent = Math.round((uploadedCount / totalPossible) * 100)

  const handleTriggerUpload = (docId: string) => {
    currentTargetDocId.current = docId
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && currentTargetDocId.current) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2)
      onUploadDoc(currentTargetDocId.current, {
        id: currentTargetDocId.current,
        fileName: file.name,
        fileSize: `${sizeMb} MB`,
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      })
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const isStep4Valid = REQUIRED_DOCS.every(
    (doc) => !doc.isMandatory || Boolean(uploadedDocs[doc.id])
  )

  return (
    <div className="itr-step-view-container">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="itr-file-input-hidden"
        onChange={handleFileChange}
      />

      {/* 5-Step Progress Stepper */}
      <ItrStepHeaderStepper currentStepId={4} />

      {/* Status & Shield Card */}
      <div className="itr-step-card">
        <div className="itr-docs-status-bar">
          <span className="itr-docs-count-text">
            Documents Uploaded: {uploadedCount} of {totalPossible}
          </span>
          <span className="itr-badge-ready">{readyPercent}% Ready</span>
        </div>

        <div className="itr-docs-shield-card">
          <div className="itr-docs-shield-icon" aria-hidden="true">🛡️</div>
          <div className="itr-docs-shield-content">
            <h3 className="itr-docs-shield-title">Document Checklist</h3>
            <p className="itr-docs-shield-sub">
              Upload applicable documents for CA review. PAN and Aadhaar identity are pre-verified from your profile.
            </p>
          </div>
        </div>
      </div>

      {/* Required Documents */}
      <div className="itr-step-card">
        <div className="itr-docs-section-title-wrap">
          <h3 className="itr-docs-section-title">Required Documents</h3>
          <span className="itr-badge-mandatory">Mandatory ({REQUIRED_DOCS.length})</span>
        </div>
        <div className="itr-docs-list">
          {REQUIRED_DOCS.map((doc) => (
            <ItrDocItemRow
              key={doc.id}
              doc={doc}
              uploaded={uploadedDocs[doc.id]}
              onTriggerUpload={handleTriggerUpload}
              onRemoveDoc={onRemoveDoc}
            />
          ))}
        </div>
      </div>

      {/* Recommended Documents */}
      <div className="itr-step-card">
        <div className="itr-docs-section-title-wrap">
          <h3 className="itr-docs-section-title">Recommended Documents</h3>
          <span className="itr-badge-recommended">Recommended ({RECOMMENDED_DOCS.length})</span>
        </div>
        <div className="itr-docs-list">
          {RECOMMENDED_DOCS.map((doc) => (
            <ItrDocItemRow
              key={doc.id}
              doc={doc}
              uploaded={uploadedDocs[doc.id]}
              onTriggerUpload={handleTriggerUpload}
              onRemoveDoc={onRemoveDoc}
            />
          ))}
        </div>
      </div>

      <StepActionBar
        onBack={onBack}
        onNext={onNext}
        onSaveDraft={onSaveDraft}
        backLabel="Back"
        nextLabel="Continue"
        nextDisabled={!isStep4Valid}
      />
    </div>
  )
}

export default ItrStepDocumentsView
