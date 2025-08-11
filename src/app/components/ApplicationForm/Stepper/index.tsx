"use client";
import React from "react";

type StepperProps = {
  steps: string[];
  activeStep: number;
};
// the problem here seems to be the progress names are not properly visible they are compresed

export default function Stepper({ steps, activeStep }: StepperProps) {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative h-1 bg-gray-200 rounded-full mb-6">
        <div
          className="absolute h-1 bg-indigo-500 rounded-full transition-all duration-300"
          style={{
            width: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
            maxWidth: "100%",
          }}
        />
      </div>
      {/* Steps */}
      <div className="flex justify-between items-center w-full">
        {steps.map((step, idx) => {
          const stepNumber = idx + 1;
          const isActive = stepNumber === activeStep;
          const isCompleted = stepNumber < activeStep;

          return (
            <div
              key={step}
              className="flex flex-col items-center flex-1 min-w-0"
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2
                  ${
                    isActive
                      ? "bg-white border-indigo-500 text-indigo-600 font-bold shadow"
                      : isCompleted
                      ? "bg-indigo-500 border-indigo-500 text-white"
                      : "bg-gray-200 border-gray-300 text-gray-400"
                  }
                `}
              >
                {stepNumber}
              </div>
              <span
                className={`mt-2 text-xs text-center font-medium truncate max-w-[80px]
                  ${
                    isActive
                      ? "text-indigo-600"
                      : isCompleted
                      ? "text-indigo-500"
                      : "text-gray-400"
                  }
                `}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
