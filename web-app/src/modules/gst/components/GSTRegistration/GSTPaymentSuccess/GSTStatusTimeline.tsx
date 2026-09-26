import React from 'react'

export interface TimelineMilestone {
  id: string
  title: string
  desc: string
  status: 'completed' | 'current' | 'upcoming'
  detail: string
}

export const GST_DEFAULT_MILESTONES: TimelineMilestone[] = [
  {
    id: 'submitted',
    title: 'Application Submitted',
    desc: 'Form & documents received',
    status: 'completed',
    detail: 'Submitted on Today · Verification queue initiated',
  },
  {
    id: 'verification',
    title: 'Document Verification',
    desc: 'Assigned CA reviewing proofs',
    status: 'current',
    detail: 'CA Rohit Kulkarni is reviewing PAN, Aadhaar & address proof',
  },
  {
    id: 'trn',
    title: 'TRN Generation',
    desc: 'Temporary Reference Number creation',
    status: 'upcoming',
    detail: 'Generated upon initial portal validation',
  },
  {
    id: 'portal',
    title: 'Filed with GST Portal',
    desc: 'Submission to GST department',
    status: 'upcoming',
    detail: 'Formal application upload to government GSTN portal',
  },
  {
    id: 'arn',
    title: 'ARN Generated',
    desc: 'Acknowledgement number issued',
    status: 'upcoming',
    detail: 'Government acknowledgement number with tracking status',
  },
  {
    id: 'certificate',
    title: 'GST Certificate Issued',
    desc: 'GSTIN & certificate delivered',
    status: 'upcoming',
    detail: 'Final GST certificate dispatched to registered email',
  },
]

export const GSTStatusTimeline: React.FC = () => {
  return (
    <div className="gst-status-main-col">
      <div className="gst-status-timeline-card">
        <div className="gst-status-timeline-card__header">
          <div>
            <h2 className="gst-status-section-title">Application Progress</h2>
            <p className="gst-status-section-desc">
              Live status tracking for your GST registration lifecycle
            </p>
          </div>
          <span className="gst-status-phase-indicator">Phase 2 of 6</span>
        </div>

        <div className="gst-status-timeline">
          {GST_DEFAULT_MILESTONES.map((step, idx) => {
            const isLast = idx === GST_DEFAULT_MILESTONES.length - 1
            return (
              <div
                key={step.id}
                className={`gst-timeline-item gst-timeline-item--${step.status}`}
              >
                <div className="gst-timeline-node">
                  <div
                    className={`gst-timeline-circle gst-timeline-circle--${step.status}`}
                    aria-label={step.title}
                  >
                    {step.status === 'completed' && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="gst-timeline-check-svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    {step.status === 'current' && <div className="gst-timeline-dot" />}
                    {step.status === 'upcoming' && <div className="gst-timeline-inner-dot" />}
                  </div>
                  {!isLast && (
                    <div
                      className={`gst-timeline-line ${
                        step.status === 'completed' ? 'gst-timeline-line--active' : ''
                      }`}
                    />
                  )}
                </div>

                <div className="gst-timeline-content">
                  <div className="gst-timeline-heading-row">
                    <h3 className="gst-timeline-title">{step.title}</h3>
                    {step.status === 'current' && (
                      <span className="gst-timeline-active-tag">In Progress</span>
                    )}
                    {step.status === 'completed' && (
                      <span className="gst-timeline-done-tag">Completed</span>
                    )}
                  </div>
                  <p className="gst-timeline-desc">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
