"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ViewUserPage() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const [user, setUser] = useState<{ id: string; full_name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
        : null;
    setLoading(true);
    fetch(`${API_URL}/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          setUser(data.data);
        } else {
          setError("User not found");
        }
      })
      .catch(() => setError("Failed to fetch user details"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white p-4 sm:p-6 md:p-8 rounded shadow">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">User Details</h2>
      {loading && <div className="text-gray-500 mb-4">Loading...</div>}
      {error && <div className="text-red-500 mb-4 text-xs sm:text-sm">{error}</div>}
      {user && (
        <div className="space-y-4">
          <div>
            <span className="font-medium">Full Name:</span> {user.full_name}
          </div>
          <div>
            <span className="font-medium">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-medium">Role:</span> {user.role}
          </div>
          <div>
            <span className="font-medium">ID:</span> {user.id}
          </div>
        </div>
      )}
    </div>
  );
}
