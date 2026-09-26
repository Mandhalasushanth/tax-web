import React from 'react'
import './CompanyTypeCard.css'

export interface CompanyTypeCardProps {
  id: string
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
  selected?: boolean
  onSelect?: (id: string) => void
}

export const CompanyTypeCard: React.FC<CompanyTypeCardProps> = ({
  id, title, description, features, icon, selected = false, onSelect
}) => {
  return (
    <div 
      className={`inc-company-type-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect && onSelect(id)}
      role="button"
      tabIndex={0}
    >
      <div className="inc-company-type-header">
        <div className="inc-company-type-icon">{icon}</div>
        <h4 className="inc-company-type-title">{title}</h4>
      </div>
      <p className="inc-company-type-desc">{description}</p>
      
      <ul className="inc-company-type-features">
        {features.map((feature, idx) => (
          <li key={idx}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className={`inc-company-type-radio ${selected ? 'checked' : ''}`}>
        <div className="inner-circle" />
      </div>
    </div>
  )
}

export default CompanyTypeCard
