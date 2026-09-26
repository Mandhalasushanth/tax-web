import React, { useState } from 'react'
import { DEFAULT_TDS_TAXPAYER, TdsIcons } from '../../utils/tdsRefund.constants'
import { StepActionBar } from '@shared/components'
import { TdsRefundPersonalInfoSection } from './TdsRefundPersonalInfoSection'
import { TdsRefundBankSection, type TdsBankDetails } from './TdsRefundBankSection'
import { TdsRefundTaxDetailsSection, type TdsIncomeTaxData } from './TdsRefundTaxDetailsSection'
import { TdsRefundStepTracker } from './TdsRefundStepTracker'
import './TdsRefundCustomerIncome.css'

export interface TdsRefundPrelimBannerProps {
  assessmentYear?: string
  refundAmount: string
}

export const TdsRefundPrelimBanner: React.FC<TdsRefundPrelimBannerProps> = ({
  assessmentYear = 'AY 2026-27',
  refundAmount,
}) => {
  return (
    <section className="tds-prelim-card">
      <div className="tds-prelim-left">
        <div className="tds-prelim-tag-row">
          <span className="tds-prelim-tag">PRELIMINARY ESTIMATED REFUND</span>
          <span className="tds-prelim-ay">{assessmentYear}</span>
        </div>
        <div className="tds-prelim-amount" data-testid="prelim-refund-amount">
          {refundAmount}
        </div>
        <p className="tds-prelim-desc">
          Estimated from verified Form 26AS, AIS, and advance TDS deduction records.
        </p>
      </div>
      <div className="tds-prelim-badge-box">
        <div className="tds-prelim-badge-item">
          <TdsIcons.Checkmark />
          <span>ITD Pre-reconciled</span>
        </div>
        <div className="tds-prelim-badge-item">
          <TdsIcons.Shield />
          <span>100% Audit Protected</span>
        </div>
      </div>
    </section>
  )
}

export const TdsRefundProgressionSidebar: React.FC = () => {
  return (
    <aside className="tds-step1-sidebar" aria-label="Claim progression and verification">
      {/* 1. Claim Progression Card */}
      <div className="tds-progression-card">
        <span className="tds-progression-badge">Stage 1 Completed</span>
        <h3 className="tds-progression-title">Claim Progression</h3>
        <p className="tds-progression-desc">
          Review profile details, income information and bank account before proceeding.
        </p>

        <div className="tds-progression-checklist">
          <div className="tds-progression-item">
            <TdsIcons.Checkmark />
            <span>Pre-filled from ITD Portal</span>
          </div>
          <div className="tds-progression-item">
            <TdsIcons.Checkmark />
            <span>Bank verified for direct credit</span>
          </div>
          <div className="tds-progression-item">
            <TdsIcons.Checkmark />
            <span>Next: Upload Form 16 / AIS / Bank Stmt</span>
          </div>
        </div>

        <div className="tds-progression-security">
          <div className="tds-prog-sec-row">
            <TdsIcons.Shield />
            <span>256-bit Bank Grade Security</span>
          </div>
          <div className="tds-prog-sec-row">
            <TdsIcons.Zap />
            <span>Instant CA validation upon filing</span>
          </div>
        </div>
      </div>

      {/* 2. Expert CA Verification & Trust Card */}
      <div className="tds-sidebar-card tds-sidebar-trust-card">
        <div className="tds-trust-icon-box">
          <TdsIcons.Shield />
        </div>
        <div>
          <h4 className="tds-trust-title">Expert CA Verification</h4>
          <p className="tds-trust-desc">
            Your refund claim and bank details are cross-verified by a Senior Chartered Accountant before submission to ITD.
          </p>
        </div>
      </div>
    </aside>
  )
}

export interface TdsRefundCustomerIncomeProps {
  onBack: () => void
  onNext: () => void
  onSaveDraft?: () => void
  currentStep?: number
  initialProfile?: typeof DEFAULT_TDS_TAXPAYER
  onProfileChange?: (profile: typeof DEFAULT_TDS_TAXPAYER) => void
  initialBankDetails?: TdsBankDetails
  onBankChange?: (details: TdsBankDetails) => void
  initialTaxData?: TdsIncomeTaxData
  onTaxChange?: (data: TdsIncomeTaxData) => void
}

export type TdsRefundStepCustomerIncomeProps = TdsRefundCustomerIncomeProps

export const TdsRefundCustomerIncome: React.FC<TdsRefundCustomerIncomeProps> = ({
  onBack,
  onNext,
  onSaveDraft,
  currentStep = 1,
  initialProfile,
  onProfileChange,
  initialBankDetails,
  onBankChange,
  initialTaxData,
  onTaxChange,
}) => {
  const [profile, setProfile] = useState(initialProfile || DEFAULT_TDS_TAXPAYER)
  const [error, setError] = useState<string | null>(null)

  const [bankDetails, setBankDetails] = useState<TdsBankDetails>(
    initialBankDetails || {
      accountHolder: '',
      accountNumber: '',
      confirmAccountNumber: '',
      ifsc: '',
      bankName: '',
      branch: '',
      accountType: null,
    }
  )

  const [taxData, setTaxData] = useState<TdsIncomeTaxData>(
    initialTaxData || {
      taxRegime: null,
      salaryIncome: '',
      otherIncome: '',
      interestIncome: '',
      rentalIncome: null,
      capitalGains: null,
      businessIncome: null,
      homeLoanInterest: null,
      taxDeductions: null,
      annualRent: '',
      propertyTaxes: '',
      stcg: '',
      ltcg: '',
      turnover: '',
      netProfit: '',
      homeLoanInterestAmount: '',
      deduction80C: '',
      deduction80D: '',
      totalTdsDeducted: '',
      tcsAmount: '',
      advanceTax: '',
      selfAssessmentTax: '',
    }
  )

  const handleProfileChange = (updated: Partial<typeof DEFAULT_TDS_TAXPAYER>) => {
    const next = { ...profile, ...updated }
    setProfile(next)
    onProfileChange?.(next)
  }

  const handleBankChange = (updated: Partial<TdsBankDetails>) => {
    const next = { ...bankDetails, ...updated }
    setBankDetails(next)
    onBankChange?.(next)
  }

  const handleTaxChange = (updated: Partial<TdsIncomeTaxData>) => {
    const next = { ...taxData, ...updated }
    setTaxData(next)
    onTaxChange?.(next)
  }

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setError(null)

    if (
      bankDetails.accountNumber &&
      (bankDetails.accountNumber.trim().length < 10 || bankDetails.accountNumber.trim().length > 15)
    ) {
      setError('Bank account number must be between 10 and 15 digits only')
      return
    }

    if (
      bankDetails.accountNumber &&
      bankDetails.confirmAccountNumber &&
      bankDetails.accountNumber.trim() !== bankDetails.confirmAccountNumber.trim()
    ) {
      setError('Account numbers do not match')
      return
    }

    if (bankDetails.ifsc && bankDetails.ifsc.trim().length !== 11) {
      setError('IFSC code must be 11 characters')
      return
    }

    onNext()
  }

  const tdsVal = Number(taxData.totalTdsDeducted?.replace(/[^0-9.]/g, '') || 0)
  const tcsVal = Number(taxData.tcsAmount?.replace(/[^0-9.]/g, '') || 0)
  const advVal = Number(taxData.advanceTax?.replace(/[^0-9.]/g, '') || 0)
  const selfVal = Number(taxData.selfAssessmentTax?.replace(/[^0-9.]/g, '') || 0)
  const totalTaxCredits = tdsVal + tcsVal + advVal + selfVal

  const computedRefundTotal =
    totalTaxCredits > 0
      ? `₹${totalTaxCredits.toLocaleString('en-IN')}`
      : profile.preliminaryRefund || '₹0'

  const isProfileValid = Boolean(
    profile.fullName?.trim() &&
    profile.pan?.trim() &&
    profile.pan.trim().length === 10
  )

  const isStep1Valid = Boolean(
    profile.fullName?.trim() &&
    profile.pan?.trim() &&
    bankDetails.accountHolder?.trim() &&
    bankDetails.accountNumber?.trim() &&
    bankDetails.accountNumber.trim().length >= 10 &&
    bankDetails.accountNumber.trim().length <= 15 &&
    bankDetails.confirmAccountNumber?.trim() &&
    bankDetails.accountNumber.trim() === bankDetails.confirmAccountNumber.trim() &&
    bankDetails.ifsc?.trim() &&
    bankDetails.ifsc.trim().length === 11 &&
    taxData.totalTdsDeducted?.trim() &&
    Number(taxData.totalTdsDeducted.replace(/[^0-9.]/g, '')) > 0
  )

  return (
    <div className="tds-step1-page">
      <TdsRefundStepTracker currentStep={currentStep} />

      <TdsRefundPrelimBanner
        assessmentYear={profile.assessmentYear || 'AY 2026-27'}
        refundAmount={computedRefundTotal}
      />

      <div className="tds-step1-layout">
        <form className="tds-step1-main" onSubmit={handleContinue}>
          <TdsRefundPersonalInfoSection
            profile={profile}
            onChange={handleProfileChange}
            isValid={isProfileValid}
          />

          <TdsRefundBankSection
            bankDetails={bankDetails}
            onChange={handleBankChange}
            error={error}
          />

          <TdsRefundTaxDetailsSection
            data={taxData}
            onChange={handleTaxChange}
          />
        </form>

        <TdsRefundProgressionSidebar />
      </div>

      <StepActionBar
        onBack={onBack}
        onNext={handleContinue}
        onSaveDraft={onSaveDraft}
        nextLabel="Continue"
        nextDisabled={!isStep1Valid}
      />
    </div>
  )
}

export const TdsRefundStepCustomerIncome = TdsRefundCustomerIncome
export default TdsRefundCustomerIncome
