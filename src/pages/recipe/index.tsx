import { api } from "@/api/api";
import { RecipeType } from "@/types/RecipeType";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../notFound";

const RecipePage: FC = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeType>();
  const [isFounded, setFounded] = useState<boolean>(true);

  const loadData = () => {
    api
      .get(`/recipes/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setRecipe(res.data);
          console.log(res.data);
        }
      })
      .catch((_) => {
        setFounded(false);
        console.log("aaa");
      });
  };

  useEffect(() => loadData(), []);

  return (
    <>
      {recipe && (
        <>
          <div>{recipe.name}</div>
          <div>Author: {recipe.author.username}</div>
          <div>Preparation time: {recipe.preparationTime} minutes</div>
          <div className="flex">
            <div className="mr-1">Categories:</div>
            {recipe.categories.map((cat, index) => (
              <div>
                {index > 0 && ", "}
                {cat.name}
              </div>
            ))}
          </div>
          <div>Ingredients: {recipe.ingredients}</div>
          <div>{recipe.description}</div>
        </>
      )}
      {!isFounded && <NotFoundPage />}
    </>
  );
};

export default RecipePage;
