import React from 'react'
import type { CreateQuestionRequest } from '@/@types/questionnaire/questionnaire.types'

interface QuestionnairePreviewProps {
    title: string
    description?: string
    questions: CreateQuestionRequest[]
}

const questionTypeLabels: Record<number, string> = {
    1: 'Respuesta corta',
    2: 'Respuesta larga',
    3: 'Opción múltiple (única)',
    4: 'Casillas de verificación (múltiple)',
    5: 'Lista desplegable',
    6: 'Escala lineal',
    7: 'Calificación',
    8: 'Fecha',
    9: 'Hora',
    10: 'Cargar imagen',
}

const QuestionnairePreview: React.FC<QuestionnairePreviewProps> = ({
    title,
    description,
    questions,
}) => {
    return (
        <div className="bg-white rounded-lg border p-8 max-w-3xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {title || 'Título del cuestionario'}
                </h2>
                {description && (
                    <p className="text-gray-600">{description}</p>
                )}
            </div>

            {questions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    No hay preguntas agregadas
                </div>
            ) : (
                <div className="space-y-8">
                    {questions.map((question, index) => (
                        <div key={index} className="pb-6 border-b last:border-b-0">
                            <div className="mb-4">
                                <div className="flex items-start gap-2 mb-2">
                                    <span className="font-semibold text-gray-700">
                                        {index + 1}.
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">
                                            {question.questionText}
                                            {question.isRequired && (
                                                <span className="text-red-500 ml-1">*</span>
                                            )}
                                        </h3>
                                        {question.description && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                {question.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Respuesta corta */}
                            {question.type === 1 && (
                                <input
                                    type="text"
                                    disabled
                                    className="w-full border-b border-gray-300 py-2 px-0 focus:outline-none"
                                    placeholder="Tu respuesta"
                                />
                            )}

                            {/* Respuesta larga */}
                            {question.type === 2 && (
                                <textarea
                                    disabled
                                    rows={4}
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none"
                                    placeholder="Tu respuesta"
                                />
                            )}

                            {/* Opción múltiple (única) */}
                            {question.type === 3 && (
                                <div className="space-y-2">
                                    {question.options.map((option, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                disabled
                                                name={`question-${index}`}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-gray-700">
                                                {option.optionText}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Casillas de verificación (múltiple) */}
                            {question.type === 4 && (
                                <div className="space-y-2">
                                    {question.options.map((option, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                disabled
                                                className="w-4 h-4"
                                            />
                                            <span className="text-gray-700">
                                                {option.optionText}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Lista desplegable */}
                            {question.type === 5 && (
                                <select
                                    disabled
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none"
                                >
                                    <option value="">Selecciona una opción</option>
                                    {question.options.map((option, i) => (
                                        <option key={i} value={option.optionText}>
                                            {option.optionText}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {/* Escala lineal */}
                            {question.type === 6 && (
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                        {question.minScaleLabel || question.minScale || 1}
                                    </span>
                                    <div className="flex gap-2">
                                        {Array.from(
                                            {
                                                length:
                                                    (question.maxScale || 5) -
                                                    (question.minScale || 1) +
                                                    1,
                                            },
                                            (_, i) => (
                                                <button
                                                    key={i}
                                                    disabled
                                                    className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100"
                                                >
                                                    {(question.minScale || 1) + i}
                                                </button>
                                            )
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {question.maxScaleLabel || question.maxScale || 5}
                                    </span>
                                </div>
                            )}

                            {/* Calificación (estrellas) */}
                            {question.type === 7 && (
                                <div className="flex gap-1">
                                    {Array.from(
                                        { length: question.maxRating || 5 },
                                        (_, i) => (
                                            <span
                                                key={i}
                                                className="text-3xl text-gray-300 cursor-pointer hover:text-yellow-400"
                                            >
                                                ★
                                            </span>
                                        )
                                    )}
                                </div>
                            )}

                            {/* Fecha */}
                            {question.type === 8 && (
                                <input
                                    type="date"
                                    disabled
                                    className="border border-gray-300 rounded p-2 focus:outline-none"
                                />
                            )}

                            {/* Hora */}
                            {question.type === 9 && (
                                <input
                                    type="time"
                                    disabled
                                    className="border border-gray-300 rounded p-2 focus:outline-none"
                                />
                            )}

                            {/* Cargar imagen */}
                            {question.type === 10 && (
                                <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                                    <span className="text-gray-500">
                                        📷 Cargar imagen
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-8 pt-6 border-t">
                <button
                    disabled
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium"
                >
                    Enviar
                </button>
            </div>
        </div>
    )
}

export default QuestionnairePreview
