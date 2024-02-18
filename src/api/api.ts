import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getLogin = () => {
  const token = getToken();
  if (token) {
    return jwtDecode(token)["sub"];
  }
};

export const getId = () => {
  const token = getToken();
  if (token) {
    return jwtDecode(token)["id"];
  }
};

export const api = axios.create({
  baseURL: `http://localhost:8080/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => console.log(error)
);
