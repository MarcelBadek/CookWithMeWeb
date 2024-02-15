import { api } from "@/api/api";
import RecipeCard from "@/components/recipeCard";
import { RecipeType } from "@/types/RecipeType";
import { FC, useEffect, useState } from "react";

const RecipesPage: FC = () => {
  const [data, setData] = useState<RecipeType[]>([]);
  const getData = () => {
    api.get("/recipe").then((res) => {
      setData([...res.data]);
    });
  };

  useEffect(() => getData(), []);

  return (
    <>
      <div className="mb-3 text-2xl text-center">Recipes</div>
      <div className="flex justify-center gap-2 flex-wrap">
        {data &&
          data.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} />)}
      </div>
    </>
  );
};

export default RecipesPage;
