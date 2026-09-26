import React from 'react'
import { routePaths } from '@core/config/routePaths'
import { DraftConfirmModal } from '@shared/components'
import { NoticeInformation, NoticeDocument } from './NoticeInformation'
import { NoticeSummary } from './NoticeSummary'
import { SupportingDocuments } from './SupportingDocuments'
import { ReviewResponse } from './ReviewResponse'
import { NoticeStatus } from './NoticeStatus'
import { NoticeStepper } from './NoticeStepper'
import { useTaxNoticeAssistanceFlow } from '../../hooks/useTaxNoticeAssistanceFlow'
import './TaxNoticeAssistance.css'

export const TaxNoticeAssistance: React.FC = () => {
  const {
    navigate,
    user,
    step,
    setStep,
    formData,
    isSubmitting,
    isModalOpen,
    handleUpdateFormData,
    handleSaveDraftAndExit,
    handleBack,
    handleFinalApproveAndSubmit,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
  } = useTaxNoticeAssistanceFlow()

  return (
    <div className="tax-notice-page">
      <div className="tax-notice-card">
        {step >= 1 && step <= 5 && (
          <NoticeStepper
            currentStep={step}
            onStepClick={(targetStep) => {
              if (targetStep < step) {
                setStep(targetStep as 1 | 2 | 3 | 4 | 5)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          />
        )}

        {step === 1 && (
          <NoticeInformation
            formData={formData}
            onChange={handleUpdateFormData}
            onBack={handleBack}
            onSaveDraftAndExit={handleSaveDraftAndExit}
            onNext={() => {
              setStep(2)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        )}

        {step === 2 && (
          <NoticeDocument
            formData={formData}
            onChange={handleUpdateFormData}
            onBack={() => {
              setStep(1)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onSaveDraftAndExit={handleSaveDraftAndExit}
            onNext={() => {
              setStep(3)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        )}

        {step === 3 && (
          <NoticeSummary
            formData={formData}
            onBack={() => {
              setStep(2)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onSaveDraftAndExit={handleSaveDraftAndExit}
            onNext={() => {
              setStep(4)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        )}

        {step === 4 && (
          <SupportingDocuments
            formData={formData}
            onChange={handleUpdateFormData}
            onBack={() => {
              setStep(3)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onSaveDraftAndExit={handleSaveDraftAndExit}
            onNext={() => {
              setStep(5)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        )}

        {step === 5 && (
          <ReviewResponse
            formData={formData}
            userName={user?.fullName || 'Assessee'}
            onEditRequest={() => {
              setStep(1)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onApproveAndSubmit={handleFinalApproveAndSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        {step === 6 && (
          <NoticeStatus
            formData={formData}
            onBackToTaxServices={() => navigate(routePaths.itr.root)}
          />
        )}
      </div>

      <DraftConfirmModal
        isOpen={isModalOpen}
        serviceTitle="Tax Notice Assistance"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />
    </div>
  )
}

export default TaxNoticeAssistance
