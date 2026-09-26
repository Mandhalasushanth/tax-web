import React from 'react'
import { DraftConfirmModal } from '@shared/components'
import { TdsRefundOverview } from './TdsRefundOverview'
import { TdsRefundCustomerIncome } from './TdsRefundCustomerIncome'
import { TdsRefundDocuments } from './TdsRefundDocuments'
import { TdsRefundReview } from './TdsRefundReview'
import { TdsRefundPayment } from './TdsRefundPayment'
import { TdsRefundStatus } from './TdsRefundStatus'
import { useTdsRefundFlow } from '../../hooks/useTdsRefundFlow'
import './TdsRefund.css'

export const TdsRefund: React.FC = () => {
  const {
    user,
    tdsRef,
    currentStep,
    setCurrentStep,
    profile,
    setProfile,
    bankDetails,
    setBankDetails,
    taxData,
    setTaxData,
    uploads,
    setUploads,
    isModalOpen,
    openModal,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
    handleFinishSubmission
  } = useTdsRefundFlow()

  return (
    <>
      {currentStep === 0 && <TdsRefundOverview onStart={() => setCurrentStep(1)} />}
      
      {currentStep === 1 && (
        <TdsRefundCustomerIncome
          onBack={() => setCurrentStep(0)} 
          onNext={() => setCurrentStep(2)} 
          onSaveDraft={openModal}
          currentStep={1} 
          initialProfile={profile as any} 
          onProfileChange={setProfile as any}
          initialBankDetails={bankDetails as any} 
          onBankChange={setBankDetails as any}
          initialTaxData={taxData as any} 
          onTaxChange={setTaxData as any}
        />
      )}
      
      {currentStep === 2 && (
        <TdsRefundDocuments
          onBack={() => setCurrentStep(1)} 
          onNext={() => setCurrentStep(3)} 
          onSaveDraft={openModal}
          initialUploads={uploads as any} 
          onUploadsChange={setUploads as any}
        />
      )}
      
      {currentStep === 3 && (
        <TdsRefundReview
          onBack={() => setCurrentStep(2)} 
          onEditStep1={() => setCurrentStep(1)} 
          onEditStep2={() => setCurrentStep(2)}
          onNext={() => setCurrentStep(4)} 
          onSaveDraft={openModal}
          profile={profile as any} 
          bankDetails={bankDetails as any} 
          taxData={taxData as any} 
          uploads={uploads as any}
        />
      )}
      
      {currentStep === 4 && (
        <TdsRefundPayment
          applicantName={profile.fullName || profile.name || user?.fullName || 'Taxpayer'}
          applicationRef={tdsRef} 
          onBack={() => setCurrentStep(3)} 
          onNext={handleFinishSubmission}
        />
      )}
      
      {currentStep === 5 && (
        <TdsRefundStatus 
          applicationId={tdsRef} 
          onBack={() => setCurrentStep(4)} 
          onBackToDashboard={() => setCurrentStep(0)} 
        />
      )}

      <DraftConfirmModal
        isOpen={isModalOpen} 
        serviceTitle="TDS refund"
        onSaveAndExit={handleSaveAndExit} 
        onDiscardAndExit={handleDiscardAndExit} 
        onKeepEditing={handleKeepEditing}
      />
    </>
  )
}

export default TdsRefund
