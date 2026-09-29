import React from 'react'
import { LoanDocumentSection } from '@modules/loans/shared'
import { loanDocumentService } from '../../../../documents/loanDocumentService'
import type { LoanDocumentDefinition } from '../../../../documents/loanDocument.types'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'
import './ProjectDocuments.css'

export interface ProjectDocumentsProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  errors?: Record<string, string>
}

const IDENTITY_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'pan_card',
    title: 'PAN Card (Entity & Promoter)',
    subtitle: 'PAN of the project entity and all key promoters / directors',
    isRequired: true,
    category: 'identity',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    id: 'aadhaar_card',
    title: 'KYC / Aadhaar of Promoters',
    subtitle: 'Aadhaar or passport of all primary promoters and directors',
    isRequired: true,
    category: 'identity',
    iconBg: '#f3e8ff',
    iconColor: '#9333ea',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

const PROJECT_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'project_report',
    title: 'Detailed Project Report (DPR)',
    subtitle: 'Comprehensive DPR including feasibility, cost estimates, and timelines',
    isRequired: true,
    category: 'business',
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: 'project_approval',
    title: 'Government / Regulatory Approvals',
    subtitle: 'NOC, environmental clearance, or sector-specific statutory approvals',
    isRequired: true,
    category: 'business',
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 'land_documents',
    title: 'Land / Site Documents',
    subtitle: 'Title deed, lease deed, or allocation letter for project site',
    isRequired: false,
    category: 'property',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
]

const FINANCIAL_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'audited_financials',
    title: 'Audited Financial Statements',
    subtitle: 'Last 3 years CA-certified audited balance sheets and P&L accounts',
    isRequired: true,
    category: 'income',
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    id: 'bank_statement',
    title: 'Bank Statement (12 months)',
    subtitle: 'Last 12 months primary current account statement of the entity',
    isRequired: true,
    category: 'income',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="16" y2="14" />
      </svg>
    ),
  },
  {
    id: 'itr_acknowledgement',
    title: 'ITR Acknowledgement (3 years)',
    subtitle: 'Last 3 years ITR filings with computation sheets',
    isRequired: false,
    category: 'income',
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
]

export const ProjectDocuments: React.FC<ProjectDocumentsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const uploadedDocs = data.uploadedDocs || {}

  const handleUpload = (id: string, file: File) => {
    try {
      const entry = loanDocumentService.createDocumentEntry(id, file)
      onChange({ uploadedDocs: { ...uploadedDocs, [id]: entry } })
    } catch {
      // Fallback
    }
  }

  const handleRemove = (id: string) => {
    try {
      const next = { ...uploadedDocs }
      delete next[id]
      onChange({ uploadedDocs: next })
    } catch {
      // Fallback
    }
  }

  return (
    <div className="pf-documents-step">
      <LoanDocumentSection
        title="IDENTITY & KYC"
        documents={IDENTITY_DOCS}
        uploadedDocs={uploadedDocs}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />
      <LoanDocumentSection
        title="PROJECT DOCUMENTS"
        documents={PROJECT_DOCS}
        uploadedDocs={uploadedDocs}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />
      <LoanDocumentSection
        title="FINANCIAL RECORDS"
        documents={FINANCIAL_DOCS}
        uploadedDocs={uploadedDocs}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default ProjectDocuments
