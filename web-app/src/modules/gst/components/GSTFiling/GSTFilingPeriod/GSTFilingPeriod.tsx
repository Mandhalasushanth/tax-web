import React, { useState } from 'react'
import { GSTFilingStepper } from '../../../shared/GSTFilingStepper/GSTFilingStepper'
import { GSTCalculationMethod } from './GSTCalculationMethod'
import { GSTFilingFrequency } from './GSTFilingFrequency'
import { GSTFilingTypeSelector } from './GSTFilingTypeSelector'
import { GSTPeriodFields } from './GSTPeriodFields'
import {
  MONTHLY_PERIOD_OPTIONS,
  QUARTERLY_PERIOD_OPTIONS,
  ANNUAL_PERIOD_OPTIONS,
  RETURN_PERIOD_OPTIONS,
  type SelectOption,
} from '../../../utils/gstPeriodOptions'
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
}

export const GSTFilingPeriod: React.FC<GSTFilingPeriodProps> = ({
  initialData,
  onStepClick,
  onContinue,
  onCancel,
  onSaveDraft,
}) => {
  const [financialYear, setFinancialYear] = useState(initialData?.financialYear || 'FY 2026-27')
  const [frequency, setFrequency] = useState(initialData?.frequency || 'Monthly')
  const [returnPeriod, setReturnPeriod] = useState(initialData?.selectedMonth || 'August 2026')
  const [gstin, setGstin] = useState(initialData?.gstin || '')
  const [returnType, setReturnType] = useState<string>(initialData?.returnType || 'combo')
  const [filingType, setFilingType] = useState<'regular' | 'nil' | ''>(initialData?.filingType || 'regular')
  const [calculationMethod, setCalculationMethod] = useState<'ca_calculate' | 'estimated_figures' | ''>(
    initialData?.calculationMethod || 'ca_calculate'
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleClearError = (field: string) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}
    if (!frequency) newErrors.frequency = 'Please select a filing frequency'
    if (!financialYear) newErrors.financialYear = 'Please select a financial year'
    if (!returnPeriod) newErrors.returnPeriod = 'Please select a return period'
    if (!gstin.trim() || gstin.trim().length < 3) {
      newErrors.gstin = 'Please enter a valid GSTIN'
    }
    if (filingType === 'regular') {
      if (!returnType) newErrors.returnType = 'Please select a return type'
      if (!calculationMethod) newErrors.calculationMethod = 'Please select a tax calculation method'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const calculatedBaseFee = filingType === 'nil' ? 500 : returnType === 'gstr1' ? 1500 : 2500
    onContinue({
      gstin: gstin.toUpperCase().trim(),
      businessName: initialData?.businessName || 'Shree Deshmukh Traders',
      financialYear,
      frequency,
      selectedMonth: returnPeriod,
      returnType: (filingType === 'nil' ? 'nil' : (returnType as any)) || 'combo',
      baseFee: calculatedBaseFee,
      filingType,
      calculationMethod,
    })
  }

  const isPeriodValid = Boolean(
    frequency &&
    financialYear &&
    returnPeriod &&
    gstin.trim().length >= 3 &&
    (
      filingType === 'nil' ||
      (filingType === 'regular' && returnType && calculationMethod)
    )
  )

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

          {/* Action Navigation Footer */}
          <StepActionBar
            onBack={onCancel}
            onSaveDraft={onSaveDraft}
            nextType="submit"
            nextDisabled={!isPeriodValid}
          />
        </form>
      </div>
    </div>
  )
}

export default GSTFilingPeriod
