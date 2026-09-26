import { routePaths } from '@core/config'
import { DraftConfirmModal } from '@shared/components'
import { GSTFilingPeriod } from './GSTFilingPeriod/GSTFilingPeriod'
import { GSTFilingDocuments } from './GSTFilingDocuments/GSTFilingDocuments'
import { GSTFilingReview } from './GSTFilingReview/GSTFilingReview'
import { GSTFilingPayment } from './GSTFilingPayment/GSTFilingPayment'
import { GSTFilingSuccess } from './GSTFilingSuccess/GSTFilingSuccess'
import { GSTFilingReceipt } from './GSTFilingReceipt/GSTFilingReceipt'
import { useGSTFilingFlow } from '../../hooks/useGSTFilingFlow'
import './GSTFiling.css'

export const GSTFiling = () => {
  const {
    navigate,
    currentStep,
    setCurrentStep,
    filingData,
    filingRef,
    paymentResult,
    uploadedFiles,
    notApplicableDocs,
    isModalOpen,
    openModal,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
    handleStepClick,
    handleStep1Continue,
    handleStep1Back,
    handleStep2Next,
    handleStep3Approve,
    handleStep4Success,
    handleFileUpload,
    handleFileRemove,
    handleToggleNotApplicable,
  } = useGSTFilingFlow()

  return (
    <div className="gst-filing-page">
      {/* Step 1: Period Selection */}
      {currentStep === 1 && (
        <GSTFilingPeriod
          initialData={filingData}
          onStepClick={handleStepClick}
          onContinue={handleStep1Continue}
          onCancel={handleStep1Back}
          onSaveDraft={openModal}
        />
      )}

      {/* Step 2: Upload Documents & Checklist */}
      {currentStep === 2 && (
        <GSTFilingDocuments
          selectedMonth={filingData.selectedMonth}
          baseFee={filingData.baseFee}
          returnType={filingData.returnType}
          frequency={filingData.frequency}
          uploadedFiles={uploadedFiles}
          notApplicableDocs={notApplicableDocs}
          onFileUpload={handleFileUpload}
          onFileRemove={handleFileRemove}
          onToggleNotApplicable={handleToggleNotApplicable}
          onStepClick={handleStepClick}
          onSaveDraft={openModal}
          onBack={() => {
            setCurrentStep(1)
            navigate(routePaths.gst.filePeriod)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onNext={handleStep2Next}
        />
      )}

      {/* Step 3: Review & Tax Figures */}
      {currentStep === 3 && (
        <GSTFilingReview
          selectedMonth={filingData.selectedMonth}
          baseFee={filingData.baseFee}
          filingData={filingData}
          uploadedFiles={uploadedFiles}
          notApplicableDocs={notApplicableDocs}
          onStepClick={handleStepClick}
          onSaveDraft={openModal}
          onEditFilingDetails={() => {
            setCurrentStep(1)
            navigate(routePaths.gst.filePeriod)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onBack={() => {
            setCurrentStep(2)
            navigate(routePaths.gst.fileUpload)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onRequestChange={() => {
            setCurrentStep(2)
            navigate(routePaths.gst.fileUpload)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onApprove={handleStep3Approve}
        />
      )}

      {/* Step 4: Payment */}
      {currentStep === 4 && (
        <GSTFilingPayment
          amount={
            filingData.baseFee > 0
              ? filingData.baseFee + Math.round(filingData.baseFee * 0.18)
              : 2950
          }
          applicationRef={filingRef}
          serviceTitle={`GST Filing — ${filingData.selectedMonth || 'Return'}`}
          onStepClick={handleStepClick}
          onBack={() => {
            setCurrentStep(3)
            navigate(routePaths.gst.fileReview)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onSuccess={handleStep4Success}
        />
      )}

      {/* Step 5: Success Screen */}
      {currentStep === 5 && (
        <GSTFilingSuccess
          details={paymentResult}
          onBack={() => {
            setCurrentStep(4)
            navigate(routePaths.gst.filePayment)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onViewReceipt={() => {
            setCurrentStep(6)
            navigate(routePaths.gst.fileReceipt)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onTrackApplication={() =>
            navigate(routePaths.gst.detail(paymentResult.applicationRef || filingRef))
          }
          onBackToDashboard={() => navigate(routePaths.gst.root)}
        />
      )}

      {/* Step 6: Receipt Screen */}
      {currentStep === 6 && (
        <GSTFilingReceipt
          details={paymentResult}
          onBack={() => {
            setCurrentStep(5)
            navigate(routePaths.gst.fileSuccess)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}

      <DraftConfirmModal
        isOpen={isModalOpen}
        serviceTitle="GST Filing"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />
    </div>
  )
}

export default GSTFiling
