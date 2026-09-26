import React from 'react'
import { TdsRefundStepTracker } from './TdsRefundStepTracker'
import './TdsRefundStatus.css'

export interface TdsRefundStatusProps {
  applicationId?: string
  onBack?: () => void
  onBackToDashboard?: () => void
  onContactSupport?: () => void
}

interface TimelineStage {
  num: number
  title: string
  desc: string
  status: 'completed' | 'active' | 'pending'
}

const TIMELINE_STAGES: TimelineStage[] = [
  { num: 1, title: 'New Request Received', desc: 'Application submitted', status: 'completed' },
  { num: 2, title: 'Documents Received', desc: 'All documents uploaded', status: 'completed' },
  { num: 3, title: 'Under Verification', desc: 'Documents being verified by CA', status: 'active' },
  { num: 4, title: 'ITR Preparation', desc: 'Return computation by CA', status: 'pending' },
  { num: 5, title: 'Customer Approval', desc: 'Review and approve the return', status: 'pending' },
  { num: 6, title: 'ITR Filed', desc: 'Submitted on IT Department portal', status: 'pending' },
  { num: 7, title: 'E-Verification Pending', desc: 'Verify using Aadhaar OTP / DSC', status: 'pending' },
  { num: 8, title: 'Processing by IT Dept.', desc: 'Department processing', status: 'pending' },
  { num: 9, title: 'Refund / Tax Payable', desc: 'Direct credit to bank account ••••6068', status: 'pending' },
]

export const TdsRefundStatus: React.FC<TdsRefundStatusProps> = ({
  applicationId = 'TDS-2026-59303',
  onBack,
  onBackToDashboard,
  onContactSupport,
}) => {
  return (
    <div className="tds-status-page" data-testid="tds-refund-status-page">
      {/* 5-Step Stepper Track Centered at Top */}
      <div className="tds-status-stepper-wrap">
        <TdsRefundStepTracker currentStep={5} />
      </div>

      {/* Full-Width Content Layout */}
      <div className="tds-status-layout">
        {/* Main Content: Overview + 9-Step Timeline + Bottom Actions */}
        <main className="tds-status-main">
          {/* Top Overview Card */}
          <section className="tds-status-card" data-testid="tds-status-overview">
            <div className="tds-status-overview-header">
              <div className="tds-status-header-left">
                {onBack && (
                  <button
                    type="button"
                    className="tds-action-back-btn tds-action-back-btn--compact"
                    onClick={onBack}
                    data-testid="tds-status-back-btn"
                    title="Back"
                  >
                    ←
                  </button>
                )}
                <div>
                  <div className="tds-status-app-id-label">Application ID</div>
                  <h2 className="tds-status-app-id-val" data-testid="status-application-id">{applicationId}</h2>
                </div>
              </div>
              <span className="tds-status-badge-purple" data-testid="status-badge">
                <span className="tds-status-badge-dot" />
                Under Verification
              </span>
            </div>

            <div className="tds-status-grid">
              <div className="tds-status-item">
                <span className="tds-status-item-label">Service</span>
                <span className="tds-status-item-val">TDS Refund</span>
              </div>
              <div className="tds-status-item">
                <span className="tds-status-item-label">AY</span>
                <span className="tds-status-item-val">2025-26</span>
              </div>
              <div className="tds-status-item">
                <span className="tds-status-item-label">Applied</span>
                <span className="tds-status-item-val">17 Sept 2026</span>
              </div>
            </div>

            <div className="tds-status-progress-wrap">
              <div className="tds-status-progress-track">
                <div className="tds-status-progress-fill" style={{ width: '30%' }} />
              </div>
              <span className="tds-status-progress-label" data-testid="status-progress-label">30% complete</span>
            </div>
          </section>

          {/* 9-Stage Vertical Lifecycle Tracker Card */}
          <section className="tds-status-card" data-testid="tds-status-timeline">
            <div className="tds-timeline-list">
              {TIMELINE_STAGES.map((stage, idx) => (
                <div
                  key={stage.num}
                  className={`tds-timeline-item tds-timeline-item--${stage.status}`}
                  data-testid={`timeline-stage-${stage.num}`}
                >
                  {idx < TIMELINE_STAGES.length - 1 && <div className="tds-timeline-line" />}
                  <div className="tds-timeline-node">
                    {stage.status === 'completed' ? '✓' : stage.num}
                  </div>
                  <div className="tds-timeline-info">
                    <h4 className="tds-timeline-title">{stage.title}</h4>
                    <p className="tds-timeline-desc">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Actions Row */}
          <div className="tds-status-actions-row">
            <button
              type="button"
              className="tds-btn-contact-support"
              onClick={onContactSupport}
              data-testid="tds-btn-contact-support"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Contact Support
            </button>
            <button
              type="button"
              className="tds-btn-dashboard"
              onClick={onBackToDashboard}
              data-testid="tds-btn-dashboard"
            >
              Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default TdsRefundStatus
