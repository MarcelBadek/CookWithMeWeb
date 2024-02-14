import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login";
import LogoutPage from "./pages/logout";
import MainPage from "./pages/main";
import RegisterPage from "./pages/register";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/logout", element: <LogoutPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
