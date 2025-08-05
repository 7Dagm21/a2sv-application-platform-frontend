"use client";
import React from "react";

type StepperProps = {
  steps: string[];
  activeStep: number;
};

export default function Stepper({ steps, activeStep }: StepperProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === activeStep;
        const isCompleted = stepNumber < activeStep;

        return (
          <div key={step} className="flex-1">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold
                                ${
                                  isActive
                                    ? "bg-indigo-600 text-white"
                                    : isCompleted
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-300 text-gray-600"
                                }`}
              >
                {stepNumber}
              </div>
              <span
                className={`ml-2 font-medium ${
                  isActive
                    ? "text-indigo-600"
                    : isCompleted
                    ? "text-indigo-600"
                    : "text-gray-600"
                }`}
              >
                {step}
              </span>
            </div>
            {/* Render connector line except for last step */}
            {index !== steps.length - 1 && (
              <div
                className={`h-1 mt-2 ${
                  isActive || isCompleted ? "bg-indigo-600" : "bg-gray-300"
                }`}
                style={{ minWidth: 32 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
