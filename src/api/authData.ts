import { JwtPayloadType } from "@/types/authentication/JwtPayloadType";
import { jwtDecode } from "jwt-decode";

export enum Role {
  CLIENT,
  ADMIN,
}

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getDecodedToken = (): JwtPayloadType | undefined => {
  const token = getToken();
  if (token) {
    return jwtDecode<JwtPayloadType>(token);
  }

  return undefined;
};

export const getUsername = (): string | undefined => {
  const token = getDecodedToken();
  if (token) {
    return token.sub;
  }

  return undefined;
};

export const getId = (): string | undefined => {
  const token = getDecodedToken();
  if (token) {
    return token.id;
  }

  return undefined;
};

export const getFirstName = (): string | undefined => {
  const token = getDecodedToken();
  if (token) {
    return token.firstName;
  }

  return undefined;
};

export const getLastName = (): string | undefined => {
  const token = getDecodedToken();
  if (token) {
    return token.lastName;
  }

  return undefined;
};

export const getEmail = (): string | undefined => {
  const token = getDecodedToken();
  if (token) {
    return token.email;
  }

  return undefined;
};

export const getRole = (): Role | undefined => {
  const token = getDecodedToken();
  if (token) {
    if (token.role[0].authority === "ROLE_CLIENT") {
      return Role.CLIENT;
    }
    if (token.role[0].authority === "ROLE_ADMIN") {
      return Role.ADMIN;
    }
  }

  return undefined;
};
