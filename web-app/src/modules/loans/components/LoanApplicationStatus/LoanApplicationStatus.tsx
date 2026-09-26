import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import type { LoanMilestone } from '../../types/loan.types'
import './LoanApplicationStatus.css'

const DEFAULT_MILESTONES: LoanMilestone[] = [
  {
    id: 'm1',
    title: 'Application Submitted',
    timestamp: '24 Sep 2026, 11:20 AM',
    status: 'completed',
  },
  {
    id: 'm2',
    title: 'In Progress',
    timestamp: '24 Sep 2026, 02:15 PM',
    status: 'current',
  },
  {
    id: 'm3',
    title: 'Agent Review',
    timestamp: 'Pending',
    status: 'pending',
  },
  {
    id: 'm4',
    title: 'Lender Review',
    timestamp: 'Pending',
    status: 'pending',
  },
  {
    id: 'm5',
    title: 'Sanctioned',
    timestamp: 'Pending',
    status: 'pending',
  },
  {
    id: 'm6',
    title: 'Disbursed',
    timestamp: 'Pending',
    status: 'pending',
  },
]

export const LoanApplicationStatus: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const stateData = location.state as { refNumber?: string; formData?: { loanAmount?: number } } | null

  const refNumber = id || stateData?.refNumber || 'TXE-LN-041928'
  const loanAmount = stateData?.formData?.loanAmount || 5000000

  return (
    <div className="loan-status-page">
      {/* 1. Green Success Banner */}
      <section className="loan-success-banner">
        <div className="loan-success-banner__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="loan-success-banner__title">Application Submitted Successfully</h1>
        <p className="loan-success-banner__desc">
          Your Home Loan application has been submitted. Our credit verification officer and underwriting desk will initiate verification shortly.
        </p>
      </section>

      {/* 2. Application Summary Card */}
      <div className="loan-status-card">
        <div className="loan-status-card__top">
          <span className="loan-status-card__ref">Ref No. {refNumber}</span>
          <span className="loan-status-card__badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Documents Received
          </span>
        </div>

        <div className="loan-status-card__main">
          <div>
            <p className="loan-status-card__loan-type">Home Loan</p>
            <h2 className="loan-status-card__amount">₹{loanAmount.toLocaleString('en-IN')}</h2>
          </div>
        </div>

        <div className="loan-status-card__meta-grid">
          <div className="loan-status-card__meta-item">
            <span className="loan-status-card__meta-label">Lender Network</span>
            <span className="loan-status-card__meta-value">Multi-Bank Desk</span>
          </div>
          <div className="loan-status-card__meta-item">
            <span className="loan-status-card__meta-label">Case Advisor</span>
            <span className="loan-status-card__meta-value">TaxEdge Credit CA</span>
          </div>
        </div>
      </div>

      {/* 3. Application Lifecycle Milestones */}
      <div className="loan-timeline-card">
        <h3 className="loan-timeline-card__title">Application Lifecycle Milestones</h3>

        <div className="loan-timeline">
          {DEFAULT_MILESTONES.map((m) => {
            return (
              <div
                key={m.id}
                className={`loan-timeline-item loan-timeline-item--${m.status}`}
              >
                <div className="loan-timeline-node">
                  {m.status === 'completed' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {m.status === 'current' && (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="6" />
                    </svg>
                  )}
                </div>

                <div className="loan-timeline-content">
                  <span className="loan-timeline-name">{m.title}</span>
                  <span className="loan-timeline-date">{m.timestamp}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 4. Action Buttons */}
      <div className="loan-status-actions">
        <Link to="/applications" className="loan-status-btn loan-status-btn--primary">
          <span>Track My Applications</span>
        </Link>
        <Link to="/dashboard" className="loan-status-btn loan-status-btn--secondary">
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  )
}

export default LoanApplicationStatus
