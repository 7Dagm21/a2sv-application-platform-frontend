"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Form: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = session?.accessToken;
      console.log("Access Token:", token);

      if (!token) {
        setError("Unauthorized: No access token found.");
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const payload = {
        ...form,
        role: form.role.toLowerCase(),
      };

      const res = await fetch(`${API_URL}/admin/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 201 && data.success) {
        setSuccess("✅ User created successfully!");
        
        setTimeout(() => {
          router.push("/admin/users?page=1&limit=4");
        }, 1500);
      } else {
        setError(data.message || "Failed to create user.");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Create New User</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-500 mb-3">{success}</p>}

      <input
        type="text"
        name="full_name"
        placeholder="Full Name"
        value={form.full_name}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
        required
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
        required
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="reviwer">Reviwer</option>
        <option value="manager">Manager</option>
        <option value="applicant">Applicant</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {loading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
};

export default Form;
