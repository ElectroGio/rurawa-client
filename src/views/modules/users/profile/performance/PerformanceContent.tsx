import React from 'react'
import StatCard from './StatCard'
import ProjectStatus from './ProjectStatus'

const PerformanceContent = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="pb-10">
        <StatCard />
      </div>
      <ProjectStatus />
    </div>
  )
}

export default PerformanceContent