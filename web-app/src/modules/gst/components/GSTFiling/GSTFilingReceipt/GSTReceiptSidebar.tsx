import { useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'

export const GSTReceiptSidebar = () => {
  const navigate = useNavigate()

  return (
    <aside className="gst-receipt-sidebar">
      {/* Next Steps Card */}
      <div className="gst-receipt-side-card">
        <div className="gst-receipt-side-card__header">
          <div className="gst-receipt-side-card__icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gst-receipt-side-card__icon">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
          </div>
          <h4 className="gst-receipt-side-card__title">Next Steps</h4>
        </div>

        <div className="gst-receipt-stepper">
          <div className="gst-receipt-step-item">
            <div className="gst-receipt-step-indicator gst-receipt-step-indicator--completed">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="gst-receipt-step-check">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="gst-receipt-step-content">
              <div className="gst-receipt-step-title">Payment Completed</div>
              <div className="gst-receipt-step-desc">Your payment has been received.</div>
            </div>
          </div>

          <div className="gst-receipt-step-item">
            <div className="gst-receipt-step-indicator">2</div>
            <div className="gst-receipt-step-content">
              <div className="gst-receipt-step-title">Application Initiated</div>
              <div className="gst-receipt-step-desc">We are now processing your application.</div>
            </div>
          </div>

          <div className="gst-receipt-step-item">
            <div className="gst-receipt-step-indicator">3</div>
            <div className="gst-receipt-step-content">
              <div className="gst-receipt-step-title">Track Status</div>
              <div className="gst-receipt-step-desc">You can track the status from My Applications.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Need Help Card */}
      <div className="gst-receipt-side-card">
        <div className="gst-receipt-side-card__header">
          <div className="gst-receipt-side-card__icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gst-receipt-side-card__icon">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          </div>
          <h4 className="gst-receipt-side-card__title">Need Help?</h4>
        </div>

        <p className="gst-receipt-help-text">
          If you face any issues or have questions, our support team is here to help you.
        </p>

        <button
          type="button"
          className="gst-receipt-help-btn"
          onClick={() => navigate(routePaths.support)}
        >
          Contact Support
        </button>
      </div>
    </aside>
  )
}
