"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-blue-600 text-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center shadow-md bg-blue-600">
        <h1 className="text-xl font-bold tracking-widest text-yellow-400">MEMO APP</h1>
        <Link href="/login">
          <Button
            variant="secondary"
            className="bg-yellow-400 text-slate-900 hover:bg-yellow-300"
          >
            Login
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 text-center">
        <div className="max-w-2xl space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            All Your Memos Organized. 🔐
          </h2>
          <p className="text-lg text-grey-200">
            Centralized memo management — secure, fast, and built for modern teams.
          </p>
          <Link href="/login">
            <Button className="bg-yellow-400 text-slate-900 hover:bg-yellow-300 text-lg px-8 py-6">
              Login to Your Dashboard
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-sm text-grey-900 py-6 text-center">
        © {new Date().getFullYear()} JayTec. All rights reserved.
      </footer>
    </div>
  );
}
