"use client";

import { DashboardInfoCard } from "@/src/app/components/admin-components/dashboard-info-card";
import { DashboardActionCard } from "@/src/app/components/admin-components/dashboard-action-card";
import { DashboardRecentActivityCard } from "@/src/app/components/admin-components/dashboard-recent-activity-card";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const API_BASE = "https://a2sv-application-platform-backend-team6.onrender.com";

interface DashboardData {
  totalUsers: number;
  totalApplicants: number;
  activeCycles: number;
  recentActivities: Array<{ description: string; timestamp: string }>;
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalUsers: 0,
    totalApplicants: 0,
    activeCycles: 0,
    recentActivities: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role?.toLowerCase() !== "admin") {
      window.location.href = "/admin/login";
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const accessToken = session.accessToken;

        const [
          usersResponse,
          applicantsResponse,
          cyclesResponse,
          activitiesResponse,
        ] = await Promise.all([
          fetch(`${API_BASE}/users/count`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch(`${API_BASE}/applicants/count`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch(`${API_BASE}/cycles/active`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch(`${API_BASE}/admin/activity`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        ]);

        if (
          !usersResponse.ok ||
          !applicantsResponse.ok ||
          !cyclesResponse.ok ||
          !activitiesResponse.ok
        ) {
          throw new Error("Failed to fetch dashboard data");
        }

        const usersData = await usersResponse.json();
        const applicantsData = await applicantsResponse.json();
        const cyclesData = await cyclesResponse.json();
        const activitiesData = await activitiesResponse.json();

        setDashboardData({
          totalUsers: usersData.total || 0,
          totalApplicants: applicantsData.total || 0,
          activeCycles: cyclesData.data?.length || 0,
          recentActivities: activitiesData || [],
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <button
            onClick={() => window.location.reload()}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-black md:text-4xl">
        Admin Command Center
      </h1>

      {/* Info Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardInfoCard
          title="Total Users"
          value={dashboardData.totalUsers}
          colorClass="bg-gradient-to-r from-purple-600 to-purple-800"
        />
        <DashboardInfoCard
          title="Total Applicants (G7)"
          value={dashboardData.totalApplicants}
          colorClass="bg-gradient-to-r from-green-500 to-green-700"
        />
        <DashboardInfoCard
          title="Active Cycles"
          value={dashboardData.activeCycles}
          colorClass="bg-gradient-to-r from-orange-500 to-orange-700"
        />
      </div>

      {/* Action Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardActionCard
          title="Manage Users"
          description="Create, edit, and manage user accounts and roles."
          href="/admin/users"
        />
        <DashboardActionCard
          title="Manage Cycles"
          description="Create and manage application cycles."
          href="/admin/cycle-dashboard"
        />
        <DashboardRecentActivityCard
          activities={dashboardData.recentActivities}
        />
      </div>

      {/* View Analytics Card */}
      <div className="mt-10 grid">
        <DashboardActionCard
          title="View Analytics"
          description="Explore application data and platform insights."
          href="/admin/analytics-dashboard"
        />
      </div>
    </div>
  );
}
