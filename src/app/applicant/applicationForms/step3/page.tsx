"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/src/app/store";
import { setField, setAllFields } from "@/src/app/store/slices/applicantSlice";
import {
  setApplication,
  fetchApplication,
} from "@/src/app/store/slices/applicationSlice";
import Stepper from "@/src/app/components/ApplicationForm/Stepper";
import Input from "@/src/app/components/ApplicationForm/Input";
import Button from "@/src/app/components/Button";
import { Header } from "@/src/app/components/Header/HeaderForm";
import { fetchProfile } from "@/src/app/store/slices/profileSlice";

export default function ThirdStep() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const data = useSelector((state: RootState) => state.applicant);
  const profile = useSelector((state: RootState) => state.profile.data);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resume, setResume] = useState<File | null>(null);

  useEffect(() => {
    dispatch(fetchProfile());
    const applicationId =
      typeof window !== "undefined"
        ? localStorage.getItem("applicationId")
        : null;
    if (applicationId) {
      dispatch(fetchApplication(applicationId)).then((res: any) => {
        // Prefill form if editing
        if (res.payload) {
          dispatch(
            setAllFields({
              idNumber: res.payload.student_id || "",
              schoolName: res.payload.school || "",
              degreeProgram: res.payload.degree || "",
              codeforces: res.payload.codeforces_handle || "",
              leetcode: res.payload.leetcode_handle || "",
              essay1: res.payload.essay_about_you || "",
              essay2: res.payload.essay_why_a2sv || "",
              country: res.payload.country || "",
            })
          );
        }
      });
    }
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (
      !resume ||
      !data.idNumber ||
      !data.degreeProgram ||
      !data.schoolName ||
      !data.leetcode ||
      !data.codeforces ||
      !data.essay1 ||
      !data.essay2
    ) {
      setError("Please fill all required fields and upload your resume.");
      setSubmitting(false);
      return;
    }

    const submissionData = new FormData();
    submissionData.append("resume", resume);
    submissionData.append("school", data.schoolName);
    submissionData.append("degree", data.degreeProgram);
    submissionData.append("leetcode_handle", data.leetcode);
    submissionData.append("codeforces_handle", data.codeforces);
    submissionData.append("essay_why_a2sv", data.essay2);
    submissionData.append("essay_about_you", data.essay1);
    submissionData.append("student_id", data.idNumber);
    if (data.country) submissionData.append("country", data.country);

    const accessToken = localStorage.getItem("accessToken") || "";
    let applicationId = localStorage.getItem("applicationId");

    try {
      let response, result;
      if (applicationId) {
        response = await fetch(
          `https://a2sv-application-platform-backend-team6.onrender.com/applications/${applicationId}`,
          {
            method: "PUT",
            body: submissionData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } else {
        response = await fetch(
          "https://a2sv-application-platform-backend-team6.onrender.com/applications/",
          {
            method: "POST",
            body: submissionData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }

      result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit application");
      }

      applicationId = result.data.id;
      localStorage.setItem("applicationId", applicationId ?? "");

      // Fetch latest application details
      const getRes = await fetch(
        `https://a2sv-application-platform-backend-team6.onrender.com/applications/${applicationId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!getRes.ok) throw new Error("Failed to fetch application details");
      const appDetails = await getRes.json();

      dispatch(setApplication(appDetails.data));
      router.push("/applicant/dashboard/progress");
    } catch (err: any) {
      setError(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <Header username={profile?.full_name || "Applicant"} />
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
                setResume(file);
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
    </main>
  );
}
