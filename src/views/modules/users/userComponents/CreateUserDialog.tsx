import React, { useState } from 'react'
import { FaArrowLeft, FaTimes } from 'react-icons/fa'
import PersonalInfo from './UserForm/PersonalInfo'
import Permissions from './UserForm/Permissions'
import Verification from './UserForm/Verification'
import Confirmation from './UserForm/Confirmation'
import Circle from '@/components/ui/Progress/Circle'

interface CreateUserDialogProps {
  onClose: () => void
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({ onClose }) => {
  const [step, setStep] = useState(1)

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleNewUser = () => {
    setStep(1)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfo />
      case 2:
        return <Permissions />
      case 3:
        return <Verification />
      case 4:
        return <Confirmation onClose={onClose} onNewUser={handleNewUser} />
      default:
        return <PersonalInfo />
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return { title: 'Datos personales', subtitle: "Datos personales del usuario." }
      case 2:
        return { title: 'Permisos', subtitle: 'Permisos para acceder a la plataforma.' }
      case 3:
        return { title: '897690', subtitle: 'Este código de enlace, tiene 30 min para ser usado.' }
      case 4:
        return { title: '', subtitle: '' }
      default:
        return { title: 'Datos personales', subtitle: "Datos personales del usuario." }
    }
  }

  const { title, subtitle } = getStepTitle()

  return (
    <div>
      {step < 4 && (
        <>
          <div className="flex justify-between items-center">
            <h5 className="text-lg font-bold text-gray-800">Nuevo usuario</h5>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>
          <div className="relative mt-4">
            <div
              className="w-full h-32 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: 'url(public/img/banner/banner-office.png)' }}
            >
              <div className="absolute inset-0 flex items-center justify-center" style={{ top: '60%' }}>
                <div className="w-4/5 h-16 bg-blue-100 rounded-lg px-4 flex items-center gap-4 z-10">
                  <Circle
                    percent={(step / 4) * 100}
                    strokeWidth={8}
                    strokeColor="blue-500"
                    gapDegree={0}
                    gapPosition="top"
                    strokeLinecap="round"
                    width={50}
                  />
                  <div>
                    <span className="text-black font-semibold">{title}</span>
                    <p className="text-gray-500 text-sm">{subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {renderStep()}
      {step < 4 && (
        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="text-purple-500 font-medium hover:underline transition flex items-center"
            >
              <FaArrowLeft className="mr-2" />
              Regresar
            </button>
          )}
          <button
            onClick={handleContinue}
            className={`py-1 px-3 bg-[#008B00] text-white font-medium rounded-lg hover:bg-[#006A00] transition ${step === 1 ? 'ml-auto' : ''}`}
          >
            {step === 3 ? 'Enviar' : 'Continuar'}
          </button>
        </div>
      )}
    </div>
  )
}

export default CreateUserDialog