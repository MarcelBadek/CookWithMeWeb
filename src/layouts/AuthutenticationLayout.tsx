import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthenticationLayout: FC = () => {
  return (
    <>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </>
  );
};

export default AuthenticationLayout;
