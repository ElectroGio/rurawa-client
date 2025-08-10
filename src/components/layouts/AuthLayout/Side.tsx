import { cloneElement } from "react";
import type { CommonProps } from "@/@types/common";
import { ActionLink } from "@/components/shared";

type SideProps = CommonProps;

const Side = ({ children, ...rest }: SideProps) => {
  return (
    <div className="flex h-full bg-[#F4F9FD] dark:bg-gray-800 py-4 px-8 ">
      <div className="bg-secondary pt-24 lg:flex flex-col justify-between flex-1 items-start hidden relative  xl:max-w-[650px]  rounded-l-3xl ">
        <div className="px-10">
        <img src="img/logo/logo-rurawa-byv.svg" alt="Logo" className="h-10" />
        <p className="text-white text-3xl font-semibold leading-9 mt-20 max-w-md ">
          Interactua, comparte y mantente informado.
        </p>
        </div>
        <img src="img/auth/granja-login.png" alt="Granja" className="w-full" />
      </div>
      <div className=" flex flex-col justify-center items-center flex-1 bg-white rounded-r-3xl">
        <div className="w-full xl:max-w-[512px] px-8 max-w-[380px]">
          {children
            ? cloneElement(children as React.ReactElement, {
                ...rest,
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Side;
