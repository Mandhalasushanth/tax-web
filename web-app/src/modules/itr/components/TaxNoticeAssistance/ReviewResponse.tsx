import React, { useState } from 'react'
import type { NoticeFormData } from '../../types/taxNoticeAssistance.types'
import { FileText as FileTextIcon, ShieldCheck as ShieldCheckIcon } from 'lucide-react'
import { extractNoticeSection } from './NoticeInformation'
import './ReviewResponse.css'

export interface ReviewResponseProps {
  formData: NoticeFormData
  userName?: string
  onEditRequest: () => void
  onApproveAndSubmit: () => void
  isSubmitting: boolean
}

const getDefaultNoticeDate = (): string => {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date())
  } catch {
    return 'Today'
  }
}

export const ReviewResponse: React.FC<ReviewResponseProps> = ({
  formData,
  userName = 'Assessee',
  onEditRequest,
  onApproveAndSubmit,
  isSubmitting,
}) => {
  const [confirmed, setConfirmed] = useState(formData.responseConfirmed || false)

  const noticeRef = formData.noticeReference || '—'
  const noticeDate = formData.noticeDate || getDefaultNoticeDate()
  const pan = formData.pan || '—'
  const ay = formData.assessmentYear || 'AY 2026–27'
  const section = extractNoticeSection(formData.noticeType)

  const renderWhyReviewCard = () => (
    <div className="review-response-why-card">
      <ShieldCheckIcon size={24} className="review-response-why-card__icon" />
      <div className="review-response-why-card__content">
        <h4 className="review-response-why-card__title">Why Assessee Review is Required</h4>
        <p className="review-response-why-card__desc">
          Under Income Tax regulations, any response submitted on the portal is legally binding upon
          the taxpayer. We require your review to ensure all stated figures, explanations, and
          challan payments are verified by you prior to formal filing.
        </p>
      </div>
    </div>
  )

  const renderLetterCard = () => (
    <div className="review-response-letter-card">
      <div className="review-response-letter-card__header">
        <div className="review-response-letter-card__icon-box">
          <FileTextIcon size={20} />
        </div>
        <h3 className="review-response-letter-card__title">Response drafted by Tax Executive</h3>
      </div>

      <div className="review-response-letter-card__body">
        <p>Respected Sir/Madam,</p>
        <p>
          With reference to the intimation under section {section} bearing number{' '}
          <strong>{noticeRef}</strong> dated {noticeDate}, we respectfully submit the following
          response on behalf of the assessee, <strong>{userName}</strong> (PAN {pan}), for {ay}.
        </p>
        <p>
          The proposed adjustment relates to interest income reflected in the Annual Information
          Statement (AIS) and Form 26AS. The assessee confirms that the accounts and corresponding
          statements have been reconciled. The assessee agrees with the proposed adjustment and any
          resulting tax adjustments have been duly computed. A copy of the relevant supporting
          documentation and challan payment proof is enclosed for verification.
        </p>
        <p>We request that the return be processed accordingly.</p>
        <div className="review-response-letter-card__closing">
          <p className="review-response-closing-text">Yours faithfully,</p>
          <p className="review-response-closing-org">For TaxEdge Fin Solutions</p>
          <p className="review-response-closing-author">Meera Iyer, Tax Executive</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="review-response-container">
      <div className="notice-form__intro">
        <h2 className="notice-form__heading">Please review our response</h2>
        <p className="notice-form__subheading">
          Your Tax Executive has prepared the following response to the Income Tax Department.
        </p>
      </div>
      {renderWhyReviewCard()}
      {renderLetterCard()}
      <label className="review-response-confirm-box">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        <span className="review-response-confirm-box__text">
          I have reviewed the response and confirm that the details are correct.
        </span>
      </label>
      <div className="review-response-actions">
        <button
          type="button"
          className="review-response-actions__btn review-response-actions__btn--edit"
          onClick={onEditRequest}
          disabled={isSubmitting}
        >
          <span>Edit Request</span>
        </button>

        <button
          type="button"
          className="review-response-actions__btn review-response-actions__btn--submit"
          onClick={onApproveAndSubmit}
          disabled={!confirmed || isSubmitting}
        >
          <span>{isSubmitting ? 'Submitting Response...' : 'Approve & Submit'}</span>
        </button>
      </div>
    </div>
  )
}

export default ReviewResponse
