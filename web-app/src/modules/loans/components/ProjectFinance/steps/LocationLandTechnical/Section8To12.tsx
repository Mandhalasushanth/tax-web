import React, { useState } from 'react'
import type { ProjectFinanceData } from '@modules/loans/types/projectFinance.types'
import { Section8And9 } from './Section8And9'
import { Section10To12 } from './Section10To12'

export interface Section8To12Props {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  errors?: Record<string, string>
}

export const Section8To12: React.FC<Section8To12Props> = ({
  data,
  onChange,
  errors = {},
}) => {
  const [isMachineryOpen, setIsMachineryOpen] = useState(true)
  const [isRawMaterialOpen, setIsRawMaterialOpen] = useState(true)
  const [isEpcOpen, setIsEpcOpen] = useState(true)
  const [isMilestonesOpen, setIsMilestonesOpen] = useState(true)
  const [isManpowerOpen, setIsManpowerOpen] = useState(true)

  return (
    <>
      {/* 8. Plant & Machinery and 9. Raw Material */}
      <Section8And9
        data={data}
        onChange={onChange}
        isMachineryOpen={isMachineryOpen}
        onToggleMachinery={() => setIsMachineryOpen((prev) => !prev)}
        isRawMaterialOpen={isRawMaterialOpen}
        onToggleRawMaterial={() => setIsRawMaterialOpen((prev) => !prev)}
      />

      {/* 10. EPC, 11. Milestones, 12. Manpower */}
      <Section10To12
        data={data}
        onChange={onChange}
        isEpcOpen={isEpcOpen}
        onToggleEpc={() => setIsEpcOpen((prev) => !prev)}
        isMilestonesOpen={isMilestonesOpen}
        onToggleMilestones={() => setIsMilestonesOpen((prev) => !prev)}
        isManpowerOpen={isManpowerOpen}
        onToggleManpower={() => setIsManpowerOpen((prev) => !prev)}
        errors={errors}
      />
    </>
  )
}
