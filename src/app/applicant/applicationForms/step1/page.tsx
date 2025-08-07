"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/app/store";
import { setField } from "@/src/app/applicant/applicantSlice";
import { useRouter } from "next/navigation";
import Stepper from "@/src/app/components/Stepper";
import Input from "@/src/app/components/Input";
import Button from "@/src/app/components/Button";

export default function FirstStep() {
  const dispatch = useDispatch();
  const router = useRouter();
  const formData = useSelector((state: RootState) => state.applicant);

  return (
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
          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            Next: Coding Profiles
          </Button>
        </div>
      </form>
    </div>
  );
}
