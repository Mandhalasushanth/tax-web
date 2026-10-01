import {
  GSTHeroBanner,
  GSTServices,
  GSTApplicationList,
} from './index'
import { useGstDashboardData } from '@modules/gst/hooks/useGstDashboardData'
import './GSTDashboard.css'

export const GSTDashboard = () => {
  const dashboardData = useGstDashboardData()

  return (
    <div className="gst-dashboard">
      <GSTHeroBanner />

      <div className="gst-dashboard__overview">
        <GSTServices services={dashboardData.services} />
        <GSTApplicationList applications={dashboardData.applications} />
      </div>
    </div>
  )
}

export const GstHomeScreen = GSTDashboard
export default GSTDashboard
