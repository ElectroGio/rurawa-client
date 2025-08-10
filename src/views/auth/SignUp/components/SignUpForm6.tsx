import { CommonProps } from "@/@types/common";
import { Form, FormItem, Input, Select } from "@/components/ui";
import { colombianDepartaments } from "@/constants/colombianDepartaments.constant";
import React, { useEffect, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface Address {
  street: string;
  country: string;
  state: string;
  city: string;
}

interface Company {
  address: Address;
}

interface FormData {
  company: Company;
}

type SignUpForm6Schema = {
  street: string;
  country: {
    value: string;
    label: string;
  };
  state: {
    value: string;
    label: string;
  };
  city: {
    value: string;
    label: string;
  };
};

type OptionType = { value: string; label: string };

interface SignUpForm6Props extends CommonProps {
  control: Control<SignUpForm6Schema>;
  errors: FieldErrors<SignUpForm6Schema>;
  watch: any;
  formData: FormData;
}

const SignUpForm6 = (props: SignUpForm6Props) => {
  const { control, errors, formData: initialFormData } = props;

  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault;
  };
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [municipalities, setMunicipalities] = useState<OptionType[]>([]);

  // Observa el cambio en el departamento

  // Actualiza el municipio cada vez que cambia el departamento
  useEffect(() => {
    if (selectedDepartment) {
      const department = colombianDepartaments.find(
        (dep) => dep.name === selectedDepartment
      );
      if (department) {
        setMunicipalities(
          department.municipalities.map((municipality) => ({
            value: municipality,
            label: municipality,
          }))
        );
      } else {
        setMunicipalities([]);
      }
    }
  }, [selectedDepartment]);

  return (
    <div className="w-full">
      <Form onSubmit={handleSubmit}>
        <FormItem
          label="Dirección de la empresa"
          invalid={Boolean(errors.street)}
          errorMessage="Este campo es requerido"
        >
          <Controller
            name="street"
            control={control}
            defaultValue={
              formData.company.address.street
                ? formData.company.address.street
                : ""
            }
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Dirección de la empresa"
                invalid={Boolean(errors.street)}
              />
            )}
          />
        </FormItem>
        <FormItem
          label="País"
          invalid={Boolean(errors.country)}
          errorMessage="Este campo es requerido"
        >
          <Controller
            name="country"
            control={control}
            defaultValue={
              formData.company.address.country === ""
                ? undefined
                : {
                    value: formData.company.address.country,
                    label: formData.company.address.country,
                  }
            }
            render={({ field }) => (
              <Select
                placeholder="Selecciona una opción"
                options={[{ value: "Colombia", label: "Colombia" } as any]}
                {...field}
              />
            )}
          />
        </FormItem>
        <FormItem
          label="Estado"
          invalid={Boolean(errors.state)}
          errorMessage="Este campo es requerido"
        >
          <Controller
            name="state"
            control={control}
            defaultValue={
              formData.company.address.state === ""
                ? undefined
                : {
                    value: formData.company.address.state,
                    label: formData.company.address.state,
                  }
            }
            render={({ field }) => (
              <Select
                placeholder="Selecciona un departamento"
                options={colombianDepartaments.map((dep) => ({
                  value: dep.name,
                  label: dep.name,
                }))}
                {...field}
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                  if (selectedOption) {
                    setSelectedDepartment(selectedOption.value);
                  }
                }}
              />
            )}
          />
        </FormItem>
        <FormItem
          label="Ciudad"
          invalid={Boolean(errors.city)}
          errorMessage="Este campo es requerido"
        >
          <Controller
            name="city"
            control={control}
            defaultValue={
              formData.company.address.city === ""
                ? undefined
                : {
                    value: formData.company.address.city,
                    label: formData.company.address.city,
                  }
            }
            render={({ field }) => (
              <Select
                placeholder="Selecciona un departamento"
                options={municipalities}
                {...field}
              />
            )}
          />
        </FormItem>
      </Form>
    </div>
  );
};

export default SignUpForm6;
