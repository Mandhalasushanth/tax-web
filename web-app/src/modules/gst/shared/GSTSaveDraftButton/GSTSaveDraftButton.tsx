import type { FC } from 'react'
import './GSTSaveDraftButton.css'

export interface GSTSaveDraftButtonProps {
  onClick: () => void
  label?: string
  disabled?: boolean
}

/** "Save Draft & Exit" for GST forms that do not use the step action bar (same look as the loans flows) */
export const GSTSaveDraftButton: FC<GSTSaveDraftButtonProps> = ({
  onClick,
  label = 'Save Draft & Exit',
  disabled = false,
}) => (
  <button type="button" className="gst-save-draft-btn" onClick={onClick} disabled={disabled}>
    <img src="/assets/icons/gst/save-draft.svg" alt="" className="gst-save-draft-btn__icon" />
    <span>{label}</span>
  </button>
)

export default GSTSaveDraftButton
