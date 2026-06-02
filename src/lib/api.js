import axios from "axios";
import { API_URL } from "./config";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {

  if (typeof window !== "undefined") {

    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (
      typeof window !== "undefined" &&
      error.response?.status === 401
    ) {

      localStorage.removeItem("token");

      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;