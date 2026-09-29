import React from 'react'
import { ApplicantAndProject } from '../ApplicantAndProject/ApplicantAndProject'
import type { ApplicantAndProjectProps } from '../ApplicantAndProject/ApplicantAndProject'

export type ProjectDetailsProps = ApplicantAndProjectProps

export const ProjectDetails: React.FC<ProjectDetailsProps> = (props) => {
  return <ApplicantAndProject {...props} />
}

export default ProjectDetails
