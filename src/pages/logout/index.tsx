import { FC, useEffect } from "react";
import { removeToken } from "../../api/api";
import { useNavigate } from "react-router-dom";

const LogoutPage: FC = () => {
  const navigate = useNavigate();

  const remove = () => {
    removeToken();
    navigate("/");
  };

  useEffect(() => {
    remove();
  }, []);

  return <></>;
};

export default LogoutPage;
