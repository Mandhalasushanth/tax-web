import React, { createContext, useContext, useState, useCallback } from 'react'
import { userStorage } from '@core/storage/userStorage'
import type { CompanyEntityType, CompanyDetailsFormData } from '../types/incorporation.types'

export interface IncorporationFormData {
  companyType: CompanyEntityType | null
  companyDetails: Partial<CompanyDetailsFormData>
  registeredOffice: any
  promoterDetails: any
  capitalDetails: any
  documentsKyc: any
  linkedRegistrations: any
  promoters?: any[]
  applicationId?: string
  transactionId?: string
  applicationDate?: string
  paymentMethod?: string
  paidAmount?: number
  paymentCompleted?: boolean
}

const DEFAULT_INCORPORATION_DATA: IncorporationFormData = {
  companyType: null,
  companyDetails: {},
  registeredOffice: {},
  promoterDetails: {},
  capitalDetails: {},
  documentsKyc: {},
  linkedRegistrations: {}
}

export interface IncorporationContextValue {
  formData: IncorporationFormData
  updateFormData: (fields: Partial<IncorporationFormData>) => void
  resetFlow: () => void
}

const IncorporationContext = createContext<IncorporationContextValue | null>(null)

export const IncorporationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<IncorporationFormData>(() => {
    const draft = userStorage.getDraft('incorporation')
    if (draft && draft.formData && draft.formData.applicationData) {
      return draft.formData.applicationData as IncorporationFormData
    }
    return DEFAULT_INCORPORATION_DATA
  })

  const updateFormData = useCallback((fields: Partial<IncorporationFormData>) => {
    setFormData(prev => {
      const updated = { ...prev, ...fields }
      // Update draft automatically
      const draft = userStorage.getDraft('incorporation')
      if (draft) {
        userStorage.saveDraft({
          ...draft,
          formData: { ...draft.formData, applicationData: updated }
        })
      }
      return updated
    })
  }, [])

  const resetFlow = useCallback(() => {
    setFormData(DEFAULT_INCORPORATION_DATA)
    userStorage.deleteDraft('incorporation')
  }, [])

  return (
    <IncorporationContext.Provider value={{ formData, updateFormData, resetFlow }}>
      {children}
    </IncorporationContext.Provider>
  )
}

export const useIncorporationFlow = () => {
  const context = useContext(IncorporationContext)
  if (!context) {
    throw new Error('useIncorporationFlow must be used within an IncorporationProvider')
  }
  return context
}
