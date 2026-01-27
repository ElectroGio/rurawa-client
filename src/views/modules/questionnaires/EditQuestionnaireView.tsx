import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Tabs from '@/components/ui/Tabs'
import Card from '@/components/ui/Card'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { HiArrowLeft, HiSave } from 'react-icons/hi'
import {
    apiGetQuestionnaireById,
    apiUpdateQuestionnaire,
} from '@/services/QuestionnaireService'
import type {
    QuestionnaireDetail,
    UpdateQuestionnaireRequest,
    CreateQuestionRequest,
} from '@/@types/questionnaire/questionnaire.types'
import QuestionBuilder from './components/QuestionBuilder'
import QuestionnaireConfiguration from './components/QuestionnaireConfiguration'
import QuestionnairePreview from './components/QuestionnairePreview'

const { TabNav, TabList, TabContent } = Tabs

const EditQuestionnaireView = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('questions')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState<UpdateQuestionnaireRequest | null>(null)

    useEffect(() => {
        if (id) {
            loadQuestionnaire()
        }
    }, [id])

    const loadQuestionnaire = async () => {
        try {
            setLoading(true)
            const response = await apiGetQuestionnaireById(id!)
            const questionnaire: QuestionnaireDetail = response.data

            // Convert to update format
            setFormData({
                title: questionnaire.title,
                description: questionnaire.description,
                isTemplate: questionnaire.isTemplate,
                questions: questionnaire.questions.map((q) => ({
                    text: q.text,
                    type: q.type,
                    order: q.order,
                    isRequired: q.isRequired,
                    hasDescription: q.hasDescription,
                    description: q.description,
                    options: q.options?.map((o) => ({
                        text: o.text,
                        order: o.order,
                    })),
                    minValue: q.minValue,
                    maxValue: q.maxValue,
                    minLabel: q.minLabel,
                    maxLabel: q.maxLabel,
                    maxRating: q.maxRating,
                    allowMultipleFiles: q.allowMultipleFiles,
                    maxFileSizeMB: q.maxFileSizeMB,
                })),
                allowResponseEditing: questionnaire.allowResponseEditing,
                disableAutoSave: questionnaire.disableAutoSave,
                limitToOneResponse: questionnaire.limitToOneResponse,
                showProgressInRealTime: questionnaire.showProgressInRealTime,
                randomizeQuestionOrder: questionnaire.randomizeQuestionOrder,
                requireValidationDateTime: questionnaire.requireValidationDateTime,
                requireLocation: questionnaire.requireLocation,
                requirePhotoUpload: questionnaire.requirePhotoUpload,
                requireTrainerSignature: questionnaire.requireTrainerSignature,
                generateParticipantList: questionnaire.generateParticipantList,
                allowEditAfterSubmission: questionnaire.allowEditAfterSubmission,
                sendResponseCopyToParticipants:
                    questionnaire.sendResponseCopyToParticipants,
            })
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

    const handleAddQuestion = (question: CreateQuestionRequest) => {
        if (!formData) return
        setFormData({
            ...formData,
            questions: [...formData.questions, { ...question, order: formData.questions.length }],
        })
    }

    const handleUpdateQuestion = (index: number, question: CreateQuestionRequest) => {
        if (!formData) return
        const updatedQuestions = [...formData.questions]
        updatedQuestions[index] = question
        setFormData({ ...formData, questions: updatedQuestions })
    }

    const handleDeleteQuestion = (index: number) => {
        if (!formData) return
        const updatedQuestions = formData.questions.filter((_, i) => i !== index)
        setFormData({ ...formData, questions: updatedQuestions })
    }

    const handleSubmit = async () => {
        if (!formData) return

        if (!formData.title) {
            toast.push(
                <Notification type="warning" title="Advertencia">
                    El título es requerido
                </Notification>
            )
            return
        }

        if (formData.questions.length === 0) {
            toast.push(
                <Notification type="warning" title="Advertencia">
                    Debe agregar al menos una pregunta
                </Notification>
            )
            return
        }

        try {
            setSaving(true)
            await apiUpdateQuestionnaire(id!, formData)
            toast.push(
                <Notification type="success" title="Éxito">
                    Cuestionario actualizado correctamente
                </Notification>
            )
            navigate(`/app/questionnaires/${id}`)
        } catch (error) {
            toast.push(
                <Notification type="danger" title="Error">
                    No se pudo actualizar el cuestionario
                </Notification>
            )
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    if (!formData) {
        return null
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-6">
                <Button
                    size="sm"
                    variant="plain"
                    icon={<HiArrowLeft />}
                    onClick={() => navigate(`/app/questionnaires/${id}`)}
                    className="mb-4"
                >
                    Volver
                </Button>

                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Editar Cuestionario</h1>
                    <Button
                        variant="solid"
                        icon={<HiSave />}
                        onClick={handleSubmit}
                        loading={saving}
                    >
                        Guardar Cambios
                    </Button>
                </div>
            </div>

            <Card>
                <div className="p-6">
                    <div className="mb-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Título del cuestionario
                                </label>
                                <Input
                                    placeholder="Título del cuestionario"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Descripción (opcional)
                                </label>
                                <Input
                                    textArea
                                    placeholder="Descripción del cuestionario"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <Tabs value={activeTab} onChange={setActiveTab}>
                        <TabList>
                            <TabNav value="questions">📝 Preguntas</TabNav>
                            <TabNav value="configuration">⚙️ Configuración</TabNav>
                            <TabNav value="preview">👁️ Vista previa</TabNav>
                        </TabList>

                        <div className="mt-6">
                            <TabContent value="questions">
                                <QuestionBuilder
                                    questions={formData.questions}
                                    onAddQuestion={handleAddQuestion}
                                    onUpdateQuestion={handleUpdateQuestion}
                                    onDeleteQuestion={handleDeleteQuestion}
                                />
                            </TabContent>

                            <TabContent value="configuration">
                                <QuestionnaireConfiguration
                                    config={formData}
                                    onChange={setFormData}
                                />
                            </TabContent>

                            <TabContent value="preview">
                                <QuestionnairePreview
                                    title={formData.title}
                                    description={formData.description}
                                    questions={formData.questions}
                                />
                            </TabContent>
                        </div>
                    </Tabs>
                </div>
            </Card>

            <div className="mt-6 flex justify-end gap-3">
                <Button variant="plain" onClick={() => navigate(`/app/questionnaires/${id}`)}>
                    Cancelar
                </Button>
                <Button variant="solid" icon={<HiSave />} onClick={handleSubmit} loading={saving}>
                    Guardar Cambios
                </Button>
            </div>
        </div>
    )
}

export default EditQuestionnaireView
