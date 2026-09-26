import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { routePaths } from '@core/config'

const LoanMarketplace = lazy(() => import('./pages/LoanMarketplace'))
const Loans = lazy(() => import('./pages/Loans'))
const HomeLoan = lazy(() => import('./pages/HomeLoan'))
const PersonalLoan = lazy(() => import('./pages/PersonalLoan'))
const BusinessLoan = lazy(() => import('./pages/BusinessLoan'))
const PropertyLoan = lazy(() => import('./pages/PropertyLoan'))
const VehicleLoan = lazy(() => import('./pages/VehicleLoan'))
const WorkingCapitalLoan = lazy(() => import('./pages/WorkingCapitalLoan'))
const MachineryLoan = lazy(() => import('./pages/MachineryLoan'))
const ProjectFinance = lazy(() => import('./pages/ProjectFinance'))
const MSMELoan = lazy(() => import('./pages/MSMELoan'))
const LoanApplicationStatus = lazy(() => import('./pages/LoanApplicationStatus'))

export const loansRoutes: RouteObject[] = [
  { path: routePaths.loans, element: <LoanMarketplace /> },
  { path: '/loans/all', element: <Loans /> },
  { path: routePaths.loansHomeLoan, element: <HomeLoan /> },
  { path: routePaths.loansPersonalLoan, element: <PersonalLoan /> },
  { path: routePaths.loansBusinessLoan, element: <BusinessLoan /> },
  { path: routePaths.loansPropertyLoan, element: <PropertyLoan /> },
  { path: routePaths.loansVehicleLoan, element: <VehicleLoan /> },
  { path: routePaths.loansWorkingCapitalLoan, element: <WorkingCapitalLoan /> },
  { path: routePaths.loansMachineryLoan, element: <MachineryLoan /> },
  { path: routePaths.loansProjectFinance, element: <ProjectFinance /> },
  { path: routePaths.loansMsmeLoan, element: <MSMELoan /> },
  { path: '/loans/status/:id', element: <LoanApplicationStatus /> },
  { path: '/loans/status', element: <LoanApplicationStatus /> },
]

export default loansRoutes
