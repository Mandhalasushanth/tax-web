import React, { useState } from 'react'
import type { ProjectFinanceData } from '../../../../types/projectFinance.types'
import { UploadDocumentsSection } from './UploadDocumentsSection'
import { ReviewApplicationSection } from './ReviewApplicationSection'
import { DeclarationAndSubmitSection } from './DeclarationAndSubmitSection'
import './ReviewAndSubmit.css'

export interface ReviewAndSubmitProps {
  data: ProjectFinanceData
  onChange: (fields: Partial<ProjectFinanceData>) => void
  onNavigateToStep: (step: number) => void
  errors?: Record<string, string>
}

export const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({
  data,
  onChange,
  onNavigateToStep,
  errors = {},
}) => {
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(true)
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(true)
  const [isDeclarationOpen, setIsDeclarationOpen] = useState<boolean>(true)
  const [isSubmitOpen, setIsSubmitOpen] = useState<boolean>(true)

  return (
    <div className="review-and-submit-step" data-testid="review-and-submit-step">
      {/* 1. Upload Documents */}
      <UploadDocumentsSection
        data={data}
        onChange={onChange}
        isOpen={isUploadOpen}
        onToggle={() => setIsUploadOpen((prev) => !prev)}
        errors={errors}
      />

      {/* 2. Review Application */}
      <ReviewApplicationSection
        onNavigateToStep={onNavigateToStep}
        isOpen={isReviewOpen}
        onToggle={() => setIsReviewOpen((prev) => !prev)}
      />

      {/* 3. Declaration & 4. Submit Application */}
      <DeclarationAndSubmitSection
        data={data}
        onChange={onChange}
        isDeclarationOpen={isDeclarationOpen}
        onToggleDeclaration={() => setIsDeclarationOpen((prev) => !prev)}
        isSubmitOpen={isSubmitOpen}
        onToggleSubmit={() => setIsSubmitOpen((prev) => !prev)}
        errors={errors}
      />
    </div>
  )
}

export default ReviewAndSubmit
