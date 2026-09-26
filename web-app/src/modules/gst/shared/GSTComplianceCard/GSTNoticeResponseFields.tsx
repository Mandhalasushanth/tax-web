import React, { useState, useRef } from 'react'
import { DocumentCard } from '@shared/components'
import './GSTComplianceUploadFields.css'

interface GSTNoticeResponseFieldsProps {
  onPreviewDoc?: (file: File, title: string) => void
}

export const GSTNoticeResponseFields: React.FC<GSTNoticeResponseFieldsProps> = ({ onPreviewDoc }) => {
  const [noticeNumber, setNoticeNumber] = useState('')
  const [issueDate, setIssueDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [noticeFile, setNoticeFile] = useState<File | null>(null)
  const [additionalInfo, setAdditionalInfo] = useState('')

  const issueDateInputRef = useRef<HTMLInputElement>(null)
  const dueDateInputRef = useRef<HTMLInputElement>(null)

  const openIssueDatePicker = () => {
    if (issueDateInputRef.current) {
      try {
        issueDateInputRef.current.showPicker()
      } catch {
        issueDateInputRef.current.focus()
      }
    }
  }

  const openDueDatePicker = () => {
    if (dueDateInputRef.current) {
      try {
        dueDateInputRef.current.showPicker()
      } catch {
        dueDateInputRef.current.focus()
      }
    }
  }

  const handleView = () => {
    if (!noticeFile) return
    if (onPreviewDoc) {
      onPreviewDoc(noticeFile, 'Department Notice Copy')
    } else {
      const url = URL.createObjectURL(noticeFile)
      window.open(url, '_blank')
    }
  }

  return (
    <div className="gst-notice-card">
      {/* Card Header */}
      <div className="gst-notice-header">
        <div className="gst-notice-header-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <div>
          <h3 className="gst-notice-header-title">Notice Details &amp; Response</h3>
          <p className="gst-notice-header-sub">Provide the notice details and upload the required documents.</p>
        </div>
      </div>

      <div className="gst-notice-body">
        {/* Field 1: Notice Number */}
        <div className="gst-notice-field-group">
          <label className="gst-notice-label">
            Enter notice number <span className="req-asterisk">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter notice number"
            value={noticeNumber}
            onChange={(e) => setNoticeNumber(e.target.value)}
            className="gst-notice-input"
          />
        </div>

        {/* Field 2 & 3: Issue Date & Due Date (2-column row with right-aligned calendar icon) */}
        <div className="gst-notice-grid-row">
          <div className="gst-notice-field-group">
            <label className="gst-notice-label">
              Notice Issue Date <span className="req-asterisk">*</span>
            </label>
            <div className="gst-notice-date-wrapper" onClick={openIssueDatePicker}>
              <input
                ref={issueDateInputRef}
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="gst-notice-date-input"
              />
              <span className="gst-notice-date-icon" onClick={openIssueDatePicker}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
            </div>
          </div>

          <div className="gst-notice-field-group">
            <label className="gst-notice-label">
              Reply Due Date <span className="req-asterisk">*</span>
            </label>
            <div className="gst-notice-date-wrapper" onClick={openDueDatePicker}>
              <input
                ref={dueDateInputRef}
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="gst-notice-date-input"
              />
              <span className="gst-notice-date-icon" onClick={openDueDatePicker}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Upload Notice Copy Card */}
        <DocumentCard
          id="notice-copy"
          title="Upload Notice Copy"
          subtitle="Upload official GST notice copy from the tax department (PDF, PNG, JPG)"
          isRequired={true}
          isUploaded={Boolean(noticeFile)}
          fileName={noticeFile?.name}
          fileSize={noticeFile ? `${(noticeFile.size / (1024 * 1024)).toFixed(2)} MB` : undefined}
          file={noticeFile || undefined}
          accept=".pdf,.png,.jpg,.jpeg"
          onUpload={(_, file) => setNoticeFile(file)}
          onRemove={() => setNoticeFile(null)}
          onView={() => handleView()}
        />

        {/* Section 4: Additional Information */}
        <div className="gst-notice-field-group">
          <div className="gst-notice-title-box gst-notice-title-box--spaced">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" width="20" height="20">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <span className="gst-notice-section-name">Additional Information</span>
          </div>
          <div className="gst-notice-textarea-wrapper">
            <textarea
              rows={4}
              maxLength={500}
              placeholder="Add any important information for our CA team..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="gst-notice-textarea"
            />
            <span className="gst-notice-char-counter">{additionalInfo.length}/500</span>
          </div>
        </div>
      </div>
    </div>
  )
}


