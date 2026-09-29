import React from 'react'

export interface ReviewApplicationSectionProps {
  onNavigateToStep: (step: number) => void
  isOpen: boolean
  onToggle: () => void
}

const LayersSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

const CheckCircleFillSvg: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#22c55e" stroke="#ffffff" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const REVIEW_SECTIONS_LIST = [
  { step: 1, label: 'Applicant & Project', icon: 'user' },
  { step: 2, label: 'Location, Land & Technical', icon: 'pin' },
  { step: 3, label: 'Project Cost & Funding', icon: 'box' },
  { step: 4, label: 'Market & Financials', icon: 'chart' },
  { step: 5, label: 'Loan Requirement & Repayment', icon: 'calendar' },
  { step: 6, label: 'Security & Compliance', icon: 'shield' },
  { step: 7, label: 'Documents', icon: 'file' },
]

export const ReviewApplicationSection: React.FC<ReviewApplicationSectionProps> = ({
  onNavigateToStep,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="pf-collapsible-card">
      <div className="pf-collapsible-header" onClick={onToggle}>
        <div className="pf-collapsible-header__left">
          <div className="pf-section-icon-tile pf-section-icon-tile--orange">
            <LayersSvg />
          </div>
          <h2 className="pf-collapsible-title">2. Review Application</h2>
        </div>
        <ChevronSvg isOpen={isOpen} />
      </div>

      {isOpen && (
        <div className="pf-collapsible-body">
          <p className="pf-section-intro-desc">
            Review your entered details before submitting. You can go back and edit if needed.
          </p>

          <div className="pf-review-steps-list">
            {REVIEW_SECTIONS_LIST.map((sec) => (
              <div key={sec.step} className="pf-review-step-row">
                <div className="pf-review-step-left">
                  <span className="pf-review-step-label">{sec.label}</span>
                </div>

                <div className="pf-review-step-right">
                  <div className="pf-review-completed-badge">
                    <CheckCircleFillSvg />
                    <span>Completed</span>
                  </div>

                  <button
                    type="button"
                    className="pf-review-edit-action"
                    onClick={() => onNavigateToStep(sec.step === 7 ? 7 : sec.step)}
                  >
                    <span>Edit</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
