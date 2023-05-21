import axios from "axios";
import type { AuthResponse } from "./authHttp";

const $api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_APP_HOST_URL,
});

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  config.headers["Access-Control-Allow-Headers"] = "*";
  config.withCredentials = true;
  return config;
});

$api.interceptors.response.use(
  config => {
    return config;
  },
  async err => {
    if (err.response.status === 401 && err.config && !err.config._isRetry) {
      const originalReq = err.config;
      try {
        originalReq._isRetry = true;
        const response = await axios.get<AuthResponse>(
          `${import.meta.env.VITE_APP_HOST_URL}user/refresh`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalReq);
      } catch (e) {
        console.log("Unauthorized");
      }
    }
  }
);

export default $api;
