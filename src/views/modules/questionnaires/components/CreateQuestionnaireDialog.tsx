import React, { useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Tabs from '@/components/ui/Tabs'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { apiCreateQuestionnaire } from '@/services/QuestionnaireService'
import type {
    CreateQuestionnaireRequest,
    CreateQuestionRequest,
    QuestionType,
} from '@/@types/questionnaire/questionnaire.types'
import QuestionBuilder from './QuestionBuilder'
import QuestionnaireConfiguration from './QuestionnaireConfiguration'
import QuestionnairePreview from './QuestionnairePreview'

const { TabNav, TabList, TabContent } = Tabs

interface CreateQuestionnaireDialogProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

const CreateQuestionnaireDialog: React.FC<CreateQuestionnaireDialogProps> = ({
    isOpen,
    onClose,
    onSuccess,
}) => {
    const [activeTab, setActiveTab] = useState('questions')
    const [loading, setLoading] = useState(false)
    
    const [formData, setFormData] = useState<CreateQuestionnaireRequest>({
        title: '',
        description: '',
        isTemplate: false,
        questions: [],
        allowResponseEditing: false,
        disableAutoSave: false,
        limitToOneResponse: true,
        showProgressInRealTime: true,
        randomizeQuestionOrder: false,
        requireValidationDateTime: true,
        requireLocation: false,
        requirePhotoUpload: false,
        requireTrainerSignature: false,
        generateParticipantList: true,
        allowEditAfterSubmission: false,
        sendResponseCopyToParticipants: false,
    })

    const handleAddQuestion = (question: CreateQuestionRequest) => {
        setFormData({
            ...formData,
            questions: [...formData.questions, { ...question, order: formData.questions.length }],
        })
    }

    const handleUpdateQuestion = (index: number, question: CreateQuestionRequest) => {
        const updatedQuestions = [...formData.questions]
        updatedQuestions[index] = question
        setFormData({ ...formData, questions: updatedQuestions })
    }

    const handleDeleteQuestion = (index: number) => {
        const updatedQuestions = formData.questions.filter((_, i) => i !== index)
        setFormData({ ...formData, questions: updatedQuestions })
    }

    const handleSubmit = async () => {
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
            setLoading(true)
            await apiCreateQuestionnaire(formData)
            toast.push(
                <Notification type="success" title="Éxito">
                    Cuestionario creado correctamente
                </Notification>
            )
            onSuccess()
            handleClose()
        } catch (error) {
            toast.push(
                <Notification type="danger" title="Error">
                    No se pudo crear el cuestionario
                </Notification>
            )
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setFormData({
            title: '',
            description: '',
            isTemplate: false,
            questions: [],
            allowResponseEditing: false,
            disableAutoSave: false,
            limitToOneResponse: true,
            showProgressInRealTime: true,
            randomizeQuestionOrder: false,
            requireValidationDateTime: true,
            requireLocation: false,
            requirePhotoUpload: false,
            requireTrainerSignature: false,
            generateParticipantList: true,
            allowEditAfterSubmission: false,
            sendResponseCopyToParticipants: false,
        })
        setActiveTab('questions')
        onClose()
    }

    return (
        <Dialog
            isOpen={isOpen}
            onClose={handleClose}
            width={1000}
        >
            <div className="p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Nuevo Cuestionario
                    </h2>
                    <div className="space-y-4">
                        <Input
                            placeholder="Título del cuestionario"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                        />
                        <Input
                            textArea
                            placeholder="Descripción (opcional)"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        />
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

                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="plain" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="solid"
                        onClick={handleSubmit}
                        loading={loading}
                    >
                        Crear Cuestionario
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default CreateQuestionnaireDialog
