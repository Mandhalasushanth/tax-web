import React, { useState } from 'react'
import {
  WHY_CHOOSE_ITEMS,
  HOW_IT_WORKS_STEPS,
  DOCUMENTS_REQUIRED,
  ADDITIONAL_DOCUMENTS,
  TdsIcons,
} from '../../utils/tdsRefund.constants'
import './TdsRefundOverview.css'

export interface TdsRefundOverviewProps {
  onStart: () => void
}

export const TdsRefundOverview: React.FC<TdsRefundOverviewProps> = ({ onStart }) => {
  const [showMoreModal, setShowMoreModal] = useState(false)

  const renderWhyIcon = (iconType: any) => {
    switch (iconType) {
      case 'wallet': return <TdsIcons.Briefcase />
      case 'expert': return <TdsIcons.User />
      case 'clock': return <TdsIcons.Clock />
      case 'trending': return <TdsIcons.TrendingUp />
      default: 
        if (typeof iconType === 'function' || typeof iconType === 'object') {
           const IconCmp = iconType;
           return <IconCmp />
        }
        return <TdsIcons.Briefcase />
    }
  }

  const renderStepIcon = (iconType: any) => {
    switch (iconType) {
      case 'edit': return <TdsIcons.FileText />
      case 'upload': return <TdsIcons.Upload />
      case 'verification': return <TdsIcons.User />
      case 'filing': return <TdsIcons.FileText />
      case 'credit': return <TdsIcons.Building />
      default: 
        if (typeof iconType === 'function' || typeof iconType === 'object') {
           const IconCmp = iconType;
           return <IconCmp />
        }
        return <TdsIcons.FileText />
    }
  }

  const renderDocIcon = (iconType: any) => {
    switch (iconType) {
      case 'pan': return <TdsIcons.FileText />
      case 'aadhaar': return <TdsIcons.User />
      case 'form16': return <TdsIcons.FileText />
      case 'ais': return <TdsIcons.TrendingUp />
      case 'tis': return <TdsIcons.FileText />
      case 'bank': return <TdsIcons.Building />
      case 'salary': return <TdsIcons.FileText />
      case 'more': return <TdsIcons.PlusCircle />
      default:
        // If it's a component from the constants, we can render it directly
        if (typeof iconType === 'function' || typeof iconType === 'object') {
           const IconCmp = iconType;
           return <IconCmp />
        }
        return <TdsIcons.FileText />
    }
  }

  return (
    <div className="tds-web-page">
      {/* Full-Width Hero Feature Card */}
      <section className="tds-hero-banner">
        <div className="tds-hero-left">
          <span className="tds-hero-tag">Income Tax Services</span>
          <h1 className="tds-hero-title">TDS Refund</h1>
          <p className="tds-hero-desc">
            Claim excess TDS deducted from your salary, investments, or payments with certified CA
            verification and live status tracking.
          </p>
        </div>

        <div className="tds-hero-illustration" aria-hidden="true">
          <svg width="220" height="150" viewBox="0 0 220 150" fill="none">
            <path d="M40 30L43 37L50 40L43 43L40 50L37 43L30 40L37 37Z" fill="#FBBF24" opacity="0.8" />
            <path d="M190 40L192 45L197 47L192 49L190 54L188 49L183 47L188 45Z" fill="#FBBF24" opacity="0.9" />
            <path d="M195 95L196 99L200 100L196 101L195 105L194 101L190 100L194 99Z" fill="#FBBF24" opacity="0.6" />

            <rect x="75" y="15" width="85" height="110" rx="10" fill="#FFFFFF" />
            <rect x="88" y="32" width="45" height="6" rx="3" fill="#E2E8F0" />
            <rect x="88" y="46" width="60" height="4" rx="2" fill="#CBD5E1" />
            <rect x="88" y="56" width="52" height="4" rx="2" fill="#CBD5E1" />
            <circle cx="145" cy="35" r="7" fill="#22C55E" />
            <polyline points="142,35 144,37 148,33" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

            <circle cx="70" cy="85" r="19" fill="#3B82F6" />
            <text x="70" y="92" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle">₹</text>

            <rect x="95" y="70" width="85" height="54" rx="8" fill="url(#cardGrad)" filter="drop-shadow(0 6px 12px rgba(234, 88, 12, 0.4))" />
            <rect x="105" y="85" width="14" height="10" rx="2" fill="#FDE68A" opacity="0.9" />
            <circle cx="165" cy="97" r="4.5" fill="#FFFFFF" opacity="0.75" />

            <ellipse cx="85" cy="118" rx="12" ry="4" fill="#D97706" />
            <rect x="73" y="112" width="24" height="6" fill="#F59E0B" />
            <ellipse cx="85" cy="112" rx="12" ry="4" fill="#FCD34D" />
            <rect x="73" y="106" width="24" height="6" fill="#F59E0B" />
            <ellipse cx="85" cy="106" rx="12" ry="4" fill="#FDE68A" />

            <defs>
              <linearGradient id="cardGrad" x1="95" y1="70" x2="180" y2="124" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FB923C" />
                <stop offset="1" stopColor="#EA580C" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Content Layout: Left side & Right side */}
      <div className="tds-web-layout">
        <main className="tds-web-main">
          {/* Section: Why choose TaxEdge? */}
          <section className="tds-section">
            <h2 className="tds-section-title">Why choose TaxEdge?</h2>
            <div className="tds-why-grid">
              {WHY_CHOOSE_ITEMS.map((item) => (
                <div key={item.id} className="tds-why-card">
                  <div className="tds-why-icon-box">{renderWhyIcon(item.icon)}</div>
                  <div className="tds-why-text">
                    <h3 className="tds-why-card-title">{item.title}</h3>
                    <p className="tds-why-card-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: How it works */}
          <section className="tds-section">
            <div className="tds-section-header-row">
              <h2 className="tds-section-title">How it works</h2>
              <span className="tds-section-subtitle">5-stage end-to-end filing workflow</span>
            </div>
            <div className="tds-how-container">
              <div className="tds-how-track">
                <div className="tds-how-connector" aria-hidden="true" />
                {HOW_IT_WORKS_STEPS.map((step) => (
                  <div key={step.stepNumber} className="tds-how-step">
                    <div className="tds-how-circle-wrap">
                      <div className="tds-how-badge">{step.stepNumber}</div>
                      <div className="tds-how-circle">{renderStepIcon(step.icon)}</div>
                    </div>
                    <span className="tds-how-step-label">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Documents Required */}
          <section className="tds-section">
            <div className="tds-section-header-row">
              <h2 className="tds-section-title">Documents Required</h2>
              <span className="tds-section-subtitle">Keep digital copies ready for verification</span>
            </div>
            <div className="tds-docs-grid">
              {DOCUMENTS_REQUIRED.map((doc: any) => {
                if (doc.isMoreBtn) {
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      className="tds-doc-card tds-doc-card--more"
                      onClick={() => setShowMoreModal(true)}
                      aria-label="View more required documents"
                    >
                      <span className="tds-doc-more-text">
                        <TdsIcons.PlusCircle />
                        <span>More</span>
                      </span>
                    </button>
                  )
                }
                return (
                  <div key={doc.id} className="tds-doc-card">
                    <div className="tds-doc-icon">{renderDocIcon(doc.icon)}</div>
                    <span className="tds-doc-title">{doc.name || doc.title}</span>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Info Callout Box */}
          <div className="tds-info-box">
            <div className="tds-info-icon-wrap" aria-hidden="true">
              <TdsIcons.InfoCircle />
            </div>
            <p className="tds-info-text">
              Only the documents relevant to your refund claim will be requested in the next steps.
            </p>
          </div>
        </main>

        {/* Right Column: Sticky Web Action & Summary Card */}
        <aside className="tds-web-sidebar">
          <div className="tds-action-card">
            <div className="tds-action-card-header">
              <span className="tds-action-badge">AY 2026-27</span>
              <h3 className="tds-action-title">Start TDS Refund</h3>
              <p className="tds-action-desc">
                Fast-track your excess TDS claim with certified Chartered Accountant review.
              </p>
            </div>

            <div className="tds-action-benefits">
              <div className="tds-action-benefit-row">
                <TdsIcons.Checkmark />
                <span>Form 26AS & AIS tax reconciliation</span>
              </div>
              <div className="tds-action-benefit-row">
                <TdsIcons.Checkmark />
                <span>Maximized eligible exemptions & credits</span>
              </div>
              <div className="tds-action-benefit-row">
                <TdsIcons.Checkmark />
                <span>Direct credit to verified bank account</span>
              </div>
              <div className="tds-action-benefit-row">
                <TdsIcons.Checkmark />
                <span>End-to-end refund status tracking</span>
              </div>
            </div>

            <div className="tds-action-btn-wrap">
              <button type="button" className="tds-web-start-btn" onClick={onStart}>
                <span>Start TDS Refund</span>
                <span className="tds-start-arrow" aria-hidden="true">→</span>
              </button>
            </div>

            <div className="tds-action-trust-box">
              <div className="tds-trust-item">
                <TdsIcons.Shield />
                <span>256-bit Bank Grade Security</span>
              </div>
              <div className="tds-trust-item">
                <TdsIcons.Zap />
                <span>Average 24–48 hr CA Review</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Additional Documents Modal */}
      {showMoreModal && (
        <div className="tds-modal-overlay" onClick={() => setShowMoreModal(false)}>
          <div className="tds-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="tds-modal-header">
              <h3 className="tds-modal-title">Additional Documents</h3>
              <button
                type="button"
                className="tds-modal-close-btn"
                onClick={() => setShowMoreModal(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="tds-modal-list">
              {ADDITIONAL_DOCUMENTS.map((doc) => (
                <div key={doc.name} className="tds-modal-item">
                  <div className="tds-modal-item-name">{doc.name}</div>
                  <div className="tds-modal-item-desc">{doc.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
