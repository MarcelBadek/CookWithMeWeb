import { FC } from "react";

const NotFoundPage: FC = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className="text-9xl font-bold m-20">404</div>
        <div className="text-5xl font-bold ">Page not found :(</div>
        <div className="text-3xl font-bold "></div>
      </div>
    </>
  );
};

export default NotFoundPage;
