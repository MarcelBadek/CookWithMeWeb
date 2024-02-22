import { RecipeType } from "@/types/recipe/RecipeType";
import { FC } from "react";

interface Props {
  recipe: Zod.infer<typeof RecipeType>;
  handleClick: (id: string) => void;
}

const RecipeCard: FC<Props> = ({ recipe, handleClick }) => {
  return (
    <>
      <div
        className="border rounded-md border-bg-accent p-2 cursor-pointer hover:bg-accent basis-1/5 grow-0 shrink-0"
        onClick={() => handleClick(recipe.id)}
      >
        <div className="font-bold">{recipe.name}</div>
        <div className="flex gap-2">
          <div>Preparation time:</div>
          <div className="">{recipe.preparationTime} min</div>
        </div>
        <div className="flex gap-2">
          <div>Author:</div>
          <div>{recipe.author.username}</div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
