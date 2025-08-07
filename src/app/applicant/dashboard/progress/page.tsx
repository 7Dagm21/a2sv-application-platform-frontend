"use client";

import { useEffect, useState } from "react";
import { ApplicationData } from "@/src/app/components/ApplicantProgress/ApplicationTimeline";
import { ApplicationTimeline } from "@/src/app/components/ApplicantProgress/ApplicationTimeline";
import { ImportantUpdates } from "@/src/app/components/ApplicantProgress/ImportantUpdates";
import { InterviewCard } from "@/src/app/components/ApplicantProgress/InterviewCard";
import { RecentActivity } from "@/src/app/components/ApplicantProgress/RecentActivity";
import { Header } from "@/src/app/components/Header/HeaderProgress";

export default function ProgressPage() {
  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);

  // Replace with your real token logic
  const accessToken =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken") || ""
      : "";

  useEffect(() => {
    async function fetchStatusAndDetails() {
      try {
        // 1. Get status and id
        const statusRes = await fetch(
          "https://a2sv-application-platform-backend-team6.onrender.com/applications/my-status",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const statusJson = await statusRes.json();
        if (!statusJson.success || !statusJson.data?.id)
          throw new Error("No application found");

        // 2. Get full application details
        const appRes = await fetch(
          `https://a2sv-application-platform-backend-team6.onrender.com/applications/${statusJson.data.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const appJson = await appRes.json();
        if (appJson.success) setApplication(appJson.data);
        else throw new Error("No application details found");
      } catch (err) {
        setApplication(null);
      } finally {
        setLoading(false);
      }
    }
    if (accessToken) fetchStatusAndDetails();
    else setLoading(false);
  }, [accessToken]);

  if (loading) return <p className="text-center p-8">Loading...</p>;
  if (!application)
    return <p className="text-center p-8">No application data found.</p>;

  const { status, submitted_at } = application;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="w-full max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 mt-2">
          Your Application Progress
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          You're on your way! Here's a summary of your application status.
        </p>

        {/* Timeline always on top on mobile */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <div className="flex-1">
            <ApplicationTimeline
              status={status}
              submittedAt={new Date(submitted_at).toLocaleDateString()}
            />
          </div>
          <div className="flex flex-col gap-4 md:w-80">
            <RecentActivity submittedAt={submitted_at} />
            <ImportantUpdates />
            {(status === "under_review" ||
              status === "interview_scheduled") && <InterviewCard />}
          </div>
        </div>
      </main>
    </div>
  );
}
