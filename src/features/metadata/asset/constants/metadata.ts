import z from "zod";

export const assetFormSchema = z.object({
    userId: z.string().optional(),
    assetName: z.string(),
});

export type TAssetFormSchema = z.infer<typeof assetFormSchema>;
