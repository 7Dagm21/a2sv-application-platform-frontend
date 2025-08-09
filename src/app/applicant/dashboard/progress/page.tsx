"use client";

import React from "react";
import ApplicationTimeline from "@/src/app/components/ApplicantDashboard/ApplicationTimeline";
import RecentActivity from "@/src/app/components/ApplicantDashboard/RecentActivity";
import { ImportantUpdates } from "@/src/app/components/ApplicantDashboard/ImportantUpdates";
import { useAppSelector } from "@/src/app/store/hooks";
import HeaderProgress from "@/src/app/components/Header/HeaderProgress";
import { Header } from "@/src/app/components/Header/HeaderDashboard";

export default function ProgressPage() {
  const app = useAppSelector((s) => s.application.current);

  // Build activities list for RecentActivity component
  const activities = [];
  if (app?.submitted_at) {
    activities.push({
      title: "Application Submitted",
      date: app.submitted_at,
    });
  }
  // Add more activities if available
  // if (app?.interview_date) {
  //   activities.push({ title: "Interview Scheduled", date: app.interview_date });
  // }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <Header />

      {/* Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Progress Header */}
        <HeaderProgress />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <ApplicationTimeline />
            </div>
          </div>

          {/* Right Column - Side Cards */}
          <div className="flex flex-col gap-4">
            <div className="bg-white shadow-sm rounded-lg p-4">
              <RecentActivity activities={activities} />
            </div>

            <div className="bg-white shadow-sm rounded-lg p-4">
              <ImportantUpdates />
            </div>

            <div className="bg-indigo-600 text-white rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-semibold">
                Get Ready for the Interview!
              </h3>
              <p className="text-xs mt-1 opacity-90">
                While you wait, it’s a great time to prepare. Practice your
                problem-solving skills on platforms like LeetCode and
                Codeforces.
              </p>
              <a
                href="/interview-guide"
                className="mt-3 inline-block text-xs font-medium underline hover:opacity-80"
              >
                Read our interview page guide →
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
