import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { apiUpdateUser } from '@/services/UserService'
import type { User } from '@/@types/user'
import Button from '@/components/ui/Button'

interface ContactProps {
  user: User
  onUpdate: () => void
}

interface ContactFormData {
  email?: string
  phoneNumber: string
  countryCode: string
  city?: string
  state?: string
}

const Contact: React.FC<ContactProps> = ({ user, onUpdate }) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<ContactFormData>({
    defaultValues: {
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      countryCode: user.countryCode || '57',
      city: user.city || '',
      state: user.state || '',
    }
  })

  useEffect(() => {
    reset({
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      countryCode: user.countryCode || '57',
      city: user.city || '',
      state: user.state || '',
    })
  }, [user, reset])

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true)
    try {
      await apiUpdateUser(user.id, data)
      await onUpdate()
      alert('Información de contacto actualizada exitosamente')
    } catch (error: any) {
      console.error('Error updating user:', error)
      alert(`Error al actualizar: ${error.response?.data?.message || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-black mb-4">Información de Contacto</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
            readOnly
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">El email no se puede modificar</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Código *</label>
            <input
              type="text"
              {...register('countryCode', { required: 'Requerido' })}
              placeholder="57"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700">Teléfono *</label>
            <input
              type="tel"
              {...register('phoneNumber', { 
                required: 'El teléfono es requerido',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'El teléfono debe tener 10 dígitos'
                }
              })}
              placeholder="3001234567"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ciudad</label>
          <input
            type="text"
            {...register('city')}
            placeholder="Ej: Pitalito"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Departamento/Estado</label>
          <input
            type="text"
            {...register('state')}
            placeholder="Ej: Huila"
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

export default Contact