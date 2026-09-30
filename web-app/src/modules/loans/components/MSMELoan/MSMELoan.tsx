import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'

export const MSMELoan: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        maxWidth: '720px',
        margin: '40px auto',
        padding: '48px 32px',
        background: 'var(--color-surface, #ffffff)',
        borderRadius: '16px',
        border: '1px solid var(--color-border, #e2e8f0)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(59, 130, 246, 0.1)',
          color: '#2563eb',
          marginBottom: '20px',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      </div>

      <div
        style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          background: '#eff6ff',
          color: '#1d4ed8',
          marginBottom: '16px',
        }}
      >
        Under Development
      </div>

      <h1
        style={{
          fontSize: '26px',
          fontWeight: 700,
          color: 'var(--color-text, #1e293b)',
          marginBottom: '12px',
        }}
      >
        MSME Loan Application
      </h1>

      <p
        style={{
          fontSize: '15px',
          color: 'var(--color-text-secondary, #64748b)',
          lineHeight: 1.6,
          maxWidth: '480px',
          margin: '0 auto 28px auto',
        }}
      >
        The MSME Loan application module is currently being configured. Please check back shortly or explore our other available loan products.
      </p>

      <button
        onClick={() => navigate(routePaths.loans)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          borderRadius: '8px',
          background: '#2563eb',
          color: '#ffffff',
          fontWeight: 600,
          fontSize: '14px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
      >
        ← Return to Loan Marketplace
      </button>
    </div>
  )
}

export default MSMELoan
