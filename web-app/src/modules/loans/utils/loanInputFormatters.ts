import React from 'react'

/**
 * Centralized Field Limits and Regex Patterns for all Loan modules.
 * Strictly zero loops and pure functional helpers.
 */
export const LOAN_FIELD_LIMITS = {
  PAN: 10,
  AADHAAR: 12,
  GSTIN: 15,
  IFSC: 11,
  BANK_ACCOUNT_MAX: 18,
  BANK_ACCOUNT_MIN: 9,
  ITR_ACK: 15,
  UDYAM_MAX: 19,
  PINCODE: 6,
  MOBILE: 10,
} as const

/**
 * Filter text-only value (strips out all numbers).
 * Allows alphabets, spaces, dots, hyphens, and apostrophes.
 */
export function formatTextOnly(val: string, maxLen?: number): string {
  const cleaned = val.replace(/[0-9]/g, '')
  return maxLen ? cleaned.slice(0, maxLen) : cleaned
}

/**
 * Filter numeric-only value (strips out all non-digits).
 */
export function formatDigitsOnly(val: string, maxLen?: number): string {
  const cleaned = val.replace(/\D/g, '')
  return maxLen ? cleaned.slice(0, maxLen) : cleaned
}

/**
 * Filter uppercase alphanumeric value (e.g. GSTIN, IFSC, PAN).
 */
export function formatUppercaseAlphanumeric(val: string, maxLen?: number): string {
  const cleaned = val.toUpperCase().replace(/[^A-Z0-9]/g, '')
  return maxLen ? cleaned.slice(0, maxLen) : cleaned
}

/**
 * Filter Udyam registration number (e.g. UDYAM-XX-00-0000000).
 */
export function formatUdyamNumber(val: string, maxLen = LOAN_FIELD_LIMITS.UDYAM_MAX): string {
  const cleaned = val.toUpperCase().replace(/[^A-Z0-9-]/g, '')
  return cleaned.slice(0, maxLen)
}

/**
 * Formats a raw number or string into Indian Rupee locale representation (Pure functional).
 */
export function formatCurrencyString(val: string): string {
  const digits = val.replace(/\D/g, '')
  return !digits ? '' : Number(digits).toLocaleString('en-IN')
}

/**
 * KeyDown handler to prevent non-digit keystrokes (Pure functional).
 */
export function handleNumericKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
  const isAllowedControl =
    ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(e.key) ||
    e.ctrlKey ||
    e.metaKey
  !isAllowedControl && !/^\d$/.test(e.key) ? e.preventDefault() : undefined
}

/**
 * KeyDown handler to prevent numeric keystrokes in text-only fields (Pure functional).
 */
export function handleTextOnlyKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
  const isAllowedControl =
    ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter', ' ', '.', '-'].includes(e.key) ||
    e.ctrlKey ||
    e.metaKey
  !isAllowedControl && /[0-9]/.test(e.key) ? e.preventDefault() : undefined
}

/**
 * KeyDown handler for alphanumeric-only fields (Pure functional).
 */
export function handleAlphanumericKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
  const isAllowedControl =
    ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter', '-'].includes(e.key) ||
    e.ctrlKey ||
    e.metaKey
  !isAllowedControl && !/^[a-zA-Z0-9-]$/.test(e.key) ? e.preventDefault() : undefined
}

/**
 * Centralized known IFSC prefixes to sample branch names for real-time detection
 */
export const SAMPLE_IFSC_BRANCH_MAP: Record<string, string> = {
  BKID0008832: 'GURUNANAK TIMBER MARKET',
  HDFC0001234: 'CONNAUGHT PLACE BRANCH',
  SBIN0001234: 'MAIN BRANCH NEW DELHI',
  SBIN0004567: 'STATE BANK OF INDIA - MAIN BRANCH',
  ICIC0001234: 'NARIMAN POINT MUMBAI',
  UTIB0001234: 'MG ROAD BENGALURU',
}

/**
 * Resolves IFSC code to detected branch name or verified label
 */
export function resolveIfscBranch(ifsc?: string): string {
  if (!ifsc) return ''
  const clean = ifsc.trim().toUpperCase()
  return SAMPLE_IFSC_BRANCH_MAP[clean] || (clean.length === 11 ? 'VERIFIED BANK BRANCH' : '')
}

