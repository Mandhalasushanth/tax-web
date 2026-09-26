import { useState } from 'react'
import type {
  PaymentMethodId,
  CardFormData,
  PaymentErrors,
  PaymentResult,
} from '../types/gstPayment.types'
import { UPI_APPS } from '../types/gstPayment.types'

export const useGstPayment = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('')
  const [upiId, setUpiId] = useState<string>('')
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>('')
  const [selectedBank, setSelectedBank] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const [cardData, setCardData] = useState<CardFormData>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  })

  const [errors, setErrors] = useState<PaymentErrors>({})

  const handleSelectMethod = (method: PaymentMethodId) => {
    setSelectedMethod(method)
    setErrors({})
  }

  const handleUpiIdChange = (val: string) => {
    setUpiId(val)
    if (errors.upiId) {
      setErrors((prev) => ({ ...prev, upiId: undefined }))
    }
  }

  const handleSelectUpiApp = (appId: string) => {
    setSelectedUpiApp(appId)
    if (errors.upiId) {
      setErrors((prev) => ({ ...prev, upiId: undefined }))
    }
    const app = UPI_APPS.find((a) => a.id === appId)
    if (app && app.suffix && !upiId.includes('@')) {
      setUpiId((prev) => (prev ? `${prev.replace(/@.*$/, '')}${app.suffix}` : ''))
    }
  }

  const handleCardChange = (field: keyof CardFormData, val: string) => {
    setCardData((prev) => ({ ...prev, [field]: val }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSelectBank = (bank: string) => {
    setSelectedBank(bank)
    if (errors.bank) {
      setErrors((prev) => ({ ...prev, bank: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: PaymentErrors = {}

    if (!selectedMethod) {
      newErrors.method = 'Please choose a payment method to complete your GST registration.'
      setErrors(newErrors)
      return false
    }

    if (selectedMethod === 'upi') {
      const trimmed = upiId.trim()
      if (!trimmed && !selectedUpiApp) {
        newErrors.upiId = 'Please enter your UPI ID (e.g., username@okaxis) or select a UPI app.'
      } else if (trimmed && !/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(trimmed)) {
        newErrors.upiId = 'Please enter a valid UPI ID (e.g., username@okhdfcbank).'
      }
    } else if (selectedMethod === 'card') {
      const cleanNum = cardData.cardNumber.replace(/\s/g, '')
      if (cleanNum.length < 15) {
        newErrors.cardNumber = 'Please enter a valid 15 or 16-digit card number.'
      }
      if (!cardData.cardHolder.trim()) {
        newErrors.cardHolder = 'Cardholder name is required.'
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY).'
      }
      if (cardData.cvv.length < 3) {
        newErrors.cvv = 'Please enter a valid 3 or 4-digit CVV.'
      }
    } else if (selectedMethod === 'netbanking') {
      if (!selectedBank) {
        newErrors.bank = 'Please choose your bank to proceed with Net Banking.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePay = (
    onSuccess: (result: PaymentResult) => void,
    applicationRef: string,
    amount = 1499
  ) => {
    if (!validate()) return

    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      let methodText = 'UPI'
      if (selectedMethod === 'upi') {
        methodText = `UPI · ${upiId || selectedUpiApp}`
      } else if (selectedMethod === 'card') {
        methodText = `Card · Ending in ${cardData.cardNumber.slice(-4)}`
      } else if (selectedMethod === 'netbanking') {
        methodText = `Net Banking · ${selectedBank}`
      }

      onSuccess({
        transactionId: `TXN${Date.now()}`,
        receiptNumber: `TE/${new Date().getFullYear()}/R-${Math.floor(Math.random() * 9000 + 1000)}`,
        method: methodText,
        dateText: new Intl.DateTimeFormat('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date()),
        applicationRef,
        amount,
      })
    }, 750)
  }

  return {
    selectedMethod,
    upiId,
    selectedUpiApp,
    cardData,
    selectedBank,
    errors,
    isProcessing,
    handleSelectMethod,
    handleUpiIdChange,
    handleSelectUpiApp,
    handleCardChange,
    handleSelectBank,
    handlePay,
  }
}
