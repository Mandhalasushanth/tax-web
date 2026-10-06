import { useState } from 'react'
import { gstFieldRules } from '@modules/gst/validation/gstFieldRules'
import { CURRENT_FINANCIAL_YEAR, FINANCIAL_YEAR_OPTIONS } from '@modules/gst/utils/gstPeriodOptions'
import { generateGstReference } from '@modules/gst/utils/gstFormat'
import { gstProfileService } from '@modules/gst/services/gstProfileService'
import { useNavigate, useLocation } from 'react-router-dom'
import { routePaths } from '@core/config'
import type { ComplianceFormData } from '@modules/gst/shared/GSTComplianceCard/GSTComplianceCard'

export interface UseGSTComplianceFormProps {
  initialGstin?: string
  initialFinancialYear?: string
  initialRequestType?: 'Reconciliation Support' | 'Notice Response'
  onSubmit?: (d: ComplianceFormData) => void
}

export function useGSTComplianceForm({
  initialGstin,
  initialFinancialYear,
  initialRequestType = 'Reconciliation Support',
  onSubmit,
}: UseGSTComplianceFormProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [gstin, setGstin] = useState(() => initialGstin ?? gstProfileService.get().gstin)
  const [financialYear, setFinancialYear] = useState(() => initialFinancialYear ?? CURRENT_FINANCIAL_YEAR ?? FINANCIAL_YEAR_OPTIONS[0]?.value ?? '')
  const [requestType, setRequestType] = useState<'Reconciliation Support' | 'Notice Response'>(
    initialRequestType
  )
  const [purchaseFile, setPurchaseFile] = useState<File | null>(null)
  const [salesFile, setSalesFile] = useState<File | null>(null)
  const [gstr2bRef, setGstr2bRef] = useState('')
  const [gstr2bFile, setGstr2bFile] = useState<File | null>(null)
  const [noticeNumber, setNoticeNumber] = useState('')
  const [noticeFile, setNoticeFile] = useState<File | null>(null)
  const [dueDate, setDueDate] = useState('')
  const [replyDraft, setReplyDraft] = useState('')
  const [previewDoc, setPreviewDoc] = useState<{ file: File; title: string } | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSubmitted =
    location.pathname === routePaths.gst.complianceSubmitted ||
    location.search.includes('submitted')
  const [applicationId] = useState(() => generateGstReference('GSTC'))

  const clearErr = (k: string) =>
    setErrors((p) => {
      const { [k]: _, ...rest } = p
      return rest
    })

  const handleGstinChange = (v: string) => {
    setGstin(
      v
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .slice(0, 15)
    )
    clearErr('gstin')
  }

  const validateForm = () => {
    const errs: Record<string, string> = {}
    const g = gstin.trim().toUpperCase()
    const idError = !g
      ? 'GSTIN or PAN is required'
      : g.length === 10
        ? gstFieldRules.pan(g)
        : g.length === 15
          ? gstFieldRules.gstin(g)
          : `Must be 15-character GSTIN or 10-character PAN (currently ${g.length} characters)`
    if (idError) errs.gstin = idError

    if (!financialYear) errs.financialYear = 'Financial Year is required'
    if (!requestType) errs.requestType = 'Request Type is required'
    if (!purchaseFile) errs.purchaseFile = 'Purchase register document is required'

    if (requestType === 'Reconciliation Support') {
      if (!salesFile) errs.salesFile = 'Sales register document is required'
      if (!gstr2bRef.trim() && !gstr2bFile)
        errs.gstr2bRef = 'GSTR-2B Reference number or statement file is required'
    } else {
      const noticeError = gstFieldRules.reference('Department notice number')(noticeNumber)
      if (noticeError) errs.noticeNumber = noticeError
      if (!noticeFile) errs.noticeFile = 'Notice document upload is required'
      const dueDateError = gstFieldRules.futureDate('Response due date')(dueDate)
      if (dueDateError) errs.dueDate = dueDateError
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      navigate(`${routePaths.gst.compliance}?status=submitted`, {
        replace: true,
      })
      onSubmit?.({
        gstin,
        financialYear,
        requestType,
        purchaseDoc: purchaseFile,
        salesDoc: salesFile,
        gstr2bRef,
        gstr2bDoc: gstr2bFile,
        noticeNumber: requestType === 'Notice Response' ? noticeNumber : undefined,
        noticeDoc: requestType === 'Notice Response' ? noticeFile : undefined,
        dueDate: requestType === 'Notice Response' ? dueDate : undefined,
        replyDraft,
      })
    }, 600)
  }

  return {
    navigate,
    gstin,
    financialYear,
    setFinancialYear,
    requestType,
    setRequestType,
    purchaseFile,
    setPurchaseFile,
    salesFile,
    setSalesFile,
    gstr2bRef,
    setGstr2bRef,
    gstr2bFile,
    setGstr2bFile,
    noticeNumber,
    setNoticeNumber,
    noticeFile,
    setNoticeFile,
    dueDate,
    setDueDate,
    replyDraft,
    setReplyDraft,
    previewDoc,
    setPreviewDoc,
    errors,
    isSubmitting,
    isSubmitted,
    applicationId,
    clearErr,
    handleGstinChange,
    handleSubmit,
  }
}
