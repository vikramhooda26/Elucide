import { z } from "zod";

export const parentOrgListSchema = z.object({
    id: z.string().optional(),
    parentOrgName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TParentOrgListSchema = z.infer<typeof parentOrgListSchema>;
