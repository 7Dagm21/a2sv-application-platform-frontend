import Button from "@/src/app/components/Button";
import Input from "@/src/app/components/Input.tsx";
import Stepper from "@/src/app/components/Stepper";

export default function FirstStep() {
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <Stepper
        steps={["Personal Info", "Coding Profiles", "Essays & Resume"]}
        activeStep={1}
      />

      <form className="space-y-4 mt-6">
        <Input
          label="ID Number"
          name="idNumber"
          placeholder="Enter your Id number"
        />
        <Input
          label="School/ University"
          name="schoolName"
          placeholder="Enter your university"
        />
        <Input
          label="Degree Program"
          name="DegreeProgram"
          placeholder="Enter the degree program you are part of"
        />

        <div className="flex justify-end mt-6">
          <Button variant="secondary">Back</Button>
          <Button type="submit" variant="primary">
            Next:Coding Profiles
          </Button>
        </div>
      </form>
    </div>
  );
}
