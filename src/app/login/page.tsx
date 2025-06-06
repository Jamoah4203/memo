"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-blue-600">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl space-y-6 text-gray-900"
      >
        <h2 className="text-2xl font-bold text-center text-white-600">Login</h2>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <Input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password + Show/Hide */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-[#eab308]"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
        </Button>

        {/* Forgot + Signup Links */}
        <div className="text-center text-sm text-gray-600 space-y-1">
          <p>
            Forgot {" "}
            <Link href="/forgot-password" className="text-blue-600 hover:underline">
              Username / Password?
            </Link>
          </p>
          <p>
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
