import { api } from "@/api/api";
import { FC } from "react";
import { RegisterType } from "@/types/RegisterType";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof RegisterType>>({
    resolver: zodResolver(RegisterType),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const register: SubmitHandler<z.infer<typeof RegisterType>> = (values) => {
    api.post("/register", values).then((res) => {
      if (res.status == 200) {
        navigate("/login");
      } else {
        // TODO
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen flex-col">
        <div className="mb-3 text-2xl">Register</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(register)} className="h-min w-1/4">
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Provide email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Provide first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Provide last name" {...field} />
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
                  <FormLabel>Passowrd</FormLabel>
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
            <div className="flex justify-between mt-2">
              <Button onClick={() => navigate("/")}>Back</Button>
              <Button type="submit">Register</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default RegisterPage;
