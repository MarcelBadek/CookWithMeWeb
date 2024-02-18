import { getToken } from "@/api/api";
import NotFoundPage from "@/pages/notFound";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthenticatedLayout: FC = () => {
  const token = getToken();

  return <>{!token ? <NotFoundPage /> : <Outlet />}</>;
};

export default AuthenticatedLayout;
