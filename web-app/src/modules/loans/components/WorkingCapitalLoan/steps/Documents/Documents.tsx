import React from 'react'
import { LoanDocumentSection } from '../../../../components/LoanDocumentSection/LoanDocumentSection'
import { loanDocumentService } from '../../../../documents/loanDocumentService'
import type { LoanDocumentDefinition } from '../../../../documents/loanDocument.types'
import type { WorkingCapitalLoanData } from '../../../../types/workingCapitalLoan.types'
import './Documents.css'

export interface DocumentsProps {
  data: WorkingCapitalLoanData
  onChange: (fields: Partial<WorkingCapitalLoanData>) => void
  errors?: Record<string, string>
}

// 1. IDENTITY & ADDRESS
const IDENTITY_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'pan_card',
    title: 'PAN Card',
    subtitle: 'Entity PAN card & Promoter/Director PAN c...',
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
    title: 'Aadhaar Card',
    subtitle: 'Aadhaar of all Primary Directors / Partners ...',
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
    id: 'kyc_directors',
    title: 'KYC of Directors / Partners',
    subtitle: 'PAN, Aadhaar, DIN and Passport photo of al...',
    isRequired: true,
    category: 'identity',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
]

// 2. INCOME & BANKING
const INCOME_BANKING_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'bank_statement',
    title: 'Current Account Bank Statements',
    subtitle: 'Last 12 months continuous bank statement...',
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
]

// 3. BUSINESS & TAX
const BUSINESS_TAX_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'gst_certificate',
    title: 'GST Certificate (REG-06)',
    subtitle: 'GST registration certificate with all annexures',
    isRequired: true,
    category: 'business',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    id: 'gst_returns',
    title: 'GST Returns (12 Months)',
    subtitle: 'Filed GSTR-3B & GSTR-1 returns for last 12 ...',
    isRequired: true,
    category: 'business',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    id: 'business_itr',
    title: 'Business ITR (Last 2-3 Years)',
    subtitle: 'ITR-V and computation for the last 3 assess...',
    isRequired: true,
    category: 'business',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    id: 'audited_balance_sheet',
    title: 'Audited Balance Sheet',
    subtitle: 'CA audited balance sheet for last 2-3 financi...',
    isRequired: true,
    category: 'business',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    id: 'profit_loss_statement',
    title: 'Profit & Loss Statement',
    subtitle: 'CA certified / audited P&L statement with sc...',
    isRequired: true,
    category: 'business',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    id: 'udyam_certificate',
    title: 'Udyam Registration Certificate',
    subtitle: 'MSME registration certificate (for MSME prio...',
    isRequired: false,
    category: 'business',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    id: 'business_reg_proof',
    title: 'Business Registration Proof',
    subtitle: 'COI, MOA/AOA, Partnership Deed, or Trade ...',
    isRequired: true,
    category: 'business',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
]

// 4. COLLATERAL & OTHERS
const COLLATERAL_DOCS: LoanDocumentDefinition[] = [
  {
    id: 'existing_loan_sanction',
    title: 'Existing Loan Sanction Letters',
    subtitle: 'Sanction letters and latest 6-month repayme...',
    isRequired: false,
    category: 'collateral',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
]

export const Documents: React.FC<DocumentsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const uploadedDocs = data.uploadedDocs || {}

  const handleUpload = (id: string, file: File) => {
    try {
      const entry = loanDocumentService.createDocumentEntry(id, file)
      onChange({
        uploadedDocs: {
          ...uploadedDocs,
          [id]: entry,
        },
      })
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
    <div className="working-capital-documents-step">
      {/* 1. IDENTITY & ADDRESS */}
      <LoanDocumentSection
        title="IDENTITY & ADDRESS"
        documents={IDENTITY_DOCS}
        uploadedDocs={uploadedDocs}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />

      {/* 2. INCOME & BANKING */}
      <LoanDocumentSection
        title="INCOME & BANKING"
        documents={INCOME_BANKING_DOCS}
        uploadedDocs={uploadedDocs}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />

      {/* 3. BUSINESS & TAX */}
      <LoanDocumentSection
        title="BUSINESS & TAX"
        documents={BUSINESS_TAX_DOCS}
        uploadedDocs={uploadedDocs}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />

      {/* 4. COLLATERAL & OTHERS */}
      <LoanDocumentSection
        title="COLLATERAL & OTHERS"
        documents={COLLATERAL_DOCS}
        uploadedDocs={uploadedDocs}
        errors={errors}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default Documents
