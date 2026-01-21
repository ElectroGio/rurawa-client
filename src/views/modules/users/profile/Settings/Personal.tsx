import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { apiUpdateUser } from '@/services/UserService'
import type { User } from '@/@types/user'
import Button from '@/components/ui/Button'

interface PersonalProps {
  user: User
  onUpdate: () => void
}

interface PersonalFormData {
  firstName: string
  lastName: string
  documentNumber: string
  dateOfBirth?: string
  bloodType?: string
  profession?: string
}

const Personal: React.FC<PersonalProps> = ({ user, onUpdate }) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<PersonalFormData>({
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      documentNumber: user.documentNumber || '',
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
      bloodType: user.bloodType || '',
      profession: user.profession || '',
    }
  })

  useEffect(() => {
    reset({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      documentNumber: user.documentNumber || '',
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
      bloodType: user.bloodType || '',
      profession: user.profession || '',
    })
  }, [user, reset])

  const onSubmit = async (data: PersonalFormData) => {
    setLoading(true)
    try {
      await apiUpdateUser(user.id, data)
      await onUpdate()
      alert('Información personal actualizada exitosamente')
    } catch (error: any) {
      console.error('Error updating user:', error)
      alert(`Error al actualizar: ${error.response?.data?.message || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>   
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombres *</label>
          <input
            type="text"
            {...register('firstName', { required: 'El nombre es requerido' })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Apellidos *</label>
          <input
            type="text"
            {...register('lastName', { required: 'El apellido es requerido' })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Número de identidad *</label>
          <input
            type="text"
            {...register('documentNumber', { required: 'El documento es requerido' })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          />
          {errors.documentNumber && <p className="text-red-500 text-sm mt-1">{errors.documentNumber.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
          <input
            type="date"
            {...register('dateOfBirth')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de sangre</label>
          <select 
            {...register('bloodType')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          >
            <option value="">Seleccionar</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Profesión</label>
          <input
            type="text"
            {...register('profession')}
            placeholder="Ej: Ingeniero Agrónomo"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="plain"
            onClick={() => reset()}
            disabled={!isDirty || loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="solid"
            loading={loading}
            disabled={!isDirty || loading}
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Personal