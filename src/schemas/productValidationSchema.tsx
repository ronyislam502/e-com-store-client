import { z } from "zod";

export const createProductValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a non-negative number",
    }),
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Quantity must be a non-negative number",
    }),
  category: z.string().min(1, "Category is required"),
});

export const updateProductValidationSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  brand: z.string().min(1, "Brand is required").optional(),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .nonnegative("Price must be a non-negative number")
    .optional(),
  quantity: z.coerce
    .number({ invalid_type_error: "Quantity must be a number" })
    .nonnegative("Quantity must be a non-negative number")
    .optional(),
  category: z.string().min(1, "Category is required").optional(),
});
