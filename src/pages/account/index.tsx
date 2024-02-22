import { api } from "@/api/api";
import { getId } from "@/api/authData";
import AccountInformation from "@/components/accountInformation";
import RecipeList from "@/components/recipeList";
import { RecipeType } from "@/types/recipe/RecipeType";
import { FC, useEffect, useState } from "react";

const AccountPage: FC = () => {
  const [selected, setSelected] = useState<number>(1);
  const [data, setData] = useState<Zod.infer<typeof RecipeType>[]>([]);

  const loadData = () => {
    const id = getId();
    console.log(id);
    api.get(`/recipes/author/${id}`).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => loadData(), []);

  const handleNavClick = (field: number) => {
    setSelected(field);
  };

  const handleClick = (id: string) => {
    // TODO
    console.log(id);
  };

  return (
    <>
      <div className="flex gap-10">
        <div>
          <div
            className={"cursor-pointer " + (selected === 1 && "font-bold")}
            onClick={() => handleNavClick(1)}
          >
            Recipes
          </div>
          <div
            className={"cursor-pointer " + (selected === 2 && "font-bold")}
            onClick={() => handleNavClick(2)}
          >
            Account
          </div>
        </div>
        <div>
          {selected === 1 && (
            <RecipeList
              header="My recipes"
              recipes={data}
              handleClick={handleClick}
            />
          )}
          {selected === 2 && <AccountInformation />}
        </div>
      </div>
    </>
  );
};

export default AccountPage;
