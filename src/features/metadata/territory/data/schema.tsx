import { z } from "zod";

export const territoryListSchema = z.object({
    id: z.string().optional(),
    territoryName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TTerritoryListSchema = z.infer<typeof territoryListSchema>;
