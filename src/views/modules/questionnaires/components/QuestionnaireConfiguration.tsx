import React from 'react'
import Checkbox from '@/components/ui/Checkbox'
import type { CreateQuestionnaireRequest } from '@/@types/questionnaire/questionnaire.types'

interface QuestionnaireConfigurationProps {
    config: CreateQuestionnaireRequest
    onChange: (config: CreateQuestionnaireRequest) => void
}

const QuestionnaireConfiguration: React.FC<QuestionnaireConfigurationProps> = ({
    config,
    onChange,
}) => {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="font-semibold text-gray-900 mb-4">Respuestas</h3>
                <div className="space-y-3">
                    <Checkbox
                        checked={config.allowResponseEditing}
                        onChange={(checked) =>
                            onChange({ ...config, allowResponseEditing: checked })
                        }
                    >
                        Permitir la edición de las respuestas
                    </Checkbox>
                    <Checkbox
                        checked={config.disableAutoSave}
                        onChange={(checked) =>
                            onChange({ ...config, disableAutoSave: checked })
                        }
                    >
                        Inhabilitar el guardado automático
                    </Checkbox>
                    <Checkbox
                        checked={config.limitToOneResponse}
                        onChange={(checked) =>
                            onChange({ ...config, limitToOneResponse: checked })
                        }
                    >
                        Limitar a 1 respuesta
                    </Checkbox>
                    <Checkbox
                        checked={config.showProgressInRealTime}
                        onChange={(checked) =>
                            onChange({ ...config, showProgressInRealTime: checked })
                        }
                    >
                        Mostrar el progreso de los resultados en tiempo real
                    </Checkbox>
                    <Checkbox
                        checked={config.randomizeQuestionOrder}
                        onChange={(checked) =>
                            onChange({ ...config, randomizeQuestionOrder: checked })
                        }
                    >
                        Orden de las preguntas aleatorio
                    </Checkbox>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                    Detalle de participantes
                </h3>
                <p className="text-sm text-gray-600 mb-3">Seguimiento de registro</p>
                <div className="space-y-3">
                    <Checkbox
                        checked={config.requireValidationDateTime}
                        onChange={(checked) =>
                            onChange({ ...config, requireValidationDateTime: checked })
                        }
                    >
                        Fecha y hora (tiempo real de validación)
                    </Checkbox>
                    <Checkbox
                        checked={config.requireLocation}
                        onChange={(checked) =>
                            onChange({ ...config, requireLocation: checked })
                        }
                    >
                        Ubicación
                    </Checkbox>
                    <Checkbox
                        checked={config.requirePhotoUpload}
                        onChange={(checked) =>
                            onChange({ ...config, requirePhotoUpload: checked })
                        }
                    >
                        Subida de fotografía
                    </Checkbox>
                    <Checkbox
                        checked={config.requireTrainerSignature}
                        onChange={(checked) =>
                            onChange({ ...config, requireTrainerSignature: checked })
                        }
                    >
                        Firma de capacitador o responsable
                    </Checkbox>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                    Gestión de participantes
                </h3>
                <div className="space-y-3">
                    <Checkbox
                        checked={config.generateParticipantList}
                        onChange={(checked) =>
                            onChange({ ...config, generateParticipantList: checked })
                        }
                    >
                        Generar listado de participantes
                    </Checkbox>
                    <Checkbox
                        checked={config.allowEditAfterSubmission}
                        onChange={(checked) =>
                            onChange({ ...config, allowEditAfterSubmission: checked })
                        }
                    >
                        Editar respuesta después de ser enviada
                    </Checkbox>
                    <Checkbox
                        checked={config.sendResponseCopyToParticipants}
                        onChange={(checked) =>
                            onChange({
                                ...config,
                                sendResponseCopyToParticipants: checked,
                            })
                        }
                    >
                        Enviar copia de las respuestas a los que responden
                    </Checkbox>
                </div>
            </div>
        </div>
    )
}

export default QuestionnaireConfiguration
