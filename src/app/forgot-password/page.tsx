"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/utils/axios"; // 👈 your configured Axios

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("auth/forgot-password/", { email }); // ✅ use correct endpoint
      alert("Reset link sent. Check your email.");
    } catch (err: any) {
      console.error("Failed to send reset email", err);
      const errorMessage = err?.response?.data?.detail || "Error sending reset email";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-900 p-8 rounded-xl max-w-md w-full space-y-6 shadow-2xl"
      >
        <h2 className="text-center text-2xl font-bold text-blue-600">Forgot Password</h2>

        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
}
