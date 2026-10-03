import React from 'react'
import type { SecurityItem } from '@modules/loans/types/projectFinance.types'
import { SecurityCollateralCard } from './SecurityCollateralCard'

export interface SecurityCollateralSectionProps {
  items: SecurityItem[]
  isOpen: boolean
  onToggle: () => void
  onUpdate: (index: number, updated: SecurityItem) => void
  onAdd: () => void
  onRemove: (index: number) => void
  onOpenPicker?: (index: number, field: 'typeOfSecurity' | 'ownershipType') => void
  errors?: Record<string, string>
}

const ShieldCheckSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

export const SecurityCollateralSection: React.FC<SecurityCollateralSectionProps> = ({
  items,
  isOpen,
  onToggle,
  onUpdate,
  onAdd,
  onRemove,
  errors = {},
}) => {
  return (
    <div className="pf-collapsible-card">
      <div className="pf-collapsible-header" onClick={onToggle}>
        <div className="pf-collapsible-header__left">
          <div className="pf-section-icon-tile pf-section-icon-tile--orange">
            <ShieldCheckSvg />
          </div>
          <h2 className="pf-collapsible-title">1. Security / Collateral</h2>
        </div>
        <ChevronSvg isOpen={isOpen} />
      </div>

      {isOpen && (
        <div className="pf-collapsible-body">
          <p className="pf-section-intro-desc">
            Provide details of assets to be offered as security for the loan.
          </p>

          {items.map((item, index) => (
            <SecurityCollateralCard
              key={item.id || index}
              item={item}
              index={index}
              totalCount={items.length}
              onChange={(upd) => onUpdate(index, upd)}
              onRemove={() => onRemove(index)}
              errors={errors}
            />
          ))}

          <button
            type="button"
            className="pf-btn-add-promoter"
            onClick={onAdd}
          >
            <span className="pf-add-plus">+</span> Add Another Security
          </button>
        </div>
      )}
    </div>
  )
}
