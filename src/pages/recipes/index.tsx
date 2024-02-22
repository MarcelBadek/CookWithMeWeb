import { api } from "@/api/api";
import RecipeCard from "@/components/recipeCard";
import { RecipeType } from "@/types/recipe/RecipeType";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipesPage: FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Zod.infer<typeof RecipeType>[]>([]);

  const getData = () => {
    api.get("/recipes").then((res) => {
      setData([...res.data]);
    });
  };

  useEffect(() => getData(), []);

  const handleClick = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <>
      <div className="mb-3 text-2xl text-center">Recipes</div>
      <div className="flex justify-center gap-2 flex-wrap">
        {data &&
          data.map((recipe) => (
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

export default RecipesPage;
