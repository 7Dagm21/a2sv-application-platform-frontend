import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/app/components/admin-components/ui/card";
import { cn } from "@/src/lib/redux/utils/util";

interface DashboardInfoCardProps {
  title: string;
  value: string | number;
  colorClass: string; // Tailwind class for background gradient (e.g., "from-purple-600 to-purple-800")
}

export function DashboardInfoCard({
  title,
  value,
  colorClass,
}: DashboardInfoCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col justify-between overflow-hidden rounded-lg p-6 text-white shadow-lg",
        colorClass
      )}
    >
      <CardHeader className="p-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-4 p-0">
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
