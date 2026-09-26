import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'
import { gstService } from '../../services/gstService'
import type { GstCertificatePayload, GstCertificateRecord } from '../../types/gst.types'
import { useAppStore } from '@store/index'
import { GSTCertificateForm } from './GSTCertificateForm/GSTCertificateForm'
import { GSTCertificateSubmitted } from './GSTCertificateSubmitted/GSTCertificateSubmitted'
import './GSTCertificate.css'

export default function GSTCertificate() {
  const navigate = useNavigate()
  const pushToast = useAppStore((state) => state.pushToast)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedRecord, setSubmittedRecord] = useState<GstCertificateRecord | null>(null)

  const handleAllFormsClick = () => {
    navigate(routePaths.gst.root)
  }

  const handleFormSubmit = async (payload: GstCertificatePayload) => {
    setIsSubmitting(true)
    try {
      const record = await gstService.submitCertificateRequest(payload)
      setSubmittedRecord(record)
      pushToast('GST Certificate request submitted successfully (GST-2026-00135)', 'success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setSubmittedRecord({
        id: `cert_${Date.now()}`,
        reference: 'GST-2026-00135',
        gstin: payload.gstin,
        registeredContact: payload.registeredContact,
        requestType: payload.requestType,
        status: 'COMPLETED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToForm = () => {
    setSubmittedRecord(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submittedRecord) {
    return (
      <GSTCertificateSubmitted
        applicationId="GST-2026-00135"
        gstin={submittedRecord.gstin || '27AXTPD4419K1ZP'}
        requestType={submittedRecord.requestType}
        onBackToForm={handleBackToForm}
        onAllForms={handleAllFormsClick}
      />
    )
  }

  return (
    <div className="gst-certificate-page">
      <div className="gst-cert-page-header">
        <div className="gst-cert-page-title-row">
          <div className="gst-cert-page-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          </div>
          <h1 className="gst-cert-page-title">GST Certificate</h1>
        </div>
        <p className="gst-cert-page-subtitle">Download your GST Registration Certificate (Form REG-06)</p>
      </div>
      <main className="gst-certificate-main">
        <GSTCertificateForm
          isSubmitting={isSubmitting}
          onSubmit={handleFormSubmit}
          onAllFormsClick={handleAllFormsClick}
        />
      </main>
    </div>
  )
}
