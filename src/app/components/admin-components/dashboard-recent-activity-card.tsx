import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/app/components/admin-components/ui/card";
import { formatTimeAgo } from "../../../../src/lib/redux/utils/formatTimeAgo";

interface RecentActivityItemProps {
  description: string;
  timestamp: string; // Changed from timeAgo to timestamp
}

function RecentActivityItem({
  description,
  timestamp,
}: RecentActivityItemProps) {
  return (
    <div className="border-b border-gray-200 py-3 last:border-b-0">
      <p className="text-sm text-gray-800">{description}</p>
      <p className="text-xs text-gray-500">{formatTimeAgo(timestamp)}</p>{" "}
      {/* Use formatTimeAgo */}
    </div>
  );
}

interface DashboardRecentActivityCardProps {
  activities: { description: string; timestamp: string }[]; // New prop
}

export function DashboardRecentActivityCard({
  activities,
}: DashboardRecentActivityCardProps) {
  // Accept prop
  return (
    <Card className="rounded-lg bg-white p-6 shadow-md">
      <CardHeader className="p-0">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Recent Admin Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4 p-0">
        <div>
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <RecentActivityItem
                key={index}
                description={activity.description}
                timestamp={activity.timestamp}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No recent activity.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
