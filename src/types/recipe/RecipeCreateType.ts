import { z } from "zod";
import { CategoryType } from "../category/CategoryType";

export const RecipeCreateType = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  preparationTime: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({
        invalid_type_error: "Preperation time must be a natural number",
      })
      .min(1, "Preperation time be positive")
  ),
  ingredients: z.string().min(3, {
    message: "Ingredients must be at least 3 characters.",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 3 characters.",
  }),
  categories: z
    .array(CategoryType)
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one category",
    }),
});
