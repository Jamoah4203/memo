"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    // Submit password reset to backend with token
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 p-4">
      <form onSubmit={handleReset} className="bg-white p-8 rounded-xl max-w-md w-full space-y-6 shadow-2xl">
        <h2 className="text-center text-2xl font-bold text-blue-600">Reset Password</h2>

        <Input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />

        <Button type="submit" className="w-full bg-[#facc15] text-blue-600">Update Password</Button>
      </form>
    </div>
  );
}
