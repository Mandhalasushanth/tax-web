import { routePaths } from '@core/config'
import { DraftConfirmModal } from '@shared/components'
import {
  GSTAmendmentSelection,
  GSTAmendmentDetailForm,
  GSTAmendmentAddressForm,
  GSTBankAccountsForm,
  GSTSignatoriesForm,
  GSTContactDetailsForm,
  GSTAmendmentReview,
  GSTAmendmentSubmitted,
} from './index'
import { AMENDMENT_CONFIGS } from './amendmentConfigs'
import { useGSTAmendmentFlow } from '../../hooks/useGSTAmendmentFlow'
import { buildReviewData } from './gstAmendmentReviewHelpers'
import './GSTAmendment.css'

export const GSTAmendment = () => {
  const {
    navigate,
    gstin,
    setGstin,
    selectedOption,
    setSelectedOption,
    formData,
    setFormData,
    isSubmitting,
    submittedRecord,
    isModalOpen,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
    handleDetailFormSubmit,
    handleFinalSubmit,
    handleBackToDashboard,
  } = useGSTAmendmentFlow()

  if (submittedRecord) {
    const sectionTitle = selectedOption
      ? AMENDMENT_CONFIGS[selectedOption.id]?.title || selectedOption.title
      : 'Legal Business Name'

    const isSignatory = selectedOption?.id === 'authorised_signatories'
    const isBank = selectedOption?.id === 'bank_accounts'
    const isAdditional = selectedOption?.id === 'additional_place'

    const defaultArn = isSignatory ? 'AA2993899201' : isBank ? 'AA2993845112' : isAdditional ? 'AA2993724646' : 'AA2993887949'
    const defaultDate = isSignatory ? '16 Sep 2026, 12:40 PM' : isBank ? '16 Sep 2026, 11:48 AM' : isAdditional ? '16 Sep 2026, 10:05 AM' : '15 Sep 2026, 04:38 PM'

    return (
      <GSTAmendmentSubmitted
        arnNumber={submittedRecord.reference || defaultArn}
        submissionDateText={defaultDate}
        requestedSection={sectionTitle}
        onTrackAmendment={() =>
          navigate(routePaths.gst.track(submittedRecord.reference || defaultArn))
        }
        onOpenMyApplications={handleBackToDashboard}
      />
    )
  }

  if (selectedOption && formData) {
    const config = AMENDMENT_CONFIGS[selectedOption.id] || {
      title: selectedOption.title,
      currentValue: 'Current details',
      inputLabel: 'New Value',
      placeholder: 'Enter new value',
      proofs: [],
    }

    const reviewData = buildReviewData(selectedOption, formData, gstin, config.title)

    return (
      <div className="gst-amendment-page">
        <GSTAmendmentReview
          gstin={reviewData.reviewGstin}
          sectionTitle={reviewData.sectionTitle}
          amendmentType={selectedOption.type}
          currentValue={config.currentValue}
          requestedValue={formData.newValue}
          currentAddressDetails={reviewData.isAddressType ? reviewData.currentAddress : undefined}
          requestedAddressDetails={reviewData.isAddressType ? reviewData.requestedAddress : undefined}
          currentBankDetails={reviewData.currentBank}
          requestedBankDetails={reviewData.requestedBank}
          currentSignatoryDetails={reviewData.currentSig}
          requestedSignatoryDetails={reviewData.requestedSig}
          currentContactDetails={reviewData.currentContact}
          requestedContactDetails={reviewData.requestedContact}
          fileName={reviewData.fileName}
          fileSizeText={reviewData.fileSizeText}
          uploadDateText="Uploaded on 16 Sep 2026"
          isSubmitting={isSubmitting}
          onBack={() => setFormData(null)}
          onSubmit={handleFinalSubmit}
        />
        <DraftConfirmModal
          isOpen={isModalOpen}
          serviceTitle="GST Amendment"
          onSaveAndExit={handleSaveAndExit}
          onDiscardAndExit={handleDiscardAndExit}
          onKeepEditing={handleKeepEditing}
        />
      </div>
    )
  }

  if (selectedOption) {
    const config = AMENDMENT_CONFIGS[selectedOption.id] || {
      title: selectedOption.title,
      currentValue: 'Current details',
      inputLabel: 'New Value',
      placeholder: 'Enter new value',
      proofs: [],
    }

    const isAddressType =
      selectedOption.id === 'principal_place' || selectedOption.id === 'additional_place'

    return (
      <div className="gst-amendment-page">
        {selectedOption.id === 'bank_accounts' ? (
          <GSTBankAccountsForm
            isSubmitting={isSubmitting}
            onBack={() => setSelectedOption(null)}
            onSubmit={handleDetailFormSubmit}
          />
        ) : selectedOption.id === 'authorised_signatories' ? (
          <GSTSignatoriesForm
            isSubmitting={isSubmitting}
            onBack={() => setSelectedOption(null)}
            onSubmit={handleDetailFormSubmit}
          />
        ) : selectedOption.id === 'contact_details' ? (
          <GSTContactDetailsForm
            isSubmitting={isSubmitting}
            onBack={() => setSelectedOption(null)}
            onSubmit={handleDetailFormSubmit}
          />
        ) : isAddressType ? (
          <GSTAmendmentAddressForm
            title={config.title}
            isSubmitting={isSubmitting}
            onBack={() => setSelectedOption(null)}
            onSubmit={handleDetailFormSubmit}
          />
        ) : (
          <GSTAmendmentDetailForm
            title={config.title}
            currentValue={config.currentValue}
            inputLabel={config.inputLabel}
            placeholder={config.placeholder}
            proofs={config.proofs}
            isSubmitting={isSubmitting}
            onBack={() => setSelectedOption(null)}
            onSubmit={handleDetailFormSubmit}
          />
        )}
        <DraftConfirmModal
          isOpen={isModalOpen}
          serviceTitle="GST Amendment"
          onSaveAndExit={handleSaveAndExit}
          onDiscardAndExit={handleDiscardAndExit}
          onKeepEditing={handleKeepEditing}
        />
      </div>
    )
  }

  return (
    <div className="gst-amendment-page">
      <GSTAmendmentSelection
        gstin={gstin}
        onGstinChange={setGstin}
        onSelectOption={(option) => {
          setSelectedOption(option)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />
      <DraftConfirmModal
        isOpen={isModalOpen}
        serviceTitle="GST Amendment"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />
    </div>
  )
}

export default GSTAmendment
