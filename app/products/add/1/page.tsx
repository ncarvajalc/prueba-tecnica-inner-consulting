"use client";
import { useProductForm } from "@/context/ProductContext";
import React from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { StepNavigation } from "@/components/step-navigation";
import { Textarea } from "@/components/ui/textarea";
import {
  descriptionMaxLength,
  nameMaxLength,
  stepOneProductSchema,
} from "@/schemas/form";

export default function StepOnePage() {
  const productContext = useProductForm();
  const router = useRouter();
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const stepOneForm = useForm<z.infer<typeof stepOneProductSchema>>({
    resolver: zodResolver(stepOneProductSchema),
    mode: "onBlur",
    defaultValues: {
      name: productContext.product?.name ?? "",
      description: productContext.product?.description ?? "",
    },
  });

  const onSubmit = (data: z.infer<typeof stepOneProductSchema>) => {
    productContext.updateProduct(data);
    router.push(pathname.replace("1", "2"));
  };

  const handleChange = (
    value: number | string,
    field: ControllerRenderProps<{ name: string; description: string }>
  ) => {
    productContext.updateProduct({ [field.name]: value });
    field.onChange(value);
  };

  return (
    <Form {...stepOneForm}>
      <form
        onSubmit={stepOneForm.handleSubmit(onSubmit)}
        className="w-full max-w-4xl space-y-8"
      >
        <div className="flex w-full max-w-4xl flex-col ">
          <FormField
            name="name"
            control={stepOneForm.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input
                    {...field}
                    maxLength={nameMaxLength}
                    onChange={(e) => {
                      handleChange(e.target.value, field);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={stepOneForm.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Description</FormLabel>
                <FormMessage />
                <FormControl>
                  <Textarea
                    {...field}
                    maxLength={descriptionMaxLength}
                    onChange={(e) => {
                      handleChange(e.target.value, field);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <StepNavigation currentStep={parseInt(lastSegment ?? "1")} />
      </form>
    </Form>
  );
}
