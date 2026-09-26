import React from 'react'
import { Link } from 'react-router-dom'
import { routePaths } from '@core/config'
import { PROGRESS_STAGES, type FilingBankAccount } from './itrFiling.constants'
import './ItrFilingSubmittedView.css'

export interface ItrFilingSubmittedViewProps {
  submittedRef: string
  assessmentYear: string
  selectedSources: string[]
  selectedRegime: string
  bankAccounts: FilingBankAccount[]
  selectedBankId: string
  docCount: number
}

export const ItrFilingSubmittedView: React.FC<ItrFilingSubmittedViewProps> = ({
  submittedRef,
  assessmentYear,
  selectedSources,
  selectedRegime,
  bankAccounts,
  selectedBankId,
  docCount,
}) => {
  const successApplicableForm = selectedSources.includes('business')
    ? 'ITR-3'
    : selectedSources.includes('capital_gains')
    ? 'ITR-2'
    : 'ITR-1'

  const successIncomeLabel = selectedSources.includes('capital_gains')
    ? 'Capital Gains'
    : selectedSources.includes('business')
    ? 'Business / Profession'
    : selectedSources.includes('house_property')
    ? 'Salary + House Property'
    : 'Salary / Pension'

  const selectedBank =
    bankAccounts.find((b) => b.id === selectedBankId) || bankAccounts[0]
  const bankLabel = selectedBank
    ? `${selectedBank.bankName} ···· ${selectedBank.accountNumber.replace(/\s/g, '').slice(-4)}`
    : 'Primary Bank'

  const handleDownloadReceipt = () => {
    const content = [
      'TaxEdge Application Receipt',
      '─────────────────────────────',
      `Application ID   : ${submittedRef}`,
      `Assessment Year  : ${assessmentYear}`,
      `Return Form      : ${successApplicableForm}`,
      `Income Sources   : ${successIncomeLabel}`,
      `Tax Regime       : ${selectedRegime === 'new' ? 'New Tax Regime' : 'Old Tax Regime'}`,
      `Documents        : ${docCount} of 5`,
      `Submitted On     : ${new Date().toLocaleString('en-IN')}`,
      '─────────────────────────────',
      'Assigned CA: Senior CA Meera Iyer',
      'TaxEdge — Trusted CA-Assisted Filing',
    ].join('\n')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `TaxEdge_Receipt_${submittedRef}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="itr-success-container">
      {/* Green Success Hero */}
      <div className="itr-success-hero">
        <div className="itr-success-ring">
          <div className="itr-success-circle">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
        <h1 className="itr-success-title">Your application has been received!</h1>
        <p className="itr-success-desc">
          Your documents and tax information have been received. A Tax Executive will review them before preparing your return.
        </p>
        <div className="itr-success-app-id">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-4 0v2" />
          </svg>
          Application ID&nbsp;<strong>{submittedRef}</strong>
        </div>
      </div>

      {/* 2-Column Desktop Grid for Success Content */}
      <div className="itr-success-desktop-grid">
        {/* Left Column */}
        <div className="itr-success-left-col">
          {/* Progress Tracker */}
          <div className="itr-step-card">
            <div className="itr-success-tracker-header">
              <span className="itr-success-tracker-title">Filing Progress Tracker</span>
              <span className="itr-success-stage-badge">Stage 2 of 6</span>
            </div>
            <div className="itr-success-progress-scroll-wrap">
              <div className="itr-success-progress-row">
                {PROGRESS_STAGES.map((stage, idx) => (
                  <div key={stage.id} className="itr-success-progress-item">
                    <div
                      className={`itr-success-stage-icon ${
                        stage.done
                          ? 'itr-success-stage-icon--done'
                          : stage.active
                          ? 'itr-success-stage-icon--active'
                          : 'itr-success-stage-icon--idle'
                      }`}
                    >
                      {stage.icon}
                    </div>
                    {idx < PROGRESS_STAGES.length - 1 && (
                      <div
                        className={`itr-success-stage-line ${
                          stage.done ? 'itr-success-stage-line--done' : ''
                        }`}
                      />
                    )}
                    <div
                      className={`itr-success-stage-label ${
                        stage.active
                          ? 'itr-success-stage-label--active'
                          : stage.done
                          ? 'itr-success-stage-label--done'
                          : ''
                      }`}
                    >
                      {stage.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="itr-success-current-stage-note">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                <strong>Current Stage 2: Documents Under Review</strong>
                <span> — Assigned CA is reviewing your Form 16, AIS, and uploaded records.</span>
              </div>
            </div>
          </div>

          {/* What We Have */}
          <div className="itr-step-card">
            <div className="itr-success-card-title">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              What we have
            </div>
            <div className="itr-success-summary-rows">
              {[
                { label: 'Assessment Year', value: assessmentYear },
                { label: 'Return Form', value: successApplicableForm },
                { label: 'Income Sources', value: successIncomeLabel },
                {
                  label: 'Tax Regime',
                  value: selectedRegime === 'new' ? 'New Tax Regime' : 'Old Tax Regime',
                },
                { label: 'Documents', value: `${docCount} of 5 received` },
                { label: 'Refund Bank', value: bankLabel },
              ].map((row) => (
                <div key={row.label} className="itr-success-summary-row">
                  <span className="itr-success-summary-label">{row.label}</span>
                  <span className="itr-success-summary-val">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="itr-success-right-col">
          {/* What Happens Next */}
          <div className="itr-step-card">
            <div className="itr-success-card-title">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              What happens next
            </div>
            <p className="itr-success-next-desc">
              A Tax Executive will verify your documents, prepare the return and send you the computation to review and approve. You will get a notification at each stage.
            </p>
          </div>

          {/* Assigned CA Card */}
          <div className="itr-step-card itr-ca-assigned-card">
            <div className="itr-ca-assigned-header">
              <div className="itr-ca-avatar">CA</div>
              <div>
                <div className="itr-ca-name">Senior CA Meera Iyer</div>
                <div className="itr-ca-meta">Direct Tax Specialist · 12+ Yrs Exp</div>
              </div>
            </div>
            <div className="itr-ca-badge-row">
              <span className="itr-ca-badge">⚡ 4-Hour Review SLA</span>
              <span className="itr-ca-badge">🛡️ Notice Protection</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="itr-success-actions">
            <Link to={routePaths.dashboard} className="itr-success-btn-primary">
              View Application Status &nbsp;→
            </Link>
            <button
              type="button"
              className="itr-success-btn-secondary"
              onClick={handleDownloadReceipt}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download TaxEdge Application Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
