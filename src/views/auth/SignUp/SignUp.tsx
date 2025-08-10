import Alert from "@/components/ui/Alert";
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage";
import { useEffect, useRef, useState } from "react";
import { Button, Steps } from "@/components/ui";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import SignUpForm1 from "./components/SignUpForm1";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpForm2 from "./components/SignUpForm2";
import SignUpForm3 from "./components/SignUpForm3";
import SignUpForm4 from "./components/SignUpForm4";
import SignUpForm5 from "./components/SignUpForm5";
import SignUpForm6 from "./components/SignUpForm6";
import SignUpFormRepLeg from "./components/SignUpFormRepLeg";
import { apiSignUp } from "@/services/AuthService";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Dialog } from "@mui/material";

type SignUpProps = {
  disableSubmit?: boolean;
  signInUrl?: string;
};

type phoneSchema = {
  countryCode: string;
  phoneNumber: string;
};

type SignInFormSchema = {
  email: string;
  password: string;
};

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

const defaultPhoneValues: phoneSchema = {
  countryCode: "57",
  phoneNumber: "",
};

type smsValidationSchema = {
  code: string;
};

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

type SignUpForm5Schema = {
  name: string;
  taxId: string;
  employeeSize: string;
};

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

type SignUpFormRepLegSchema = {
  firstName: string;
  lastName: string;
  documentNumber: string;
};

const phoneValidationSchema: ZodType<phoneSchema> = z.object({
  countryCode: z
    .string()
    .nonempty({ message: "El número de teléfono es requerido" }),
  phoneNumber: z
    .string()
    .nonempty({ message: "El número de teléfono es requerido" })
    .regex(/^\d+$/, { message: "El número de teléfono debe ser un número" }),
});

const validationSchema: ZodType<SignInFormSchema> = z.object({
  email: z
    .string({ required_error: "Se requiere un correo electrónico" })
    .min(1, { message: "Se requiere un correo electrónico" })
    .email({ message: "El correo electrónico no es válido" }),
  password: z
    .string({ required_error: "Se requiere una contraseña" })
    .min(1, { message: "Se requiere una contraseña" }),
});

const smsValidationSchema: ZodType<smsValidationSchema> = z.object({
  code: z.string(),
});

const AboutYouValidationSchema: ZodType<AboutYouFormSchema> = z.object({
  reasonForUse: z
    .object({ value: z.string(), label: z.string() })
    .refine((data) => data.value !== "" && data.label !== "", {
      message: "Este campo es requerido",
    }),
  profileDescription: z
    .object({ value: z.string(), label: z.string() })
    .refine((data) => data.value !== "" && data.label !== "", {
      message: "Este campo es requerido",
    }),
  personType: z.number(),
});

const CompanyInfoValidationSchema: ZodType<SignUpForm4Schema> = z.object({
  businessCategory: z.object({
    value: z.string().min(1, { message: "Este campo es requerido" }), // Requerido solo si no está vacío
    label: z.string(),
  }),
  businessSector: z
    .object({ value: z.string(), label: z.string() })
    .refine((data) => data.value !== "" && data.label !== "", {
      message: "Este campo es requerido",
    }),
  mainCrops: z
    .array(
      z
        .object({ value: z.string(), label: z.string() })
        .refine((data) => data.value !== "" && data.label !== "", {
          message: "Este campo es requerido",
        })
    )
    .nonempty({ message: "Este campo es requerido" }),
});

const SignUpForm5ValidationSchema: ZodType<SignUpForm5Schema> = z.object({
  name: z.string().nonempty({ message: "Este campo es requerido" }),
  taxId: z.string().nonempty({ message: "Este campo es requerido" }),
  employeeSize: z.string().nonempty({ message: "Este campo es requerido" }),
});

const SignUpForm6ValidationSchema: ZodType<SignUpForm6Schema> = z.object({
  street: z.string().nonempty({ message: "Este campo es requerido" }),
  country: z.object({
    value: z.string().nonempty({ message: "Este campo es requerido" }),
    label: z.string().nonempty({ message: "Este campo es requerido" }),
  }),
  state: z.object({
    value: z.string().nonempty({ message: "Este campo es requerido" }),
    label: z.string().nonempty({ message: "Este campo es requerido" }),
  }),
  city: z.object({
    value: z.string().nonempty({ message: "Este campo es requerido" }),
    label: z.string().nonempty({ message: "Este campo es requerido" }),
  }),
});

const SignUpFormRepLegValidationSchema: ZodType<SignUpFormRepLegSchema> =
  z.object({
    firstName: z.string().nonempty({ message: "Este campo es requerido" }),
    lastName: z.string().nonempty({ message: "Este campo es requerido" }),
    documentNumber: z.string().nonempty({ message: "Este campo es requerido" }),
  });

export const SignUpBase = ({
  signInUrl = "/sign-in",
  disableSubmit,
}: SignUpProps) => {
  const {
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
    control: phoneControl,
  } = useForm<phoneSchema>({
    resolver: zodResolver(phoneValidationSchema),
    defaultValues: defaultPhoneValues,
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignInFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const {
    handleSubmit: handleSmsSubmit,
    formState: { errors: smsErrors, isSubmitted: isSmsSubmitted },
    control: smsControl,
    getValues,
    setValue: setSmsValue,
  } = useForm<smsValidationSchema>({
    resolver: zodResolver(smsValidationSchema),
    defaultValues: { code: "" },
  });

  const {
    handleSubmit: handleAboutYouSubmit,
    formState: { errors: errorsAboutYou },
    control: controlAboutYou,
  } = useForm<AboutYouFormSchema>({
    defaultValues: {
      personType: 0,
    },
    resolver: zodResolver(AboutYouValidationSchema),
  });

  const {
    handleSubmit: handleCompanyInfoSubmit,
    formState: { errors: errorsCompanyInfo },
    control: controlCompanyInfo,
  } = useForm<SignUpForm4Schema>({
    defaultValues: {
      mainCrops: [],
    },
    resolver: zodResolver(CompanyInfoValidationSchema),
  });

  const {
    handleSubmit: handleSignUpForm5Submit,
    formState: { errors: errorsSignUpForm5 },
    control: controlSignUpForm5,
  } = useForm<SignUpForm5Schema>({
    defaultValues: {
      name: "",
      taxId: "",
      employeeSize: "",
    },
    resolver: zodResolver(SignUpForm5ValidationSchema),
  });

  const {
    handleSubmit: handleSignUpForm6Submit,
    formState: { errors: errorsSignUpForm6 },
    control: controlSignUpForm6,
    watch,
  } = useForm<SignUpForm6Schema>({
    resolver: zodResolver(SignUpForm6ValidationSchema),
  });

  const {
    handleSubmit: handleSignUpFormRepLegSubmit,
    formState: { errors: errorsSignUpFormRepLeg },
    control: controlSignUpFormRepLeg,
  } = useForm<SignUpFormRepLegSchema>({
    resolver: zodResolver(SignUpFormRepLegValidationSchema),
  });

  const navigate = useNavigate();

  const [message, setMessage] = useTimeOutMessage();
  const [step, setStep] = useState(
    parseInt(localStorage.getItem("step") || "0")
  );
  // const [formData, setFormData] = useState({
  //   phoneNumber: "",
  //   countryCode: "",
  //   email: "",
  //   password: "",
  //   reasonForUse: "",
  //   profileDescription: "",
  //   personType: 0,
  //   businessCategory: "",
  //   businessSector: "",
  //   mainCrops: [],
  //   name: "",
  //   taxId: "",
  //   employeeSize: "",
  // });
  const [formData, setFormData] = useState(() => {
    // Intentar cargar el estado inicial desde localStorage
    const savedFormData = localStorage.getItem("formData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          company: {
            name: "",
            taxId: "",
            reasonForUse: "",
            profileDescription: "",
            personType: "0",
            businessCategory: "",
            businessSector: "",
            mainCrops: [],
            employeeSize: "",
            address: {
              street: "",
              city: "",
              state: "",
              country: "",
            },
          },
          user: {
            firstName: "",
            lastName: "",
            documentNumber: "",
            email: "",
            countryCode: "",
            phoneNumber: "",
            password: "",
          },
        };
  });

  const [sendData, setSendData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      console.log("Final Form Data:", formData);
      const result = await apiSignUp(formData);
      console.log("formDatasend", formData);
      console.log("Sign Up Result:", result);
      if (result) {
        setLoading(false);
        navigate("/success-sign-up");
      }
    } catch (error) {
      setLoading(false);
      console.error("Sign Up Error:", error);
      setMessage(
        "No se ha podido completar el registro, intentalo nuevamente mas tarde"
      );
    }
  };

  useEffect(() => {
    if (sendData) {
      handleFormSubmit();
      setSendData(false);
    }
  }, [sendData]);

  useEffect(() => {
    // Guardar formData en localStorage cada vez que cambie
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("step", step.toString());
  }, [step]);

  useEffect(() => {
    const data = localStorage.getItem("formData");
    if (data) {
      setFormData(JSON.parse(data));
    }
  }, []);

  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [sendPhone, setSendPhone] = useState<boolean>(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleNextStep = (newData: any) => {
    // setFormData((prev: typeof formData) => ({ ...prev, ...newData }));
    setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    if (step === 0) {
      return;
    } else {
      setStep((prev) => prev - 1);
    }
  };
  console.log("formData", formData);
  //---------------------------------------------- Paso 1: Validar teléfono ----------------------------------------------
  const onSendPhone = async (values: phoneSchema) => {
    const { countryCode, phoneNumber } = values;

    setSendPhone(true);
    setSubmitting(false);

    setFormData((prev: typeof formData) => ({
      ...prev,
      user: {
        ...prev.user,
        phoneNumber: phoneNumber,
        countryCode: countryCode,
      },
    }));

    // try {
    //   const resp = await apiSendPhone<boolean>({ phoneNumber });
    //   if (resp) {
    //     setSubmitting(false);
    //   }
    // } catch (errors) {
    //   setMessage?.(
    //     typeof errors === "string" ? errors : "Some error occured!"
    //   );
    //   setSubmitting(false);
    // }
  };

  const onSendSms = async (values: smsValidationSchema) => {
    const { code } = values;
    console.log("code", code);
    // try {
    //   const resp = await apiSendSms<boolean>({ code });
    //   if (resp) {
    //     setSubmitting(false);
    //   }
    // } catch (errors) {
    //   setMessage?.(
    //     typeof errors === "string" ? errors : "Some error occured!"
    //   );
    //   setSubmitting(false);
    // }

    setSubmitting(false);
  };

  const handleChangeSms = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target as HTMLInputElement;
    if (!/^\d?$/.test(value)) return; // Solo permite un dígito numérico
    const currentCode = getValues("code").split("");
    currentCode[index] = value;
    const newCode = currentCode.join("");
    setSmsValue("code", newCode, { shouldValidate: false });

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 3 && value) {
      handleSmsSubmit((data) => {
        if (data.code === "1234") {
          // Define the onComplete function or handle the completion logic here
          console.log("SMS Code Submitted:", data.code);
          setSmsValue("code", "", { shouldValidate: false });
          inputRefs.current[0]?.focus();
          setStep((prev) => prev + 1);
        } else {
          setMessage("El código ingresado es incorrecto");
          setSmsValue("code", "", { shouldValidate: true });
          inputRefs.current[0]?.focus();
        }
      })();
    }
  };

  //---------------------------------------------- Paso 2: Información personal ----------------------------------------------

  const handleSign = async (values: SignInFormSchema) => {
    const { email, password } = values;
    console.log("email", email);
    setFormData((prev: typeof formData) => ({
      ...prev,
      user: {
        ...prev.user,
        email: email,
        password: password,
      },
    }));
    handleNextStep({});
  };

  //---------------------------------------------- Paso 3: Cuéntanos sobre tí ----------------------------------------------
  const handleAboutYou = async (values: AboutYouFormSchema) => {
    const { reasonForUse, profileDescription, personType } = values;
    setFormData((prev: typeof formData) => ({
      ...prev,
      company: {
        ...prev.company,
        reasonForUse: reasonForUse.value,
        profileDescription: profileDescription.value,
        personType: `${personType}`,
      },
    }));
    handleNextStep({});
  };

  //---------------------------------------------- Paso 4: Cuéntanos sobre tí ----------------------------------------------

  const handleCompanyInfo = async (values: SignUpForm4Schema) => {
    const { businessCategory, businessSector, mainCrops } = values;
    setFormData((prev: typeof formData) => ({
      ...prev,
      company: {
        ...prev.company,
        businessCategory: businessCategory.value,
        businessSector: businessSector.value,
        mainCrops: mainCrops.map((crop) => crop.value),
      },
    }));
    handleNextStep({});
  };
  //---------------------------------------------- Paso 5: Hablanos de tu empresa ----------------------------------------------

  const handleSignUpForm5 = async (values: SignUpForm5Schema) => {
    const { name, taxId, employeeSize } = values;
    setFormData((prev: typeof formData) => ({
      ...prev,
      company: {
        ...prev.company,
        name,
        taxId,
        employeeSize,
      },
    }));
    handleNextStep({});
  };

  //---------------------------------------------- Paso 6: Hablanos de tu empresa ----------------------------------------------

  const handleSignUpForm6 = async (values: SignUpForm6Schema) => {
    const { street, country, state, city } = values;
    setFormData((prev: typeof formData) => ({
      ...prev,
      company: {
        ...prev.company,
        address: {
          street,
          country: country.value,
          state: state.value,
          city: city.value,
        },
      },
    }));
    handleNextStep({});
  };
  //------------------------------------------------------------------------------------------------------------------------

  const handleSignUpFormRepLeg = async (values: SignUpFormRepLegSchema) => {
    const { firstName, lastName, documentNumber } = values;
    setFormData((prev: typeof formData) => ({
      ...prev,
      user: {
        ...prev.user,
        firstName,
        lastName,
        documentNumber,
      },
    }));
    setSendData(true);
  };

  //------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="flex w-full h-full">
      {
        loading &&
      <Dialog open={loading}>
        <div className="p-12 flex justify-center items-center bg-white rounded-2xl">
          <CircularProgress color="secondary" />
        </div>
      </Dialog>
      } 
      <div className=" py-20 px-10 mr-8 flex-col hidden lg:flex bg-secondary min-w-[320px] rounded-3xl">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <img
              src="img/logo/logo-rurawa-mini.svg"
              alt="Logo"
              className="h-16"
            />
          </div>
          <p className="text-white text-3xl font-semibold  mt-20">Empezar</p>
          <Steps
            vertical
            current={
              step === 0
                ? 0
                : step === 1
                  ? 1
                  : step === 2
                    ? 2
                    : step === 3
                      ? 2
                      : step === 4
                        ? 3
                        : step === 5 || step === 6
                          ? 3
                          : 4
            }
            className="mt-12"
          >
            <Steps.Item title="Válida tu teléfono" />
            <Steps.Item title="Información personal" />
            <Steps.Item title="Cuéntanos sobre tí" />
            <Steps.Item title="Habla sobre tu empresa" />
          </Steps>
        </div>
      </div>
      <div className="flex flex-col h-full justify-between w-full bg-white rounded-3xl items-center">
        <div className="flex flex-col items-center py-24 px-4 h-full max-w-xl w-full">
          <div className="mb-8">
            <p className="text-primary font-semibold text-center mb-1">
              PASO {step + 1}/7{" "}
            </p>

            <h3 className="font-semibold heading-text">
              {step === 0 && "Válida tu teléfono"}
              {step === 1 && "Información personal"}
              {(step === 2 || step === 3) && "Cuéntanos sobre tí"}
              {(step === 4 || step === 5) && "Habla sobre tu empresa"}
              {step === 6 && "Representante legal"}
              {step === 7 && "Invitar a miembros de la empresa"}
            </h3>
          </div>
          {message && (
            <Alert showIcon className="mb-4" type="danger">
              {message}
            </Alert>
          )}
          {step === 0 && (
            <SignUpForm1
              onSubmit={handlePhoneSubmit(onSendPhone)}
              phoneControl={phoneControl}
              phoneErrors={phoneErrors}
              smsControl={smsControl}
              smsErrors={smsErrors}
              isSubmitting={isSubmitting}
              isSmsSubmitted={isSmsSubmitted}
              handlePhoneSubmit={handlePhoneSubmit}
              handleSmsSubmit={handleSmsSubmit}
              inputRefs={inputRefs}
              onSendSms={onSendSms}
              handleChange={handleChangeSms}
              sendPhone={sendPhone}
              onSendPhone={onSendPhone}
              formData={formData}
            />
          )}
          {step === 1 && (
            <SignUpForm2
              // handleSubmit=
              // onSignIn=
              control={control}
              errors={errors}
              formData={formData}
            />
          )}
          {step === 2 && (
            <SignUpForm3
              // handleSubmit=
              // onSignIn=
              control={controlAboutYou}
              errors={errorsAboutYou}
              formData={formData}
            />
          )}
          {step === 3 && (
            <SignUpForm4
              control={controlCompanyInfo}
              errors={errorsCompanyInfo}
              formData={formData}
            />
          )}
          {step === 4 && (
            <SignUpForm5
              control={controlSignUpForm5}
              errors={errorsSignUpForm5}
              formData={formData}
            />
          )}
          {step === 5 && (
            <SignUpForm6
              control={controlSignUpForm6}
              errors={errorsSignUpForm6}
              watch={watch}
              formData={formData}
            />
          )}
          {step === 6 && (
            <SignUpFormRepLeg
              control={controlSignUpFormRepLeg}
              errors={errorsSignUpFormRepLeg}
              formData={formData}
            />
          )}
        </div>
        <div className="w-full">
          <div className="flex  justify-between px-6 py-4 border-t-[#E4E6E8] border-t-2 w-full">
            <Button
              // loading={isSubmitting}
              variant="plain"
              type="submit"
              className="text-secondary hover:text-secondary-mild "
              iconAlignment="start"
              icon={<AiOutlineArrowLeft className="mr-4 font-semibold" />}
              onClick={handlePreviousStep}
            >
              Regresar
            </Button>
            <Button
              // loading={isSubmitting}
              variant="solid"
              type="submit"
              iconAlignment="end"
              icon={<AiOutlineArrowRight className="ml-4 font-semibold" />}
              disabled={step === 0}
              onClick={
                step === 1
                  ? handleSubmit(handleSign)
                  : step === 2
                    ? handleAboutYouSubmit(handleAboutYou)
                    : step === 3
                      ? handleCompanyInfoSubmit(handleCompanyInfo)
                      : step === 4
                        ? handleSignUpForm5Submit(handleSignUpForm5)
                        : step === 5
                          ? handleSignUpForm6Submit(handleSignUpForm6)
                          : step === 6
                            ? handleSignUpFormRepLegSubmit(
                                handleSignUpFormRepLeg
                              )
                            : handleFormSubmit
              }
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignUp = () => {
  return <SignUpBase />;
};

export default SignUp;
