import React from 'react'
import ProjectCard from './ProjectCard'
import AllProjects from './AllProjects'

const ProjectContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <ProjectCard />
      <AllProjects />
    </div>
  )
}

export default ProjectContent