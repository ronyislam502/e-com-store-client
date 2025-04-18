import { z } from "zod";

export const updateUserRole = z.object({
  role: z.string().optional(),
});
