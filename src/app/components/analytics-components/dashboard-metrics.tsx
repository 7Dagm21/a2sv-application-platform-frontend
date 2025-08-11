import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/app/components/analytics-components/ui/card";

type DashboardMetricsProps = {
  totalApplicants: number;
  acceptanceRate: number;
  avgReviewTime: number;
};

export function DashboardMetrics({
  totalApplicants,
  acceptanceRate,
  avgReviewTime,
}: DashboardMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total Applicants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900">
            {totalApplicants.toLocaleString()}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Acceptance Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900">
            {acceptanceRate}%
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Avg Review Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900">
            {avgReviewTime} Days
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
