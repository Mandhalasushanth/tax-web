import React from 'react'

export const commonLoanValidation = {
  isValidAmount: (val: number, min = 100000, max = 500000000): boolean => {
    return !isNaN(val) && val >= min && val <= max
  },

  isValidIfsc: (ifsc: string): boolean => {
    return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc.trim().toUpperCase())
  },

  isValidAccountNumber: (acc: string): boolean => {
    return /^\d{9,18}$/.test(acc.trim())
  },

  isValidPan: (pan: string): boolean => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.trim().toUpperCase())
  },

  isValidAadhaar: (aadhaar: string): boolean => {
    const cleaned = aadhaar.replace(/\s+/g, '')
    return /^\d{12}$/.test(cleaned)
  },

  isValidGst: (gst: string): boolean => {
    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst.trim().toUpperCase())
  },

  validatePhone: (phone: string): { isValid: boolean; message?: string } => {
    const cleaned = phone.replace(/\D/g, '')
    if (!cleaned) return { isValid: false, message: 'Mobile number is required' }
    if (cleaned.length !== 10) return { isValid: false, message: 'Mobile number must be 10 digits' }
    return { isValid: true }
  },

  validatePan: (pan: string): { isValid: boolean; message?: string } => {
    const trimmed = pan.trim().toUpperCase()
    if (!trimmed) return { isValid: false, message: 'PAN number is required' }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(trimmed)) {
      return { isValid: false, message: 'Invalid PAN format (e.g. ABCDE1234F)' }
    }
    return { isValid: true }
  },

  validateAccountNumber: (acc: string): { isValid: boolean; message?: string } => {
    const cleaned = acc.replace(/\D/g, '')
    if (!cleaned) return { isValid: false, message: 'Account number is required' }
    if (cleaned.length < 9 || cleaned.length > 18) {
      return { isValid: false, message: 'Account number must be between 9 and 18 digits' }
    }
    return { isValid: true }
  },

  validateIfsc: (ifsc: string): { isValid: boolean; message?: string } => {
    const trimmed = ifsc.trim().toUpperCase()
    if (!trimmed) return { isValid: false, message: 'IFSC code is required' }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(trimmed)) {
      return { isValid: false, message: 'Invalid 11-digit IFSC code (e.g. SBIN0001234)' }
    }
    return { isValid: true }
  },
}

export const loanInputHelpers = {
  allowOnlyNumbersKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(e.key) ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return
    }
    if (!/^\d$/.test(e.key)) {
      e.preventDefault()
    }
  },

  allowOnlyAlphanumericKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(e.key) ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return
    }
    if (!/^[a-zA-Z0-9]$/.test(e.key)) {
      e.preventDefault()
    }
  },

  formatCurrencyString: (val: string): string => {
    const digits = val.replace(/\D/g, '')
    if (!digits) return ''
    return Number(digits).toLocaleString('en-IN')
  },

  digitsOnly: (val: string, maxLen?: number): string => {
    const digits = val.replace(/\D/g, '')
    return maxLen ? digits.slice(0, maxLen) : digits
  },

  cleanPan: (val: string): string => {
    return val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)
  },

  cleanIfsc: (val: string): string => {
    return val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11)
  },

  cleanGstin: (val: string): string => {
    return val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 15)
  },
}
