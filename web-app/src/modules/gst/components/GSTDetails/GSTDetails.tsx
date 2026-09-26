import React from 'react'
import { useParams } from 'react-router-dom'
import { ApplicationTrackerView } from '@modules/applications/components/ApplicationTracker/ApplicationTrackerView'

export const GSTDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  return <ApplicationTrackerView customId={id} />
}

export default GSTDetails
