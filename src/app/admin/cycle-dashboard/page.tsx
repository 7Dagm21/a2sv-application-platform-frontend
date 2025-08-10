"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createCycle } from "../../../lib/redux/api/clientApi2";

interface FormData {
  cycleName: string;
  description: string;
  country: string;
  startDate: string;
  endDate: string;
}

interface CyclePayload {
  name: string;
  description?: string;
  country: string;
  start_date: string;
  end_date: string;
}

export default function CycleDashboardPage() {
  const [formData, setFormData] = useState<FormData>({
    cycleName: "",
    description: "",
    country: "",
    startDate: "",
    endDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const validateForm = () => {
    if (!formData.cycleName.trim()) {
      setError("Cycle name is required.");
      return false;
    }
    if (!formData.country.trim()) {
      setError("Country is required.");
      return false;
    }
    if (!formData.startDate || !formData.endDate) {
      setError("Start and end dates are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const newCycleData: CyclePayload = {
      name: formData.cycleName.trim(),
      description: formData.description.trim() || undefined,
      country: formData.country.trim(),
      start_date: new Date(formData.startDate).toISOString(),
      end_date: new Date(formData.endDate).toISOString(),
    };

    console.log("🎯 Starting cycle creation process...");

    try {
      const result = await createCycle(newCycleData);

      if (result.success) {
        console.log("✅ Cycle created successfully!");
        setSuccess("Cycle created successfully! Redirecting...");

        setFormData({
          cycleName: "",
          description: "",
          country: "",
          startDate: "",
          endDate: "",
        });

        setTimeout(() => {
          router.push("/admin/cycle-dashboard");
        }, 3000);
      } else {
        console.error("❌ Create failed:", result.error);
        setError(result.error || "Failed to create cycle. Please try again.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("💥 Unexpected error:", err.message);
      } else {
        console.error("💥 Unknown error:", err);
      }
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create New Cycle</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-500 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Cycle Name"
          value={formData.cycleName}
          onChange={(e) =>
            setFormData({ ...formData, cycleName: e.target.value })
          }
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Country"
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
          className="border p-2 w-full"
        />

        <input
          type="date"
          value={formData.startDate}
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
          className="border p-2 w-full"
        />

        <input
          type="date"
          value={formData.endDate}
          onChange={(e) =>
            setFormData({ ...formData, endDate: e.target.value })
          }
          className="border p-2 w-full"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Create Cycle"}
        </button>
      </form>
    </div>
  );
}
