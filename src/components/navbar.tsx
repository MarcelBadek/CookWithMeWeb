import { FC, useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { getUsername, getToken } from "@/api/authData";

const Navbar: FC = () => {
  const [isLogin, setLogin] = useState(false);

  const setInformation = () => {
    if (getToken()) {
      setLogin(true);
    }
  };

  useEffect(() => setInformation, []);

  return (
    <>
      <NavigationMenu className="w-full">
        <NavigationMenuList className="w-full">
          <NavigationMenuItem className="w-full">
            <div className="flex justify-between w-screen">
              <div>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href="/"
                >
                  Home
                </NavigationMenuLink>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href="/recipes"
                >
                  Recipes
                </NavigationMenuLink>
              </div>
              <div>
                {!isLogin ? (
                  <>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      href="/login"
                    >
                      Login
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      href="/register"
                    >
                      Register
                    </NavigationMenuLink>
                  </>
                ) : (
                  <>
                    <div className="inline-flex cursor-default text-sm px-4 py-2">
                      {getUsername()}
                    </div>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      href="/me"
                    >
                      My account
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      href="/logout"
                    >
                      Logout
                    </NavigationMenuLink>
                  </>
                )}
              </div>
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default Navbar;
