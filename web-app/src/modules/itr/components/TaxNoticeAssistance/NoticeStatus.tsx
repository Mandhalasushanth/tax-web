import React from 'react'
import type { NoticeFormData } from '../../types/taxNoticeAssistance.types'
import { Check as CheckIcon, Clock as ClockIcon, Download as DownloadIcon } from 'lucide-react'
import { extractNoticeSection } from './NoticeInformation'
import './NoticeStatus.css'

export interface NoticeStatusProps {
  formData: NoticeFormData
  onBackToTaxServices: () => void
}

interface TimelineStepConfig {
  title: string
  tag: string
  tagTone?: 'green'
  desc: string
  status: 'completed' | 'pending'
}

const getSubmittedOnText = (submittedAt?: string): string => {
  try {
    return (
      submittedAt ||
      new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    )
  } catch {
    return 'Today'
  }
}

const buildAcknowledgementReceipt = (
  acknowledgementNo: string,
  noticeNumber: string,
  formData: NoticeFormData,
  section: string,
  submittedOn: string
): string => `TAX NOTICE ASSISTANCE ACKNOWLEDGEMENT
----------------------------------------
Acknowledgement No : ${acknowledgementNo}
Notice Reference   : ${noticeNumber}
PAN                : ${formData.pan}
Assessment Year    : ${formData.assessmentYear}
Section            : ${section}
Submission Date    : ${submittedOn}
Assigned Executive : Meera Iyer, Senior Tax Executive
Status             : Response Submitted Successfully to Income Tax Department
----------------------------------------
TaxEdge Fin Solutions - Confidential Client Receipt`

export const NoticeStatus: React.FC<NoticeStatusProps> = ({
  formData,
  onBackToTaxServices,
}) => {
  const noticeNumber = formData.noticeReference || formData.applicationCode || 'CPCGHJ257BJDFHJJK'
  const submittedOn = getSubmittedOnText(formData.submittedAt)
  const acknowledgementNo = formData.acknowledgementNo || 'ITR-2026-41262'
  const section = extractNoticeSection(formData.noticeType)

  const handleDownload = () => {
    try {
      const content = buildAcknowledgementReceipt(
        acknowledgementNo,
        noticeNumber,
        formData,
        section,
        submittedOn
      )
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Notice_Acknowledgement_${acknowledgementNo}.txt`
      link.click()
      URL.revokeObjectURL(url)
    } catch {
      // No-op
    }
  }

  const timelineSteps: TimelineStepConfig[] = [
    {
      title: 'Notice & Details Provided',
      tag: formData.assessmentYear || 'AY 2025–26',
      desc: 'Notice details and primary document submitted',
      status: 'completed',
    },
    {
      title: 'Staff Review & Verification',
      tag: 'Verified',
      tagTone: 'green',
      desc: 'Tax Executive examined notice & supporting documents',
      status: 'completed',
    },
    {
      title: 'Response Drafted & Approved',
      tag: 'Approved',
      tagTone: 'green',
      desc: 'Legal draft confirmed and signed off by assessee',
      status: 'completed',
    },
    {
      title: 'Response Submitted',
      tag: submittedOn,
      desc: 'Response successfully filed on Income Tax e-filing portal',
      status: 'completed',
    },
    {
      title: 'Department Resolution',
      tag: 'Pending',
      desc: 'Awaiting final intimation or closure order from CPC / AO',
      status: 'pending',
    },
  ]

  const detailsRows = [
    { label: 'Notice Number', value: noticeNumber },
    { label: 'Section', value: section },
    { label: 'Submitted On', value: submittedOn },
    { label: 'Acknowledgement No', value: acknowledgementNo },
    { label: 'Assigned Tax Executive', value: 'Meera Iyer, Tax Executive' },
  ]

  const renderTimelineCard = () => (
    <div className="notice-status-timeline-card">
      <div className="notice-status-timeline">
        {timelineSteps.map((item) => (
          <div
            key={item.title}
            className={`notice-status-step ${item.status === 'pending' ? 'notice-status-step--pending' : ''}`}
          >
            <div className={`notice-status-step__dot notice-status-step__dot--${item.status}`}>
              {item.status === 'completed' ? <CheckIcon size={14} /> : <ClockIcon size={12} />}
            </div>
            <div className="notice-status-step__content">
              <div className="notice-status-step__header">
                <span className="notice-status-step__title">{item.title}</span>
                <span
                  className={`notice-status-step__tag ${
                    item.tagTone === 'green' ? 'notice-status-step__tag--green' : ''
                  }`}
                >
                  {item.tag}
                </span>
              </div>
              <p className="notice-status-step__desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderDetailsCard = () => (
    <div className="notice-status-details-card">
      <div className="notice-status-table">
        {detailsRows.map((row) => (
          <div key={row.label} className="notice-status-table__row">
            <span className="notice-status-table__label">{row.label}</span>
            <span className="notice-status-table__value">{row.value}</span>
          </div>
        ))}
        <div className="notice-status-table__row">
          <span className="notice-status-table__label">Current Status</span>
          <span className="notice-status-table__badge">Response Submitted</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="notice-status-container">
      <div className="notice-status-hero">
        <div className="notice-status-hero__icon">
          <CheckIcon size={38} />
        </div>
        <h2 className="notice-status-hero__title">Response Submitted Successfully</h2>
        <p className="notice-status-hero__desc">
          Your response has been submitted to the Income Tax Department. We will keep you updated on
          any further communication.
        </p>
      </div>

      <div className="notice-status-grid">
        {renderTimelineCard()}
        {renderDetailsCard()}
      </div>

      <div className="notice-status-actions">
        <button
          type="button"
          className="notice-status-actions__btn notice-status-actions__btn--download"
          onClick={handleDownload}
        >
          <DownloadIcon size={18} />
          <span>Download Filing Acknowledgement</span>
        </button>

        <button
          type="button"
          className="notice-status-actions__btn notice-status-actions__btn--primary"
          onClick={onBackToTaxServices}
        >
          <span>Back to Tax Services</span>
        </button>
      </div>
    </div>
  )
}

export default NoticeStatus
