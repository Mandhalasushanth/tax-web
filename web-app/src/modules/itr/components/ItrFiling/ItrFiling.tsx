import { DraftConfirmModal } from '@shared/components'
import { ItrCategorySelectionView } from './ItrCategorySelectionView'
import { ItrStepPersonalInfoView } from './ItrStepPersonalInfoView'
import { ItrStepIncomeSourcesView } from './ItrStepIncomeSourcesView'
import { ItrStepRegimeDeductionsView } from './ItrStepRegimeDeductionsView'
import { ItrStepDocumentsView } from './ItrStepDocumentsView'
import { ItrStepReviewView } from './ItrStepReviewView'
import { ItrFilingSubmittedView } from './ItrFilingSubmittedView'
import { useItrFilingState } from './useItrFilingState'
import './ItrFiling.css'

export const ItrFiling = () => {
  const {
    isStarted, setIsStarted, currentStep, setCurrentStep, selectedCategoryId, setSelectedCategoryId,
    assessmentYear, setAssessmentYear, residentialStatus, setResidentialStatus, filingType, setFilingType,
    bankAccounts, setBankAccounts, selectedBankId, setSelectedBankId, selectedBank, previousItr, setPreviousItr,
    selectedSources, setSelectedSources, salaryDetails, setSalaryDetails, housePropertyDetails, setHousePropertyDetails,
    businessDetails, setBusinessDetails, capitalGainsDetails, setCapitalGainsDetails, otherSourcesDetails, setOtherSourcesDetails,
    selectedRegime, setSelectedRegime, deductions, setDeductions, uploadedDocs, handleUploadDoc, handleRemoveDoc,
    isSubmitted, submittedRef, isSubmitting, handleFinalSubmit, isModalOpen, openModal,
    handleSaveAndExit, handleDiscardAndExit, handleKeepEditing,
  } = useItrFilingState()

  const stepTo = (step: number) => {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isSubmitted) {
    return (
      <ItrFilingSubmittedView
        submittedRef={submittedRef}
        assessmentYear={assessmentYear}
        selectedSources={selectedSources}
        selectedRegime={selectedRegime}
        bankAccounts={bankAccounts}
        selectedBankId={selectedBankId}
        docCount={Object.keys(uploadedDocs).length}
      />
    )
  }

  return (
    <>
      {!isStarted && (
        <ItrCategorySelectionView
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
          onStart={(id) => { setSelectedCategoryId(id); setIsStarted(true); setCurrentStep(1) }}
        />
      )}
      {isStarted && currentStep === 1 && (
        <ItrStepPersonalInfoView
          onBack={() => setIsStarted(false)}
          onNext={() => stepTo(2)}
          onSaveDraft={openModal}
          initialAssessmentYear={assessmentYear} onAssessmentYearChange={setAssessmentYear}
          initialResidentialStatus={residentialStatus} onResidentialStatusChange={setResidentialStatus}
          initialFilingType={filingType} onFilingTypeChange={setFilingType}
          initialBankAccounts={bankAccounts} onBankAccountsChange={setBankAccounts}
          initialSelectedBankId={selectedBankId} onSelectedBankIdChange={setSelectedBankId}
          initialPreviousItr={previousItr} onPreviousItrChange={setPreviousItr}
        />
      )}
      {isStarted && currentStep === 2 && (
        <ItrStepIncomeSourcesView
          onBack={() => stepTo(1)} onNext={() => stepTo(3)} onSaveDraft={openModal}
          salaryDetails={salaryDetails} onSalaryDetailsChange={setSalaryDetails}
          housePropertyDetails={housePropertyDetails} onHousePropertyDetailsChange={setHousePropertyDetails}
          businessDetails={businessDetails} onBusinessDetailsChange={setBusinessDetails}
          capitalGainsDetails={capitalGainsDetails} onCapitalGainsDetailsChange={setCapitalGainsDetails}
          otherSourcesDetails={otherSourcesDetails} onOtherSourcesDetailsChange={setOtherSourcesDetails}
          selectedSources={selectedSources} onSourcesChange={setSelectedSources}
        />
      )}
      {isStarted && currentStep === 3 && (
        <ItrStepRegimeDeductionsView
          onBack={() => stepTo(2)} onNext={() => stepTo(4)} onSaveDraft={openModal}
          selectedSources={selectedSources} salaryDetails={salaryDetails}
          housePropertyDetails={housePropertyDetails} businessDetails={businessDetails}
          capitalGainsDetails={capitalGainsDetails} otherSourcesDetails={otherSourcesDetails}
          selectedRegime={selectedRegime} onRegimeChange={setSelectedRegime}
          deductions={deductions} onDeductionsChange={setDeductions}
        />
      )}
      {isStarted && currentStep === 4 && (
        <ItrStepDocumentsView
          onBack={() => stepTo(3)} onNext={() => stepTo(5)} onSaveDraft={openModal}
          uploadedDocs={uploadedDocs} onUploadDoc={handleUploadDoc} onRemoveDoc={handleRemoveDoc}
        />
      )}
      {isStarted && currentStep === 5 && (
        <ItrStepReviewView
          onBack={() => stepTo(4)} onSubmit={handleFinalSubmit} onSaveDraft={openModal}
          assessmentYear={assessmentYear} residentialStatus={residentialStatus} filingType={filingType}
          selectedBank={selectedBank} salaryDetails={salaryDetails} housePropertyDetails={housePropertyDetails}
          businessDetails={businessDetails} capitalGainsDetails={capitalGainsDetails} otherSourcesDetails={otherSourcesDetails}
          selectedSources={selectedSources} selectedRegime={selectedRegime} deductions={deductions}
          uploadedDocs={uploadedDocs} isSubmitting={isSubmitting}
        />
      )}

      <DraftConfirmModal
        isOpen={isModalOpen} serviceTitle="ITR filing"
        onSaveAndExit={handleSaveAndExit} onDiscardAndExit={handleDiscardAndExit} onKeepEditing={handleKeepEditing}
      />
    </>
  )
}

export default ItrFiling
