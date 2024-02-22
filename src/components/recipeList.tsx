import { RecipeType } from "@/types/recipe/RecipeType";
import { FC } from "react";
import RecipeCard from "./recipeCard";

interface Props {
  header: string;
  recipes: Zod.infer<typeof RecipeType>[];
  handleClick: (id: string) => void;
}

const RecipeList: FC<Props> = ({ header, recipes, handleClick }) => {
  return (
    <>
      <div className="border-b-2 mb-2">{header}</div>
      <div className="flex justify-center gap-2 flex-wrap">
        {recipes &&
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              handleClick={handleClick}
            />
          ))}
      </div>
    </>
  );
};

export default RecipeList;
