import { useState } from "react"
import Alert from "@/components/ui/Alert"
import Button from "@/components/ui/Button"
import ActionLink from "@/components/shared/ActionLink"
import ForgotPasswordForm from "./components/ForgotPasswordForm"
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage"
import { useNavigate } from "react-router-dom"
import { apiForgotPassword } from "@/services/AuthService"

type ForgotPasswordProps = {
  signInUrl?: string
}

export const ForgotPasswordBase = ({
  signInUrl = "/sign-in",
}: ForgotPasswordProps) => {
  const [emailSent, setEmailSent] = useState(false)
  const [message, setMessage] = useTimeOutMessage()
  const [submitting, setSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleContinue = () => {
    navigate(signInUrl)
  }

  const onSubmit = async (values: { email: string }) => {
    setSubmitting(true)
    try {
      const response = await apiForgotPassword(values)
      if (response) {
        setEmailSent(true)
        setMessage("Correo de recuperación enviado. Por favor, revisa tu bandeja de entrada.")
      }
    } catch (error) {
      setMessage("No se ha podido enviar el correo de recuperación. Inténtalo nuevamente más tarde.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-center mb-4">Recuperar Contraseña</h2>
      {message && (
        <Alert showIcon className="mb-4" type={emailSent ? "success" : "danger"}>
          <>{message}</>
        </Alert>
      )}
      {!emailSent ? (
        <ForgotPasswordForm onSubmit={onSubmit} submitting={submitting} />
      ) : (
        <div className="text-center">
          <Button onClick={handleContinue}>Continuar</Button>
        </div>
      )}
      <div className="mt-4 text-center">
        <ActionLink to={signInUrl} className="text-secondary">
          Volver al inicio de sesión
        </ActionLink>
      </div>
    </div>
  )
}

const ForgotPassword = () => {
  return <ForgotPasswordBase />
}

export default ForgotPassword