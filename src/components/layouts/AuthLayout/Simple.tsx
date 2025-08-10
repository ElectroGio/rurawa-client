import { cloneElement } from "react";
import Container from "@/components/shared/Container";
import type { ReactNode, ReactElement } from "react";
import type { CommonProps } from "@/@types/common";

interface SimpleProps extends CommonProps {
  content?: ReactNode;
}

const Simple = ({ children, content, ...rest }: SimpleProps) => {
  return (
    <div className="bg-[#F4F9FD] dark:bg-gray-800 h-full px-4 py-8">
      <div className="h-full">
        {children
          ? cloneElement(children as ReactElement, {
              contentClassName: "text-center",
              ...rest,
            })
          : null}
      </div>
    </div>
  );
};

export default Simple;
