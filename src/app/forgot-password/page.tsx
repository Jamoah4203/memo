"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/auth/password-reset/", { email });
      alert("Reset link sent. Check your email.");
    } catch (err) {
      console.error("Failed to send reset email", err);
      alert("Error sending reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 p-4">
      <form onSubmit={handleSubmit} className="bg-white text-grey-900 p-8 rounded-xl max-w-md w-full space-y-6 shadow-2xl">
        <h2 className="text-center text-2xl font-bold text-blue-600">Forgot Password</h2>

        <Input type="email" className="text-grey-900" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <Button type="submit" className="w-full bg-[#facc15] text-white bg-yellow-600">Send Reset Link</Button>
      </form>
    </div>
  );
}
