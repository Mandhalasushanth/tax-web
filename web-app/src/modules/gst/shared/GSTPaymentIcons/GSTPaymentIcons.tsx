import type { FC } from 'react'

export const UpiIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="5" y="2" width="14" height="20" rx="3" />
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
    <path d="M9 7h6M9 10h6" strokeWidth="1.8" />
  </svg>
)

export const CardIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="5" width="20" height="14" rx="3" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <circle cx="7" cy="15" r="1.5" fill="currentColor" />
    <circle cx="11" cy="15" r="1.5" fill="currentColor" />
  </svg>
)

export const BankIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="3" y1="21" x2="21" y2="21" />
    <line x1="4" y1="10" x2="20" y2="10" />
    <polygon points="12 3 2 10 22 10 12 3" />
    <line x1="6" y1="10" x2="6" y2="21" />
    <line x1="10" y1="10" x2="10" y2="21" />
    <line x1="14" y1="10" x2="14" y2="21" />
    <line x1="18" y1="10" x2="18" y2="21" />
  </svg>
)

export const ShieldLockIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
)

export const PhonePeIcon: FC<{ width?: number; height?: number; className?: string }> = ({ width = 28, height = 28, className }) => (
  <svg viewBox="0 0 40 40" width={width} height={height} className={className} aria-hidden="true">
    <circle cx="20" cy="20" r="18" fill="#5f259f" />
    <text x="20" y="27" fill="#ffffff" fontSize="20" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">पे</text>
  </svg>
)

export const GPayIcon: FC<{ width?: number; height?: number; className?: string }> = ({ width = 28, height = 28, className }) => (
  <svg viewBox="0 0 40 40" width={width} height={height} className={className} aria-hidden="true">
    <rect width="40" height="40" rx="20" fill="#ffffff" />
    <path d="M29.5 20.2c0-.7-.06-1.4-.18-2H20v3.8h5.3c-.23 1.25-.94 2.3-2 3v2.5h3.2c1.9-1.75 3-4.3 3-7.3z" fill="#4285F4" />
    <path d="M20 30c2.7 0 4.96-.9 6.6-2.5l-3.2-2.5c-.9.6-2.05 1-3.4 1-2.6 0-4.8-1.75-5.6-4.1H11v2.6C12.7 27.9 16.1 30 20 30z" fill="#34A853" />
    <path d="M14.4 22c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V15.4H11C10.3 16.8 10 18.3 10 20s.3 3.2 1 4.6l3.4-2.6z" fill="#FBBC05" />
    <path d="M20 13.9c1.47 0 2.8.5 3.84 1.5l2.88-2.88C24.96 10.9 22.7 10 20 10c-3.9 0-7.3 2.1-9 5.4l3.4 2.6c.8-2.35 3-4.1 5.6-4.1z" fill="#EA4335" />
  </svg>
)

export const PaytmIcon: FC<{ width?: number; height?: number; className?: string }> = ({ width = 28, height = 28, className }) => (
  <svg viewBox="0 0 40 40" width={width} height={height} className={className} aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#ffffff" />
    <text x="7" y="25" fill="#002e6e" fontSize="13" fontFamily="Arial, sans-serif" fontWeight="900">Pay</text>
    <text x="26" y="25" fill="#00baf2" fontSize="13" fontFamily="Arial, sans-serif" fontWeight="900">tm</text>
  </svg>
)

export const BhimIcon: FC<{ width?: number; height?: number; className?: string }> = ({ width = 28, height = 28, className }) => (
  <svg viewBox="0 0 40 40" width={width} height={height} className={className} aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#ffffff" />
    <path d="M12 28L20 8l8 20h-6l-2-6h-4l-2 6z" fill="#008744" />
    <path d="M20 8l8 20h-4l-4-11-4 11h-4z" fill="#ea580c" />
  </svg>
)
