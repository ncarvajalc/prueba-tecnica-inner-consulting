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
import { useQuery } from "react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Category from "@/interfaces/Category";
import { axiosInstance } from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { stepTwoProductSchema } from "@/schemas/form";

export default function StepTwoPage() {
  const productContext = useProductForm();
  const router = useRouter();
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const stepTwoForm = useForm<z.infer<typeof stepTwoProductSchema>>({
    resolver: zodResolver(stepTwoProductSchema),
    mode: "onBlur",
    defaultValues: {
      price: productContext.product?.price ?? 0,
      category: productContext.product?.category ?? "",
    },
  });

  const onSubmit = (data: z.infer<typeof stepTwoProductSchema>) => {
    productContext.updateProduct(data);
    router.push(pathname.replace("2", "3"));
  };

  // Use useQuery to fetch the categories
  const { data: categories, isLoading } = useQuery("categories", async () => {
    const response = await axiosInstance.get("/categories");
    return response.data;
  });

  const handleChange = (
    value: number | string,
    field: ControllerRenderProps<{ price: number; category: string }>
  ) => {
    if (typeof value === "number") {
      productContext.updateProduct({ price: value });
    } else {
      productContext.updateProduct({ category: value });
    }
    field.onChange(value);
  };

  return (
    <Form {...stepTwoForm}>
      <form
        onSubmit={stepTwoForm.handleSubmit(onSubmit)}
        className="w-full max-w-4xl space-y-8"
      >
        <div className="flex w-full max-w-4xl flex-col">
          <FormField
            name="price"
            control={stepTwoForm.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Price</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value)) {
                        handleChange(value, field);
                      }
                    }}
                    value={field.value === 0 ? "" : field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="category"
            control={stepTwoForm.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Category</FormLabel>
                <FormMessage />
                <FormControl>
                  {isLoading ? (
                    <Skeleton className="h-9" />
                  ) : (
                    <Select
                      onValueChange={(value) => handleChange(value, field)}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select the product category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Product Categories</SelectLabel>
                          {categories?.map((category: Category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
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
