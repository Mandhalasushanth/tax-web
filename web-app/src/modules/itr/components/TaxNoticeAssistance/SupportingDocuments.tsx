import React, { useRef, useState } from 'react'
import { StepActionBar } from '@shared/components'
import { type NoticeFormData, type SupportingDocumentItem, SUPPORTING_DOCUMENT_LIST } from '../../types/taxNoticeAssistance.types'
import {
  AlertTriangle as AlertTriangleIcon, Landmark as BankIcon, Calculator as CalculatorIcon,
  CheckCircle2 as CheckCircleIcon, Eye as EyeIcon, FileText as FileTextIcon, FileClock as HistoryDocIcon,
  Briefcase as IconBriefcase, RefreshCw as ReplaceIcon, Trash2 as TrashIcon, TrendingUp as TrendingCategoryIcon,
  Upload as UploadIcon,
} from 'lucide-react'
import './SupportingDocuments.css'

export interface SupportingDocumentsProps {
  formData: NoticeFormData
  onChange: (patch: Partial<NoticeFormData>) => void
  onNext: () => void
  onBack: () => void
  onSaveDraftAndExit: () => void
}

interface SupportingDocRowProps {
  doc: SupportingDocumentItem
  isUploaded: boolean
  uploadInfo?: { fileName: string; fileSize: string }
  fileInputRef: (el: HTMLInputElement | null) => void
  onFileUpload: (file: File) => void
  onView: () => void
  onReplace: () => void
  onRemove: () => void
}

const DOC_COLOR_MAP: Record<string, string> = {
  'tax-notice': 'blue', 'previous-itr': 'blue', 'itr-ack': 'purple', 'form-16': 'purple',
  ais: 'indigo', tis: 'indigo', 'bank-statements': 'blue', 'supporting-income': 'orange', 'supporting-expense': 'orange',
}

const DOC_ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  'tax-notice': FileTextIcon, 'form-16': FileTextIcon, 'itr-ack': FileTextIcon,
  ais: TrendingCategoryIcon, 'supporting-income': TrendingCategoryIcon, 'bank-statements': BankIcon,
  tis: CalculatorIcon, 'supporting-expense': IconBriefcase, 'previous-responses': HistoryDocIcon,
}

export const getDocColor = (id: string): string => {
  try {
    return DOC_COLOR_MAP[id] || 'blue'
  } catch {
    return 'blue'
  }
}

export const getDocIcon = (id: string): React.ReactNode => {
  try {
    const IconComponent = DOC_ICON_MAP[id] || FileTextIcon
    return <IconComponent size={20} />
  } catch {
    return <FileTextIcon size={20} />
  }
}

const formatFileSizeLabel = (bytes: number): string => {
  try {
    return bytes > 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
  } catch {
    return '0 KB'
  }
}

const buildInitialSupportingDocs = (
  formData: NoticeFormData
): Record<string, { fileName: string; fileSize: string; fileUrl?: string }> => {
  try {
    const initial: Record<string, { fileName: string; fileSize: string; fileUrl?: string }> = { ...(formData.supportingDocuments || {}) }
    if (formData.documentFileName && !initial['tax-notice']) {
      initial['tax-notice'] = { fileName: formData.documentFileName, fileSize: formData.documentFileSize || '2.4 MB' }
    }
    return initial
  } catch {
    return {}
  }
}

export const SupportingDocRow: React.FC<SupportingDocRowProps> = ({
  doc, isUploaded, uploadInfo, fileInputRef, onFileUpload, onView, onReplace, onRemove,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0]
      if (file) onFileUpload(file)
    } catch {
      // No-op
    }
  }

  return (
    <div className={`supporting-doc-item ${isUploaded ? 'supporting-doc-item--uploaded' : ''}`}>
      <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx" className="supporting-file-input-hidden" onChange={handleInputChange} />
      <div className="supporting-doc-item__main">
        <div className="supporting-doc-item__left">
          <div className={`supporting-doc-item__icon-box supporting-doc-item__icon-box--${getDocColor(doc.id)}`}>{getDocIcon(doc.id)}</div>
          <div className="supporting-doc-item__meta">
            <span className="supporting-doc-item__title">{doc.title} {doc.required && <span className="supporting-doc-item__required">*</span>}</span>
            <span className="supporting-doc-item__subtitle">{doc.subtitle}</span>
            {isUploaded && uploadInfo && <span className="supporting-doc-item__filename">{uploadInfo.fileName} ({uploadInfo.fileSize})</span>}
          </div>
        </div>
        {isUploaded ? (
          <div className="supporting-doc-item__uploaded-badge"><CheckCircleIcon size={15} /><span>Uploaded</span></div>
        ) : (
          <button type="button" className="supporting-doc-item__upload-btn" onClick={onReplace}>
            <UploadIcon size={17} className="supporting-doc-item__cloud-icon" /><span>Upload</span>
          </button>
        )}
      </div>

      {isUploaded && (
        <>
          <div className="supporting-doc-item__divider" />
          <div className="supporting-doc-item__bottom-bar">
            <button type="button" className="supporting-doc-item__action-link supporting-doc-item__action-link--view" onClick={onView}><EyeIcon size={16} /><span>View Document</span></button>
            <span className="supporting-doc-item__divider-vertical" aria-hidden="true" />
            <button type="button" className="supporting-doc-item__action-link supporting-doc-item__action-link--replace" onClick={onReplace}><ReplaceIcon size={16} /><span>Replace</span></button>
            <span className="supporting-doc-item__divider-vertical" aria-hidden="true" />
            <button type="button" className="supporting-doc-item__action-link supporting-doc-item__action-link--delete supporting-doc-item__trash-btn" onClick={onRemove} title="Delete document" aria-label="Delete document"><TrashIcon size={16} /><span>Delete</span></button>
          </div>
        </>
      )}
    </div>
  )
}

export const SupportingDocuments: React.FC<SupportingDocumentsProps> = ({
  formData, onChange, onNext, onBack, onSaveDraftAndExit,
}) => {
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, { fileName: string; fileSize: string; fileUrl?: string }>>(() => buildInitialSupportingDocs(formData))
  const [remarks, setRemarks] = useState(formData.remarks || '')

  const handleFileUpload = (docId: string, file: File) => {
    try {
      const fileUrl = URL.createObjectURL(file)
      const updated = { ...uploadedDocs, [docId]: { fileName: file.name, fileSize: formatFileSizeLabel(file.size), fileUrl } }
      setUploadedDocs(updated); onChange({ supportingDocuments: updated })
    } catch {
      // No-op
    }
  }

  const handleRemoveDocument = (docId: string) => {
    try {
      const updated = { ...uploadedDocs }
      delete updated[docId]; setUploadedDocs(updated); onChange({ supportingDocuments: updated })
      if (fileInputRefs.current[docId]) fileInputRefs.current[docId]!.value = ''
    } catch {
      // No-op
    }
  }

  const handleViewDocument = (docId: string) => {
    try {
      const doc = uploadedDocs[docId]
      if (doc?.fileUrl) window.open(doc.fileUrl, '_blank')
      else window.alert(`Viewing ${doc?.fileName || 'document'}`)
    } catch {
      // No-op
    }
  }

  const handleRemarksChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const val = event.target.value.slice(0, 500)
      setRemarks(val); onChange({ remarks: val })
    } catch {
      // No-op
    }
  }

  const uploadedCount = Object.keys(uploadedDocs).length
  const totalCount = SUPPORTING_DOCUMENT_LIST.length
  const progressPercent = Math.min(100, Math.round((uploadedCount / totalCount) * 100))
  const boundedCount = Math.min(totalCount, Math.max(0, uploadedCount))
  const missingRequiredDocs = SUPPORTING_DOCUMENT_LIST.filter((doc) => doc.required && !uploadedDocs[doc.id])
  const canProceed = missingRequiredDocs.length === 0

  return (
    <div className="supporting-docs-container">
      <div className="notice-form__intro">
        <h2 className="notice-form__heading">Upload Supporting Documents</h2>
        <p className="notice-form__subheading">Upload the documents relevant to this notice. This enables our Tax Executive to verify figures and formulate your legal response.</p>
      </div>

      <div className="supporting-docs-tracker">
        <div className="supporting-docs-tracker__header">
          <span>{uploadedCount} of {totalCount} documents uploaded</span>
          <span className="supporting-docs-tracker__count">{progressPercent}%</span>
        </div>
        <div className="supporting-docs-tracker__bar-track">
          <div className={`supporting-docs-tracker__bar-fill supporting-docs-tracker__bar-fill--count-${boundedCount}`} />
        </div>
      </div>

      <div className="supporting-docs-list">
        {SUPPORTING_DOCUMENT_LIST.map((doc) => (
          <SupportingDocRow
            key={doc.id} doc={doc} isUploaded={Boolean(uploadedDocs[doc.id])} uploadInfo={uploadedDocs[doc.id]}
            fileInputRef={(el) => { fileInputRefs.current[doc.id] = el }} onFileUpload={(file) => handleFileUpload(doc.id, file)}
            onView={() => handleViewDocument(doc.id)} onReplace={() => fileInputRefs.current[doc.id]?.click()}
            onRemove={() => handleRemoveDocument(doc.id)}
          />
        ))}
      </div>

      <div className="supporting-docs-remarks">
        <label htmlFor="notice-remarks" className="supporting-docs-remarks__label">Remarks / Special Instructions (Optional)</label>
        <div className="supporting-docs-remarks__box">
          <textarea id="notice-remarks" className="supporting-docs-remarks__textarea" rows={3} placeholder="Add any additional context, transaction details, or explanation for our Tax Executive..." value={remarks} onChange={handleRemarksChange} />
          <span className="supporting-docs-remarks__counter">{remarks.length}/500</span>
        </div>
      </div>

      {missingRequiredDocs.length > 0 && (
        <div className="supporting-docs-warning" role="alert">
          <AlertTriangleIcon size={18} />
          <span>Please upload all mandatory documents (*) to proceed ({missingRequiredDocs.length} remaining).</span>
        </div>
      )}

      <StepActionBar
        onBack={onBack} onSaveDraft={onSaveDraftAndExit} onNext={() => { if (canProceed) onNext() }}
        backLabel="Back" nextLabel="Submit Documents &amp; Review Response" nextDisabled={!canProceed}
      />
    </div>
  )
}

export default SupportingDocuments
