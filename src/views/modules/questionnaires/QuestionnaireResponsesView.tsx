import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Table from '@/components/ui/Table'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { HiArrowLeft, HiDownload, HiEye } from 'react-icons/hi'
import {
    apiGetQuestionnaireById,
    apiGetQuestionnaireResponses,
    apiExportQuestionnaireToExcel,
    apiExportQuestionnaireToPdf,
} from '@/services/QuestionnaireService'
import type {
    QuestionnaireDetail,
    QuestionnaireResponseDTO,
} from '@/@types/questionnaire/questionnaire.types'

const { Tr, Th, Td, THead, TBody } = Table

const QuestionnaireResponsesView = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [questionnaire, setQuestionnaire] = useState<QuestionnaireDetail | null>(null)
    const [responses, setResponses] = useState<QuestionnaireResponseDTO[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedResponse, setSelectedResponse] = useState<QuestionnaireResponseDTO | null>(null)

    useEffect(() => {
        if (id) {
            loadData()
        }
    }, [id])

    const loadData = async () => {
        try {
            setLoading(true)
            const [questionnaireRes, responsesRes] = await Promise.all([
                apiGetQuestionnaireById(id!),
                apiGetQuestionnaireResponses(id!),
            ])
            setQuestionnaire(questionnaireRes.data)
            setResponses(responsesRes.data)
        } catch (error) {
            toast.push(
                <Notification type="danger" title="Error">
                    No se pudieron cargar las respuestas
                </Notification>
            )
        } finally {
            setLoading(false)
        }
    }

    const calculateStatistics = () => {
        if (!questionnaire || responses.length === 0) return null

        const stats: Record<
            string,
            {
                type: string
                text: string
                responses: any[]
                optionCounts?: Record<string, number>
                average?: number
            }
        > = {}

        questionnaire.questions.forEach((question) => {
            stats[question.id] = {
                type: question.type,
                text: question.text,
                responses: [],
                optionCounts: {},
            }

            // Count responses for this question
            responses.forEach((response) => {
                const answer = response.answers?.find((a) => a.questionId === question.id)
                if (answer) {
                    stats[question.id].responses.push(answer)

                    // For choice questions, count options
                    if (
                        question.type === 'SingleChoice' ||
                        question.type === 'MultipleChoice' ||
                        question.type === 'Dropdown'
                    ) {
                        answer.selectedOptionIds?.forEach((optionId) => {
                            stats[question.id].optionCounts![optionId] =
                                (stats[question.id].optionCounts![optionId] || 0) + 1
                        })
                    }

                    // For numeric questions, calculate average
                    if (
                        question.type === 'LinearScale' ||
                        question.type === 'Rating'
                    ) {
                        if (answer.numericAnswer !== undefined) {
                            const currentSum =
                                (stats[question.id].average || 0) *
                                (stats[question.id].responses.length - 1)
                            stats[question.id].average =
                                (currentSum + answer.numericAnswer) /
                                stats[question.id].responses.length
                        }
                    }
                }
            })
        })

        return stats
    }

    const handleExportToExcel = async () => {
        try {
            toast.push(
                <Notification type="info" title="Exportando">
                    Generando archivo Excel...
                </Notification>
            )
            const response = await apiExportQuestionnaireToExcel(id!)
            
            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `cuestionario_${id}_${new Date().toISOString().split('T')[0]}.xlsx`)
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
            
            toast.push(
                <Notification type="success" title="Éxito">
                    Archivo Excel descargado correctamente
                </Notification>
            )
        } catch (error) {
            toast.push(
                <Notification type="danger" title="Error">
                    No se pudo exportar a Excel
                </Notification>
            )
        }
    }

    const handleExportToPDF = async () => {
        try {
            toast.push(
                <Notification type="info" title="Exportando">
                    Generando archivo PDF...
                </Notification>
            )
            const response = await apiExportQuestionnaireToPdf(id!)
            
            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `cuestionario_${id}_${new Date().toISOString().split('T')[0]}.pdf`)
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
            
            toast.push(
                <Notification type="success" title="Éxito">
                    Archivo PDF descargado correctamente
                </Notification>
            )
        } catch (error) {
            toast.push(
                <Notification type="danger" title="Error">
                    No se pudo exportar a PDF
                </Notification>
            )
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const statistics = calculateStatistics()

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
        <div className="p-6 max-w-7xl mx-auto">
            <Button
                size="sm"
                variant="plain"
                icon={<HiArrowLeft />}
                onClick={() => navigate(`/app/questionnaires/${id}`)}
                className="mb-4"
            >
                Volver
            </Button>

            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Respuestas - {questionnaire.title}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {responses.length} respuestas recibidas
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="default"
                            icon={<HiDownload />}
                            onClick={handleExportToExcel}
                        >
                            Exportar Excel
                        </Button>
                        <Button
                            variant="default"
                            icon={<HiDownload />}
                            onClick={handleExportToPDF}
                        >
                            Exportar PDF
                        </Button>
                    </div>
                </div>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <Card className="p-4">
                    <div className="text-sm text-gray-600 mb-1">Total Respuestas</div>
                    <div className="text-3xl font-bold text-indigo-600">{responses.length}</div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm text-gray-600 mb-1">Total Preguntas</div>
                    <div className="text-3xl font-bold text-green-600">
                        {questionnaire.questions.length}
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm text-gray-600 mb-1">Tasa de Respuesta</div>
                    <div className="text-3xl font-bold text-blue-600">
                        {responses.length > 0 ? '100%' : '0%'}
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm text-gray-600 mb-1">Promedio por Pregunta</div>
                    <div className="text-3xl font-bold text-purple-600">
                        {responses.length > 0
                            ? (
                                  responses.reduce(
                                      (sum, r) => sum + (r.answers?.length || 0),
                                      0
                                  ) / responses.length
                              ).toFixed(1)
                            : 0}
                    </div>
                </Card>
            </div>

            {/* Question Statistics */}
            {statistics && (
                <Card className="mb-6">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Estadísticas por Pregunta
                        </h2>
                    </div>
                    <div className="p-6 space-y-8">
                        {questionnaire.questions.map((question, index) => {
                            const stat = statistics[question.id]
                            if (!stat) return null

                            return (
                                <div key={question.id} className="border-l-4 border-indigo-500 pl-4">
                                    <div className="mb-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                    {index + 1}. {question.text}
                                                </h3>
                                                <Badge className="bg-gray-100 text-gray-700">
                                                    {stat.responses.length} respuestas
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Choice Questions - Bar Chart */}
                                    {(question.type === 'SingleChoice' ||
                                        question.type === 'MultipleChoice' ||
                                        question.type === 'Dropdown') &&
                                        question.options && (
                                            <div className="space-y-3">
                                                {question.options.map((option) => {
                                                    const count =
                                                        stat.optionCounts?.[option.id] || 0
                                                    const percentage =
                                                        responses.length > 0
                                                            ? (count / responses.length) * 100
                                                            : 0

                                                    return (
                                                        <div key={option.id}>
                                                            <div className="flex items-center justify-between text-sm mb-1">
                                                                <span className="text-gray-700">
                                                                    {option.text}
                                                                </span>
                                                                <span className="text-gray-600">
                                                                    {count} ({percentage.toFixed(1)}%)
                                                                </span>
                                                            </div>
                                                            <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-indigo-600 transition-all"
                                                                    style={{
                                                                        width: `${percentage}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}

                                    {/* Numeric Questions - Average */}
                                    {(question.type === 'LinearScale' ||
                                        question.type === 'Rating') &&
                                        stat.average !== undefined && (
                                            <div className="flex items-center gap-4">
                                                <div className="text-4xl font-bold text-indigo-600">
                                                    {stat.average.toFixed(2)}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {question.type === 'LinearScale'
                                                        ? `Promedio (${question.minValue} - ${question.maxValue})`
                                                        : `Promedio (0 - ${question.maxRating})`}
                                                </div>
                                            </div>
                                        )}

                                    {/* Text Questions - Sample Responses */}
                                    {(question.type === 'ShortAnswer' ||
                                        question.type === 'LongAnswer') &&
                                        stat.responses.length > 0 && (
                                            <div className="space-y-2">
                                                <div className="text-sm font-medium text-gray-700">
                                                    Respuestas recientes:
                                                </div>
                                                {stat.responses.slice(0, 3).map((answer, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="p-3 bg-gray-50 rounded text-sm text-gray-700"
                                                    >
                                                        {answer.textAnswer}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                </div>
                            )
                        })}
                    </div>
                </Card>
            )}

            {/* Responses Table */}
            <Card>
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Respuestas Individuales
                    </h2>
                </div>
                <Table>
                    <THead>
                        <Tr>
                            <Th>Participante</Th>
                            <Th>Fecha</Th>
                            <Th>Respuestas</Th>
                            <Th>Ubicación</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {responses.length === 0 ? (
                            <Tr>
                                <Td colSpan={5} className="text-center py-8 text-gray-500">
                                    No hay respuestas todavía
                                </Td>
                            </Tr>
                        ) : (
                            responses.map((response) => (
                                <Tr key={response.id}>
                                    <Td>
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {response.respondentName || 'Anónimo'}
                                            </div>
                                            {response.respondentEmail && (
                                                <div className="text-sm text-gray-500">
                                                    {response.respondentEmail}
                                                </div>
                                            )}
                                        </div>
                                    </Td>
                                    <Td>
                                        <span className="text-sm text-gray-600">
                                            {formatDate(response.submittedAt)}
                                        </span>
                                    </Td>
                                    <Td>
                                        <Badge className="bg-green-100 text-green-800">
                                            {response.answers?.length || 0} respuestas
                                        </Badge>
                                    </Td>
                                    <Td>
                                        {response.location ? (
                                            <span className="text-sm text-gray-600">
                                                📍 {response.location}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-gray-400">
                                                Sin ubicación
                                            </span>
                                        )}
                                    </Td>
                                    <Td>
                                        <Button
                                            size="sm"
                                            variant="plain"
                                            icon={<HiEye />}
                                            onClick={() => setSelectedResponse(response)}
                                        >
                                            Ver
                                        </Button>
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </TBody>
                </Table>
            </Card>

            {/* Response Detail Modal */}
            {selectedResponse && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedResponse(null)}
                >
                    <div
                        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Detalle de Respuesta
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                {selectedResponse.respondentName || 'Anónimo'} -{' '}
                                {formatDate(selectedResponse.submittedAt)}
                            </p>
                        </div>
                        <div className="p-6 space-y-4">
                            {selectedResponse.answers?.map((answer) => {
                                const question = questionnaire.questions.find(
                                    (q) => q.id === answer.questionId
                                )
                                if (!question) return null

                                return (
                                    <div key={answer.questionId} className="border-b pb-4">
                                        <h4 className="font-medium text-gray-900 mb-2">
                                            {question.text}
                                        </h4>
                                        <div className="text-gray-700">
                                            {answer.textAnswer && (
                                                <p className="bg-gray-50 p-3 rounded">
                                                    {answer.textAnswer}
                                                </p>
                                            )}
                                            {answer.numericAnswer !== undefined && (
                                                <p className="bg-gray-50 p-3 rounded">
                                                    {answer.numericAnswer}
                                                </p>
                                            )}
                                            {answer.selectedOptionIds &&
                                                answer.selectedOptionIds.length > 0 && (
                                                    <ul className="list-disc list-inside space-y-1">
                                                        {answer.selectedOptionIds.map((optionId) => {
                                                            const option = question.options?.find(
                                                                (o) => o.id === optionId
                                                            )
                                                            return option ? (
                                                                <li key={optionId}>{option.text}</li>
                                                            ) : null
                                                        })}
                                                    </ul>
                                                )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="p-6 border-t flex justify-end">
                            <Button onClick={() => setSelectedResponse(null)}>Cerrar</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default QuestionnaireResponsesView
