import {
  Role,
  getEmail,
  getFirstName,
  getLastName,
  getRole,
  getUsername,
} from "@/api/authData";
import { AccountUpdateType } from "@/types/AccountUpdateType";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { api } from "@/api/api";

const AccountInformation: FC = () => {
  const form = useForm<z.infer<typeof AccountUpdateType>>({
    resolver: zodResolver(AccountUpdateType),
    defaultValues: {
      firstName: getFirstName(),
      lastName: getLastName(),
    },
  });

  const updateAccount: SubmitHandler<z.infer<typeof AccountUpdateType>> = (
    values
  ) => {
    if (getRole() === Role.CLIENT) {
      api.put("/client", values).then((res) => {
        if (res.status == 200) {
          console.log(res.data);
        }
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(updateAccount)}
          className="flex flex-col gap-2"
        >
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" placeholder={getUsername()} disabled></Input>
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="text" placeholder={getEmail()} disabled></Input>
            </FormControl>
          </FormItem>
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
          <Button type="submit">Update</Button>
        </form>
      </Form>
    </>
  );
};

export default AccountInformation;
