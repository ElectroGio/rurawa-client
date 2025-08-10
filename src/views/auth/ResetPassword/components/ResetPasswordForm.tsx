import { useState } from 'react'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import PasswordInput from '@/components/shared/PasswordInput'
import { useForm, Controller } from 'react-hook-form'
import type { CommonProps } from '@/@types/common'

interface ResetPasswordFormProps extends CommonProps {
    onSubmit: (values: { newPassword: string, confirmPassword: string }) => void
    submitting: boolean
    resetComplete: boolean
}

type ResetPasswordFormSchema = {
    newPassword: string
    confirmPassword: string
}

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
    const { className, onSubmit, submitting, resetComplete, children } = props

    const {
        handleSubmit,
        formState: { errors },
        control,
        watch,
    } = useForm<ResetPasswordFormSchema>({
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
    })

    const validateConfirmPassword = (value: string) => {
        const newPassword = watch('newPassword')
        return value === newPassword || 'Las contraseñas no coinciden'
    }

    return (
        <div className={className}>
            {!resetComplete ? (
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormItem
                        label="Nueva Contraseña"
                        invalid={Boolean(errors.newPassword)}
                        errorMessage={errors.newPassword?.message}
                    >
                        <Controller
                            name="newPassword"
                            control={control}
                            rules={{ required: 'Se requiere una nueva contraseña' }}
                            render={({ field }) => (
                                <PasswordInput
                                    autoComplete="off"
                                    placeholder="••••••••••••"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Confirmar Contraseña"
                        invalid={Boolean(errors.confirmPassword)}
                        errorMessage={errors.confirmPassword?.message}
                    >
                        <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{ 
                                required: 'Se requiere confirmar la contraseña',
                                validate: validateConfirmPassword
                            }}
                            render={({ field }) => (
                                <PasswordInput
                                    autoComplete="off"
                                    placeholder="Confirmar Contraseña"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <Button
                        block
                        loading={submitting}
                        variant="solid"
                        type="submit"
                    >
                        {submitting ? 'Enviando...' : 'Enviar'}
                    </Button>
                </Form>
            ) : (
                <>{children}</>
            )}
        </div>
    )
}

export default ResetPasswordForm