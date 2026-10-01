import React, { useEffect } from 'react'
import './ProjectBottomSheet.css'

export interface ProjectBottomSheetProps {
  isOpen: boolean
  title: string
  options: { label: string; value: string }[]
  selectedValue?: string
  onSelect: (value: string) => void
  onClose: () => void
}

/**
 * Mobile-friendly bottom sheet picker for Project Finance form dropdowns
 * Matches native app styling and works seamlessly on both mobile and web.
 */
export const ProjectBottomSheet: React.FC<ProjectBottomSheetProps> = ({
  isOpen,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="pf-bottom-sheet-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pf-bottom-sheet-container" onClick={(e) => e.stopPropagation()}>
        <div className="pf-bottom-sheet-header">
          <h3 className="pf-bottom-sheet-title">{title}</h3>
          <button
            type="button"
            className="pf-bottom-sheet-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="pf-bottom-sheet-list" role="listbox">
          {options.map((opt) => {
            const isSelected = opt.value === selectedValue
            return (
              <button
                key={opt.value}
                type="button"
                className={`pf-bottom-sheet-item ${isSelected ? 'pf-bottom-sheet-item--selected' : ''}`}
                onClick={() => {
                  onSelect(opt.value)
                  onClose()
                }}
                role="option"
                aria-selected={isSelected}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <span className="pf-bottom-sheet-check">✓</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProjectBottomSheet
