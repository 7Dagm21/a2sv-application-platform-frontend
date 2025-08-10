"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/cycle-components/Header";
import Footer from "../../components/cycle-components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../../components/cycle-components/ui/label";
import {
  Alert,
  AlertDescription,
} from "../../components/cycle-components/ui/alert";
import { createCycle } from "../../../lib/redux/api/clientApi2";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Textarea } from "../../components/cycle-components/ui/textarea";

export default function CreateCyclePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    cycleName: "",
    description: "",
    country: "",
    startDate: "",
    endDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Check authentication using stored token
  useEffect(() => {
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    if (!token || !role || role.toLowerCase() !== "admin") {
      router.push("/admin/login");
      return;
    }
  }, [router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const validateForm = () => {
    if (!formData.cycleName.trim()) {
      setError("Cycle name is required");
      return false;
    }
    if (!formData.country.trim()) {
      setError("Country is required");
      return false;
    }
    if (!formData.startDate) {
      setError("Start date is required");
      return false;
    }
    if (!formData.endDate) {
      setError("End date is required");
      return false;
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError("End date must be after start date");
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

    const newCycleData = {
      name: formData.cycleName.trim(),
      description: formData.description.trim() || undefined,
      country: formData.country.trim(),
      start_date: new Date(formData.startDate).toISOString(),
      end_date: new Date(formData.endDate).toISOString(),
    };

    try {
      const result = await createCycle(newCycleData);

      if (result.success) {
        setSuccess("Cycle created successfully!");
        setFormData({
          cycleName: "",
          description: "",
          country: "",
          startDate: "",
          endDate: "",
        });
        setTimeout(() => router.push("/admin/cycle-dashboard"), 3000);
      } else {
        setError(result.error || "Failed to create cycle.");
      }
    } catch (err) {
      setError("Unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Create new cycle
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Use this form to create a new application cycle and assign
              periods.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md border"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="cycle-name" className="text-gray-700">
                  Cycle name *
                </Label>
                <Input
                  id="cycle-name"
                  placeholder="Enter cycle name"
                  value={formData.cycleName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("cycleName", e.target.value)
                  }
                  required
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="country" className="text-gray-700">
                  Country *
                </Label>
                <Input
                  id="country"
                  placeholder="Enter country"
                  value={formData.country}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("country", e.target.value)
                  }
                  required
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="start-date" className="text-gray-700">
                  Start date *
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  required
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="end-date" className="text-gray-700">
                  End date *
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={formData.endDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("endDate", e.target.value)
                  }
                  required
                  className="mt-1"
                  disabled={isSubmitting}
                  min={formData.startDate || undefined}
                />
              </div>
            </div>

            {/* Description field - full width */}
            <div className="mb-8">
              <Label htmlFor="description" className="text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter cycle description (optional)"
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleInputChange("description", e.target.value)
                }
                className="mt-1"
                disabled={isSubmitting}
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional: Provide a brief description of this application cycle
              </p>
            </div>

            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/cycle-dashboard")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Cycle"
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
