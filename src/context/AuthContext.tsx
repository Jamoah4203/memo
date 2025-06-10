"use client";

import React, { createContext, useEffect, useState } from "react";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  user: any;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // 🔐 Login function
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      const { access, refresh } = res.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      setAccessToken(access);

      await fetchUser();
      router.push("/dashboard");
    } catch (err: any) {
      const message = err?.response?.data?.detail || "Invalid credentials";
      console.error("Login failed:", message);
      throw new Error(message);
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    setAccessToken(null);
    router.push("/");
  };

  // 👤 Fetch user profile
  const fetchUser = async () => {
    try {
      const res = await axios.get("/users/profile/me");
      setUser(res.data);
    } catch (err: any) {
      console.warn("Fetching user failed, trying refresh...");
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        try {
          const res = await axios.get("/users/profile/me");
          setUser(res.data);
        } catch (err2) {
          console.error("Retry failed after token refresh:", err2);
          logout();
        }
      } else {
        logout();
      }
    }
  };

  // ♻️ Refresh access token
  const refreshAccessToken = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return null;

    try {
      const res = await axios.post("/auth/refresh-token", { refresh });
      const newAccess = res.data.access;
      localStorage.setItem("access", newAccess);
      setAccessToken(newAccess);
      return newAccess;
    } catch (err) {
      console.error("Token refresh failed:", err);
      return null;
    }
  };

  // 🧠 Init on mount
  useEffect(() => {
    const initialize = async () => {
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");

      if (access && refresh) {
        setAccessToken(access);
        await fetchUser();
      } else {
        logout(); // Clean up if one is missing
      }
    };

    initialize();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
