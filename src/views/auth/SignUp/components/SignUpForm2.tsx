import { CommonProps } from "@/@types/common";
import { PasswordInput } from "@/components/shared";
import { Form, FormItem, Input } from "@/components/ui";
import classNames from "@/utils/classNames";
import { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface User {
  email: string;
  password: string;
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
  email: string;
  password: string;
};

const SignUpForm2 = (props: SignInFormProps) => {
  const { control, errors, formData: initialFormData } = props;

  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  return (
    <div className="w-full">
      <Form>
        <FormItem
          label="Correo electrónico"
          invalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            defaultValue={formData.user.email ? formData.user.email : ""}
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
        <FormItem
          label="Contraseña"
          invalid={Boolean(errors.password)}
          errorMessage={errors.password?.message}
        >
          <Controller
            name="password"
            defaultValue={formData.user.password ? formData.user.password : ""}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PasswordInput
                type="text"
                placeholder="Contraseña"
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

export default SignUpForm2;
