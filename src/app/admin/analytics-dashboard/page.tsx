import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/analytics-components/ui/card";
import { Header } from "../../components/analytics-components/header";
import { SiteFooter } from "../../components/analytics-components/footer";
import { ApplicationFunnelChart } from "../../components/analytics-components/application-funnel-chart";
import { UniversityDistributionChart } from "../../components/analytics-components/university-distribution-chart";
import { GeographicDistributionChart } from "../../components/analytics-components/geographic-distribution-chart";
import { DashboardMetrics } from "../../components/analytics-components/dashboard-metrics";
import { fetchDashboardAnalyticsData } from "@/src/lib/redux/api/clientApi";
import { type DashboardAnalyticsData } from "@/src/types/analytics";

export default async function AnalyticsDashboard() {
  const analyticsData: DashboardAnalyticsData =
    await fetchDashboardAnalyticsData();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Application Analytics
          </h1>
          <p className="text-gray-600">Insights for the G7 November Intake</p>
        </div>

        <DashboardMetrics
          totalApplicants={analyticsData.totalApplicants}
          acceptanceRate={analyticsData.acceptanceRate}
          avgReviewTime={analyticsData.avgReviewTime}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Application Funnel</CardTitle>
              <p className="text-xs text-gray-500 mt-1">
                This chart visualizes the applicants journey from submission to
                acceptance.
              </p>
            </CardHeader>
            <CardContent>
              <ApplicationFunnelChart data={analyticsData.applicationFunnel} />
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>University Distribution</CardTitle>
              <p className="text-xs text-gray-500 mt-1">
                Breakdown of applicants by thier university.
              </p>
            </CardHeader>
            <CardContent>
              <UniversityDistributionChart
                data={analyticsData.universityDistribution}
              />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <p className="text-xs text-gray-500 mt-1">
              Shows the number of applicants from each country.
            </p>
          </CardHeader>
          <CardContent>
            <GeographicDistributionChart
              data={analyticsData.geographicDistribution}
            />
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
