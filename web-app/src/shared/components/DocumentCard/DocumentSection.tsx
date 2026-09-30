import React from 'react'
import './DocumentSection.css'

export interface DocumentSectionProps {
  title?: string
  icon?: React.ReactNode
  badgeLabel?: string
  badgeType?: 'mandatory' | 'recommended' | 'optional' | 'default'
  variant?: 'card' | 'flat'
  children: React.ReactNode
  className?: string
}

export const DocumentSection: React.FC<DocumentSectionProps> = ({
  title,
  icon,
  badgeLabel,
  badgeType = 'default',
  variant = 'flat',
  children,
  className = '',
}) => {
  const isCard = variant === 'card'

  return (
    <section
      className={`taxedge-doc-section ${isCard ? 'taxedge-doc-section--card' : 'taxedge-doc-section--flat'} ${className}`}
    >
      {title && (
        <div className={isCard ? 'taxedge-doc-section__header' : 'taxedge-doc-section__header-flat'}>
          <div className="taxedge-doc-section__title-wrap">
            {icon && <span className="taxedge-doc-section__header-icon">{icon}</span>}
            <h3 className={isCard ? 'taxedge-doc-section__title' : 'taxedge-doc-section__title-flat'}>
              {title}
            </h3>
          </div>
          {badgeLabel && (
            <span className={`taxedge-doc-badge taxedge-doc-badge--${badgeType}`}>
              {badgeLabel}
            </span>
          )}
        </div>
      )}
      <div className="taxedge-doc-section__list">
        {children}
      </div>
    </section>
  )
}

export default DocumentSection
