import type { FC } from 'react'
import { PaymentCheckout } from '@shared/components'
import { GSTFilingStepper } from '../../../shared/GSTFilingStepper/GSTFilingStepper'
import type { PaymentResult } from '../../../types/gst.types'
import './GSTFilingPayment.css'

interface GSTFilingPaymentProps {
  amount?: number
  applicationRef?: string
  serviceTitle?: string
  onStepClick?: (stepId: number) => void
  onBack: () => void
  onSuccess: (details: PaymentResult) => void
}

export const GSTFilingPayment: FC<GSTFilingPaymentProps> = ({
  amount = 2950,
  applicationRef = 'GST-2026-00118',
  serviceTitle = 'GST Filing — August 2026',
  onStepClick,
  onBack,
  onSuccess,
}) => {
  return (
    <div className="gst-filing-payment-page" data-testid="gst-filing-payment-page">
      <div className="gst-filing-payment-stepper-wrap">
        <GSTFilingStepper currentStep={4} onStepClick={onStepClick} />
      </div>
      <PaymentCheckout
        amount={amount}
        serviceTitle={serviceTitle}
        applicationRef={applicationRef}
        onBack={onBack}
        enablePromoCode={true}
        onSuccess={(res) => {
          onSuccess({
            transactionId: res.paymentId,
            receiptNumber: res.receiptNumber || `REC-${Date.now().toString().slice(-6)}`,
            method: res.method.toUpperCase(),
            dateText: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            applicationRef: res.applicationRef,
            amount: res.amount,
          })
        }}
      />
    </div>
  )
}

export default GSTFilingPayment
