import { z } from "zod";

export const keyMarketListSchema = z.object({
    id: z.string().optional(),
    keyMarketName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TKeyMarketListSchema = z.infer<typeof keyMarketListSchema>;
