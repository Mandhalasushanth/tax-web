import React from 'react'
import './ITRStepper.css'

interface ITRStepperProps {
  steps: { label: string; id: string | number }[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export const ITRStepper: React.FC<ITRStepperProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="itr-stepper-container">
      {steps.map((step, index) => {
        const isCompleted = currentStep > index
        const isActive = currentStep === index
        const isClickable = onStepClick && (isCompleted || isActive)
        return (
          <div key={step.id} className={`itr-stepper-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
            <div 
              className={`itr-stepper-circle ${isClickable ? 'itr-stepper-circle--clickable' : ''}`}
              onClick={() => isClickable && onStepClick(index)}
            >
              {isCompleted ? '✓' : index + 1}
            </div>
            <div className="itr-stepper-label">{step.label}</div>
            {index < steps.length - 1 && <div className="itr-stepper-line" />}
          </div>
        )
      })}
    </div>
  )
}

export default ITRStepper
