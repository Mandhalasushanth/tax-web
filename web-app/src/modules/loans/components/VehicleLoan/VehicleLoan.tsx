import React from 'react'
import { FlowStepper } from '@shared/components'
import type { FlowStepItem } from '@shared/components'
import { LoanStepErrorBanner, LoanStepFlowFooter } from '@modules/loans/shared'
import { useLoanStepFlow } from '@modules/loans/hooks/useLoanStepFlow'
import { toAmount } from '@modules/loans/validation/commonLoanValidation'
import type { VehicleLoanData } from '@modules/loans/types/vehicleLoan.types'
import { vehicleLoanValidation } from '@modules/loans/validation/vehicleLoanValidation'

import { VehicleRequirements } from './steps/VehicleRequirements/VehicleRequirements'
import { ApplicantDetails } from './steps/ApplicantDetails/ApplicantDetails'
import { BankingDetails } from './steps/BankingDetails/BankingDetails'
import { DocumentDossier } from './steps/DocumentDossier/DocumentDossier'
import { ReviewAndDeclaration } from './steps/ReviewAndDeclaration/ReviewAndDeclaration'
import './VehicleLoan.css'

const VEHICLE_LOAN_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'Vehicle & Loan Requirements', shortLabel: 'Requirements' },
  { stepNumber: 2, title: 'Employment & Income', shortLabel: 'Employment' },
  { stepNumber: 3, title: 'Banking & ITR', shortLabel: 'Banking & ITR' },
  { stepNumber: 4, title: 'Document Dossier', shortLabel: 'Documents' },
  { stepNumber: 5, title: 'Review & Submit', shortLabel: 'Review & Submit' },
]

const INITIAL_VEHICLE_LOAN_DATA: VehicleLoanData = {
  loanAmount: '',
  vehicleCategory: '',
  repaymentTenure: '',
  vehicleCondition: 'New Vehicle',
  vehicleMakeModel: '',
  customVehicleMakeModel: '',
  onRoadPrice: '',
  downPayment: '',
  occupationType: 'Business Owner',
  monthlyIncomeRange: '',
  legalBusinessName: '',
  gstin: '',
  udyamNumber: '',
  businessVintageYears: '',
  annualTurnover: '',
  hasActiveEmis: false,
  totalMonthlyEmi: '',
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  branchName: '',
  itrStatus: 'Filed',
  itrAckNumber: '',
  grossAnnualIncomeItr: '',
  uploadedDocs: {},
  termsAccepted: false,
}

/** "3 Years" → 36, "18 Months" → 18 */
const toTenureMonths = (tenure: string): number => {
  const value = Number(String(tenure).match(/\d+/)?.[0]) || 0
  return /year|yr/i.test(String(tenure)) ? value * 12 : value
}

export const VehicleLoan: React.FC = () => {
  const flow = useLoanStepFlow<VehicleLoanData>({
    loanType: 'vehicle_loan',
    loanTitle: 'Vehicle Loan',
    initialValues: INITIAL_VEHICLE_LOAN_DATA,
    application: {
      serviceTitle: 'Vehicle Loan',
      totalSteps: 5,
      stepLabels: VEHICLE_LOAN_STEPS.map((s) => s.title ?? ''),
      resumeRoute: '/loans/vehicle-loan',
    },
    validators: [
      vehicleLoanValidation.validateStep1,
      vehicleLoanValidation.validateStep2,
      vehicleLoanValidation.validateStep3,
      vehicleLoanValidation.validateStep4,
      vehicleLoanValidation.validateStep5,
    ],
    buildSubmission: (data) => ({
      title: 'Vehicle Loan Application',
      category: 'Vehicle & Auto Finance',
      requestedAmount: toAmount(data.loanAmount),
      tenureMonths: toTenureMonths(data.repaymentTenure),
      details: { ...data },
    }),
  })
  const { formData, currentStep, fieldErrors, handleFieldChange } = flow

  return (
    <div className="vehicle-loan-page" data-testid="vehicle-loan-page">
      <h1 className="vehicle-loan-page__title">Vehicle Loan</h1>

      <FlowStepper steps={VEHICLE_LOAN_STEPS} currentStep={currentStep} onStepClick={flow.handleStepClick} />

      <LoanStepErrorBanner message={flow.stepError} />

      <div className="vehicle-loan-page__card">
        {currentStep === 1 && <VehicleRequirements data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 2 && <ApplicantDetails data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 3 && <BankingDetails data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 4 && <DocumentDossier data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 5 && (
          <ReviewAndDeclaration
            data={formData}
            onChange={handleFieldChange}
            onNavigateToStep={flow.navigateToStep}
            errors={fieldErrors}
          />
        )}
      </div>

      <LoanStepFlowFooter
        flow={flow}
        serviceTitle="Vehicle Loan Application"
        successTitle="Vehicle Loan Submitted"
        successMessage="Your Vehicle Loan application has been successfully received. A TaxEdge Loan Advisor will review your vehicle quotation and contact you shortly."
      />
    </div>
  )
}

export default VehicleLoan
