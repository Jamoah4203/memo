"use client";

import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">Loading user info...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-2xl">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Welcome, {user.full_name || user.email}</h1>
      <p className="text-gray-700">
        <strong>Department:</strong>{" "}
        {user.department?.name || "N/A"}
      </p>
      <p className="text-gray-700">
        <strong>Rank:</strong>{" "}
        {user.rank?.name || "N/A"}
      </p>
    </div>
  );
}
