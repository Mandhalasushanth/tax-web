import React from 'react'


export interface TdsDocumentConfig {
  id: string
  title: string
  subtitle: string
  required: boolean
  accept: string
  maxSizeMb: number
  bgColor: string
  iconColor: string
}

export const TDS_DOCUMENTS: TdsDocumentConfig[] = [
  {
    id: 'pan',
    title: 'PAN',
    subtitle: 'Permanent Account Number Card · up to 5MB',
    required: true,
    accept: '.pdf,.jpg,.jpeg,.png',
    maxSizeMb: 5,
    bgColor: '#e0f2fe',
    iconColor: '#0284c7',
  },
  {
    id: 'form16',
    title: 'Form 16 (Part A & B)',
    subtitle: 'TDS Certificate issued by employer · up to 10MB',
    required: true,
    accept: '.pdf',
    maxSizeMb: 10,
    bgColor: '#ffe4e6',
    iconColor: '#e11d48',
  },
  {
    id: 'form16a',
    title: 'Form 16A',
    subtitle: 'Non-salary TDS Certificate from banks/others · up to 10MB',
    required: false,
    accept: '.pdf',
    maxSizeMb: 10,
    bgColor: '#f3e8ff',
    iconColor: '#9333ea',
  },
  {
    id: 'ais',
    title: 'AIS',
    subtitle: 'Annual Information Statement from IT Portal · up to 10MB',
    required: true,
    accept: '.pdf,.json',
    maxSizeMb: 10,
    bgColor: '#e0f2fe',
    iconColor: '#0284c7',
  },
  {
    id: 'tis',
    title: 'TIS',
    subtitle: 'Taxpayer Information Summary · up to 25MB',
    required: false,
    accept: '.pdf',
    maxSizeMb: 25,
    bgColor: '#dcfce7',
    iconColor: '#16a34a',
  },
  {
    id: 'bankStatements',
    title: 'Bank Statements',
    subtitle: 'Last 6–12 months bank statements · up to 25MB',
    required: true,
    accept: '.pdf',
    maxSizeMb: 25,
    bgColor: '#fef3c7',
    iconColor: '#d97706',
  },
  {
    id: 'previousItr',
    title: 'Previous ITR',
    subtitle: 'Previous assessment year filed acknowledgement · up to 10MB',
    required: false,
    accept: '.pdf',
    maxSizeMb: 10,
    bgColor: '#e0e7ff',
    iconColor: '#6366f1',
  },
  {
    id: 'tdsCertificates',
    title: 'TDS Certificates',
    subtitle: 'Form 16B/16C or other deduction proofs · up to 10MB',
    required: true,
    accept: '.pdf',
    maxSizeMb: 10,
    bgColor: '#dcfce7',
    iconColor: '#16a34a',
  },
  {
    id: 'supportingDocs',
    title: 'Supporting Income Documents',
    subtitle: 'Interest certificates, capital gain sheets · up to 15MB',
    required: false,
    accept: '.pdf,.xlsx,.csv',
    maxSizeMb: 15,
    bgColor: '#ffedd5',
    iconColor: '#ea580c',
  },
]

export const DocIcons: Record<string, React.FC<{ color?: string }>> = {
  pan: ({ color = '#0284c7' }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="6" y1="15" x2="10" y2="15" />
    </svg>
  ),
  form16: ({ color = '#e11d48' }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  form16a: ({ color = '#9333ea' }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  ),
  ais: ({ color = '#0284c7' }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  tis: ({ color = '#16a34a' }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="12" y2="16" />
    </svg>
  ),
  bankStatements: ({ color = '#d97706' }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="21" x2="21" y2="21" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <polyline points="12 3 2 10 22 10" />
      <line x1="6" y1="10" x2="6" y2="21" />
      <line x1="10" y1="10" x2="10" y2="21" />
      <line x1="14" y1="10" x2="14" y2="21" />
      <line x1="18" y1="10" x2="18" y2="21" />
    </svg>
  ),
  previousItr: ({ color = '#6366f1' }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  tdsCertificates: ({ color = '#16a34a' }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  supportingDocs: ({ color = '#ea580c' }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  ),
}
