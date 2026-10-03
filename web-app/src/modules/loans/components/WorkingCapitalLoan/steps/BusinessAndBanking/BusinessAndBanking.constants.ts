import type { WorkingCapitalTrackRecord, WorkingCapitalItrStatus } from '@modules/loans/types/workingCapitalLoan.types'

export const TRACK_RECORD_OPTIONS: WorkingCapitalTrackRecord[] = [
  '< 1 Year',
  '1 - 2 Years',
  '3 - 5 Years',
  '5 - 10 Years',
  '10+ Years',
]

export const ITR_STATUS_OPTIONS: WorkingCapitalItrStatus[] = [
  'Filed',
  'Not Filed',
  'Exempt',
]
