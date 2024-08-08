import { z } from "zod";

export const subPersonalityListSchema = z.object({
    id: z.string().optional(),
    subpersonalityName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TSubPersonalityListSchema = z.infer<
    typeof subPersonalityListSchema
>;
