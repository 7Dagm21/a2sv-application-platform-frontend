// "use client";
// import Button from "@/src/app/components/Button";
// import Input from "@/src/app/components/Input";
// import Stepper from "@/src/app/components/Stepper";
// import { useRouter } from "next/navigation";
// import { useApplicationForm } from "@/src/lib/ApplicationFormContext";

// export default function FirstStep() {
//   const router = useRouter();
//   const { data, setData } = useApplicationForm();

//   return (
//     <div className="max-w-2xl mx-auto p-4 sm:p-8">
//       <Stepper
//         steps={["Personal Info", "Coding Profiles", "Essays & Resume"]}
//         activeStep={1}
//       />

//       <form
//         className="space-y-4 mt-6"
//         onSubmit={(e) => {
//           e.preventDefault();
//           router.push("/applicant/applicationForms/step2");
//         }}
//       >
//         <Input
//           label="ID Number"
//           name="idNumber"
//           placeholder="Enter your Id number"
//           value={data.idNumber}
//           onChange={(e) => setData((d) => ({ ...d, idNumber: e.target.value }))}
//         />
//         <Input
//           label="School/ University"
//           name="schoolName"
//           placeholder="Enter your university"
//           value={data.schoolName}
//           onChange={(e) =>
//             setData((d) => ({ ...d, schoolName: e.target.value }))
//           }
//         />
//         <Input
//           label="Degree Program"
//           name="degreeProgram"
//           placeholder="Enter the degree program you are part of"
//           value={data.degreeProgram}
//           onChange={(e) =>
//             setData((d) => ({ ...d, degreeProgram: e.target.value }))
//           }
//         />

//         <div className="flex justify-end mt-6">
//           <Button
//             variant="secondary"
//             type="button"
//             onClick={() => router.back()}
//           >
//             Back
//           </Button>
//           <Button type="submit" variant="primary">
//             Next: Coding Profiles
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import Button from "@/src/app/components/Button";
import Input from "@/src/app/components/Input";
import Stepper from "@/src/app/components/Stepper";
import { useRouter } from "next/navigation";
import { useApplicationForm } from "@/src/lib/ApplicationFormContext";

export default function FirstStep() {
  const router = useRouter();
  const { data, setData } = useApplicationForm();

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:px-6 sm:py-10">
      {/* Stepper */}
      <Stepper
        steps={["Personal Info", "Coding Profiles", "Essays & Resume"]}
        activeStep={1}
      />

      {/* Form */}
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
          value={data.idNumber}
          onChange={(e) => setData((d) => ({ ...d, idNumber: e.target.value }))}
        />

        <Input
          label="School / University"
          name="schoolName"
          placeholder="Enter your university"
          value={data.schoolName}
          onChange={(e) =>
            setData((d) => ({ ...d, schoolName: e.target.value }))
          }
        />

        <Input
          label="Degree Program"
          name="degreeProgram"
          placeholder="Enter your degree program"
          value={data.degreeProgram}
          onChange={(e) =>
            setData((d) => ({ ...d, degreeProgram: e.target.value }))
          }
        />

        {/* Buttons: Stacked on mobile, inline on larger screens */}
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
