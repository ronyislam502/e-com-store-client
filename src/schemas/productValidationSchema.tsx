import { z } from "zod";

const productValidationSchema = z.object({
  name: z.string(),
  price: z.string(),
  quantity: z.string(),
});

export default productValidationSchema;
