"use client";

import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onSubmit: () => void;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onSubmit,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between items-center w-full max-w-4xl">
      {currentStep > 1 ? (
        <Link href={`/products/add/${currentStep - 1}`}>
          <Button
            variant="outline"
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
        </Link>
      ) : (
        <div className="w-28"></div>
      )}
      <span className="text-sm text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </span>
      {currentStep < totalSteps ? (
        <Link href={`/products/add/${currentStep + 1}`}>
          <Button className="flex items-center space-x-2">
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Button
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
        >
          <span>Send</span> <Send className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
