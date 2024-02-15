import { RecipeType } from "@/types/RecipeType";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  recipe: RecipeType;
}

const RecipeCard: FC<Props> = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <>
      <div
        className="border rounded-md border-bg-accent p-2 cursor-pointer hover:bg-accent"
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
