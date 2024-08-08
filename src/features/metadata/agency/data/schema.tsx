import { z } from "zod";

export const agencyListSchema = z.object({
    id: z.string(),
    agencyName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TAgencyListSchema = z.infer<typeof agencyListSchema>;
