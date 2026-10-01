import { useAsync } from '@shared/hooks'

import { loansService } from '@modules/loans/services/loansService'
import type { LoansItem } from '@modules/loans/types/loans.types'

export const useLoans = () => useAsync<LoansItem[]>(() => loansService.list(), [])
