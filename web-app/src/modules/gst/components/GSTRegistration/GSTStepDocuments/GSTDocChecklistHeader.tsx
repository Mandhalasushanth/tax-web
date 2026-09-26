import type { FC } from 'react'
import { DocChecklistIcon } from '../../../shared/GSTDocIcons/GSTDocIcons'
import './GSTDocChecklistHeader.css'

interface GSTDocChecklistHeaderProps {
  completedCount: number
  totalCount: number
  progressPercent: number
}

export const GSTDocChecklistHeader: FC<GSTDocChecklistHeaderProps> = ({
  completedCount,
  totalCount,
  progressPercent,
}) => {
  return (
    <section className="gst-docs-checklist-card" aria-label="Upload Progress">
      <div className="gst-docs-checklist-card__header">
        <div className="gst-docs-checklist-card__info">
          <div className="gst-docs-checklist-card__icon-badge">
            <DocChecklistIcon width={20} height={20} />
          </div>
          <div>
            <h2 className="gst-docs-checklist-card__title">Document Checklist</h2>
            <p className="gst-docs-checklist-card__subtitle">
              Upload original clear photos or scanned copies
            </p>
          </div>
        </div>
        <div className="gst-docs-checklist-card__badge">
          {completedCount}/{totalCount} Completed
        </div>
      </div>

      <div
        className="gst-docs-checklist-card__progress-track"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="gst-docs-checklist-card__progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </section>
  )
}
