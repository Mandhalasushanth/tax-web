import { apiClient, apiEndpoints } from '@core/api'
import type { ApiListResponse } from '@shared/types'

import type { LoansFilters, LoansItem } from '@modules/loans/types/loans.types'

export const loansApi = {
  list: (filters?: LoansFilters) =>
    apiClient.get<ApiListResponse<LoansItem>>(apiEndpoints.loans.list, { params: filters }),
}
