import React, { useState } from 'react'
import type {
  ProjectFinanceData,
  ProductServiceItem,
  CustomerOfftakerItem,
} from '../../../../types/projectFinance.types'
import { ProductServiceCard } from './ProductServiceCard'
import { MarketDetailsSection } from './MarketDetailsSection'
import { CustomerOfftakerSection } from './CustomerOfftakerSection'
import { Section4And5 } from './Section4And5'
import { Section6And7 } from './Section6And7'
import { Section8And9 } from './Section8And9'
import { Section10And11 } from './Section10And11'
import { LocationBottomSheet } from '../LocationLandTechnical/LocationBottomSheet'
import {
  CATEGORY_OPTIONS,
  UNIT_OPTIONS,
  DOMESTIC_EXPORT_OPTIONS,
  TARGET_MARKET_OPTIONS,
  MARKET_TYPE_OPTIONS,
  CUSTOMER_SEGMENT_OPTIONS,
  CUSTOMER_TYPE_OPTIONS,
  AGREEMENT_STATUS_OPTIONS,
  PROJECTION_PERIOD_OPTIONS,
  HISTORICAL_YEARS_OPTIONS,
  PROJECTED_YEARS_OPTIONS,
  STABILISATION_YEAR_OPTIONS,
} from './financialProjectionsConstants'
import './FinancialProjections.css'

export interface FinancialProjectionsProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  errors?: Record<string, string>
}

const BoxSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
)

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

export const FinancialProjections: React.FC<FinancialProjectionsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(true)
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(true)
  const [isCustomersOpen, setIsCustomersOpen] = useState<boolean>(true)
  const [isProjectionSetupOpen, setIsProjectionSetupOpen] = useState<boolean>(true)
  const [isHistoricalFinancialsOpen, setIsHistoricalFinancialsOpen] = useState<boolean>(true)
  const [isProjectedFinancialsOpen, setIsProjectedFinancialsOpen] = useState<boolean>(true)
  const [isCashFlowOpen, setIsCashFlowOpen] = useState<boolean>(true)
  const [isWorkingCapitalOpen, setIsWorkingCapitalOpen] = useState<boolean>(true)
  const [isDebtServiceOpen, setIsDebtServiceOpen] = useState<boolean>(true)
  const [isFinancialRatiosOpen, setIsFinancialRatiosOpen] = useState<boolean>(true)
  const [isSensitivityAnalysisOpen, setIsSensitivityAnalysisOpen] = useState<boolean>(true)

  const [activeProductPicker, setActiveProductPicker] = useState<{
    index: number
    field: 'category' | 'unit' | 'domesticExport'
  } | null>(null)

  const [activeMarketPicker, setActiveMarketPicker] = useState<
    'targetMarket' | 'marketType' | 'customerSegment' | null
  >(null)

  const [activeProjectionPicker, setActiveProjectionPicker] = useState<
    'projectionPeriodYears' | 'historicalYears' | 'projectedYears' | 'stabilisationYear' | null
  >(null)

  const [activeCustomerPicker, setActiveCustomerPicker] = useState<{
    index: number
    field: 'customerType' | 'unit' | 'agreementStatus'
  } | null>(null)

  const productItems: ProductServiceItem[] = data.productsServicesList && data.productsServicesList.length > 0
    ? data.productsServicesList
    : [
        {
          id: '1',
          name: '',
          category: '',
          unit: '',
          installedCapacity: '',
          expectedProductionAnnual: '',
          capacityUtilisationPercent: '',
          sellingPrice: '',
          domesticExport: '',
          productMixPercent: '',
        },
      ]

  const customerItems: CustomerOfftakerItem[] = data.customersOfftakersList && data.customersOfftakersList.length > 0
    ? data.customersOfftakersList
    : [
        {
          id: '1',
          customerName: '',
          customerType: '',
          expectedPurchaseQuantity: '',
          unit: '',
          expectedRevenue: '',
          isContractAvailable: false,
          contractPeriodYears: '',
          contractedPrice: '',
          minimumOfftake: '',
          agreementStatus: '',
        },
      ]

  const handleUpdateProduct = (index: number, updated: ProductServiceItem) => {
    try {
      const next = productItems.map((it, idx) => (idx === index ? updated : it))
      onChange({ productsServicesList: next })
    } catch (err) {
      console.error('Error updating product item:', err)
    }
  }

  const handleAddProduct = () => {
    try {
      const newItem: ProductServiceItem = {
        id: String(Date.now()),
        name: '',
        category: '',
        unit: '',
        installedCapacity: '',
        expectedProductionAnnual: '',
        capacityUtilisationPercent: '',
        sellingPrice: '',
        domesticExport: '',
        productMixPercent: '',
      }
      onChange({ productsServicesList: [...productItems, newItem] })
    } catch (err) {
      console.error('Error adding product item:', err)
    }
  }

  const handleRemoveProduct = (index: number) => {
    try {
      if (productItems.length <= 1) return
      const next = productItems.filter((_, idx) => idx !== index)
      onChange({ productsServicesList: next })
    } catch (err) {
      console.error('Error removing product item:', err)
    }
  }

  const handleUpdateCustomer = (index: number, updated: CustomerOfftakerItem) => {
    try {
      const next = customerItems.map((it, idx) => (idx === index ? updated : it))
      onChange({ customersOfftakersList: next })
    } catch (err) {
      console.error('Error updating customer item:', err)
    }
  }

  const handleAddCustomer = () => {
    try {
      const newItem: CustomerOfftakerItem = {
        id: String(Date.now()),
        customerName: '',
        customerType: '',
        expectedPurchaseQuantity: '',
        unit: '',
        expectedRevenue: '',
        isContractAvailable: false,
        contractPeriodYears: '',
        contractedPrice: '',
        minimumOfftake: '',
        agreementStatus: '',
      }
      onChange({ customersOfftakersList: [...customerItems, newItem] })
    } catch (err) {
      console.error('Error adding customer item:', err)
    }
  }

  const handleRemoveCustomer = (index: number) => {
    try {
      if (customerItems.length <= 1) return
      const next = customerItems.filter((_, idx) => idx !== index)
      onChange({ customersOfftakersList: next })
    } catch (err) {
      console.error('Error removing customer item:', err)
    }
  }

  const handleProductPickerSelect = (val: string) => {
    try {
      if (!activeProductPicker) return
      const { index, field } = activeProductPicker
      const item = productItems[index]
      if (item) {
        handleUpdateProduct(index, { ...item, [field]: val })
      }
      setActiveProductPicker(null)
    } catch (err) {
      console.error('Error selecting product picker option:', err)
    }
  }

  const handleMarketPickerSelect = (val: string) => {
    try {
      if (!activeMarketPicker) return
      onChange({ [activeMarketPicker]: val })
      setActiveMarketPicker(null)
    } catch (err) {
      console.error('Error selecting market picker option:', err)
    }
  }

  const handleCustomerPickerSelect = (val: string) => {
    try {
      if (!activeCustomerPicker) return
      const { index, field } = activeCustomerPicker
      const item = customerItems[index]
      if (item) {
        handleUpdateCustomer(index, { ...item, [field]: val })
      }
      setActiveCustomerPicker(null)
    } catch (err) {
      console.error('Error selecting customer picker option:', err)
    }
  }

  return (
    <div className="financial-projections-step" data-testid="financial-projections-step">
      {/* 1. Products / Services */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={() => setIsProductsOpen((prev) => !prev)}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile">
              <BoxSvg />
            </div>
            <h2 className="pf-collapsible-title">1. Products / Services</h2>
          </div>
          <ChevronSvg isOpen={isProductsOpen} />
        </div>

        {isProductsOpen && (
          <div className="pf-collapsible-body">
            <p className="pf-section-intro-desc">
              Enter details of products or services to be manufactured / provided.
            </p>

            {productItems.map((item, index) => (
              <ProductServiceCard
                key={item.id || index}
                item={item}
                index={index}
                totalCount={productItems.length}
                onChange={(upd) => handleUpdateProduct(index, upd)}
                onRemove={() => handleRemoveProduct(index)}
                onOpenPicker={(field) => setActiveProductPicker({ index, field })}
                errors={errors}
              />
            ))}

            <button
              type="button"
              className="pf-add-item-btn"
              onClick={handleAddProduct}
            >
              <span>+</span> + Add Product / Service
            </button>
          </div>
        )}
      </div>

      {/* 2. Market Details */}
      <MarketDetailsSection
        data={data}
        onChange={onChange}
        isOpen={isMarketOpen}
        onToggle={() => setIsMarketOpen((prev) => !prev)}
        onOpenPicker={(field) => setActiveMarketPicker(field)}
        errors={errors}
      />

      {/* 3. Customers / Offtakers */}
      <CustomerOfftakerSection
        items={customerItems}
        isOpen={isCustomersOpen}
        onToggle={() => setIsCustomersOpen((prev) => !prev)}
        onUpdate={handleUpdateCustomer}
        onAdd={handleAddCustomer}
        onRemove={handleRemoveCustomer}
        onOpenPicker={(index, field) => setActiveCustomerPicker({ index, field })}
        errors={errors}
      />

      {/* 4. Projection Setup & 5. Historical Financials */}
      <Section4And5
        data={data}
        onChange={onChange}
        isProjectionSetupOpen={isProjectionSetupOpen}
        onToggleProjectionSetup={() => setIsProjectionSetupOpen((prev) => !prev)}
        isHistoricalFinancialsOpen={isHistoricalFinancialsOpen}
        onToggleHistoricalFinancials={() => setIsHistoricalFinancialsOpen((prev) => !prev)}
        onOpenPicker={(field) => setActiveProjectionPicker(field)}
        errors={errors}
      />

      {/* 6. Projected Financials & 7. Cash Flow */}
      <Section6And7
        data={data}
        onChange={onChange}
        isProjectedFinancialsOpen={isProjectedFinancialsOpen}
        onToggleProjectedFinancials={() => setIsProjectedFinancialsOpen((prev) => !prev)}
        isCashFlowOpen={isCashFlowOpen}
        onToggleCashFlow={() => setIsCashFlowOpen((prev) => !prev)}
      />

      {/* 8. Working Capital & 9. Debt Service & DSCR */}
      <Section8And9
        data={data}
        onChange={onChange}
        isWorkingCapitalOpen={isWorkingCapitalOpen}
        onToggleWorkingCapital={() => setIsWorkingCapitalOpen((prev) => !prev)}
        isDebtServiceOpen={isDebtServiceOpen}
        onToggleDebtService={() => setIsDebtServiceOpen((prev) => !prev)}
        errors={errors}
      />

      {/* 10. Financial Ratios & 11. Sensitivity Analysis */}
      <Section10And11
        isFinancialRatiosOpen={isFinancialRatiosOpen}
        onToggleFinancialRatios={() => setIsFinancialRatiosOpen((prev) => !prev)}
        isSensitivityAnalysisOpen={isSensitivityAnalysisOpen}
        onToggleSensitivityAnalysis={() => setIsSensitivityAnalysisOpen((prev) => !prev)}
      />

      {/* Product Pickers */}
      <LocationBottomSheet
        isOpen={activeProductPicker?.field === 'category'}
        title="Select Category"
        options={CATEGORY_OPTIONS}
        selectedValue={activeProductPicker ? productItems[activeProductPicker.index]?.category : ''}
        onSelect={handleProductPickerSelect}
        onClose={() => setActiveProductPicker(null)}
      />

      <LocationBottomSheet
        isOpen={activeProductPicker?.field === 'unit'}
        title="Select Unit"
        options={UNIT_OPTIONS}
        selectedValue={activeProductPicker ? productItems[activeProductPicker.index]?.unit : ''}
        onSelect={handleProductPickerSelect}
        onClose={() => setActiveProductPicker(null)}
      />

      <LocationBottomSheet
        isOpen={activeProductPicker?.field === 'domesticExport'}
        title="Select Option"
        options={DOMESTIC_EXPORT_OPTIONS}
        selectedValue={activeProductPicker ? productItems[activeProductPicker.index]?.domesticExport : ''}
        onSelect={handleProductPickerSelect}
        onClose={() => setActiveProductPicker(null)}
      />

      {/* Market Pickers */}
      <LocationBottomSheet
        isOpen={activeMarketPicker === 'targetMarket'}
        title="Select Target Market"
        options={TARGET_MARKET_OPTIONS}
        selectedValue={data.targetMarket || ''}
        onSelect={handleMarketPickerSelect}
        onClose={() => setActiveMarketPicker(null)}
      />

      <LocationBottomSheet
        isOpen={activeMarketPicker === 'marketType'}
        title="Select Market Type"
        options={MARKET_TYPE_OPTIONS}
        selectedValue={data.marketType || ''}
        onSelect={handleMarketPickerSelect}
        onClose={() => setActiveMarketPicker(null)}
      />

      <LocationBottomSheet
        isOpen={activeMarketPicker === 'customerSegment'}
        title="Select Customer Segment"
        options={CUSTOMER_SEGMENT_OPTIONS}
        selectedValue={data.customerSegment || ''}
        onSelect={handleMarketPickerSelect}
        onClose={() => setActiveMarketPicker(null)}
      />

      {/* Projection Pickers */}
      <LocationBottomSheet
        isOpen={activeProjectionPicker === 'projectionPeriodYears'}
        title="Select Projection Period"
        options={PROJECTION_PERIOD_OPTIONS}
        selectedValue={data.projectionPeriodYears || ''}
        onSelect={(val) => {
          onChange({ projectionPeriodYears: val })
          setActiveProjectionPicker(null)
        }}
        onClose={() => setActiveProjectionPicker(null)}
      />

      <LocationBottomSheet
        isOpen={activeProjectionPicker === 'historicalYears'}
        title="Select Historical Years"
        options={HISTORICAL_YEARS_OPTIONS}
        selectedValue={data.historicalYears || ''}
        onSelect={(val) => {
          onChange({ historicalYears: val })
          setActiveProjectionPicker(null)
        }}
        onClose={() => setActiveProjectionPicker(null)}
      />

      <LocationBottomSheet
        isOpen={activeProjectionPicker === 'projectedYears'}
        title="Select Projected Years"
        options={PROJECTED_YEARS_OPTIONS}
        selectedValue={data.projectedYears || ''}
        onSelect={(val) => {
          onChange({ projectedYears: val })
          setActiveProjectionPicker(null)
        }}
        onClose={() => setActiveProjectionPicker(null)}
      />

      <LocationBottomSheet
        isOpen={activeProjectionPicker === 'stabilisationYear'}
        title="Select Stabilisation Year"
        options={STABILISATION_YEAR_OPTIONS}
        selectedValue={data.stabilisationYear || ''}
        onSelect={(val) => {
          onChange({ stabilisationYear: val })
          setActiveProjectionPicker(null)
        }}
        onClose={() => setActiveProjectionPicker(null)}
      />

      {/* Customer Pickers */}
      <LocationBottomSheet
        isOpen={activeCustomerPicker?.field === 'customerType'}
        title="Select Customer Type"
        options={CUSTOMER_TYPE_OPTIONS}
        selectedValue={activeCustomerPicker ? customerItems[activeCustomerPicker.index]?.customerType : ''}
        onSelect={handleCustomerPickerSelect}
        onClose={() => setActiveCustomerPicker(null)}
      />

      <LocationBottomSheet
        isOpen={activeCustomerPicker?.field === 'unit'}
        title="Select Unit"
        options={UNIT_OPTIONS}
        selectedValue={activeCustomerPicker ? customerItems[activeCustomerPicker.index]?.unit : ''}
        onSelect={handleCustomerPickerSelect}
        onClose={() => setActiveCustomerPicker(null)}
      />

      <LocationBottomSheet
        isOpen={activeCustomerPicker?.field === 'agreementStatus'}
        title="Select Status"
        options={AGREEMENT_STATUS_OPTIONS}
        selectedValue={activeCustomerPicker ? customerItems[activeCustomerPicker.index]?.agreementStatus : ''}
        onSelect={handleCustomerPickerSelect}
        onClose={() => setActiveCustomerPicker(null)}
      />
    </div>
  )
}

export default FinancialProjections
