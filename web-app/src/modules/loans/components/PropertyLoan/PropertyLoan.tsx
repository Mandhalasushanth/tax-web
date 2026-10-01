import React from 'react'
import { FlowStepper } from '@shared/components'
import { LoanStepErrorBanner, LoanStepFlowFooter } from '@modules/loans/shared'
import { useLoanStepFlow } from '@modules/loans/hooks/useLoanStepFlow'
import type { FlowStepItem } from '@shared/components'
import { toAmount } from '@modules/loans/validation/commonLoanValidation'
import { propertyLoanValidation } from '@modules/loans/validation/propertyLoanValidation'
import type { PropertyLoanData } from '@modules/loans/types/propertyLoan.types'
import {
  LoanRequirement,
  ApplicantIncome,
  PropertyDetails,
  Ownership,
  Documents,
  Review,
} from './steps'
import './PropertyLoan.css'

const INITIAL_PROPERTY_LOAN_DATA: PropertyLoanData = {
  // Step 1: Loan Requirement
  titleHolderName: '',
  titleHolderMobile: '',
  titleHolderEmail: '',
  titleHolderPan: '',
  titleHolderAadhaar: '',
  titleHolderDob: '',
  titleHolderAddress: '',

  loanPurpose: '',
  requiredAmount: '',
  tenureYears: '',
  applicantType: '',
  isExistingCustomer: null,

  // Step 2: Applicant & Income
  personalFullName: '',
  personalPan: '',
  personalMobile: '',
  personalDob: '',
  personalAddress: '',

  gender: '',
  maritalStatus: '',
  residenceType: '',
  yearsAtCurrentAddress: '',

  employerCategory: '',
  employerName: '',
  totalExperience: '',
  yearsInCurrentJob: '',
  annualIncome: '',

  hasExistingLoans: null,
  bankName: '',
  accountNumber: '',
  ifscCode: '',

  // Step 3: Property Details
  propertyPincode: '',
  propertyCity: '',
  propertyDistrict: '',
  propertyState: '',
  propertyAddress: '',
  propertyLandmark: '',

  propertyType: '',
  propertySubType: '',
  constructionStatus: '',
  currentUsage: '',
  areaType: '',
  propertyArea: '',
  propertyAge: '',
  approvingAuthority: '',
  estimatedMarketValue: '',

  // Step 4: Ownership
  ownershipType: 'sole',
  coOwnerFullName: '',
  coOwnerRelationship: '',
  coOwnerPan: '',
  coOwnerMobile: '',

  currentLender: '',
  existingLoanType: '',
  outstandingLoanAmount: '',
  ownershipConfirmed: false,

  // Step 5: Documents
  uploadedDocs: {},

  // Step 6: Review & Declaration
  declarationAgreed: false,
  inspectionAgreed: false,
  cibilConsentAgreed: false,
}

const PROPERTY_LOAN_STEPS: FlowStepItem[] = [
  { stepNumber: 1, title: 'Loan Requirement', shortLabel: 'Loan Requirement' },
  { stepNumber: 2, title: 'Applicant & Income', shortLabel: 'Applicant & Income' },
  { stepNumber: 3, title: 'Property Details', shortLabel: 'Property Details' },
  { stepNumber: 4, title: 'Ownership', shortLabel: 'Ownership' },
  { stepNumber: 5, title: 'Documents', shortLabel: 'Documents' },
  { stepNumber: 6, title: 'Review', shortLabel: 'Review' },
]

export const PropertyLoan: React.FC = () => {
  const flow = useLoanStepFlow<PropertyLoanData>({
    loanType: 'property_loan',
    loanTitle: 'Loan Against Property',
    initialValues: INITIAL_PROPERTY_LOAN_DATA,
    application: {
      serviceTitle: 'Loan Against Property',
      totalSteps: 6,
      stepLabels: PROPERTY_LOAN_STEPS.map((s) => s.title ?? ''),
      resumeRoute: '/loans/property-loan',
    },
    validators: [
      propertyLoanValidation.validateStep1,
      propertyLoanValidation.validateStep2,
      propertyLoanValidation.validateStep3,
      propertyLoanValidation.validateStep4,
      propertyLoanValidation.validateStep5,
      propertyLoanValidation.validateStep6,
    ],
    buildSubmission: (data) => ({
      title: 'Loan Against Property Application',
      category: 'Mortgage & Secured Finance',
      requestedAmount: toAmount(data.requiredAmount),
      tenureMonths: (parseInt(data.tenureYears, 10) || 0) * 12,
      details: {
        ...data,
        purposeOfLoan: data.loanPurpose || 'Loan Against Property',
        propertyEstimatedValue: data.estimatedMarketValue,
      },
    }),
    firstStepBack: 'draft',
  })
  const { formData, currentStep, fieldErrors, handleFieldChange } = flow

  return (
    <div className="property-loan-page" data-testid="property-loan-page">
      <h1 className="property-loan-page__title">Loan Against Property</h1>

      <FlowStepper steps={PROPERTY_LOAN_STEPS} currentStep={currentStep} onStepClick={flow.handleStepClick} />

      <LoanStepErrorBanner message={flow.stepError} />

      <div className="property-loan-page__card">
        {currentStep === 1 && <LoanRequirement data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 2 && <ApplicantIncome data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 3 && <PropertyDetails data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 4 && <Ownership data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 5 && <Documents data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 6 && (
          <Review
            data={formData}
            onChange={handleFieldChange}
            onNavigateToStep={flow.navigateToStep}
            errors={fieldErrors}
          />
        )}
      </div>

      <LoanStepFlowFooter
        flow={flow}
        serviceTitle="Loan Against Property Application"
        successTitle="Loan Against Property Submitted"
        successMessage="Your Loan Against Property application has been successfully received. A TaxEdge Loan Advisor will review your property dossier and contact you shortly."
        testIdPrefix="property"
      />
    </div>
  )
}

export default PropertyLoan
