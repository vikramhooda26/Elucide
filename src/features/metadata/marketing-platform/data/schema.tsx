import { z } from "zod";

export const marketingPlatformListSchema = z.object({
    id: z.string().optional(),
    marketingPlatformName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TMarketingPlatformListSchema = z.infer<
    typeof marketingPlatformListSchema
>;
