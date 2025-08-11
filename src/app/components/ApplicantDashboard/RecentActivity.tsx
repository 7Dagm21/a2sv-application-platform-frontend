"use client";

import React from "react";
import { FileText, Calendar } from "lucide-react";

interface Activity {
  title: string;
  date: string; // ISO string
  icon?: React.ElementType;
  color?: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  // Map default icons/colors if not provided
  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "application submitted":
        return { icon: FileText, color: "text-blue-600 bg-blue-100" };
      case "interview scheduled":
        return { icon: Calendar, color: "text-green-600 bg-green-100" };
      default:
        return { icon: FileText, color: "text-gray-600 bg-gray-100" };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h2>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const { icon: Icon, color } = getIcon(activity.title);
          return (
            <div key={index} className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.color || color
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(activity.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
