import { z } from "zod";

export const stateListSchema = z.object({
    id: z.string().optional(),
    stateName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TStateListSchema = z.infer<typeof stateListSchema>;
