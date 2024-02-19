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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof LoginType>>({
    resolver: zodResolver(LoginType),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const login: SubmitHandler<z.infer<typeof LoginType>> = (values) => {
    api.post("/login", values).then((res) => {
      if (res.status == 200) {
        localStorage.setItem("token", res.data["token"]);
        navigate("/");
      } else {
        console.log("fail");
        // TODO
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen flex-col">
        <div className="mb-3 text-2xl">Login</div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(login)}
            className="h-min w-1/4 flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Provide username" {...field} />
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button onClick={() => navigate("/")}>Back</Button>
              <Button type="submit">Login</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
