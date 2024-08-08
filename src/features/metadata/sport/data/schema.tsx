import { z } from "zod";

export const sportListSchema = z.object({
    id: z.string().optional(),
    sportName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TSportListSchema = z.infer<typeof sportListSchema>;
