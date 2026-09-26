import type { FC, ReactNode } from 'react'
import type { ReviewField } from '../../../types/gstReview.types'
import { EditPencilIcon } from '../../../shared/GSTDocIcons/GSTDocIcons'
import './GSTReviewSection.css'

interface GSTReviewSectionProps {
  title: string
  icon: ReactNode
  iconBg: string
  fields: ReviewField[]
  onEdit: () => void
}

export const GSTReviewSection: FC<GSTReviewSectionProps> = ({
  title,
  icon,
  iconBg,
  fields,
  onEdit,
}) => {
  return (
    <div className="gst-review-card">
      <div className="gst-review-card__header">
        <div className="gst-review-card__header-left">
          <div className="gst-review-card__icon-badge" style={{ backgroundColor: iconBg }}>
            {icon}
          </div>
          <h3 className="gst-review-card__title">{title}</h3>
        </div>

        <button
          type="button"
          className="gst-review-card__edit-btn"
          onClick={onEdit}
          aria-label={`Edit ${title}`}
        >
          <EditPencilIcon
            width={14}
            height={14}
            className="gst-review-card__edit-icon"
          />
          <span>Edit</span>
        </button>
      </div>

      <div className="gst-review-card__body">
        <dl className="gst-review-fields-list">
          {fields.map((field, idx) => (
            <div key={`${field.label}-${idx}`} className="gst-review-field-row">
              <dt className="gst-review-field-label">{field.label}</dt>
              <dd className="gst-review-field-value">{field.value || '—'}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
