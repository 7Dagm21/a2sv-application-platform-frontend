"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar"; // Adjust the path if your Navbar is located elsewhere

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UpdateUserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get("id") : null;

  const [user, setUser] = useState({
    full_name: "",
    email: "",
    role: "Applicant",
    is_active: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/users/${id}`);
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUser({
          full_name: data.full_name || "",
          email: data.email || "",
          role: data.role || "Applicant",
          is_active: data.is_active ?? true,
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error fetching user");
        }
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchUser();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Failed to update user");
      router.push("/admin/users");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error updating user");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto mt-8 bg-white p-4 sm:p-6 md:p-8 rounded shadow">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Update User</h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={user.full_name}
                onChange={e => setUser({ ...user, full_name: e.target.value })}
                className="w-full border px-2 py-1 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
                className="w-full border px-2 py-1 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Role</label>
              <select
                value={user.role}
                onChange={e => setUser({ ...user, role: e.target.value })}
                className="w-full border px-2 py-1 rounded"
                required
              >
                <option value="Applicant">Applicant</option>
                <option value="Reviewer">Reviewer</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Status</label>
              <select
                value={user.is_active ? "Active" : "Inactive"}
                onChange={e => setUser({ ...user, is_active: e.target.value === "Active" })}
                className="w-full border px-2 py-1 rounded"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update User"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
