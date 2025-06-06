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

  const fullName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-2xl space-y-4">
      <h1 className="text-3xl font-bold text-blue-700">
        Welcome, {fullName}{" "}
        {user.isVerified && (
          <span title="Verified" className="inline-block ml-2 text-green-500">
            ✔️
          </span>
        )}
      </h1>

      {user.signatureUrl && (
        <div>
          <img
            src={user.signatureUrl}
            alt={`${fullName} Signature`}
            className="h-16 w-auto object-contain"
          />
        </div>
      )}

      <p className="text-gray-700">
        <strong>Phone:</strong> {user.phoneNumber || "N/A"}
      </p>

      <div className="border rounded p-4 bg-gray-50">
        <h2 className="font-semibold text-lg mb-1">Department</h2>
        <p><strong>Name:</strong> {user.department?.name || "N/A"}</p>
        <p className="text-sm text-gray-600">{user.department?.description || "No description"}</p>
        <div className="mt-2">
          <h3 className="font-semibold">Division</h3>
          <p><strong>Name:</strong> {user.department?.division?.name || "N/A"}</p>
          <p className="text-sm text-gray-600">{user.department?.division?.description || "No description"}</p>
          <p><strong>Total Departments:</strong> {user.department?.division?.totalDepartments ?? "N/A"}</p>
        </div>
      </div>

      <div className="border rounded p-4 bg-gray-50">
        <h2 className="font-semibold text-lg mb-1">Rank</h2>
        <p>
          <strong>Name:</strong> {user.rank?.name || "N/A"}{" "}
          <span className="text-sm text-gray-500">({user.rank?.shortName || "-"})</span>
        </p>
        <p className="text-sm text-gray-600">{user.rank?.description || "No description"}</p>
        <div className="mt-2">
          <strong>Permissions:</strong>
          {user.rank?.permissions?.length ? (
            <ul className="list-disc list-inside text-sm text-gray-700">
              {user.rank.permissions.map((perm: string) => (
                <li key={perm}>{perm}</li>
              ))}
            </ul>
          ) : (
            <span> None</span>
          )}
        </div>
      </div>

      <p>
        <strong>Unique Rank:</strong> {user.uniqueRank || "N/A"}
      </p>
    </div>
  );
}
