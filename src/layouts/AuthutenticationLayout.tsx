import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthenticationLayout: FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthenticationLayout;
