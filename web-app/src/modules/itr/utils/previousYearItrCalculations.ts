export interface AssessmentYearOptionItem {
  id: string
  ay: string
  subtitle: string
  status: 'Eligible' | 'Closed'
  isEligible: boolean
  filingDeadlineText?: string
}

export const PREVIOUS_AY_OPTIONS: AssessmentYearOptionItem[] = [
  {
    id: 'ay-2025-26',
    ay: 'AY 2025-26',
    subtitle: 'Belated return filing period has ended.',
    status: 'Closed',
    isEligible: false,
  },
  {
    id: 'ay-2024-25',
    ay: 'AY 2024-25',
    subtitle: 'Updated Return (ITR-U) can be filed until 31 March 2027.',
    status: 'Eligible',
    isEligible: true,
  },
  {
    id: 'ay-2023-24',
    ay: 'AY 2023-24',
    subtitle: 'Updated Return (ITR-U) can be filed until 31 March 2026.',
    status: 'Eligible',
    isEligible: true,
  },
  {
    id: 'ay-2022-23',
    ay: 'AY 2022-23',
    subtitle: 'Filing window has closed.',
    status: 'Closed',
    isEligible: false,
  },
]

export interface PreviousItrPreviewStep {
  stepNumber: number
  title: string
  description: string
  tag: string
}

export const PREVIOUS_ITR_PREVIEW_STEPS: PreviousItrPreviewStep[] = [
  {
    stepNumber: 1,
    title: 'Step 1 – Income Type',
    tag: 'Same as ITR Filing',
    description:
      'Choose your income category such as Salaried, Business, Professional, Freelancer, Capital Gains, Rental Income, or Multiple Sources.',
  },
  {
    stepNumber: 2,
    title: 'Step 2 – Income Details',
    tag: 'Same as ITR Filing',
    description:
      'Enter PAN, Aadhaar, assessment year, and all relevant income information based on your selected category.',
  },
  {
    stepNumber: 3,
    title: 'Step 3 – Deductions',
    tag: 'Same as ITR Filing',
    description:
      'Provide investment details, insurance, home loan interest, education loan interest, and any additional deductions.',
  },
]
