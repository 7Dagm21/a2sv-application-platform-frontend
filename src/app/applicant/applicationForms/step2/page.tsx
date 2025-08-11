"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/app/store";
import { setField } from "@/src/app/store/slices/applicantSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Stepper from "@/src/app/components/ApplicationForm/Stepper";
import Input from "@/src/app/components/ApplicationForm/Input";
import Button from "@/src/app/components/Button";
import { Header } from "@/src/app/components/Header/HeaderForm";

export default function Step2() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data: session, status } = useSession();
  const formData = useSelector((state: RootState) => state.applicant);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <Header username={session?.user?.name || "Applicant"} />
      <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:px-6 sm:py-10">
        <Stepper
          steps={["Personal Info", "Coding Profiles", "Essays & Resume"]}
          activeStep={2}
        />
        <form
          className="space-y-6 mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/applicant/applicationForms/step3");
          }}
        >
          <Input
            label="LeetCode Username"
            name="leetcode"
            placeholder="Enter your LeetCode username"
            value={formData.leetcode ?? ""}
            onChange={(e) =>
              dispatch(setField({ field: "leetcode", value: e.target.value }))
            }
          />
          <Input
            label="Codeforces Username"
            name="codeforces"
            placeholder="Enter your Codeforces username"
            value={formData.codeforces ?? ""}
            onChange={(e) =>
              dispatch(setField({ field: "codeforces", value: e.target.value }))
            }
          />
          <div className="flex flex-col sm:flex-row justify-end sm:space-x-4 gap-3 sm:gap-0 mt-8">
            <Button
              variant="secondary"
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto"
            >
              Next: Essays & Resume
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
