import React, { useState } from 'react'
import type { ProjectPromoterSponsor } from '@modules/loans/types/projectFinance.types'
import './AddPromoterModal.css'

export interface AddPromoterModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (promoter: ProjectPromoterSponsor) => void
}

/**
 * Add Promoter / Sponsor Modal popup matching screenshot 2 exactly.
 */
export const AddPromoterModal: React.FC<AddPromoterModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<'Individual' | 'Corporate'>('Individual')
  const [shareholding, setShareholding] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSave = () => {
    if (!name.trim()) {
      setError('Please enter promoter or sponsor name.')
      return
    }
    if (!shareholding.trim() || isNaN(Number(shareholding)) || Number(shareholding) <= 0 || Number(shareholding) > 100) {
      setError('Please enter a valid equity shareholding percentage (1-100%).')
      return
    }

    onAdd({
      id: `promoter_${Date.now()}`,
      name: name.trim(),
      category,
      shareholdingPercent: Number(shareholding),
    })
    setName('')
    setCategory('Individual')
    setShareholding('')
    setError(null)
    onClose()
  }

  return (
    <div className="pf-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pf-modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="pf-modal-title">Add Promoter / Sponsor</h3>

        {error && <div className="pf-modal-error">{error}</div>}

        <div className="pf-modal-form-group">
          <label htmlFor="promoter-name" className="pf-modal-label">
            Name <span className="pf-modal-req">*</span>
          </label>
          <input
            id="promoter-name"
            type="text"
            className="pf-modal-input"
            placeholder="e.g. Mr. Rajesh Kumar"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="pf-modal-form-group">
          <label className="pf-modal-label">
            Sponsor Category <span className="pf-modal-req">*</span>
          </label>
          <div className="pf-modal-category-toggle" role="radiogroup">
            <button
              type="button"
              className={`pf-modal-toggle-btn ${category === 'Individual' ? 'pf-modal-toggle-btn--active' : ''}`}
              onClick={() => setCategory('Individual')}
            >
              Individual
            </button>
            <button
              type="button"
              className={`pf-modal-toggle-btn ${category === 'Corporate' ? 'pf-modal-toggle-btn--active' : ''}`}
              onClick={() => setCategory('Corporate')}
            >
              Corporate
            </button>
          </div>
        </div>

        <div className="pf-modal-form-group">
          <label htmlFor="promoter-equity" className="pf-modal-label">
            Equity Shareholding (%) <span className="pf-modal-req">*</span>
          </label>
          <input
            id="promoter-equity"
            type="text"
            inputMode="numeric"
            className="pf-modal-input"
            placeholder="e.g. 50"
            value={shareholding}
            onChange={(e) => setShareholding(e.target.value.replace(/[^\d.]/g, ''))}
          />
        </div>

        <div className="pf-modal-actions">
          <button type="button" className="pf-modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="pf-modal-btn-save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddPromoterModal
