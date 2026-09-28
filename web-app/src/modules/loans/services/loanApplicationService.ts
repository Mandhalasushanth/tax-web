import { localStore } from '@core/storage/localStorage'
import { userStorage } from '@core/storage/userStorage'
import type { LoanApplicationBase } from '../types/loanApplication.types'

const STORAGE_PREFIX = 'taxedge_loan_app_'

export const loanApplicationService = {
  getDraft: <T>(loanType: string): T | null => {
    return localStore.get<T>(`${STORAGE_PREFIX}${loanType}`)
  },

  saveDraft: <T>(loanType: string, data: T): void => {
    localStore.set(`${STORAGE_PREFIX}${loanType}`, data)
  },

  clearDraft: (loanType: string): void => {
    localStore.remove(`${STORAGE_PREFIX}${loanType}`)
  },

  submitApplication: async <T>(
    loanType: string,
    formData: T,
  ): Promise<LoanApplicationBase> => {
    const refNumber = 'TXE-LN-' + Math.floor(100000 + Math.random() * 900000)
    const now = new Date()
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    const loanAmountNum = Number(String((formData as { loanAmount?: unknown })?.loanAmount || '').replace(/\D/g, '')) || 0
    const tenureNum = Number((formData as { repaymentTenureYears?: unknown })?.repaymentTenureYears) || 0

    const application: LoanApplicationBase = {
      id: refNumber,
      refNumber,
      referenceNumber: refNumber,
      loanType,
      loanCategory: 'Capital & Financing',
      loanAmount: loanAmountNum,
      tenureYears: tenureNum,
      status: 'submitted',
      statusLabel: 'Documents Received',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      milestones: [
        {
          id: 'm1',
          title: 'Application Submitted',
          timestamp: `${formattedDate}, ${formattedTime}`,
          status: 'completed',
        },
        {
          id: 'm2',
          title: 'In Progress',
          timestamp: 'Just now',
          status: 'current',
        },
        {
          id: 'm3',
          title: 'Agent Review',
          timestamp: 'Pending',
          status: 'pending',
        },
        {
          id: 'm4',
          title: 'Lender Review',
          timestamp: 'Pending',
          status: 'pending',
        },
        {
          id: 'm5',
          title: 'Sanctioned',
          timestamp: 'Pending',
          status: 'pending',
        },
        {
          id: 'm6',
          title: 'Disbursed',
          timestamp: 'Pending',
          status: 'pending',
        },
      ],
    }

    loanApplicationService.clearDraft(loanType)

    userStorage.saveUserApplication({
      id: refNumber,
      code: refNumber,
      title: 'Home Loan Application',
      meta: `${formattedDate} · ₹${loanAmountNum.toLocaleString('en-IN')}`,
      statusLabel: 'Documents Received',
      statusTone: 'info',
      progress: 20,
      icon: '🏠',
      to: `/loans/status/${refNumber}`,
    })

    return application
  },
}
