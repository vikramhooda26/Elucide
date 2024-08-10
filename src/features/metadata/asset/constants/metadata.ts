import z from "zod";

export const assetFormSchema = z.object({
    userId: z.string(),
    assetName: z.string(),
});

export type TAssetFormSchema = z.infer<typeof assetFormSchema>;
