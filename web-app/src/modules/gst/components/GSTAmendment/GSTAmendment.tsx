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
import { getAmendmentConfig } from './amendmentConfigs'
import { formatGstDateTime } from '@modules/gst/utils/gstFormat'
import { useGSTAmendmentFlow } from '@modules/gst/hooks/useGSTAmendmentFlow'
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
    openDraftModal,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
    handleDetailFormSubmit,
    handleFinalSubmit,
    handleBackToDashboard,
  } = useGSTAmendmentFlow()

  if (submittedRecord) {
    const sectionTitle = selectedOption
      ? getAmendmentConfig(selectedOption.id, selectedOption.title).title
      : 'Legal Business Name'

    return (
      <GSTAmendmentSubmitted
        arnNumber={submittedRecord.reference}
        submissionDateText={formatGstDateTime(submittedRecord.createdAt)}
        requestedSection={sectionTitle}
        onTrackAmendment={() =>
          navigate(routePaths.gst.track(submittedRecord.reference))
        }
        onOpenMyApplications={handleBackToDashboard}
      />
    )
  }

  if (selectedOption && formData) {
    const config = getAmendmentConfig(selectedOption.id, selectedOption.title)

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
          uploadDateText={`Uploaded on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`}
          isSubmitting={isSubmitting}
          onBack={() => setFormData(null)}
          onSubmit={handleFinalSubmit}
          onSaveDraft={openDraftModal}
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
    const config = getAmendmentConfig(selectedOption.id, selectedOption.title)

    const isAddressType =
      selectedOption.id === 'principal_place' || selectedOption.id === 'additional_place'

    return (
      <div className="gst-amendment-page">
        {selectedOption.id === 'bank_accounts' ? (
          <GSTBankAccountsForm
            isSubmitting={isSubmitting}
            onBack={() => setSelectedOption(null)}
            onSubmit={handleDetailFormSubmit}
            onSaveDraft={openDraftModal}
          />
        ) : selectedOption.id === 'authorised_signatories' ? (
          <GSTSignatoriesForm
            isSubmitting={isSubmitting}
            onBack={() => setSelectedOption(null)}
            onSubmit={handleDetailFormSubmit}
            onSaveDraft={openDraftModal}
          />
        ) : selectedOption.id === 'contact_details' ? (
          <GSTContactDetailsForm
            isSubmitting={isSubmitting}
            onBack={() => setSelectedOption(null)}
            onSubmit={handleDetailFormSubmit}
            onSaveDraft={openDraftModal}
          />
        ) : isAddressType ? (
          <GSTAmendmentAddressForm
            title={config.title}
            isSubmitting={isSubmitting}
            onBack={() => setSelectedOption(null)}
            onSubmit={handleDetailFormSubmit}
            onSaveDraft={openDraftModal}
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
            onSaveDraft={openDraftModal}
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
