import React from 'react'
import type { ProjectFinanceData, LandParcelItem } from '../../../../types/projectFinance.types'

export interface Section3And4Props {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  isLandParcelsOpen: boolean
  onToggleLandParcels: () => void
  isRowOpen: boolean
  onToggleRow: () => void
  onOpenPicker: (picker: string) => void
  errors?: Record<string, string>
}

export const Section3And4: React.FC<Section3And4Props> = ({
  data,
  onChange,
  isLandParcelsOpen,
  onToggleLandParcels,
  isRowOpen,
  onToggleRow,
  onOpenPicker,
  errors = {},
}) => {
  const parcels: LandParcelItem[] = data.landParcels && data.landParcels.length > 0
    ? data.landParcels
    : [
        {
          id: '1',
          surveyPlotNumber: '',
          areaAcres: '',
          ownership: '',
          acquisitionStatus: '',
          titleStatus: '',
          encumbrance: '',
        },
      ]

  const handleAddParcel = () => {
    const newParcel: LandParcelItem = {
      id: `parcel_${Date.now()}`,
      surveyPlotNumber: '',
      areaAcres: '',
      ownership: '',
      acquisitionStatus: '',
      titleStatus: '',
      encumbrance: '',
    }
    onChange({ landParcels: [...parcels, newParcel] })
  }

  const handleUpdateParcel = (index: number, fields: Partial<LandParcelItem>) => {
    const updated = parcels.map((item, idx) => (idx === index ? { ...item, ...fields } : item))
    onChange({ landParcels: updated })
  }

  const handleRemoveParcel = (index: number) => {
    if (parcels.length <= 1) return
    const updated = parcels.filter((_, idx) => idx !== index)
    onChange({ landParcels: updated })
  }

  return (
    <>
      {/* 3. Land Parcels Section */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleLandParcels}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile">
              <img src="/assets/icons/loans/users-green.svg" alt="" width="20" height="20" />
            </div>
            <h3 className="pf-collapsible-title">3. Land Parcels</h3>
          </div>
          <button
            type="button"
            className="pf-btn-add-parcel"
            onClick={(e) => {
              e.stopPropagation()
              handleAddParcel()
            }}
          >
            + Add Land Parcel
          </button>
        </div>

        {isLandParcelsOpen && (
          <div className="pf-collapsible-body">
            <div className="pf-parcels-list">
              {parcels.map((parcel, idx) => (
                <div key={parcel.id} className="pf-parcel-card">
                  <div className="pf-parcel-card__header">
                    <h4 className="pf-parcel-card__title">Parcel {idx + 1}</h4>
                    {parcels.length > 1 && (
                      <button
                        type="button"
                        className="pf-parcel-btn-remove"
                        onClick={() => handleRemoveParcel(idx)}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="pf-field-group">
                    <label htmlFor={`surveyPlotNumber_${idx}`} className="pf-field-label">
                      Survey / Plot Number <span className="pf-req">*</span>
                    </label>
                    <input
                      id={`surveyPlotNumber_${idx}`}
                      type="text"
                      className="pf-custom-input"
                      placeholder="Enter survey number"
                      value={parcel.surveyPlotNumber || ''}
                      onChange={(e) => handleUpdateParcel(idx, { surveyPlotNumber: e.target.value })}
                    />
                  </div>

                  <div className="pf-field-group">
                    <label htmlFor={`areaAcres_${idx}`} className="pf-field-label">
                      Area (Acres) <span className="pf-req">*</span>
                    </label>
                    <input
                      id={`areaAcres_${idx}`}
                      type="text"
                      className="pf-custom-input"
                      placeholder="Enter area"
                      value={parcel.areaAcres || ''}
                      onChange={(e) => handleUpdateParcel(idx, { areaAcres: e.target.value.replace(/[^\d.]/g, '') })}
                    />
                  </div>

                  <div className="pf-field-group">
                    <label className="pf-field-label">Ownership <span className="pf-req">*</span></label>
                    <button
                      type="button"
                      className="pf-custom-select-btn"
                      onClick={() => onOpenPicker(`parcel_ownership_${idx}`)}
                    >
                      <span className={parcel.ownership ? 'pf-select-value' : 'pf-select-placeholder'}>
                        {parcel.ownership || 'Select ownership'}
                      </span>
                      <span className="pf-select-chevron">
                        <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                      </span>
                    </button>
                  </div>

                  <div className="pf-field-group">
                    <label className="pf-field-label">Acquisition Status <span className="pf-req">*</span></label>
                    <button
                      type="button"
                      className="pf-custom-select-btn"
                      onClick={() => onOpenPicker(`parcel_acquisition_${idx}`)}
                    >
                      <span className={parcel.acquisitionStatus ? 'pf-select-value' : 'pf-select-placeholder'}>
                        {parcel.acquisitionStatus || 'Select status'}
                      </span>
                      <span className="pf-select-chevron">
                        <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                      </span>
                    </button>
                  </div>

                  <div className="pf-field-group">
                    <label className="pf-field-label">Title Status <span className="pf-req">*</span></label>
                    <button
                      type="button"
                      className="pf-custom-select-btn"
                      onClick={() => onOpenPicker(`parcel_title_${idx}`)}
                    >
                      <span className={parcel.titleStatus ? 'pf-select-value' : 'pf-select-placeholder'}>
                        {parcel.titleStatus || 'Select title status'}
                      </span>
                      <span className="pf-select-chevron">
                        <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                      </span>
                    </button>
                  </div>

                  <div className="pf-field-group">
                    <label className="pf-field-label">Encumbrance <span className="pf-req">*</span></label>
                    <button
                      type="button"
                      className="pf-custom-select-btn"
                      onClick={() => onOpenPicker(`parcel_encumbrance_${idx}`)}
                    >
                      <span className={parcel.encumbrance ? 'pf-select-value' : 'pf-select-placeholder'}>
                        {parcel.encumbrance || 'Select encumbrance'}
                      </span>
                      <span className="pf-select-chevron">
                        <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Right of Way (ROW) Section */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleRow}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile">
              <img src="/assets/icons/loans/doc-orange.svg" alt="" width="20" height="20" />
            </div>
            <h3 className="pf-collapsible-title">4. Right of Way (ROW)</h3>
          </div>
          <span className={`pf-chevron ${isRowOpen ? 'pf-chevron--open' : ''}`}>
            <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
          </span>
        </div>

        {isRowOpen && (
          <div className="pf-collapsible-body">
            <div className="pf-field-group">
              <label className="pf-field-label">
                ROW Required? <span className="pf-req">*</span>
              </label>
              <div className="pf-radio-group">
                <label className="pf-radio-label">
                  <input
                    type="radio"
                    name="rowRequired"
                    className="pf-radio-input"
                    checked={data.rowRequired === true}
                    onChange={() => onChange({ rowRequired: true })}
                  />
                  <div className="pf-radio-custom">
                    <div className="pf-radio-custom-dot" />
                  </div>
                  <span>Yes</span>
                </label>
                <label className="pf-radio-label">
                  <input
                    type="radio"
                    name="rowRequired"
                    className="pf-radio-input"
                    checked={data.rowRequired === false}
                    onChange={() => onChange({ rowRequired: false })}
                  />
                  <div className="pf-radio-custom">
                    <div className="pf-radio-custom-dot" />
                  </div>
                  <span>No</span>
                </label>
              </div>
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">
                ROW Type <span className="pf-req">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.rowType ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => onOpenPicker('rowType')}
              >
                <span className={data.rowType ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.rowType || 'Select type'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.rowType && <span className="pf-field-error">{errors.rowType}</span>}
            </div>

            <div className="pf-field-group">
              <label htmlFor="rowTotalLengthKm" className="pf-field-label">
                Total Length (km) <span className="pf-req">*</span>
              </label>
              <input
                id="rowTotalLengthKm"
                type="text"
                className={`pf-custom-input ${errors.rowTotalLengthKm ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter length"
                value={data.rowTotalLengthKm || ''}
                onChange={(e) => onChange({ rowTotalLengthKm: e.target.value.replace(/[^\d.]/g, '') })}
              />
              {errors.rowTotalLengthKm && <span className="pf-field-error">{errors.rowTotalLengthKm}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">
                Obtained / Pending <span className="pf-req">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.rowObtainedPending ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => onOpenPicker('rowObtainedPending')}
              >
                <span className={data.rowObtainedPending ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.rowObtainedPending || 'Select status'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.rowObtainedPending && <span className="pf-field-error">{errors.rowObtainedPending}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">
                Approval Status <span className="pf-req">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.rowApprovalStatus ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => onOpenPicker('rowApprovalStatus')}
              >
                <span className={data.rowApprovalStatus ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.rowApprovalStatus || 'Select approval status'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.rowApprovalStatus && <span className="pf-field-error">{errors.rowApprovalStatus}</span>}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
