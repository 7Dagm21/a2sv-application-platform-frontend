import { DashboardAnalyticsData } from "@/src/types/analytics";

const API_BASE_URL =
  "https://a2sv-application-platform-backend-team6.onrender.com";

export async function fetchDashboardAnalyticsData(): Promise<DashboardAnalyticsData> {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

  // Uncomment below when ready to fetch live data
  // const response = await fetch(`${API_BASE_URL}/api/v1/analytics/dashboard`);
  // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  // return await response.json();

  return {
    totalApplicants: 1204,
    acceptanceRate: 6.8,
    avgReviewTime: 3.2,
    applicationFunnel: [
      { name: "Applicant", value: 1204 },
      { name: "Under Review", value: 750 },
      { name: "Interview", value: 250 },
      { name: "Accepted", value: 82 },
    ],
    universityDistribution: [
      { name: "AAU", value: 47.6 },
      { name: "ASTU", value: 26.8 },
      { name: "AASTU", value: 25.6 },
    ],
    geographicDistribution: [
      { name: "Ethiopia", applicants: 900 },
      { name: "Kenya", applicants: 150 },
      { name: "Ghana", applicants: 100 },
      { name: "Nigeria", applicants: 54 },
    ],
  };
}
