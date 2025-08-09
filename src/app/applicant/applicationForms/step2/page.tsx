"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/app/store";
import { setField } from "@/src/app/store/slices/applicantSlice";
import { useRouter } from "next/navigation";
import Stepper from "@/src/app/components/ApplicationForm/Stepper";
import Input from "@/src/app/components/ApplicationForm/Input";
import Button from "@/src/app/components/Button";
import { Header } from "@/src/app/components/Header/HeaderForm";
import { fetchProfile } from "@/src/app/store/slices/profileSlice";
import { fetchApplication } from "@/src/app/store/slices/applicationSlice";
import React, { useEffect } from "react";

export default function SecondStep() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.applicant);
  const profile = useSelector((state: RootState) => state.profile.data);

  useEffect(() => {
    dispatch(fetchProfile());

    // Get applicationId from localStorage or another source
    const applicationId =
      typeof window !== "undefined"
        ? localStorage.getItem("applicationId")
        : null;
    if (applicationId) {
      dispatch(fetchApplication(applicationId));
    }
  }, [dispatch]);

  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <Header username={profile?.full_name || "Applicant"} />
      <div className="max-w-2xl mx-auto p-4 sm:p-8">
        <Stepper
          steps={["Personal Info", "Coding Profiles", "Essays & Resume"]}
          activeStep={2}
        />

        <form
          className="space-y-4 mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/applicant/applicationForms/step3");
          }}
        >
          <Input
            label="Codeforces Username"
            name="codeforces"
            placeholder="Enter your Codeforces handle"
            value={formData.codeforces}
            onChange={(e) =>
              dispatch(setField({ field: "codeforces", value: e.target.value }))
            }
          />
          <Input
            label="Leetcode Username"
            name="leetcode"
            placeholder="Enter your Leetcode handle"
            value={formData.leetcode}
            onChange={(e) =>
              dispatch(setField({ field: "leetcode", value: e.target.value }))
            }
          />
          <Input
            label="Github Profile URL"
            name="github"
            placeholder="https://github.com/yourusername"
            value={formData.github}
            onChange={(e) =>
              dispatch(setField({ field: "github", value: e.target.value }))
            }
          />

          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">
            <Button
              variant="secondary"
              type="button"
              onClick={() => router.back()}
            >
              Back
            </Button>
            <Button type="submit" variant="primary">
              Next: Essays & Resume
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
