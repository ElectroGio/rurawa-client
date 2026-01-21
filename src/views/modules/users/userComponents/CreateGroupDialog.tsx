import React, { useState, useEffect } from 'react'
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { apiCreateGroup, apiAddUserToGroup } from '@/services/GroupService'
import { apiGetUsers } from '@/services/UserService'
import { useSessionUser } from '@/store/authStore'
import type { User } from '@/@types/user'
import Avatar from '@/components/ui/Avatar'

interface CreateGroupDialogProps {
    onClose: () => void
    onSuccess: () => void
}

const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({
    onClose,
    onSuccess,
}) => {
    const { user } = useSessionUser()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [showUserSelector, setShowUserSelector] = useState(false)
    const [availableUsers, setAvailableUsers] = useState<User[]>([])
    const [selectedUsers, setSelectedUsers] = useState<User[]>([])
    const [loadingUsers, setLoadingUsers] = useState(false)

    useEffect(() => {
        if (showUserSelector && user?.companyId) {
            loadUsers()
        }
    }, [showUserSelector])

    const loadUsers = async () => {
        if (!user?.companyId || user.companyId === '00000000-0000-0000-0000-000000000000') {
            console.error('Invalid companyId:', user?.companyId)
            return
        }
        
        setLoadingUsers(true)
        try {
            const response = await apiGetUsers(user.companyId, 100, 1)
            setAvailableUsers(response.items)
        } catch (error) {
            console.error('Error loading users:', error)
        } finally {
            setLoadingUsers(false)
        }
    }

    const toggleUserSelection = (selectedUser: User) => {
        setSelectedUsers((prev) => {
            const exists = prev.find((u) => u.id === selectedUser.id)
            if (exists) {
                return prev.filter((u) => u.id !== selectedUser.id)
            }
            return [...prev, selectedUser]
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim()) {
            alert('Por favor ingresa un nombre para el grupo')
            return
        }

        if (!user?.companyId || user.companyId === '00000000-0000-0000-0000-000000000000') {
            alert('Error: No tienes una empresa asociada. Por favor contacta al administrador o vuelve a iniciar sesión.')
            return
        }

        setLoading(true)
        try {
            console.log('Creating group with companyId:', user.companyId)
            const groupId = await apiCreateGroup({
                name: name.trim(),
                description: description.trim() || undefined,
                companyId: user.companyId,
            })

            // Add selected users to group if any
            if (selectedUsers.length > 0 && groupId) {
                await Promise.all(
                    selectedUsers.map((u) =>
                        apiAddUserToGroup(groupId, u.id)
                    )
                )
            }

            onSuccess()
            onClose()
        } catch (error: any) {
            console.error('Error creating group:', error)
            alert(`Error al crear el grupo: ${error.response?.data?.message || error.message || 'Error desconocido'}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h5 className="text-xl font-bold text-gray-900">
                    Nuevo Grupo
                </h5>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    type="button"
                >
                    <FaTimes size={20} />
                </button>
            </div>

            <form id="create-group-form" onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre del grupo *
                    </label>
                    <Input
                        type="text"
                        placeholder="Ej: Coordinadores"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Descripción del grupo"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Usuarios ({selectedUsers.length})
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowUserSelector(!showUserSelector)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <FaPlus size={14} />
                            Agregar usuarios
                        </button>
                    </div>

                    {selectedUsers.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {selectedUsers.map((u) => (
                                <div
                                    key={u.id}
                                    className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full"
                                >
                                    <span className="text-sm">
                                        {u.firstName} {u.lastName}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => toggleUserSelection(u)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {showUserSelector && (
                        <div className="border border-gray-200 rounded-lg p-3 max-h-64 overflow-y-auto">
                            {loadingUsers ? (
                                <p className="text-center text-gray-500">
                                    Cargando usuarios...
                                </p>
                            ) : availableUsers.length === 0 ? (
                                <p className="text-center text-gray-500">
                                    No hay usuarios disponibles
                                </p>
                            ) : (
                                <div className="space-y-2">
                                    {availableUsers.map((u) => {
                                        const isSelected = selectedUsers.some(
                                            (su) => su.id === u.id
                                        )
                                        return (
                                            <div
                                                key={u.id}
                                                onClick={() =>
                                                    toggleUserSelection(u)
                                                }
                                                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 ${
                                                    isSelected
                                                        ? 'bg-blue-50 border border-blue-300'
                                                        : ''
                                                }`}
                                            >
                                                <Avatar
                                                    size={32}
                                                    shape="circle"
                                                >
                                                    {u.firstName[0]}
                                                    {u.lastName[0]}
                                                </Avatar>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">
                                                        {u.firstName} {u.lastName}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {u.email}
                                                    </p>
                                                </div>
                                                {isSelected && (
                                                    <div className="text-blue-500">
                                                        ✓
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </form>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="px-6 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    form="create-group-form"
                    disabled={!name.trim() || loading}
                    className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {loading && (
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    Crear Grupo
                </button>
            </div>
        </div>
    )
}

export default CreateGroupDialog
