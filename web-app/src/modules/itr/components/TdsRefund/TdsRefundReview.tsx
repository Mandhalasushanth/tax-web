import React from 'react'
import './TdsRefundReview.css'
import { StepActionBar } from '@shared/components'
import type { TdsBankDetails } from './TdsRefundBankSection'
import type { TdsIncomeTaxData } from './TdsRefundTaxDetailsSection'
import type { DEFAULT_TDS_TAXPAYER } from '../../utils/tdsRefund.constants'
import type { UploadedFileMeta } from './TdsRefundDocuments'
import { TdsRefundComputationCard } from './TdsRefundComputationCard'
import { TdsRefundStepTracker } from './TdsRefundStepTracker'

export const TdsRefundReviewSidebar: React.FC = () => {
  return (
    <aside className="tds-review-sidebar">
      {/* Stage 3 in Progress Card */}
      <div className="tds-sidebar-card">
        <div className="tds-sidebar-progress-badge">Stage 3 in Progress</div>
        <h4 className="tds-sidebar-card-title">Review &amp; Estimate</h4>
        <p className="tds-sidebar-card-desc">
          Please thoroughly verify all your pre-filled and declared details before advancing to CA verification and refund filing.
        </p>
        <div className="tds-sidebar-checklist">
          {[
            { text: 'Step 1: Customer & Income Details', status: 'done', icon: '✓' },
            { text: 'Step 2: Upload Documents', status: 'done', icon: '✓' },
            { text: 'Step 3: Review & Computation', status: 'active', icon: '●', isStrong: true },
            { text: 'Step 4: CA Review & E-filing', status: 'pending', icon: '○' },
            { text: 'Step 5: Direct Bank Credit', status: 'pending', icon: '○' },
          ].map((item, idx) => (
            <div key={idx} className="tds-sidebar-check-item">
              <span className={`tds-sidebar-check-icon tds-sidebar-check-icon--${item.status}`}>{item.icon}</span>
              {item.isStrong ? <strong className="tds-sidebar-check-item-strong">{item.text}</strong> : <span>{item.text}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* CA Trust Card */}
      <div className="tds-sidebar-card tds-sidebar-card--navy">
        <div className="tds-sidebar-card-header">
          <svg className="tds-sidebar-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <h4 className="tds-sidebar-card-title">Chartered Accountant Review</h4>
        </div>
        <p className="tds-sidebar-card-desc">
          A senior licensed Chartered Accountant will cross-examine your 26AS, AIS, and TIS before submitting to the IT Department.
        </p>
      </div>

      {/* Bank-Grade Security Card */}
      <div className="tds-sidebar-card">
        <div className="tds-sidebar-card-header">
          <svg className="tds-sidebar-header-icon tds-sidebar-header-icon--secure" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <h4 className="tds-sidebar-card-title">Bank-Grade 256-Bit Security</h4>
        </div>
        <p className="tds-sidebar-card-desc">
          Your financial and personal details are encrypted and securely submitted through authorized ITD e-filing gateways.
        </p>
      </div>
    </aside>
  )
}

export interface TdsRefundReviewProps {
  onBack: () => void
  onEditStep1: () => void
  onEditStep2: () => void
  onNext: () => void
  onSaveDraft?: () => void
  profile?: typeof DEFAULT_TDS_TAXPAYER
  bankDetails?: TdsBankDetails
  taxData?: TdsIncomeTaxData
  uploads?: Record<string, UploadedFileMeta>
}

const EditButton: React.FC<{ onClick: () => void; testId: string }> = ({ onClick, testId }) => (
  <button type="button" className="tds-review-edit-btn" onClick={onClick} data-testid={testId}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
    Edit
  </button>
)

export const TdsRefundReview: React.FC<TdsRefundReviewProps> = ({
  onBack,
  onEditStep1,
  onEditStep2,
  onNext,
  onSaveDraft,
  profile,
  bankDetails,
  taxData,
  uploads,
}) => {
  const totalTdsDeductedNum = Number(taxData?.totalTdsDeducted || taxData?.totalTdsDeducted || 0)
  const tcsAmountNum = Number(taxData?.tcsAmount || taxData?.tcsAmount || 0)
  const advanceTaxNum = Number(taxData?.advanceTax || 0)
  const selfTaxNum = Number(taxData?.selfAssessmentTax || 0)
  const advanceAndSelfTax = advanceTaxNum + selfTaxNum
  const totalTaxCredits = totalTdsDeductedNum + tcsAmountNum + advanceAndSelfTax
  const grossIncomeNum =
    Number(taxData?.salaryIncome || taxData?.salaryIncome || 0) +
    Number(taxData?.otherIncome || 0) +
    Number(taxData?.interestIncome || 0)
  const totalDeductionsNum =
    Number(taxData?.deduction80C || taxData?.deduction80C || 0) +
    Number(taxData?.deduction80D || taxData?.deduction80D || 0)
  const taxableIncome = Math.max(0, grossIncomeNum - totalDeductionsNum)
  const estimatedRefund = totalTaxCredits

  const isStep3Valid = Boolean(
    bankDetails?.accountHolder?.trim() &&
    bankDetails?.accountNumber?.trim() &&
    bankDetails?.ifsc?.trim() &&
    Number(taxData?.totalTdsDeducted || taxData?.totalTdsDeducted || 0) > 0
  )

  return (
    <div className="tds-review-page" data-testid="tds-refund-review-page">
      <div className="tds-review-stepper-wrap">
        <TdsRefundStepTracker currentStep={3} />
      </div>

      <div className="tds-review-layout">
        <main className="tds-review-main">
          {/* 1. Personal Details */}
          <section className="tds-review-card" data-testid="tds-review-personal">
            <div className="tds-review-card-header">
              <div className="tds-review-title-wrap">
                <svg className="tds-review-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <h3 className="tds-review-title">Personal Details</h3>
              </div>
              <EditButton onClick={onEditStep1} testId="edit-personal-btn" />
            </div>
            <div className="tds-review-rows">
              <div className="tds-review-row"><span className="tds-review-label">Full Name</span><span className="tds-review-value">{profile?.fullName || profile?.name || '—'}</span></div>
              <div className="tds-review-row"><span className="tds-review-label">PAN</span><span className="tds-review-value tds-review-value--mono">{profile?.pan || '—'}</span></div>
              <div className="tds-review-row"><span className="tds-review-label">Mobile Number</span><span className="tds-review-value">{profile?.mobile ? (profile.mobile.startsWith('+91') ? profile.mobile : `+91 ${profile.mobile}`) : '—'}</span></div>
              <div className="tds-review-row"><span className="tds-review-label">Email Address</span><span className="tds-review-value">{profile?.email || '—'}</span></div>
              <div className="tds-review-row"><span className="tds-review-label">Address</span><span className="tds-review-value">{profile?.address || '—'}</span></div>
            </div>
          </section>

          {/* 2. Income Details */}
          <section className="tds-review-card" data-testid="tds-review-income">
            <div className="tds-review-card-header">
              <div className="tds-review-title-wrap">
                <svg className="tds-review-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <h3 className="tds-review-title">Income Details</h3>
              </div>
              <EditButton onClick={onEditStep1} testId="edit-income-btn" />
            </div>
            <div className="tds-review-rows">
              <div className="tds-review-row"><span className="tds-review-label">Tax Regime</span><span className="tds-review-value">{taxData?.taxRegime === 'old' ? 'Old Regime' : taxData?.taxRegime === 'new' ? 'New Regime' : 'Not Selected'}</span></div>
              <div className="tds-review-row"><span className="tds-review-label">Gross Salary</span><span className="tds-review-value">₹{Number(taxData?.salaryIncome || taxData?.salaryIncome || 0).toLocaleString('en-IN')}</span></div>
              <div className="tds-review-row"><span className="tds-review-label">Other &amp; Interest Income</span><span className="tds-review-value">₹{(Number(taxData?.otherIncome || 0) + Number(taxData?.interestIncome || 0)).toLocaleString('en-IN')}</span></div>
            </div>
          </section>

          {/* 3. TDS Details */}
          <section className="tds-review-card" data-testid="tds-review-tds">
            <div className="tds-review-card-header">
              <div className="tds-review-title-wrap">
                <svg className="tds-review-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><line x1="12" y1="6" x2="12" y2="18" />
                </svg>
                <h3 className="tds-review-title">TDS Details</h3>
              </div>
              <EditButton onClick={onEditStep1} testId="edit-tds-btn" />
            </div>
            <div className="tds-review-rows">
              <div className="tds-review-row"><span className="tds-review-label">Total TDS Deducted</span><span className="tds-review-value">₹{totalTdsDeductedNum.toLocaleString('en-IN')}</span></div>
              <div className="tds-review-row"><span className="tds-review-label">Total TCS Collected</span><span className="tds-review-value">₹{tcsAmountNum.toLocaleString('en-IN')}</span></div>
              <div className="tds-review-row"><span className="tds-review-label">Advance Tax Paid</span><span className="tds-review-value">₹{advanceTaxNum.toLocaleString('en-IN')}</span></div>
              <div className="tds-review-row"><span className="tds-review-label">Self Assessment Tax</span><span className="tds-review-value">₹{selfTaxNum.toLocaleString('en-IN')}</span></div>
            </div>
          </section>

          {/* 4. Deductions */}
          <section className="tds-review-card" data-testid="tds-review-deductions">
            <div className="tds-review-card-header">
              <div className="tds-review-title-wrap">
                <svg className="tds-review-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <h3 className="tds-review-title">Deductions</h3>
              </div>
              <EditButton onClick={onEditStep1} testId="edit-deductions-btn" />
            </div>
            <div className="tds-review-rows">
              <div className="tds-review-row"><span className="tds-review-label">Section 80C (Life Insurance, PF, etc.)</span><span className="tds-review-value">₹{Number(taxData?.deduction80C || taxData?.deduction80C || 0).toLocaleString('en-IN')}</span></div>
              <div className="tds-review-row"><span className="tds-review-label">Section 80D (Health Insurance)</span><span className="tds-review-value">₹{Number(taxData?.deduction80D || taxData?.deduction80D || 0).toLocaleString('en-IN')}</span></div>
            </div>
          </section>

          {/* 5. Bank Details */}
          <section className="tds-review-card" data-testid="tds-review-bank">
            <div className="tds-review-card-header">
              <div className="tds-review-title-wrap">
                <svg className="tds-review-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="21" x2="21" y2="21" /><line x1="3" y1="10" x2="21" y2="10" /><polyline points="5 10 5 21 19 21 19 10" /><polygon points="12 2 2 7 22 7 12 2" />
                </svg>
                <h3 className="tds-review-title">Bank Details</h3>
              </div>
              <EditButton onClick={onEditStep1} testId="edit-bank-btn" />
            </div>
            <div className="tds-review-rows">
              <div className="tds-review-row"><span className="tds-review-label">Bank Name</span><span className="tds-review-value">{bankDetails?.bankName || '—'}</span></div>
              <div className="tds-review-row"><span className="tds-review-label">Branch</span><span className="tds-review-value">{bankDetails?.branch || '—'}</span></div>
              <div className="tds-review-row"><span className="tds-review-label">Account Number</span><span className="tds-review-value">{bankDetails?.accountNumber ? `••••${bankDetails.accountNumber.slice(-4)}${bankDetails.accountType ? ` (${bankDetails.accountType})` : ''}` : '—'}</span></div>
              <div className="tds-review-row"><span className="tds-review-label">IFSC Code</span><span className="tds-review-value tds-review-value--mono">{bankDetails?.ifsc || bankDetails?.ifscCode || '—'}</span></div>
            </div>
          </section>

          {/* 6. Documents */}
          <section className="tds-review-card" data-testid="tds-review-documents">
            <div className="tds-review-card-header">
              <div className="tds-review-title-wrap">
                <svg className="tds-review-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                <h3 className="tds-review-title">Documents ({uploads ? Object.keys(uploads).length : 0})</h3>
              </div>
              <EditButton onClick={onEditStep2} testId="edit-documents-btn" />
            </div>
            {uploads && Object.keys(uploads).length > 0 ? (
              <div className="tds-review-rows">
                {Object.entries(uploads).map(([docId, meta]) => (
                  <div key={docId} className="tds-review-row"><span className="tds-review-label">{meta.name}</span><span className="tds-review-value">{meta.size}</span></div>
                ))}
              </div>
            ) : (
              <p className="tds-review-empty-text">No documents uploaded yet</p>
            )}
          </section>

          {/* 7. Estimated Tax Computation */}
          <TdsRefundComputationCard
            grossIncome={grossIncomeNum}
            totalDeductions={totalDeductionsNum}
            taxableIncome={taxableIncome}
            tdsDeducted={totalTdsDeductedNum}
            tcsCollected={tcsAmountNum}
            advanceAndSelfTax={advanceAndSelfTax}
            totalTaxCredits={totalTaxCredits}
            estimatedRefund={estimatedRefund}
          />
        </main>

        <TdsRefundReviewSidebar />
      </div>

      <StepActionBar
        onBack={onBack}
        onNext={onNext}
        onSaveDraft={onSaveDraft}
        nextLabel="Continue"
        nextDisabled={!isStep3Valid}
        backTestId="tds-step3-back-btn"
        nextTestId="tds-proceed-payment-btn"
      />
    </div>
  )
}

export default TdsRefundReview
