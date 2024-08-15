import { z } from "zod";

export const schema = z.object({
    id: z.string().optional(),
    subpersonalityName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type schemaType = z.infer<typeof schema>;
