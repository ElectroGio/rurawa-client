import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { FormItem, Form } from "@/components/ui/Form";
import { useAuth } from "@/auth";
import {
  Controller,
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  SubmitHandler,
} from "react-hook-form";
import type { CommonProps } from "@/@types/common";
import { Select } from "@/components/ui";
import { countryList } from "@/constants/countries.constant";
import { HiInformationCircle } from "react-icons/hi2";
import { useState } from "react";

interface User {
  countryCode: string;
  phoneNumber: string;
}
interface FormData {
  user: User;
}

interface SignUpFormProps extends CommonProps {
  phoneControl: Control<phoneSchema>;
  phoneErrors: FieldErrors<phoneSchema>;
  smsControl: Control<smsValidationSchema>;
  smsErrors: FieldErrors<smsValidationSchema>;
  isSubmitting: boolean;
  isSmsSubmitted: boolean;
  handlePhoneSubmit: UseFormHandleSubmit<phoneSchema>;
  handleSmsSubmit: UseFormHandleSubmit<smsValidationSchema>;
  inputRefs: React.RefObject<HTMLInputElement[]>;
  onSendSms: SubmitHandler<smsValidationSchema>;
  onSendPhone: SubmitHandler<phoneSchema>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  sendPhone: boolean;
  onSubmit: () => void;
  formData: FormData;
}

type phoneSchema = {
  countryCode: string;
  phoneNumber: string;
};

type smsValidationSchema = {
  code: string;
};

const SignUpForm1 = (props: SignUpFormProps) => {
  const {
    phoneControl,
    phoneErrors,
    smsControl,
    smsErrors,
    isSubmitting,
    isSmsSubmitted,
    handlePhoneSubmit,
    handleSmsSubmit,
    inputRefs,
    onSendSms,
    onSendPhone,
    handleChange,
    sendPhone,
    formData: initialFormData,
  } = props;

  const { signUp } = useAuth();

  // Estado para formData, cargado desde localStorage si está disponible
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : initialFormData;
  });


  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const target = e.currentTarget as HTMLInputElement;
    if (e.key === "Backspace" && index > 0 && !target.value) {
      if (inputRefs.current) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="w-full">
      <Form onSubmit={handlePhoneSubmit(onSendPhone)} className="w-full">
        <FormItem
          label="Número de teléfono"
          invalid={Boolean(phoneErrors.phoneNumber)}
          errorMessage={phoneErrors.phoneNumber?.message}
        >
          <div className="flex">
            <Controller
              name="countryCode"
              control={phoneControl}
              disabled={sendPhone}
              render={({ field }) => (
                <Select
                  placeholder="Indicativo"
                  isDisabled={sendPhone}
                  className="w-32"
                  options={countryList.map((country) => {
                    return {
                      label: `${country.dialCode}`,
                      value: country.dialCode.replace("+", ""),
                    };
                  })}
                  defaultValue={
                    formData.user.countryCode
                      ? {
                          label: `+${formData.user.countryCode}`,
                          value: formData.user.countryCode,
                        }
                      : { label: "+57", value: "57" }
                  }
                  onChange={(value) => {
                    field.onChange(value?.value);
                  }}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              defaultValue={formData?.user?.phoneNumber ? formData.user.phoneNumber : ""}
              control={phoneControl}
              disabled={sendPhone}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="phoneNumber"
                  autoComplete="off"
                  className="ml-2"
                  {...field}
                  onChange={(e) => {
                    const phoneNumber = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                    field.onChange(phoneNumber);
                  }}
                  value={field.value || formData.user.phoneNumber}
                  suffix={
                    <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="w-full"
                    variant="plain"
                    >
                      {sendPhone ? "Reenvíar código" : "Envíar teléfono"}
                    </Button>
                  }
                  
                />
              )}
            />
          </div>
        </FormItem>
      </Form>
      {sendPhone && (
        <>
          <Form onSubmit={handleSmsSubmit(onSendSms)}>
            <FormItem
              label="Código de SMS"
              invalid={isSmsSubmitted && Boolean(smsErrors.code)}
              errorMessage={isSmsSubmitted ? smsErrors.code?.message : ""}
            >
              <Controller
                name="code"
                defaultValue=""
                control={smsControl}
                render={({ field, fieldState: { error } }) => (
                  <div style={{ display: "flex", gap: "16px" }}>
                    {Array.from({ length: 4 }, (_, index) => (
                      <Input
                        key={index}
                        ref={(el) => {
                          if (inputRefs.current) {
                            inputRefs.current[index] = el as HTMLInputElement;
                          }
                        }}
                        type="text"
                        maxLength={1}
                        value={field.value[index] || ""}
                        onChange={(e) =>
                          handleChange(
                            e as React.ChangeEvent<HTMLInputElement>,
                            index
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(
                            e as React.KeyboardEvent<HTMLInputElement>,
                            index
                          )
                        }
                        className="w-16 h-14 text-center text-lg text-[#7D8592] font-medium"
                      />
                    ))}
                  </div>
                )}
              />
            </FormItem>
          </Form>
          <div className="bg-[#F4F9FD] dark:bg-gray-800 p-6 flex rounded-2xl ">
            <div className="mr-2">
              <HiInformationCircle className="text-2xl text-secondary" />
            </div>
            <p>
              <span className="font-medium  text-secondary ">
                SMS fue enviado a su número{" "}
                {`+${formData.user.countryCode} ${formData.user.phoneNumber}`} Será
                válido hasta las 01:25
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUpForm1;
