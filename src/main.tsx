import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/login";
import LogoutPage from "./pages/logout";
import MainPage from "./pages/main";
import RegisterPage from "./pages/register";
import "./index.css";
import AuthenticationLayout from "./layouts/AuthutenticationLayout";
import RecipesPage from "./pages/recipes";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import AccountPage from "./pages/account";
import NotFoundPage from "./pages/notFound";
import RecipePage from "./pages/recipe";
import CreateRecipePage from "./pages/createRecipe";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { path: "/", Component: MainPage },
      { path: "/recipes", Component: RecipesPage },
      { path: "/recipe/:id", Component: RecipePage },
      {
        path: "/",
        Component: AuthenticatedLayout,
        children: [
          { path: "/me", Component: AccountPage },
          { path: "/recipe/create", Component: CreateRecipePage },
        ],
      },
    ],
  },
  {
    path: "/",
    Component: AuthenticationLayout,
    children: [
      { path: "/login", Component: LoginPage },
      { path: "/logout", Component: LogoutPage },
      { path: "/register", Component: RegisterPage },
    ],
  },
  {
    path: "*",
    Component: MainLayout,
    children: [{ path: "*", Component: NotFoundPage }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
