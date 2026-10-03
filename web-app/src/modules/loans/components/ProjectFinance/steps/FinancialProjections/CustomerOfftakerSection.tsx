import React from 'react'
import type { CustomerOfftakerItem } from '@modules/loans/types/projectFinance.types'
import { CustomerOfftakerCard } from './CustomerOfftakerCard'

export interface CustomerOfftakerSectionProps {
  items: CustomerOfftakerItem[]
  isOpen: boolean
  onToggle: () => void
  onUpdate: (index: number, updated: CustomerOfftakerItem) => void
  onAdd: () => void
  onRemove: (index: number) => void
  onOpenPicker?: (index: number, field: 'customerType' | 'unit' | 'agreementStatus') => void
  errors?: Record<string, string>
}

const UsersSvg: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const ChevronSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span className={`pf-chevron ${isOpen ? 'pf-chevron--open' : ''}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
)

export const CustomerOfftakerSection: React.FC<CustomerOfftakerSectionProps> = ({
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
          <div className="pf-section-icon-tile">
            <UsersSvg />
          </div>
          <h2 className="pf-collapsible-title">3. Customers / Offtakers</h2>
        </div>
        <ChevronSvg isOpen={isOpen} />
      </div>

      {isOpen && (
        <div className="pf-collapsible-body">
          <p className="pf-section-intro-desc">
            Add key customers or off-takers for your product / service.
          </p>

          {items.map((item, index) => (
            <CustomerOfftakerCard
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
            className="pf-add-item-btn"
            onClick={onAdd}
          >
            <span>+</span> + Add Customer / Offtaker
          </button>
        </div>
      )}
    </div>
  )
}
