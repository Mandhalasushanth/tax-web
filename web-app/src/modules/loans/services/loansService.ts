import { env } from '@core/config'

import { loansApi } from '../api/loansApi'
import type { LoansFilters, LoansItem } from '../types/loans.types'

export const loansService = {
  async list(filters?: LoansFilters): Promise<LoansItem[]> {
    return env.enableMocks
      ? (await new Promise((resolve) => setTimeout(resolve, 200)), [])
      : (await loansApi.list(filters)).data
  },
}
