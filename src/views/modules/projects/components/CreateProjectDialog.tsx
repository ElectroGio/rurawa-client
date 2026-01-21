import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { apiCreateProject } from '@/services/ProjectService'
import { useSessionUser } from '@/store/authStore'
import { FaUpload, FaLink } from 'react-icons/fa'
import { projectAvatars } from '@/utils/projectAvatars'

interface CreateProjectDialogProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

interface ProjectFormData {
    name: string
    description: string
    location: string
    startDate: string
    endDate: string
    imageUrl: string
    state: string
}

const departamentos = [
    'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá',
    'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba',
    'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena',
    'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda',
    'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca',
    'Vaupés', 'Vichada'
]

const CreateProjectDialog = ({ isOpen, onClose, onSuccess }: CreateProjectDialogProps) => {
    const { user: currentUser } = useSessionUser()
    const [loading, setLoading] = useState(false)
    const [selectedAvatar, setSelectedAvatar] = useState(projectAvatars[0].id)
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<ProjectFormData>({
        defaultValues: {
            state: 'Sin iniciar',
            imageUrl: projectAvatars[0].id
        }
    })

    const startDate = watch('startDate')

    const onSubmit = async (data: ProjectFormData) => {
        if (!currentUser?.companyId || !currentUser?.userId) {
            alert('No se encontró información de la compañía o usuario')
            return
        }

        setLoading(true)
        try {
            await apiCreateProject({
                name: data.name,
                description: data.description,
                location: data.location,
                startDate: data.startDate,
                endDate: data.endDate,
                imageUrl: selectedAvatar,
                state: data.state,
                companyId: currentUser.companyId,
                managerId: currentUser.userId
            })
            
            reset()
            setSelectedAvatar(projectAvatars[0].id)
            onSuccess()
            onClose()
        } catch (error) {
            console.error('Error creating project:', error)
            alert('Error al crear el proyecto')
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        reset()
        setSelectedAvatar(projectAvatars[0].id)
        onClose()
    }

    return (
        <Dialog isOpen={isOpen} onClose={handleClose} width={900} closable={false}>
            <div className="flex flex-col max-h-[90vh]">
                {/* Header fijo */}
                <div className="px-8 py-6 border-b">
                    <h2 className="text-2xl font-bold">Nuevo proyecto</h2>
                </div>
                
                {/* Contenido scrolleable */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                    <form onSubmit={handleSubmit(onSubmit)} id="project-form">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Columna izquierda - Formulario */}
                            <div className="lg:col-span-2 space-y-5">
                                {/* Nombre del proyecto */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Proyecto
                                    </label>
                                    <Input
                                        {...register('name', {
                                            required: 'El nombre es requerido',
                                            minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                                        })}
                                        placeholder="Nombre del proyecto"
                                        className="w-full"
                                    />
                                    {errors.name && (
                                        <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>
                                    )}
                                </div>

                                {/* Fechas */}
                                <div className="border-2 border-blue-500 rounded-lg p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Inicio</label>
                                            <Input
                                                type="date"
                                                {...register('startDate', { required: 'La fecha de inicio es requerida' })}
                                                className="w-full"
                                            />
                                            {errors.startDate && (
                                                <span className="text-red-500 text-xs mt-1">{errors.startDate.message}</span>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Límite</label>
                                            <Input
                                                type="date"
                                                {...register('endDate', {
                                                    required: 'La fecha límite es requerida',
                                                    validate: (value) =>
                                                        !startDate || value >= startDate || 'Debe ser mayor o igual a la fecha de inicio'
                                                })}
                                                className="w-full"
                                            />
                                            {errors.endDate && (
                                                <span className="text-red-500 text-xs mt-1">{errors.endDate.message}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Departamento */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Departamento
                                    </label>
                                    <select
                                        {...register('location', { required: 'Seleccione un departamento' })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Seleccione el departamento donde se ejecutará el proyecto</option>
                                        {departamentos.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                    {errors.location && (
                                        <span className="text-red-500 text-xs mt-1">{errors.location.message}</span>
                                    )}
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Descripción
                                    </label>
                                    <textarea
                                        {...register('description', { required: 'La descripción es requerida' })}
                                        rows={4}
                                        placeholder="Añade alguna descripción del proyecto."
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.description && (
                                        <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>
                                    )}
                                    {/* Botones de formato */}
                                    <div className="flex gap-2 mt-2">
                                        <button type="button" className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 font-bold">B</button>
                                        <button type="button" className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 italic">I</button>
                                        <button type="button" className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 underline">U</button>
                                        <button type="button" className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 line-through">T</button>
                                    </div>
                                    {/* Botones adjuntar y link */}
                                    <div className="flex gap-2 mt-3">
                                        <button type="button" className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg">
                                            <FaUpload />
                                        </button>
                                        <button type="button" className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                                            <FaLink />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Columna derecha - Selector de imagen */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-0">
                                    <label className="block text-sm font-medium mb-2">
                                        Seleccione una imagen
                                    </label>
                                    <p className="text-xs text-gray-500 mb-3">
                                        Selecciona o sube un avatar (formatos disponibles jpg, png)
                                    </p>
                                    <div className="grid grid-cols-3 gap-3">
                                        {projectAvatars.map((avatar) => (
                                            <div
                                                key={avatar.id}
                                                onClick={() => setSelectedAvatar(avatar.id)}
                                                className={`cursor-pointer rounded-lg p-3 border-2 transition-all aspect-square flex items-center justify-center ${
                                                    selectedAvatar === avatar.id
                                                        ? 'border-green-500 bg-green-50'
                                                        : 'border-gray-200 hover:border-gray-400'
                                                }`}
                                            >
                                                <div className={`w-full h-full ${avatar.color} rounded-lg flex items-center justify-center text-3xl`}>
                                                    {avatar.emoji}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer fijo */}
                <div className="px-8 py-4 border-t bg-gray-50 flex justify-end gap-3">
                    <Button type="button" onClick={handleClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button 
                        type="submit" 
                        variant="solid" 
                        loading={loading}
                        form="project-form"
                        className="bg-green-600 hover:bg-green-700"
                    >
                        Crear
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default CreateProjectDialog
