import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { isStaffRole } from '@core/auth'
import { routePaths } from '@core/config'
import { Loader } from '@shared/components'
import { useAuthStore } from '@store/index'

/** Customer-only routes. Staff are redirected to their own dashboard. */
export const CustomerRoute = () => {
  const location = useLocation()
  const { isAuthenticated, isBootstrapping, user } = useAuthStore()

  if (isBootstrapping) return <Loader fullPage label="Checking your session" />

  if (!isAuthenticated || !user) {
    return <Navigate to={routePaths.auth.login} state={{ returnTo: location.pathname }} replace />
  }

  if (isStaffRole(user.role)) return <Navigate to={routePaths.staff.dashboard} replace />

  // Allow browsing service hubs, loan modules, and subpages without unwanted redirects
  const isAllowedBrowsePath =
    location.pathname === routePaths.dashboard ||
    location.pathname.startsWith('/loans') ||
    location.pathname.startsWith('/gst') ||
    location.pathname.startsWith('/itr') ||
    location.pathname.startsWith('/incorporation') ||
    location.pathname.startsWith('/business') ||
    location.pathname.startsWith('/insurance') ||
    location.pathname.startsWith('/applications') ||
    location.pathname.startsWith('/documents') ||
    location.pathname.startsWith('/payments') ||
    location.pathname.startsWith('/notifications') ||
    location.pathname.startsWith('/support') ||
    location.pathname.startsWith('/profile') ||
    location.pathname.startsWith('/auth') ||
    location.pathname === routePaths.registration ||
    location.pathname === routePaths.customerType

  if (!user.isProfileComplete && !isAllowedBrowsePath) {
    return <Outlet />
  }

  return <Outlet />
}
