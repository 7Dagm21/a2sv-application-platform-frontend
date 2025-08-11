"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession, getSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../lib/redux/store";
import Header from "../../../components/cycle-components/Header";
import Footer from "../../../components/cycle-components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "../../../components/cycle-components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Loader2, Edit, FileText } from "lucide-react";
import { format } from "date-fns";

// Add these action creators if they don't exist in your cycleSlice
const fetchCycleById = (id: number) => async (dispatch: any) => {
  try {
    const session = await getSession();
    if (!session?.accessToken) throw new Error("Not authenticated");

    const response = await fetch(
      `https://a2sv-application-platform-backend-team6.onrender.com/cycles/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch cycle");

    return data.data;
  } catch (error) {
    throw error;
  }
};

const clearCurrentCycle = () => ({ type: "cycles/clearCurrentCycle" });

export default function CycleDetailPage() {
  const { id } = useParams() as { id: string };
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Update your RootState interface to include currentCycle if needed
  const currentCycle = useSelector(
    (state: RootState) => state.cycles.currentCycle
  );
  const loading = useSelector((state: RootState) => state.cycles.loading);
  const error = useSelector((state: RootState) => state.cycles.error);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role?.toLowerCase() !== "admin") {
      router.push("/admin/login");
      return;
    }

    if (id) {
      dispatch(fetchCycleById(Number(id)) as any);
    }

    return () => {
      dispatch(clearCurrentCycle());
    };
  }, [dispatch, router, session, status, id]);

  // Loading state
  if (status === "loading" || loading) {
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

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button
              onClick={() => router.push("/admin/cycle-dashboard")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Back to Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // No cycle found
  if (!currentCycle) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Cycle Not Found
            </h2>
            <Button
              onClick={() => router.push("/admin/cycle-dashboard")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Back to Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate active status
  const startDate = new Date(currentCycle.start_date);
  const endDate = new Date(currentCycle.end_date);
  const isActive =
    currentCycle.is_active && new Date() >= startDate && new Date() <= endDate;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentCycle.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={isActive ? "default" : "secondary"}>
                  {isActive ? "Active" : "Inactive"}
                </Badge>
                <Badge variant="outline">{currentCycle.country}</Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Cycle Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">
                      {format(startDate, "MMMM d, yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium">
                      {format(endDate, "MMMM d, yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created At</p>
                    <p className="font-medium">
                      {format(
                        new Date(currentCycle.created_at),
                        "MMMM d, yyyy 'at' h:mm a"
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Description</h2>
                {currentCycle.description ? (
                  <p className="text-gray-700">{currentCycle.description}</p>
                ) : (
                  <p className="text-gray-500 italic">
                    No description provided
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/admin/cycles/${id}/edit`)}
              className="flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Cycle
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700 flex items-center"
              onClick={() => router.push(`/admin/cycles/${id}/applications`)}
            >
              <FileText className="h-4 w-4 mr-2" />
              Manage Applications
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
