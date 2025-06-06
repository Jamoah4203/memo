"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }
    // Call signup function here
  };

  return (
    <div className="min-h-screen flex items-center text-blue-400 justify-center bg-blue-600 p-4">
      <form onSubmit={handleSubmit} className="bg-white text-blue-600 p-8 rounded-xl max-w-md w-full space-y-5 shadow-2xl">
        <h2 className="text-center text-2xl font-bold text-blue-600">Sign Up</h2>

        <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        
        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Input
          name="confirm"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={handleChange}
          required
        />
        
        <div className="text-sm text-gray-600">
          <label className="flex items-center space-x-2">
            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
            <span>Show Password</span>
          </label>
        </div>

        <Button type="submit" className="w-full bg-blue-600 text-white">Sign Up</Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}
