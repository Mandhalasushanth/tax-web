import React from 'react'
import { TdsIcons, type TdsTaxpayerProfile } from '../../utils/tdsRefund.constants'
import './TdsRefundPersonalInfoSection.css'

export interface TdsRefundPersonalInfoSectionProps {
  profile: TdsTaxpayerProfile
  onChange: (updated: Partial<TdsTaxpayerProfile>) => void
  isValid?: boolean
}

export const TdsRefundPersonalInfoSection: React.FC<TdsRefundPersonalInfoSectionProps> = ({
  profile,
  onChange,
  isValid,
}) => {
  return (
    <div className="tds-card" data-testid="tds-card-personal">
      <div className="tds-card-header">
        <div className="tds-card-title-wrap">
          <div className="tds-card-step-circle">1</div>
          <div>
            <h2 className="tds-card-title">Personal Information</h2>
            <span className="tds-card-subtitle">Taxpayer identity and contact details</span>
          </div>
        </div>
        {isValid && (
          <span className="tds-pill-verified">
            <TdsIcons.Checkmark /> Ready
          </span>
        )}
      </div>

      <div className="tds-personal-grid">
        <div className="tds-form-group">
          <label htmlFor="tds-profile-fullname" className="tds-label">
            Full Name <span className="tds-required">*</span>
          </label>
          <input
            id="tds-profile-fullname"
            type="text"
            className="tds-input"
            value={profile.fullName}
            onChange={(e) => onChange({ fullName: e.target.value, name: e.target.value })}
            placeholder="Full name as per PAN"
            required
          />
        </div>

        <div className="tds-form-group">
          <label htmlFor="tds-profile-pan" className="tds-label">
            PAN Number <span className="tds-required">*</span>
          </label>
          <input
            id="tds-profile-pan"
            type="text"
            className="tds-input tds-input--upper"
            value={profile.pan}
            onChange={(e) => onChange({ pan: e.target.value.toUpperCase() })}
            placeholder="e.g. ABCDE1234F"
            maxLength={10}
            required
          />
        </div>

        <div className="tds-form-group">
          <label htmlFor="tds-profile-aadhaar" className="tds-label">
            Aadhaar Number
          </label>
          <input
            id="tds-profile-aadhaar"
            type="text"
            className="tds-input"
            value={profile.aadhaar}
            onChange={(e) => onChange({ aadhaar: e.target.value.replace(/\D/g, '').slice(0, 12) })}
            placeholder="12-digit Aadhaar number"
            maxLength={12}
          />
        </div>

        <div className="tds-form-group">
          <label htmlFor="tds-profile-dob" className="tds-label">
            Date of Birth
          </label>
          <input
            id="tds-profile-dob"
            type="date"
            className="tds-input"
            value={profile.dob}
            onChange={(e) => onChange({ dob: e.target.value })}
          />
        </div>

        <div className="tds-form-group">
          <label htmlFor="tds-profile-mobile" className="tds-label">
            Mobile Number
          </label>
          <input
            id="tds-profile-mobile"
            type="tel"
            className="tds-input"
            value={profile.mobile}
            onChange={(e) => onChange({ mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
            placeholder="10-digit mobile number"
            maxLength={10}
          />
        </div>

        <div className="tds-form-group">
          <label htmlFor="tds-profile-email" className="tds-label">
            Email Address
          </label>
          <input
            id="tds-profile-email"
            type="email"
            className="tds-input"
            value={profile.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="name@example.com"
          />
        </div>

        <div className="tds-form-group tds-form-group--full">
          <label htmlFor="tds-profile-address" className="tds-label">
            Address
          </label>
          <input
            id="tds-profile-address"
            type="text"
            className="tds-input"
            value={profile.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="Flat / Building, Locality, City, State, PIN"
          />
        </div>
      </div>
    </div>
  )
}
