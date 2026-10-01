import React from 'react'
import { FlowStepper } from '@shared/components'
import { LoanStepErrorBanner, LoanStepFlowFooter } from '@modules/loans/shared'
import { useLoanStepFlow } from '@modules/loans/hooks/useLoanStepFlow'
import { toAmount } from '@modules/loans/validation/commonLoanValidation'
import { projectFinanceValidation } from '@modules/loans/validation/projectFinanceValidation'
import type { ProjectFinanceData } from '@modules/loans/types/projectFinance.types'
import { PROJECT_FINANCE_STEPS, INITIAL_PROJECT_FINANCE_DATA } from './projectFinance.constants'
import {
  ApplicantAndProject,
  LocationLandTechnical,
  CostAndFinancing,
  FinancialProjections,
  PromoterAndManagement,
  DocumentDossier,
  ReviewAndSubmit,
} from './steps'
import { ProjectFinanceSubmitModal } from './steps/ReviewAndSubmit/ProjectFinanceSubmitModal'
import './ProjectFinance.css'

export { PROJECT_FINANCE_STEPS, INITIAL_PROJECT_FINANCE_DATA }

export const ProjectFinance: React.FC = () => {
  const flow = useLoanStepFlow<ProjectFinanceData>({
    loanType: 'project_finance',
    loanTitle: 'Project Finance',
    initialValues: INITIAL_PROJECT_FINANCE_DATA,
    application: {
      serviceTitle: 'Project Finance',
      totalSteps: 7,
      stepLabels: PROJECT_FINANCE_STEPS.map((s) => s.title ?? ''),
      resumeRoute: '/loans/project-finance',
    },
    validators: [
      projectFinanceValidation.validateStep1,
      projectFinanceValidation.validateStep2,
      projectFinanceValidation.validateStep3,
      projectFinanceValidation.validateStep4,
      projectFinanceValidation.validateStep5,
      projectFinanceValidation.validateStep6,
      projectFinanceValidation.validateStep7,
    ],
    buildSubmission: (data) => ({
      title: 'Project Finance Application',
      category: 'Structured Project Finance',
      requestedAmount: toAmount(data.debtFundingRequired || data.debtTermLoanRequested || data.loanRequiredAmount),
      tenureMonths: (parseInt(data.repaymentPeriodYears || '', 10) || 5) * 12,
      details: { ...data },
    }),
  })
  const { formData, currentStep, fieldErrors, handleFieldChange } = flow

  return (
    <div className="project-finance-page" data-testid="project-finance-page">
      <h1 className="project-finance-page__title">Project Finance</h1>

      <FlowStepper steps={PROJECT_FINANCE_STEPS} currentStep={currentStep} onStepClick={flow.handleStepClick} />

      <LoanStepErrorBanner message={flow.stepError} />

      <div className="project-finance-page__content">
        {currentStep === 1 && <ApplicantAndProject data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 2 && <LocationLandTechnical data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 3 && <CostAndFinancing data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 4 && <FinancialProjections data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 5 && <PromoterAndManagement data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 6 && <DocumentDossier data={formData} onChange={handleFieldChange} errors={fieldErrors} />}
        {currentStep === 7 && (
          <ReviewAndSubmit
            data={formData}
            onChange={handleFieldChange}
            onNavigateToStep={flow.navigateToStep}
            errors={fieldErrors}
          />
        )}
      </div>

      <LoanStepFlowFooter
        flow={flow}
        serviceTitle="Project Finance Application"
        successTitle="Project Finance Submitted"
        successMessage=""
        testIdPrefix="pf"
        successModal={
          <ProjectFinanceSubmitModal
            isOpen={Boolean(flow.submittedApp)}
            applicationId={flow.referenceNumber}
            onDone={flow.handleSuccessDone}
          />
        }
      />
    </div>
  )
}

export default ProjectFinance
