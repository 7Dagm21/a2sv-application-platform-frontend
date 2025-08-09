"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/app/store";
import { setField } from "@/src/app/store/slices/applicantSlice";
import { useRouter } from "next/navigation";
import Stepper from "@/src/app/components/ApplicationForm/Stepper";
import Input from "@/src/app/components/ApplicationForm/Input";
import Button from "@/src/app/components/Button";
import { Header } from "@/src/app/components/Header/HeaderForm";
import { fetchProfile } from "@/src/app/store/slices/profileSlice";
import { fetchApplication } from "@/src/app/store/slices/applicationSlice";
import React, { useEffect } from "react";

export default function FirstStep() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
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
      <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:px-6 sm:py-10">
        <Stepper
          steps={["Personal Info", "Coding Profiles", "Essays & Resume"]}
          activeStep={1}
        />
        <form
          className="space-y-6 mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/applicant/applicationForms/step2");
          }}
        >
          <Input
            label="ID Number"
            name="idNumber"
            placeholder="Enter your ID number"
            value={formData.idNumber}
            onChange={(e) =>
              dispatch(setField({ field: "idNumber", value: e.target.value }))
            }
          />
          <Input
            label="School / University"
            name="schoolName"
            placeholder="Enter your university"
            value={formData.schoolName}
            onChange={(e) =>
              dispatch(setField({ field: "schoolName", value: e.target.value }))
            }
          />
          <Input
            label="Degree Program"
            name="degreeProgram"
            placeholder="Enter your degree program"
            value={formData.degreeProgram}
            onChange={(e) =>
              dispatch(
                setField({ field: "degreeProgram", value: e.target.value })
              )
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
              Next: Coding Profiles
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
