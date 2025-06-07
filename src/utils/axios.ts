import axios, { AxiosError, AxiosRequestConfig } from "axios";

// 🌐 Base URL fallback for local dev
const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5137";

const instance = axios.create({
  baseURL: `${baseURL}/api/`,
  withCredentials: true, // If using cookie-based auth; fine to leave true for safety
});

// 🔐 Attach access token from localStorage to headers
instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const access = localStorage.getItem("access");
    if (access && config.headers) {
      config.headers.Authorization = `Bearer ${access}`;
    }
  }
  return config;
});

// ♻️ Handle 401 and attempt token refresh
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== "undefined"
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await instance.post("/auth/refresh-token", { refresh });
        const newAccess = res.data.access;

        localStorage.setItem("access", newAccess);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        }

        return instance(originalRequest); // 🔁 Retry original request
      } catch (refreshErr) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
