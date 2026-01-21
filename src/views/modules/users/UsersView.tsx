import React, { useState, useEffect } from 'react'
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
import CreateGroupDialog from './userComponents/CreateGroupDialog'
import ProjectsFilter from '@/views/modules/projects/components/ProjectsFilter'
import Pagination from './userComponents/Pagination'
import { useSessionUser } from '@/store/authStore'
import { apiGetUsers } from '@/services/UserService'
import { apiGetGroups } from '@/services/GroupService'
import type { User } from '@/@types/user'
import type { Group } from '@/@types/group'

const UsersView = () => {
  const tabs = ["Usuarios", "Grupos", "Actividades"]
  const [selectedTab, setSelectedTab] = useState<string>("Usuarios")
  const [viewMode, setViewMode] = useState<string>("list")
  const [modalOpen, setModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [currentActivityPage, setCurrentActivityPage] = useState<number>(1)
  const usersPerPage = 8
  const activitiesPerPage = 8
  
  const { user: currentUser } = useSessionUser()
  const [realUsers, setRealUsers] = useState<User[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(false)
  const [totalUsers, setTotalUsers] = useState(0)
  const [showCompanyWarning, setShowCompanyWarning] = useState(false)
  
  const totalPages = Math.ceil(totalUsers / usersPerPage)
  const totalActivityPages = Math.ceil(activities.length / activitiesPerPage)

  // Check if user has valid companyId
  useEffect(() => {
    if (currentUser && (!currentUser.companyId || currentUser.companyId === '00000000-0000-0000-0000-000000000000')) {
      console.error('Usuario sin companyId válido. Por favor vuelve a iniciar sesión.')
      setShowCompanyWarning(true)
    } else {
      setShowCompanyWarning(false)
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser?.companyId) {
      if (selectedTab === "Usuarios") {
        loadUsers()
      } else if (selectedTab === "Grupos") {
        loadGroups()
      }
    }
  }, [currentUser, selectedTab, currentPage])

  const loadUsers = async () => {
    if (!currentUser?.companyId || currentUser.companyId === '00000000-0000-0000-0000-000000000000') {
      console.error('Invalid or missing companyId:', currentUser?.companyId)
      setRealUsers([])
      setTotalUsers(0)
      return
    }
    
    setLoading(true)
    try {
      const response = await apiGetUsers(
        currentUser.companyId,
        usersPerPage,
        currentPage
      )
      console.log('Users loaded:', response)
      setRealUsers(response.items || [])
      setTotalUsers(response.totalCount || 0)
    } catch (error) {
      console.error('Error loading users:', error)
      setRealUsers([])
      setTotalUsers(0)
    } finally {
      setLoading(false)
    }
  }

  const loadGroups = async () => {
    if (!currentUser?.companyId || currentUser.companyId === '00000000-0000-0000-0000-000000000000') {
      console.error('Invalid or missing companyId:', currentUser?.companyId)
      setGroups([])
      return
    }
    
    setLoading(true)
    try {
      const groupsData = await apiGetGroups(currentUser.companyId)
      setGroups(groupsData)
    } catch (error) {
      console.error('Error loading groups:', error)
    } finally {
      setLoading(false)
    }
  }

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

  const onDialogSuccess = () => {
    if (selectedTab === "Usuarios") {
      loadUsers()
    } else if (selectedTab === "Grupos") {
      loadGroups()
    }
  }

  const onPageChange = (page: number) => {
    if (selectedTab === "Usuarios") {
      setCurrentPage(page)
    } else if (selectedTab === "Actividades") {
      setCurrentActivityPage(page)
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center p-8">
          <p className="text-gray-500">Cargando...</p>
        </div>
      )
    }

    const activityStartIndex = (currentActivityPage - 1) * activitiesPerPage
    const selectedActivities = activities.slice(activityStartIndex, activityStartIndex + activitiesPerPage)

    if (selectedTab === "Usuarios") {
      return (
        <div className="grid gap-4 p-4">
          {realUsers.length === 0 ? (
            <p className="text-center text-gray-500">No hay usuarios disponibles</p>
          ) : viewMode === "list" ? (
            realUsers.map((us) => (
              <HorizontalUserCard
                key={us.id}
                profileImage={(us.firstName?.[0] || us.email?.[0] || 'U').toUpperCase()}
                name={`${us.firstName || ''} ${us.lastName || ''}`}
                email={us.email || ''}
                group="-"
                zone={us.city || '-'}
                contact={us.phoneNumber || '-'}
                profession={us.profession || '-'}
                isActive={us.isActive ?? true}
              />
            ))
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {realUsers.map((us) => (
                <VerticalUserCard
                  key={us.id}
                  profileImage={(us.firstName?.[0] || us.email?.[0] || 'U').toUpperCase()}
                  name={`${us.firstName || ''} ${us.lastName || ''}`}
                  profession={us.profession || '-'}
                  isActive={us.isActive ?? true}
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
          {groups.length === 0 ? (
            <p className="text-center text-gray-500">No hay grupos disponibles</p>
          ) : viewMode === "list" ? (
            groups.map((group) => (
              <HorizontalGroupCard
                key={group.id}
                image={group.name[0].toUpperCase()}
                title={group.name}
                location={group.description || 'Sin descripción'}
              />
            ))
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {groups.map((group) => (
                <VerticalGroupCard
                  key={group.id}
                  image={group.name[0].toUpperCase()}
                  title={group.name}
                  location={group.description || 'Sin descripción'}
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
      {showCompanyWarning && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-6 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Advertencia:</strong> Tu sesión no tiene una empresa asociada. Por favor cierra sesión y vuelve a iniciar sesión para continuar.
              </p>
            </div>
          </div>
        </div>
      )}
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
          {selectedTab === "Usuarios" ? (
            <CreateUserDialog onClose={onDialogClose} />
          ) : selectedTab === "Grupos" ? (
            <CreateGroupDialog onClose={onDialogClose} onSuccess={onDialogSuccess} />
          ) : (
            <div className="p-6">
              <p>Modal de nueva actividad (próximamente)</p>
            </div>
          )}
        </Dialog>
      )}
    </div>
  )
}

export default UsersView