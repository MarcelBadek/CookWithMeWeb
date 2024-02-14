import { z } from "zod";

export const RegisterType = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is mandatory.",
    })
    .email({
      message: "This is not valid email",
    }),
  firstName: z
    .string()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  lastName: z
    .string()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  password: z.string().min(6, {
    message: "Username must be at least 3 characters.",
  }),
});
