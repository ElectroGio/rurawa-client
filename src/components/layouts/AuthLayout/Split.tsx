import { cloneElement } from "react";
import type { ReactNode } from "react";
import type { CommonProps } from "@/@types/common";
import { Steps } from "@/components/ui";

interface SplitProps extends CommonProps {
  content?: ReactNode;
}

const Split = ({ children, content, ...rest }: SplitProps) => {
  return (
    <div className="flex h-full p-6 bg-[#F4F9FD] dark:bg-gray-800">
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
          <Steps vertical current={0} className="mt-12">
            <Steps.Item title="Válida tu teléfono" />
            <Steps.Item title="Cuéntanos sobre tí" />
            <Steps.Item title="Habla sobre tu empresa" />
            <Steps.Item title="Invitar equipo de trabajo" />
          </Steps>
        </div>
      </div>
      <div className=" bg-white  w-full rounded-3xl shadow-[0px_6px_58px_0px_#C4CBD61A]">
        <div className="w-full h-full">
          <div>{content}</div>
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

export default Split;
