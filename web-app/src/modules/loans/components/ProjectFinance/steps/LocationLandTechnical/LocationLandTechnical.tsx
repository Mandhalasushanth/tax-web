import React, { useState } from 'react'
import type { ProjectFinanceData, LandParcelItem } from '../../../../types/projectFinance.types'
import {
  PROJECT_ZONES,
  LAND_OWNERSHIP_OPTIONS,
  LAND_USE_OPTIONS,
  TITLE_STATUS_OPTIONS,
  ENCUMBRANCE_OPTIONS,
  NA_CONVERSION_STATUS_OPTIONS,
  ACQUISITION_STATUS_OPTIONS,
  ROW_TYPES,
  ROW_OBTAINED_PENDING_OPTIONS,
  ROW_APPROVAL_STATUS_OPTIONS,
} from './locationLandTechnicalConstants'
import { LocationBottomSheet } from './LocationBottomSheet'
import { Section1And2 } from './Section1And2'
import { Section3And4 } from './Section3And4'
import { Section5To7 } from './Section5To7'
import { Section8To12 } from './Section8To12'
import './LocationLandTechnical.css'

export interface LocationLandTechnicalProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  errors?: Record<string, string>
}

export const LocationLandTechnical: React.FC<LocationLandTechnicalProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const [activePicker, setActivePicker] = useState<string | null>(null)

  // Accordions for Sections 1 to 4
  const [isLocationOpen, setIsLocationOpen] = useState(true)
  const [isLandDetailsOpen, setIsLandDetailsOpen] = useState(true)
  const [isLandParcelsOpen, setIsLandParcelsOpen] = useState(true)
  const [isRowOpen, setIsRowOpen] = useState(true)

  const parcels: LandParcelItem[] = data.landParcels || []

  const handleUpdateParcel = (index: number, fields: Partial<LandParcelItem>) => {
    const updated = parcels.map((item, idx) => (idx === index ? { ...item, ...fields } : item))
    onChange({ landParcels: updated })
  }

  return (
    <div className="pf-screen-container" data-testid="location-land-technical-step">
      {/* 1. Project Location & 2. Land Details */}
      <Section1And2
        data={data}
        onChange={onChange}
        isLocationOpen={isLocationOpen}
        onToggleLocation={() => setIsLocationOpen((prev) => !prev)}
        isLandDetailsOpen={isLandDetailsOpen}
        onToggleLandDetails={() => setIsLandDetailsOpen((prev) => !prev)}
        onOpenPicker={(picker) => setActivePicker(picker)}
        errors={errors}
      />

      {/* 3. Land Parcels & 4. Right of Way */}
      <Section3And4
        data={data}
        onChange={onChange}
        isLandParcelsOpen={isLandParcelsOpen}
        onToggleLandParcels={() => setIsLandParcelsOpen((prev) => !prev)}
        isRowOpen={isRowOpen}
        onToggleRow={() => setIsRowOpen((prev) => !prev)}
        onOpenPicker={(picker) => setActivePicker(picker)}
        errors={errors}
      />

      {/* Sections 5 to 7 */}
      <Section5To7 data={data} onChange={onChange} errors={errors} />

      {/* Sections 8 to 12 */}
      <Section8To12 data={data} onChange={onChange} errors={errors} />

      {/* Bottom Sheet Pickers for Sections 1 to 4 */}
      <LocationBottomSheet
        isOpen={activePicker === 'step2ProjectZone'}
        title="Select Project Zone"
        options={PROJECT_ZONES}
        selectedValue={data.step2ProjectZone}
        onSelect={(val) => onChange({ step2ProjectZone: val })}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'landOwnership'}
        title="Select Land Ownership"
        options={LAND_OWNERSHIP_OPTIONS}
        selectedValue={data.landOwnership}
        onSelect={(val) => onChange({ landOwnership: val })}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'landUse'}
        title="Select Land Use"
        options={LAND_USE_OPTIONS}
        selectedValue={data.landUse}
        onSelect={(val) => onChange({ landUse: val })}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'titleStatus'}
        title="Select Title Status"
        options={TITLE_STATUS_OPTIONS}
        selectedValue={data.titleStatus}
        onSelect={(val) => onChange({ titleStatus: val })}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'encumbrance'}
        title="Select Encumbrance"
        options={ENCUMBRANCE_OPTIONS}
        selectedValue={data.encumbrance}
        onSelect={(val) => onChange({ encumbrance: val })}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'naConversionStatus'}
        title="Select NA Conversion Status"
        options={NA_CONVERSION_STATUS_OPTIONS}
        selectedValue={data.naConversionStatus}
        onSelect={(val) => onChange({ naConversionStatus: val })}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'rowType'}
        title="Select ROW Type"
        options={ROW_TYPES}
        selectedValue={data.rowType}
        onSelect={(val) => onChange({ rowType: val })}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'rowObtainedPending'}
        title="Select Status"
        options={ROW_OBTAINED_PENDING_OPTIONS}
        selectedValue={data.rowObtainedPending}
        onSelect={(val) => onChange({ rowObtainedPending: val })}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker === 'rowApprovalStatus'}
        title="Select Approval Status"
        options={ROW_APPROVAL_STATUS_OPTIONS}
        selectedValue={data.rowApprovalStatus}
        onSelect={(val) => onChange({ rowApprovalStatus: val })}
        onClose={() => setActivePicker(null)}
      />

      {/* Dynamic Land Parcel Pickers */}
      {parcels.map((parcel, idx) => (
        <React.Fragment key={`pickers_${parcel.id}`}>
          <LocationBottomSheet
            isOpen={activePicker === `parcel_ownership_${idx}`}
            title="Select Ownership"
            options={LAND_OWNERSHIP_OPTIONS}
            selectedValue={parcel.ownership}
            onSelect={(val) => handleUpdateParcel(idx, { ownership: val })}
            onClose={() => setActivePicker(null)}
          />
          <LocationBottomSheet
            isOpen={activePicker === `parcel_acquisition_${idx}`}
            title="Select Acquisition Status"
            options={ACQUISITION_STATUS_OPTIONS}
            selectedValue={parcel.acquisitionStatus}
            onSelect={(val) => handleUpdateParcel(idx, { acquisitionStatus: val })}
            onClose={() => setActivePicker(null)}
          />
          <LocationBottomSheet
            isOpen={activePicker === `parcel_title_${idx}`}
            title="Select Title Status"
            options={TITLE_STATUS_OPTIONS}
            selectedValue={parcel.titleStatus}
            onSelect={(val) => handleUpdateParcel(idx, { titleStatus: val })}
            onClose={() => setActivePicker(null)}
          />
          <LocationBottomSheet
            isOpen={activePicker === `parcel_encumbrance_${idx}`}
            title="Select Encumbrance"
            options={ENCUMBRANCE_OPTIONS}
            selectedValue={parcel.encumbrance}
            onSelect={(val) => handleUpdateParcel(idx, { encumbrance: val })}
            onClose={() => setActivePicker(null)}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

export default LocationLandTechnical
