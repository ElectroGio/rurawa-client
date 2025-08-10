import React, { useState } from 'react'
import { HiArrowLeft, HiFilter, HiChevronDown, HiCog } from 'react-icons/hi'
import SidebarContainer from './SidebarContainer'
import TabSwitcher from "@/components/custom/TabSwitcher/TabSwitcher"
import ProjectContent from './profileProjects/ProjectsContent'
import TeamContent from './team/TeamContent'
import PerformanceContent from './performance/PerformanceContent'
import { useNavigate } from 'react-router-dom'

const ProfileUser = () => {
  const tabs = ["Proyectos", "Equipo", "Rendimiento"]
  const [selectedTab, setSelectedTab] = useState<string>("Proyectos")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const handleBackClick = () => {
    navigate('/usuarios')
  }
  const handleSettingClick = () => {
    navigate('/usuarios/perfil/configuracion/1')
  }

  const renderContent = () => {
    if (selectedTab === "Proyectos") {
      return <ProjectContent />
    }
    if (selectedTab === "Equipo") {
      return <TeamContent />
    }
    if (selectedTab === "Rendimiento") {
      return <PerformanceContent />
    }
    return null
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <div className="p-4">
      
      <div className="flex justify-between">
        <div>
          <div className="flex items-center text-green-700 cursor-pointer" onClick={handleBackClick}>
            <HiArrowLeft className="text-xl mr-2" />
            <span>Volver a Actividades</span>
          </div>
          <div className="mt-4 text-2xl font-bold">Perfil</div>
        </div>
        {selectedTab !== "Proyectos" && (
          <button className="bg-white p-3 rounded-full shadow-md self-start" onClick={handleSettingClick}>
            <HiCog className="text-gray-600 text-xl" />
          </button>
        )}
      </div>

      <div className="flex mt-4">
        <div className="w-1/4">
          <SidebarContainer />
        </div>
        <div className="flex-1 ml-4">
          <div className="flex items-center justify-between">
            <div className="">
              <TabSwitcher
                tabs={tabs}
                selectedTab={selectedTab}
                onTabChange={(tab) => setSelectedTab(tab)}
              />
            </div>
            {selectedTab === "Proyectos" && (
              <div className="flex items-center space-x-2">
                <button className="bg-white p-3 rounded-full shadow-md">
                  <HiFilter className="text-gray-600 text-xl" />
                </button>
                <div className="relative">
                  <button
                    className="bg-white p-3 rounded-full shadow-md flex items-center"
                    onClick={toggleDropdown}
                  >
                    Opciones
                    <HiChevronDown className="ml-2 text-gray-600" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                      <ul className="py-1">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Proyectos Actuales</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Proyectos Antiguos</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileUser