import { Button, Form, FormItem, Input } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import { z, ZodType } from "zod";

type SignUpForm7Schema = {
  email: string;
};

const validationSchema: ZodType<SignUpForm7Schema> = z.object({
  email: z.string().email({ message: "El correo electrónico no es válido" }),
});

const SignUpForm7 = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignUpForm7Schema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(validationSchema),
  });



  const [emails, setEmails] = useState<string[]>([]);

  const onSubmit = (data: SignUpForm7Schema) => {
      setEmails((prevEmails: string[]) => [...prevEmails, data.email]);
  };
  return (
    <div className="w-full">
    <Form onSubmit={handleSubmit(onSubmit)}>
        <FormItem
            label="Correo electrónico"
            invalid={Boolean(errors.email)}
            errorMessage={errors.email?.message}
        >
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <Input
                        
                        placeholder="Correo electrónico"
                        autoComplete="off"
                        {...field}
                    />
                )}
            />
        </FormItem>
        <Button
            iconAlignment="start"
            icon={<BsPlus className="mr-4 font-semibold text-primary" />}
            type="submit"
            variant="plain"
            className="text-primary font-semibold"
        >
            Agregar correo
        </Button>
    </Form>
    <ul className="mt-4">
        {emails.map((email: string, index: number) => (
            <li key={index} className="text-primary">
                {email}
            </li>
        ))}
    </ul>
</div>
  );
};

export default SignUpForm7;

