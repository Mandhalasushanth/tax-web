import React from 'react'

const createIcon = (d: string) => (props: any) => React.createElement('svg', {
  width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props
}, React.createElement('path', { d }))

export const CheckCircle = createIcon("M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3")
export const Clock = createIcon("M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2")
export const FileText = createIcon("M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8")
export const Upload = createIcon("M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12")
export const User = createIcon("M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z")
export const Building = createIcon("M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6")
export const Briefcase = createIcon("M2 7h20v14H2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16")
export const Percent = createIcon("M19 5L5 19 M6.5 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M17.5 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z")
export const TrendingUp = createIcon("M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6")
export const ChevronRight = createIcon("M9 18l6-6-6-6")
export const AlertCircle = createIcon("M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 8v4 M12 16h.01")
export const PlusCircle = createIcon("M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 8v8 M8 12h8")
export const InfoCircle = createIcon("M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16v-4 M12 8h.01")
export const Checkmark = createIcon("M20 6L9 17l-5-5")
export const Shield = createIcon("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z")
export const Zap = createIcon("M13 2L3 14h9l-1 8 10-12h-9l1-8z")
import type { TdsProfile, TdsBankDetails, TdsIncomeTaxData } from '../types/tdsRefund.types'

export const EMPTY_PROFILE: TdsProfile = {
  name: '', fullName: '', pan: '', aadhaar: '', dob: '', mobile: '',
  email: '', address: '', preliminaryRefund: '₹0', assessmentYear: 'AY 2026-27',
  defaultAccountHolder: '', defaultAccountNumber: '', defaultIfsc: '', defaultBankName: '',
}

export const DEFAULT_TDS_TAXPAYER = EMPTY_PROFILE
export type TdsTaxpayerProfile = TdsProfile

export const EMPTY_BANK: TdsBankDetails = {
  accountHolder: '', accountNumber: '', confirmAccountNumber: '', ifsc: '', bankName: '', branch: '', accountType: null,
}

export const EMPTY_TAX: TdsIncomeTaxData = {
  taxRegime: null, salaryIncome: '', otherIncome: '', interestIncome: '', rentalIncome: null, capitalGains: null,
  businessIncome: null, homeLoanInterest: null, taxDeductions: null, annualRent: '', propertyTaxes: '',
  stcg: '', ltcg: '', turnover: '', netProfit: '', homeLoanInterestAmount: '', deduction80C: '', deduction80D: '',
  totalTdsDeducted: '', tcsAmount: '', advanceTax: '', selfAssessmentTax: '',
}

export const WHY_CHOOSE_ITEMS = [
  { id: '1', title: 'Expert Assistance', description: 'Get help from tax experts', icon: CheckCircle },
  { id: '2', title: 'Fast Processing', description: 'Quick refund processing', icon: Clock },
  { id: '3', title: 'Secure Data', description: 'Your data is 100% secure', icon: Shield },
]

export const HOW_IT_WORKS_STEPS = [
  { id: '1', stepNumber: 1, title: 'Submit Details', description: 'Provide basic info', icon: FileText },
  { id: '2', stepNumber: 2, title: 'Upload Docs', description: 'Upload required documents', icon: Upload },
  { id: '3', stepNumber: 3, title: 'Review', description: 'Review your application', icon: CheckCircle },
  { id: '4', stepNumber: 4, title: 'Get Refund', description: 'Receive refund in bank', icon: Zap },
]

export const DOCUMENTS_REQUIRED = [
  { id: 'pan', name: 'PAN Card', desc: 'Required for identity', format: 'PDF/JPEG', icon: FileText },
  { id: 'aadhaar', name: 'Aadhaar Card', desc: 'Required for identity', format: 'PDF/JPEG', icon: User },
  { id: 'bank', name: 'Bank Statement', desc: 'Required for bank verification', format: 'PDF', icon: Building },
]

export const ADDITIONAL_DOCUMENTS = [
  { id: 'form16', name: 'Form 16', desc: 'Required for salary income', format: 'PDF', icon: FileText, isMoreBtn: true },
]

export const TdsIcons = {
  CheckCircle,
  Clock,
  FileText,
  Upload,
  User,
  Building,
  Briefcase,
  Percent,
  TrendingUp,
  ChevronRight,
  AlertCircle,
  PlusCircle,
  InfoCircle,
  Checkmark,
  Shield,
  Zap
}
