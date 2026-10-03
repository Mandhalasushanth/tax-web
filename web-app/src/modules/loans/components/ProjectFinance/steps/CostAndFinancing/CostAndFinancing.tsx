import React, { useState } from 'react'
import type { ProjectFinanceData } from '@modules/loans/types/projectFinance.types'
import { CapexBreakupSection } from './CapexBreakupSection'
import { FundingAndDisbursementSection } from './FundingAndDisbursementSection'
import './CostAndFinancing.css'

export interface CostAndFinancingProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  errors?: Record<string, string>
}

export const CostAndFinancing: React.FC<CostAndFinancingProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const [isCapexOpen, setIsCapexOpen] = useState<boolean>(true)
  const [isMeansOfFinanceOpen, setIsMeansOfFinanceOpen] = useState<boolean>(true)
  const [isDisbursementOpen, setIsDisbursementOpen] = useState<boolean>(true)

  const handleToggleCapex = () => {
    setIsCapexOpen((prev) => !prev)
  }

  const handleToggleMeansOfFinance = () => {
    setIsMeansOfFinanceOpen((prev) => !prev)
  }

  const handleToggleDisbursement = () => {
    setIsDisbursementOpen((prev) => !prev)
  }

  return (
    <div className="cost-and-financing-step" data-testid="cost-and-financing-step">
      {/* 1. Total Project Cost (Capex Breakup) */}
      <CapexBreakupSection
        data={data}
        onChange={onChange}
        isOpen={isCapexOpen}
        onToggle={handleToggleCapex}
        errors={errors}
      />

      {/* 2. Means of Finance & 3. Disbursement Schedule */}
      <FundingAndDisbursementSection
        data={data}
        onChange={onChange}
        isMeansOfFinanceOpen={isMeansOfFinanceOpen}
        onToggleMeansOfFinance={handleToggleMeansOfFinance}
        isDisbursementOpen={isDisbursementOpen}
        onToggleDisbursement={handleToggleDisbursement}
        errors={errors}
      />
    </div>
  )
}

export default CostAndFinancing
