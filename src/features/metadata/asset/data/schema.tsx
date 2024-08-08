import { z } from "zod";

export const assetListSchema = z.object({
    id: z.string(),
    assetName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TAssetListSchema = z.infer<typeof assetListSchema>;
