import React, { useState } from 'react'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'
import {
  POWER_SOURCE_OPTIONS,
  WATER_SOURCE_OPTIONS,
  APPROACH_ROAD_OPTIONS,
  DRAINAGE_ARRANGEMENT_OPTIONS,
  WASTE_EFFLUENT_OPTIONS,
  OTHER_INFRASTRUCTURE_OPTIONS,
  TECHNOLOGY_TYPE_OPTIONS,
  TECHNOLOGY_SOURCE_OPTIONS,
  CAPACITY_UNIT_OPTIONS,
  NUMBER_OF_SHIFTS_OPTIONS,
} from './locationLandTechnicalConstants'
import { LocationBottomSheet } from './LocationBottomSheet'

export interface Section5To7Props {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  errors?: Record<string, string>
}

export const Section5To7: React.FC<Section5To7Props> = ({
  data,
  onChange,
  errors = {},
}) => {
  const [activePicker, setActivePicker] = useState<string | null>(null)
  const [isUtilitiesOpen, setIsUtilitiesOpen] = useState(true)
  const [isTechnicalOpen, setIsTechnicalOpen] = useState(true)
  const [isCapacityOpen, setIsCapacityOpen] = useState(true)

  return (
    <>
      {/* 5. Utilities & Site Infrastructure */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={() => setIsUtilitiesOpen((prev) => !prev)}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile">
              <img src="/assets/icons/loans/doc-orange.svg" alt="" width="20" height="20" />
            </div>
            <h3 className="pf-collapsible-title">5. Utilities & Site Infrastructure</h3>
          </div>
          <span className={`pf-chevron ${isUtilitiesOpen ? 'pf-chevron--open' : ''}`}>
            <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
          </span>
        </div>

        {isUtilitiesOpen && (
          <div className="pf-collapsible-body">
            <div className="pf-field-group">
              <label className="pf-field-label">Power Source <span className="pf-req">*</span></label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.powerSource ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => setActivePicker('powerSource')}
              >
                <span className={data.powerSource ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.powerSource || 'Select power source'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.powerSource && <span className="pf-field-error">{errors.powerSource}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">Water Source <span className="pf-req">*</span></label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.waterSource ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => setActivePicker('waterSource')}
              >
                <span className={data.waterSource ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.waterSource || 'Select water source'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.waterSource && <span className="pf-field-error">{errors.waterSource}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">Approach Road <span className="pf-req">*</span></label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.approachRoad ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => setActivePicker('approachRoad')}
              >
                <span className={data.approachRoad ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.approachRoad || 'Select approach road'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.approachRoad && <span className="pf-field-error">{errors.approachRoad}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">Drainage Arrangement <span className="pf-req">*</span></label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.drainageArrangement ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => setActivePicker('drainageArrangement')}
              >
                <span className={data.drainageArrangement ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.drainageArrangement || 'Select drainage'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.drainageArrangement && <span className="pf-field-error">{errors.drainageArrangement}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">Waste / Effluent Arrangement <span className="pf-req">*</span></label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.wasteEffluentArrangement ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => setActivePicker('wasteEffluentArrangement')}
              >
                <span className={data.wasteEffluentArrangement ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.wasteEffluentArrangement || 'Select arrangement'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.wasteEffluentArrangement && <span className="pf-field-error">{errors.wasteEffluentArrangement}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">Other Infrastructure</label>
              <button
                type="button"
                className="pf-custom-select-btn"
                onClick={() => setActivePicker('otherInfrastructure')}
              >
                <span className={data.otherInfrastructure ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.otherInfrastructure || 'Select option'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 6. Technical Details */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={() => setIsTechnicalOpen((prev) => !prev)}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile">
              <img src="/assets/icons/loans/doc-orange.svg" alt="" width="20" height="20" />
            </div>
            <h3 className="pf-collapsible-title">6. Technical Details</h3>
          </div>
          <span className={`pf-chevron ${isTechnicalOpen ? 'pf-chevron--open' : ''}`}>
            <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
          </span>
        </div>

        {isTechnicalOpen && (
          <div className="pf-collapsible-body">
            <div className="pf-field-group">
              <label className="pf-field-label">Technology Type <span className="pf-req">*</span></label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.technologyType ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => setActivePicker('technologyType')}
              >
                <span className={data.technologyType ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.technologyType || 'Select type'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.technologyType && <span className="pf-field-error">{errors.technologyType}</span>}
            </div>

            <div className="pf-field-group">
              <label htmlFor="technologyDescription" className="pf-field-label">Technology Description <span className="pf-req">*</span></label>
              <input
                id="technologyDescription"
                type="text"
                className={`pf-custom-input ${errors.technologyDescription ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter description"
                value={data.technologyDescription || ''}
                onChange={(e) => onChange({ technologyDescription: e.target.value })}
              />
              {errors.technologyDescription && <span className="pf-field-error">{errors.technologyDescription}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">Technology Source <span className="pf-req">*</span></label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.technologySource ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => setActivePicker('technologySource')}
              >
                <span className={data.technologySource ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.technologySource || 'Select source'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.technologySource && <span className="pf-field-error">{errors.technologySource}</span>}
            </div>

            <div className="pf-field-group">
              <label htmlFor="technologyProvider" className="pf-field-label">Technology Provider <span className="pf-req">*</span></label>
              <input
                id="technologyProvider"
                type="text"
                className={`pf-custom-input ${errors.technologyProvider ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter provider name"
                value={data.technologyProvider || ''}
                onChange={(e) => onChange({ technologyProvider: e.target.value })}
              />
              {errors.technologyProvider && <span className="pf-field-error">{errors.technologyProvider}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">Technology Proven? <span className="pf-req">*</span></label>
              <div className="pf-radio-group">
                <label className="pf-radio-label">
                  <input
                    type="radio"
                    name="isTechnologyProven"
                    className="pf-radio-input"
                    checked={data.isTechnologyProven === true}
                    onChange={() => onChange({ isTechnologyProven: true })}
                  />
                  <div className="pf-radio-custom">
                    <div className="pf-radio-custom-dot" />
                  </div>
                  <span>Yes</span>
                </label>
                <label className="pf-radio-label">
                  <input
                    type="radio"
                    name="isTechnologyProven"
                    className="pf-radio-input"
                    checked={data.isTechnologyProven === false}
                    onChange={() => onChange({ isTechnologyProven: false })}
                  />
                  <div className="pf-radio-custom">
                    <div className="pf-radio-custom-dot" />
                  </div>
                  <span>No</span>
                </label>
              </div>
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">Technology License Required? <span className="pf-req">*</span></label>
              <div className="pf-radio-group">
                <label className="pf-radio-label">
                  <input
                    type="radio"
                    name="isTechnologyLicenseRequired"
                    className="pf-radio-input"
                    checked={data.isTechnologyLicenseRequired === true}
                    onChange={() => onChange({ isTechnologyLicenseRequired: true })}
                  />
                  <div className="pf-radio-custom">
                    <div className="pf-radio-custom-dot" />
                  </div>
                  <span>Yes</span>
                </label>
                <label className="pf-radio-label">
                  <input
                    type="radio"
                    name="isTechnologyLicenseRequired"
                    className="pf-radio-input"
                    checked={data.isTechnologyLicenseRequired === false}
                    onChange={() => onChange({ isTechnologyLicenseRequired: false })}
                  />
                  <div className="pf-radio-custom">
                    <div className="pf-radio-custom-dot" />
                  </div>
                  <span>No</span>
                </label>
              </div>
            </div>

            <div className="pf-field-group">
              <label htmlFor="technicalConsultant" className="pf-field-label">Technical Consultant</label>
              <input
                id="technicalConsultant"
                type="text"
                className="pf-custom-input"
                placeholder="Enter consultant name"
                value={data.technicalConsultant || ''}
                onChange={(e) => onChange({ technicalConsultant: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      {/* 7. Capacity & Production */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={() => setIsCapacityOpen((prev) => !prev)}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile">
              <img src="/assets/icons/loans/doc-orange.svg" alt="" width="20" height="20" />
            </div>
            <h3 className="pf-collapsible-title">7. Capacity & Production</h3>
          </div>
          <span className={`pf-chevron ${isCapacityOpen ? 'pf-chevron--open' : ''}`}>
            <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
          </span>
        </div>

        {isCapacityOpen && (
          <div className="pf-collapsible-body">
            <div className="pf-grid-2">
              <div className="pf-field-group">
                <label htmlFor="proposedCapacity" className="pf-field-label">Proposed Capacity <span className="pf-req">*</span></label>
                <input
                  id="proposedCapacity"
                  type="text"
                  className={`pf-custom-input ${errors.proposedCapacity ? 'pf-custom-input--error' : ''}`}
                  placeholder="Enter capacity"
                  value={data.proposedCapacity || ''}
                  onChange={(e) => onChange({ proposedCapacity: e.target.value })}
                />
                {errors.proposedCapacity && <span className="pf-field-error">{errors.proposedCapacity}</span>}
              </div>

              <div className="pf-field-group">
                <label className="pf-field-label">Capacity Unit <span className="pf-req">*</span></label>
                <button
                  type="button"
                  className={`pf-custom-select-btn ${errors.capacityUnit ? 'pf-custom-select-btn--error' : ''}`}
                  onClick={() => setActivePicker('capacityUnit')}
                >
                  <span className={data.capacityUnit ? 'pf-select-value' : 'pf-select-placeholder'}>
                    {data.capacityUnit || 'Select unit'}
                  </span>
                  <span className="pf-select-chevron">
                    <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                  </span>
                </button>
                {errors.capacityUnit && <span className="pf-field-error">{errors.capacityUnit}</span>}
              </div>
            </div>

            <div className="pf-grid-2">
              <div className="pf-field-group">
                <label htmlFor="expectedInitialUtilisationPercent" className="pf-field-label">Expected Initial Utilisation (%)</label>
                <input
                  id="expectedInitialUtilisationPercent"
                  type="text"
                  className="pf-custom-input"
                  placeholder="Enter percentage"
                  value={data.expectedInitialUtilisationPercent || ''}
                  onChange={(e) => onChange({ expectedInitialUtilisationPercent: e.target.value.replace(/[^\d.]/g, '') })}
                />
              </div>

              <div className="pf-field-group">
                <label htmlFor="stabilisedUtilisationPercent" className="pf-field-label">Stabilised Utilisation (%)</label>
                <input
                  id="stabilisedUtilisationPercent"
                  type="text"
                  className="pf-custom-input"
                  placeholder="Enter percentage"
                  value={data.stabilisedUtilisationPercent || ''}
                  onChange={(e) => onChange({ stabilisedUtilisationPercent: e.target.value.replace(/[^\d.]/g, '') })}
                />
              </div>
            </div>

            <div className="pf-grid-2">
              <div className="pf-field-group">
                <label htmlFor="productionPerYear" className="pf-field-label">Production per Year <span className="pf-req">*</span></label>
                <input
                  id="productionPerYear"
                  type="text"
                  className={`pf-custom-input ${errors.productionPerYear ? 'pf-custom-input--error' : ''}`}
                  placeholder="Enter production"
                  value={data.productionPerYear || ''}
                  onChange={(e) => onChange({ productionPerYear: e.target.value })}
                />
                {errors.productionPerYear && <span className="pf-field-error">{errors.productionPerYear}</span>}
              </div>

              <div className="pf-field-group">
                <label htmlFor="operatingDaysPerYear" className="pf-field-label">Operating Days / Year <span className="pf-req">*</span></label>
                <input
                  id="operatingDaysPerYear"
                  type="text"
                  className={`pf-custom-input ${errors.operatingDaysPerYear ? 'pf-custom-input--error' : ''}`}
                  placeholder="Enter days"
                  value={data.operatingDaysPerYear || ''}
                  onChange={(e) => onChange({ operatingDaysPerYear: e.target.value.replace(/\D/g, '') })}
                />
                {errors.operatingDaysPerYear && <span className="pf-field-error">{errors.operatingDaysPerYear}</span>}
              </div>
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">Number of Shifts <span className="pf-req">*</span></label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.numberOfShifts ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => setActivePicker('numberOfShifts')}
              >
                <span className={data.numberOfShifts ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.numberOfShifts || 'Select number of shifts'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.numberOfShifts && <span className="pf-field-error">{errors.numberOfShifts}</span>}
            </div>
          </div>
        )}
      </div>

      {/* Pickers for Sections 5-7 */}
      <LocationBottomSheet
        isOpen={activePicker === 'powerSource'}
        title="Select Power Source"
        options={POWER_SOURCE_OPTIONS}
        selectedValue={data.powerSource}
        onSelect={(val) => onChange({ powerSource: val })}
        onClose={() => setActivePicker(null)}
      />
      <LocationBottomSheet
        isOpen={activePicker === 'waterSource'}
        title="Select Water Source"
        options={WATER_SOURCE_OPTIONS}
        selectedValue={data.waterSource}
        onSelect={(val) => onChange({ waterSource: val })}
        onClose={() => setActivePicker(null)}
      />
      <LocationBottomSheet
        isOpen={activePicker === 'approachRoad'}
        title="Select Approach Road"
        options={APPROACH_ROAD_OPTIONS}
        selectedValue={data.approachRoad}
        onSelect={(val) => onChange({ approachRoad: val })}
        onClose={() => setActivePicker(null)}
      />
      <LocationBottomSheet
        isOpen={activePicker === 'drainageArrangement'}
        title="Select Drainage Arrangement"
        options={DRAINAGE_ARRANGEMENT_OPTIONS}
        selectedValue={data.drainageArrangement}
        onSelect={(val) => onChange({ drainageArrangement: val })}
        onClose={() => setActivePicker(null)}
      />
      <LocationBottomSheet
        isOpen={activePicker === 'wasteEffluentArrangement'}
        title="Select Waste / Effluent Arrangement"
        options={WASTE_EFFLUENT_OPTIONS}
        selectedValue={data.wasteEffluentArrangement}
        onSelect={(val) => onChange({ wasteEffluentArrangement: val })}
        onClose={() => setActivePicker(null)}
      />
      <LocationBottomSheet
        isOpen={activePicker === 'otherInfrastructure'}
        title="Select Other Infrastructure"
        options={OTHER_INFRASTRUCTURE_OPTIONS}
        selectedValue={data.otherInfrastructure}
        onSelect={(val) => onChange({ otherInfrastructure: val })}
        onClose={() => setActivePicker(null)}
      />
      <LocationBottomSheet
        isOpen={activePicker === 'technologyType'}
        title="Select Technology Type"
        options={TECHNOLOGY_TYPE_OPTIONS}
        selectedValue={data.technologyType}
        onSelect={(val) => onChange({ technologyType: val })}
        onClose={() => setActivePicker(null)}
      />
      <LocationBottomSheet
        isOpen={activePicker === 'technologySource'}
        title="Select Technology Source"
        options={TECHNOLOGY_SOURCE_OPTIONS}
        selectedValue={data.technologySource}
        onSelect={(val) => onChange({ technologySource: val })}
        onClose={() => setActivePicker(null)}
      />
      <LocationBottomSheet
        isOpen={activePicker === 'capacityUnit'}
        title="Select Capacity Unit"
        options={CAPACITY_UNIT_OPTIONS}
        selectedValue={data.capacityUnit}
        onSelect={(val) => onChange({ capacityUnit: val })}
        onClose={() => setActivePicker(null)}
      />
      <LocationBottomSheet
        isOpen={activePicker === 'numberOfShifts'}
        title="Select Number of Shifts"
        options={NUMBER_OF_SHIFTS_OPTIONS}
        selectedValue={data.numberOfShifts}
        onSelect={(val) => onChange({ numberOfShifts: val })}
        onClose={() => setActivePicker(null)}
      />
    </>
  )
}
