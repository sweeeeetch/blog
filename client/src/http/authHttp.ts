import type { AxiosResponse } from "axios";
import $api from ".";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUser {
  email: string;
  username: string;
  id: string;
}

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> => {
  return $api.post<AuthResponse>("/user/login", { email, password });
};

export const register = async (
  email: string,
  username: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> => {
  return $api.post<AuthResponse>("/user/register", { email, username, password });
};
export const logout = async (): Promise<void> => {
  return $api.post("/user/logout");
};
