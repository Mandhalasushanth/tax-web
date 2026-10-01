import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { routePaths } from '@core/config'

const LoanMarketplace = lazy(() => import('./components/LoanMarketplace/LoanMarketplace'))
const Loans = lazy(() => import('./components/Loans/Loans'))
const HomeLoan = lazy(() => import('./components/HomeLoan/HomeLoan'))
const PersonalLoan = lazy(() => import('./components/PersonalLoan/PersonalLoan'))
const BusinessLoan = lazy(() => import('./components/BusinessLoan/BusinessLoan'))
const PropertyLoan = lazy(() => import('./components/PropertyLoan/PropertyLoan'))
const VehicleLoan = lazy(() => import('./components/VehicleLoan/VehicleLoan'))
const WorkingCapitalLoan = lazy(() => import('./components/WorkingCapitalLoan/WorkingCapitalLoan'))
const MachineryLoan = lazy(() => import('./components/MachineryLoan/MachineryLoan'))
const ProjectFinance = lazy(() => import('./components/ProjectFinance/ProjectFinance'))
const MSMELoan = lazy(() => import('./components/MSMELoan/MSMELoan'))
const LoanApplicationStatus = lazy(() => import('./shared/LoanApplicationStatus/LoanApplicationStatus'))

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
