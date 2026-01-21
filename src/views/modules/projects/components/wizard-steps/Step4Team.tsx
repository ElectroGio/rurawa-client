import { useState, useEffect } from 'react'
import { Button, Input, Avatar } from '@/components/ui'
import { FaPlus, FaSearch, FaTrash, FaUsers } from 'react-icons/fa'

interface TeamMember {
    userId: string
    role: string
}

interface Step4Data {
    teamMembers: TeamMember[]
}

interface Step4Props {
    projectId: string
    data: Partial<Step4Data>
    onUpdate: (data: Partial<Step4Data>) => void
}

// Mock user for search (replace with API call)
interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    profileImage?: string
}

const roles = ['Director', 'Coordinador', 'Supervisor', 'Analista', 'Tecnico']

const Step4Team = ({ projectId, data, onUpdate }: Step4Props) => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(data.teamMembers || [])
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<User[]>([])
    const [selectedRole, setSelectedRole] = useState('Tecnico')
    const [isSearching, setIsSearching] = useState(false)

    // Mock users (replace with real API call)
    const mockUsers: User[] = [
        { id: '1', firstName: 'Juan', lastName: 'Pérez', email: 'juan@example.com' },
        { id: '2', firstName: 'María', lastName: 'González', email: 'maria@example.com' },
        { id: '3', firstName: 'Carlos', lastName: 'Rodríguez', email: 'carlos@example.com' },
        { id: '4', firstName: 'Ana', lastName: 'Martínez', email: 'ana@example.com' },
        { id: '5', firstName: 'Luis', lastName: 'López', email: 'luis@example.com' }
    ]

    const handleSearch = () => {
        if (searchQuery.trim()) {
            setIsSearching(true)
            // Simulate API call
            setTimeout(() => {
                const results = mockUsers.filter(
                    (user) =>
                        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchQuery.toLowerCase())
                )
                setSearchResults(results)
                setIsSearching(false)
            }, 500)
        }
    }

    const handleAddMember = (user: User) => {
        // Check if user already added
        const alreadyAdded = teamMembers.some((m) => m.userId === user.id)
        if (alreadyAdded) {
            alert('Este usuario ya está en el equipo')
            return
        }

        const newMember: TeamMember = {
            userId: user.id,
            role: selectedRole
        }

        const updatedTeam = [...teamMembers, newMember]
        setTeamMembers(updatedTeam)
        onUpdate({ teamMembers: updatedTeam })
        setSearchQuery('')
        setSearchResults([])
    }

    const handleRemoveMember = (userId: string) => {
        const updatedTeam = teamMembers.filter((m) => m.userId !== userId)
        setTeamMembers(updatedTeam)
        onUpdate({ teamMembers: updatedTeam })
    }

    const handleChangeRole = (userId: string, newRole: string) => {
        const updatedTeam = teamMembers.map((m) =>
            m.userId === userId ? { ...m, role: newRole } : m
        )
        setTeamMembers(updatedTeam)
        onUpdate({ teamMembers: updatedTeam })
    }

    const getUserDetails = (userId: string): User | undefined => {
        return mockUsers.find((u) => u.id === userId)
    }

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'Director':
                return 'bg-purple-100 text-purple-600'
            case 'Coordinador':
                return 'bg-blue-100 text-blue-600'
            case 'Supervisor':
                return 'bg-green-100 text-green-600'
            case 'Analista':
                return 'bg-yellow-100 text-yellow-600'
            case 'Tecnico':
                return 'bg-gray-100 text-gray-600'
            default:
                return 'bg-gray-100 text-gray-600'
        }
    }

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    <FaUsers className="inline mr-2 text-blue-600" />
                    Asignar equipo de trabajo
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                    Busca y agrega personas a tu equipo asignándoles roles específicos
                </p>
            </div>

            {/* Search Section */}
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Buscar usuario
                </label>
                <div className="flex gap-2 mb-3">
                    <Input
                        placeholder="Nombre, apellido o email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleSearch()
                            }
                        }}
                        className="flex-1"
                    />
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                    <Button
                        variant="solid"
                        onClick={handleSearch}
                        icon={<FaSearch />}
                        loading={isSearching}
                    >
                        Buscar
                    </Button>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                    <div className="mt-3 space-y-2">
                        <p className="text-sm font-medium text-gray-700">Resultados:</p>
                        {searchResults.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        src={user.profileImage}
                                        size={32}
                                        shape="circle"
                                        className="bg-blue-500 text-white"
                                    >
                                        {user.firstName[0]}
                                        {user.lastName[0]}
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {user.firstName} {user.lastName}
                                        </p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    variant="solid"
                                    onClick={() => handleAddMember(user)}
                                    icon={<FaPlus />}
                                >
                                    Agregar
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {searchQuery && !isSearching && searchResults.length === 0 && (
                    <p className="text-sm text-gray-500 mt-3">No se encontraron usuarios</p>
                )}
            </div>

            {/* Team Members List */}
            <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Equipo asignado ({teamMembers.length})
                </h4>
                {teamMembers.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <FaUsers className="mx-auto text-gray-400 mb-2" size={32} />
                        <p className="text-sm text-gray-500">
                            No hay miembros en el equipo aún
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Usa el buscador arriba para agregar personas
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {teamMembers.map((member) => {
                            const user = getUserDetails(member.userId)
                            if (!user) return null

                            return (
                                <div
                                    key={member.userId}
                                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <Avatar
                                            src={user.profileImage}
                                            size={40}
                                            shape="circle"
                                            className="bg-blue-500 text-white"
                                        >
                                            {user.firstName[0]}
                                            {user.lastName[0]}
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                {user.firstName} {user.lastName}
                                            </p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                        <select
                                            value={member.role}
                                            onChange={(e) =>
                                                handleChangeRole(member.userId, e.target.value)
                                            }
                                            className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${getRoleColor(member.role)}`}
                                        >
                                            {roles.map((role) => (
                                                <option key={role} value={role}>
                                                    {role}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="plain"
                                        onClick={() => handleRemoveMember(member.userId)}
                                        icon={<FaTrash />}
                                        className="text-red-600 hover:text-red-700"
                                    />
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">👥 Roles del equipo</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                    <li><strong>Director:</strong> Responsable general del proyecto</li>
                    <li><strong>Coordinador:</strong> Coordina actividades y equipos</li>
                    <li><strong>Supervisor:</strong> Supervisa el trabajo en campo</li>
                    <li><strong>Analista:</strong> Analiza datos y genera reportes</li>
                    <li><strong>Técnico:</strong> Ejecuta actividades en campo</li>
                </ul>
            </div>
        </div>
    )
}

export default Step4Team
