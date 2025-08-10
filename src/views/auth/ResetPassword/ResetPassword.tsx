import { useState } from "react"
import Alert from "@/components/ui/Alert"
import Button from "@/components/ui/Button"
import ActionLink from "@/components/shared/ActionLink"
import ResetPasswordForm from "./components/ResetPasswordForm"
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage"
import { useNavigate } from "react-router-dom"
import { apiResetPassword } from "@/services/AuthService"

type ResetPasswordProps = {
  signInUrl?: string
}

export const ResetPasswordBase = ({
  signInUrl = "/sign-in",
}: ResetPasswordProps) => {
  const [resetComplete, setResetComplete] = useState(false)
  const [message, setMessage] = useTimeOutMessage()
  const [submitting, setSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleContinue = () => {
    navigate(signInUrl)
  }

  const onSubmit = async (values: { newPassword: string, confirmPassword: string }) => {
    setSubmitting(true)
    try {
      const response = await apiResetPassword({ password: values.newPassword })
      if (response) {
        setResetComplete(true)
        setMessage("Contraseña restablecida con éxito.")
      }
    } catch (error) {
      setMessage("No se ha podido restablecer la contraseña. Inténtalo nuevamente más tarde.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-center mb-4">Restablecer Contraseña</h2>
      {message && (
        <Alert showIcon className="mb-4" type={resetComplete ? "success" : "danger"}>
          <>{message}</>
        </Alert>
      )}
      <ResetPasswordForm onSubmit={onSubmit} submitting={submitting} resetComplete={resetComplete} />
      <div className="mt-4 text-center">
        <span>Volver a </span>
        <ActionLink
          to={signInUrl}
          className="heading-text font-bold"
          themeColor={false}
        >
          Iniciar sesión
        </ActionLink>
      </div>
    </div>
  )
}

const ResetPassword = () => {
  return <ResetPasswordBase />
}

export default ResetPassword