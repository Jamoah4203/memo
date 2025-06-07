"use client";

import { useAuth } from "@/hooks/useAuth";

interface Department {
  name?: string;
  description?: string;
  division?: {
    name?: string;
    description?: string;
    totalDepartments?: number;
  };
}

interface Rank {
  name?: string;
  shortName?: string;
  description?: string;
  permissions?: string[];
}

interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  isVerified?: boolean;
  signatureUrl?: string;
  phoneNumber?: string;
  department?: Department;
  rank?: Rank;
  uniqueRank?: string;
}

export default function DashboardPage() {
  const { user } = useAuth() as { user: User | null };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500 dark:text-gray-400">Loading user info...</p>
      </div>
    );
  }

  const fullName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.email;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-2xl space-y-6 dark:bg-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-yellow-400 flex items-center">
        Welcome, {fullName}
        {user.isVerified ? (
          <span
            title="Verified"
            aria-label="Verified user"
            role="img"
            className="inline-block ml-2 text-green-500"
          >
            ✔️
          </span>
        ) : (
          <span
            title="Not Verified"
            aria-label="User not verified"
            role="img"
            className="inline-block ml-2 text-red-400"
          >
            ❌
          </span>
        )}
      </h1>

      {user.signatureUrl && (
        <img
          src={user.signatureUrl}
          alt={`${fullName} Signature`}
          className="h-16 w-auto object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/placeholder-signature.png";
          }}
        />
      )}

      <p className="text-gray-700 dark:text-gray-300">
        <strong>Phone:</strong> {user.phoneNumber || "N/A"}
      </p>

      <section className="border rounded p-4 bg-gray-50 dark:bg-gray-700">
        <h2 className="font-semibold text-lg mb-1">Department</h2>
        <p>
          <strong>Name:</strong> {user.department?.name || "N/A"}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {user.department?.description || "No description"}
        </p>
        <div className="mt-2">
          <h3 className="font-semibold">Division</h3>
          <p>
            <strong>Name:</strong> {user.department?.division?.name || "N/A"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user.department?.division?.description || "No description"}
          </p>
          <p>
            <strong>Total Departments:</strong>{" "}
            {user.department?.division?.totalDepartments ?? "N/A"}
          </p>
        </div>
      </section>

      <section className="border rounded p-4 bg-gray-50 dark:bg-gray-700">
        <h2 className="font-semibold text-lg mb-1">Rank</h2>
        <p>
          <strong>Name:</strong> {user.rank?.name || "N/A"}{" "}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({user.rank?.shortName || "-"})
          </span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {user.rank?.description || "No description"}
        </p>
        <div className="mt-2">
          <strong>Permissions:</strong>{" "}
          {user.rank?.permissions?.length ? (
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
              {user.rank.permissions.map((perm, i) => (
                <li key={`${perm}-${i}`}>{perm}</li>
              ))}
            </ul>
          ) : (
            <span> None</span>
          )}
        </div>
      </section>

      <p>
        <strong>Unique Rank:</strong> {user.uniqueRank || "N/A"}
      </p>
    </div>
  );
}
