import { ActionLink } from "@/components/shared";
import { Button } from "@/components/ui";
import React from "react";

const SuccessSignUp = () => {
  return (
    <div className="h-full px-7">
      <div
        className="w-full bg-white h-full flex flex-col items-center justify-center"
        style={{
          boxShadow: "0px 6px 58px 0px #C4CBD61A",
        }}
      >
        <img src="img/auth/success.png" alt="SuccessImg" className="w-1/3 min-w-60" />
        <p className="text-center text-lg text-secondary mt-8 font-semibold">
          ¡Te has registrado exitosamente!
        </p>
        <ActionLink
        to="/sign-in"
        >

        <Button variant="solid" className="mt-8">Iniciar Sesión</Button>
        </ActionLink>
      </div>
    </div>
  );
};

export default SuccessSignUp;
