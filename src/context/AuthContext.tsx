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

      await fetchUser();
      router.push("/dashboard"); // redirect to homepage
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setAccessToken(null);
    router.push("/");
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("/users/profile/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error("User fetch failed", err);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const res = await axios.post("/auth/refresh-token", {
        refresh: localStorage.getItem("refresh"),
      });
      const { access } = res.data;
      localStorage.setItem("access", access);
      setAccessToken(access);
      return access;
    } catch (err) {
      logout();
    }
  };

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("access");
      if (token) {
        setAccessToken(token);
        await fetchUser();
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
