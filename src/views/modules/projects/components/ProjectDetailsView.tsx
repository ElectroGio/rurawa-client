import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Avatar, Tag } from '@/components/ui'
import { FaArrowLeft, FaPlus, FaCalendar, FaMapMarkerAlt, FaUsers, FaShare } from 'react-icons/fa'
import { MdOutlineDescription } from 'react-icons/md'
import { apiGetProjectById } from '@/services/ProjectService'
import { apiGetActivitiesByProjectId } from '@/services/ActivityService'
import { apiGetProjectTeamMembers } from '@/services/ProjectService'
import { getProjectAvatar } from '@/utils/projectAvatars'
import CreateActivityWizard from './CreateActivityWizard'
import type { Project, ProjectTeamMember } from '@/@types/project'
import type { Activity } from '@/@types/activity'

const ProjectDetailsView = () => {
    const { projectId } = useParams<{ projectId: string }>()
    const navigate = useNavigate()
    const [project, setProject] = useState<Project | null>(null)
    const [activities, setActivities] = useState<Activity[]>([])
    const [teamMembers, setTeamMembers] = useState<ProjectTeamMember[]>([])
    const [loading, setLoading] = useState(true)
    const [showShareDialog, setShowShareDialog] = useState(false)
    const [showActivityWizard, setShowActivityWizard] = useState(false)

    useEffect(() => {
        if (projectId) {
            loadProjectDetails()
        }
    }, [projectId])

    const loadProjectDetails = async () => {
        setLoading(true)
        try {
            // Cargar proyecto primero
            const projectData = await apiGetProjectById(projectId!)
            setProject(projectData)
            
            // Cargar actividades y equipo en paralelo, pero sin bloquear si fallan
            try {
                const [activitiesData, teamData] = await Promise.all([
                    apiGetActivitiesByProjectId(projectId!).catch(() => []),
                    apiGetProjectTeamMembers(projectId!).catch(() => [])
                ])
                setActivities(activitiesData)
                setTeamMembers(teamData)
            } catch (secondaryError) {
                console.error('Error loading secondary data:', secondaryError)
                // Continuar mostrando el proyecto aunque fallen estos datos
            }
        } catch (error) {
            console.error('Error loading project details:', error)
            setProject(null)
        } finally {
            setLoading(false)
        }
    }

    const getStateColor = (state: string) => {
        switch (state.toLowerCase()) {
            case 'aprobado':
                return 'bg-green-100 text-green-600'
            case 'en progreso':
                return 'bg-blue-100 text-blue-600'
            case 'en revisión':
                return 'bg-purple-100 text-purple-600'
            case 'sin iniciar':
                return 'bg-gray-100 text-gray-600'
            default:
                return 'bg-gray-100 text-gray-600'
        }
    }

    const getActivityTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'training':
            case 'capacitación':
                return 'bg-blue-100 text-blue-600'
            case 'survey':
            case 'cuestionario':
                return 'bg-green-100 text-green-600'
            default:
                return 'bg-gray-100 text-gray-600'
        }
    }

    const getRoleColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'director':
                return 'bg-purple-100 text-purple-600'
            case 'coordinador':
                return 'bg-blue-100 text-blue-600'
            case 'supervisor':
                return 'bg-green-100 text-green-600'
            case 'analista':
                return 'bg-yellow-100 text-yellow-600'
            case 'tecnico':
                return 'bg-gray-100 text-gray-600'
            default:
                return 'bg-gray-100 text-gray-600'
        }
    }

    const handleBack = () => {
        navigate('/projects')
    }

    const handleAddActivity = () => {
        setShowActivityWizard(true)
    }

    const handleActivityWizardSuccess = () => {
        loadProjectDetails()
    }

    const handleShareProject = () => {
        setShowShareDialog(true)
    }

    const handleActivityClick = (activityId: string) => {
        // TODO: Navigate to activity details
        console.log('Navigate to activity:', activityId)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando proyecto...</p>
                </div>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <p className="text-gray-600">Proyecto no encontrado</p>
                    <Button onClick={handleBack} className="mt-4">
                        Volver a proyectos
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="plain"
                            size="sm"
                            onClick={handleBack}
                            icon={<FaArrowLeft />}
                        />
                        <div className="flex items-center gap-4">
                            {(() => {
                                const avatar = getProjectAvatar(project.imageUrl)
                                return (
                                    <div className={`${avatar.color} rounded-full w-12 h-12 flex items-center justify-center text-2xl`}>
                                        {avatar.emoji}
                                    </div>
                                )
                            })()}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                                <p className="text-sm text-gray-500">
                                    Código: {project.id.substring(0, 10).toUpperCase()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="solid"
                            size="sm"
                            onClick={handleShareProject}
                            icon={<FaShare />}
                        >
                            Compartir proyecto
                        </Button>
                        <Button
                            variant="solid"
                            size="sm"
                            onClick={handleAddActivity}
                            icon={<FaPlus />}
                        >
                            Agregar actividad
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-gray-50">
                <div className="max-w-7xl mx-auto p-6">
                    {/* Project Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Main Info Card */}
                        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Información del proyecto
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MdOutlineDescription className="text-gray-400 mt-1" size={20} />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">Descripción</p>
                                        <p className="text-gray-900">{project.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FaMapMarkerAlt className="text-gray-400 mt-1" size={18} />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">Ubicación</p>
                                        <p className="text-gray-900">{project.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FaCalendar className="text-gray-400 mt-1" size={18} />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">Fecha de inicio</p>
                                        <p className="text-gray-900">
                                            {project.startDate
                                                ? new Date(project.startDate).toLocaleDateString('es-ES', {
                                                      year: 'numeric',
                                                      month: 'long',
                                                      day: 'numeric'
                                                  })
                                                : 'No definida'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FaCalendar className="text-gray-400 mt-1" size={18} />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">Fecha de finalización</p>
                                        <p className="text-gray-900">
                                            {project.endDate
                                                ? new Date(project.endDate).toLocaleDateString('es-ES', {
                                                      year: 'numeric',
                                                      month: 'long',
                                                      day: 'numeric'
                                                  })
                                                : 'No definida'}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-2">Estado</p>
                                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStateColor(project.state)}`}>
                                        {project.state}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Team Members Card */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <FaUsers className="text-gray-400" size={18} />
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Equipo de trabajo
                                </h2>
                            </div>
                            <div className="space-y-3">
                                {teamMembers.length === 0 ? (
                                    <p className="text-sm text-gray-500">
                                        No hay miembros en el equipo
                                    </p>
                                ) : (
                                    teamMembers.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src={member.user?.profileImage}
                                                    size={32}
                                                    shape="circle"
                                                    className="bg-blue-500 text-white"
                                                >
                                                    {member.user
                                                        ? `${member.user.firstName[0]}${member.user.lastName[0]}`
                                                        : 'U'}
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {member.user
                                                            ? `${member.user.firstName} ${member.user.lastName}`
                                                            : 'Usuario'}
                                                    </p>
                                                    <span
                                                        className={`inline-flex px-2 py-0.5 rounded text-xs ${getRoleColor(member.role)}`}
                                                    >
                                                        {member.role}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Activities Section */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Actividades del proyecto
                                </h2>
                                <span className="text-sm text-gray-500">
                                    {activities.length} {activities.length === 1 ? 'actividad' : 'actividades'}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            {activities.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-4">
                                        No hay actividades registradas
                                    </p>
                                    <Button
                                        variant="solid"
                                        onClick={handleAddActivity}
                                        icon={<FaPlus />}
                                    >
                                        Agregar primera actividad
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {activities.map((activity) => (
                                        <div
                                            key={activity.id}
                                            onClick={() => handleActivityClick(activity.id)}
                                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="font-semibold text-gray-900 flex-1">
                                                    {activity.name}
                                                </h3>
                                                <span
                                                    className={`inline-flex px-2 py-1 rounded text-xs font-medium ${getActivityTypeColor(activity.type)}`}
                                                >
                                                    {activity.type}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                {activity.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <FaCalendar size={12} />
                                                <span>
                                                    {new Date(activity.startDate).toLocaleDateString('es-ES')}
                                                </span>
                                                <span>-</span>
                                                <span>
                                                    {new Date(activity.endDate).toLocaleDateString('es-ES')}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Activity Wizard */}
            <CreateActivityWizard
                isOpen={showActivityWizard}
                onClose={() => setShowActivityWizard(false)}
                onSuccess={handleActivityWizardSuccess}
            />

            {/* Share Dialog - Placeholder */}
            {showShareDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Compartir proyecto</h3>
                        <p className="text-gray-600 mb-4">
                            Esta funcionalidad estará disponible próximamente.
                        </p>
                        <div className="flex justify-end">
                            <Button onClick={() => setShowShareDialog(false)}>
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProjectDetailsView
