import { useState, useEffect } from 'react'
import { Button, Input, Checkbox } from '@/components/ui'
import { FaMapMarkerAlt, FaSave } from 'react-icons/fa'
import { apiGetWorkZonesByProjectId } from '@/services/ProjectService'
import type { WorkZone } from '@/@types/project'

interface Step3Data {
    workZone?: {
        name: string
        municipality: string
        department: string
        veredas: string[]
        mapCoordinates?: any
    }
    useExistingZone?: boolean
    existingZoneId?: string
}

interface Step3Props {
    projectId: string
    data: Partial<Step3Data>
    onUpdate: (data: Partial<Step3Data>) => void
}

const departamentos = [
    'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá',
    'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba',
    'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena',
    'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda',
    'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca',
    'Vaupés', 'Vichada'
]

const Step3WorkZone = ({ projectId, data, onUpdate }: Step3Props) => {
    const [useExisting, setUseExisting] = useState(data.useExistingZone || false)
    const [existingZones, setExistingZones] = useState<WorkZone[]>([])
    const [selectedZoneId, setSelectedZoneId] = useState(data.existingZoneId || '')
    
    // New zone form
    const [zoneName, setZoneName] = useState(data.workZone?.name || '')
    const [department, setDepartment] = useState(data.workZone?.department || '')
    const [municipality, setMunicipality] = useState(data.workZone?.municipality || '')
    const [veredaInput, setVeredaInput] = useState('')
    const [veredas, setVeredas] = useState<string[]>(data.workZone?.veredas || [])

    useEffect(() => {
        loadExistingZones()
    }, [projectId])

    const loadExistingZones = async () => {
        try {
            const zones = await apiGetWorkZonesByProjectId(projectId)
            setExistingZones(zones)
        } catch (error) {
            console.error('Error loading work zones:', error)
        }
    }

    const handleUseExistingChange = (checked: boolean) => {
        setUseExisting(checked)
        onUpdate({
            useExistingZone: checked,
            existingZoneId: checked ? selectedZoneId : undefined,
            workZone: checked ? undefined : {
                name: zoneName,
                department,
                municipality,
                veredas
            }
        })
    }

    const handleExistingZoneChange = (zoneId: string) => {
        setSelectedZoneId(zoneId)
        onUpdate({
            useExistingZone: true,
            existingZoneId: zoneId
        })
    }

    const handleAddVereda = () => {
        if (veredaInput.trim() && !veredas.includes(veredaInput.trim())) {
            const updatedVeredas = [...veredas, veredaInput.trim()]
            setVeredas(updatedVeredas)
            setVeredaInput('')
            updateNewZone({ veredas: updatedVeredas })
        }
    }

    const handleRemoveVereda = (vereda: string) => {
        const updatedVeredas = veredas.filter(v => v !== vereda)
        setVeredas(updatedVeredas)
        updateNewZone({ veredas: updatedVeredas })
    }

    const updateNewZone = (updates: Partial<typeof data.workZone>) => {
        const updatedZone = {
            name: zoneName,
            department,
            municipality,
            veredas,
            ...updates
        }
        onUpdate({
            useExistingZone: false,
            workZone: updatedZone as any
        })
    }

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    <FaMapMarkerAlt className="inline mr-2 text-blue-600" />
                    Zona de trabajo
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                    Define el área geográfica donde se ejecutará esta actividad
                </p>
            </div>

            {existingZones.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Checkbox
                        checked={useExisting}
                        onChange={(checked) => handleUseExistingChange(checked)}
                    >
                        Usar una zona guardada
                    </Checkbox>
                    
                    {useExisting && (
                        <div className="mt-3">
                            <select
                                value={selectedZoneId}
                                onChange={(e) => handleExistingZoneChange(e.target.value)}
                                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Seleccione una zona</option>
                                {existingZones.map((zone) => (
                                    <option key={zone.id} value={zone.id}>
                                        {zone.name} - {zone.municipality}, {zone.department}
                                    </option>
                                ))}
                            </select>
                            {selectedZoneId && (
                                <div className="mt-3 text-sm text-blue-800">
                                    <strong>Veredas incluidas:</strong>{' '}
                                    {existingZones.find(z => z.id === selectedZoneId)?.veredas.join(', ')}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {!useExisting && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre de la zona <span className="text-red-500">*</span>
                        </label>
                        <Input
                            placeholder="Ej: Zona rural Alto Retiro"
                            value={zoneName}
                            onChange={(e) => {
                                setZoneName(e.target.value)
                                updateNewZone({ name: e.target.value })
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Departamento <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={department}
                                onChange={(e) => {
                                    setDepartment(e.target.value)
                                    updateNewZone({ department: e.target.value })
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Seleccione departamento</option>
                                {departamentos.map((dep) => (
                                    <option key={dep} value={dep}>
                                        {dep}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Municipio <span className="text-red-500">*</span>
                            </label>
                            <Input
                                placeholder="Ej: Ibagué"
                                value={municipality}
                                onChange={(e) => {
                                    setMunicipality(e.target.value)
                                    updateNewZone({ municipality: e.target.value })
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Veredas <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2 mb-3">
                            <Input
                                placeholder="Nombre de la vereda"
                                value={veredaInput}
                                onChange={(e) => setVeredaInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handleAddVereda()
                                    }
                                }}
                            />
                            <Button
                                variant="solid"
                                onClick={handleAddVereda}
                            >
                                Agregar
                            </Button>
                        </div>

                        {veredas.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {veredas.map((vereda) => (
                                    <span
                                        key={vereda}
                                        className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                                    >
                                        {vereda}
                                        <button
                                            onClick={() => handleRemoveVereda(vereda)}
                                            className="text-green-600 hover:text-green-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                            Agregue todas las veredas donde se realizará la actividad
                        </p>
                    </div>

                    {/* Map Placeholder */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                        <FaMapMarkerAlt className="mx-auto text-gray-400 mb-3" size={40} />
                        <p className="text-sm text-gray-600 mb-2">
                            Mapa de selección de zona
                        </p>
                        <p className="text-xs text-gray-500">
                            Aquí se integrará el componente de mapa para marcar la zona de trabajo
                        </p>
                    </div>
                </>
            )}

            {/* Info */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">📍 Sobre las zonas de trabajo</h4>
                <p className="text-sm text-gray-600">
                    Las zonas de trabajo te permiten organizar geográficamente tus actividades.
                    Puedes reutilizar zonas guardadas o crear una nueva si trabajarás en una área diferente.
                </p>
            </div>
        </div>
    )
}

export default Step3WorkZone
