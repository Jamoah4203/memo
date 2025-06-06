// src/app/dashboard/page.tsx
"use client";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold">Welcome, {user.full_name}</h1>
      <p><strong>Department:</strong> {user.department.name}</p>
      <p><strong>Rank:</strong> {user.rank.name}</p>
    </div>
  );
}
