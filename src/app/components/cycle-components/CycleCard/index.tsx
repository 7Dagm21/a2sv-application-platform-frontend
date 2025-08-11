import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

interface CycleCardProps {
  title: string;
  description: string;
  country: string;
  status: "Active" | "Closed"; // This is the display status
}

export default function CycleCard({
  title,
  description,
  country,
  status,
}: CycleCardProps) {
  const statusColorClass =
    status === "Active" ? "bg-orange-500" : "bg-purple-500";

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Badge
          className={`${statusColorClass} text-white px-2 py-1 rounded-md text-xs font-medium`}
        >
          close
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
        <div className="flex justify-between text-gray-500">
          <span>
            Country:{" "}
            <span className="font-medium text-gray-700">{country}</span>
          </span>
          <span>
            Status:{" "}
            <span
              className={`font-medium ${
                status === "Active" ? "text-orange-500" : "text-gray-700"
              }`}
            >
              {status}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
