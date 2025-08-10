import { useMemo, lazy } from "react";
import type { CommonProps } from "@/@types/common";
import type { LazyExoticComponent } from "react";
import { useLocation } from "react-router-dom";

type LayoutType = "simple" | "split" | "side";

type Layouts = Record<
  LayoutType,
  LazyExoticComponent<<T extends CommonProps>(props: T) => JSX.Element>
>;

const layouts: Layouts = {
  simple: lazy(() => import("./Simple")),
  split: lazy(() => import("./Split")),
  side: lazy(() => import("./Side")),
};

const AuthLayout = ({ children }: CommonProps) => {
  const location = useLocation();

  const currentLayoutType: LayoutType = useMemo(() => {
    if (
      location.pathname === "/sign-in" ||
      location.pathname === "/forgot-password" ||
      location.pathname === "/reset-password"
    ) {
      return "side";
    } else if (location.pathname === "/sign-up") {
      return "simple";
    }
    return "simple";
  }, [location.pathname]);

  const Layout = useMemo(() => {
    return layouts[currentLayoutType];
  }, [currentLayoutType]);

  return <Layout>{children}</Layout>;
};

export default AuthLayout;
