"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { PublishedPlanT } from "@/model/PublishedPlan";

interface FormContextType {
  setSelectedPlan: React.Dispatch<
    React.SetStateAction<PublishedPlanT | null | undefined>
  >;
  selectedPlan: PublishedPlanT | null | undefined;
}

const CustomFormContext = createContext<FormContextType | undefined>(undefined);

export function CustomFormContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedPlan, setSelectedPlan] = useState<
    PublishedPlanT | null | undefined
  >(null);

  const value = {
    setSelectedPlan,
    selectedPlan,
  };

  return (
    <CustomFormContext.Provider value={value}>
      {children}
    </CustomFormContext.Provider>
  );
}

export const useCustomFormContext = () => {
  const context = useContext(CustomFormContext);
  if (context === undefined) {
    throw new Error(
      "useCustomFormContext must be used within a CustomFormContextProvider",
    );
  }
  return context;
};
