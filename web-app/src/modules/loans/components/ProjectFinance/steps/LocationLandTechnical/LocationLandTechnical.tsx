import React, { useState } from 'react'
import type { ProjectFinanceData } from '@modules/loans/types/projectFinance.types'
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
  // Accordions for Sections 1 to 4
  const [isLocationOpen, setIsLocationOpen] = useState(true)
  const [isLandDetailsOpen, setIsLandDetailsOpen] = useState(true)
  const [isLandParcelsOpen, setIsLandParcelsOpen] = useState(true)
  const [isRowOpen, setIsRowOpen] = useState(true)

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
        errors={errors}
      />

      {/* Sections 5 to 7 */}
      <Section5To7 data={data} onChange={onChange} errors={errors} />

      {/* Sections 8 to 12 */}
      <Section8To12 data={data} onChange={onChange} errors={errors} />
    </div>
  )
}

export default LocationLandTechnical
