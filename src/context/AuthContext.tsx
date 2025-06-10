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

      const profile = await fetchUser(); // 🔁 Wait for user fetch
      if (profile) {
        setUser(profile);
        router.push("/dashboard"); // 🔁 Only navigate after success
      }
    } catch (err: any) {
      const message = err?.response?.data?.detail || "Invalid credentials";
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    setAccessToken(null);
    router.push("/");
  };

  const fetchUser = async (): Promise<any | null> => {
    try {
      const res = await axios.get("/users/profile/me");
      return res.data;
    } catch (err) {
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        try {
          const res = await axios.get("/users/profile/me");
          return res.data;
        } catch {
          logout();
        }
      } else {
        logout();
      }
      return null;
    }
  };

  const refreshAccessToken = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return null;

    try {
      const res = await axios.post("/auth/refresh-token", { refresh });
      const newAccess = res.data.access;
      localStorage.setItem("access", newAccess);
      setAccessToken(newAccess);
      return newAccess;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");

      if (access && refresh) {
        setAccessToken(access);
        const profile = await fetchUser();
        if (profile) setUser(profile);
      } else {
        logout();
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
