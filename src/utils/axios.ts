import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

// Request interceptor
instance.interceptors.request.use((config) => {
  const access = localStorage.getItem("access");
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

// Response interceptor (auto-refresh on 401)
instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        const res = await instance.post("/auth/refresh-token", { refresh });
        const access = res.data.access;

        localStorage.setItem("access", access);
        original.headers.Authorization = `Bearer ${access}`;

        return instance(original);
      } catch (refreshErr) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
