import Navbar from "@/components/navbar";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <>
      <div className="w-full">
        <Navbar />
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
