import Navbar from "@/components/navbar";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <>
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex justify-center items-center">
        <div className="w-4/5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
