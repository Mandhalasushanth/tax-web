import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

import { routePaths } from '@core/config'

const GSTDashboard = lazy(() => import('./pages/GSTDashboard'))
const GSTRegistration = lazy(() => import('./pages/GSTRegistration'))
const GSTReturn = lazy(() => import('./pages/GSTReturn'))
const GSTFiling = lazy(() => import('./pages/GSTFiling'))
const GSTDetails = lazy(() => import('./pages/GSTDetails'))
const GSTTrack = lazy(() => import('./pages/GSTTrack'))
const GSTAmendment = lazy(() => import('./pages/GSTAmendment'))
const GSTCertificate = lazy(() => import('./pages/GSTCertificate'))
const GSTCompliance = lazy(() => import('./pages/GSTCompliance'))
const GSTCancellation = lazy(() => import('./pages/GSTCancellation'))

export const gstRoutes: RouteObject[] = [
  { path: routePaths.gst.root, element: <GSTDashboard /> },
  { path: routePaths.gst.registration, element: <GSTRegistration /> },
  { path: '/gst/registration/documents', element: <GSTRegistration /> },
  { path: '/gst/registration-documents', element: <GSTRegistration /> },
  { path: routePaths.gst.returns, element: <GSTReturn /> },
  { path: routePaths.gst.filing, element: <GSTFiling /> },
  { path: routePaths.gst.amendment, element: <GSTAmendment /> },
  { path: routePaths.gst.certificate, element: <GSTCertificate /> },
  { path: routePaths.gst.compliance, element: <GSTCompliance /> },
  { path: routePaths.gst.complianceSubmitted, element: <GSTCompliance /> },
  { path: routePaths.gst.cancellation, element: <GSTCancellation /> },
  { path: routePaths.gst.cancellationSubmitted, element: <GSTCancellation /> },
  { path: '/gst/file-period', element: <GSTFiling /> },
  { path: '/gst/file-upload', element: <GSTFiling /> },
  { path: '/gst/file-review', element: <GSTFiling /> },
  { path: '/gst/file-payment', element: <GSTFiling /> },
  { path: '/gst/file-success', element: <GSTFiling /> },
  { path: '/gst/file-receipt', element: <GSTFiling /> },
  { path: routePaths.gst.detail(), element: <GSTDetails /> },
  { path: routePaths.gst.track(), element: <GSTTrack /> },
]
