"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/store/hooks";
import {
  fetchApplication,
  selectCurrentApplication,
} from "@/src/app/store/slices/applicationSlice";

export default function ApplicationTimeline() {
  const dispatch = useAppDispatch();
  const application = useAppSelector(selectCurrentApplication);
  const loading = useAppSelector((s) => s.application.loading);
  const error = useAppSelector((s) => s.application.error);

  // If we don't have application in state, fetch it
  useEffect(() => {
    const id = localStorage.getItem("applicationId");
    if (!application && id) {
      dispatch(fetchApplication(id));
    }
  }, [dispatch, application]);

  // Map statuses to step index (adjust to your status values)
  const steps = [
    { key: "submitted", label: "Application Submitted" },
    { key: "under_review", label: "Under Review" },
    { key: "interview", label: "Interview Stage" },
    { key: "decision", label: "Decision Made" },
  ];

  const activeStepIndex = (() => {
    if (!application?.status) return -1;
    const s = application.status.toLowerCase();
    if (s.includes("submitted")) return 0;
    if (s.includes("review")) return 1;
    if (s.includes("interview")) return 2;
    if (
      s.includes("decision") ||
      s.includes("accepted") ||
      s.includes("rejected")
    )
      return 3;
    return -1;
  })();

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Application Timeline</h3>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="space-y-4 mt-2">
        {steps.map((step, idx) => {
          const isCompleted = idx < activeStepIndex;
          const isActive = idx === activeStepIndex;
          return (
            <div key={step.key} className="flex items-start space-x-3">
              <div
                className={`w-4 h-4 rounded-full mt-1 ${
                  isCompleted
                    ? "bg-green-500"
                    : isActive
                    ? "bg-indigo-600"
                    : "bg-gray-300"
                }`}
              />
              <div>
                <p
                  className={`font-medium ${
                    isActive ? "text-indigo-600" : "text-gray-800"
                  }`}
                >
                  {step.label}
                </p>
                {/* optional description from application */}
                {step.key === "submitted" && application?.submitted_at && (
                  <p className="text-xs text-gray-500">
                    {new Date(application.submitted_at).toLocaleString()}
                  </p>
                )}
                {isActive && application?.status && (
                  <p className="text-xs text-gray-500 mt-1">
                    Current Stage: {application.status}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
