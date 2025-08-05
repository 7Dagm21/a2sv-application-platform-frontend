import Button from "@/src/app/components/Button";
import Input from "@/src/app/components/Input.tsx";
import Stepper from "@/src/app/components/Stepper";

export default function ThirdStep() {
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <Stepper
        steps={["Person Info", "Coding Profiles", "Essays & Resume"]}
        activeStep={3}
      />

      <form className="space-y-4 mt-6">
        <Input
          label="Tell us about yourself "
          name="essay1"
          placeholder="Write your answer here..."
          textarea
        />
        <Input
          label="Why do you want to join us"
          name="essay2"
          placeholder="Write your answer here..."
          textarea
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">
          <Button variant="secondary">Back</Button>
          <Button type="submit" variant="primary">
            Submit Application
          </Button>
        </div>
      </form>
    </div>
  );
}
