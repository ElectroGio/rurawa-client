import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import type { CommonProps } from '@/@types/common'

interface ForgotPasswordFormProps extends CommonProps {
    onSubmit: (values: { email: string }) => void
    submitting: boolean
}

type ForgotPasswordFormSchema = {
    email: string
}

const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
    const { className, onSubmit, submitting } = props

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<ForgotPasswordFormSchema>({
        defaultValues: {
            email: '',
        },
    })

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem
                    label="Correo electrónico"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: 'Se requiere un correo electrónico', pattern: { value: /^\S+@\S+$/i, message: 'El correo electrónico no es válido' } }}
                        render={({ field }) => (
                            <Input
                                type="email"
                                placeholder="Correo electrónico"
                                autoComplete="off"
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
        </div>
    )
}

export default ForgotPasswordForm