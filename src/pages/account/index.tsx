import { api, getId } from "@/api/api";
import RecipeCard from "@/components/recipeCard";
import { RecipeType } from "@/types/RecipeType";
import { FC, useEffect, useState } from "react";

const AccountPage: FC = () => {
  const [data, setData] = useState<RecipeType[]>([]);

  const loadData = () => {
    const id = getId();
    console.log(id);
    api.get(`/recipes/author/${id}`).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => loadData(), []);

  const handleClick = (id: string) => {
    // TODO
    console.log(id);
  };

  return (
    <>
      <div className="border-b-2 mb-2">My recipes</div>
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

export default AccountPage;
