import Button from "@/src/app/components/Button";
import Input from "@/src/app/components/Input.tsx";
import Stepper from "@/src/app/components/Stepper";

export default function SecondStep() {
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <Stepper
        steps={["Personal Info", "Coding Profiles", "Essays & Resume"]}
        activeStep={2}
      />

      <form className="space-y-4 mt-6">
        <Input
          label="Codeforces Username"
          name="codeforces"
          placeholder="Enter your Codeforces hanle"
        />
        <Input
          label="Leetcode Username"
          name="leetcode"
          placeholder="Enter your Leetcode handle"
        />
        <Input
          label="Github Profile URL"
          name="github"
          placeholder="https://github.com/yourusername"
        />

        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">
          <Button variant="secondary">Back</Button>
          <Button type="submit" variant="primary">
            Next:Essays & Resume
          </Button>
        </div>
      </form>
    </div>
  );
}
