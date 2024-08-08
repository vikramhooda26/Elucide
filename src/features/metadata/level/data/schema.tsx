import { z } from "zod";

export const levelListSchema = z.object({
    id: z.string().optional(),
    levelName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TLevelListSchema = z.infer<typeof levelListSchema>;
