import { routePaths } from '@core/config'
import { formatRupees } from '@modules/gst/utils/gstFormat'
import { GST_FEES } from '@modules/gst/constants/gstBusiness.constants'

export type GstServiceType = 'registration' | 'filing' | 'compliance' | 'cancellation' | 'amendment' | 'certificate'

export interface GstService {
  id: string
  title: string
  description: string
  price: string
  priceType: string
  iconType: GstServiceType
  badge?: string
  turnaround?: string
}

/** Screen each dashboard service opens */
export const GST_SERVICE_ROUTES: Record<GstServiceType, string> = {
  registration: routePaths.gst.registration,
  filing: routePaths.gst.filing,
  compliance: routePaths.gst.compliance,
  amendment: routePaths.gst.amendment,
  cancellation: routePaths.gst.cancellation,
  certificate: routePaths.gst.certificate,
}

/** Service catalogue shown on the GST dashboard; prices come from GST_FEES */
export const GST_SERVICES: readonly GstService[] = [
  { id: '1', title: 'GST Registration', description: 'New GSTIN for your business, end to end with the department.', price: formatRupees(GST_FEES.registration), priceType: 'one time', iconType: 'registration', badge: 'Most Popular', turnaround: '3–5 days' },
  { id: '2', title: 'GST Filing', description: 'Monthly or quarterly GSTR-1 and GSTR-3B preparation and filing.', price: formatRupees(GST_FEES.filingCombo), priceType: 'per period', iconType: 'filing', badge: 'Periodic', turnaround: 'Same Day' },
  { id: '3', title: 'GST Compliance', description: 'Annual return, reconciliation and notice handling.', price: formatRupees(GST_FEES.compliance), priceType: 'per year', iconType: 'compliance', badge: 'Annual', turnaround: 'Comprehensive' },
  { id: '4', title: 'GST Amendment', description: 'Change address, business name, or authorised signatory.', price: formatRupees(GST_FEES.amendment), priceType: 'per change', iconType: 'amendment', badge: 'Modification', turnaround: '24–48 hrs' },
  { id: '5', title: 'GST Cancellation', description: 'Surrender a GSTIN and close out pending returns.', price: formatRupees(GST_FEES.cancellation), priceType: 'one time', iconType: 'cancellation', badge: 'Closure', turnaround: '5–7 days' },
  { id: '6', title: 'GST Certificate', description: 'Download a fresh registration certificate copy.', price: formatRupees(GST_FEES.certificate), priceType: 'per copy', iconType: 'certificate', badge: 'Official', turnaround: 'Instant' },
]
