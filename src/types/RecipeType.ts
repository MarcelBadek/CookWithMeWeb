import { AccountType } from "./AccountType";
import { CategoryType } from "./CategoryType";

export interface RecipeType {
  id: string;
  name: string;
  preparationTime: number;
  ingredients: string;
  description: string;
  categories: CategoryType[];
  author: AccountType;
}
