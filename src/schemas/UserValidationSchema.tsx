import { z } from "zod";

export const registerUserValidationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "name must be at least 2 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(6, "Phone number minimum at least 6 characters"),
  address: z
    .string({ required_error: "Address is required" })
    .min(6, "address must be at least 6 characters"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const updateUserValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  role: z.string().optional(),
  address: z.string().optional(),
});
