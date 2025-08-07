"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/app/store";
import { setField } from "@/src/app/applicant/applicantSlice";
import { useRouter } from "next/navigation";
import Stepper from "@/src/app/components/Stepper";
import Input from "@/src/app/components/Input";
import Button from "@/src/app/components/Button";
export default function SecondStep() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.applicant);

  return (
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
  );
}
