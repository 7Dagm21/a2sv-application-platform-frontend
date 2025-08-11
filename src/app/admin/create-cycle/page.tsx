// app/admin/create-cycle/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { createNewCycle } from "../../../lib/redux/slices/cycleSlice";
import { AppDispatch, RootState } from "../../../lib/redux/store";
import Header from "../../components/cycle-components/Header";
import Footer from "../../components/cycle-components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../../components/cycle-components/ui/label";
import {
  Alert,
  AlertDescription,
} from "../../components/cycle-components/ui/alert";
import { XCircle, Loader2 } from "lucide-react";
import { Textarea } from "../../components/cycle-components/ui/textarea";
import { format } from "date-fns";

export default function CreateCyclePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.cycles);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    country: "",
    start_date: "",
    end_date: "",
    is_active: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!session || session.user.role?.toLowerCase() !== "admin") {
    router.push("/admin/login");
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Cycle name is required";
    } else if (formData.name.length > 100) {
      errors.name = "Name must be less than 100 characters";
    }

    if (!formData.country.trim()) {
      errors.country = "Country is required";
    }

    if (!formData.start_date) {
      errors.start_date = "Start date is required";
    }

    if (!formData.end_date) {
      errors.end_date = "End date is required";
    } else if (
      formData.start_date &&
      new Date(formData.start_date) >= new Date(formData.end_date)
    ) {
      errors.end_date = "End date must be after start date";
    }

    if (formData.description.length > 500) {
      errors.description = "Description must be less than 500 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const result = await dispatch(
        createNewCycle({
          ...formData,
          start_date: new Date(formData.start_date).toISOString(),
          end_date: new Date(formData.end_date).toISOString(),
        })
      );

      if (createNewCycle.fulfilled.match(result)) {
        router.push("/admin/cycle-dashboard");
      }
    } catch (err) {
      console.error("Failed to create cycle:", err);
    }
  };

  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Create New Application Cycle
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Set up a new cycle for applications with specific dates and
              requirements
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Cycle Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">
                  Cycle Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g. Fall 2023 Intake"
                  className={formErrors.name ? "border-red-500" : ""}
                  disabled={loading}
                />
                {formErrors.name && (
                  <p className="text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-gray-700">
                  Country *
                </Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="e.g. Ethiopia"
                  className={formErrors.country ? "border-red-500" : ""}
                  disabled={loading}
                />
                {formErrors.country && (
                  <p className="text-sm text-red-500">{formErrors.country}</p>
                )}
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label htmlFor="start_date" className="text-gray-700">
                  Start Date *
                </Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) =>
                    handleInputChange("start_date", e.target.value)
                  }
                  min={today}
                  className={formErrors.start_date ? "border-red-500" : ""}
                  disabled={loading}
                />
                {formErrors.start_date && (
                  <p className="text-sm text-red-500">
                    {formErrors.start_date}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label htmlFor="end_date" className="text-gray-700">
                  End Date *
                </Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) =>
                    handleInputChange("end_date", e.target.value)
                  }
                  min={formData.start_date || today}
                  className={formErrors.end_date ? "border-red-500" : ""}
                  disabled={loading}
                />
                {formErrors.end_date && (
                  <p className="text-sm text-red-500">{formErrors.end_date}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <Label htmlFor="description" className="text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe the purpose and requirements of this cycle..."
                rows={4}
                className={formErrors.description ? "border-red-500" : ""}
                disabled={loading}
              />
              <div className="flex justify-between mt-1">
                {formErrors.description ? (
                  <p className="text-sm text-red-500">
                    {formErrors.description}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Optional: Provide details about this application cycle
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  {formData.description.length}/500 characters
                </p>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center space-x-2 mb-6">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_active: e.target.checked,
                  }))
                }
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                disabled={loading}
              />
              <Label htmlFor="is_active" className="text-gray-700">
                Active Cycle
              </Label>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <XCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/cycle-dashboard")}
                disabled={loading}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Cycle...
                  </>
                ) : (
                  "Create Application Cycle"
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
