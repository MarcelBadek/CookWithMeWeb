import { FC } from "react";
import { api } from "../../api/api";
import { LoginType } from "../../types/LoginType";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const LoginPage: FC = () => {
  const form = useForm<LoginType>();
  const navigate = useNavigate();

  const sendData: SubmitHandler<LoginType> = (values) => {
    api.post("/login", values).then((res) => {
      if (res.status == 200) {
        localStorage.setItem("token", res.data["token"]);
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(sendData)} className="h-min">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Provide username"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Provide password"
                      type="password"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
