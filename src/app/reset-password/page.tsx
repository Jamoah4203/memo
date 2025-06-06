"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-red-600 font-bold">Invalid or missing reset token.</p>
      </div>
    );
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password should be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/auth/password-reset/confirm/", {
        token,
        password,
        confirm_password: confirm,
      });
      alert("Password updated successfully");
      router.push("/login");
    } catch (err) {
      console.error("Failed to reset password", err);
      setError("Something went wrong while resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 p-4">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-xl max-w-md w-full space-y-6 shadow-2xl"
      >
        <h2 className="text-center text-2xl font-bold text-blue-600">
          Reset Password
        </h2>

        {error && <p className="text-red-600">{error}</p>}

        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          minLength={8}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#facc15] text-blue-600 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
}
