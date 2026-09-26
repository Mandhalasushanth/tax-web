import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { routePaths } from '@core/config'

const CompanyRegistration = lazy(() => import('./pages/CompanyRegistration'))
const SelectCompanyType = lazy(() => import('./pages/SelectCompanyType'))
const CompanyDetails = lazy(() => import('./pages/CompanyDetails'))
const RegisteredOffice = lazy(() => import('./pages/RegisteredOffice'))
const PromoterDetails = lazy(() => import('./pages/PromoterDetails'))
const CapitalDetails = lazy(() => import('./pages/CapitalDetails'))
const DocumentsKyc = lazy(() => import('./pages/DocumentsKyc'))
const LinkedRegistrations = lazy(() => import('./pages/LinkedRegistrations'))
const ReviewApplication = lazy(() => import('./pages/ReviewApplication'))
const FeesPayment = lazy(() => import('./pages/FeesPayment'))
const SubmissionSuccess = lazy(() => import('./pages/SubmissionSuccess'))
const ApplicationTracking = lazy(() => import('./pages/ApplicationTracking'))
const ApplicationReceipt = lazy(() => import('./pages/ApplicationReceipt'))

import { IncorporationWizardLayout } from './components'

export const incorporationRoutes: RouteObject[] = [
  {
    path: routePaths.incorporation.root,
    element: <CompanyRegistration />,
  },
  {
    element: <IncorporationWizardLayout />,
    children: [
      {
        path: routePaths.incorporation.selectType,
        element: <SelectCompanyType />,
      },
      {
        path: routePaths.incorporation.companyDetails,
        element: <CompanyDetails />,
      },
      {
        path: routePaths.incorporation.registeredOffice,
        element: <RegisteredOffice />,
      },
      {
        path: routePaths.incorporation.promoterDetails,
        element: <PromoterDetails />,
      },
      {
        path: routePaths.incorporation.capitalDetails,
        element: <CapitalDetails />,
      },
      {
        path: routePaths.incorporation.documentsKyc,
        element: <DocumentsKyc />,
      },
      {
        path: routePaths.incorporation.linkedRegistrations,
        element: <LinkedRegistrations />,
      },
      {
        path: routePaths.incorporation.reviewApplication,
        element: <ReviewApplication />,
      },
      {
        path: routePaths.incorporation.feesPayment,
        element: <FeesPayment />,
      },
      {
        path: routePaths.incorporation.submissionSuccess,
        element: <SubmissionSuccess />,
      },
      {
        path: routePaths.incorporation.applicationTracking,
        element: <ApplicationTracking />,
      },
      {
        path: routePaths.incorporation.receipt,
        element: <ApplicationReceipt />,
      },
    ],
  },
]
