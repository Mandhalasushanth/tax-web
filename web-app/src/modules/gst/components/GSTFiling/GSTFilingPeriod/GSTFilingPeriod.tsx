import { GSTStepErrorBanner } from '@modules/gst/shared/GSTStepErrorBanner'
import React, { useState, useMemo, useEffect } from 'react'
import { gstFieldRules, GST_STEP_ERROR } from '@modules/gst/validation/gstFieldRules'
import { gstProfileService } from '@modules/gst/services/gstProfileService'
import { getFilingBaseFee } from '@modules/gst/constants/gstBusiness.constants'
import { GSTFilingStepper } from '@modules/gst/shared/GSTFilingStepper/GSTFilingStepper'
import { GSTCalculationMethod } from './GSTCalculationMethod'
import { GSTFilingFrequency } from './GSTFilingFrequency'
import { GSTFilingTypeSelector } from './GSTFilingTypeSelector'
import { GSTPeriodFields } from './GSTPeriodFields'
import {
  FINANCIAL_YEAR_OPTIONS,
  MONTHLY_PERIOD_OPTIONS,
  QUARTERLY_PERIOD_OPTIONS,
  ANNUAL_PERIOD_OPTIONS,
  RETURN_PERIOD_OPTIONS,
  type SelectOption,
} from '@modules/gst/utils/gstPeriodOptions'
import { StepActionBar } from '@shared/components'
import './GSTFilingPeriod.css'
export interface FilingPeriodData {
  gstin: string
  businessName: string
  financialYear: string
  frequency: string
  selectedMonth: string
  returnType: 'combo' | 'gstr1' | 'nil' | ''
  baseFee: number
  filingType?: 'regular' | 'nil' | ''
  calculationMethod?: 'ca_calculate' | 'estimated_figures' | ''
}

interface GSTFilingPeriodProps {
  initialData?: Partial<FilingPeriodData>
  onStepClick?: (step: number) => void
  onContinue: (data: FilingPeriodData) => void
  onCancel: () => void
  onSaveDraft?: () => void
  /** Receives the form on every change so drafts always hold the latest values */
  onDraftChange?: (data: FilingPeriodData) => void
}

export const GSTFilingPeriod: React.FC<GSTFilingPeriodProps> = ({
  initialData,
  onStepClick,
  onContinue,
  onCancel,
  onSaveDraft,
  onDraftChange,
}) => {
  const profile = useMemo(() => gstProfileService.get(), [])
  const [financialYear, setFinancialYear] = useState(initialData?.financialYear || FINANCIAL_YEAR_OPTIONS[0]?.value || '')
  const [frequency, setFrequency] = useState(initialData?.frequency || 'Monthly')
  const [returnPeriod, setReturnPeriod] = useState(initialData?.selectedMonth || MONTHLY_PERIOD_OPTIONS[0]?.value || '')
  const [gstin, setGstin] = useState(initialData?.gstin || '')
  const [returnType, setReturnType] = useState<string>(initialData?.returnType || 'combo')
  const [filingType, setFilingType] = useState<'regular' | 'nil' | ''>(initialData?.filingType || 'regular')
  const [calculationMethod, setCalculationMethod] = useState<'ca_calculate' | 'estimated_figures' | ''>(
    initialData?.calculationMethod || 'ca_calculate'
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [stepError, setStepError] = useState<string | null>(null)

  const handleClearError = (field: string) => {
    setStepError(null)
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }
  }

  const periodOptions: SelectOption[] =
    frequency === 'Quarterly'
      ? QUARTERLY_PERIOD_OPTIONS
      : frequency === 'Annual'
      ? ANNUAL_PERIOD_OPTIONS
      : frequency === 'Monthly'
      ? MONTHLY_PERIOD_OPTIONS
      : RETURN_PERIOD_OPTIONS

  // The form as it will be submitted; also reported to the flow for drafts
  const periodData = useMemo<FilingPeriodData>(
    () => ({
      gstin: gstin.toUpperCase().trim(),
      businessName: initialData?.businessName || profile.tradeName || profile.legalName,
      financialYear,
      frequency,
      selectedMonth: returnPeriod,
      returnType: (filingType === 'nil' ? 'nil' : (returnType as FilingPeriodData['returnType'])) || 'combo',
      baseFee: getFilingBaseFee(filingType, returnType),
      filingType,
      calculationMethod,
    }),
    [gstin, initialData?.businessName, profile, financialYear, frequency, returnPeriod, filingType, returnType, calculationMethod]
  )

  useEffect(() => {
    onDraftChange?.(periodData)
  }, [periodData, onDraftChange])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}
    if (!frequency) newErrors.frequency = 'Please select a filing frequency'
    if (!financialYear) newErrors.financialYear = 'Please select a financial year'
    if (!returnPeriod) newErrors.returnPeriod = 'Please select a return period'
    const gstinError = gstFieldRules.gstin(gstin)
    if (gstinError) newErrors.gstin = gstinError
    if (filingType === 'regular') {
      if (!returnType) newErrors.returnType = 'Please select a return type'
      if (!calculationMethod) newErrors.calculationMethod = 'Please select a tax calculation method'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setStepError(GST_STEP_ERROR)
      return
    }

    onContinue(periodData)
  }


  return (
    <div className="gst-filing-period-container">
      {/* Step Progress Stepper */}
      <GSTFilingStepper currentStep={1} onStepClick={onStepClick} />

      {/* Main Page Title and Subtitle */}
      <header className="gst-filing-period__header">
        <h1 className="gst-filing-period__title">GST Filing Period</h1>
        <p className="gst-filing-period__subtitle">
          Provide the filing details to proceed with your GST return.
        </p>
      </header>

      {/* Main Content Form */}
      <div className="gst-filing-period__card">
        <form className="gst-filing-period__form" onSubmit={handleSubmit} noValidate>
          <div className="gst-filing-period__grid">
            {/* Filing Frequency Section */}
            <GSTFilingFrequency
              value={frequency}
              onChange={(newFreq) => {
                setFrequency(newFreq)
                handleClearError('frequency')
                setReturnPeriod('')
              }}
              error={errors.frequency}
            />

            {/* Financial Year, Period, GSTIN, Return Type */}
            <GSTPeriodFields
              financialYear={financialYear}
              setFinancialYear={setFinancialYear}
              returnPeriod={returnPeriod}
              setReturnPeriod={setReturnPeriod}
              gstin={gstin}
              setGstin={setGstin}
              returnType={returnType}
              setReturnType={setReturnType}
              filingType={filingType}
              periodOptions={periodOptions}
              errors={errors}
              handleClearError={handleClearError}
            />

            {/* Filing Type Selection Cards */}
            <GSTFilingTypeSelector
              value={filingType}
              onChange={(type) => {
                setFilingType(type)
                handleClearError('filingType')
              }}
            />

            {/* Tax Calculation Method */}
            {filingType === 'regular' && (
              <GSTCalculationMethod
                value={calculationMethod}
                onChange={(method) => {
                  setCalculationMethod(method)
                  handleClearError('calculationMethod')
                }}
                error={errors.calculationMethod}
              />
            )}
          </div>

          <hr className="gst-filing-period__divider" />

          <GSTStepErrorBanner message={stepError} />

          {/* Action Navigation Footer */}
          <StepActionBar
            onBack={onCancel}
            onSaveDraft={onSaveDraft}
            nextType="submit"
          />
        </form>
      </div>
    </div>
  )
}

export default GSTFilingPeriod
