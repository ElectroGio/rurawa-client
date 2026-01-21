import { useEffect } from 'react'
import { Input } from '@/components/ui'
import { useForm } from 'react-hook-form'

interface Step1Data {
    activityName: string
    activityType: 'Training' | 'Survey'
    activityDescription: string
    startDate: string
    endDate: string
    instructions?: string
}

interface Step1Props {
    data: Partial<Step1Data>
    onUpdate: (data: Partial<Step1Data>) => void
}

const Step1CreateActivity = ({ data, onUpdate }: Step1Props) => {
    const {
        register,
        watch,
        formState: { errors },
        setValue
    } = useForm<Step1Data>({
        defaultValues: data
    })

    // Watch all form fields and update parent on change
    const formData = watch()

    useEffect(() => {
        onUpdate(formData)
    }, [formData])

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Información básica de la actividad
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                    Complete los datos principales de la actividad que desea crear
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la actividad <span className="text-red-500">*</span>
                </label>
                <Input
                    {...register('activityName', {
                        required: 'El nombre es requerido',
                        minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                    })}
                    placeholder="Ej: Censo rural Alto Retiro"
                />
                {errors.activityName && (
                    <p className="text-red-500 text-xs mt-1">{errors.activityName.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de actividad <span className="text-red-500">*</span>
                </label>
                <select
                    {...register('activityType', { required: 'El tipo es requerido' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="Survey">Cuestionario</option>
                    <option value="Training">Capacitación</option>
                </select>
                {errors.activityType && (
                    <p className="text-red-500 text-xs mt-1">{errors.activityType.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                    <strong>Cuestionario:</strong> Para recolectar información mediante formularios.
                    <br />
                    <strong>Capacitación:</strong> Para entrenar y capacitar al equipo o agricultores.
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción <span className="text-red-500">*</span>
                </label>
                <Input
                    textArea
                    {...register('activityDescription', {
                        required: 'La descripción es requerida',
                        minLength: { value: 10, message: 'Mínimo 10 caracteres' }
                    })}
                    placeholder="Describa brevemente el objetivo de esta actividad..."
                    rows={4}
                />
                {errors.activityDescription && (
                    <p className="text-red-500 text-xs mt-1">{errors.activityDescription.message}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de inicio <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="date"
                        {...register('startDate', { required: 'La fecha de inicio es requerida' })}
                    />
                    {errors.startDate && (
                        <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de finalización <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="date"
                        {...register('endDate', {
                            required: 'La fecha de finalización es requerida',
                            validate: value => {
                                const start = watch('startDate')
                                if (start && value < start) {
                                    return 'La fecha de fin debe ser posterior a la de inicio'
                                }
                                return true
                            }
                        })}
                    />
                    {errors.endDate && (
                        <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instrucciones adicionales (Opcional)
                </label>
                <Input
                    textArea
                    {...register('instructions')}
                    placeholder="Proporcione instrucciones específicas para el equipo que ejecutará esta actividad..."
                    rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">
                    Estas instrucciones serán visibles para todos los miembros del equipo asignado
                </p>
            </div>
        </div>
    )
}

export default Step1CreateActivity
