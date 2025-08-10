import { CommonProps } from "@/@types/common";
import { Form, FormItem, Select } from "@/components/ui";
import React, { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface Company {
  businessCategory: string;
  businessSector: string;
  mainCrops: string[];
}

interface FormData {
  company: Company;
}

type SignUpForm4Schema = {
  businessCategory: {
    value: string;
    label: string;
  };
  businessSector: {
    value: string;
    label: string;
  };
  mainCrops: {
    value: string;
    label: string;
  }[];
};

interface SignUpForm4Props extends CommonProps {
  control: Control<SignUpForm4Schema>;
  errors: FieldErrors<SignUpForm4Schema>;
  formData: FormData;
}

const SignUpForm4 = (props: SignUpForm4Props) => {
  const { control, errors, formData: initialFormData } = props;

  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

 const defaultCrops = formData.company?.mainCrops?.map((crop) => {
      return {
        value: crop,
        label: crop,
      };
    })


  return (
    <div className="w-full">
      <Form>
        <FormItem
          label="¿A qúe categoria empresarial pertenece?"
          invalid={Boolean(errors.businessCategory)}
          errorMessage="Este campo es requerido"
        >
          <Controller
            name="businessCategory"
            control={control}
            defaultValue={
              formData.company.businessCategory === ""
                ? undefined
                : {
                    value: formData.company.businessCategory,
                    label: formData.company.businessCategory,
                  }
            }
            render={({ field }) => (
              <Select
                placeholder="Selecciona una opción"
                options={[
                  {
                    value: "Asociaciones y Cooperativas",
                    label: "Asociaciones y Cooperativas",
                  } as any,
                  {
                    value: "Corredores de productos Agrícolas",
                    label: "Corredores de productos Agrícolas",
                  } as any,
                  {
                    value: "Empresas de Exportación e Importación",
                    label: "Empresas de Exportación e Importación",
                  } as any,
                  {
                    value: "Entidad Educativa e Investigación",
                    label: "Entidad Educativa e Investigación",
                  } as any,
                  {
                    value: "Entidad Gubernamental para la Gestión Agrícola",
                    label: "Entidad Gubernamental para la Gestión Agrícola",
                  } as any,
                  {
                    value: "Organización de Comercio Justo y Certificación",
                    label: "Organización de Comercio Justo y Certificación",
                  } as any,
                  {
                    value:
                      "Organización de Iniciativa Social para el Sector Agrícola",
                    label:
                      "Organización de Iniciativa Social para el Sector Agrícola",
                  } as any,
                  {
                    value: "Producción y Comercialización Agrícola",
                    label: "Producción y Comercialización Agrícola",
                  } as any,
                ]}
                {...field}
              />
            )}
          />
        </FormItem>
        <FormItem
          label="¿Sector empresarial en el que se encuentra?"
          invalid={Boolean(errors.businessSector)}
          errorMessage="Este campo es requerido"
        >
          <Controller
            name="businessSector"
            control={control}
            defaultValue={
              formData.company.businessSector === ""
                ? undefined
                : {
                    value: formData.company.businessSector,
                    label: formData.company.businessSector,
                  }
            }
            render={({ field }) => (
              <Select
                placeholder="Selecciona una opción"
                options={[
                  {
                    value: "Asociaciones y Cooperativas",
                    label: "Asociaciones y Cooperativas",
                  } as any,
                  {
                    value: "Corredores de productos Agrícolas",
                    label: "Corredores de productos Agrícolas",
                  } as any,
                  {
                    value: "Empresas de Exportación e Importación",
                    label: "Empresas de Exportación e Importación",
                  } as any,
                  {
                    value: "Entidad Educativa e Investigación",
                    label: "Entidad Educativa e Investigación",
                  } as any,
                  {
                    value: "Entidad Gubernamental para la Gestión Agrícola",
                    label: "Entidad Gubernamental para la Gestión Agrícola",
                  } as any,
                  {
                    value: "Organización de Comercio Justo y Certificación",
                    label: "Organización de Comercio Justo y Certificación",
                  } as any,
                  {
                    value:
                      "Organización de Iniciativa Social para el Sector Agrícola",
                    label:
                      "Organización de Iniciativa Social para el Sector Agrícola",
                  } as any,
                  {
                    value: "Producción y Comercialización Agrícola",
                    label: "Producción y Comercialización Agrícola",
                  } as any,
                ]}
                {...field}
              />
            )}
          />
        </FormItem>
        <FormItem
          label="Seleccione los principales cultivos que gestiona"
          invalid={Boolean(errors.mainCrops)}
          errorMessage={errors.mainCrops?.message}
        >
          <Controller
            name="mainCrops"
            control={control}
            defaultValue={defaultCrops || []} // Valor inicial
            render={({ field }) => (
              <Select
          isMulti
          placeholder="Selecciona una o mas opciones"
          defaultValue={defaultCrops || []} // Valor inicial
          options={[
            {
              value: "Aguacate",
              label: "Aguacate",
            },
            {
              value: "Algodón",
              label: "Algodón",
            },
            {
              value: "Arroz",
              label: "Arroz",
            },
            {
              value: "Cacao",
              label: "Cacao",
            },
            {
              value: "Café",
              label: "Café",
            },
            {
              value: "Caña de Azúcar",
              label: "Caña de Azúcar",
            },
            {
              value: "Cítricos",
              label: "Cítricos",
            },
            {
              value: "Flores y Ornamentales",
              label: "Flores y Ornamentales",
            },
            {
              value: "Frijol",
              label: "Frijol",
            },
            {
              value: "Frutales",
              label: "Frutales",
            },
            {
              value: "Hortalizas",
              label: "Hortalizas",
            },
            {
              value: "Maíz",
              label: "Maíz",
            },
            {
              value: "Palma de Aceite",
              label: "Palma de Aceite",
            },
            {
              value: "Papa",
              label: "Papa",
            },
            {
              value: "Plátano",
              label: "Plátano",
            },
            {
              value: "Sorgo",
              label: "Sorgo",
            },
            {
              value: "Tabaco",
              label: "Tabaco",
            },
            {
              value: "Trigo",
              label: "Trigo",
            },
            {
              value: "Yuca",
              label: "Yuca",
            },
          ]}
          {...field}
          onChange={(selectedOptions) => {
            field.onChange(selectedOptions);
            setFormData((prevFormData) => ({
              ...prevFormData,
              company: {
                ...prevFormData.company,
                mainCrops: selectedOptions.map((option) => option.value),
              },
            }));
          }}
          value={field.value && defaultCrops || []}
              />
            )}
          />
        </FormItem>
      </Form>
    </div>
  );
};

export default SignUpForm4;
