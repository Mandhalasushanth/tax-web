import React from 'react'
import './IncStepper.css'

interface IncStepperProps {
  steps: { label: string; id: string | number }[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export const IncStepper: React.FC<IncStepperProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="inc-stepper-container">
      {steps.map((step, index) => {
        const isCompleted = currentStep > index
        const isActive = currentStep === index
        const isClickable = onStepClick && (isCompleted || isActive)
        return (
          <div key={step.id} className={`inc-stepper-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
            <div 
              className={`inc-stepper-circle ${isClickable ? 'clickable' : ''}`}
              onClick={() => isClickable && onStepClick(index)}
            >
              {isCompleted ? '✓' : index + 1}
            </div>
            <div className="inc-stepper-label">{step.label}</div>
            {index < steps.length - 1 && <div className="inc-stepper-line" />}
          </div>
        )
      })}
    </div>
  )
}

export default IncStepper
