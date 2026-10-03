import React, { useState } from 'react'
import type { ProjectFinanceData, SecurityItem } from '@modules/loans/types/projectFinance.types'
import { SecurityCollateralSection } from './SecurityCollateralSection'
import { LegalApprovalsSection } from './LegalApprovalsSection'
import { RegulatoryComplianceSection } from './RegulatoryComplianceSection'
import { InsuranceDetailsSection } from './InsuranceDetailsSection'
import { OtherComplianceSection } from './OtherComplianceSection'
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
  }

  const handleUpdateSecurity = (index: number, updated: SecurityItem) => {
    const nextList = securities.map((item, idx) => (idx === index ? updated : item))
    syncSecurities(nextList)
  }

  const handleAddSecurity = () => {
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
  }

  const handleRemoveSecurity = (index: number) => {
    if (securities.length <= 1) return
    const nextList = securities.filter((_, idx) => idx !== index)
    syncSecurities(nextList)
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
        errors={errors}
      />

      {/* 4. Insurance Details */}
      <InsuranceDetailsSection
        data={data}
        onChange={onChange}
        isOpen={isInsuranceOpen}
        onToggle={() => setIsInsuranceOpen((prev) => !prev)}
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
    </div>
  )
}

export default DocumentDossier
