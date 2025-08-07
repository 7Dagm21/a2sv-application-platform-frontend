"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "@/src/app/store";
import { setField } from "@/src/app/applicant/applicantSlice";

import Stepper from "@/src/app/components/Stepper";
import Input from "@/src/app/components/Input";
import Button from "@/src/app/components/Button";

export default function ThirdStep() {
  const dispatch = useDispatch();
  const router = useRouter();

  const data = useSelector((state: RootState) => state.applicant);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const submissionData = new FormData();
    if (data.resume) {
      submissionData.append("resume", data.resume);
    }
    submissionData.append("school", data.schoolName);
    submissionData.append("degree", data.degreeProgram);
    submissionData.append("leetcode_handle", data.leetcode);
    submissionData.append("codeforces_handle", data.codeforces);
    submissionData.append("essay_why_a2sv", data.essay2);
    submissionData.append("essay_about_you", data.essay1);

    try {
      const res = await fetch(
        "https://a2sv-application-platform-backend-team6.onrender.com/applications/",
        {
          method: "POST",
          body: submissionData,
          // headers: {
          //   "Authorization": `Bearer ${token}` // if needed
          // },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      router.push("/applicant/applicationForms/success");
    } catch (err: any) {
      setError(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <Stepper
        steps={["Personal Info", "Coding Profiles", "Essays & Resume"]}
        activeStep={3}
      />

      <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
        <Input
          label="Tell us about yourself"
          name="essay1"
          placeholder="Write your answer here..."
          textarea
          value={data.essay1}
          onChange={(e) =>
            dispatch(setField({ field: "essay1", value: e.target.value }))
          }
        />

        <Input
          label="Why do you want to join us"
          name="essay2"
          placeholder="Write your answer here..."
          textarea
          value={data.essay2}
          onChange={(e) =>
            dispatch(setField({ field: "essay2", value: e.target.value }))
          }
        />

        <div>
          <label
            htmlFor="resume"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Resume (PDF)
          </label>
          <input
            type="file"
            name="resume"
            id="resume"
            accept=".pdf"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              dispatch(setField({ field: "resume", value: file }));
            }}
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">
          <Button
            variant="secondary"
            type="button"
            onClick={() => router.back()}
          >
            Back
          </Button>

          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </div>
  );
}
