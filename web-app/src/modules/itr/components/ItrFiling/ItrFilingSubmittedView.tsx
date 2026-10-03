import React from 'react'
import { Link } from 'react-router-dom'
import { routePaths } from '@core/config'
import {
  PROGRESS_STAGES,
  CheckIcon,
  LockIcon,
  InfoIcon,
  FileTextIcon,
  DownloadIcon,
  type FilingBankAccount,
} from './itrFiling.constants'
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

const resolveSuccessApplicableForm = (selectedSources: string[]): string => {
  try {
    if (selectedSources.includes('business')) return 'ITR-3'
    if (selectedSources.includes('capital_gains')) return 'ITR-2'
    return 'ITR-1'
  } catch {
    return 'ITR-1'
  }
}

const resolveSuccessIncomeLabel = (selectedSources: string[]): string => {
  try {
    if (selectedSources.includes('capital_gains')) return 'Capital Gains'
    if (selectedSources.includes('business')) return 'Business / Profession'
    if (selectedSources.includes('house_property')) return 'Salary + House Property'
    return 'Salary / Pension'
  } catch {
    return 'Salary / Pension'
  }
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
  const successApplicableForm = resolveSuccessApplicableForm(selectedSources)
  const successIncomeLabel = resolveSuccessIncomeLabel(selectedSources)

  const selectedBank =
    bankAccounts.find((b) => b.id === selectedBankId) || bankAccounts[0]
  const bankLabel = selectedBank
    ? `${selectedBank.bankName} ···· ${selectedBank.accountNumber.replace(/\s/g, '').slice(-4)}`
    : 'Primary Bank'

  const handleDownloadReceipt = () => {
    try {
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
    } catch {
      // Fallback
    }
  }

  const summaryRows = [
    { label: 'Assessment Year', value: assessmentYear },
    { label: 'Return Form', value: successApplicableForm },
    { label: 'Income Sources', value: successIncomeLabel },
    {
      label: 'Tax Regime',
      value: selectedRegime === 'new' ? 'New Tax Regime' : 'Old Tax Regime',
    },
    { label: 'Documents', value: `${docCount} of 5 received` },
    { label: 'Refund Bank', value: bankLabel },
  ]

  const renderHero = () => (
    <div className="itr-success-hero">
      <div className="itr-success-ring">
        <div className="itr-success-circle">
          <CheckIcon size={36} />
        </div>
      </div>
      <h1 className="itr-success-title">Your application has been received!</h1>
      <p className="itr-success-desc">
        Your documents and tax information have been received. A Tax Executive will review them before preparing your return.
      </p>
      <div className="itr-success-app-id">
        <LockIcon size={14} />
        Application ID&nbsp;<strong>{submittedRef}</strong>
      </div>
    </div>
  )

  const renderProgressTracker = () => (
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
        <InfoIcon size={14} />
        <div>
          <strong>Current Stage 2: Documents Under Review</strong>
          <span> — Assigned CA is reviewing your Form 16, AIS, and uploaded records.</span>
        </div>
      </div>
    </div>
  )

  const renderWhatWeHaveCard = () => (
    <div className="itr-step-card">
      <div className="itr-success-card-title">
        <FileTextIcon size={18} />
        What we have
      </div>
      <div className="itr-success-summary-rows">
        {summaryRows.map((row) => (
          <div key={row.label} className="itr-success-summary-row">
            <span className="itr-success-summary-label">{row.label}</span>
            <span className="itr-success-summary-val">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const renderRightColumn = () => (
    <div className="itr-success-right-col">
      <div className="itr-step-card">
        <div className="itr-success-card-title">
          <InfoIcon size={18} />
          What happens next
        </div>
        <p className="itr-success-next-desc">
          A Tax Executive will verify your documents, prepare the return and send you the computation to review and approve. You will get a notification at each stage.
        </p>
      </div>

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

      <div className="itr-success-actions">
        <Link to={routePaths.dashboard} className="itr-success-btn-primary">
          View Application Status &nbsp;→
        </Link>
        <button
          type="button"
          className="itr-success-btn-secondary"
          onClick={handleDownloadReceipt}
        >
          <DownloadIcon size={16} />
          Download TaxEdge Application Receipt
        </button>
      </div>
    </div>
  )

  return (
    <div className="itr-success-container">
      {renderHero()}
      <div className="itr-success-desktop-grid">
        <div className="itr-success-left-col">
          {renderProgressTracker()}
          {renderWhatWeHaveCard()}
        </div>
        {renderRightColumn()}
      </div>
    </div>
  )
}
