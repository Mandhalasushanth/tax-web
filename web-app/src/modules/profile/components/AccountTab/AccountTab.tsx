import React from 'react'
import type { AuthUser } from '@core/auth'
import { maskAadhaar } from '@shared/utils'
import './AccountTab.css'

export interface AccountTabProps {
  user: AuthUser | null
}

export const AccountTab: React.FC<AccountTabProps> = ({ user }) => {
  const formatAddress = () => {
    const parts = [user?.addressLine1, user?.addressLine2, user?.city, user?.state, user?.pincode]
    const validParts = parts.filter(Boolean)
    return validParts.length > 0 ? validParts.join(', ') : '—'
  }

  return (
    <div className="account-tab__container">
      {/* Personal Info */}
      <section className="account-tab__section">
        <div className="account-tab__section-header">
          <h3 className="account-tab__section-title">Personal Information</h3>
        </div>
        <div className="account-tab__grid">
          <div className="account-tab__item">
            <span className="account-tab__label">Full Name</span>
            <span className="account-tab__value">{user?.fullName || '—'}</span>
          </div>
          <div className="account-tab__item">
            <span className="account-tab__label">Email Address</span>
            <span className="account-tab__value">{user?.email || '—'}</span>
          </div>
          <div className="account-tab__item">
            <span className="account-tab__label">Mobile Number</span>
            <span className="account-tab__value">{user?.mobile ? `+91 ${user.mobile}` : '—'}</span>
          </div>
          <div className="account-tab__item">
            <span className="account-tab__label">Date of Birth</span>
            <span className="account-tab__value">{user?.dob || '—'}</span>
          </div>
          <div className="account-tab__item">
            <span className="account-tab__label">Gender</span>
            <span className="account-tab__value">{user?.gender || '—'}</span>
          </div>
          <div className="account-tab__item">
            <span className="account-tab__label">Father / Spouse Name</span>
            <span className="account-tab__value">{user?.fatherSpouseName || '—'}</span>
          </div>
        </div>
      </section>

      {/* Identity & Address */}
      <section className="account-tab__section">
        <div className="account-tab__section-header">
          <h3 className="account-tab__section-title">KYC & Address Details</h3>
        </div>
        <div className="account-tab__grid">
          <div className="account-tab__item">
            <span className="account-tab__label">PAN Card Number</span>
            <span className="account-tab__value account-tab__value--mono">{user?.pan || '—'}</span>
          </div>
          <div className="account-tab__item">
            <span className="account-tab__label">Aadhaar Number</span>
            <span className="account-tab__value account-tab__value--mono">{maskAadhaar(user?.aadhaar)}</span>
          </div>
          <div className="account-tab__item account-tab__item--full">
            <span className="account-tab__label">Registered Address</span>
            <span className="account-tab__value">{formatAddress()}</span>
          </div>
        </div>
      </section>
    </div>
  )
}
