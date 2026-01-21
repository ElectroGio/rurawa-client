import { useState } from 'react'
import { Button, Input } from '@/components/ui'
import { FaPlus, FaTrash, FaLink, FaFileUpload } from 'react-icons/fa'

interface Step2Data {
    attachedContent?: {
        questionnaireId?: string
        files?: File[]
        links?: string[]
    }
}

interface Step2Props {
    activityType: 'Training' | 'Survey'
    data: Partial<Step2Data>
    onUpdate: (data: Partial<Step2Data>) => void
}

const Step2AttachContent = ({ activityType, data, onUpdate }: Step2Props) => {
    const [links, setLinks] = useState<string[]>(data.attachedContent?.links || [])
    const [newLink, setNewLink] = useState('')
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(
        data.attachedContent?.questionnaireId || ''
    )

    // Mock questionnaires (replace with API call)
    const availableQuestionnaires = [
        { id: '1', name: 'Censo Rural Básico' },
        { id: '2', name: 'Encuesta de Productividad' },
        { id: '3', name: 'Evaluación de Capacitación' }
    ]

    const handleAddLink = () => {
        if (newLink.trim()) {
            const updatedLinks = [...links, newLink.trim()]
            setLinks(updatedLinks)
            setNewLink('')
            onUpdate({
                attachedContent: {
                    ...data.attachedContent,
                    links: updatedLinks
                }
            })
        }
    }

    const handleRemoveLink = (index: number) => {
        const updatedLinks = links.filter((_, i) => i !== index)
        setLinks(updatedLinks)
        onUpdate({
            attachedContent: {
                ...data.attachedContent,
                links: updatedLinks
            }
        })
    }

    const handleQuestionnaireChange = (questionnaireId: string) => {
        setSelectedQuestionnaire(questionnaireId)
        onUpdate({
            attachedContent: {
                ...data.attachedContent,
                questionnaireId
            }
        })
    }

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Adjuntar contenido
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                    {activityType === 'Survey'
                        ? 'Seleccione el cuestionario que se aplicará en esta actividad'
                        : 'Adjunte material de capacitación, presentaciones o documentos de referencia'}
                </p>
            </div>

            {activityType === 'Survey' ? (
                // Questionnaire Selection (for Survey activities)
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seleccionar cuestionario <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={selectedQuestionnaire}
                        onChange={(e) => handleQuestionnaireChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Seleccione un cuestionario</option>
                        {availableQuestionnaires.map((q) => (
                            <option key={q.id} value={q.id}>
                                {q.name}
                            </option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                        Este cuestionario se aplicará durante la ejecución de la actividad
                    </p>

                    {selectedQuestionnaire && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800">
                                <strong>Cuestionario seleccionado:</strong>{' '}
                                {availableQuestionnaires.find(q => q.id === selectedQuestionnaire)?.name}
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                // File Upload (for Training activities)
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subir archivos (Opcional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                        <FaFileUpload className="mx-auto text-gray-400 mb-3" size={32} />
                        <p className="text-sm text-gray-600 mb-2">
                            Arrastra archivos aquí o haz clic para seleccionar
                        </p>
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="text-blue-600 text-sm cursor-pointer hover:underline"
                        >
                            Seleccionar archivos
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                            PDF, Word, PowerPoint, Excel (Máx. 10MB por archivo)
                        </p>
                    </div>
                </div>
            )}

            {/* Links Section (Available for both types) */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaLink className="inline mr-2" />
                    Enlaces de referencia (Opcional)
                </label>
                <div className="flex gap-2 mb-3">
                    <Input
                        type="url"
                        placeholder="https://ejemplo.com/recurso"
                        value={newLink}
                        onChange={(e) => setNewLink(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleAddLink()
                            }
                        }}
                    />
                    <Button
                        variant="solid"
                        onClick={handleAddLink}
                        icon={<FaPlus />}
                    >
                        Agregar
                    </Button>
                </div>

                {links.length > 0 && (
                    <div className="space-y-2">
                        {links.map((link, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                            >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <FaLink className="text-blue-600 flex-shrink-0" />
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline truncate"
                                    >
                                        {link}
                                    </a>
                                </div>
                                <Button
                                    variant="plain"
                                    size="sm"
                                    onClick={() => handleRemoveLink(index)}
                                    icon={<FaTrash />}
                                    className="text-red-600 hover:text-red-700"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Info Box */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">💡 Sugerencia</h4>
                <p className="text-sm text-gray-600">
                    {activityType === 'Survey'
                        ? 'El cuestionario seleccionado estará disponible para los técnicos durante la actividad. Asegúrate de que el cuestionario esté completo y validado antes de iniciar.'
                        : 'Puedes compartir presentaciones, manuales, videos o cualquier material que apoye la capacitación. Los enlaces son útiles para recursos externos como videos de YouTube o documentos en la nube.'}
                </p>
            </div>
        </div>
    )
}

export default Step2AttachContent
