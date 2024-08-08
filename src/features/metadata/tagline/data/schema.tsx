import { z } from "zod";

export const taglineListSchema = z.object({
    id: z.string().optional(),
    taglineName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TTaglineListSchema = z.infer<typeof taglineListSchema>;
