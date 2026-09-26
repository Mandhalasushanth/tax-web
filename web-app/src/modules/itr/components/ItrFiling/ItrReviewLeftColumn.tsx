import React from 'react'
import type {
  UploadedDocInfo,
  AssessmentYearOption,
  ResidentialStatusOption,
  FilingTypeOption,
  FilingBankAccount,
} from './itrFiling.constants'

export interface ItrReviewLeftColumnProps {
  profile: {
    fullName: string
    panNumber: string
  }
  selectedBank?: FilingBankAccount
  assessmentYear: AssessmentYearOption
  applicableForm: string
  residentialStatus: ResidentialStatusOption
  filingType: FilingTypeOption
  uploadedDocs: Record<string, UploadedDocInfo>
  onEdit: () => void
}

export const ItrReviewLeftColumn: React.FC<ItrReviewLeftColumnProps> = ({
  profile,
  selectedBank,
  assessmentYear,
  applicableForm,
  residentialStatus,
  filingType,
  uploadedDocs,
  onEdit,
}) => {
  const docCount = Object.keys(uploadedDocs).length

  return (
    <div className="itr-rv2-left-col">
      {/* Summary & Declared Income */}
      <div className="itr-step-card">
        <h3 className="itr-rv2-section-title">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Summary &amp; Declared Income
        </h3>

        {/* Taxpayer Identity Row */}
        <div className="itr-rv2-identity-row">
          <div className="itr-rv2-identity-info">
            <div className="itr-rv2-identity-label">Taxpayer Identity</div>
            <div className="itr-rv2-identity-val">PAN: {profile.panNumber} &middot; Name: {profile.fullName}</div>
          </div>
          <span className="itr-rv2-badge itr-rv2-badge--green">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Profile Verified
          </span>
        </div>

        {/* Refund Bank Row */}
        <div className="itr-rv2-identity-row">
          <div className="itr-rv2-identity-info">
            <div className="itr-rv2-identity-label">Refund Bank Account</div>
            <div className="itr-rv2-identity-val">
              {selectedBank
                ? `${selectedBank.bankName} (·· ${selectedBank.accountNumber.replace(/\s/g, '').slice(-4)})`
                : 'Primary Bank Account'}
            </div>
          </div>
          <span className="itr-rv2-badge itr-rv2-badge--blue">Selected</span>
        </div>
      </div>

      {/* Filing & Taxpayer Details */}
      <div className="itr-step-card">
        <div className="itr-rv2-section-header-row">
          <h3 className="itr-rv2-section-title">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Filing &amp; Taxpayer Details
          </h3>
          <button type="button" className="itr-rv2-edit-btn" onClick={onEdit}>
            Edit
          </button>
        </div>
        <div className="itr-rv2-details-rows">
          {[
            { label: 'Assessment Year', value: assessmentYear },
            { label: 'Applicable Return Form', value: applicableForm },
            { label: 'Full Name', value: profile.fullName },
            { label: 'PAN Number', value: profile.panNumber },
            {
              label: 'Residential Status',
              value: residentialStatus.charAt(0).toUpperCase() + residentialStatus.slice(1),
            },
            {
              label: 'Filing Type',
              value: filingType.charAt(0).toUpperCase() + filingType.slice(1) + ' Return',
            },
          ].map((row) => (
            <div key={row.label} className="itr-rv2-detail-row">
              <span className="itr-rv2-detail-row__label">{row.label}</span>
              <span className="itr-rv2-detail-row__val">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Uploaded Documents */}
      <div className="itr-step-card">
        <div className="itr-rv2-section-header-row">
          <h3 className="itr-rv2-section-title">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Uploaded Documents ({docCount})
          </h3>
          <button type="button" className="itr-rv2-edit-btn" onClick={onEdit}>
            Edit
          </button>
        </div>
        {docCount === 0 ? (
          <p className="itr-rv2-no-docs">No documents uploaded. Your CA will request them separately.</p>
        ) : (
          <div className="itr-rv2-doc-list">
            {Object.entries(uploadedDocs).map(([id, doc]) => (
              <div key={id} className="itr-rv2-doc-row">
                <span className="itr-rv2-doc-check">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div className="itr-rv2-doc-info">
                  <span className="itr-rv2-doc-name">{doc.fileName}</span>
                  <span className="itr-rv2-doc-meta">
                    {doc.fileSize} &middot; {doc.uploadedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
