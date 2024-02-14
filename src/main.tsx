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

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [{ path: "/", Component: MainPage }],
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
