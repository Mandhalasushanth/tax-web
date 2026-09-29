import React, { useState } from 'react'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'
import {
  MACHINERY_CATEGORY_OPTIONS,
  RAW_MATERIAL_SOURCE_OPTIONS,
  RAW_MATERIAL_UNIT_OPTIONS,
  CONTRACT_TYPE_OPTIONS,
  MILESTONE_STATUS_OPTIONS,
} from './locationLandTechnicalConstants'
import { LocationBottomSheet } from './LocationBottomSheet'
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
  const [activePicker, setActivePicker] = useState<string | null>(null)
  const [isMachineryOpen, setIsMachineryOpen] = useState(true)
  const [isRawMaterialOpen, setIsRawMaterialOpen] = useState(true)
  const [isEpcOpen, setIsEpcOpen] = useState(true)
  const [isMilestonesOpen, setIsMilestonesOpen] = useState(true)
  const [isManpowerOpen, setIsManpowerOpen] = useState(true)

  const machineryList = data.plantMachineryList || []
  const rawMaterials = data.rawMaterialList || []
  const milestones = data.implementationMilestones || []

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
        onOpenPicker={(picker) => setActivePicker(picker)}
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
        onOpenPicker={(picker) => setActivePicker(picker)}
        errors={errors}
      />

      {/* EPC Contract Type */}
      <LocationBottomSheet
        isOpen={activePicker === 'contractType'}
        title="Select Contract Type"
        options={CONTRACT_TYPE_OPTIONS}
        selectedValue={data.contractType}
        onSelect={(val) => onChange({ contractType: val })}
        onClose={() => setActivePicker(null)}
      />

      {/* Dynamic Machinery Pickers */}
      {machineryList.map((item, idx) => (
        <LocationBottomSheet
          key={`mach_picker_${item.id}`}
          isOpen={activePicker === `machinery_cat_${idx}`}
          title="Select Category"
          options={MACHINERY_CATEGORY_OPTIONS}
          selectedValue={item.category}
          onSelect={(val) => {
            const updated = machineryList.map((m, i) => (i === idx ? { ...m, category: val } : m))
            onChange({ plantMachineryList: updated })
          }}
          onClose={() => setActivePicker(null)}
        />
      ))}

      {/* Dynamic Raw Material Pickers */}
      {rawMaterials.map((item, idx) => (
        <React.Fragment key={`raw_pickers_${item.id}`}>
          <LocationBottomSheet
            isOpen={activePicker === `raw_source_${idx}`}
            title="Select Source"
            options={RAW_MATERIAL_SOURCE_OPTIONS}
            selectedValue={item.source}
            onSelect={(val) => {
              const updated = rawMaterials.map((m, i) => (i === idx ? { ...m, source: val } : m))
              onChange({ rawMaterialList: updated })
            }}
            onClose={() => setActivePicker(null)}
          />
          <LocationBottomSheet
            isOpen={activePicker === `raw_unit_${idx}`}
            title="Select Unit"
            options={RAW_MATERIAL_UNIT_OPTIONS}
            selectedValue={item.unit}
            onSelect={(val) => {
              const updated = rawMaterials.map((m, i) => (i === idx ? { ...m, unit: val } : m))
              onChange({ rawMaterialList: updated })
            }}
            onClose={() => setActivePicker(null)}
          />
        </React.Fragment>
      ))}

      {/* Dynamic Milestones Pickers */}
      {milestones.map((item, idx) => (
        <LocationBottomSheet
          key={`milestone_picker_${item.id}`}
          isOpen={activePicker === `milestone_status_${idx}`}
          title="Select Milestone Status"
          options={MILESTONE_STATUS_OPTIONS}
          selectedValue={item.status}
          onSelect={(val) => {
            const updated = milestones.map((m, i) => (i === idx ? { ...m, status: val } : m))
            onChange({ implementationMilestones: updated })
          }}
          onClose={() => setActivePicker(null)}
        />
      ))}
    </>
  )
}
