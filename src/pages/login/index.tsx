import { FC } from "react";
import { api } from "../../api/api";
import { LoginType } from "../../types/LoginType";
import { SubmitHandler, useForm } from "react-hook-form";

const LoginPage: FC = () => {
  const { register, handleSubmit } = useForm<LoginType>();

  const sendData: SubmitHandler<LoginType> = (values) => {
    api.post("/login", values).then((res) => {
      if (res.status == 200) {
        localStorage.setItem("token", res.data["token"]);
      }
    });
  };

  return (
    <>
      <div>Login</div>
      <form onSubmit={handleSubmit(sendData)}>
        <input type="text" placeholder="username" {...register("username")} />
        <input type="text" placeholder="password" {...register("password")} />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginPage;
