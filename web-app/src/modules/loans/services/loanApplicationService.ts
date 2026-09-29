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

  getApplication: (refNumber: string): LoanApplicationBase | null => {
    try {
      const getLatest = () => {
        const latest = localStorage.getItem('taxedge_loan_app_latest')
        return latest ? JSON.parse(latest) : null
      }

      const getByRef = () => {
        const data = localStorage.getItem(`${STORAGE_PREFIX}record_${refNumber}`)
        const latest = getLatest()
        const parsedData = data ? JSON.parse(data) : null
        const isLatestMatch = latest && (latest.refNumber === refNumber || latest.id === refNumber)
        return parsedData || (isLatestMatch ? latest : null)
      }

      return !refNumber ? getLatest() : getByRef()
    } catch (e) {
      console.warn('Failed to retrieve loan application', e)
      return null
    }
  },

  saveApplication: (app: LoanApplicationBase): void => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}record_${app.refNumber}`, JSON.stringify(app))
      localStorage.setItem('taxedge_loan_app_latest', JSON.stringify(app))
    } catch (e) {
      console.warn('Failed to persist loan application', e)
    }
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

    const rawForm = (formData || {}) as Record<string, unknown>
    const innerDetails = (rawForm.details as Record<string, unknown>) || rawForm

    const loanAmountNum =
      Number(
        String(
          rawForm.requestedAmount ||
          rawForm.loanAmount ||
          innerDetails.loanAmount ||
          innerDetails.requiredLoanAmount ||
          innerDetails.requiredCreditLimit ||
          ''
        ).replace(/\D/g, '')
      ) || 1500000

    const tenureYearsNum =
      Number(innerDetails.repaymentTenureYears) ||
      Number(rawForm.repaymentTenureYears) ||
      (rawForm.tenureMonths ? Math.round(Number(rawForm.tenureMonths) / 12) : 0) ||
      (innerDetails.repaymentTenure ? (String(innerDetails.repaymentTenure).match(/\d+/) ? Number(String(innerDetails.repaymentTenure).match(/\d+/)![0]) : 0) : 0)

    const tenureMonthsNum =
      Number(rawForm.tenureMonths) ||
      (tenureYearsNum > 0 ? tenureYearsNum * 12 : 0) ||
      Number(innerDetails.preferredTenureMonths) ||
      (String(innerDetails.repaymentTenure || '').match(/\d+/) ? Number(String(innerDetails.repaymentTenure).match(/\d+/)![0]) : 0)

    const formattedTenure =
      tenureYearsNum > 0
        ? `${tenureYearsNum} Years (${tenureMonthsNum > 0 ? tenureMonthsNum : tenureYearsNum * 12} Mos)`
        : tenureMonthsNum > 0
        ? `${tenureMonthsNum} Months`
        : '20 Years'

    const equipmentVal = String(
      innerDetails.customPropertyIntent ||
      innerDetails.propertyIntent ||
      innerDetails.vehicleModel ||
      innerDetails.vehicleCategory ||
      innerDetails.machineryType ||
      innerDetails.machineryName ||
      innerDetails.creditPurpose ||
      innerDetails.preferredFacilityType ||
      innerDetails.projectSector ||
      innerDetails.projectName ||
      innerDetails.msmePurpose ||
      innerDetails.purposeOfLoan ||
      rawForm.title ||
      'General Purpose'
    )

    const bankName = String(
      innerDetails.bankName ||
      innerDetails.operatingBank ||
      innerDetails.primaryOperatingBankName ||
      innerDetails.currentAccountBankName ||
      rawForm.disbursementBank ||
      'Primary Bank Account'
    )
    const accNumber = String(innerDetails.accountNumber || '')
    const disbursementBankVal =
      accNumber && accNumber.length >= 4
        ? `${bankName} (••• ${accNumber.slice(-4)})`
        : bankName

    const application: LoanApplicationBase = {
      id: refNumber,
      refNumber,
      referenceNumber: refNumber,
      loanType,
      loanCategory: (rawForm.category as string) || 'Capital & Financing',
      loanAmount: loanAmountNum,
      tenureYears: tenureYearsNum,
      tenureMonths: formattedTenure,
      equipment: equipmentVal,
      disbursementBank: disbursementBankVal,
      loanAgent: 'TaxEdge Loan Agent',
      status: 'submitted',
      statusLabel: 'Documents Received',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      applicationData: { ...innerDetails, ...rawForm },
      milestones: [
        {
          id: 'm1',
          title: 'Application Submitted',
          timestamp: `${formattedDate}  ${formattedTime}`,
          status: 'completed',
        },
        {
          id: 'm2',
          title: 'Agent Review',
          timestamp: 'Documents Received',
          status: 'current',
        },
        {
          id: 'm3',
          title: 'Lender Review',
          timestamp: 'Pending',
          status: 'pending',
        },
        {
          id: 'm4',
          title: 'Sanctioned',
          timestamp: 'Pending',
          status: 'pending',
        },
        {
          id: 'm5',
          title: 'Disbursed',
          timestamp: 'Pending',
          status: 'pending',
        },
      ],
    }

    loanApplicationService.saveApplication(application)
    loanApplicationService.clearDraft(loanType)

    userStorage.saveUserApplication({
      id: refNumber,
      code: refNumber,
      title: loanType === 'business_loan' ? 'Business Loan Application' : 'Home Loan Application',
      meta: `${formattedDate} · ₹${loanAmountNum.toLocaleString('en-IN')}`,
      statusLabel: 'Documents Received',
      statusTone: 'info',
      progress: 20,
      icon: loanType === 'business_loan' ? '💼' : '🏠',
      to: `/loans/status/${refNumber}`,
    })

    return application
  },
}
