import axios from "axios";

// Use a fallback for dev only (never ship localhost in production!)
const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5137";

const instance = axios.create({
  baseURL: `${baseURL}/api/`,
  withCredentials: true, // Optional: depends on if you're doing cookie auth
});

// 🛡️ Attach access token if present
instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
  }
  return config;
});

// 🔁 Auto-refresh tokens on 401
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== "undefined"
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        try {
          const res = await instance.post("/auth/refresh-token", { refresh });
          const newAccess = res.data.access;

          localStorage.setItem("access", newAccess);
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;

          return instance(originalRequest);
        } catch (refreshErr) {
          localStorage.clear();
          window.location.href = "/login"; // Redirect user to login
          return Promise.reject(refreshErr);
        }
      } else {
        // No refresh token, force logout
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
