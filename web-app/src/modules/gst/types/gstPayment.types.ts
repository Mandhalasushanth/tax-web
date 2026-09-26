export type PaymentMethodId = 'upi' | 'card' | 'netbanking' | ''

export interface PaymentResult {
  transactionId: string
  receiptNumber: string
  method: string
  dateText: string
  applicationRef: string
  amount: number
}

export interface GSTStepPaymentProps {
  amount?: number
  applicationRef?: string
  serviceTitle?: string
  applicantName?: string
  onBack: () => void
  onSuccess: (paymentDetails: PaymentResult) => void
}

export interface CardFormData {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvv: string
}

export interface PaymentErrors {
  method?: string
  upiId?: string
  cardNumber?: string
  cardHolder?: string
  expiryDate?: string
  cvv?: string
  bank?: string
  general?: string
}

export interface UpiAppOption {
  id: string
  name: string
  iconSrc: string
  suffix?: string
}

export const UPI_APPS: UpiAppOption[] = [
  { id: 'phonepe', name: 'PhonePe', iconSrc: '/assets/icons/gst/app-phonepe.svg', suffix: '@ybl' },
  { id: 'gpay', name: 'GPay', iconSrc: '/assets/icons/gst/app-gpay.svg', suffix: '@okaxis' },
  { id: 'paytm', name: 'Paytm', iconSrc: '/assets/icons/gst/app-paytm.svg', suffix: '@paytm' },
  { id: 'bhim', name: 'BHIM', iconSrc: '/assets/icons/gst/app-bhim.svg', suffix: '@upi' },
]

export const POPULAR_BANKS = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra']

export const ALL_BANKS = [
  'HDFC Bank',
  'ICICI Bank',
  'State Bank of India',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'IndusInd Bank',
  'Yes Bank',
  'IDFC FIRST Bank',
  'Federal Bank',
]
