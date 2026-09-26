import type { FC } from 'react'
import { PaymentCheckout } from '@shared/components'
import type { GSTStepPaymentProps } from '../../../types/gstPayment.types'
import './GSTStepPayment.css'

export type { GSTStepPaymentProps, PaymentResult } from '../../../types/gstPayment.types'

export const GSTStepPayment: FC<GSTStepPaymentProps> = ({
  amount = 1499,
  applicationRef = '',
  serviceTitle = 'GST Registration Filing',
  applicantName = 'Applicant',
  onBack,
  onSuccess,
}) => {
  return (
    <div className="gst-step-payment-page" data-testid="gst-step-payment">
      <PaymentCheckout
        amount={amount}
        serviceTitle={serviceTitle}
        applicationRef={applicationRef}
        applicantName={applicantName}
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

export default GSTStepPayment
