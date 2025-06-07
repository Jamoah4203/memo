"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/utils/axios";
import { toast, Toaster } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/auth/forgot-password/", { email });
      toast.success("Password reset link sent. Check your email.");
      setEmail(""); // Clear input after success
    } catch (err: any) {
      console.error("Forgot password error:", err);
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Something went wrong. Try again later.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 p-4">
      {/* Sonner's Toaster container, usually top-level, but can live here */}
      <Toaster position="top-center" richColors />

      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-900 p-8 rounded-xl max-w-md w-full space-y-6 shadow-2xl"
      >
        <h2 className="text-center text-2xl font-bold text-blue-600">
          Forgot Password
        </h2>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
          disabled={loading || !email}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
}
