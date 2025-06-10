import axios, { AxiosError, AxiosRequestConfig } from "axios";

// 🌐 Base URL: Vercel or local fallback
const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

// 🔧 Axios instance with base config
const instance = axios.create({
  baseURL: `${baseURL}/api/`,
  withCredentials: false, // Set to true if using cookies
});

// 🔐 Attach access token to headers before each request
instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("access");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

// ♻️ Auto-refresh access token if expired
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

      const refreshToken = localStorage.getItem("refresh");
      console.log("🔁 Refreshing token with:", refreshToken);

      if (!refreshToken) {
        console.warn("⚠️ No refresh token found. Redirecting to login.");
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // 🔄 Send refresh token in request body
        const res = await axios.post(`${baseURL}/api/auth/refresh-token`, { refresh: refreshToken });

        const newAccess = res.data.access;
        console.log("✅ New access token:", newAccess);

        // Store new access token
        localStorage.setItem("access", newAccess);

        // Retry the original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        }

        return instance(originalRequest);
      } catch (refreshErr) {
        console.error("❌ Token refresh failed:", refreshErr);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
