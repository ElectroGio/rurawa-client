import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import Checkbox from '@/components/ui/Checkbox'
import Radio from '@/components/ui/Radio'
import Select from '@/components/ui/Select'
import Upload from '@/components/ui/Upload'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { HiArrowLeft, HiCheckCircle } from 'react-icons/hi'
import {
    apiGetQuestionnaireById,
    apiSubmitQuestionnaireResponse,
} from '@/services/QuestionnaireService'
import type {
    QuestionnaireDetail,
    Question,
    SubmitQuestionnaireResponseRequest,
    QuestionAnswer,
} from '@/@types/questionnaire/questionnaire.types'

const RespondQuestionnaireView = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [questionnaire, setQuestionnaire] = useState<QuestionnaireDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [answers, setAnswers] = useState<Record<string, QuestionAnswer>>({})
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

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

    const handleAnswerChange = (questionId: string, answer: QuestionAnswer) => {
        setAnswers({
            ...answers,
            [questionId]: answer,
        })
    }

    const validateAnswers = (): boolean => {
        if (!questionnaire) return false

        const requiredQuestions = questionnaire.questions.filter((q) => q.isRequired)
        const missingAnswers = requiredQuestions.filter((q) => {
            const answer = answers[q.id]
            if (!answer) return true
            if (answer.textAnswer && answer.textAnswer.trim() === '') return true
            if (answer.selectedOptionIds && answer.selectedOptionIds.length === 0) return true
            return false
        })

        if (missingAnswers.length > 0) {
            toast.push(
                <Notification type="warning" title="Campos requeridos">
                    Por favor complete todas las preguntas obligatorias
                </Notification>
            )
            return false
        }

        return true
    }

    const handleSubmit = async () => {
        if (!validateAnswers()) return

        try {
            setSubmitting(true)
            const request: SubmitQuestionnaireResponseRequest = {
                answers: Object.entries(answers).map(([questionId, answer]) => ({
                    questionId,
                    ...answer,
                })),
            }

            await apiSubmitQuestionnaireResponse(id!, request)
            toast.push(
                <Notification type="success" title="Éxito">
                    Respuesta enviada correctamente
                </Notification>
            )
            navigate('/app/questionnaires')
        } catch (error) {
            toast.push(
                <Notification type="danger" title="Error">
                    No se pudo enviar la respuesta
                </Notification>
            )
        } finally {
            setSubmitting(false)
        }
    }

    const renderQuestion = (question: Question) => {
        const answer = answers[question.id] || {}

        switch (question.type) {
            case 'ShortAnswer':
                return (
                    <Input
                        placeholder="Ingrese su respuesta"
                        value={answer.textAnswer || ''}
                        onChange={(e) =>
                            handleAnswerChange(question.id, { textAnswer: e.target.value })
                        }
                    />
                )

            case 'LongAnswer':
                return (
                    <Input
                        textArea
                        placeholder="Ingrese su respuesta"
                        rows={4}
                        value={answer.textAnswer || ''}
                        onChange={(e) =>
                            handleAnswerChange(question.id, { textAnswer: e.target.value })
                        }
                    />
                )

            case 'SingleChoice':
                return (
                    <div className="space-y-3">
                        {question.options?.map((option) => (
                            <Radio
                                key={option.id}
                                name={`question-${question.id}`}
                                value={option.id}
                                checked={answer.selectedOptionIds?.[0] === option.id}
                                onChange={() =>
                                    handleAnswerChange(question.id, {
                                        selectedOptionIds: [option.id],
                                    })
                                }
                            >
                                {option.text}
                            </Radio>
                        ))}
                    </div>
                )

            case 'MultipleChoice':
                return (
                    <div className="space-y-3">
                        {question.options?.map((option) => (
                            <Checkbox
                                key={option.id}
                                checked={answer.selectedOptionIds?.includes(option.id) || false}
                                onChange={(checked) => {
                                    const currentIds = answer.selectedOptionIds || []
                                    const newIds = checked
                                        ? [...currentIds, option.id]
                                        : currentIds.filter((id) => id !== option.id)
                                    handleAnswerChange(question.id, {
                                        selectedOptionIds: newIds,
                                    })
                                }}
                            >
                                {option.text}
                            </Checkbox>
                        ))}
                    </div>
                )

            case 'Dropdown':
                return (
                    <Select
                        placeholder="Seleccione una opción"
                        value={answer.selectedOptionIds?.[0] || ''}
                        onChange={(e) =>
                            handleAnswerChange(question.id, {
                                selectedOptionIds: [e.target.value],
                            })
                        }
                        options={
                            question.options?.map((option) => ({
                                value: option.id,
                                label: option.text,
                            })) || []
                        }
                    />
                )

            case 'LinearScale':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{question.minLabel || question.minValue}</span>
                            <span>{question.maxLabel || question.maxValue}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            {Array.from(
                                { length: (question.maxValue || 5) - (question.minValue || 1) + 1 },
                                (_, i) => i + (question.minValue || 1)
                            ).map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    className={`w-12 h-12 rounded-full border-2 font-semibold transition-all ${
                                        answer.numericAnswer === value
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                                    }`}
                                    onClick={() =>
                                        handleAnswerChange(question.id, { numericAnswer: value })
                                    }
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </div>
                )

            case 'Rating':
                return (
                    <div className="flex items-center gap-2">
                        {Array.from({ length: question.maxRating || 5 }, (_, i) => i + 1).map(
                            (star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="text-3xl transition-colors"
                                    onClick={() =>
                                        handleAnswerChange(question.id, { numericAnswer: star })
                                    }
                                >
                                    {star <= (answer.numericAnswer || 0) ? '⭐' : '☆'}
                                </button>
                            )
                        )}
                    </div>
                )

            case 'Date':
                return (
                    <Input
                        type="date"
                        value={answer.textAnswer || ''}
                        onChange={(e) =>
                            handleAnswerChange(question.id, { textAnswer: e.target.value })
                        }
                    />
                )

            case 'Time':
                return (
                    <Input
                        type="time"
                        value={answer.textAnswer || ''}
                        onChange={(e) =>
                            handleAnswerChange(question.id, { textAnswer: e.target.value })
                        }
                    />
                )

            case 'FileUpload':
                return (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <Upload
                            multiple={question.allowMultipleFiles}
                            onChange={(files) => {
                                // Handle file upload
                                // For now just store file names
                                const fileNames = files.map((f) => f.name).join(', ')
                                handleAnswerChange(question.id, { textAnswer: fileNames })
                            }}
                        >
                            <div className="text-center">
                                <p className="text-gray-600">
                                    Click para subir archivo{question.allowMultipleFiles ? 's' : ''}
                                </p>
                                {question.maxFileSizeMB && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        Tamaño máximo: {question.maxFileSizeMB}MB
                                    </p>
                                )}
                            </div>
                        </Upload>
                    </div>
                )

            default:
                return null
        }
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

    const progress = questionnaire.showProgressInRealTime
        ? (Object.keys(answers).length / questionnaire.questions.length) * 100
        : 0

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto p-6">
                <Button
                    size="sm"
                    variant="plain"
                    icon={<HiArrowLeft />}
                    onClick={() => navigate('/app/questionnaires')}
                    className="mb-4"
                >
                    Volver
                </Button>

                <Card className="mb-6">
                    <div className="p-8">
                        <div className="border-l-4 border-indigo-600 pl-6 mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {questionnaire.title}
                            </h1>
                            {questionnaire.description && (
                                <p className="text-gray-600">{questionnaire.description}</p>
                            )}
                        </div>

                        {questionnaire.showProgressInRealTime && (
                            <div className="mb-6">
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                    <span>Progreso</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-600 transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                <div className="space-y-6">
                    {questionnaire.questions.map((question, index) => (
                        <Card key={question.id}>
                            <div className="p-6">
                                <div className="mb-4">
                                    <div className="flex items-start gap-2">
                                        <span className="text-sm font-semibold text-gray-500 mt-1">
                                            {index + 1}.
                                        </span>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {question.text}
                                                {question.isRequired && (
                                                    <span className="text-red-500 ml-1">*</span>
                                                )}
                                            </h3>
                                            {question.hasDescription && question.description && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {question.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="pl-6">{renderQuestion(question)}</div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 flex justify-between items-center">
                    <Button variant="plain" onClick={() => navigate('/app/questionnaires')}>
                        Cancelar
                    </Button>
                    <Button
                        variant="solid"
                        size="lg"
                        icon={<HiCheckCircle />}
                        onClick={handleSubmit}
                        loading={submitting}
                    >
                        Enviar Respuestas
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RespondQuestionnaireView
