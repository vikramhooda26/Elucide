import { z } from "zod";

export const createSummarySchema = (fieldNames: { brandName: string; partnerName: string }) =>
    z.object({
        id: z.string(),
        [fieldNames.brandName]: z.string(),
        [fieldNames.partnerName]: z.string(),
        status: z.string().optional(),
        createdDate: z.string(),
        modifiedDate: z.string(),
        createdBy: z.string(),
        modifiedBy: z.string()
    });
