import React, { useState, useEffect } from 'react'
import { HiArrowLeft } from 'react-icons/hi'
import SidebarContainer from './SidebarContainer'
import SideBarConfig from './Settings/SideBarConfig'
import Account from './Settings/Account'
import PermissionCenter from './Settings/PermissionCenter'
import ActivityLog from './Settings/ActivityLog'
import Notifications from './Settings/Notifications'
import ConnectedDevices from './Settings/ConnectedDevices'
import { useNavigate, useParams } from 'react-router-dom'
import { apiGetUserById } from '@/services/UserService'
import type { User } from '@/@types/user'

const ConfigProfile = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [selectedSection, setSelectedSection] = useState('Cuenta')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      loadUser()
    }
  }, [id])

  const loadUser = async () => {
    if (!id) return
    
    setLoading(true)
    try {
      const userData = await apiGetUserById(id)
      setUser(userData)
    } catch (error) {
      console.error('Error loading user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBackClick = () => {
    navigate(`/usuarios/perfil/${id}`)
  }

  const handleSelectSection = (section: string) => {
    setSelectedSection(section)
  }

  const renderContent = () => {
    if (!user) return null
    
    switch (selectedSection) {
      case 'Cuenta':
        return <Account user={user} onUpdate={loadUser} />
      case 'Centro de permisos':
        return <PermissionCenter />
      case 'Registro de actividades':
        return <ActivityLog />
      case 'Notificaciones':
        return <Notifications />
      case 'Equipos conectados':
        return <ConnectedDevices />
      default:
        return null
    }
  }

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Cargando...</p>
        </div>
      ) : !user ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Usuario no encontrado</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <div>
              <div className="mt-4 text-2xl font-bold text-black">Mi perfil</div>
            </div>
          </div>

          <div className="flex mt-4">
            <div className="w-1/4">
              <SidebarContainer user={user} />
            </div>
            <div className="flex-1 ml-4">
              <div className="flex items-center">
                <HiArrowLeft className="text-xl mr-2 cursor-pointer text-green-700" onClick={handleBackClick} />
                <span className="text-xl font-bold text-black">Configurar</span>
              </div>
              <div className="flex mt-4">
                <div className="w-1/3 flex-shrink-0">
                  <SideBarConfig onSelect={handleSelectSection} />
                </div>
                <div className="flex-1 ml-4 bg-white rounded-3xl p-4 shadow-md">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ConfigProfile