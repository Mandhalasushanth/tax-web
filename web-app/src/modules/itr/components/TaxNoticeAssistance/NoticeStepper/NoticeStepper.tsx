import React from 'react'
import './NoticeStepper.css'

export interface NoticeStepItem {
  id: number
  label: string
}

export const NOTICE_ASSISTANCE_STEPS: NoticeStepItem[] = [
  { id: 1, label: 'Notice Details' },
  { id: 2, label: 'Upload Notice' },
  { id: 3, label: 'Notice Summary' },
  { id: 4, label: 'Supporting Docs' },
  { id: 5, label: 'Review Response' },
]

export interface NoticeStepperProps {
  currentStep: number
  onStepClick?: (stepId: number) => void
}

export const NoticeStepper: React.FC<NoticeStepperProps> = ({
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="notice-stepper-wrap" data-testid="notice-stepper">
      <div className="notice-stepper-track" aria-label="Step progress">
        {NOTICE_ASSISTANCE_STEPS.map((s, idx) => {
          const isCompleted = s.id < currentStep
          const isActive = s.id === currentStep
          const isClickable = Boolean(onStepClick && isCompleted)

          const circleClass = isCompleted
            ? 'notice-stepper-circle notice-stepper-circle--completed'
            : isActive
            ? 'notice-stepper-circle notice-stepper-circle--active'
            : 'notice-stepper-circle notice-stepper-circle--inactive'

          const labelClass = isCompleted
            ? 'notice-stepper-label notice-stepper-label--completed'
            : isActive
            ? 'notice-stepper-label notice-stepper-label--active'
            : 'notice-stepper-label notice-stepper-label--inactive'

          const lineClass = isCompleted
            ? 'notice-stepper-line notice-stepper-line--completed'
            : 'notice-stepper-line'

          return (
            <React.Fragment key={s.id}>
              <div
                className={`notice-stepper-step ${isClickable ? 'notice-stepper-step--clickable' : ''}`}
                onClick={() => {
                  if (isClickable && onStepClick) {
                    onStepClick(s.id)
                  }
                }}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : undefined}
                aria-label={`Step ${s.id}: ${s.label}`}
                title={isClickable ? `Go back to ${s.label}` : `Step ${s.id}: ${s.label}`}
              >
                <div className={circleClass}>
                  {isCompleted ? (
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    s.id
                  )}
                </div>
                <span className={labelClass}>{s.label}</span>
              </div>
              {idx < NOTICE_ASSISTANCE_STEPS.length - 1 && <div className={lineClass} />}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default NoticeStepper
