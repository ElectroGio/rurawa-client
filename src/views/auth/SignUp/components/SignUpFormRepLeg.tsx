import { CommonProps } from "@/@types/common";
import { PasswordInput } from "@/components/shared";
import { Form, FormItem, Input } from "@/components/ui";
import classNames from "@/utils/classNames";
import { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface User {
  firstName: string;
  lastName: string;
  documentNumber: string;
}

interface FormData {
  user: User;
}

interface SignInFormProps extends CommonProps {
  control: Control<SignInFormSchema>;
  errors: FieldErrors<SignInFormSchema>;
  formData: FormData;
}

type SignInFormSchema = {
  firstName: string;
  lastName: string;
  documentNumber: string;
};

const SignUpFormRepLeg = (props: SignInFormProps) => {
  const { control, errors, formData: initialFormData } = props;

  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  return (
    <div className="w-full">
      <Form>
        <FormItem
          label="Nombre"
          invalid={Boolean(errors.firstName)}
          errorMessage={errors.firstName?.message}
        >
          <Controller
            name="firstName"
            defaultValue={
              formData.user.firstName ? formData.user.firstName : ""
            }
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Nombre"
                autoComplete="off"
                {...field}
              />
            )}
          />
        </FormItem>
        <FormItem
          label="Apellido"
          invalid={Boolean(errors.lastName)}
          errorMessage={errors.lastName?.message}
        >
          <Controller
            name="lastName"
            defaultValue={formData.user.lastName ? formData.user.lastName : ""}
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Apellido"
                autoComplete="off"
                {...field}
              />
            )}
          />
        </FormItem>
        <FormItem
          label="Número de documento"
          invalid={Boolean(errors.documentNumber)}
          errorMessage={errors.documentNumber?.message}
        >
          <Controller
            name="documentNumber"
            defaultValue={
              formData.user.documentNumber ? formData.user.documentNumber : ""
            }
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Número de documento"
                autoComplete="off"
                {...field}
              />
            )}
          />
        </FormItem>
      </Form>
    </div>
  );
};

export default SignUpFormRepLeg;
