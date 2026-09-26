import React from 'react'

export interface TimelineStepItem {
  id: string
  title: string
  description: string
  dateText?: string
  status: 'completed' | 'in_progress' | 'pending'
}

const DEFAULT_TIMELINE_STEPS: TimelineStepItem[] = [
  {
    id: '1',
    title: 'Customer Request',
    description: 'Filing request initiated',
    dateText: '15 Sep 2026',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Document Upload',
    description: 'Sales & purchase registers submitted',
    dateText: '15 Sep 2026',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Staff Verification',
    description: 'Chartered Accountant reviewing invoices',
    status: 'in_progress',
  },
  {
    id: '4',
    title: 'Data Preparation',
    description: 'Accounting integration & ledger extraction',
    status: 'pending',
  },
  {
    id: '5',
    title: 'Return Preparation',
    description: 'Form computation & ITC reconciliation',
    status: 'pending',
  },
  {
    id: '6',
    title: 'Customer Review',
    description: 'Tax summary shared with business',
    status: 'pending',
  },
  {
    id: '7',
    title: 'Customer Approval',
    description: 'Client signs off return computation',
    status: 'pending',
  },
  {
    id: '8',
    title: 'GST Filing Submission',
    description: 'Return submitted to GSTN portal',
    status: 'pending',
  },
  {
    id: '9',
    title: 'Acknowledgement Receipt',
    description: 'ARN generated & filed copy delivered',
    status: 'pending',
  },
  {
    id: '10',
    title: 'Filing Completed',
    description: 'Compliance verified & closed',
    status: 'pending',
  },
]

interface GSTTrackTimelineProps {
  steps?: TimelineStepItem[]
}

export const GSTTrackTimeline: React.FC<GSTTrackTimelineProps> = ({
  steps = DEFAULT_TIMELINE_STEPS,
}) => {
  return (
    <div className="gst-track-timeline-card">
      <div className="gst-track-timeline-card__header">
        <h3 className="gst-track-timeline-card__title">Application Progress</h3>
        <p className="gst-track-timeline-card__subtitle">
          Track each step of your GST filing process
        </p>
      </div>

      <div className="gst-track-timeline-list">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1

          return (
            <div
              key={step.id}
              className={`gst-track-timeline-item gst-track-timeline-item--${step.status}`}
            >
              {/* Left Stepper Indicator Column */}
              <div className="gst-track-timeline-item__stepper-col">
                <div className={`gst-track-timeline-item__indicator gst-track-timeline-item__indicator--${step.status}`}>
                  {step.status === 'completed' && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="gst-track-timeline-item__check-icon"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {step.status === 'in_progress' && (
                    <span className="gst-track-timeline-item__active-dot" />
                  )}
                  {step.status === 'pending' && (
                    <span className="gst-track-timeline-item__pending-dot" />
                  )}
                </div>

                {!isLast && (
                  <div
                    className={`gst-track-timeline-item__line ${
                      step.status === 'completed'
                        ? 'gst-track-timeline-item__line--completed'
                        : ''
                    }`}
                  />
                )}
              </div>

              {/* Main Content Column */}
              <div className="gst-track-timeline-item__content-col">
                <div className="gst-track-timeline-item__info">
                  <h4 className="gst-track-timeline-item__title">{step.title}</h4>
                  <p className="gst-track-timeline-item__desc">{step.description}</p>
                </div>

                <div className="gst-track-timeline-item__meta">
                  {step.dateText && (
                    <span className="gst-track-timeline-item__date">
                      {step.dateText}
                    </span>
                  )}

                  {step.status === 'completed' && (
                    <span className="gst-track-badge gst-track-badge--completed">
                      Completed
                    </span>
                  )}
                  {step.status === 'in_progress' && (
                    <span className="gst-track-badge gst-track-badge--in-progress">
                      In Progress
                    </span>
                  )}
                  {step.status === 'pending' && (
                    <span className="gst-track-badge gst-track-badge--pending">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GSTTrackTimeline
