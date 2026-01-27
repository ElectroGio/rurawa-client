import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { HiPlus, HiSearch, HiTrash, HiPencil, HiEye, HiDuplicate } from 'react-icons/hi'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { apiGetQuestionnaires, apiDeleteQuestionnaire } from '@/services/QuestionnaireService'
import type { Questionnaire } from '@/@types/questionnaire/questionnaire.types'
import CreateQuestionnaireDialog from './components/CreateQuestionnaireDialog'
import { useSessionUser } from '@/store/authStore'

const QuestionnairesView = () => {
    const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
    const [filteredQuestionnaires, setFilteredQuestionnaires] = useState<Questionnaire[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const navigate = useNavigate()
    
    const currentUser = useSessionUser()
    const companyId = currentUser?.companyId || ''

    useEffect(() => {
        loadQuestionnaires()
    }, [])

    useEffect(() => {
        if (searchTerm) {
            const filtered = questionnaires.filter((q) =>
                q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                q.description?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredQuestionnaires(filtered)
        } else {
            setFilteredQuestionnaires(questionnaires)
        }
    }, [searchTerm, questionnaires])

    const loadQuestionnaires = async () => {
        try {
            setLoading(true)
            const response = await apiGetQuestionnaires(companyId)
            setQuestionnaires(response.data)
            setFilteredQuestionnaires(response.data)
        } catch (error) {
            toast.push(
                <Notification type="danger" title="Error">
                    No se pudieron cargar los cuestionarios
                </Notification>
            )
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Está seguro de eliminar este cuestionario?')) {
            try {
                await apiDeleteQuestionnaire(id)
                toast.push(
                    <Notification type="success" title="Éxito">
                        Cuestionario eliminado correctamente
                    </Notification>
                )
                loadQuestionnaires()
            } catch (error) {
                toast.push(
                    <Notification type="danger" title="Error">
                        No se pudo eliminar el cuestionario
                    </Notification>
                )
            }
        }
    }

    const handleView = (id: string) => {
        navigate(`/app/questionnaires/${id}`)
    }

    const handleEdit = (id: string) => {
        navigate(`/app/questionnaires/${id}/edit`)
    }

    const handleViewResponses = (id: string) => {
        navigate(`/app/questionnaires/${id}/responses`)
    }

    const handleCreateSuccess = () => {
        setShowCreateDialog(false)
        loadQuestionnaires()
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Cuestionarios</h1>
                    <p className="text-gray-500 mt-1">
                        Gestiona y crea cuestionarios para tus actividades
                    </p>
                </div>
                <Button
                    variant="solid"
                    icon={<HiPlus />}
                    onClick={() => setShowCreateDialog(true)}
                >
                    Nuevo Cuestionario
                </Button>
            </div>

            <div className="mb-6">
                <Input
                    placeholder="Buscar cuestionarios..."
                    prefix={<HiSearch className="text-lg" />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-500">Cargando cuestionarios...</p>
                </div>
            ) : filteredQuestionnaires.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No hay cuestionarios
                    </h3>
                    <p className="text-gray-500 mb-4">
                        Comienza creando tu primer cuestionario
                    </p>
                    <Button
                        variant="solid"
                        onClick={() => setShowCreateDialog(true)}
                    >
                        Crear Cuestionario
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredQuestionnaires.map((questionnaire) => (
                        <div
                            key={questionnaire.id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {questionnaire.title}
                                    </h3>
                                    {questionnaire.description && (
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {questionnaire.description}
                                        </p>
                                    )}
                                </div>
                                {questionnaire.isTemplate && (
                                    <span className="ml-2 px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded">
                                        Plantilla
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <div className="flex items-center gap-1">
                                    <span>📝</span>
                                    <span>{questionnaire.questionCount} preguntas</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>✅</span>
                                    <span>{questionnaire.responseCount} respuestas</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="solid"
                                    icon={<HiEye />}
                                    onClick={() => handleView(questionnaire.id)}
                                >
                                    Ver
                                </Button>
                                <Button
                                    size="sm"
                                    variant="default"
                                    icon={<HiPencil />}
                                    onClick={() => handleEdit(questionnaire.id)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    size="sm"
                                    variant="plain"
                                    onClick={() => handleViewResponses(questionnaire.id)}
                                >
                                    Respuestas
                                </Button>
                                <Button
                                    size="sm"
                                    variant="plain"
                                    icon={<HiTrash />}
                                    className="ml-auto text-red-600 hover:text-red-700"
                                    onClick={() => handleDelete(questionnaire.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <CreateQuestionnaireDialog
                isOpen={showCreateDialog}
                onClose={() => setShowCreateDialog(false)}
                onSuccess={handleCreateSuccess}
            />
        </div>
    )
}

export default QuestionnairesView
