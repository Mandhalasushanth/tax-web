import React, { useState, useMemo } from 'react'
import type {
  ProjectFinanceData,
  ProjectPromoterSponsor,
  ApplicantEntityType,
  BankingRelationshipType,
  PrimaryBusinessActivityType,
  ProjectSectorType,
  ProjectType,
  ProjectDevelopmentOption,
} from '../../../../types/projectFinance.types'
import {
  ENTITY_TYPES,
  BANKING_RELATIONSHIPS,
  PRIMARY_BUSINESS_ACTIVITIES,
  PROJECT_SECTORS,
  SECTOR_SUBSECTORS,
  PROJECT_TYPES,
  DEVELOPMENT_OPTIONS,
} from './applicantAndProjectConstants'
import { ProjectBottomSheet } from './ProjectBottomSheet'
import { AddPromoterModal } from './AddPromoterModal'
import { ApplicantDetailsSection } from './ApplicantDetailsSection'
import { OfficeAddressAndPromoters } from './OfficeAddressAndPromoters'
import './ApplicantAndProject.css'

export interface ApplicantAndProjectProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  errors?: Record<string, string>
}

type PickerType =
  | 'entityType'
  | 'bankingRelationship'
  | 'primaryBusinessActivity'
  | 'sector'
  | 'subSector'
  | 'projectType'
  | 'developmentOption'
  | null

export const ApplicantAndProject: React.FC<ApplicantAndProjectProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const [activePicker, setActivePicker] = useState<PickerType>(null)
  const [isAddPromoterOpen, setIsAddPromoterOpen] = useState(false)

  // Collapsible section toggles
  const [isApplicantSectionOpen, setIsApplicantSectionOpen] = useState(true)
  const [isOfficeAddressOpen, setIsOfficeAddressOpen] = useState(true)
  const [isPromoterSectionOpen, setIsPromoterSectionOpen] = useState(true)
  const [isClassificationOpen, setIsClassificationOpen] = useState(true)

  const promoters = data.promoters || []

  const subSectorOptions = useMemo(() => {
    return data.projectSector && SECTOR_SUBSECTORS[data.projectSector]
      ? SECTOR_SUBSECTORS[data.projectSector]
      : [{ label: 'Select Sector First', value: '' }]
  }, [data.projectSector])

  const handleAddPromoter = (newPromoter: ProjectPromoterSponsor) => {
    onChange({ promoters: [...promoters, newPromoter] })
  }

  const handleRemovePromoter = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange({ promoters: promoters.filter((p) => p.id !== id) })
  }

  return (
    <div className="pf-screen-container">
      {/* 1. Applicant / Borrower Details Section */}
      <ApplicantDetailsSection
        data={data}
        onChange={onChange}
        isOpen={isApplicantSectionOpen}
        onToggle={() => setIsApplicantSectionOpen((prev) => !prev)}
        onOpenPicker={(picker) => setActivePicker(picker)}
        errors={errors}
      />

      {/* 2. Registered Office & 3. Promoters */}
      <OfficeAddressAndPromoters
        data={data}
        onChange={onChange}
        isOfficeOpen={isOfficeAddressOpen}
        onToggleOffice={() => setIsOfficeAddressOpen((prev) => !prev)}
        isPromotersOpen={isPromoterSectionOpen}
        onTogglePromoters={() => setIsPromoterSectionOpen((prev) => !prev)}
        onOpenAddPromoter={() => setIsAddPromoterOpen(true)}
        onRemovePromoter={handleRemovePromoter}
        errors={errors}
      />

      {/* 4. Project Classification Card Section */}
      <div className="pf-collapsible-card">
        <div
          className="pf-collapsible-header"
          onClick={() => setIsClassificationOpen((prev) => !prev)}
        >
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile pf-section-icon-tile--orange">
              <img src="/assets/icons/loans/doc-orange.svg" alt="" width="20" height="20" />
            </div>
            <h3 className="pf-collapsible-title">Project Classification</h3>
          </div>
          <span className={`pf-chevron ${isClassificationOpen ? 'pf-chevron--open' : ''}`}>
            <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
          </span>
        </div>

        {isClassificationOpen && (
          <div className="pf-collapsible-body">
            <div className="pf-field-group">
              <label htmlFor="projectName" className="pf-field-label">
                Project Name <span className="pf-req">*</span>
              </label>
              <input
                id="projectName"
                type="text"
                className={`pf-custom-input ${errors.projectName ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter project name"
                value={data.projectName || ''}
                onChange={(e) => onChange({ projectName: e.target.value })}
              />
              {errors.projectName && <span className="pf-field-error">{errors.projectName}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">
                Project Sector <span className="pf-req">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.projectSector ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => setActivePicker('sector')}
              >
                <span className={data.projectSector ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.projectSector || 'Select sector'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.projectSector && <span className="pf-field-error">{errors.projectSector}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">
                Project Sub-Sector <span className="pf-req">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.projectSubSector ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => setActivePicker('subSector')}
              >
                <span className={data.projectSubSector ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.projectSubSector || 'Select sub-sector'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.projectSubSector && <span className="pf-field-error">{errors.projectSubSector}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">
                Project Type <span className="pf-req">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.projectType ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => setActivePicker('projectType')}
              >
                <span className={data.projectType ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.projectType || 'Select project type'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.projectType && <span className="pf-field-error">{errors.projectType}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">
                Greenfield / Expansion / Modernization <span className="pf-req">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.developmentOption ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => setActivePicker('developmentOption')}
              >
                <span className={data.developmentOption ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.developmentOption || 'Select option'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.developmentOption && <span className="pf-field-error">{errors.developmentOption}</span>}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sheet Modals for Pickers */}
      <ProjectBottomSheet
        isOpen={activePicker === 'entityType'}
        title="Select Entity Type"
        options={ENTITY_TYPES}
        selectedValue={data.entityType}
        onSelect={(val) => onChange({ entityType: val as ApplicantEntityType })}
        onClose={() => setActivePicker(null)}
      />

      <ProjectBottomSheet
        isOpen={activePicker === 'bankingRelationship'}
        title="Select Banking Relationship"
        options={BANKING_RELATIONSHIPS}
        selectedValue={data.bankingRelationship}
        onSelect={(val) => onChange({ bankingRelationship: val as BankingRelationshipType })}
        onClose={() => setActivePicker(null)}
      />

      <ProjectBottomSheet
        isOpen={activePicker === 'primaryBusinessActivity'}
        title="Select Primary Business Activity"
        options={PRIMARY_BUSINESS_ACTIVITIES}
        selectedValue={data.primaryBusinessActivity}
        onSelect={(val) => onChange({ primaryBusinessActivity: val as PrimaryBusinessActivityType })}
        onClose={() => setActivePicker(null)}
      />

      <ProjectBottomSheet
        isOpen={activePicker === 'sector'}
        title="Select Project Sector"
        options={PROJECT_SECTORS}
        selectedValue={data.projectSector}
        onSelect={(val) => onChange({ projectSector: val as ProjectSectorType, projectSubSector: '' })}
        onClose={() => setActivePicker(null)}
      />

      <ProjectBottomSheet
        isOpen={activePicker === 'subSector'}
        title="Select Sub-Sector"
        options={subSectorOptions}
        selectedValue={data.projectSubSector}
        onSelect={(val) => onChange({ projectSubSector: val })}
        onClose={() => setActivePicker(null)}
      />

      <ProjectBottomSheet
        isOpen={activePicker === 'projectType'}
        title="Select Project Type"
        options={PROJECT_TYPES}
        selectedValue={data.projectType}
        onSelect={(val) => onChange({ projectType: val as ProjectType })}
        onClose={() => setActivePicker(null)}
      />

      <ProjectBottomSheet
        isOpen={activePicker === 'developmentOption'}
        title="Select Development Option"
        options={DEVELOPMENT_OPTIONS}
        selectedValue={data.developmentOption}
        onSelect={(val) => onChange({ developmentOption: val as ProjectDevelopmentOption })}
        onClose={() => setActivePicker(null)}
      />

      {/* Add Promoter Modal */}
      <AddPromoterModal
        isOpen={isAddPromoterOpen}
        onClose={() => setIsAddPromoterOpen(false)}
        onAdd={handleAddPromoter}
      />
    </div>
  )
}

export default ApplicantAndProject
