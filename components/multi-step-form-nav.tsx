"use client";
import Link from "next/link";

interface Step {
  id: number;
  name: string;
}

const steps: Step[] = [
  {
    id: 1,
    name: "Basic Information",
  },
  {
    id: 2,
    name: "Additional Details",
  },
  {
    id: 3,
    name: "Confirmation",
  },
];

export function MultiStepFormNav({ currentStep = 1 }: { currentStep: number }) {
  return (
    <nav aria-label="Progress" className="w-full max-w-4xl mx-auto">
      <ol
        role="list"
        className="space-y-4 md:flex md:space-y-0 md:space-x-8"
        aria-label="Steps"
      >
        {steps.map((step) => (
          <li
            key={step.name}
            className="md:flex-1"
            aria-current={step.id === currentStep ? "step" : undefined}
            aria-label={`Step ${step.id}`}
          >
            <Link
              href={`/products/add/${step.id}`}
              className={`group flex flex-col border-l-4 py-2 pl-4 ${
                step.id < currentStep
                  ? "border-primary"
                  : step.id === currentStep
                  ? "border-primary"
                  : "border-muted"
              } md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0`}
            >
              <span
                className={`text-sm font-medium ${
                  step.id < currentStep
                    ? "text-primary"
                    : step.id === currentStep
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Step {step.id}
              </span>
              <span className="text-sm font-medium">{step.name}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
