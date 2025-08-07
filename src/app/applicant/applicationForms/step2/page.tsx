"use client";
import Button from "@/src/app/components/Button";
import Input from "@/src/app/components/Input";
import Stepper from "@/src/app/components/Stepper";
import { useRouter } from "next/navigation";
import { useApplicationForm } from "@/src/lib/ApplicationFormContext";

export default function SecondStep() {
  const router = useRouter();
  const { data, setData } = useApplicationForm();

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
          value={data.codeforces}
          onChange={(e) =>
            setData((d) => ({ ...d, codeforces: e.target.value }))
          }
        />
        <Input
          label="Leetcode Username"
          name="leetcode"
          placeholder="Enter your Leetcode handle"
          value={data.leetcode}
          onChange={(e) => setData((d) => ({ ...d, leetcode: e.target.value }))}
        />
        <Input
          label="Github Profile URL"
          name="github"
          placeholder="https://github.com/yourusername"
          value={data.github}
          onChange={(e) => setData((d) => ({ ...d, github: e.target.value }))}
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
