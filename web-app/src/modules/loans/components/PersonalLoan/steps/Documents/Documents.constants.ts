export interface DocDef {
  id: string
  title: string
  subtitle: string
  icon: string
  iconBg: string
  category: 'IDENTITY & ADDRESS' | 'INCOME & BANKING'
}

export const PERSONAL_DOCS_LIST: DocDef[] = [
  {
    id: 'pan_card',
    title: 'PAN Card',
    subtitle: 'Clear photo or PDF copy of applicant PAN',
    icon: '/assets/icons/loans/credit-card.svg',
    iconBg: '#e0f2fe',
    category: 'IDENTITY & ADDRESS',
  },
  {
    id: 'aadhaar_card',
    title: 'Aadhaar Card',
    subtitle: 'Front & back copy with readable QR code',
    icon: '/assets/icons/loans/fingerprint-purple.svg',
    iconBg: '#f3e8ff',
    category: 'IDENTITY & ADDRESS',
  },
  {
    id: 'address_proof',
    title: 'Address Proof',
    subtitle: 'Utility bill / Rent Agreement / Voter ID',
    icon: '/assets/icons/loans/home-blue.svg',
    iconBg: '#e0f2fe',
    category: 'IDENTITY & ADDRESS',
  },
  {
    id: 'passport_photo',
    title: 'Passport Size Photograph',
    subtitle: 'Recent colour photo of the applicant',
    icon: '/assets/icons/loans/camera-pink.svg',
    iconBg: '#fae8ff',
    category: 'IDENTITY & ADDRESS',
  },
  {
    id: 'bank_statements',
    title: 'Bank Statements',
    subtitle: 'Last 6 to 12 months salary/savings statement in PDF',
    icon: '/assets/icons/loans/doc-orange.svg',
    iconBg: '#fef3c7',
    category: 'INCOME & BANKING',
  },
  {
    id: 'salary_slips',
    title: 'Salary Slips',
    subtitle: 'Last 3 to 6 months payslips with company seal/header',
    icon: '/assets/icons/loans/doc-green.svg',
    iconBg: '#dcfce7',
    category: 'INCOME & BANKING',
  },
]
