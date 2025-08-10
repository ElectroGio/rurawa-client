import { CommonProps } from "@/@types/common";
import { Button, Form, FormItem, Input } from "@/components/ui";
import React, { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
interface Company {
  name: string;
  taxId: string;
  employeeSize: string;
}

interface FormData {
  company: Company;
}

type SignUpForm5Schema = {
  name: string;
  taxId: string;
  employeeSize: string;
};

interface SignUpForm5Props extends CommonProps {
  control: Control<SignUpForm5Schema>;
  errors: FieldErrors<SignUpForm5Schema>;
  formData: FormData;
}

const SignUpForm5 = (props: SignUpForm5Props) => {
  const { control, errors, formData: initialFormData } = props;
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  const employeeSizeOptions = [
    { value: "1", label: "Solo yo" },
    { value: "2-10", label: "2-10" },
    { value: "11-30", label: "11-30" },
    { value: "31-51", label: "31-51" },
    { value: "51-100", label: "51-100" },
    { value: "101-500", label: "101-500" },
    { value: "501-1000", label: "501-1000" },
    { value: "+ de 1000", label: "+ de 1000" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene la recarga de la página
  };

  return (
    <div className="w-full">
      <Form onSubmit={handleSubmit} >
        <FormItem
          label="Nombre de la empresa"
          invalid={Boolean(errors.name)}
          errorMessage="Este campo es requerido"
        >
          <Controller
            name="name"
            control={control}
            defaultValue={formData.company.name ? formData.company.name : ""}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nombre de la empresa"
                invalid={Boolean(errors.name)}
              />
            )}
          />
        </FormItem>
        <FormItem
          label="Número de identidad"
          invalid={Boolean(errors.taxId)}
          errorMessage="Este campo es requerido"
        >
          <Controller
            name="taxId"
            control={control}
            defaultValue={formData.company.taxId ? formData.company.taxId : ""}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Número de identidad"
                invalid={Boolean(errors.taxId)}
              />
            )}
          />
        </FormItem>
        <FormItem
          label="¿Cuántas personas hay en tu empresa?"
          invalid={Boolean(errors.employeeSize)}
          errorMessage="Este campo es requerido"
        >
          <Controller
            name="employeeSize"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-4 gap-8 gap-y-8 ">
                {employeeSizeOptions.map((option) => (
                  <div key={option.value} className="flex items-center w-full h-full">
                    <Button
                      onClick={() => field.onChange(option.value)}
                      variant={field.value === option.value ? "solid" : "default"}
                      className={field.value === option.value ? "w-full h-14 text-white  font-medium text-base" : "w-full h-14 text-[#7D8592] font-medium text-base"}
                      active={field.value === option.value}
                    >
                      {option.label}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          />
        </FormItem>
      </Form>
    </div>
  );
};

export default SignUpForm5;
