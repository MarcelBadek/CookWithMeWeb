import { z } from "zod";
import { AccountType } from "../account/AccountType";
import { CategoryType } from "../category/CategoryType";

export const RecipeType = z.object({
  id: z.string(),
  name: z.string(),
  preparationTime: z.number(),
  ingredients: z.string(),
  description: z.string(),
  categories: z.array(CategoryType),
  author: AccountType,
});
