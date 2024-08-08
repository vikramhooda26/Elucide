import { z } from "zod";

export const nccsListSchema = z.object({
    id: z.string().optional(),
    nccsName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TNccsListSchema = z.infer<typeof nccsListSchema>;
