"use client";

import React from "react";

interface Activity {
  date: string;
  description: string;
}

interface WelcomeRecentActivityProps {
  activities: Activity[];
}

export default function WelcomeRecentActivity({
  activities,
}: WelcomeRecentActivityProps) {
  return (
    <section className="mt-6 bg-white rounded-xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
      <ul className="space-y-3">
        {activities.map((activity, idx) => (
          <li
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-2 last:border-none last:pb-0"
          >
            <span className="text-gray-600 text-sm">
              {activity.description}
            </span>
            <span className="text-gray-400 text-xs mt-1 sm:mt-0">
              {activity.date}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
