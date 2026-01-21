import { useState, useEffect } from 'react'
import { Button, Input, Avatar } from '@/components/ui'
import { FaRoute, FaMapMarked, FaUser } from 'react-icons/fa'

interface WorkRouteItem {
    technicianId: string
    assignedVeredas: string[]
    farmsCount: number
    farmersCount: number
    mapRoute?: any
}

interface Step5Data {
    workRoutes: WorkRouteItem[]
}

interface Step5Props {
    activityId: string | null
    workZone?: {
        veredas: string[]
    }
    data: Partial<Step5Data>
    onUpdate: (data: Partial<Step5Data>) => void
}

// Mock technicians (in real app, filter from team members with role "Tecnico")
const mockTechnicians = [
    { id: '1', firstName: 'Pedro', lastName: 'Sánchez', email: 'pedro@example.com' },
    { id: '2', firstName: 'Laura', lastName: 'Torres', email: 'laura@example.com' },
    { id: '3', firstName: 'Miguel', lastName: 'Ramírez', email: 'miguel@example.com' }
]

const Step5DelegateRoute = ({ activityId, workZone, data, onUpdate }: Step5Props) => {
    const [workRoutes, setWorkRoutes] = useState<WorkRouteItem[]>(data.workRoutes || [])
    const [selectedTech, setSelectedTech] = useState('')
    const [selectedVeredas, setSelectedVeredas] = useState<string[]>([])
    const [farmsCount, setFarmsCount] = useState(0)
    const [farmersCount, setFarmersCount] = useState(0)

    const availableVeredas = workZone?.veredas || []

    // Get already assigned veredas
    const assignedVeredas = workRoutes.flatMap(r => r.assignedVeredas)

    const handleVeredaToggle = (vereda: string) => {
        if (selectedVeredas.includes(vereda)) {
            setSelectedVeredas(selectedVeredas.filter(v => v !== vereda))
        } else {
            setSelectedVeredas([...selectedVeredas, vereda])
        }
    }

    const handleAddRoute = () => {
        if (!selectedTech) {
            alert('Seleccione un técnico')
            return
        }
        if (selectedVeredas.length === 0) {
            alert('Seleccione al menos una vereda')
            return
        }

        // Check if technician already has a route
        const techHasRoute = workRoutes.some(r => r.technicianId === selectedTech)
        if (techHasRoute) {
            alert('Este técnico ya tiene una ruta asignada')
            return
        }

        const newRoute: WorkRouteItem = {
            technicianId: selectedTech,
            assignedVeredas: selectedVeredas,
            farmsCount: farmsCount,
            farmersCount: farmersCount
        }

        const updatedRoutes = [...workRoutes, newRoute]
        setWorkRoutes(updatedRoutes)
        onUpdate({ workRoutes: updatedRoutes })

        // Reset form
        setSelectedTech('')
        setSelectedVeredas([])
        setFarmsCount(0)
        setFarmersCount(0)
    }

    const handleRemoveRoute = (technicianId: string) => {
        const updatedRoutes = workRoutes.filter(r => r.technicianId !== technicianId)
        setWorkRoutes(updatedRoutes)
        onUpdate({ workRoutes: updatedRoutes })
    }

    const getTechnicianDetails = (technicianId: string) => {
        return mockTechnicians.find(t => t.id === technicianId)
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    <FaRoute className="inline mr-2 text-blue-600" />
                    Delegar ruta de trabajo
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                    Asigna técnicos a las veredas de la zona de trabajo y define las metas de trabajo
                </p>
            </div>

            {availableVeredas.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">
                        No hay veredas definidas en la zona de trabajo.
                        Vuelva al paso 3 para configurar la zona.
                    </p>
                </div>
            ) : (
                <>
                    {/* Add Route Form */}
                    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">
                            Asignar nueva ruta
                        </h4>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Técnico <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={selectedTech}
                                    onChange={(e) => setSelectedTech(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Seleccione un técnico</option>
                                    {mockTechnicians.map((tech) => (
                                        <option key={tech.id} value={tech.id}>
                                            {tech.firstName} {tech.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Veredas asignadas <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-white">
                                    {availableVeredas.map((vereda) => {
                                        const isAssigned = assignedVeredas.includes(vereda)
                                        const isSelected = selectedVeredas.includes(vereda)

                                        return (
                                            <label
                                                key={vereda}
                                                className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                                                    isAssigned && !isSelected
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : isSelected
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'hover:bg-gray-50'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleVeredaToggle(vereda)}
                                                    disabled={isAssigned && !isSelected}
                                                    className="rounded"
                                                />
                                                <span className="text-sm">{vereda}</span>
                                            </label>
                                        )
                                    })}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {selectedVeredas.length} de {availableVeredas.length} veredas seleccionadas
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meta de fincas
                                    </label>
                                    <Input
                                        type="number"
                                        min={0}
                                        value={farmsCount}
                                        onChange={(e) => setFarmsCount(Number(e.target.value))}
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meta de agricultores
                                    </label>
                                    <Input
                                        type="number"
                                        min={0}
                                        value={farmersCount}
                                        onChange={(e) => setFarmersCount(Number(e.target.value))}
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <Button
                                variant="solid"
                                onClick={handleAddRoute}
                                className="w-full"
                            >
                                Agregar ruta
                            </Button>
                        </div>
                    </div>

                    {/* Assigned Routes */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                            Rutas asignadas ({workRoutes.length})
                        </h4>

                        {workRoutes.length === 0 ? (
                            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                                <FaMapMarked className="mx-auto text-gray-400 mb-2" size={32} />
                                <p className="text-sm text-gray-500">
                                    No hay rutas asignadas aún
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {workRoutes.map((route) => {
                                    const tech = getTechnicianDetails(route.technicianId)
                                    if (!tech) return null

                                    return (
                                        <div
                                            key={route.technicianId}
                                            className="border border-gray-200 rounded-lg p-4 bg-white"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        size={40}
                                                        shape="circle"
                                                        className="bg-blue-500 text-white"
                                                    >
                                                        {tech.firstName[0]}
                                                        {tech.lastName[0]}
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {tech.firstName} {tech.lastName}
                                                        </p>
                                                        <p className="text-xs text-gray-500">{tech.email}</p>
                                                    </div>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="plain"
                                                    onClick={() => handleRemoveRoute(route.technicianId)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    Eliminar
                                                </Button>
                                            </div>

                                            <div className="space-y-2 text-sm">
                                                <div>
                                                    <span className="font-medium text-gray-700">Veredas: </span>
                                                    <span className="text-gray-600">
                                                        {route.assignedVeredas.join(', ')}
                                                    </span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div>
                                                        <span className="font-medium text-gray-700">Fincas: </span>
                                                        <span className="text-gray-600">{route.farmsCount}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-700">Agricultores: </span>
                                                        <span className="text-gray-600">{route.farmersCount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Map Placeholder */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                        <FaMapMarked className="mx-auto text-gray-400 mb-3" size={40} />
                        <p className="text-sm text-gray-600 mb-2">
                            Visualización de rutas en mapa
                        </p>
                        <p className="text-xs text-gray-500">
                            Aquí se mostrará el mapa con las rutas asignadas a cada técnico
                        </p>
                    </div>
                </>
            )}

            {/* Info */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">🛣️ Sobre las rutas</h4>
                <p className="text-sm text-gray-600">
                    Cada técnico debe tener asignadas las veredas donde trabajará. Las metas de fincas
                    y agricultores ayudan a planificar y medir el avance de la actividad en campo.
                </p>
            </div>
        </div>
    )
}

export default Step5DelegateRoute
