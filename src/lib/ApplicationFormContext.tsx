"use client";
import React, { createContext, useContext, useState } from "react";

type ApplicationFormData = {
  idNumber: string;
  schoolName: string;
  degreeProgram: string;
  codeforces: string;
  leetcode: string;
  github: string;
  essay1: string;
  essay2: string;
  resume: File | null;
};

const defaultData: ApplicationFormData = {
  idNumber: "",
  schoolName: "",
  degreeProgram: "",
  codeforces: "",
  leetcode: "",
  github: "",
  essay1: "",
  essay2: "",
  resume: null,
};

const ApplicationFormContext = createContext<{
  data: ApplicationFormData;
  setData: React.Dispatch<React.SetStateAction<ApplicationFormData>>;
}>({
  data: defaultData,
  setData: () => {},
});

export const useApplicationForm = () => useContext(ApplicationFormContext);

export const ApplicationFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<ApplicationFormData>(defaultData);
  return (
    <ApplicationFormContext.Provider value={{ data, setData }}>
      {children}
    </ApplicationFormContext.Provider>
  );
};
