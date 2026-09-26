import React, { useState } from 'react'
import { useAuthStore } from '@store/index'
import {
  getStoredTaxpayerProfile,
  type AssessmentYearOption,
  type ResidentialStatusOption,
  type FilingTypeOption,
  type FilingBankAccount,
  type PreviousItrInfo,
} from './itrFiling.constants'
import { StepActionBar } from '@shared/components'
import './ItrStepPersonalInfoView.css'
import { ItrStepHeaderStepper } from './ItrStepHeaderStepper'
import { ItrRefundBankSection } from './ItrRefundBankSection'
import { ItrPreviousItrSection } from './ItrPreviousItrSection'
import {
  ItrTaxpayerProfileCard,
  ItrFilingOptionsCard,
  ItrFilingTypeCard,
} from './ItrPersonalInfoCards'

export interface ItrStepPersonalInfoViewProps {
  onBack: () => void
  onNext: () => void
  onSaveDraft?: () => void
  initialAssessmentYear?: AssessmentYearOption
  onAssessmentYearChange?: (ay: AssessmentYearOption) => void
  initialResidentialStatus?: ResidentialStatusOption
  onResidentialStatusChange?: (status: ResidentialStatusOption) => void
  initialFilingType?: FilingTypeOption
  onFilingTypeChange?: (ft: FilingTypeOption) => void
  initialBankAccounts?: FilingBankAccount[]
  onBankAccountsChange?: (accounts: FilingBankAccount[]) => void
  initialSelectedBankId?: string
  onSelectedBankIdChange?: (id: string) => void
  initialPreviousItr?: PreviousItrInfo
  onPreviousItrChange?: (info: PreviousItrInfo) => void
}

export const ItrStepPersonalInfoView: React.FC<ItrStepPersonalInfoViewProps> = ({
  onBack,
  onNext,
  onSaveDraft,
  initialAssessmentYear,
  onAssessmentYearChange,
  initialResidentialStatus,
  onResidentialStatusChange,
  initialFilingType,
  onFilingTypeChange,
  initialBankAccounts,
  onBankAccountsChange,
  initialSelectedBankId,
  onSelectedBankIdChange,
  initialPreviousItr,
  onPreviousItrChange,
}) => {
  const authUser = useAuthStore((state) => state.user)
  const taxpayerProfile = getStoredTaxpayerProfile(authUser)

  const [assessmentYear, setAssessmentYear] = useState<AssessmentYearOption>(
    initialAssessmentYear || ''
  )
  const [residentialStatus, setResidentialStatus] = useState<ResidentialStatusOption>(
    initialResidentialStatus || ''
  )
  const [filingType, setFilingType] = useState<FilingTypeOption>(
    initialFilingType || ''
  )

  const handleAyChange = (ay: AssessmentYearOption) => {
    setAssessmentYear(ay)
    onAssessmentYearChange?.(ay)
  }

  const handleResidentialChange = (status: ResidentialStatusOption) => {
    setResidentialStatus(status)
    onResidentialStatusChange?.(status)
  }

  const handleFilingTypeChange = (ft: FilingTypeOption) => {
    setFilingType(ft)
    onFilingTypeChange?.(ft)
  }

  const isFormValid =
    Boolean(assessmentYear) &&
    Boolean(residentialStatus) &&
    Boolean(filingType)

  return (
    <div className="itr-filing-step itr-step-personal-info">
      {/* Header with Step Indicator */}
      <ItrStepHeaderStepper currentStepId={1} />

      {/* 1. Taxpayer Identity Card */}
      <ItrTaxpayerProfileCard taxpayerProfile={taxpayerProfile} />

      {/* 2. Assessment Year & Residential Status */}
      <ItrFilingOptionsCard
        assessmentYear={assessmentYear}
        onAssessmentYearChange={handleAyChange}
        residentialStatus={residentialStatus}
        onResidentialStatusChange={handleResidentialChange}
      />

      {/* 3. Filing Type Card */}
      <ItrFilingTypeCard
        filingType={filingType}
        onFilingTypeChange={handleFilingTypeChange}
      />

      {/* 4. Bank Accounts for Refund */}
      <ItrRefundBankSection
        bankAccounts={initialBankAccounts ?? []}
        onBankAccountsChange={onBankAccountsChange ?? (() => {})}
        selectedBankId={initialSelectedBankId ?? ''}
        onSelectedBankIdChange={onSelectedBankIdChange ?? (() => {})}
      />

      {/* 5. Previous Year Return Details */}
      <ItrPreviousItrSection
        previousItr={initialPreviousItr ?? { hasPreviousReturn: false }}
        onPreviousItrChange={onPreviousItrChange ?? (() => {})}
      />

      {/* Floating Action Bar */}
      <StepActionBar
        onBack={onBack}
        onNext={onNext}
        onSaveDraft={onSaveDraft}
        nextLabel="Save &amp; Continue to Income Sources"
        nextDisabled={!isFormValid}
      />
    </div>
  )
}
