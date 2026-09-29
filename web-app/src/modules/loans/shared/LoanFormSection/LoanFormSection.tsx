import React from 'react'
import './LoanFormSection.css'

export interface LoanFormSectionProps {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export const LoanFormSection: React.FC<LoanFormSectionProps> = ({
  icon,
  title,
  subtitle,
  children,
  className = '',
}) => {
  return (
    <section className={`loan-form-section ${className}`.trim()}>
      <div className={`loan-form-section__header ${subtitle ? 'loan-form-section__header--has-subtitle' : ''}`.trim()}>
        {icon && <div className="loan-form-section__icon-box">{icon}</div>}
        <div className="loan-form-section__titles">
          <h2 className="loan-form-section__title">{title}</h2>
          {subtitle && <p className="loan-form-section__subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="loan-form-section__content">{children}</div>
    </section>
  )
}

export default LoanFormSection
