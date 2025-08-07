"use client";
export interface ApplicationData {
  id: string;
  status:
    | "submitted"
    | "under_review"
    | "interview_scheduled"
    | "accepted"
    | "rejected";
  school: string;
  student_id: string;
  leetcode_handle: string;
  codeforces_handle: string;
  essay_why_a2sv: string;
  essay_about_you: string;
  resume_url: string;
  submitted_at: string;
  updated_at: string;
}

type Props = {
  status: ApplicationData["status"];
  submittedAt: string;
};

export function ApplicationTimeline({ status, submittedAt }: Props) {
  const stages = [
    {
      key: "submitted",
      label: "Application Submitted",
      date: submittedAt,
      desc: "Your application has been successfully submitted. We're excited to learn more about you!",
    },
    {
      key: "under_review",
      label: "Under Review",
      desc: "Our team is currently reviewing your application. This may take a few days. Thank you for your patience.",
    },
    {
      key: "interview_scheduled",
      label: "Interview Stage",
      desc: "If selected, you will be invited for an interview.",
    },
    {
      key: "accepted",
      label: "Decision Made",
      desc: "You will be notified about the final decision.",
    },
  ];

  const currentIndex = stages.findIndex((s) => s.key === status);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
        Application Timeline
      </h2>
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;
          return (
            <div key={stage.key} className="flex items-start space-x-3">
              <div
                className={`w-5 h-5 rounded-full mt-1 flex items-center justify-center
                  ${
                    isCurrent
                      ? "bg-blue-600"
                      : isActive
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }
                `}
              >
                {isActive ? (
                  <span className="text-white text-xs font-bold">&#10003;</span>
                ) : (
                  <span className="text-gray-400 text-xs font-bold">
                    {index + 1}
                  </span>
                )}
              </div>
              <div>
                <p
                  className={`text-sm font-medium ${
                    isCurrent
                      ? "text-blue-700"
                      : isActive
                      ? "text-green-700"
                      : "text-gray-500"
                  }`}
                >
                  {stage.label}
                </p>
                {stage.date && (
                  <p className="text-xs text-gray-500">{stage.date}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">{stage.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
