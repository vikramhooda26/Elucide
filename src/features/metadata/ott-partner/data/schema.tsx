import { z } from "zod";

export const ottPartnerListSchema = z.object({
    id: z.string().optional(),
    ottpartnerName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TOttPartnerListSchema = z.infer<typeof ottPartnerListSchema>;
