import {
  GSTHeroBanner,
  GSTStats,
  GSTServices,
  GSTApplicationList,
} from './index'
import { useGstDashboardData } from '../../hooks/useGstDashboardData'
import './GSTDashboard.css'

export const GSTDashboard = () => {
  const dashboardData = useGstDashboardData()

  return (
    <div className="gst-dashboard">
      <GSTHeroBanner />

      <div className="gst-dashboard__overview">
        <GSTStats stats={dashboardData.stats} />
        <GSTServices services={dashboardData.services} />
        <GSTApplicationList applications={dashboardData.applications} />
      </div>
    </div>
  )
}

export const GstHomeScreen = GSTDashboard
export default GSTDashboard
