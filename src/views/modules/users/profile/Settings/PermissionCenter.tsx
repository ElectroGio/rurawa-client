import React from 'react'
import Switcher from '@/components/ui/Switcher'
import Checkbox from '@/components/ui/Checkbox'

const PermissionCenter: React.FC = () => {
  return (
    <div>
      <form className="space-y-4 mt-4">
      <div className="bg-blue-100 px-4 py-2 rounded-lg flex justify-between items-center">
        <div>
          <span className="text-black font-semibold">Colaborador</span>
          <p className="text-gray-500 text-sm">Pueden verificar y controlar tareas especificas.</p>
        </div>
        <Switcher />
      </div>
      <div className="bg-blue-100 px-4 py-2 rounded-lg flex justify-between items-center">
        <div>
          <span className="text-black font-semibold">Persona con acceso a tareas</span>
          <p className="text-gray-500 text-sm">Pueden administrar tareas específicas.</p>
        </div>
        <Switcher />
      </div>
      <div className="bg-blue-100 px-4 py-2 rounded-lg flex justify-between items-center">
        <div>
          <span className="text-black font-semibold">Administrador</span>
          <p className="text-gray-500 text-sm">Pueden tener acceso directo a la plataforma.</p>
        </div>
        <Switcher />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 justify-center">
        <Checkbox>
          <span className="text-gray-700">Por definir</span>
        </Checkbox>
        <Checkbox>
          <span className="text-gray-700">Por definir</span>
        </Checkbox>
        <Checkbox>
          <span className="text-gray-700">Por definir</span>
        </Checkbox>
        <Checkbox>
          <span className="text-gray-700">Por definir</span>
        </Checkbox>
        <Checkbox>
          <span className="text-gray-700">Por definir</span>
        </Checkbox>
        <Checkbox>
          <span className="text-gray-700">Por definir</span>
        </Checkbox>
      </div>
    </form>
    </div>
  )
}

export default PermissionCenter