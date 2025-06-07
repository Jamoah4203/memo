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

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      const { access, refresh } = res.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      setAccessToken(access);

      await fetchUser(access);
      router.push("/dashboard");
    } catch (err: any) {
      const message = err?.response?.data?.detail || "Invalid credentials";
      console.error("Login failed:", message);
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setAccessToken(null);
    router.push("/");
  };

  const fetchUser = async (token?: string) => {
    try {
      const authToken = token || accessToken;
      if (!authToken) return;

      const res = await axios.get("/users/profile/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.error("User fetch failed:", err);
    }
  };

  const refreshAccessToken = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      console.warn("No refresh token found");
      logout();
      return;
    }

    try {
      const res = await axios.post("/auth/refresh-token", { refresh });
      const { access } = res.data;
      localStorage.setItem("access", access);
      setAccessToken(access);
      return access;
    } catch (err) {
      console.error("Token refresh failed:", err);
      logout();
    }
  };

  useEffect(() => {
    const init = async () => {
      const access = localStorage.getItem("access");

      if (access) {
        setAccessToken(access);
        await fetchUser(access);
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
