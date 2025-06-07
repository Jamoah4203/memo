"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (storedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      // fallback: system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDark(true);
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <div className={`flex min-h-screen bg-gray-100 dark:bg-gray-900`}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-54 bg-white dark:bg-gray-800 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-yellow-400 tracking-widest">MEMO APP</h2>
          {/* Close button on mobile */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="mt-6 flex flex-col space-y-1 px-4 text-blue-700 dark:text-yellow-400">
          <Link href="/dashboard" className="block py-2 px-3 rounded hover:bg-blue-100 dark:hover:bg-yellow-700 font-semibold">
            Dashboard
          </Link>
          <Link href="/dashboard" className="block py-2 px-3 rounded hover:bg-blue-100 dark:hover:bg-yellow-700 font-semibold">
            Memos
          </Link>
          <Link href="/dashboard" className="block py-2 px-3 rounded hover:bg-blue-100 dark:hover:bg-yellow-700 font-semibold">
            Settings
          </Link>
          {/* Add more links here */}
        </nav>

        <div className="mt-auto px-6 py-4 border-t border-gray-300 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
          Logged in as <br />
          <strong>{user?.email || "Guest"}</strong>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 shadow px-4 py-3">
          <div className="flex items-center space-x-3">
            {/* Hamburger menu for mobile */}
            <button
              className="md:hidden text-blue-700 dark:text-yellow-400 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              ☰
            </button>
            <h1 className="text-xl font-bold text-blue-700 dark:text-yellow-400">Dashboard</h1>
          </div>

          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="px-3 py-1 rounded bg-yellow-400 text-slate-900 font-semibold hover:bg-yellow-300"
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
