// api/auth.ts

import { LoginPayload, SignupPayload } from "../../../../shared/types/auth";
import { api } from "./client";

export const signup = async (payload: SignupPayload) => {
  const { data } = await api.post("/auth/signup", payload);

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post("/auth/login", payload);

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};
export const getCustomer = async () => {
  const { data } = await api.get("/auth/me");

  return data;
};

export const updateCustomer = async (payload: any) => {
  const { data } = await api.put("/auth/me", payload);

  return data;
};

export const deleteCustomer = async () => {
  const { data } = await api.delete("/auth/me");

  return data;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return Boolean(getToken());
};

export const logout = () => {
  localStorage.removeItem("token");
};
