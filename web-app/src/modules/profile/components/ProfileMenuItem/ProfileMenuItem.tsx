import React from 'react'
import { Link } from 'react-router-dom'
import './ProfileMenuItem.css'

export interface ProfileMenuItemProps {
  label: string
  to?: string
  onClick?: () => void
  icon: React.ReactNode
  iconBg?: string
  iconBgClass?: string
}

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
)

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  label,
  to,
  onClick,
  icon,
  iconBgClass = ''
}) => {
  const content = (
    <>
      <div className="profile-menu-item__left">
        <div className={`profile-menu-item__icon-wrapper ${iconBgClass}`}>
          {icon}
        </div>
        <span className="profile-menu-item__label">{label}</span>
      </div>
      <div className="profile-menu-item__right">
        <ChevronRight />
      </div>
    </>
  )

  if (to) {
    return (
      <Link to={to} className="profile-menu-item" onClick={onClick}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className="profile-menu-item" onClick={onClick}>
      {content}
    </button>
  )
}
