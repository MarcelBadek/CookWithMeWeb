import { z } from "zod";

export const CategoryType = z.object({
  id: z.string(),
  name: z.string(),
});
