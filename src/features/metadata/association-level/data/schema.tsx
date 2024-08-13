import { z } from "zod";

export const associationListSchema = z.object({
    id: z.string().optional(),
    associationLevelName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TAssociationLevelListSchema = z.infer<typeof associationListSchema>;
