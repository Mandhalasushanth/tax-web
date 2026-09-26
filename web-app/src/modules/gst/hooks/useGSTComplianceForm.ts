import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { routePaths } from '@core/config'
import type { ComplianceFormData } from '../shared/GSTComplianceCard/GSTComplianceCard'

export interface UseGSTComplianceFormProps {
  initialGstin?: string
  initialFinancialYear?: string
  initialRequestType?: 'Reconciliation Support' | 'Notice Response'
  onSubmit?: (d: ComplianceFormData) => void
}

export function useGSTComplianceForm({
  initialGstin = '27AXTPD4419K1ZP',
  initialFinancialYear = 'FY 2026-27',
  initialRequestType = 'Reconciliation Support',
  onSubmit,
}: UseGSTComplianceFormProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [gstin, setGstin] = useState(initialGstin)
  const [financialYear, setFinancialYear] = useState(initialFinancialYear)
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
  const [applicationId] = useState('GST-2026-00132')

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
    if (!g) errs.gstin = 'GSTIN or PAN is required'
    else if (g.length === 10 && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(g))
      errs.gstin = 'Invalid 10-character PAN format (e.g. AXTPD4419K)'
    else if (g.length !== 15 && g.length !== 10)
      errs.gstin = `Must be 15-character GSTIN or 10-character PAN (currently ${g.length} characters)`
    else if (
      g.length === 15 &&
      !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(g)
    )
      errs.gstin = 'Invalid GSTIN format (e.g. 27AXTPD4419K1ZP with valid 10-char PAN)'

    if (!financialYear) errs.financialYear = 'Financial Year is required'
    if (!requestType) errs.requestType = 'Request Type is required'
    if (!purchaseFile) errs.purchaseFile = 'Purchase register document is required'

    if (requestType === 'Reconciliation Support') {
      if (!salesFile) errs.salesFile = 'Sales register document is required'
      if (!gstr2bRef.trim() && !gstr2bFile)
        errs.gstr2bRef = 'GSTR-2B Reference number or statement file is required'
    } else {
      if (!noticeNumber.trim() || noticeNumber.trim().length < 5)
        errs.noticeNumber = !noticeNumber.trim()
          ? 'Department Notice Number is required'
          : 'Department Notice Number must be at least 5 characters'
      if (!noticeFile) errs.noticeFile = 'Notice document upload is required'
      if (!dueDate) errs.dueDate = 'Response due date is required'
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
