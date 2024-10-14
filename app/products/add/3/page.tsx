"use client";
import { useProductForm } from "@/context/ProductContext";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { usePathname, useRouter } from "next/navigation";
import { StepNavigation } from "@/components/step-navigation";
import { newProductSchema } from "@/schemas/form";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

export default function StepThreePage() {
  const productContext = useProductForm();
  const router = useRouter();
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // New state

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const stepThreeForm = useForm<z.infer<typeof newProductSchema>>({
    resolver: zodResolver(newProductSchema),
    mode: "onBlur",
    defaultValues: {
      name: productContext.product?.name ?? "",
      description: productContext.product?.description ?? "",
      price: productContext.product?.price ?? 0,
      category: productContext.product?.category ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof newProductSchema>) => {
    productContext.updateProduct(data);
    // Send the data to the server
    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post("/products", data);
      if (response.status === 201) {
        // Show success message
        toast({
          title: "Product created successfully",
          description: `The product has been created successfully`,
          variant: "default",
        });
        productContext.removeProduct();
        router.push("/");
      } else {
        // Show error message
        toast({
          title: "Error creating product",
          description: `There was an error creating the product. Please try again.`,
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      // Show error message
      toast({
        title: "Error creating product",
        description: `There was an error creating the product. Please try again.`,
        variant: "destructive",
      });
      console.error(error);
      setIsSubmitting(false);
    }
  };

  // Added to avoid hydration errors
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="flex w-full max-w-4xl p-8 shadow-md rounded-lg items-center flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-center">Review Product</h2>
          <p className="text-center">
            Please review the product details before submitting
          </p>
        </div>
        <div className="flex-1">
          <ul className="space-y-2">
            <li>
              <strong>Name:</strong> {productContext.product?.name ?? ""}
            </li>
            <li>
              <strong>Description:</strong>{" "}
              {productContext.product?.description ?? ""}
            </li>
            <li>
              <strong>Price:</strong> {productContext.product?.price ?? ""}
            </li>
            <li>
              <strong>Category:</strong>{" "}
              {productContext.product?.category ?? ""}
            </li>
          </ul>
        </div>
      </div>
      <Form {...stepThreeForm}>
        <form
          onSubmit={stepThreeForm.handleSubmit(onSubmit)}
          className="w-full max-w-4xl space-y-8"
        >
          <StepNavigation
            disableSubmit={stepThreeForm.formState.isSubmitting || isSubmitting}
            currentStep={parseInt(lastSegment ?? "1")}
          />
        </form>
      </Form>
    </>
  );
}
