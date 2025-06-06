"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call backend to send reset link
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
