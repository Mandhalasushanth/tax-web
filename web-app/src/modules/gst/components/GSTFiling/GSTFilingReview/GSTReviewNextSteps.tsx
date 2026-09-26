import React from 'react'
import { WHAT_HAPPENS_NEXT_STEPS } from '../../../utils/gstReviewData'
import './GSTReviewNextSteps.css'

export const GSTReviewNextStepsCard: React.FC = () => {
  return (
    <div className="gst-review-next-steps-card">
      <h3 className="gst-review-next-steps-card__title">What Happens Next?</h3>
      <div className="gst-review-steps-list">
        {WHAT_HAPPENS_NEXT_STEPS.map((item) => (
          <div key={item.step} className="gst-review-step-item">
            <span className="gst-review-step-item__badge">{item.step}</span>
            <p className="gst-review-step-item__text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const GSTReviewAssuranceBox: React.FC = () => {
  return (
    <div className="gst-review-assurance-box" role="complementary">
      <ul className="gst-review-assurance-list">
        <li>You can request changes if you find any differences.</li>
        <li>Filing will be done by our certified Chartered Accountants.</li>
        <li>You will receive an acknowledgement (ARN) after successful filing.</li>
      </ul>
    </div>
  )
}
