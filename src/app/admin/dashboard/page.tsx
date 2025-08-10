import { DashboardInfoCard } from "@/src/app/components/admin-components/dashboard-info-card";
import { DashboardActionCard } from "@/src/app/components/admin-components/dashboard-action-card";
import { DashboardRecentActivityCard } from "@/src/app/components/admin-components/dashboard-recent-activity-card";

const API_BASE = "https://a2sv-application-platform-backend-team6.onrender.com";

async function fetchWithAuth<T>(endpoint: string): Promise<T | null> {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${endpoint}:`, await res.text());
      return null;
    }

    return (await res.json()) as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching ${endpoint}:`, error.message);
    } else {
      console.error(`Error fetching ${endpoint}:`, error);
    }
    return null;
  }
}

export default async function AdminDashboardPage() {
  // API response shapes (adjust if API differs)
  type UsersCountResponse = { total: number };
  type ApplicantsCountResponse = { total: number };
  type ActiveCycle = Record<string, unknown>; // Replace with actual cycle fields if known
  type ActiveCyclesResponse = { data: ActiveCycle[] };
  type ActivityResponse = { description: string; timestamp: string }[];

  // Fetch data concurrently
  const [usersData, applicantsData, cyclesData, activitiesData] =
    await Promise.all([
      fetchWithAuth<UsersCountResponse>("/users/count"),
      fetchWithAuth<ApplicantsCountResponse>("/applicants/count"),
      fetchWithAuth<ActiveCyclesResponse>("/cycles/active"),
      fetchWithAuth<ActivityResponse>("/admin/activity"),
    ]);

  // Handle null responses gracefully
  const totalUsers = usersData?.total ?? 0;
  const totalApplicants = applicantsData?.total ?? 0;
  const activeCycles = Array.isArray(cyclesData?.data)
    ? cyclesData.data.length
    : 0;
  const recentActivities = activitiesData ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-black md:text-4xl">
        Admin Command Center
      </h1>

      {/* Info Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardInfoCard
          title="Total Users"
          value={totalUsers}
          colorClass="bg-gradient-to-r from-purple-600 to-purple-800"
        />
        <DashboardInfoCard
          title="Total Applicants (G7)"
          value={totalApplicants}
          colorClass="bg-gradient-to-r from-green-500 to-green-700"
        />
        <DashboardInfoCard
          title="Active Cycles"
          value={activeCycles}
          colorClass="bg-gradient-to-r from-orange-500 to-orange-700"
        />
      </div>

      {/* Action Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardActionCard
          title="Manage Users"
          description="Create, edit, and manage user accounts and roles."
          href="#"
        />
        <DashboardActionCard
          title="Manage Cycles"
          description="Create and manage application cycles."
          href="/admin/cycle-dashboard"
        />
        <DashboardRecentActivityCard activities={recentActivities} />
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
