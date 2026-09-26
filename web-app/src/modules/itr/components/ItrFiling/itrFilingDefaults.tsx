import { authStorage } from '@core/auth/authStorage'
import type { AuthUser } from '@core/auth/authTypes'
import type {
  TaxpayerProfile,
  PreviousItrInfo,
  SalaryDetails,
  HousePropertyDetails,
  BusinessDetails,
  CapitalGainsDetails,
  OtherSourcesDetails,
  DeductionsData,
} from './itrFiling.constants'

export const getStoredTaxpayerProfile = (overrideUser?: AuthUser | null): TaxpayerProfile => {
  const user = overrideUser || authStorage.getUser()
  if (!user) {
    return {
      panNumber: '—',
      aadhaarNumber: '—',
      fullName: 'Taxpayer',
      dob: '—',
      mobileNumber: '—',
      emailAddress: '—',
      registeredAddress: '—',
    }
  }

  const rawAadhaar = user.aadhaar?.replace(/\s+/g, '') || ''
  const maskedAadhaar =
    rawAadhaar.length >= 4
      ? `•••• •••• ${rawAadhaar.slice(-4)}`
      : rawAadhaar || '—'

  const formattedMobile = user.mobile
    ? user.mobile.startsWith('+91')
      ? user.mobile
      : `+91 ${user.mobile}`
    : '—'

  const addressParts = [
    user.addressLine1,
    user.addressLine2,
    user.city,
    user.state,
    user.pincode,
  ].filter(Boolean)

  const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : '—'

  return {
    panNumber: user.pan ? user.pan.toUpperCase() : '—',
    aadhaarNumber: maskedAadhaar,
    fullName: user.fullName || '—',
    dob: user.dob || '—',
    mobileNumber: formattedMobile,
    emailAddress: user.email || '—',
    registeredAddress: fullAddress,
  }
}

export const DEFAULT_TAXPAYER_PROFILE: TaxpayerProfile = getStoredTaxpayerProfile()

export const DEFAULT_PREVIOUS_ITR: PreviousItrInfo = {
  hasPreviousReturn: false,
  previousAy: '',
  ackNumber: '',
  filingDate: '',
  hasCarryForwardLoss: false,
  lossAmount: '',
}

export const DEFAULT_SALARY_DETAILS: SalaryDetails = {
  employerName: '',
  grossSalary: '',
  exemptAllowances: '',
  tdsDeducted: '',
}

export const DEFAULT_HOUSE_PROPERTY_DETAILS: HousePropertyDetails = {
  propertyType: 'self_occupied',
  homeLoanInterest: '',
  annualRentReceived: '',
  municipalTaxPaid: '',
}

export const DEFAULT_BUSINESS_DETAILS: BusinessDetails = {
  reportingMethod: '44AD',
  grossTurnover: '',
  declaredNetProfit: '',
}

export const DEFAULT_CAPITAL_GAINS_DETAILS: CapitalGainsDetails = {
  assetTypes: [],
  stcg: '',
  ltcg: '',
}

export const DEFAULT_OTHER_SOURCES_DETAILS: OtherSourcesDetails = {
  interestIncome: '',
  dividendIncome: '',
  otherIncome: '',
}

export const DEFAULT_DEDUCTIONS: DeductionsData = {
  epf: '',
  ppf: '',
  lic: '',
  elss: '',
  childrenTuition: '',
  housingLoanPrincipal: '',
  selfInsurance: '',
  parentInsurance: '',
  parentsSeniorCitizen: false,
  homeLoanInterest24b: '',
  otherDeductions: '',
  section80CTotal: '',
  section80C: '',
  section80D: '',
  homeLoanInterest: '',
}

export const PROGRESS_STAGES = [
  {
    id: 1,
    label: 'Application\nReceived',
    done: true,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 2,
    label: 'Documents\nUnder Review',
    active: true,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: 3,
    label: 'CA Preparing\nReturn',
    done: false,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    id: 4,
    label: 'Ready for\nConfirmation',
    done: false,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: 5,
    label: 'Return\nFiled',
    done: false,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    id: 6,
    label: 'Processed &\nRefund',
    done: false,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
]
