import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { MdMenu, MdAlignVerticalTop } from 'react-icons/md'
import TabSwitcher from "@/components/custom/TabSwitcher/TabSwitcher"
import Button from '@/components/ui/Button'
import { users } from './usersData'
import { activities } from './activitiesData'
import HorizontalUserCard from './userComponents/HorizontalUserCard'
import VerticalUserCard from './userComponents/VerticalUserCard'
import HorizontalGroupCard from './userComponents/HorizontalGroupCard'
import VerticalGroupCard from './userComponents/VerticalGroupCard'
import HorizontalActivityCard from './userComponents/HorizontalActivityCard'
import VerticalActivityCard from './userComponents/VerticalActivityCard'
import Dialog from '@/components/ui/Dialog'
import CreateUserDialog from './userComponents/CreateUserDialog'
import ProjectsFilter from '@/views/modules/projects/components/ProjectsFilter'
import Pagination from './userComponents/Pagination'

const groups = [
  { image: 'https://via.placeholder.com/150', title: 'Coordinadores', location: 'Zona Huila' },
  { image: 'https://via.placeholder.com/150', title: 'Supervisores', location: 'Zona Huila' },
  { image: 'https://via.placeholder.com/150', title: 'Analistas', location: 'Zona Huila' },
  { image: 'https://via.placeholder.com/150', title: 'Técnicos', location: 'Zona Huila' },
]

const UsersView = () => {
  const tabs = ["Usuarios", "Grupos", "Actividades"]
  const [selectedTab, setSelectedTab] = useState<string>("Usuarios")
  const [viewMode, setViewMode] = useState<string>("list")
  const [modalOpen, setModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [currentActivityPage, setCurrentActivityPage] = useState<number>(1)
  const usersPerPage = 8
  const activitiesPerPage = 8
  const totalPages = Math.ceil(users.length / usersPerPage)
  const totalActivityPages = Math.ceil(activities.length / activitiesPerPage)

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab)
    setCurrentPage(1)
    setCurrentActivityPage(1)
  }

  const handleViewChange = (mode: string) => {
    setViewMode(mode)
  }

  const onDialogClose = () => {
    setModalOpen(false)
  }

  const onPageChange = (page: number) => {
    if (selectedTab === "Usuarios") {
      setCurrentPage(page)
    } else if (selectedTab === "Actividades") {
      setCurrentActivityPage(page)
    }
  }

  const renderContent = () => {
    const startIndex = (currentPage - 1) * usersPerPage
    const selectedUsers = users.slice(startIndex, startIndex + usersPerPage)
    const activityStartIndex = (currentActivityPage - 1) * activitiesPerPage
    const selectedActivities = activities.slice(activityStartIndex, activityStartIndex + activitiesPerPage)

    if (selectedTab === "Usuarios") {
      return (
        <div className="grid gap-4 p-4">
          {viewMode === "list" ? (
            selectedUsers.map((us) => (
              <HorizontalUserCard
                key={us.email}
                profileImage={us.profileImage}
                name={us.name}
                email={us.email}
                group={us.group}
                zone={us.zone}
                contact={us.contact}
                profession={us.profession}
                isActive={us.isActive}
              />
            ))
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {selectedUsers.map((us) => (
                <VerticalUserCard
                  profileImage={us.profileImage}
                  name={us.name} 
                  profession={us.profession}
                  isActive={us.isActive}
                />
              ))}
            </div>
          )}
        </div>
      )
    }
    if (selectedTab === "Grupos") {
      return (
        <div className="grid gap-4 p-4">
          {viewMode === "list" ? (
            groups.map((group) => (
              <HorizontalGroupCard
                key={group.title}
                image={group.image}
                title={group.title}
                location={group.location}
              />
            ))
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {groups.map((group) => (
                <VerticalGroupCard
                  key={group.title}
                  image={group.image}
                  title={group.title}
                  location={group.location}
                />
              ))}
            </div>
          )}
        </div>
      )
    }
    if (selectedTab === "Actividades") {
      return (
        <div className="grid gap-4 p-4">
          {viewMode === "list" ? (
            selectedActivities.map((activity) => (
              <HorizontalActivityCard
                key={activity.name}
                profileImage={activity.profileImage}
                name={activity.name}
                role={activity.role}
                status={activity.status}
                pending={activity.pending}
                assigned={activity.assigned}
                completed={activity.completed}
              />
            ))
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {selectedActivities.map((activity) => (
                <VerticalActivityCard
                  key={activity.name}
                  profileImage={activity.profileImage}
                  name={activity.name}
                  role={activity.role}
                  status={activity.status}
                  pending={activity.pending}
                  assigned={activity.assigned}
                  completed={activity.completed}
                />
              ))}
            </div>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">Usuarios</h1>
        <TabSwitcher
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={(tab) => handleTabChange(tab)}
        />
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleViewChange('list')}
            className="border-0 p-3"
          >
            <MdMenu size={24} />
          </Button>
          <Button
            onClick={() => handleViewChange('grid')}
            className="border-0 p-3"
          >
            <MdAlignVerticalTop size={24} />
          </Button>
          <div className="mx-2">
            <ProjectsFilter />
          </div>
          <Button
            onClick={() => setModalOpen(true)} // Se abre el modal
            className="flex items-center gap-2 px-4 py-2 bg-[#008B00] text-white font-medium rounded-full hover:bg-[#008B20] transition"
          >
            <FaPlus />
            {selectedTab === "Usuarios" ? "Nuevo usuario" : selectedTab === "Grupos" ? "Nuevo grupo" : "Nueva actividad"}
          </Button>
        </div>
      </nav>
      <div className="px-6">
        {renderContent()}
      </div>
      {(selectedTab === "Usuarios" || selectedTab === "Actividades") && (
        <div className="flex justify-end px-6 py-4">
          <Pagination
            currentPage={selectedTab === "Usuarios" ? currentPage : currentActivityPage}
            totalPages={selectedTab === "Usuarios" ? totalPages : totalActivityPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
      {modalOpen && (
        <Dialog
          isOpen={modalOpen}
          onClose={onDialogClose}
          onRequestClose={onDialogClose}
        >
          <CreateUserDialog onClose={onDialogClose} />
        </Dialog>
      )}
    </div>
  )
}

export default UsersView