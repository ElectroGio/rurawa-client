import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Checkbox from '@/components/ui/Checkbox'
import { HiPlus, HiTrash, HiPencil } from 'react-icons/hi'
import type {
    CreateQuestionRequest,
    CreateQuestionOptionRequest,
    QuestionType,
} from '@/@types/questionnaire/questionnaire.types'

interface QuestionBuilderProps {
    questions: CreateQuestionRequest[]
    onAddQuestion: (question: CreateQuestionRequest) => void
    onUpdateQuestion: (index: number, question: CreateQuestionRequest) => void
    onDeleteQuestion: (index: number) => void
}

const questionTypes = [
    { value: 1, label: 'Respuesta corta' },
    { value: 2, label: 'Respuesta larga' },
    { value: 3, label: 'Opción múltiple (única)' },
    { value: 4, label: 'Casillas de verificación (múltiple)' },
    { value: 5, label: 'Lista desplegable' },
    { value: 6, label: 'Escala lineal' },
    { value: 7, label: 'Calificación' },
    { value: 8, label: 'Fecha' },
    { value: 9, label: 'Hora' },
    { value: 10, label: 'Cargar imagen' },
]

const QuestionBuilder: React.FC<QuestionBuilderProps> = ({
    questions,
    onAddQuestion,
    onUpdateQuestion,
    onDeleteQuestion,
}) => {
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState<CreateQuestionRequest>({
        questionText: '',
        description: '',
        type: 3 as QuestionType,
        order: 0,
        isRequired: false,
        options: [{ optionText: 'Opción 1', order: 0, isCorrect: false }],
    })

    const handleTypeChange = (type: QuestionType) => {
        const needsOptions = type === 3 || type === 4 || type === 5
        setCurrentQuestion({
            ...currentQuestion,
            type,
            options: needsOptions
                ? currentQuestion.options.length > 0
                    ? currentQuestion.options
                    : [{ optionText: 'Opción 1', order: 0, isCorrect: false }]
                : [],
        })
    }

    const handleAddOption = () => {
        setCurrentQuestion({
            ...currentQuestion,
            options: [
                ...currentQuestion.options,
                {
                    optionText: `Opción ${currentQuestion.options.length + 1}`,
                    order: currentQuestion.options.length,
                    isCorrect: false,
                },
            ],
        })
    }

    const handleUpdateOption = (index: number, text: string) => {
        const updatedOptions = [...currentQuestion.options]
        updatedOptions[index].optionText = text
        setCurrentQuestion({ ...currentQuestion, options: updatedOptions })
    }

    const handleDeleteOption = (index: number) => {
        const updatedOptions = currentQuestion.options.filter((_, i) => i !== index)
        setCurrentQuestion({ ...currentQuestion, options: updatedOptions })
    }

    const handleSaveQuestion = () => {
        if (!currentQuestion.questionText) return

        if (editingIndex !== null) {
            onUpdateQuestion(editingIndex, currentQuestion)
            setEditingIndex(null)
        } else {
            onAddQuestion(currentQuestion)
        }

        setCurrentQuestion({
            questionText: '',
            description: '',
            type: 3 as QuestionType,
            order: 0,
            isRequired: false,
            options: [{ optionText: 'Opción 1', order: 0, isCorrect: false }],
        })
        setShowAddForm(false)
    }

    const handleEditQuestion = (index: number) => {
        setCurrentQuestion(questions[index])
        setEditingIndex(index)
        setShowAddForm(true)
    }

    const handleCancelEdit = () => {
        setCurrentQuestion({
            questionText: '',
            description: '',
            type: 3 as QuestionType,
            order: 0,
            isRequired: false,
            options: [{ optionText: 'Opción 1', order: 0, isCorrect: false }],
        })
        setEditingIndex(null)
        setShowAddForm(false)
    }

    const needsOptions = currentQuestion.type === 3 || currentQuestion.type === 4 || currentQuestion.type === 5
    const needsScale = currentQuestion.type === 6
    const needsRating = currentQuestion.type === 7

    return (
        <div className="space-y-6">
            {/* Lista de preguntas */}
            <div className="space-y-4">
                {questions.map((question, index) => (
                    <div
                        key={index}
                        className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold text-gray-700">
                                        {index + 1}.
                                    </span>
                                    <h4 className="font-semibold text-gray-900">
                                        {question.questionText}
                                    </h4>
                                    {question.isRequired && (
                                        <span className="text-red-500">*</span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    {questionTypes.find((t) => t.value === question.type)?.label}
                                </p>
                                {question.options.length > 0 && (
                                    <div className="ml-6 space-y-1">
                                        {question.options.map((opt, i) => (
                                            <div key={i} className="text-sm text-gray-600">
                                                ○ {opt.optionText}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="plain"
                                    icon={<HiPencil />}
                                    onClick={() => handleEditQuestion(index)}
                                />
                                <Button
                                    size="sm"
                                    variant="plain"
                                    icon={<HiTrash />}
                                    className="text-red-600"
                                    onClick={() => onDeleteQuestion(index)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Formulario de agregar/editar pregunta */}
            {showAddForm ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white">
                    <h3 className="font-semibold text-gray-900 mb-4">
                        {editingIndex !== null ? 'Editar pregunta' : 'Nueva pregunta'}
                    </h3>

                    <div className="space-y-4">
                        <Input
                            placeholder="Escribe la pregunta"
                            value={currentQuestion.questionText}
                            onChange={(e) =>
                                setCurrentQuestion({
                                    ...currentQuestion,
                                    questionText: e.target.value,
                                })
                            }
                        />

                        <Select
                            value={questionTypes.find((t) => t.value === currentQuestion.type)}
                            options={questionTypes}
                            onChange={(option: any) => handleTypeChange(option.value)}
                        />

                        <Input
                            textArea
                            placeholder="Descripción (opcional)"
                            value={currentQuestion.description}
                            onChange={(e) =>
                                setCurrentQuestion({
                                    ...currentQuestion,
                                    description: e.target.value,
                                })
                            }
                        />

                        {needsOptions && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Opciones
                                </label>
                                {currentQuestion.options.map((option, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={option.optionText}
                                            onChange={(e) =>
                                                handleUpdateOption(index, e.target.value)
                                            }
                                        />
                                        {currentQuestion.options.length > 1 && (
                                            <Button
                                                size="sm"
                                                variant="plain"
                                                icon={<HiTrash />}
                                                onClick={() => handleDeleteOption(index)}
                                            />
                                        )}
                                    </div>
                                ))}
                                <Button
                                    size="sm"
                                    variant="plain"
                                    icon={<HiPlus />}
                                    onClick={handleAddOption}
                                >
                                    Agregar opción
                                </Button>
                            </div>
                        )}

                        {needsScale && (
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    type="number"
                                    placeholder="Mínimo (ej: 1)"
                                    value={currentQuestion.minScale || ''}
                                    onChange={(e) =>
                                        setCurrentQuestion({
                                            ...currentQuestion,
                                            minScale: parseInt(e.target.value) || 1,
                                        })
                                    }
                                />
                                <Input
                                    type="number"
                                    placeholder="Máximo (ej: 5)"
                                    value={currentQuestion.maxScale || ''}
                                    onChange={(e) =>
                                        setCurrentQuestion({
                                            ...currentQuestion,
                                            maxScale: parseInt(e.target.value) || 5,
                                        })
                                    }
                                />
                            </div>
                        )}

                        {needsRating && (
                            <Input
                                type="number"
                                placeholder="Número de estrellas (ej: 5)"
                                value={currentQuestion.maxRating || ''}
                                onChange={(e) =>
                                    setCurrentQuestion({
                                        ...currentQuestion,
                                        maxRating: parseInt(e.target.value) || 5,
                                    })
                                }
                            />
                        )}

                        <Checkbox
                            checked={currentQuestion.isRequired}
                            onChange={(checked) =>
                                setCurrentQuestion({
                                    ...currentQuestion,
                                    isRequired: checked,
                                })
                            }
                        >
                            Obligatoria
                        </Checkbox>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <Button variant="solid" onClick={handleSaveQuestion}>
                            {editingIndex !== null ? 'Guardar cambios' : 'Agregar pregunta'}
                        </Button>
                        <Button variant="plain" onClick={handleCancelEdit}>
                            Cancelar
                        </Button>
                    </div>
                </div>
            ) : (
                <Button
                    variant="plain"
                    icon={<HiPlus />}
                    className="w-full border-2 border-dashed border-gray-300 hover:border-gray-400"
                    onClick={() => setShowAddForm(true)}
                >
                    Agregar pregunta
                </Button>
            )}
        </div>
    )
}

export default QuestionBuilder
