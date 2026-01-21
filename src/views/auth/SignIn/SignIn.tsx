import React, { useState, useEffect } from 'react'
import Alert from "@/components/ui/Alert"
import SignInForm from "./components/SignInForm"
// import OauthSignIn from "./components/OauthSignIn"
import ActionLink from "@/components/shared/ActionLink"
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage"
import { useThemeStore } from "@/store/themeStore"
import Checkbox from "@/components/ui/Checkbox/Checkbox"
import { useAuth } from "@/auth"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { apiSignIn } from "@/services/AuthService"
import { useLocation } from "react-router-dom"

type SignInProps = {
  signUpUrl?: string
  forgetPasswordUrl?: string
  disableSubmit?: boolean
}

type SignInFormSchema = {
  email: string
  password: string
}

const validationSchema = z.object({
  email: z.string().nonempty({ message: "Se requiere un correo electrónico" }).email({ message: "El correo electrónico no es válido" }),
  password: z.string().nonempty({ message: "Se requiere una contraseña" }),
})

export const SignInBase = ({
  signUpUrl = "/sign-up",
  forgetPasswordUrl = "/forgot-password",
  disableSubmit,
}: SignInProps) => {
  const location = useLocation()
  const [message, setMessage] = useTimeOutMessage()
  const { signIn } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Mostrar mensaje de éxito si viene del registro
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      // Limpiar el mensaje después de 5 segundos
      const timer = setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [location])

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignInFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(validationSchema),
  })

  const onSignIn = async (values: SignInFormSchema) => {
    const { email, password } = values

    if (!disableSubmit) {
      setSubmitting(true)

      try {
        const result = await apiSignIn({ email, password })
        if (result) {
          signIn({ email, password, ...result })
          // Redirigir al usuario a la página de inicio o a la página deseada
        }
      } catch (error) {
        setMessage("No se ha podido iniciar sesión, intentalo nuevamente más tarde")
      } finally {
        setSubmitting(false)
      }
    }
  }

  return (
    <>
      <div className="mb-4">
        <p className="font-semibold text-secondary text-lg text-center">
          Ingresar a rurawa
        </p>
      </div>
      {successMessage && (
        <Alert showIcon className="mb-4" type="success">
          <>{successMessage}</>
        </Alert>
      )}
      {message && (
        <Alert showIcon className="mb-4" type="danger">
          <>{message}</>
        </Alert>
      )}
      <SignInForm
        disableSubmit={disableSubmit}
        setMessage={setMessage}
        passwordHint={
          <div className="mb-7 mt-6 flex justify-between items-center">
            <Checkbox
              value={false}
              onChange={() => {}}
            >
              Recordarme
            </Checkbox>
            <ActionLink
              to={forgetPasswordUrl}
              className="font-semibold heading-text underline text-right"
              themeColor={false}
            >
              ¿Olvidaste la contraseña?
            </ActionLink>
          </div>
        }
      />
      {/* <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
          <p className="font-semibold heading-text">o continuar con</p>
          <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
        </div>
        <OauthSignIn disableSubmit={disableSubmit} setMessage={setMessage} />
      </div> */}
      <div>
        <div className="mt-6 text-center">
          <span>{`¿No tienes una cuenta?`} </span>
          <ActionLink
            to={signUpUrl}
            className="heading-text font-semibold text-secondary"
            themeColor={false}
          >
            Regístrate ahora
          </ActionLink>
        </div>
      </div>
    </>
  )
}

const SignIn = () => {
  return <SignInBase />
}

export default SignIn