"use client";
import { FileText, Calendar } from "lucide-react";

type Props = {
  submittedAt: string;
  interviewDate?: string;
};

export function RecentActivity({ submittedAt, interviewDate }: Props) {
  type Activity = {
    title: string;
    date: string;
    icon: React.ElementType;
    color: string;
  };

  const activities: Activity[] = [
    {
      title: "Application Submitted",
      date: new Date(submittedAt).toLocaleDateString(),
      icon: FileText,
      color: "text-blue-600 bg-blue-100",
    },
    ...(interviewDate
      ? [
          {
            title: "Interview Scheduled",
            date: new Date(interviewDate).toLocaleDateString(),
            icon: Calendar,
            color: "text-green-600 bg-green-100",
          },
        ]
      : []),
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}
            >
              <activity.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {activity.title}
              </p>
              <p className="text-xs text-gray-500">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
