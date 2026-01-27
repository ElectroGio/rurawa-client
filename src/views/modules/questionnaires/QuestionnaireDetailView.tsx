import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { HiArrowLeft, HiPencil, HiTrash, HiClipboardList } from 'react-icons/hi'
import { apiGetQuestionnaireById, apiDeleteQuestionnaire } from '@/services/QuestionnaireService'
import type { QuestionnaireDetail } from '@/@types/questionnaire/questionnaire.types'

const QuestionnaireDetailView = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [questionnaire, setQuestionnaire] = useState<QuestionnaireDetail | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            loadQuestionnaire()
        }
    }, [id])

    const loadQuestionnaire = async () => {
        try {
            setLoading(true)
            const response = await apiGetQuestionnaireById(id!)
            setQuestionnaire(response.data)
        } catch (error) {
            toast.push(
                <Notification type="danger" title="Error">
                    No se pudo cargar el cuestionario
                </Notification>
            )
            navigate('/app/questionnaires')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (window.confirm('¿Está seguro de eliminar este cuestionario?')) {
            try {
                await apiDeleteQuestionnaire(id!)
                toast.push(
                    <Notification type="success" title="Éxito">
                        Cuestionario eliminado correctamente
                    </Notification>
                )
                navigate('/app/questionnaires')
            } catch (error) {
                toast.push(
                    <Notification type="danger" title="Error">
                        No se pudo eliminar el cuestionario
                    </Notification>
                )
            }
        }
    }

    const getQuestionTypeLabel = (type: string) => {
        const types: Record<string, string> = {
            ShortAnswer: 'Respuesta corta',
            LongAnswer: 'Párrafo',
            SingleChoice: 'Selección única',
            MultipleChoice: 'Selección múltiple',
            Dropdown: 'Lista desplegable',
            LinearScale: 'Escala lineal',
            Rating: 'Valoración',
            Date: 'Fecha',
            Time: 'Hora',
            FileUpload: 'Carga de archivo',
        }
        return types[type] || type
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    if (!questionnaire) {
        return null
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <Button
                    size="sm"
                    variant="plain"
                    icon={<HiArrowLeft />}
                    onClick={() => navigate('/app/questionnaires')}
                    className="mb-4"
                >
                    Volver
                </Button>

                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {questionnaire.title}
                            </h1>
                            {questionnaire.isTemplate && (
                                <Badge className="bg-blue-100 text-blue-800">
                                    Plantilla
                                </Badge>
                            )}
                        </div>
                        {questionnaire.description && (
                            <p className="text-gray-600">{questionnaire.description}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                        <Button
                            variant="solid"
                            icon={<HiPencil />}
                            onClick={() => navigate(`/app/questionnaires/${id}/edit`)}
                        >
                            Editar
                        </Button>
                        <Button
                            variant="default"
                            icon={<HiClipboardList />}
                            onClick={() => navigate(`/app/questionnaires/${id}/responses`)}
                        >
                            Ver Respuestas
                        </Button>
                        <Button
                            variant="plain"
                            icon={<HiTrash />}
                            className="text-red-600 hover:text-red-700"
                            onClick={handleDelete}
                        />
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="p-4">
                    <div className="text-sm text-gray-600 mb-1">Total de Preguntas</div>
                    <div className="text-3xl font-bold text-indigo-600">
                        {questionnaire.questions.length}
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm text-gray-600 mb-1">Respuestas Recibidas</div>
                    <div className="text-3xl font-bold text-green-600">
                        {questionnaire.responseCount}
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm text-gray-600 mb-1">Estado</div>
                    <div className="flex items-center gap-2 mt-2">
                        <Badge className={questionnaire.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {questionnaire.isActive ? 'Activo' : 'Inactivo'}
                        </Badge>
                    </div>
                </Card>
            </div>

            {/* Questions */}
            <Card className="mb-6">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Preguntas</h2>
                </div>
                <div className="p-6 space-y-6">
                    {questionnaire.questions.map((question, index) => (
                        <div key={question.id} className="border-l-4 border-indigo-500 pl-4">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-semibold text-gray-500">
                                            {index + 1}.
                                        </span>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {question.text}
                                        </h3>
                                        {question.isRequired && (
                                            <span className="text-red-500 text-sm">*</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <Badge className="bg-gray-100 text-gray-700">
                                            {getQuestionTypeLabel(question.type)}
                                        </Badge>
                                        {question.hasDescription && question.description && (
                                            <span className="text-gray-500">{question.description}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Options */}
                            {(question.type === 'SingleChoice' ||
                                question.type === 'MultipleChoice' ||
                                question.type === 'Dropdown') &&
                                question.options && (
                                    <div className="mt-3 ml-6 space-y-2">
                                        {question.options.map((option) => (
                                            <div
                                                key={option.id}
                                                className="flex items-center gap-2 text-gray-700"
                                            >
                                                <span className="text-gray-400">•</span>
                                                <span>{option.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            {/* Scale/Rating Config */}
                            {question.type === 'LinearScale' && (
                                <div className="mt-3 ml-6 text-sm text-gray-600">
                                    Escala: {question.minValue} - {question.maxValue}
                                    {question.minLabel && (
                                        <span className="ml-2">
                                            ({question.minLabel} - {question.maxLabel})
                                        </span>
                                    )}
                                </div>
                            )}

                            {question.type === 'Rating' && (
                                <div className="mt-3 ml-6 text-sm text-gray-600">
                                    Valoración: {question.maxRating} estrellas
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Configuration */}
            <Card>
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Configuración</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Response Settings */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Respuestas
                            </h3>
                            <div className="space-y-2 text-sm">
                                <ConfigItem
                                    label="Permitir edición de respuestas"
                                    enabled={questionnaire.allowResponseEditing}
                                />
                                <ConfigItem
                                    label="Limitar a una respuesta"
                                    enabled={questionnaire.limitToOneResponse}
                                />
                                <ConfigItem
                                    label="Mostrar progreso en tiempo real"
                                    enabled={questionnaire.showProgressInRealTime}
                                />
                                <ConfigItem
                                    label="Orden aleatorio de preguntas"
                                    enabled={questionnaire.randomizeQuestionOrder}
                                />
                            </div>
                        </div>

                        {/* Participant Settings */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Seguimiento de Participantes
                            </h3>
                            <div className="space-y-2 text-sm">
                                <ConfigItem
                                    label="Requerir fecha y hora de validación"
                                    enabled={questionnaire.requireValidationDateTime}
                                />
                                <ConfigItem
                                    label="Requerir ubicación"
                                    enabled={questionnaire.requireLocation}
                                />
                                <ConfigItem
                                    label="Requerir carga de foto"
                                    enabled={questionnaire.requirePhotoUpload}
                                />
                                <ConfigItem
                                    label="Requerir firma del formador"
                                    enabled={questionnaire.requireTrainerSignature}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

interface ConfigItemProps {
    label: string
    enabled: boolean
}

const ConfigItem: React.FC<ConfigItemProps> = ({ label, enabled }) => (
    <div className="flex items-center gap-2">
        <div
            className={`w-4 h-4 rounded flex items-center justify-center ${
                enabled ? 'bg-green-500' : 'bg-gray-300'
            }`}
        >
            {enabled && <span className="text-white text-xs">✓</span>}
        </div>
        <span className={enabled ? 'text-gray-900' : 'text-gray-500'}>{label}</span>
    </div>
)

export default QuestionnaireDetailView
