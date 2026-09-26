import React from 'react'
import { useRevisedItr } from '../../hooks/useRevisedItr'
import { Step1FindOriginalReturn } from './Step1FindOriginalReturn'
import { Step2ReasonForRevision } from './Step2ReasonForRevision'
import { Step6ApplicationReceived } from './Step6ApplicationReceived'
import { MissedIncomeStep3, MissedIncomeStep4, MissedIncomeStep5 } from './MissedIncome'
import { WrongDeductionStep3, WrongDeductionStep4, WrongDeductionStep5 } from './WrongDeduction'
import { IncorrectBankStep3, IncorrectBankStep4, IncorrectBankStep5 } from './IncorrectBankDetails'
import { OtherCorrectionStep3, OtherCorrectionStep4, OtherCorrectionStep5 } from './Other'
import { StepActionBar, PaymentCheckout, DraftConfirmModal } from '@shared/components'
import './RevisedItr.css'

export const RevisedItr: React.FC = () => {
  const {
    step,
    showPayment,
    isSubmitted,
    applicationId,
    ackNumber,
    selectedAy,
    isDropdownOpen,
    isReturnFound,
    returnDetails,
    selectedReason,
    otherReasonText,
    incomeCorrections,
    deductionCorrections,
    bankCorrections,
    uploadedDocuments,
    isLoading,
    errors,
    dropdownRef,
    handleKeyDown,
    handleAckChange,
    handleSelectAy,
    handleToggleDropdown,
    handleSelectReason,
    handleOtherReasonChange,
    handleIncomeChange,
    handleDeductionChange,
    handleBankChange,
    handleFileUpload,
    handleFileRemove,
    handleBack,
    handleContinue,
    handlePaymentSuccess,
    handleDownloadReceipt,
    goToStep,
    isModalOpen,
    openModal,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
  } = useRevisedItr()

  const originalAmounts = {
    salaryOriginal: returnDetails?.salaryOriginal ?? 0,
    otherOriginal: returnDetails?.otherOriginal ?? 0,
    taxableOriginal: returnDetails?.taxableOriginal ?? 0,
  }

  const Step4Component =
    selectedReason === 'wrong_deduction' ? WrongDeductionStep4 :
    selectedReason === 'incorrect_bank' ? IncorrectBankStep4 :
    selectedReason === 'other' ? OtherCorrectionStep4 :
    MissedIncomeStep4

  return (
    <div className="revised-itr-page">
      <div className="revised-itr-content-area">
        {showPayment ? (
          <PaymentCheckout
            amount={999}
            serviceTitle="Revised ITR Filing Assistance"
            applicationRef={ackNumber || 'REV-ITR-2025'}
            applicantName={returnDetails?.personalInfo?.fullName || 'Assessee'}
            onBack={handleBack}
            onSuccess={handlePaymentSuccess}
          />
        ) : isSubmitted ? (
          <Step6ApplicationReceived
            applicationId={applicationId}
            selectedAy={selectedAy}
            returnDetails={returnDetails}
            uploadedDocuments={uploadedDocuments}
            onBack={handleBack}
            onDownloadReceipt={handleDownloadReceipt}
          />
        ) : (
          <>
            {/* Step 1: Find Original Return */}
            {step === 1 && (
              <Step1FindOriginalReturn
                ackNumber={ackNumber}
                selectedAy={selectedAy}
                isDropdownOpen={isDropdownOpen}
                isReturnFound={isReturnFound}
                returnDetails={returnDetails}
                ackError={errors.ackError}
                ayError={errors.ayError}
                dropdownRef={dropdownRef}
                onAckChange={handleAckChange}
                onKeyDown={handleKeyDown}
                onToggleDropdown={handleToggleDropdown}
                onSelectAy={handleSelectAy}
              />
            )}

            {/* Step 2: Reason for Revision */}
            {step === 2 && (
              <Step2ReasonForRevision
                selectedReason={selectedReason}
                otherReasonText={otherReasonText}
                reasonError={errors.reasonError}
                otherReasonError={errors.otherReasonError}
                onSelectReason={handleSelectReason}
                onOtherReasonChange={handleOtherReasonChange}
              />
            )}

            {/* Step 3: Update Details */}
            {step === 3 && (
              selectedReason === 'wrong_deduction' ? (
                <WrongDeductionStep3
                  deductionCorrections={deductionCorrections}
                  originalAmounts={originalAmounts}
                  taxableError={errors.taxableIncomeError}
                  onDeductionChange={handleDeductionChange}
                  onKeyDown={handleKeyDown}
                />
              ) : selectedReason === 'incorrect_bank' ? (
                <IncorrectBankStep3
                  bankCorrections={bankCorrections}
                  bankAccountError={errors.bankAccountError}
                  ifscError={errors.ifscError}
                  onBankChange={handleBankChange}
                  onKeyDown={handleKeyDown}
                />
              ) : selectedReason === 'other' ? (
                <OtherCorrectionStep3
                  otherReasonText={otherReasonText}
                  incomeCorrections={incomeCorrections}
                  deductionCorrections={deductionCorrections}
                  bankCorrections={bankCorrections}
                  originalAmounts={originalAmounts}
                  salaryError={errors.salaryIncomeError}
                  taxableError={errors.taxableIncomeError}
                  bankAccountError={errors.bankAccountError}
                  ifscError={errors.ifscError}
                  onChange={handleIncomeChange}
                  onDeductionChange={handleDeductionChange}
                  onBankChange={handleBankChange}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <MissedIncomeStep3
                  incomeCorrections={incomeCorrections}
                  originalAmounts={originalAmounts}
                  salaryError={errors.salaryIncomeError}
                  taxableError={errors.taxableIncomeError}
                  onChange={handleIncomeChange}
                  onKeyDown={handleKeyDown}
                />
              )
            )}

            {/* Step 4: Upload Documents */}
            {step === 4 && (
              <Step4Component
                selectedAy={selectedAy}
                uploadedDocuments={uploadedDocuments}
                documentsError={errors.documentsError}
                onUpload={handleFileUpload}
                onRemove={handleFileRemove}
              />
            )}

            {/* Step 5: Review Revised ITR */}
            {step === 5 && (
              selectedReason === 'wrong_deduction' ? (
                <WrongDeductionStep5
                  ackNumber={ackNumber}
                  selectedAy={selectedAy}
                  returnDetails={returnDetails}
                  deductionCorrections={deductionCorrections}
                  uploadedDocuments={uploadedDocuments}
                  onEditStep={goToStep}
                />
              ) : selectedReason === 'incorrect_bank' ? (
                <IncorrectBankStep5
                  ackNumber={ackNumber}
                  selectedAy={selectedAy}
                  returnDetails={returnDetails}
                  bankCorrections={bankCorrections}
                  uploadedDocuments={uploadedDocuments}
                  onEditStep={goToStep}
                />
              ) : selectedReason === 'other' ? (
                <OtherCorrectionStep5
                  ackNumber={ackNumber}
                  selectedAy={selectedAy}
                  returnDetails={returnDetails}
                  incomeCorrections={incomeCorrections}
                  deductionCorrections={deductionCorrections}
                  bankCorrections={bankCorrections}
                  otherReasonText={otherReasonText}
                  uploadedDocuments={uploadedDocuments}
                  onEditStep={goToStep}
                />
              ) : (
                <MissedIncomeStep5
                  ackNumber={ackNumber}
                  selectedAy={selectedAy}
                  returnDetails={returnDetails}
                  incomeCorrections={incomeCorrections}
                  uploadedDocuments={uploadedDocuments}
                  onEditStep={goToStep}
                />
              )
            )}

            {/* Reusable Action Bar */}
            <StepActionBar
              onBack={handleBack}
              onNext={handleContinue}
              onSaveDraft={openModal}
              backLabel={step === 1 ? 'Cancel' : 'Back'}
              nextLabel={step === 5 ? 'Proceed to Payment →' : 'Continue'}
              isSubmitting={isLoading}
            />
          </>
        )}
      </div>

      <DraftConfirmModal
        isOpen={isModalOpen}
        serviceTitle="Revised ITR Filing"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />
    </div>
  )
}

export default RevisedItr
