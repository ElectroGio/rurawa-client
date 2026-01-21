import { useState } from 'react'
import { apiVerifyPhone, apiResendVerificationCode } from '@/services/AuthService'
import type { VerifyPhone } from '@/@types/auth'

export function usePhoneVerification() {
    const [isVerifying, setIsVerifying] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const verifyPhone = async (data: VerifyPhone) => {
        setIsVerifying(true)
        setError(null)

        try {
            const response = await apiVerifyPhone<{ verified: boolean; message: string }>(data)
            return { success: true, data: response }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Error al verificar el código'
            setError(errorMessage)
            return { success: false, error: errorMessage }
        } finally {
            setIsVerifying(false)
        }
    }

    const resendCode = async (userId: string) => {
        setIsResending(true)
        setError(null)

        try {
            const response = await apiResendVerificationCode<{ message: string }>(userId)
            return { success: true, data: response }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Error al reenviar el código'
            setError(errorMessage)
            return { success: false, error: errorMessage }
        } finally {
            setIsResending(false)
        }
    }

    return {
        verifyPhone,
        resendCode,
        isVerifying,
        isResending,
        error,
    }
}
