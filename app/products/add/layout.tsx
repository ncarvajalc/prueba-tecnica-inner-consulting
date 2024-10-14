"use client";
import { MultiStepFormNav } from "@/components/multi-step-form-nav";
import { StepNavigation } from "@/components/step-navigation";
import { usePathname } from "next/navigation";
import React from "react";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Create product</h1>
      <MultiStepFormNav currentStep={parseInt(lastSegment ?? "1")} />
      {children}
      <StepNavigation
        currentStep={parseInt(lastSegment ?? "1")}
        totalSteps={3}
        // TODO: Implement onSubmit
      />
    </>
  );
}
