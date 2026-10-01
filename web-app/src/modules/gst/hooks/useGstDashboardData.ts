import { useMemo } from 'react'
import { userStorage } from '@core/storage/userStorage'
import { GST_COMPANY } from '@modules/gst/constants/gstBusiness.constants'
import { GST_SERVICES } from '@modules/gst/constants/gstServices.constants'

export type { GstService } from '@modules/gst/constants/gstServices.constants'

export interface GstAppRecord {
  id: string
  title: string
  reference: string
  details: string
  assignee: string
  status: string
  progress: number
}

type UserApplication = ReturnType<typeof userStorage.getUserApplications>[number]

const isGstApplication = (app: UserApplication): boolean => app.title.toLowerCase().includes('gst')

const toGstAppRecord = (app: UserApplication): GstAppRecord => ({
  id: app.id,
  title: app.title,
  reference: app.code,
  details: app.meta,
  assignee: GST_COMPANY.teamName,
  status: app.statusLabel,
  progress: app.progress,
})

/** Dashboard data: the service catalogue and the user's GST applications */
export const useGstDashboardData = () => {
  const applications = useMemo(
    () => userStorage.getUserApplications().filter(isGstApplication).map(toGstAppRecord),
    []
  )

  return { services: GST_SERVICES, applications }
}
