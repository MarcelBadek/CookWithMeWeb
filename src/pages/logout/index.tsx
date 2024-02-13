import { FC, useEffect } from "react";
import { removeToken } from "../../api/api";

const LogoutPage: FC = () => {
  const remove = () => {
    removeToken();
  };

  useEffect(() => {
    remove();
  }, []);

  return <></>;
};

export default LogoutPage;
