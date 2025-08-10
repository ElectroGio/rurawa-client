import { CommonProps } from "@/@types/common";
import { Form, FormItem, Select } from "@/components/ui";
import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { BiRadioCircle } from "react-icons/bi";
import { BiRadioCircleMarked } from "react-icons/bi";

interface Company {
  reasonForUse: string;
  profileDescription: string;
  personType: number;
}

interface FormData {
  company: Company;
}

type AboutYouFormSchema = {
  reasonForUse: {
    value: string;
    label: string;
  };
  profileDescription: {
    value: string;
    label: string;
  };
  personType: number;
};

interface AboutYouFormProps extends CommonProps {
  control: Control<AboutYouFormSchema>;
  errors: FieldErrors<AboutYouFormSchema>;
  formData: FormData;
}

const SignUpForm3 = (props: AboutYouFormProps) => {
  const { control, errors, formData: initialFormData } = props;
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  return (
    <div className="w-full">
      <Form>
        <FormItem
          label="¿Por qué utilizarás el servicio?"
          invalid={Boolean(errors.reasonForUse)}
          errorMessage="Este campo es requerido"
        >
          <Controller
            name="reasonForUse"
            control={control}
            defaultValue={
              formData.company.reasonForUse === ""
                ? undefined
                : {
                    value: formData.company.reasonForUse,
                    label: formData.company.reasonForUse,
                  }
            }
            render={({ field }) => (
              <Select
                placeholder="Selecciona una opción"
                options={[
                  {
                    value: "Educación (Capacitación y Aprendizaje)",
                    label: "Educación (Capacitación y Aprendizaje)",
                  } as any,
                  {
                    value: "Red Comercial (Oportunidades de Mercado)",
                    label: "Red Comercial (Oportunidades de Mercado)",
                  } as any,
                  {
                    value: "Red de Trabajo (Gestión y Operación)",
                    label: "Red de Trabajo (Gestión y Operación)",
                  } as any,
                ]}
                {...field}
              />
            )}
          />
        </FormItem>
        <FormItem
          label="¿Qué te describe mejor?"
          invalid={Boolean(errors.profileDescription)}
          errorMessage="Este campo es requerido"
        >
          <Controller
            name="profileDescription"
            control={control}
            defaultValue={
              formData.company.profileDescription === ""
                ? undefined
                : {
                    value: formData.company.profileDescription,
                    label: formData.company.profileDescription,
                  }
            }
            render={({ field }) => (
              <Select
                placeholder="Selecciona una opción"
                options={[
                  {
                    value: "Organización sin animo de lucro",
                    label: "Organización sin animo de lucro",
                  } as any,
                  {
                    value: "Organización con animo de lucro",
                    label: "Organización con animo de lucro",
                  } as any,
                ]}
                {...field}
              />
            )}
          />
        </FormItem>
        <FormItem
          invalid={Boolean(errors.personType)}
          errorMessage={errors.personType?.message}
        >
          <div className="flex justify-between w-full">
            <Controller
              name="personType"
              control={control}
              defaultValue={formData.company.personType}
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  checked={formData.company.personType === 0 }
                  onChange={() => {
                    setFormData((prev) => ({
                      ...prev,
                      company: { ...prev.company, personType: 0 },
                    }));
                    field.onChange(0);
                  }}
                  
                  style={{ marginLeft: "3px" }}
                  control={
                    <Checkbox
                      icon={<BiRadioCircle className="text-3xl text-primary" />}
                      checkedIcon={
                        <BiRadioCircleMarked className="text-3xl text-primary" />
                      }
                      size="small"
                    />
                  }
                  className="text-secondary"
                  label="Persona Natural"
                  labelPlacement="start"
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: 600,
                      fontSize: "14px",
                    },
                  }}
                />
              )}
            />
            <Controller
              name="personType"
              control={control}
              defaultValue={formData.company.personType}
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  checked={formData.company.personType === 1}
                  onChange={() => {
                    setFormData((prev) => ({
                      ...prev,
                      company: { ...prev.company, personType: 1 },
                    }));
                    field.onChange(1);
                  }}
                  control={
                    <Checkbox
                      icon={<BiRadioCircle className="text-3xl text-primary" />}
                      checkedIcon={
                        <BiRadioCircleMarked className="text-3xl text-primary" />
                      }
                      size="small"
                    />
                  }
                  className="text-secondary "
                  label="Persona Jurídica"
                  labelPlacement="start"
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: 600,
                      fontSize: "14px",
                    },
                  }}
                />
              )}
            />
          </div>
        </FormItem>
      </Form>
    </div>
  );
};

export default SignUpForm3;
