import React, { useRef, useState } from 'react'
import { StepActionBar } from '@shared/components'
import { type NoticeFormData, ASSESSMENT_YEAR_OPTIONS, NOTICE_TYPE_OPTIONS } from '../../types/taxNoticeAssistance.types'
import {
  AlertTriangle as AlertTriangleIcon, Calendar as CalendarIcon, CheckCircle2 as CheckCircleIcon,
  ChevronDown as ChevronDownIcon, Clock as ClockIcon, FileText as FileTextIcon, Info as InfoIcon,
  ShieldCheck as ShieldCheckIcon,
} from 'lucide-react'
import './NoticeInformation.css'

export interface NoticeInformationProps {
  formData: NoticeFormData; onChange: (patch: Partial<NoticeFormData>) => void
  onNext: () => void; onBack: () => void; onSaveDraftAndExit: () => void
}

export interface NoticeDocumentProps {
  formData: NoticeFormData; onChange: (patch: Partial<NoticeFormData>) => void
  onBack: () => void; onNext: () => void; onSaveDraftAndExit: () => void; isSubmitting?: boolean
}

export interface NoticeSummaryProps {
  formData: NoticeFormData; onNext: () => void; onBack: () => void; onSaveDraftAndExit: () => void
}

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
const MAX_NOTICE_FILE_BYTES = 10 * 1024 * 1024
const ALL_TOUCHED_FIELDS = { pan: true, assessmentYear: true, noticeType: true, noticeDate: true, noticeReference: true, responseDueDate: true, explanation: true }

export const formatNoticeDateDisplay = (dateStr: string, fallback = 'Not Provided'): string => {
  try {
    if (!dateStr) return fallback
    const parsed = new Date(dateStr)
    return Number.isNaN(parsed.getTime()) ? dateStr : parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return dateStr || fallback
  }
}

export const getDaysLeftText = (dueDateStr: string): string => {
  try {
    if (!dueDateStr) return '0 days left'
    const diff = Math.ceil((new Date(dueDateStr).getTime() - new Date().setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24))
    return diff > 0 ? `${diff} days left` : '0 days left'
  } catch {
    return '0 days left'
  }
}

export const extractNoticeSection = (typeStr: string): string => {
  try {
    const match = typeStr?.match(/Section\s+([0-9a-zA-Z()]+)/i)
    return match ? match[1] : '143(1)(a)'
  } catch {
    return '143(1)(a)'
  }
}

export const extractCleanNoticeType = (typeStr: string): string => {
  try {
    if (!typeStr) return 'Proposed Adjustment'
    return typeStr.includes(' - ') ? typeStr.split(' - ')[1] : typeStr
  } catch {
    return 'Proposed Adjustment'
  }
}

const formatFileSizeLabel = (bytes: number): string =>
  bytes > 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`

const validateNoticeInformation = (formData: NoticeFormData) => {
  try {
    const trimmedPan = formData.pan.trim().toUpperCase()
    const panValid = !trimmedPan || PAN_REGEX.test(trimmedPan)
    const fieldStatus = {
      hasPan: trimmedPan.length === 10 && panValid,
      hasAy: formData.assessmentYear.trim().length > 0,
      hasNoticeType: formData.noticeType.trim().length > 0,
      hasNoticeDate: formData.noticeDate.trim().length > 0,
      hasNoticeRef: formData.noticeReference.trim().length > 0,
      hasDueDate: formData.responseDueDate.trim().length > 0,
      hasExplanation: formData.explanation.trim().length > 0,
    }
    return { ...fieldStatus, canProceed: Object.values(fieldStatus).every(Boolean) }
  } catch {
    return { hasPan: false, hasAy: false, hasNoticeType: false, hasNoticeDate: false, hasNoticeRef: false, hasDueDate: false, hasExplanation: false, canProceed: false }
  }
}

export const NoticeInformation: React.FC<NoticeInformationProps> = ({ formData, onChange, onNext, onBack, onSaveDraftAndExit }) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const validation = validateNoticeInformation(formData)
  const handleBlur = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }))

  const handleSubmit = (event: React.FormEvent) => {
    try {
      event.preventDefault(); setTouched(ALL_TOUCHED_FIELDS)
      if (validation.canProceed) onNext()
    } catch {
      // Fallback
    }
  }

  const renderSelectField = (field: 'assessmentYear' | 'noticeType', label: string, options: string[], placeholder: string, hasError: boolean) => (
    <div className="notice-field">
      <label htmlFor={`notice-${field}`} className="notice-field__label">{label} <span className="notice-field__required">*</span></label>
      <div className="notice-field__select-wrapper">
        <select id={`notice-${field}`} className={`notice-field__select ${hasError ? 'notice-field__select--error' : ''}`} value={formData[field]} onChange={(e) => onChange({ [field]: e.target.value })} onBlur={() => handleBlur(field)}>
          <option value="">{placeholder}</option>
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ChevronDownIcon size={18} className="notice-field__select-icon" />
      </div>
      {hasError && <span className="notice-field__error">Please select {label}.</span>}
    </div>
  )

  const renderDateField = (field: 'noticeDate' | 'responseDueDate', label: string, hasError: boolean) => (
    <div className="notice-field">
      <label htmlFor={`notice-${field}`} className="notice-field__label">{label} <span className="notice-field__required">*</span></label>
      <div className="notice-field__date-wrapper">
        <input id={`notice-${field}`} type="date" value={formData[field]} className={`notice-field__input notice-field__input--date ${hasError ? 'notice-field__input--error' : ''}`} onChange={(e) => onChange({ [field]: e.target.value })} onBlur={() => handleBlur(field)} />
      </div>
      {hasError && <span className="notice-field__error">Please specify {label.toLowerCase()}.</span>}
    </div>
  )

  return (
    <form className="notice-form" onSubmit={handleSubmit} noValidate>
      <div className="notice-form__intro">
        <h2 className="notice-form__heading">Enter Notice Information</h2>
        <p className="notice-form__subheading">Provide details from your notice. This helps our Tax Executive analyze the legal sections and prepare your defense.</p>
      </div>
      <div className="notice-form__grid">
        <div className="notice-field">
          <label htmlFor="notice-pan" className="notice-field__label">Permanent Account Number (PAN) <span className="notice-field__required">*</span></label>
          <input id="notice-pan" type="text" maxLength={10} placeholder="e.g. CASPJ4743E" value={formData.pan} autoCapitalize="characters" className={`notice-field__input ${touched.pan && !validation.hasPan ? 'notice-field__input--error' : ''}`} onChange={(e) => onChange({ pan: e.target.value.toUpperCase() })} onBlur={() => handleBlur('pan')} />
          {touched.pan && !validation.hasPan && <span className="notice-field__error">Please enter a valid 10-character PAN (e.g. ABCDE1234F).</span>}
        </div>

        {renderSelectField('assessmentYear', 'Assessment Year (AY)', ASSESSMENT_YEAR_OPTIONS, 'Select Assessment Year', Boolean(touched.assessmentYear && !validation.hasAy))}
        {renderSelectField('noticeType', 'Notice Type / Section', NOTICE_TYPE_OPTIONS, 'Select Notice Type / Section', Boolean(touched.noticeType && !validation.hasNoticeType))}
        {renderDateField('noticeDate', 'Notice Date', Boolean(touched.noticeDate && !validation.hasNoticeDate))}

        <div className="notice-field">
          <label htmlFor="notice-ref" className="notice-field__label">Notice Reference Number / DIN <span className="notice-field__required">*</span></label>
          <input id="notice-ref" type="text" placeholder="e.g. ITBA/AST/S/143(1)/2024-25/..." value={formData.noticeReference} className={`notice-field__input ${touched.noticeReference && !validation.hasNoticeRef ? 'notice-field__input--error' : ''}`} onChange={(e) => onChange({ noticeReference: e.target.value })} onBlur={() => handleBlur('noticeReference')} />
          {touched.noticeReference && !validation.hasNoticeRef ? <span className="notice-field__error">Please enter the notice reference / DIN number.</span> : <span className="notice-field__help-text">Found at top-right corner of the IT Department notice.</span>}
        </div>

        {renderDateField('responseDueDate', 'Response Due Date', Boolean(touched.responseDueDate && !validation.hasDueDate))}

        <div className="notice-info-card notice-info-card--full">
          <InfoIcon size={20} className="notice-info-card__icon" />
          <p className="notice-info-card__text"><strong>Timely responses prevent penalty:</strong> If due date lapsed or is within 7 days, our assigned Tax Professional will flag your case as high priority for expedited filing.</p>
        </div>

        <div className="notice-field notice-field--full">
          <label htmlFor="notice-explanation" className="notice-field__label">Your Explanation / Discrepancy Summary <span className="notice-field__required">*</span></label>
          <textarea id="notice-explanation" rows={3} value={formData.explanation} placeholder="Briefly describe what discrepancy or issue the notice mentions..." className={`notice-field__textarea ${touched.explanation && !validation.hasExplanation ? 'notice-field__textarea--error' : ''}`} onChange={(e) => onChange({ explanation: e.target.value })} onBlur={() => handleBlur('explanation')} />
          {touched.explanation && !validation.hasExplanation && <span className="notice-field__error">Please provide a brief explanation.</span>}
        </div>
      </div>
      <StepActionBar onBack={onBack} onSaveDraft={onSaveDraftAndExit} nextLabel="Continue" nextType="submit" nextDisabled={!validation.canProceed} />
    </form>
  )
}

export const NoticeDocument: React.FC<NoticeDocumentProps> = ({ formData, onChange, onBack, onNext, onSaveDraftAndExit, isSubmitting = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const hasDocument = Boolean(formData.documentFileName || formData.documentFile)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0]
      if (!file) return
      if (file.size > MAX_NOTICE_FILE_BYTES) { setUploadError('File size exceeds 10MB limit.'); return }
      setUploadError(null)
      onChange({ documentFile: file, documentFileName: file.name, documentFileSize: formatFileSizeLabel(file.size) })
    } catch {
      setUploadError('Unable to process file.')
    }
  }

  const summaryRows = [
    { label: 'PAN:', value: formData.pan || '—', className: 'notice-summary-card__value--bold' },
    { label: 'Assessment Year:', value: formData.assessmentYear || '—', className: '' },
    { label: 'Notice Type:', value: formData.noticeType || '—', className: 'notice-summary-card__value--wrap' },
    { label: 'Notice Date:', value: formatNoticeDateDisplay(formData.noticeDate), className: '' },
    { label: 'Response Due Date:', value: formatNoticeDateDisplay(formData.responseDueDate), className: 'notice-summary-card__value--highlight' },
  ]

  return (
    <div className="notice-upload-container">
      <div className="notice-form__intro">
        <h2 className="notice-form__heading">Upload your Income Tax notice</h2>
        <p className="notice-form__subheading">Upload the official notice PDF or clear photograph. Our team will cross-verify the document details with your information.</p>
      </div>
      <div className="notice-step2-grid">
        <div className="notice-step2-col notice-step2-col--left">
          <div className="notice-upload-card">
            <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="notice-file-input-hidden" onChange={handleFileChange} />
            <div className="notice-upload-card__content">
              <div className="notice-upload-card__icon-box"><FileTextIcon size={24} /></div>
              <div className="notice-upload-card__meta">
                <span className="notice-upload-card__title">Notice Document</span>
                <span className="notice-upload-card__subtitle">{formData.documentFileName ? `${formData.documentFileName} (${formData.documentFileSize})` : 'PDF, JPG or PNG • Up to 10 MB'}</span>
              </div>
              {formData.documentFileName ? (
                <button type="button" className="notice-upload-card__btn notice-upload-card__btn--remove" onClick={() => { onChange({ documentFile: null, documentFileName: '', documentFileSize: '' }); if (fileInputRef.current) fileInputRef.current.value = '' }}>Remove</button>
              ) : (
                <button type="button" className="notice-upload-card__btn" onClick={() => fileInputRef.current?.click()}>Upload</button>
              )}
            </div>
            {uploadError && <span className="notice-upload-card__error">{uploadError}</span>}
          </div>
          <div className="notice-trust-card"><div className="notice-trust-card__icon"><ShieldCheckIcon size={20} /></div><p className="notice-trust-card__text">Your notice is kept strictly confidential and processed by certified tax experts under end-to-end encryption.</p></div>
        </div>

        <div className="notice-step2-col notice-step2-col--right">
          <div className="notice-summary-card">
            <h3 className="notice-summary-card__title">Entered Notice Information</h3>
            <div className="notice-summary-card__rows">
              {summaryRows.map((row) => (<div key={row.label} className="notice-summary-card__row"><span className="notice-summary-card__label">{row.label}</span><span className={`notice-summary-card__value ${row.className}`.trim()}>{row.value}</span></div>))}
            </div>
          </div>
        </div>
      </div>
      <StepActionBar
        onBack={onBack} onNext={() => { if (hasDocument) onNext(); else setUploadError('Please upload your official Income Tax notice before continuing.') }}
        onSaveDraft={onSaveDraftAndExit} backLabel="Back" nextLabel="Continue to Staff Review" nextDisabled={!hasDocument} isSubmitting={isSubmitting}
      />
    </div>
  )
}

export const NoticeSummary: React.FC<NoticeSummaryProps> = ({ formData, onNext, onBack, onSaveDraftAndExit }) => (
  <div className="notice-summary-container">
    <div className="notice-form__intro"><h2 className="notice-form__heading">Here&apos;s what this notice means</h2><p className="notice-form__subheading">A plain-language explanation from your Tax Executive — no jargon.</p></div>
    <div className="notice-summary-grid">
      <div className="notice-summary-facts-card">
        <div className="notice-summary-facts-list">
          <div className="notice-summary-fact-item"><span className="notice-summary-fact-label"><FileTextIcon size={18} />Notice Type</span><span className="notice-summary-fact-value">{extractCleanNoticeType(formData.noticeType)}</span></div>
          <div className="notice-summary-fact-item"><span className="notice-summary-fact-label"><ClockIcon size={18} />Section</span><span className="notice-summary-fact-value">{extractNoticeSection(formData.noticeType)}</span></div>
          <div className="notice-summary-fact-item"><span className="notice-summary-fact-label"><CalendarIcon size={18} />Issued Date</span><span className="notice-summary-fact-value">{formatNoticeDateDisplay(formData.noticeDate, '22 Sep 2026')}</span></div>
          <div className="notice-summary-fact-item"><span className="notice-summary-fact-label"><CalendarIcon size={18} />Response Due Date</span><span className="notice-summary-fact-value">{formatNoticeDateDisplay(formData.responseDueDate, '22 Sep 2026')}<span className="notice-summary-fact-sub">{getDaysLeftText(formData.responseDueDate)}</span></span></div>
          <div className="notice-summary-fact-item"><span className="notice-summary-fact-label"><AlertTriangleIcon size={18} />Risk Level</span><span className="notice-summary-fact-badge">Low</span></div>
        </div>
      </div>
      <div className="notice-summary-content-col">
        <div className="notice-summary-card">
          <div className="notice-summary-card__header"><div className="notice-summary-card__icon-box notice-summary-card__icon-box--blue"><FileTextIcon size={20} /></div><h3 className="notice-summary-card__title">What this notice means</h3></div>
          <p className="notice-summary-card__body">Notice received for {formData.assessmentYear || 'AY 2025–26'} regarding {extractCleanNoticeType(formData.noticeType)}. The department&apos;s records require clarification regarding your income returns and supporting documentation.</p>
        </div>
        <div className="notice-summary-card">
          <div className="notice-summary-card__header"><div className="notice-summary-card__icon-box notice-summary-card__icon-box--blue"><CheckCircleIcon size={20} /></div><h3 className="notice-summary-card__title">What action is required</h3></div>
          <p className="notice-summary-card__body">You need to confirm whether the reported items were accounted for, provide relevant proofs (AIS, Form 16, bank statements), and approve the legal response prepared by our Tax Executive.</p>
        </div>
      </div>
    </div>
    <div className="notice-summary-card notice-summary-card--highlight notice-summary-card--full-width">
      <div className="notice-summary-card__header"><div className="notice-summary-card__icon-box notice-summary-card__icon-box--green"><FileTextIcon size={20} /></div><h3 className="notice-summary-card__title">Additional Documents Required</h3></div>
      <p className="notice-summary-card__body">To prepare a strong legal reply, our Tax Executive requires supporting documents including your previous ITR, Form 16, AIS, and bank statements in the next step.</p>
    </div>
    <StepActionBar onBack={onBack} onSaveDraft={onSaveDraftAndExit} onNext={onNext} backLabel="Back" nextLabel="Upload Supporting Documents" />
  </div>
)

export default NoticeInformation
