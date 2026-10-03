import React from 'react'
import type { ProjectFinanceData } from '@modules/loans/types/projectFinance.types'

export interface DeclarationAndSubmitSectionProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  isDeclarationOpen: boolean
  onToggleDeclaration: () => void
  isSubmitOpen: boolean
  onToggleSubmit: () => void
  errors?: Record<string, string>
}

const EditSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
)

const SendSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const InfoCircleSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

export const DeclarationAndSubmitSection: React.FC<DeclarationAndSubmitSectionProps> = ({
  data,
  onChange,
  isDeclarationOpen,
  onToggleDeclaration,
  isSubmitOpen,
  onToggleSubmit,
  errors = {},
}) => {
  return (
    <>
      {/* 3. Declaration */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleDeclaration}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <EditSvg />
            </div>
            <h2 className="pf-collapsible-title">3. Declaration</h2>
          </div>
          <ChevronSvg isOpen={isDeclarationOpen} />
        </div>

        {isDeclarationOpen && (
          <div className="pf-collapsible-body">
            <p className="pf-section-intro-desc">
              Please confirm the following before submitting your application.
            </p>

            <div className="pf-declarations-list">
              <label className="pf-checkbox-label">
                <input
                  type="checkbox"
                  className="pf-checkbox-input"
                  checked={Boolean(data.declarationAccurateInfo)}
                  onChange={(e) => {
                    const checked = e.target.checked
                    onChange({
                      declarationAccurateInfo: checked,
                      termsAccepted: checked && Boolean(data.declarationAuthorizeVerification),
                    })
                  }}
                />
                <span className="pf-checkbox-custom" />
                <span className="pf-checkbox-text">
                  I hereby declare that the information provided is true and correct to the best of my knowledge.
                </span>
              </label>

              <label className="pf-checkbox-label">
                <input
                  type="checkbox"
                  className="pf-checkbox-input"
                  checked={Boolean(data.declarationAuthorizeVerification)}
                  onChange={(e) => {
                    const checked = e.target.checked
                    onChange({
                      declarationAuthorizeVerification: checked,
                      termsAccepted: checked && Boolean(data.declarationAccurateInfo),
                    })
                  }}
                />
                <span className="pf-checkbox-custom" />
                <span className="pf-checkbox-text">
                  I authorize the lender to verify the information and documents submitted.
                </span>
              </label>
            </div>

            {errors.termsAccepted && (
              <span className="pf-field-error-msg">{errors.termsAccepted}</span>
            )}
          </div>
        )}
      </div>

      {/* 4. Submit Application */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleSubmit}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <SendSvg />
            </div>
            <h2 className="pf-collapsible-title">4. Submit Application</h2>
          </div>
          <ChevronSvg isOpen={isSubmitOpen} />
        </div>

        {isSubmitOpen && (
          <div className="pf-collapsible-body">
            <p className="pf-section-intro-desc">
              Click submit to proceed with your project finance application.
            </p>

            <div className="pf-submit-info-box">
              <div className="pf-submit-info-box__icon">
                <InfoCircleSvg />
              </div>
              <p className="pf-submit-info-box__text">
                Our project finance credit team will review your application and reach out within 24–48 hours for appraisal and site evaluation.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
