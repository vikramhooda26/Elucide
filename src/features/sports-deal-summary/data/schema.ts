import { z } from "zod";

export const schema = z.object({
  id: z.string(),
  brand: z.string().optional(),
  athlete: z.string().optional(),
  team: z.string().optional(),
  league: z.string().optional(),
  createdDate: z.string(),
  modifiedDate: z.string(),
  createdBy: z.string(),
  modifiedBy: z.string()
});

export type schemaType = z.infer<typeof schema>;
