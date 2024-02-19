import axios from "axios";
import { getToken } from "./authData";

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
