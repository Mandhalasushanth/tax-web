import React from 'react'

export interface ReviewSectionCardProps {
  title: string
  iconSrc: string
  themeColor: 'blue' | 'orange' | 'purple' | 'green' | 'pink'
  badge?: React.ReactNode
  onEdit?: () => void
  editLabel?: string
  countBadge?: string
  children: React.ReactNode
  testId?: string
}

/**
 * Reusable Card component for Step 5 Review sections
 * Strictly uses external CSS classes only - zero inline styles.
 */
export const ReviewSectionCard: React.FC<ReviewSectionCardProps> = ({
  title,
  iconSrc,
  themeColor,
  badge,
  onEdit,
  editLabel = 'Edit',
  countBadge,
  children,
  testId,
}) => {
  return (
    <div className={`review-card review-card--${themeColor}`} data-testid={testId}>
      <div className="review-card-header">
        <div className="review-card-header__left">
          <div className="review-card-icon-tile" aria-hidden="true">
            <img src={iconSrc} alt="" width="20" height="20" />
          </div>
          <h2 className="review-card-title">{title}</h2>
        </div>

        <div className="review-card-header__right">
          {countBadge && (
            <span className="review-card-count-badge">{countBadge}</span>
          )}

          {badge}

          {onEdit && (
            <button
              type="button"
              className="review-card-edit-btn"
              onClick={onEdit}
              aria-label={`${editLabel} ${title}`}
            >
              <img
                src="/assets/icons/loans/edit-blue.svg"
                alt=""
                width="16"
                height="16"
                aria-hidden="true"
              />
              <span>{editLabel}</span>
            </button>
          )}
        </div>
      </div>

      <div className="review-card-body">{children}</div>
    </div>
  )
}

export default ReviewSectionCard
