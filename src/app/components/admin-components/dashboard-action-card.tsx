import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/app/components/admin-components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface DashboardActionCardProps {
  title: string;
  description: string;
  href: string;
}

export function DashboardActionCard({
  title,
  description,
  href,
}: DashboardActionCardProps) {
  return (
    <Card className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <CardTitle className="text-xl font-semibold text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-2 p-0">
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="mt-4 p-0">
        <Link
          href={href}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
        >
          Go to {title.split(" ")[1] || "Link"}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
