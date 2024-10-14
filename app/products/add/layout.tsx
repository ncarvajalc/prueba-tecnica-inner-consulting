"use client";
import { MultiStepFormNav } from "@/components/multi-step-form-nav";
import { ProductContextProvider } from "@/context/ProductContext";
import { usePathname } from "next/navigation";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: { queries: { staleTime: 1000 * 60 } },
        })
      }
    >
      <ProductContextProvider>
        <h1 className="text-4xl font-bold text-center">Create product</h1>
        <MultiStepFormNav currentStep={parseInt(lastSegment ?? "1")} />
        {children}
      </ProductContextProvider>
    </QueryClientProvider>
  );
}
