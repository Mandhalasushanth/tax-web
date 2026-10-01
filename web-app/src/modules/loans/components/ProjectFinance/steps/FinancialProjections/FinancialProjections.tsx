import React, { useState } from 'react'
import type {
  ProjectFinanceData,
  ProductServiceItem,
  CustomerOfftakerItem,
} from '@modules/loans/types/projectFinance.types'
import { ProductServiceCard } from './ProductServiceCard'
import { MarketDetailsSection } from './MarketDetailsSection'
import { CustomerOfftakerSection } from './CustomerOfftakerSection'
import { Section4And5 } from './Section4And5'
import { Section6And7 } from './Section6And7'
import { Section8And9 } from './Section8And9'
import { Section10And11 } from './Section10And11'
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
    const next = productItems.map((it, idx) => (idx === index ? updated : it))
    onChange({ productsServicesList: next })
  }

  const handleAddProduct = () => {
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
  }

  const handleRemoveProduct = (index: number) => {
    if (productItems.length <= 1) return
    const next = productItems.filter((_, idx) => idx !== index)
    onChange({ productsServicesList: next })
  }

  const handleUpdateCustomer = (index: number, updated: CustomerOfftakerItem) => {
    const next = customerItems.map((it, idx) => (idx === index ? updated : it))
    onChange({ customersOfftakersList: next })
  }

  const handleAddCustomer = () => {
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
  }

  const handleRemoveCustomer = (index: number) => {
    if (customerItems.length <= 1) return
    const next = customerItems.filter((_, idx) => idx !== index)
    onChange({ customersOfftakersList: next })
  }

  const renderProductsServicesCard = () => (
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
  )

  return (
    <div className="financial-projections-step" data-testid="financial-projections-step">
      {/* 1. Products / Services */}
      {renderProductsServicesCard()}

      {/* 2. Market Details */}
      <MarketDetailsSection
        data={data}
        onChange={onChange}
        isOpen={isMarketOpen}
        onToggle={() => setIsMarketOpen((prev) => !prev)}
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
    </div>
  )
}

export default FinancialProjections
