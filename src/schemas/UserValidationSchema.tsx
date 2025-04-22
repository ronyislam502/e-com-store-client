import { z } from "zod";

export const updateUserValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  role: z.string().optional(),
  address: z.string().optional(),
});
