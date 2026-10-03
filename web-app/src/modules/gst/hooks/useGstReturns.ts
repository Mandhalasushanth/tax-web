import { useAsync } from '@shared/hooks'

import { gstService } from '@modules/gst/services/gstService'
import type { GstReturn } from '@modules/gst/types/gst.types'

export const useGstReturns = () => useAsync<GstReturn[]>(() => gstService.listReturns(), [])
