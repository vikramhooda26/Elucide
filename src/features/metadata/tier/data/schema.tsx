import { z } from "zod";

export const tierListSchema = z.object({
    id: z.string().optional(),
    tierName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TTierListSchema = z.infer<typeof tierListSchema>;
