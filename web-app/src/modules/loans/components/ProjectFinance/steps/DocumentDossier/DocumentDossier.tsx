import React, { useState } from 'react'
import type { ProjectFinanceData, SecurityItem } from '../../../../types/projectFinance.types'
import { LocationBottomSheet } from '../LocationLandTechnical/LocationBottomSheet'
import { SecurityCollateralSection } from './SecurityCollateralSection'
import { LegalApprovalsSection } from './LegalApprovalsSection'
import { RegulatoryComplianceSection } from './RegulatoryComplianceSection'
import { InsuranceDetailsSection } from './InsuranceDetailsSection'
import { OtherComplianceSection } from './OtherComplianceSection'
import {
  TYPE_OF_SECURITY_OPTIONS,
  OWNERSHIP_TYPE_OPTIONS,
  BUSINESS_REGISTRATION_TYPE_OPTIONS,
  TYPE_OF_INSURANCE_OPTIONS,
} from './securityComplianceConstants'
import './DocumentDossier.css'

export interface DocumentDossierProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  errors?: Record<string, string>
}

export const DocumentDossier: React.FC<DocumentDossierProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const [isSecurityOpen, setIsSecurityOpen] = useState<boolean>(true)
  const [isApprovalsOpen, setIsApprovalsOpen] = useState<boolean>(true)
  const [isComplianceOpen, setIsComplianceOpen] = useState<boolean>(true)
  const [isInsuranceOpen, setIsInsuranceOpen] = useState<boolean>(true)
  const [isOtherComplianceOpen, setIsOtherComplianceOpen] = useState<boolean>(true)

  const [activePicker, setActivePicker] = useState<{
    type: 'typeOfSecurity' | 'ownershipType' | 'businessRegistrationType' | 'typeOfInsurance'
    index?: number
  } | null>(null)

  // Guarantee list of security items (initial empty if none)
  const securities: SecurityItem[] =
    data.securityList && data.securityList.length > 0
      ? data.securityList
      : [
          {
            id: 'sec-1',
            typeOfSecurity: data.typeOfSecurity || '',
            assetDescription: data.securityAssetDescription || '',
            estimatedValue: data.securityEstimatedValue || '',
            ownershipType: data.securityOwnershipType || '',
            locationOfAsset: data.securityLocationOfAsset || '',
            valuationReportAvailable: data.securityValuationReportAvailable ?? true,
            existingCharge: data.securityExistingCharge ?? false,
            existingChargeDetails: data.securityExistingChargeDetails || '',
          },
        ]

  const syncSecurities = (updatedList: SecurityItem[]) => {
    try {
      const first = updatedList[0] || {
        typeOfSecurity: '',
        assetDescription: '',
        estimatedValue: '',
        ownershipType: '',
        locationOfAsset: '',
        valuationReportAvailable: true,
        existingCharge: false,
        existingChargeDetails: '',
      }
      onChange({
        securityList: updatedList,
        typeOfSecurity: first.typeOfSecurity,
        securityAssetDescription: first.assetDescription,
        securityEstimatedValue: first.estimatedValue,
        securityOwnershipType: first.ownershipType,
        securityLocationOfAsset: first.locationOfAsset,
        securityValuationReportAvailable: first.valuationReportAvailable,
        securityExistingCharge: first.existingCharge,
        securityExistingChargeDetails: first.existingChargeDetails,
      })
    } catch (err) {
      console.error('Error syncing securities:', err)
    }
  }

  const handleUpdateSecurity = (index: number, updated: SecurityItem) => {
    try {
      const nextList = securities.map((item, idx) => (idx === index ? updated : item))
      syncSecurities(nextList)
    } catch (err) {
      console.error('Error updating security item:', err)
    }
  }

  const handleAddSecurity = () => {
    try {
      const newSec: SecurityItem = {
        id: `sec-${Date.now()}`,
        typeOfSecurity: '',
        assetDescription: '',
        estimatedValue: '',
        ownershipType: '',
        locationOfAsset: '',
        valuationReportAvailable: true,
        existingCharge: false,
        existingChargeDetails: '',
      }
      syncSecurities([...securities, newSec])
    } catch (err) {
      console.error('Error adding security item:', err)
    }
  }

  const handleRemoveSecurity = (index: number) => {
    try {
      if (securities.length <= 1) return
      const nextList = securities.filter((_, idx) => idx !== index)
      syncSecurities(nextList)
    } catch (err) {
      console.error('Error removing security item:', err)
    }
  }

  const handleSelectPickerOption = (val: string) => {
    if (!activePicker) return

    if (activePicker.type === 'businessRegistrationType') {
      onChange({ businessRegistrationType: val })
    } else if (activePicker.type === 'typeOfInsurance') {
      onChange({ typeOfInsurance: val })
    } else if (activePicker.index !== undefined) {
      const idx = activePicker.index
      const targetSec = securities[idx]
      if (targetSec) {
        handleUpdateSecurity(idx, {
          ...targetSec,
          [activePicker.type]: val,
        })
      }
    }
    setActivePicker(null)
  }

  return (
    <div className="security-compliance-step" data-testid="security-compliance-step">
      {/* 1. Security / Collateral */}
      <SecurityCollateralSection
        items={securities}
        isOpen={isSecurityOpen}
        onToggle={() => setIsSecurityOpen((prev) => !prev)}
        onUpdate={handleUpdateSecurity}
        onAdd={handleAddSecurity}
        onRemove={handleRemoveSecurity}
        onOpenPicker={(index, field) => setActivePicker({ type: field, index })}
        errors={errors}
      />

      {/* 2. Legal & Statutory Approvals */}
      <LegalApprovalsSection
        data={data}
        onChange={onChange}
        isOpen={isApprovalsOpen}
        onToggle={() => setIsApprovalsOpen((prev) => !prev)}
        errors={errors}
      />

      {/* 3. Regulatory Compliance */}
      <RegulatoryComplianceSection
        data={data}
        onChange={onChange}
        isOpen={isComplianceOpen}
        onToggle={() => setIsComplianceOpen((prev) => !prev)}
        onOpenPicker={() => setActivePicker({ type: 'businessRegistrationType' })}
        errors={errors}
      />

      {/* 4. Insurance Details */}
      <InsuranceDetailsSection
        data={data}
        onChange={onChange}
        isOpen={isInsuranceOpen}
        onToggle={() => setIsInsuranceOpen((prev) => !prev)}
        onOpenPicker={() => setActivePicker({ type: 'typeOfInsurance' })}
        errors={errors}
      />

      {/* 5. Other Compliance */}
      <OtherComplianceSection
        data={data}
        onChange={onChange}
        isOpen={isOtherComplianceOpen}
        onToggle={() => setIsOtherComplianceOpen((prev) => !prev)}
        errors={errors}
      />

      {/* Bottom Sheet Pickers */}
      <LocationBottomSheet
        isOpen={activePicker?.type === 'typeOfSecurity'}
        title="Select Security Type"
        options={TYPE_OF_SECURITY_OPTIONS}
        selectedValue={
          activePicker?.index !== undefined
            ? securities[activePicker.index]?.typeOfSecurity || ''
            : ''
        }
        onSelect={handleSelectPickerOption}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker?.type === 'ownershipType'}
        title="Select Ownership Type"
        options={OWNERSHIP_TYPE_OPTIONS}
        selectedValue={
          activePicker?.index !== undefined
            ? securities[activePicker.index]?.ownershipType || ''
            : ''
        }
        onSelect={handleSelectPickerOption}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker?.type === 'businessRegistrationType'}
        title="Select Registration Type"
        options={BUSINESS_REGISTRATION_TYPE_OPTIONS}
        selectedValue={data.businessRegistrationType || ''}
        onSelect={handleSelectPickerOption}
        onClose={() => setActivePicker(null)}
      />

      <LocationBottomSheet
        isOpen={activePicker?.type === 'typeOfInsurance'}
        title="Select Insurance Type"
        options={TYPE_OF_INSURANCE_OPTIONS}
        selectedValue={data.typeOfInsurance || ''}
        onSelect={handleSelectPickerOption}
        onClose={() => setActivePicker(null)}
      />
    </div>
  )
}

export default DocumentDossier
