import React from 'react'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'

export interface Section1And2Props {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  isLocationOpen: boolean
  onToggleLocation: () => void
  isLandDetailsOpen: boolean
  onToggleLandDetails: () => void
  onOpenPicker: (picker: 'step2ProjectZone' | 'landOwnership' | 'landUse' | 'titleStatus' | 'encumbrance' | 'naConversionStatus') => void
  errors?: Record<string, string>
}

export const Section1And2: React.FC<Section1And2Props> = ({
  data,
  onChange,
  isLocationOpen,
  onToggleLocation,
  isLandDetailsOpen,
  onToggleLandDetails,
  onOpenPicker,
  errors = {},
}) => {
  return (
    <>
      {/* 1. Project Location Section */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleLocation}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile">
              <img src="/assets/icons/loans/home-pink.svg" alt="" width="20" height="20" />
            </div>
            <h3 className="pf-collapsible-title">1. Project Location</h3>
          </div>
          <span className={`pf-chevron ${isLocationOpen ? 'pf-chevron--open' : ''}`}>
            <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
          </span>
        </div>

        {isLocationOpen && (
          <div className="pf-collapsible-body">
            <div className="pf-field-group">
              <label htmlFor="step2ProjectAddress" className="pf-field-label">
                Project Address <span className="pf-req">*</span>
              </label>
              <input
                id="step2ProjectAddress"
                type="text"
                className={`pf-custom-input ${errors.step2ProjectAddress ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter project address"
                value={data.step2ProjectAddress || ''}
                onChange={(e) => onChange({ step2ProjectAddress: e.target.value })}
              />
              {errors.step2ProjectAddress && <span className="pf-field-error">{errors.step2ProjectAddress}</span>}
            </div>

            <div className="pf-field-group">
              <label htmlFor="step2State" className="pf-field-label">
                State <span className="pf-req">*</span>
              </label>
              <input
                id="step2State"
                type="text"
                className={`pf-custom-input ${errors.step2State ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter state"
                value={data.step2State || ''}
                onChange={(e) => onChange({ step2State: e.target.value })}
              />
              {errors.step2State && <span className="pf-field-error">{errors.step2State}</span>}
            </div>

            <div className="pf-field-group">
              <label htmlFor="step2District" className="pf-field-label">
                District <span className="pf-req">*</span>
              </label>
              <input
                id="step2District"
                type="text"
                className={`pf-custom-input ${errors.step2District ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter district"
                value={data.step2District || ''}
                onChange={(e) => onChange({ step2District: e.target.value })}
              />
              {errors.step2District && <span className="pf-field-error">{errors.step2District}</span>}
            </div>

            <div className="pf-field-group">
              <label htmlFor="step2PinCode" className="pf-field-label">
                PIN Code <span className="pf-req">*</span>
              </label>
              <input
                id="step2PinCode"
                type="text"
                maxLength={6}
                inputMode="numeric"
                className={`pf-custom-input ${errors.step2PinCode ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter PIN code"
                value={data.step2PinCode || ''}
                onChange={(e) => onChange({ step2PinCode: e.target.value.replace(/\D/g, '') })}
              />
              {errors.step2PinCode && <span className="pf-field-error">{errors.step2PinCode}</span>}
            </div>

            <div className="pf-field-group">
              <label htmlFor="step2NearestTownCity" className="pf-field-label">
                Nearest Major City / Town <span className="pf-req">*</span>
              </label>
              <input
                id="step2NearestTownCity"
                type="text"
                className={`pf-custom-input ${errors.step2NearestTownCity ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter city"
                value={data.step2NearestTownCity || ''}
                onChange={(e) => onChange({ step2NearestTownCity: e.target.value })}
              />
              {errors.step2NearestTownCity && <span className="pf-field-error">{errors.step2NearestTownCity}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">
                Project Zone <span className="pf-req">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.step2ProjectZone ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => onOpenPicker('step2ProjectZone')}
              >
                <span className={data.step2ProjectZone ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.step2ProjectZone || 'Select zone'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.step2ProjectZone && <span className="pf-field-error">{errors.step2ProjectZone}</span>}
            </div>

            <div className="pf-field-group">
              <label htmlFor="step2DistanceNearestTownKm" className="pf-field-label">
                Distance to Nearest Major Town / City (km)
              </label>
              <input
                id="step2DistanceNearestTownKm"
                type="text"
                className="pf-custom-input"
                placeholder="Enter distance"
                value={data.step2DistanceNearestTownKm || ''}
                onChange={(e) => onChange({ step2DistanceNearestTownKm: e.target.value.replace(/[^\d.]/g, '') })}
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Land Details Section */}
      <div className="pf-collapsible-card">
        <div className="pf-collapsible-header" onClick={onToggleLandDetails}>
          <div className="pf-collapsible-header__left">
            <div className="pf-section-icon-tile">
              <img src="/assets/icons/loans/doc-orange.svg" alt="" width="20" height="20" />
            </div>
            <h3 className="pf-collapsible-title">2. Land Details</h3>
          </div>
          <span className={`pf-chevron ${isLandDetailsOpen ? 'pf-chevron--open' : ''}`}>
            <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
          </span>
        </div>

        {isLandDetailsOpen && (
          <div className="pf-collapsible-body">
            <div className="pf-field-group">
              <label htmlFor="totalLandRequiredAcres" className="pf-field-label">
                Total Land Required (Acres) <span className="pf-req">*</span>
              </label>
              <input
                id="totalLandRequiredAcres"
                type="text"
                className={`pf-custom-input ${errors.totalLandRequiredAcres ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter area"
                value={data.totalLandRequiredAcres || ''}
                onChange={(e) => onChange({ totalLandRequiredAcres: e.target.value.replace(/[^\d.]/g, '') })}
              />
              {errors.totalLandRequiredAcres && (
                <span className="pf-field-error">{errors.totalLandRequiredAcres}</span>
              )}
            </div>

            <div className="pf-field-group">
              <label htmlFor="landAcquiredAcres" className="pf-field-label">
                Land Acquired / In Possession (Acres) <span className="pf-req">*</span>
              </label>
              <input
                id="landAcquiredAcres"
                type="text"
                className={`pf-custom-input ${errors.landAcquiredAcres ? 'pf-custom-input--error' : ''}`}
                placeholder="Enter area"
                value={data.landAcquiredAcres || ''}
                onChange={(e) => onChange({ landAcquiredAcres: e.target.value.replace(/[^\d.]/g, '') })}
              />
              {errors.landAcquiredAcres && <span className="pf-field-error">{errors.landAcquiredAcres}</span>}
            </div>

            <div className="pf-field-group">
              <label htmlFor="landPendingAcres" className="pf-field-label">
                Land Pending (Acres)
              </label>
              <input
                id="landPendingAcres"
                type="text"
                className="pf-custom-input"
                placeholder="Enter area"
                value={data.landPendingAcres || ''}
                onChange={(e) => onChange({ landPendingAcres: e.target.value.replace(/[^\d.]/g, '') })}
              />
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">
                Land Ownership <span className="pf-req">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.landOwnership ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => onOpenPicker('landOwnership')}
              >
                <span className={data.landOwnership ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.landOwnership || 'Select ownership'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.landOwnership && <span className="pf-field-error">{errors.landOwnership}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">
                Land Use <span className="pf-req">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.landUse ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => onOpenPicker('landUse')}
              >
                <span className={data.landUse ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.landUse || 'Select land use'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.landUse && <span className="pf-field-error">{errors.landUse}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">
                Title Status <span className="pf-req">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.titleStatus ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => onOpenPicker('titleStatus')}
              >
                <span className={data.titleStatus ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.titleStatus || 'Select title status'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.titleStatus && <span className="pf-field-error">{errors.titleStatus}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">
                Encumbrance <span className="pf-req">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.encumbrance ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => onOpenPicker('encumbrance')}
              >
                <span className={data.encumbrance ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.encumbrance || 'Select encumbrance'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.encumbrance && <span className="pf-field-error">{errors.encumbrance}</span>}
            </div>

            <div className="pf-field-group">
              <label className="pf-field-label">
                NA Conversion Status <span className="pf-req">*</span>
              </label>
              <button
                type="button"
                className={`pf-custom-select-btn ${errors.naConversionStatus ? 'pf-custom-select-btn--error' : ''}`}
                onClick={() => onOpenPicker('naConversionStatus')}
              >
                <span className={data.naConversionStatus ? 'pf-select-value' : 'pf-select-placeholder'}>
                  {data.naConversionStatus || 'Select status'}
                </span>
                <span className="pf-select-chevron">
                  <img src="/assets/icons/loans/chevron-down.svg" alt="" width="18" height="18" />
                </span>
              </button>
              {errors.naConversionStatus && <span className="pf-field-error">{errors.naConversionStatus}</span>}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
