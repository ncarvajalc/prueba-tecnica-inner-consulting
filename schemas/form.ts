import { z } from "zod";

export const nameMaxLength = 50;
export const descriptionMaxLength = 255;
export const stepOneProductSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(
      nameMaxLength,
      `Name must be at most ${nameMaxLength} characters long`
    ),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters long")
    .max(
      descriptionMaxLength,
      `Description must be at most ${descriptionMaxLength} characters long`
    ),
});

export const stepTwoProductSchema = z.object({
  price: z.number().positive("Please enter a valid price"),
  category: z.string().min(1, "Please select a category"),
});

export const newProductSchema = z.object({
  ...stepOneProductSchema.shape,
  ...stepTwoProductSchema.shape,
});
